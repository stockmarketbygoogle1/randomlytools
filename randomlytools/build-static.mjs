import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.join(root, 'dist');

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
  if (entry.name === 'dist' || entry.name === 'node_modules') continue;

  const sourcePath = path.join(root, entry.name);
  const outputPath = path.join(output, entry.name);
  fs.cpSync(sourcePath, outputPath, { recursive: true });
}

console.log(`Static site copied from ${root} to ${output}`);
