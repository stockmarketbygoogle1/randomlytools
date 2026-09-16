import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const homepage = path.join(root, 'dist', 'index.html');

if (!fs.existsSync(homepage)) throw new Error(`Homepage not found: ${homepage}`);
let html = fs.readFileSync(homepage, 'utf8');

const card = `
<div class="tool-card" data-category="calculators" data-keywords="pipe size calculator pipe sizing calculator pipe diameter calculator pipe velocity flow rate pipe sizing chart water pipe engineering calculator">
  <div class="tool-card-icon">🔧</div>
  <h2 class="tool-card-title"><a href="/pipe-size-calculator/">Pipe Size Calculator</a></h2>
  <p class="tool-card-desc">Calculate required pipe diameter, flow velocity and flow rate using common metric and imperial units.</p>
  <span class="tool-card-badge">Calculators</span>
</div>`;

if (!html.includes('href="/pipe-size-calculator/"')) {
  const marker = /(<div id="tools-grid-wrapper" class="tools-grid">[\s\S]*?)(<\/div>\s*<div id="no-tools-found")/i;
  if (!marker.test(html)) throw new Error('Homepage tools grid end marker not found.');
  html = html.replace(marker, `$1${card}\n$2`);
}

html = html.replace(/All Tools \(29\)/g, 'All Tools (30)');

if (!html.includes('data-category="calculators">Calculators</button>')) {
  const categoryButton = /(<button[^>]+class="preset-chip category-filter-btn"[^>]+data-category="home-diy"[^>]*>Home &amp; DIY<\/button>)/i;
  if (categoryButton.test(html)) {
    html = html.replace(categoryButton, '$1<button type="button" class="preset-chip category-filter-btn" data-category="calculators">Calculators</button>');
  }
}

if (!html.includes('"url":"https://randomlytools.in/pipe-size-calculator/"')) {
  const marker = /("url":"https:\/\/randomlytools\.in\/fence-post-depth-calculator\/"})/;
  if (!marker.test(html)) throw new Error('Homepage JSON-LD insertion marker not found.');
  html = html.replace(marker, `$1,{"@type":"ListItem","position":30,"name":"Pipe Size Calculator","url":"https://randomlytools.in/pipe-size-calculator/"}`);
}

const footerMarker = /(<li><a href="\/attendance-calculator\/">Attendance Calculator<\/a><\/li>)/i;
if (!html.includes('href="/pipe-size-calculator/"') || !html.includes('Pipe Size Calculator</a></li>')) {
  if (footerMarker.test(html)) html = html.replace(footerMarker, '$1<li><a href="/pipe-size-calculator/">Pipe Size Calculator</a></li>');
}

fs.writeFileSync(homepage, html);
console.log('Pipe Size Calculator homepage integration complete.');
