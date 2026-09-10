import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const page = path.join(root, 'dist', 'recipe-finder-by-ingredients', 'index.html');
const image = path.join(root, 'recipe-finder-by-ingredients', 'recipe-finder-ingredients.svg');
const outImage = path.join(root, 'dist', 'recipe-finder-by-ingredients', 'recipe-finder-ingredients.svg');

if (!fs.existsSync(page) || !fs.existsSync(image)) throw new Error('Recipe Finder image enhancement source is missing.');
let html = fs.readFileSync(page, 'utf8');
if (!html.includes('recipe-finder-hero-image')) {
  const hero = '<figure class="recipe-finder-hero-image" style="margin:1.5rem auto 2rem;max-width:900px"><img src="/recipe-finder-by-ingredients/recipe-finder-ingredients.svg" width="1200" height="630" loading="eager" decoding="async" fetchpriority="high" alt="Recipe finder by ingredients with vegetables, eggs, rice and pasta"><figcaption style="text-align:center;color:var(--text-muted);font-size:.9rem;margin-top:.5rem">Find recipe ideas from ingredients you already have.</figcaption></figure>';
  const marker = '</div>\n<div class="ad-slot-container">';
  if (!html.includes(marker)) throw new Error('Recipe Finder image insertion marker not found.');
  html = html.replace(marker, `</div>\n${hero}\n<div class="ad-slot-container">`);
}
fs.copyFileSync(image, outImage);
fs.writeFileSync(page, html, 'utf8');
console.log('Recipe Finder image enhancement applied.');