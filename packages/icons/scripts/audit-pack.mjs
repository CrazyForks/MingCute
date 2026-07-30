import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { iconStyles } from '@mingcute/core';

const packageRoot = path.resolve(import.meta.dirname, '..');
const manifest = JSON.parse(await readFile(path.join(packageRoot, 'package.json'), 'utf8'));

if (manifest.name !== '@mingcute/icons') throw new Error('Unexpected icons package name.');
if (manifest.sideEffects !== false) throw new Error('The icons package must remain side-effect free.');

for (const style of iconStyles) {
  await stat(path.join(packageRoot, `dist/styles/${style}.js`));
  await stat(path.join(packageRoot, `dist/styles/${style}/metadata.json`));
}

console.log('Icons package audit passed.');
