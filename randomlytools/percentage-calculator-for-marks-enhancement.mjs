import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const page = path.join(root, 'dist', 'percentage-calculator-for-marks', 'index.html');
const homepage = path.join(root, 'dist', 'index.html');

if (!fs.existsSync(page)) throw new Error(`Percentage Calculator page not found: ${page}`);
if (!fs.existsSync(homepage)) throw new Error(`Homepage not found: ${homepage}`);

let html = fs.readFileSync(page, 'utf8');
html = html.replace(/<title>[\s\S]*?<\/title>/i, '<title>Percentage Calculator for Marks – Marks, Grade & Percentage Calculator | RandomlyTools</title>');
html = html.replace(/<meta name="description" content="[^"]*">/i, '<meta name="description" content="Free percentage calculator for marks. Calculate marks percentage, grade percentage, overall percentage and required marks for exams and subjects.">');

const faqs = [
['How do you calculate percentage of marks?','Divide marks obtained by total marks and multiply by 100. For example, 450 out of 500 is 90%.'],
['How do I calculate marks percentage?','Enter your marks obtained and maximum marks. The calculator divides obtained marks by maximum marks and multiplies by 100.'],
['What is a grade percentage calculator?','A grade percentage calculator converts marks into a percentage and can also calculate an overall percentage across subjects.'],
['How do I calculate overall percentage for multiple subjects?','Add the obtained marks across subjects, add the maximum marks across subjects, then divide total obtained marks by total maximum marks and multiply by 100.'],
['How many marks do I need for a target percentage?','Multiply maximum marks by the target percentage divided by 100. Compare that target mark with your current marks to find the additional marks required.'],
['How do you calculate percentage from marks?','Use the formula (marks obtained ÷ maximum marks) × 100.'],
['What is the formula for calculating percentage of marks?','Percentage = (Obtained Marks ÷ Maximum Marks) × 100.'],
['How do I calculate percentage of marks for different subjects?','For a combined percentage, total the marks obtained and total the maximum marks before calculating the percentage.']
];

const faqJson = JSON.stringify(faqs.map(([name,text]) => ({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}})));
const faqSchema = `<script type="application/ld+json" id="marks-faq-schema">${JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity:JSON.parse(faqJson)})}</script>`;
html = html.replace(/<script type="application\/ld\+json" id="marks-faq-schema">[\s\S]*?<\/script>/i, '');
html = html.replace('</head>', `${faqSchema}</head>`);

const seoContent = `
<section class="article-content marks-seo-expansion">
<h2>Percentage Calculator for Marks</h2>
<p>This percentage calculator for marks helps students quickly calculate exam percentage from marks obtained and total marks. You can also calculate an overall percentage for multiple subjects and work out the marks required for a target percentage.</p>
<h2>How to Calculate Marks Percentage</h2>
<p>The standard formula is <strong>Percentage = (Marks Obtained ÷ Total Marks) × 100</strong>. If you scored 450 out of 500, the calculation is 450 ÷ 500 × 100 = 90%.</p>
<h2>Grade Percentage Calculator</h2>
<p>When subjects have different maximum marks, calculate the combined percentage from total obtained marks and total maximum marks. This gives the weighted overall percentage instead of simply averaging separate subject percentages.</p>
<h2>Formula for Calculating Percentage of Marks</h2>
<p><strong>Percentage = (Obtained Marks ÷ Maximum Marks) × 100</strong></p>
<p>To find the marks represented by a target percentage, use <strong>Target Marks = Maximum Marks × Target Percentage ÷ 100</strong>.</p>
<h2>Marks Percentage Examples</h2>
<table><thead><tr><th>Marks</th><th>Total Marks</th><th>Percentage</th></tr></thead><tbody><tr><td>450</td><td>500</td><td>90%</td></tr><tr><td>72</td><td>100</td><td>72%</td></tr><tr><td>38</td><td>50</td><td>76%</td></tr><tr><td>270</td><td>300</td><td>90%</td></tr></tbody></table>
<h2>How to Calculate Overall Percentage of Marks</h2>
<p>For multiple subjects, add all marks obtained and add all maximum marks. Then divide the combined obtained marks by the combined maximum marks and multiply by 100. This method is useful when subjects do not all have the same maximum marks.</p>
<h2>How Many Marks Are Needed for a Target Percentage?</h2>
<p>Enter your current marks, maximum marks and target percentage in the Target Marks mode. The calculator finds the target marks and the additional marks needed to reach that target.</p>
<h2>Percentage, Percentile and Grade: What Is the Difference?</h2>
<p><strong>Percentage</strong> expresses marks as a value out of 100. <strong>Percentile</strong> describes a student's position relative to other students, so it is not the same as percentage. A <strong>grade</strong> is a category or letter assigned according to an institution's grading rules. Always use the grading or result rule published by your school, board, college or university when an official result is required.</p>
<h2>Source-Based Notes and Further Reading</h2>
<p>The core marks-to-percentage formula used here is the standard arithmetic formula also explained in student-focused guides from major education websites. For additional explanations and examples, see these external resources:</p>
<ul>
<li><a href="https://studyabroad.careers360.com/articles/how-to-calculate-the-percentage-of-marks/" target="_blank" rel="noopener noreferrer">Careers360: How to Calculate the Percentage of Marks</a> — explains the marks-to-percentage formula and worked examples.</li>
<li><a href="https://www.shiksha.com/studyabroad/how-to-calculate-percentage-of-marks-articlepage-147205" target="_blank" rel="noopener noreferrer">Shiksha: How to Calculate Percentage of Marks</a> — covers single-subject and multiple-subject percentage calculations.</li>
<li><a href="https://calculator.academy/marks-percentage-calculator-2/" target="_blank" rel="noopener noreferrer">Calculator Academy: Marks Percentage Calculator</a> — provides the marks percentage formula and calculator approach.</li>
</ul>
<p><small>These links are provided for further reading. RandomlyTools does not copy their calculator results or page content. Rules for official marks, grades, aggregate calculations, best-of-subject selection, or CGPA conversion can vary by institution, so the applicable official rule should be checked separately.</small></p>
<h2>Frequently Asked Questions</h2>
${faqs.map(([q,a]) => `<h3>${q}</h3><p>${a}</p>`).join('\n')}
</section>`;

