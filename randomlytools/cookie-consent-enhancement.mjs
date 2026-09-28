import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');

if (!fs.existsSync(dist)) {
  throw new Error('dist directory not found. Run the static build before cookie consent enhancement.');
}

const banner = `
<style id="rt-cookie-consent-styles">
#rt-cookie-consent{position:fixed;left:20px;right:20px;bottom:20px;z-index:99999;display:none;background:#fff;border:1px solid rgba(15,23,42,.14);border-radius:14px;box-shadow:0 12px 40px rgba(15,23,42,.18);padding:18px 20px;font-family:inherit;color:#1f2937}
#rt-cookie-consent.rt-cookie-visible{display:block}
#rt-cookie-consent .rt-cookie-inner{max-width:1180px;margin:0 auto;display:flex;align-items:center;gap:18px;justify-content:space-between}
#rt-cookie-consent .rt-cookie-copy{flex:1;min-width:0}
#rt-cookie-consent .rt-cookie-title{font-size:17px;font-weight:700;margin:0 0 6px}
#rt-cookie-consent .rt-cookie-text{font-size:14px;line-height:1.55;margin:0;color:#4b5563}
#rt-cookie-consent .rt-cookie-text a{color:inherit;text-decoration:underline}
#rt-cookie-consent .rt-cookie-actions{display:flex;gap:10px;flex-shrink:0}
#rt-cookie-consent button{border:0;border-radius:8px;padding:10px 16px;font:inherit;font-size:14px;font-weight:600;cursor:pointer}
#rt-cookie-accept{background:#111827;color:#fff}
#rt-cookie-decline{background:#f3f4f6;color:#111827}
@media (max-width:700px){#rt-cookie-consent{left:12px;right:12px;bottom:12px;padding:16px}.rt-cookie-inner{flex-direction:column;align-items:stretch!important;gap:14px!important}.rt-cookie-actions{width:100%}.rt-cookie-actions button{flex:1}}
</style>
<div id="rt-cookie-consent" role="dialog" aria-label="Cookie notice" aria-live="polite">
  <div class="rt-cookie-inner">
    <div class="rt-cookie-copy">
      <p class="rt-cookie-title">🍪 Cookie & Privacy Notice</p>
      <p class="rt-cookie-text">RandomlyTools may use cookies or similar browser storage to remember preferences and support site functionality. Third-party services, such as advertising or analytics providers, may use their own technologies according to their policies. See our <a href="/privacy-policy/">Privacy Policy</a> for more information.</p>
    </div>
    <div class="rt-cookie-actions">
      <button type="button" id="rt-cookie-decline" aria-label="Decline cookies">Decline</button>
      <button type="button" id="rt-cookie-accept" aria-label="Accept cookies">Accept</button>
    </div>
  </div>
</div>
<script id="rt-cookie-consent-script">
(function(){
  var key='randomlytools_cookie_consent_v1';
  var banner=document.getElementById('rt-cookie-consent');
  if(!banner)return;
  var choice=null;
  try{choice=window.localStorage.getItem(key)}catch(e){}
  if(choice!=='accepted'&&choice!=='declined') banner.classList.add('rt-cookie-visible');
  function save(value){
    try{window.localStorage.setItem(key,value)}catch(e){}
    banner.classList.remove('rt-cookie-visible');
  }
  var accept=document.getElementById('rt-cookie-accept');
  var decline=document.getElementById('rt-cookie-decline');
  if(accept)accept.addEventListener('click',function(){save('accepted')});
  if(decline)decline.addEventListener('click',function(){save('declined')});
})();
</script>`;

function getHtmlFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...getHtmlFiles(full));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

const htmlFiles = getHtmlFiles(dist);
let changed = 0;

for (const file of htmlFiles) {
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('id="rt-cookie-consent"')) continue;
  const bodyClose = html.toLowerCase().lastIndexOf('</body>');
  if (bodyClose === -1) continue;
  html = html.slice(0, bodyClose) + banner + '\n' + html.slice(bodyClose);
  fs.writeFileSync(file, html, 'utf8');
  changed++;
}

console.log(`Cookie consent enhancement: updated ${changed} HTML files.`);
