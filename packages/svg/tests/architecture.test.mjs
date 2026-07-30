import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const packageRoot = path.resolve(import.meta.dirname, '..');

test('SVG adapter does not own styles, licensing, registry auth, or compiler behavior', async () => {
  const source = await readFile(path.join(packageRoot, 'src/adapter.ts'), 'utf8');
  assert.match(source, /from ['"]@mingcute\/core['"]/);
  assert.doesNotMatch(source, /export const iconStyles\s*=|license(?:Key|State)|registryToken|\.npmrc|from ['"]svgo['"]|parseSvg/);
});

test('published package patterns exclude adapter source and build tooling', async () => {
  const manifest = JSON.parse(await readFile(path.join(packageRoot, 'package.json'), 'utf8'));
  assert.deepEqual(manifest.exports, { './styles.json': './styles.json', './*': './*' });
  assert.equal(manifest.dependencies, undefined);
  assert.ok(manifest.files.every((entry) => !entry.includes('src') && !entry.includes('dist') && !entry.includes('tests')));
  assert.deepEqual((await readdir(path.join(packageRoot, 'src'))).sort(), ['adapter.ts', 'index.ts']);
});

test('render fixture references only free source styles', async () => {
  const fixture = await readFile(path.join(packageRoot, 'tests/render-fixtures.html'), 'utf8');
  assert.doesNotMatch(fixture, /cute-|duotone|twotone|sharp|core\/light/);
});
