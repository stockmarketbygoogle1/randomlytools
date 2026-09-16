import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const page = path.join(root, 'dist', 'percentage-calculator-for-marks', 'index.html');
if (!fs.existsSync(page)) throw new Error(`Percentage Calculator page not found: ${page}`);

let html = fs.readFileSync(page, 'utf8');

// Keep the primary title focused on the main search intent while naturally covering related intent.
html = html.replace(
  /<title>[\s\S]*?<\/title>/i,
  '<title>Percentage Calculator for Marks - Marks Percentage & Grade Calculator | RandomlyTools</title>'
);
html = html.replace(
  /<meta name="description" content="[^"]*">/i,
  '<meta name="description" content="Calculate percentage of marks, overall percentage for multiple subjects, grade percentage and required marks for a target score. Free marks percentage calculator.">'
);

const canonical = '<link rel="canonical" href="https://randomlytools.in/percentage-calculator-for-marks/">';
if (!html.includes('name="robots"')) {
  html = html.replace(canonical, `${canonical}\n<meta name="robots" content="index,follow,max-image-preview:large">`);
}

// Strengthen internal topical relevance without keyword stuffing.
const internalLinks = `
<div class="related-tool-links" style="margin-top:1.5rem;padding:1rem;border:1px solid var(--border-color);border-radius:var(--radius-md)">
<strong>Related calculators:</strong>
<a href="/pipe-size-calculator/">Pipe Size Calculator</a> ·
<a href="/attendance-calculator/">Attendance Calculator</a> ·
<a href="/adsense-revenue-calculator/">AdSense Revenue Calculator</a> ·
<a href="/youtube-money-calculator/">YouTube Money Calculator</a>
</div>`;
if (!html.includes('class="related-tool-links"')) {
  html = html.replace(/<h2>Frequently Asked Questions<\/h2>/i, `${internalLinks}\n<h2>Frequently Asked Questions</h2>`);
}

// Add a concise entity-oriented definition near the top of the article for users and search engines.
const definition = `<p class="tool-definition"><strong>Percentage Calculator for Marks</strong> is a marks percentage calculator that uses obtained marks and maximum marks to calculate a percentage. It also supports overall percentage for multiple subjects and target-mark calculations.</p>`;
if (!html.includes('class="tool-definition"')) {
  html = html.replace(/(<h2>How to Calculate Percentage of Marks<\/h2>)/i, `${definition}\n$1`);
}

// Add source attribution links only once; these are references for further reading, not copied content.
const sources = `<h2>Percentage Calculation References</h2>
<p>For additional explanations of the standard marks-to-percentage method, you can consult established education and calculator resources:</p>
<ul>
<li><a href="https://byjus.com/maths/how-to-calculate-percentage/" target="_blank" rel="noopener noreferrer">BYJU'S: How to Calculate Percentage</a> — explains the standard percentage formula and marks examples.</li>
<li><a href="https://studyabroad.careers360.com/articles/how-to-calculate-the-percentage-of-marks/" target="_blank" rel="noopener noreferrer">Careers360: How to Calculate the Percentage of Marks</a> — provides a marks percentage formula and examples.</li>
<li><a href="https://www.calculator.net/percent-calculator.html" target="_blank" rel="noopener noreferrer">Calculator.net: Percentage Calculator</a> — explains percentage calculations and related formulas.</li>
</ul>
<p><small>These are independent reference resources. RandomlyTools uses its own calculator implementation and does not reproduce their page content.</small></p>`;
if (!html.includes('class="percentage-reference-block"')) {
  html = html.replace(/<h2>Frequently Asked Questions<\/h2>/i, `<div class="percentage-reference-block">${sources}</div>\n<h2>Frequently Asked Questions</h2>`);
}

fs.writeFileSync(page, html, 'utf8');
console.log('Final on-page SEO enhancements applied to Percentage Calculator for Marks.');
