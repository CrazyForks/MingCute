import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { assertAppendOnlyCodepoints } from '../.tooling/codepoints.js';

const baselinePath = process.argv[2];
if (!baselinePath) {
  throw new Error('Pass the previous published metadata/codepoints.json path as the stability baseline.');
}
const packageRoot = path.resolve(import.meta.dirname, '..');
const previous = JSON.parse(await readFile(path.resolve(baselinePath), 'utf8'));
const current = JSON.parse(await readFile(path.join(packageRoot, 'metadata/codepoints.json'), 'utf8'));
assertAppendOnlyCodepoints(previous, current);
console.log('Codepoint ledger is append-only relative to the supplied release baseline.');
