#!/usr/bin/env node
/**
 * Hermes deterministic route updater.
 * Mutates: src/App.jsx, src/pages/BlogPage.jsx, public/sitemap.xml, public/llms.txt, seo-plan/estado.json
 *
 * Usage:
 *   node update-routes.js \
 *     --slug "kebab-case-slug" \
 *     --title "Article title with year" \
 *     --component "KebabSlugPage" \
 *     --taskId "T0XX" \
 *     --keyword "primary keyword" \
 *     --excerpt "100-200 word excerpt for blog index card" \
 *     --category "Estrategia D2C" \
 *     --reading-time 11
 *
 * Idempotent: if entry exists, no-op for that file. Exits 0 if any mutation happened.
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = "/root/projects/DaybyDay";
const APP = path.join(ROOT, "src/App.jsx");
const BLOG_INDEX = path.join(ROOT, "src/pages/BlogPage.jsx");
const SITEMAP = path.join(ROOT, "public/sitemap.xml");
const LLMS = path.join(ROOT, "public/llms.txt");
const ESTADO = path.join(ROOT, "seo-plan/estado.json");

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i].startsWith("--")) {
      const key = argv[i].slice(2);
      const val = argv[i + 1];
      args[key] = val;
      i++;
    }
  }
  return args;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function todayHuman() {
  const d = new Date();
  const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function backup(p) {
  fs.copyFileSync(p, p + ".hermes-bak");
}

function fail(msg) {
  console.error(`update-routes FAIL: ${msg}`);
  process.exit(1);
}

function main() {
  const a = parseArgs(process.argv);
  const required = ["slug", "title", "component", "taskId", "keyword"];
  for (const k of required) if (!a[k]) fail(`missing --${k}`);

  const slug = a.slug;
  const title = a.title;
  const component = a.component;
  const taskId = a.taskId;
  const keyword = a.keyword;
  const excerpt = a.excerpt || `${title} — guía DayByDay Consulting.`;
  const category = a.category || "Estrategia D2C";
  const readingTime = a["reading-time"] || "11";

  // 1. App.jsx — insert import + Route
  let app = fs.readFileSync(APP, "utf8");
  let appChanged = false;
  if (!app.includes(`./pages/blog/${component}`)) {
    if (!app.includes("// HERMES_IMPORTS_END")) fail("App.jsx missing // HERMES_IMPORTS_END marker");
    const importLine = `import ${component} from "./pages/blog/${component}";\n`;
    app = app.replace("// HERMES_IMPORTS_END", importLine + "// HERMES_IMPORTS_END");
    appChanged = true;
  }
  if (!app.includes(`path="/blog/${slug}"`)) {
    if (!app.includes("{/* HERMES_ROUTES_END")) fail("App.jsx missing HERMES_ROUTES_END marker");
    const routeLine = `        <Route path="/blog/${slug}" element={<${component} openCalendly={openCalendly} />} />\n        `;
    app = app.replace(/\{\/\* HERMES_ROUTES_END[^*]*\*\/\}/, (m) => routeLine + m);
    appChanged = true;
  }
  if (appChanged) {
    backup(APP);
    fs.writeFileSync(APP, app);
    console.log("✓ App.jsx updated");
  } else {
    console.log("· App.jsx already has entry, skipped");
  }

  // 2. BlogPage.jsx — insert post object at top of array
  let blog = fs.readFileSync(BLOG_INDEX, "utf8");
  if (!blog.includes(`slug: "${slug}"`)) {
    if (!blog.includes("// HERMES_POSTS_START")) fail("BlogPage.jsx missing HERMES_POSTS_START marker");
    const safeTitle = title.replace(/"/g, '\\"');
    const safeExcerpt = excerpt.replace(/"/g, '\\"');
    const entry =
      `  // HERMES_POSTS_START — Do not remove. hermes/scripts/update-routes.js inserts new post entries below this line.\n` +
      `  {\n` +
      `    slug: "${slug}",\n` +
      `    title: "${safeTitle}",\n` +
      `    excerpt: "${safeExcerpt}",\n` +
      `    category: "${category}",\n` +
      `    date: "${todayHuman()}",\n` +
      `    readingTime: "${readingTime} min",\n` +
      `  },`;
    blog = blog.replace(
      /\/\/ HERMES_POSTS_START[^\n]*\n/,
      entry + "\n"
    );
    backup(BLOG_INDEX);
    fs.writeFileSync(BLOG_INDEX, blog);
    console.log("✓ BlogPage.jsx updated");
  } else {
    console.log("· BlogPage.jsx already has entry, skipped");
  }

  // 3. sitemap.xml
  let sm = fs.readFileSync(SITEMAP, "utf8");
  const url = `https://www.daybydayconsulting.com/blog/${slug}`;
  if (!sm.includes(url)) {
    const block = `  <url><loc>${url}</loc><lastmod>${todayISO()}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>\n`;
    sm = sm.replace(/<\/urlset>\s*$/, `${block}</urlset>\n`);
    backup(SITEMAP);
    fs.writeFileSync(SITEMAP, sm);
    console.log("✓ sitemap.xml updated");
  } else {
    console.log("· sitemap.xml already has URL, skipped");
  }

  // 4. llms.txt
  let llms = fs.readFileSync(LLMS, "utf8");
  if (!llms.includes(`/blog/${slug}`)) {
    backup(LLMS);
    fs.writeFileSync(LLMS, llms.replace(/\s*$/, "") + `\n- [${title}](${url})\n`);
    console.log("✓ llms.txt updated");
  } else {
    console.log("· llms.txt already has entry, skipped");
  }

  // 5. estado.json
  const est = JSON.parse(fs.readFileSync(ESTADO, "utf8"));
  let estChanged = false;
  const task = (est.tasks || []).find((t) => t.id === taskId);
  if (task && task.status !== "published") {
    task.status = "published";
    task.published_at = new Date().toISOString();
    task.published_slug = slug;
    estChanged = true;
  }
  est.published_posts = est.published_posts || [];
  if (!est.published_posts.find((p) => p.slug === slug)) {
    est.published_posts.push({ slug, title, taskId, date: todayISO(), keyword });
    estChanged = true;
  }
  if (estChanged) {
    est.last_updated = new Date().toISOString();
    backup(ESTADO);
    fs.writeFileSync(ESTADO, JSON.stringify(est, null, 2) + "\n");
    console.log("✓ estado.json updated");
  } else {
    console.log("· estado.json already has entry, skipped");
  }

  console.log(`update-routes OK: ${slug}`);
}

main();
