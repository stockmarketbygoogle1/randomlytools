import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const homepage = path.join(root, 'dist', 'index.html');

if (!fs.existsSync(homepage)) {
  throw new Error(`Homepage not found: ${homepage}`);
}

let html = fs.readFileSync(homepage, 'utf8');

const cricketCards = `
<div class="tool-card" data-category="cricket" data-keywords="cricket qualification calculator playoff qualification scenarios points table simulator IPL cricket playoff NRR qualify">
  <div class="tool-card-icon">🏏</div>
  <h2 class="tool-card-title"><a href="/cricket-qualification-calculator/">Cricket Qualification Calculator</a></h2>
  <p class="tool-card-desc">Explore cricket playoff qualification scenarios using points, remaining fixtures, rival results and tie-break situations.</p>
  <span class="tool-card-badge">Cricket Tools</span>
</div>
<div class="tool-card" data-category="cricket" data-keywords="cricket NRR calculator net run rate calculator IPL NRR tournament NRR run rate">
  <div class="tool-card-icon">📈</div>
  <h2 class="tool-card-title"><a href="/cricket-nrr-calculator/">Cricket NRR Calculator</a></h2>
  <p class="tool-card-desc">Calculate Net Run Rate from runs scored, runs conceded and cricket overs with correct ball notation.</p>
  <span class="tool-card-badge">Cricket Tools</span>
</div>
<div class="tool-card" data-category="cricket" data-keywords="cricket required run rate calculator RRR calculator cricket chase required rate runs per over runs per ball">
  <div class="tool-card-icon">🎯</div>
  <h2 class="tool-card-title"><a href="/cricket-required-run-rate-calculator/">Cricket Required Run Rate Calculator</a></h2>
  <p class="tool-card-desc">Find the required run rate, runs per ball and balls remaining for a cricket chase.</p>
  <span class="tool-card-badge">Cricket Tools</span>
</div>
<div class="tool-card" data-category="cricket" data-keywords="cricket chase calculator target calculator runs required cricket target score RRR chase IPL T20 ODI">
  <div class="tool-card-icon">🏆</div>
  <h2 class="tool-card-title"><a href="/cricket-chase-calculator/">Cricket Chase Calculator</a></h2>
  <p class="tool-card-desc">Calculate runs required, required run rate and scoring-rate scenarios for a cricket chase.</p>
  <span class="tool-card-badge">Cricket Tools</span>
</div>`;

const toolsGridPattern = /(<section aria-label="Tools Directory"><div id="tools-grid-wrapper" class="tools-grid">[\s\S]*?)(<\/div>\s*<\/section>)/i;
if (!html.includes('data-category="cricket"')) {
  if (!toolsGridPattern.test(html)) {
    throw new Error('Tools Directory grid not found on homepage.');
  }
  html = html.replace(toolsGridPattern, `$1${cricketCards}\n$2`);
}

html = html.replace(/All Tools \(22\)/, 'All Tools (26)');

if (!html.includes('data-category="cricket">Cricket Tools')) {
  const youtubeButton = /(<button[^>]+class="preset-chip category-filter-btn"[^>]+data-category="youtube"[^>]*>YouTube Tools<\/button>)/i;
  if (youtubeButton.test(html)) {
    html = html.replace(youtubeButton, '$1<button type="button" class="preset-chip category-filter-btn" data-category="cricket">Cricket Tools</button>');
  }
}

const jsonTools = [
  ['23', 'Cricket Qualification Calculator', 'https://randomlytools.in/cricket-qualification-calculator/'],
  ['24', 'Cricket NRR Calculator', 'https://randomlytools.in/cricket-nrr-calculator/'],
  ['25', 'Cricket Required Run Rate Calculator', 'https://randomlytools.in/cricket-required-run-rate-calculator/'],
  ['26', 'Cricket Chase Calculator', 'https://randomlytools.in/cricket-chase-calculator/']
];

for (const [position, name, url] of jsonTools) {
  if (!html.includes(`"url":"${url}"`)) {
    const item = `,{"@type":"ListItem","position":${position},"name":"${name}","url":"${url}"}`;
    const marker = /("url":"https:\/\/randomlytools\.in\/youtube-shorts-earnings-calculator\/"})/;
    html = html.replace(marker, `$1${item}`);
  }
}

const popularLinks = [
  '<li><a href="/cricket-qualification-calculator/">Cricket Qualification Calculator</a></li>',
  '<li><a href="/cricket-nrr-calculator/">Cricket NRR Calculator</a></li>',
  '<li><a href="/cricket-required-run-rate-calculator/">Cricket Required Run Rate Calculator</a></li>',
  '<li><a href="/cricket-chase-calculator/">Cricket Chase Calculator</a></li>'
].join('');

if (!html.includes('footer-cricket-popular-tools')) {
  const popularPattern = /(<h[2-4][^>]*>\s*Popular Tools\s*<\/h[2-4]>[\s\S]*?<ul[^>]*>)([\s\S]*?)(<\/ul>)/i;
  if (popularPattern.test(html)) {
    html = html.replace(popularPattern, `$1$2${popularLinks}$3`);
  } else {
    html = html.replace('</footer>', `<div id="footer-cricket-popular-tools" class="footer-column footer-cricket-popular-tools"><h3>Popular Tools</h3><ul>${popularLinks}</ul></div></footer>`);
  }
  html = html.replace('<footer', '<footer id="footer-cricket-popular-tools-marker"');
}

fs.writeFileSync(homepage, html);
console.log('Homepage cricket tool cards and Popular Tools footer links added.');
