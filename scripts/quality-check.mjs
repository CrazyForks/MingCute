import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ignoredDirectories = new Set(['.git', '.tooling', 'assets', 'dist', 'images', 'node_modules']);
const textExtensions = new Set(['.css', '.html', '.js', '.json', '.md', '.mjs', '.sql', '.toml', '.ts', '.tsx', '.yml', '.yaml']);
const failures = [];

for (const file of await files(root)) {
  const relativePath = path.relative(root, file);
  if (/\.DS_Store$|Thumbs\.db$|\.orig$|\.rej$|~$/.test(relativePath)) {
    failures.push(`${relativePath}: unnecessary generated or editor file`);
    continue;
  }
  if (!textExtensions.has(path.extname(file)) && path.basename(file) !== '.gitignore') continue;
  const source = await readFile(file, 'utf8');
  if (source.includes('\r')) failures.push(`${relativePath}: CRLF line endings`);
  if (source && !source.endsWith('\n')) failures.push(`${relativePath}: missing final newline`);
  if (/[ \t]+$/m.test(source)) failures.push(`${relativePath}: trailing whitespace`);
  const maintenanceMarkers = new RegExp(`\\b(?:${['TO' + 'DO', 'FIX' + 'ME', 'HA' + 'CK'].join('|')})\\b|@ts-` + 'ignore');
  if (maintenanceMarkers.test(source)) failures.push(`${relativePath}: unresolved maintenance marker`);
  if (path.extname(file) === '.json') {
    try { JSON.parse(source); } catch (error) { failures.push(`${relativePath}: invalid JSON (${error.message})`); }
  }
}

if (failures.length) throw new Error(`Source quality check failed:\n${failures.join('\n')}`);
console.log('Source quality check passed.');

async function files(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await files(target));
    else if (entry.isFile()) result.push(target);
  }
  return result;
}
