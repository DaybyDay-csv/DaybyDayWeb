#!/usr/bin/env node
/**
 * Prerender Blogs for SEO - uses Puppeteer to generate static HTML
 * Each blog route gets its own index.html with real content
 */

import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const DIST = '/root/projects/DaybyDay/dist';
const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';

// Blog slugs to prerender (from existing blog files)
const BLOGS = [
  'advantage-plus-shopping',
  'meta-ads-creative-strategy',
  'meta-ads-creative-testing-framework',
  'structure-campaigns',
  'budget-meta-ads-2026',
  'cbo-vs-abo-meta-ads-2026-cual-gana-en-ecommerce-espana',
  'como-empezar-con-meta-ads-en-2026-siendo-ecommerce-espana',
  'meta-ads-creative-strategy-2026',
  'facebook-ads-vs-instagram-ads-ecommerce',
  'audiencias-lookalike-meta-alta-calidad',
];

async function prerender() {
  console.log('[PRERENDER] Starting browser...');
  
  // Find chromium
  const executablePath = process.env.CHROMIUM_PATH || '/snap/bin/chromium';
  
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  try {
    const page = await browser.newPage();
    
    // Set realistic user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    for (const slug of BLOGS) {
      const url = `${BASE_URL}/blog/${slug}`;
      const dir = path.join(DIST, 'blog', slug);
      
      console.log(`[PRERENDER] ${url}...`);
      
      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
        
        // Wait for React to render
        await page.waitForSelector('main', { timeout: 10000 }).catch(() => {});
        
        // Get the rendered HTML
        const html = await page.content();
        
        // Ensure directory exists
        fs.mkdirSync(dir, { recursive: true });
        
        // Write the HTML
        fs.writeFileSync(path.join(dir, 'index.html'), html);
        
        const size = Buffer.byteLength(html, 'utf8');
        console.log(`[PRERENDER] ✓ /blog/${slug}/ → ${Math.round(size/1024)}KB`);
      } catch (err) {
        console.log(`[PRERENDER] ✗ /blog/${slug}/: ${err.message}`);
      }
    }

    console.log('[PRERENDER] Done!');
  } finally {
    await browser.close();
  }
}

prerender();