import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const source = path.join(root, 'randomlytools');
const output = path.join(root, 'dist');

if (!fs.existsSync(source)) {
  throw new Error(`Static site directory not found: ${source}`);
}

fs.rmSync(output, { recursive: true, force: true });
fs.cpSync(source, output, { recursive: true });

console.log(`Static site copied from ${path.relative(root, source)} to ${path.relative(root, output)}`);
