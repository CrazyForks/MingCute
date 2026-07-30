import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { iconStyles } from '@mingcute/core';

const packageRoot = path.resolve(import.meta.dirname, '..');

test('the font adapter consumes internal contracts without delivery code', async () => {
  const source = await readFile(path.join(packageRoot, 'src/tooling/adapter.ts'), 'utf8');
  assert.match(source, /FrameworkAdapter/);
  assert.match(source, /from ['"]@mingcute\/core['"]/);
  assert.doesNotMatch(source, /export const iconStyles\s*=|license(?:Key|State)|registryToken|\.npmrc/);
});

test('the manifest exposes only free CSS, font, and metadata paths', async () => {
  const manifest = JSON.parse(await readFile(path.join(packageRoot, 'package.json'), 'utf8'));
  assert.deepEqual(iconStyles, ['core-regular', 'core-filled']);
  assert.deepEqual(manifest.exports, {
    './core-regular.min.css': './dist/css/core-regular.min.css',
    './core-filled.min.css': './dist/css/core-filled.min.css',
    './bundle.min.css': './dist/css/bundle.min.css',
    './fonts/*': './dist/fonts/*',
    './metadata/*': './dist/metadata/*',
  });
  assert.equal(manifest.dependencies, undefined);
  assert.equal(manifest.peerDependencies, undefined);
  assert.equal(manifest.publishConfig?.access, 'public');
  assert.equal(manifest.sideEffects, true);
});

test('the bundle contains only Regular and Filled', async () => {
  const bundle = await readFile(path.join(packageRoot, 'dist/css/bundle.min.css'), 'utf8');
  assert.equal(bundle, '@import "./core-regular.min.css";@import "./core-filled.min.css";\n');
});
