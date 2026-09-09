import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');

const instagramUrl = 'https://www.instagram.com/randomlytools';
const threadsUrl = 'https://www.threads.com/@randomlytools';

const socialLinks = `
<div class="randomlytools-header-social" aria-label="RandomlyTools social media">
  <a href="${instagramUrl}" target="_blank" rel="noopener noreferrer" aria-label="RandomlyTools on Instagram" title="Instagram" class="randomlytools-social-link">
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.25" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.4" cy="6.7" r="1.1" fill="currentColor"/></svg>
  </a>
  <a href="${threadsUrl}" target="_blank" rel="noopener noreferrer" aria-label="RandomlyTools on Threads" title="Threads" class="randomlytools-social-link">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.8 11.1c-.35-3.05-2.2-4.75-5.35-4.75-3.2 0-5.15 1.75-5.15 4.25 0 2.75 2.15 4.25 5.45 4.25 2.05 0 3.45-.65 4.3-1.75.8-1.05.9-2.45.35-3.55-.65-1.3-2.2-2.05-4.45-2.05-2.05 0-3.25.8-3.25 2.15 0 1.15.95 1.8 2.5 1.8 1.5 0 2.55-.5 3.05-1.45.55-1.05.25-2.35-.65-3.25-.9-.9-2.3-1.4-4.15-1.4-3.85 0-6.15 2.25-6.15 6.15 0 4.2 2.7 6.65 7.2 6.65 3.05 0 5.25-.95 6.7-2.85" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </a>
</div>`;

const socialStyles = `<style id="randomlytools-header-social-styles">
.randomlytools-header-social{display:flex;align-items:center;gap:.35rem;margin-left:.75rem;flex-shrink:0}
.randomlytools-social-link{width:2rem;height:2rem;display:inline-flex;align-items:center;justify-content:center;border-radius:999px;color:inherit;text-decoration:none;opacity:.82;transition:opacity .15s ease,transform .15s ease,background-color .15s ease}
.randomlytools-social-link:hover{opacity:1;transform:translateY(-1px);background:rgba(127,127,127,.12)}
.randomlytools-social-link svg{width:1.15rem;height:1.15rem;display:block}
@media (max-width:900px){.randomlytools-header-social{margin-left:.35rem}.randomlytools-social-link{width:1.85rem;height:1.85rem}.randomlytools-social-link svg{width:1.05rem;height:1.05rem}}
</style>`;

function processFile(file) {
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('randomlytools-header-social')) return false;

  const headerPattern = /(<header\\b[^>]*>[\\s\\S]*?<nav\\b[^>]*class=["'][^"']*nav-links[^"']*["'][^>]*>[\\s\\S]*?<\\/nav>)/i;
  if (!headerPattern.test(html)) return false;

  html = html.replace(headerPattern, `$1${socialLinks}`);
  html = html.replace(/<\\/head>/i, `${socialStyles}</head>`);
  fs.writeFileSync(file, html);
  return true;
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walk(full));
    else if (entry.isFile() && entry.name === 'index.html') results.push(full);
  }
  return results;
}

const files = walk(dist);
let changed = 0;
for (const file of files) {
  if (processFile(file)) changed++;
}

console.log(`Header social links added to ${changed} page(s).`);
