import assert from 'node:assert/strict';
import { build } from 'esbuild';
import path from 'node:path';
import test from 'node:test';
const packageRoot = path.resolve(import.meta.dirname, '..');

test('named style import contributes only the selected icon', async () => {
  const result = await bundle("import { Home1Regular } from '@mingcute/react-native/core-regular'; console.log(Home1Regular);");
  const icons = Object.entries(result.metafile.outputs['out.js'].inputs)
    .filter(([input, details]) => details.bytesInOutput > 0 && normalized(input).includes('dist/styles/core-regular/'))
    .map(([input]) => path.basename(input));
  assert.deepEqual(icons, ['home-1.js', 'home-1.js']);
  assert.doesNotMatch(result.code, /User1Regular|Home1Filled/);
});

test('one style never enters another style index', async () => {
  const result = await bundle("import { Home1Regular } from '@mingcute/react-native/core-regular'; export { Home1Regular };");
  const inputs = Object.keys(result.metafile.inputs).map(normalized);
  assert.ok(inputs.some((input) => input.endsWith('dist/styles/core-regular.js')));
  for (const style of ['core-filled', 'core-duotone', 'core-light', 'sharp-light', 'core-twotone', 'cute-regular', 'cute-filled', 'cute-duotone', 'cute-light', 'sharp-regular', 'sharp-filled']) {
    assert.ok(!inputs.some((input) => input.endsWith(`dist/styles/${style}.js`)));
  }
});

test('direct icon subpath bypasses the style barrel', async () => {
  const result = await bundle("import { Home1Regular } from '@mingcute/react-native/core-regular/home-1'; export { Home1Regular };");
  const inputs = Object.keys(result.metafile.inputs).map(normalized);
  assert.ok(inputs.some((input) => input.endsWith('dist/styles/core-regular/home-1.js')));
  assert.ok(!inputs.some((input) => input.endsWith('dist/styles/core-regular.js')));
});

async function bundle(contents) {
  const result = await build({ stdin: { contents, resolveDir: packageRoot }, bundle: true, format: 'esm', platform: 'neutral',
    treeShaking: true, metafile: true, write: false, outfile: 'out.js',
    external: ['react', 'react-native', 'react-native-svg'], logLevel: 'silent' });
  return { code: result.outputFiles[0].text, metafile: result.metafile };
}
function normalized(file) { return file.replaceAll('\\', '/'); }
