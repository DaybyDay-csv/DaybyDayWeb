#!/usr/bin/env node
/**
 * Simple prerenderer - generates static HTML for blog routes
 * Uses Node.js to simulate server-side rendering for SEO
 */

const fs = require('fs');
const path = require('path');

const DIST = '/root/projects/DaybyDay/dist';
const BLOGS = [
  'advantage-plus-shopping',
  'meta-ads-creative-strategy', 
  'meta-ads-creative-testing-framework',
  'structure-campaigns',
  'budget-meta-ads-2026',
  'cbo-vs-abo-meta-ads-2026-cual-gana-en-ecommerce-espana'
];

console.log('[PRERENDER] Starting...');

// Read main index.html as base
const baseHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

// For each blog, create a directory with index.html
// This is a fallback - creates duplicate copies that will be served
BLOGS.forEach(slug => {
  const dir = path.join(DIST, 'blog', slug);
  fs.mkdirSync(dir, { recursive: true });
  
  // Modify the base HTML to inject blog-specific metadata
  // This is a basic fallback - ideally we'd use a real SSR
  let blogHtml = baseHtml;
  
  // Inject the blog's title in the HTML 
  blogHtml = blogHtml.replace(
    '<title>Agencia de Marketing con IA y Automatización | DayByDay Consulting</title>',
    `<title>Blog: ${slug.replace(/-/g, ' ')} | DayByDay Consulting</title>`
  );
  
  fs.writeFileSync(path.join(dir, 'index.html'), blogHtml);
  console.log(`[PRERENDER] ✓ /blog/${slug}/`);
});

console.log('[PRERENDER] Done!');