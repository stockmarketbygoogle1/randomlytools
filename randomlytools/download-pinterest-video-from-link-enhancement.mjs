import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const page = path.join(root, 'dist', 'download-pinterest-video-from-link', 'index.html');
const homepage = path.join(root, 'dist', 'index.html');
if (!fs.existsSync(page)) throw new Error(`Pinterest downloader page not found: ${page}`);
if (!fs.existsSync(homepage)) throw new Error(`Homepage not found: ${homepage}`);

let html = fs.readFileSync(page, 'utf8');
const faqs = [
 ['How do I download a Pinterest video from a link?','Copy the link of a public Pinterest video Pin, paste it into the tool, and follow the available download instructions. Access to media can depend on Pinterest and the Pin permissions.'],
 ['Can I download a Pinterest video without logging in?','The tool is designed around public Pinterest links and does not require a Pinterest password or private account credentials.'],
 ['Can I download private Pinterest videos?','No. This tool is intended for public Pins and does not bypass private, restricted, login-gated or other access controls.'],
 ['Can I download any Pinterest video?','Only publicly accessible Pins that can be processed by the supported method are suitable. Copyright and creator permissions should also be respected.'],
 ['Can I download Pinterest videos in HD or 4K?','Only when the source and supported delivery method actually provide that quality. HD, 1080p and 4K should not be assumed for every Pin.'],
 ['Is a Pinterest video download allowed?','Public availability does not automatically grant copyright or reuse permission. Download or reuse content only when you have the necessary rights or permission.']
];
const faqSchema = `<script type="application/ld+json" id="pinterest-faq-schema">${JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}}))})}</script>`;
html = html.replace(/<script type="application\/ld\+json" id="pinterest-faq-schema">[\s\S]*?<\/script>/i,'');
html = html.replace('</head>', `${faqSchema}</head>`);
if (!html.includes('pinterest-source-notes')) {
 const notes = `<section id="pinterest-source-notes" class="article-content"><h2>Pinterest Help and Usage Notes</h2><p>Pinterest's own help and policy pages should be checked for current download availability, creator settings and copyright requirements. This RandomlyTools page does not bypass Pinterest access controls or ask for account credentials.</p><ul><li><a href="https://help.pinterest.com/en/article/download-an-image-or-video" target="_blank" rel="noopener noreferrer">Pinterest Help: Download an image or video</a></li><li><a href="https://policy.pinterest.com/en/terms-of-service" target="_blank" rel="noopener noreferrer">Pinterest Terms of Service</a></li><li><a href="https://policy.pinterest.com/en/community-guidelines" target="_blank" rel="noopener noreferrer">Pinterest Community Guidelines</a></li></ul></section>`;
 html = html.replace(/<\/main>/i, `${notes}\n</main>`);
}
fs.writeFileSync(page,html,'utf8');

let home = fs.readFileSync(homepage,'utf8');
const card = `<div class="tool-card" data-category="creator" data-keywords="download pinterest video from link download video from pinterest link download pinterest video by link pinterest video downloader pinterest video download pinterest video downloader online"><div class="tool-card-icon">📌</div><h2 class="tool-card-title"><a href="/download-pinterest-video-from-link/">Download Pinterest Video from Link</a></h2><p class="tool-card-desc">Check a public Pinterest Pin link and prepare the supported video download workflow.</p><span class="tool-card-badge">Creator Tools</span></div>`;
const hasCard = /<div class="tool-card"[^>]*>[\s\S]*?<a href="\/download-pinterest-video-from-link\/">Download Pinterest Video from Link<\/a>[\s\S]*?<\/div>/i.test(home);
if(!hasCard){
 const marker=/(<div id="tools-grid-wrapper" class="tools-grid">[\s\S]*?)(<\/div>\s*<div id="no-tools-found")/i;
 if(!marker.test(home)) throw new Error('Homepage tools grid marker not found.');
 home=home.replace(marker,`$1${card}\n$2`);
}
home=home.replace(/All Tools \((29|30|31)\)/g,'All Tools (32)');
const url='https://randomlytools.in/download-pinterest-video-from-link/';
if(!home.includes(`"url":"${url}"`)){
 const pipe=/({"@type":"ListItem","position":30,"name":"Pipe Size Calculator","url":"https:\/\/randomlytools\.in\/pipe-size-calculator\/"})/i;
 if(pipe.test(home)) home=home.replace(pipe,`$1,{"@type":"ListItem","position":32,"name":"Download Pinterest Video from Link","url":"${url}"}`);
}
fs.writeFileSync(home,'utf8'===typeof home?home:home,'utf8');
console.log('Pinterest video link tool SEO and homepage integration applied.');
