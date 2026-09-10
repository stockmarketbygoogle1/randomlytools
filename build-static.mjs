import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const source = path.join(root, 'randomlytools');
const nestedBuild = path.join(source, 'build-static.mjs');
const homepageEnhancements = path.join(source, 'homepage-enhancements.mjs');
const socialLinksEnhancement = path.join(source, 'social-links-enhancement.mjs');
const socialHeaderEnhancement = path.join(source, 'social-header-enhancement.mjs');
const googleAnalyticsEnhancement = path.join(source, 'google-analytics-enhancement.mjs');
const nestedOutput = path.join(source, 'dist');
const output = path.join(root, 'dist');
const llmsSource = path.join(root, 'llms.txt');

if (!fs.existsSync(source)) {
  throw new Error(`Static site directory not found: ${source}`);
}
if (!fs.existsSync(nestedBuild)) {
  throw new Error(`Nested static build script not found: ${nestedBuild}`);
}
if (!fs.existsSync(homepageEnhancements)) {
  throw new Error(`Homepage enhancement script not found: ${homepageEnhancements}`);
}
if (!fs.existsSync(socialLinksEnhancement)) {
  throw new Error(`Social links enhancement script not found: ${socialLinksEnhancement}`);
}
if (!fs.existsSync(socialHeaderEnhancement)) {
  throw new Error(`Header social enhancement script not found: ${socialHeaderEnhancement}`);
}
if (!fs.existsSync(googleAnalyticsEnhancement)) {
  throw new Error(`Google Analytics enhancement script not found: ${googleAnalyticsEnhancement}`);
}
if (!fs.existsSync(llmsSource)) {
  throw new Error(`llms.txt source file not found: ${llmsSource}`);
}

// Build the existing site first. This preserves the current page generation flow.
execFileSync(process.execPath, [nestedBuild], { cwd: source, stdio: 'inherit' });

// The homepage enhancement is intentionally run after the nested build because
// it modifies the generated homepage inside randomlytools/dist.
execFileSync(process.execPath, [homepageEnhancements], { cwd: source, stdio: 'inherit' });

// Keep the existing footer/social enhancement and add the new sitewide header links.
execFileSync(process.execPath, [socialLinksEnhancement], { cwd: source, stdio: 'inherit' });
execFileSync(process.execPath, [socialHeaderEnhancement], { cwd: source, stdio: 'inherit' });

// Add Google Analytics to every generated HTML page, idempotently.
execFileSync(process.execPath, [googleAnalyticsEnhancement], { cwd: source, stdio: 'inherit' });

fs.rmSync(output, { recursive: true, force: true });
fs.cpSync(nestedOutput, output, { recursive: true });

// Publish llms.txt at the site root without modifying or removing any generated page.
fs.copyFileSync(llmsSource, path.join(output, 'llms.txt'));

console.log(`Static site copied from ${path.relative(root, nestedOutput)} to ${path.relative(root, output)}`);
console.log('llms.txt copied to the production site root.');