if (!html.includes('class="marks-seo-expansion"')) {
  html = html.replace(/<\/article>/i, `${seoContent}\n</article>`);
}
fs.writeFileSync(page, html, 'utf8');

let home = fs.readFileSync(homepage, 'utf8');
const card = `<div class="tool-card" data-category="calculators" data-keywords="percentage calculator marks percentage calculator for marks grade percentage grade percentage calculator marks percentage formula calculate marks percentage how to calculate marks percentage">
<div class="tool-card-icon">📊</div>
<h2 class="tool-card-title"><a href="/percentage-calculator-for-marks/">Percentage Calculator for Marks</a></h2>
<p class="tool-card-desc">Calculate marks percentage, overall grade percentage and required marks for a target score.</p>
<span class="tool-card-badge">Calculators</span>
</div>`;
const hasCard = /<div class="tool-card"[^>]*data-category="calculators"[^>]*>[\s\S]*?<h2 class="tool-card-title"><a href="\/percentage-calculator-for-marks\/">Percentage Calculator for Marks<\/a><\/h2>[\s\S]*?<\/div>/i.test(home);
if (!hasCard) {
  const marker = /(<div id="tools-grid-wrapper" class="tools-grid">[\s\S]*?)(<\/div>\s*<div id="no-tools-found")/i;
  if (!marker.test(home)) throw new Error('Homepage tools grid marker not found.');
  home = home.replace(marker, `$1${card}\n$2`);
}
home = home.replace(/All Tools \(29\)/g, 'All Tools (31)');
home = home.replace(/All Tools \(30\)/g, 'All Tools (31)');
if (!home.includes('data-category="calculators">Calculators</button>')) {
  const marker = /(<button[^>]+class="preset-chip category-filter-btn"[^>]+data-category="home-diy"[^>]*>Home &amp; DIY<\/button>)/i;
  if (marker.test(home)) home = home.replace(marker, '$1<button type="button" class="preset-chip category-filter-btn" data-category="calculators">Calculators</button>');
}
const url = 'https://randomlytools.in/percentage-calculator-for-marks/';
if (!home.includes(`"url":"${url}"`)) {
  const marker = /("url":"https:\/\/randomlytools\.in\/pipe-size-calculator\/"})/i;
  if (marker.test(home)) home = home.replace(marker, `$1,{"@type":"ListItem","position":31,"name":"Percentage Calculator for Marks","url":"${url}"}`);
}
fs.writeFileSync(homepage, home, 'utf8');
console.log('Percentage Calculator for Marks SEO, source links and homepage integration applied.');
