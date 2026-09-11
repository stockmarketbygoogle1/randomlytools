import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const source = path.join(root, 'randomlytools');
const nestedBuild = path.join(source, 'build-static.mjs');
const homepageEnhancements = path.join(source, 'homepage-enhancements.mjs');
const footerToolsEnhancement = path.join(source, 'footer-tools-enhancement.mjs');
const recipeSeoEnhancement = path.join(source, 'recipe-seo-enhancement.mjs');
const recipeImageEnhancement = path.join(source, 'recipe-image-enhancement.mjs');
const socialLinksEnhancement = path.join(source, 'social-links-enhancement.mjs');
const socialHeaderEnhancement = path.join(source, 'social-header-enhancement.mjs');
const googleAnalyticsEnhancement = path.join(source, 'google-analytics-enhancement.mjs');
const nestedOutput = path.join(source, 'dist');
const output = path.join(root, 'dist');
const llmsSource = path.join(root, 'llms.txt');
const uiSource = path.join(source, 'assets', 'js', 'core', 'ui.js');

if (!fs.existsSync(source)) throw new Error(`Static site directory not found: ${source}`);
if (!fs.existsSync(nestedBuild)) throw new Error(`Nested static build script not found: ${nestedBuild}`);
if (!fs.existsSync(homepageEnhancements)) throw new Error(`Homepage enhancement script not found: ${homepageEnhancements}`);
if (!fs.existsSync(footerToolsEnhancement)) throw new Error(`Footer tools enhancement script not found: ${footerToolsEnhancement}`);
if (!fs.existsSync(recipeSeoEnhancement)) throw new Error(`Recipe SEO enhancement script not found: ${recipeSeoEnhancement}`);
if (!fs.existsSync(recipeImageEnhancement)) throw new Error(`Recipe image enhancement script not found: ${recipeImageEnhancement}`);
if (!fs.existsSync(socialLinksEnhancement)) throw new Error(`Social links enhancement script not found: ${socialLinksEnhancement}`);
if (!fs.existsSync(socialHeaderEnhancement)) throw new Error(`Header social enhancement script not found: ${socialHeaderEnhancement}`);
if (!fs.existsSync(googleAnalyticsEnhancement)) throw new Error(`Google Analytics enhancement script not found: ${googleAnalyticsEnhancement}`);
if (!fs.existsSync(llmsSource)) throw new Error(`llms.txt source file not found: ${llmsSource}`);
if (!fs.existsSync(uiSource)) throw new Error(`Required UI asset not found: ${uiSource}`);

// Build the existing site first. This preserves the current page generation flow.
execFileSync(process.execPath, [nestedBuild], { cwd: source, stdio: 'inherit' });

// Existing homepage enhancement.
execFileSync(process.execPath, [homepageEnhancements], { cwd: source, stdio: 'inherit' });

// Keep the homepage footer synchronized with every tool available on the homepage.
execFileSync(process.execPath, [footerToolsEnhancement], { cwd: source, stdio: 'inherit' });

// Strengthen the Recipe Finder page's search relevance without replacing its source code.
execFileSync(process.execPath, [recipeSeoEnhancement], { cwd: source, stdio: 'inherit' });

// Apply the Recipe Finder hero image enhancement and responsive image rules to the generated page.
execFileSync(process.execPath, [recipeImageEnhancement], { cwd: source, stdio: 'inherit' });

// Existing sitewide social/header enhancements.
execFileSync(process.execPath, [socialLinksEnhancement], { cwd: source, stdio: 'inherit' });
execFileSync(process.execPath, [socialHeaderEnhancement], { cwd: source, stdio: 'inherit' });

// Add Google Analytics to every generated HTML page, idempotently.
execFileSync(process.execPath, [googleAnalyticsEnhancement], { cwd: source, stdio: 'inherit' });

fs.rmSync(output, { recursive: true, force: true });
fs.cpSync(nestedOutput, output, { recursive: true });

// Explicitly publish the sitewide UI asset in the final deployment directory.
// Some deployments have previously served /assets/js/core/ui.js as 404 even though
// the source and nested build contain the file. This copy is intentionally limited
// to that affected asset and does not alter any page logic or other assets.
const uiOutput = path.join(output, 'assets', 'js', 'core', 'ui.js');
fs.mkdirSync(path.dirname(uiOutput), { recursive: true });
fs.copyFileSync(uiSource, uiOutput);
if (!fs.existsSync(uiOutput)) throw new Error(`Required UI asset missing from final output: ${uiOutput}`);

// Publish llms.txt at the site root without modifying or removing any generated page.
fs.copyFileSync(llmsSource, path.join(output, 'llms.txt'));

console.log(`Static site copied from ${path.relative(root, nestedOutput)} to ${path.relative(root, output)}`);
console.log('Verified /assets/js/core/ui.js in the final production output.');
console.log('llms.txt copied to the production site root.');
