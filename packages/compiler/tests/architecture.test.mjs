import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const packageRoot = path.resolve(import.meta.dirname, '..');
const workspaceRoot = path.resolve(packageRoot, '../..');

test('compiler has no framework imports or framework code generators', async () => {
  const forbiddenImport = /from\s+['"](?:react|vue|svelte|solid-js|@angular\/core|react-native)(?:['"/])/;
  const forbiddenGenerator = /generate(?:React|Vue|Svelte|Angular|Solid|Framework)(?:Source|Code)/;
  for (const file of await sourceFiles(path.join(packageRoot, 'src'))) {
    const source = await readFile(file, 'utf8');
    assert.doesNotMatch(source, forbiddenImport, path.relative(packageRoot, file));
    assert.doesNotMatch(source, forbiddenGenerator, path.relative(packageRoot, file));
  }
});

test('compiler consumes style and icon model declarations from core', async () => {
  const source = (await Promise.all(
    (await sourceFiles(path.join(packageRoot, 'src'))).map((file) => readFile(file, 'utf8')),
  )).join('\n');
  assert.match(source, /from ['"]@mingcute\/core['"]/);
  assert.doesNotMatch(source, /export const iconStyles\s*=/);
  assert.doesNotMatch(source, /interface FrameworkAdapter/);
  assert.doesNotMatch(source, /interface IconDefinition/);
});

async function sourceFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await sourceFiles(fullPath));
    else if (entry.name.endsWith('.ts')) files.push(fullPath);
  }
  return files.sort();
}
