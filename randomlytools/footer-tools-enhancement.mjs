import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const homepage = path.join(root, 'dist', 'index.html');

if (!fs.existsSync(homepage)) throw new Error(`Homepage not found: ${homepage}`);

let html = fs.readFileSync(homepage, 'utf8');

const footerTools = `
<div class="footer-column"><h4>Popular Tools</h4><ul>
<li><a href="/random-name-generator/">Random Name Generator</a></li>
<li><a href="/random-number-picker/">Random Number Picker</a></li>
<li><a href="/random-dog-name-generator/">Dog Name Generator</a></li>
<li><a href="/random-discord-name-generator/">Discord Name Generator</a></li>
<li><a href="/random-company-brand-name-generator/">Brand Name Generator</a></li>
<li><a href="/random-shop-name-generator/">Shop Name Generator</a></li>
<li><a href="/random-restaurant-name-generator/">Restaurant Name Generator</a></li>
</ul></div>
<div class="footer-column"><h4>More Tools</h4><ul>
<li><a href="/random-japanese-name-generator/">Japanese Name Generator</a></li>
<li><a href="/random-instagram-username-generator/">Instagram Username Generator</a></li>
<li><a href="/random-coffee-shop-name-generator/">Coffee Shop Name Generator</a></li>
<li><a href="/random-team-generator/">Random Team Generator</a></li>
<li><a href="/attendance-calculator/">Attendance Calculator</a></li>
<li><a href="/random-country-generator/">Random Country Generator</a></li>
<li><a href="/recipe-finder-by-ingredients/">Recipe Finder by Ingredients</a></li>
<li><a href="/adsense-revenue-calculator/">AdSense Revenue Calculator</a></li>
</ul></div>
<div class="footer-column"><h4>Creator & DIY</h4><ul>
<li><a href="/iceland-salary-calculator/">Iceland Salary Calculator 2026</a></li>
<li><a href="/cyprus-salary-calculator/">Cyprus Salary Calculator 2026</a></li>
<li><a href="/youtube-money-calculator/">YouTube Money Calculator</a></li>
<li><a href="/youtube-money-calculator-india/">YouTube Money Calculator India</a></li>
<li><a href="/youtube-money-calculator-iceland/">YouTube Money Calculator Iceland</a></li>
<li><a href="/youtube-rpm-calculator/">YouTube RPM Calculator</a></li>
<li><a href="/youtube-shorts-earnings-calculator/">YouTube Shorts Earnings Calculator</a></li>
<li><a href="/cricket-qualification-calculator/">Cricket Qualification Calculator</a></li>
<li><a href="/cricket-nrr-calculator/">Cricket NRR Calculator</a></li>
<li><a href="/cricket-required-run-rate-calculator/">Cricket Required Run Rate Calculator</a></li>
<li><a href="/cricket-chase-calculator/">Cricket Chase Calculator</a></li>
<li><a href="/website-mockup-generator/">Website Mockup Generator</a></li>
<li><a href="/fence-post-depth-calculator/">Fence Post Depth Calculator</a></li>
</ul></div>`;

const marker = /<div class="footer-column"><h4>Popular Tools<\/h4>[\s\S]*?(?=<div class="footer-column"><h4>Website<\/h4>)/i;
if (!marker.test(html)) throw new Error('Homepage footer tool columns marker not found.');

html = html.replace(marker, footerTools);

// The footer now has four tool columns plus the brand column. Keep all five
// columns on one row on desktop while preserving the existing one-column mobile layout.
const footerLayoutStyle = `<style id="homepage-footer-layout">.site-footer .footer-grid{grid-template-columns:2fr repeat(4,minmax(0,1fr));}.site-footer .footer-column{min-width:0;}@media (max-width:1024px) and (min-width:769px){.site-footer .footer-grid{grid-template-columns:2fr repeat(2,minmax(0,1fr));}.site-footer .footer-grid .footer-column:nth-of-type(4),.site-footer .footer-grid .footer-column:nth-of-type(5){grid-column:span 1;}}</style>`;
const styleMarker = /<style id="homepage-footer-layout">[\s\S]*?<\/style>/i;
html = styleMarker.test(html)
  ? html.replace(styleMarker, footerLayoutStyle)
  : html.replace('</head>', `${footerLayoutStyle}</head>`);

const requiredPaths = [
  '/random-name-generator/', '/random-number-picker/', '/random-dog-name-generator/',
  '/random-discord-name-generator/', '/random-shop-name-generator/', '/random-restaurant-name-generator/',
  '/random-japanese-name-generator/', '/random-instagram-username-generator/', '/random-coffee-shop-name-generator/',
  '/random-company-brand-name-generator/', '/random-team-generator/', '/attendance-calculator/',
  '/random-country-generator/', '/recipe-finder-by-ingredients/', '/adsense-revenue-calculator/',
  '/iceland-salary-calculator/', '/cyprus-salary-calculator/', '/youtube-money-calculator/',
  '/youtube-money-calculator-india/', '/youtube-money-calculator-iceland/', '/youtube-rpm-calculator/',
  '/youtube-shorts-earnings-calculator/', '/cricket-qualification-calculator/', '/cricket-nrr-calculator/',
  '/cricket-required-run-rate-calculator/', '/cricket-chase-calculator/', '/website-mockup-generator/',
  '/fence-post-depth-calculator/'
];

// The four cricket tools, Website Mockup Generator and Fence Post Depth Calculator
// are inserted into the homepage by homepage-enhancements.mjs, so their footer links
// are validated here even though they are not part of the original nested homepage source.
const missing = requiredPaths.filter((p) => !html.includes(`href="${p}"`));
if (missing.length) throw new Error(`Footer link validation failed: ${missing.join(', ')}`);

fs.writeFileSync(homepage, html, 'utf8');
console.log('Homepage footer updated with links for all 28 tools.');
