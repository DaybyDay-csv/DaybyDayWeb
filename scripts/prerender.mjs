import { createServer } from "node:http";
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { extname, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");
const PORT = 4173;

// B3 FIX: kill any process holding PORT before starting
try {
  execSync(`fuser -k ${PORT}/tcp 2>/dev/null || true`, { stdio: "ignore" });
  console.log(`[port] Cleared ${PORT}/tcp`);
} catch (e) {
  // fuser not available or no process — continue
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".xml": "application/xml",
  ".txt": "text/plain",
};

async function tryFile(p) {
  try {
    const s = await stat(p);
    return s.isFile() ? p : null;
  } catch {
    return null;
  }
}

function startServer() {
  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent(req.url.split("?")[0]);
      const candidate = join(DIST, urlPath);
      const file = await tryFile(candidate);
      if (file) {
        res.writeHead(200, { "Content-Type": MIME[extname(file)] || "application/octet-stream" });
        res.end(await readFile(file));
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(await readFile(join(DIST, "index.html")));
    } catch {
      res.writeHead(404);
      res.end("not found");
    }
  });
  return new Promise((resolve, reject) => {
    server.on("error", (e) => {
      if (e.code === "EADDRINUSE") {
        console.error(`[port] ${PORT} in use — trying to free it...`);
        try {
          execSync(`fuser -k ${PORT}/tcp 2>/dev/null || true`, { stdio: "ignore" });
          // Retry once
          server.listen(PORT, () => resolve(server));
        } catch (e2) {
          reject(e2);
        }
      } else {
        reject(e);
      }
    });
    server.listen(PORT, () => resolve(server));
  });
}

async function getRoutes() {
  const sitemap = await readFile(join(DIST, "sitemap.xml"), "utf8");
  const matches = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const routes = matches.map((u) => new URL(u).pathname).filter(Boolean);
  if (!routes.includes("/")) routes.unshift("/");
  return [...new Set(routes)];
}

async function prerender() {
  const routes = await getRoutes();
  console.log(`[prerender] ${routes.length} rutas`);
  const server = await startServer();
  const browser = await puppeteer.launch({
    args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
    executablePath: await chromium.executablePath(),
    headless: true,
  });
  let ok = 0, fail = 0;
  for (const route of routes) {
    const page = await browser.newPage();
    try {
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });
      // Wait for React to hydrate and render blog content
      // Fix: wait for h1 or title change (hydration complete)
      await page.waitForFunction(
        () => {
          const root = document.getElementById('root');
          if (!root) return false;
          const children = root.children.length;
          const h1 = document.querySelector('h1');
          const title = document.title;
          // Blog post renders when: root has children AND (h1 exists OR title changed from default)
          const isBlogPost = title && !title.includes('Growth Partner para D2C');
          return children > 0 && (!!h1 || isBlogPost);
        },
        { timeout: 10000 }
      ).catch(() => {});

      let html = await page.content();
      // Dedupe canonical tags: keep only the last one per page
      const canonicalMatches = html.matchAll(/<link rel="canonical"[^>]*>/g);
      const canonicals = [...canonicalMatches];
      if (canonicals.length > 1) {
        // Remove ALL canonicals first, then re-add the correct one for this route
        html = html.replace(/<link rel="canonical"[^>]*>/g, '');
        // Find the canonical that matches this route
        const routeCanonical = canonicals.find(c => c.includes(route === '/' ? 'daybydayconsulting.com' : route));
        const insertCanonical = routeCanonical ? routeCanonical[0] : canonicals[canonicals.length - 1][0];
        // Inject canonical right after the first <head>
        html = html.replace('<head>', `<head>${insertCanonical}`);
      }
      const outDir = route === "/" ? DIST : join(DIST, route.replace(/^\//, ""));
      await mkdir(outDir, { recursive: true });
      await writeFile(join(outDir, "index.html"), html);
      ok++;
      console.log(`  ✓ ${route}`);
    } catch (e) {
      fail++;
      console.log(`  ✗ ${route} — ${e.message}`);
    } finally {
      await page.close();
    }
  }
  await browser.close();
  server.close();
  console.log(`[prerender] OK: ${ok}, FAIL: ${fail}`);
  if (ok === 0) process.exit(1);
}

prerender().catch((e) => {
  console.error(e);
  process.exit(1);
});
