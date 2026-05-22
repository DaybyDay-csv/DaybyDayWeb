#!/usr/bin/env node
import { createServer } from "node:http";
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { extname, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");
const PORT = 4173;

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
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    try {
      const candidate = join(DIST, urlPath);
      const file = await tryFile(candidate);
      if (file) {
        res.writeHead(200, { "Content-Type": MIME[extname(file)] || "application/octet-stream" });
        res.end(await readFile(file));
        return;
      }
      // SPA fallback
      const indexPath = join(DIST, "index.html");
      const indexHtml = await readFile(indexPath);
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(indexHtml);
    } catch (e) {
      // Only send 404 if we haven't sent headers yet
      if (!res.writableEnded) {
        res.writeHead(404);
        res.end("not found");
      }
    }
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
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
    // Create fresh browser for each route to avoid detached frame issues
    const page = await browser.newPage();
    try {
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: "domcontentloaded",
        timeout: 15000,
      });
      // Wait briefly for React to render
      await new Promise(r => setTimeout(r, 3000));
      
      let html = await page.content();
      // Just save without complex processing - ignore hydration checks
      const outDir = route === "/" ? DIST : join(DIST, route.replace(/^\//, ""));
      await mkdir(outDir, { recursive: true });
      await writeFile(join(outDir, "index.html"), html);
      ok++;
      console.log(`  ✓ ${route}`);
    } catch (e) {
      // Gracefully skip failed routes instead of crashing
      fail++;
      console.log(`  ⚠ ${route} — skipped (${e.message.slice(0,30)})`);
    } finally {
      await page.close().catch(() => {});
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
