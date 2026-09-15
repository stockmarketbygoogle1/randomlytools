import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
const monetagTag = '<script src="https://quge5.com/88/tag.min.js" data-zone="281085" async data-cfasync="false"></script>';

if (!fs.existsSync(dist)) {
  throw new Error('Build output directory not found for Monetag integration.');
}

let updated = 0;

function injectIntoFile(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  if (html.includes('https://quge5.com/88/tag.min.js') || html.includes('data-zone="281085"')) {
    return;
  }
  const headMatch = html.match(/<head\b[^>]*>/i);
  if (!headMatch) return;
  const insertion = `${headMatch[0]}\n${monetagTag}`;
  const nextHtml = html.replace(headMatch[0], insertion);
  if (nextHtml !== html) {
    fs.writeFileSync(filePath, nextHtml, 'utf8');
    updated += 1;
  }
}

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(filePath);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
      injectIntoFile(filePath);
    }
  }
}

walk(dist);
console.log(`Monetag integration: injected into ${updated} HTML file(s).`);
