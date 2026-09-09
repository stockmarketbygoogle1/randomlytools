import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');

if (!fs.existsSync(dist)) {
  throw new Error(`Dist directory not found: ${dist}`);
}

const socialBlock = `
<div class="randomlytools-social-links" aria-label="RandomlyTools social media">
  <span class="randomlytools-social-label">Follow RandomlyTools</span>
  <a href="https://www.instagram.com/randomlytools/" target="_blank" rel="noopener noreferrer" aria-label="RandomlyTools on Instagram" title="Instagram">
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor"/></svg>
  </a>
  <a href="https://www.threads.com/@randomlytools" target="_blank" rel="noopener noreferrer" aria-label="RandomlyTools on Threads" title="Threads">
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12.7 20.2c-4.9 0-8-3.1-8-8.2 0-5 3-8.2 7.7-8.2 4.2 0 7.1 2.2 7.7 5.9h-2.5c-.6-2.1-2.3-3.3-5.1-3.3-3.2 0-5.3 2.1-5.3 5.6 0 3.7 2 5.8 5.5 5.8 2.8 0 4.7-1.2 4.7-3.1 0-1.5-1-2.3-2.8-2.3h-2.1v-2.1h2.5c3.2 0 5 1.6 5 4.4 0 3.4-3 5.5-7.3 5.5Zm.1-5.9c-1.4 0-2.3.6-2.3 1.6 0 1.1 1 1.8 2.6 1.8 1.9 0 3.3-.7 3.8-1.9-.7-1-2-1.5-4.1-1.5Z" fill="currentColor"/></svg>
  </a>
</div>
<style>
.randomlytools-social-links{display:flex;align-items:center;justify-content:center;gap:.65rem;margin-top:1rem;padding-top:.9rem;border-top:1px solid var(--border-color,rgba(128,128,128,.2));flex-wrap:wrap}
.randomlytools-social-label{font-size:.9rem;color:var(--text-muted);font-weight:600;margin-right:.15rem}
.randomlytools-social-links a{display:inline-flex;align-items:center;justify-content:center;width:2.25rem;height:2.25rem;border-radius:50%;color:var(--text-color,#222);border:1px solid var(--border-color,rgba(128,128,128,.25));text-decoration:none;transition:transform .15s ease,background-color .15s ease,color .15s ease}
.randomlytools-social-links a:hover{transform:translateY(-2px);background:var(--surface-alt,#f3f4f6)}
.randomlytools-social-links svg{width:1.2rem;height:1.2rem}
</style>`;

let changed = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith('.html')) {
      let html = fs.readFileSync(full, 'utf8');
      if (html.includes('randomlytools-social-links')) continue;
      if (!/<\/footer>/i.test(html)) continue;
      html = html.replace(/<\/footer>/i, `${socialBlock}\n</footer>`);
      fs.writeFileSync(full, html);
      changed += 1;
    }
  }
}

walk(dist);
console.log(`Social media links added to ${changed} HTML page(s).`);
