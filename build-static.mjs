import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const source = path.join(root, 'randomlytools');
const nestedBuild = path.join(source, 'build-static.mjs');
const homepageEnhancements = path.join(source, 'homepage-enhancements.mjs');
const nestedOutput = path.join(source, 'dist');
const output = path.join(root, 'dist');

if (!fs.existsSync(source)) {
  throw new Error(`Static site directory not found: ${source}`);
}
if (!fs.existsSync(nestedBuild)) {
  throw new Error(`Nested static build script not found: ${nestedBuild}`);
}
if (!fs.existsSync(homepageEnhancements)) {
  throw new Error(`Homepage enhancement script not found: ${homepageEnhancements}`);
}

// First generate the complete nested static site.
execFileSync(process.execPath, [nestedBuild], { cwd: source, stdio: 'inherit' });

// Then enhance the generated homepage before copying it to the deployment root.
execFileSync(process.execPath, [homepageEnhancements], { cwd: source, stdio: 'inherit' });

fs.rmSync(output, { recursive: true, force: true });
fs.cpSync(nestedOutput, output, { recursive: true });

console.log(`Static site copied from ${path.relative(root, nestedOutput)} to ${path.relative(root, output)}`);
