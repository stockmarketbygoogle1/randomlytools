import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const pagePath = path.join(root, 'dist', 'gta-6-download-time-calculator', 'index.html');

if (!fs.existsSync(pagePath)) {
  throw new Error(`GTA 6 page missing from build output: ${pagePath}`);
}

let html = fs.readFileSync(pagePath, 'utf8');
const pattern = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
const matches = [...html.matchAll(pattern)];

if (matches.length === 0) {
  throw new Error('No JSON-LD block found on the GTA 6 page.');
}

let changed = false;
html = html.replace(pattern, (full, jsonText) => {
  let data;
  try {
    data = JSON.parse(jsonText.trim());
  } catch (error) {
    throw new Error(`Invalid GTA 6 JSON-LD before deployment: ${error.message}`);
  }

  // Keep each schema graph item as its own valid JSON-LD block.
  // This avoids parser ambiguity while preserving the same structured-data entities.
  const items = Array.isArray(data?.['@graph']) ? data['@graph'] : [data];
  changed = changed || items.length > 1;
  return items.map(item => `<script type="application/ld+json">${JSON.stringify({ '@context': data['@context'] || 'https://schema.org', ...item })}</script>`).join('\n');
});

if (!changed) {
  throw new Error('GTA 6 JSON-LD did not contain the expected schema graph.');
}

// Final parser check: every emitted JSON-LD block must be valid JSON.
for (const match of html.matchAll(pattern)) {
  try {
    JSON.parse(match[1].trim());
  } catch (error) {
    throw new Error(`Generated GTA 6 JSON-LD is invalid: ${error.message}`);
  }
}

fs.writeFileSync(pagePath, html, 'utf8');
console.log('GTA 6 structured data normalized into separate valid JSON-LD blocks.');
