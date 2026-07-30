import assert from 'node:assert/strict';
import { build } from 'esbuild';
import path from 'node:path';
import test from 'node:test';

const packageRoot = path.resolve(import.meta.dirname, '..');

test('a named style import contributes only the selected icon to the bundle', async () => {
  const result = await bundle(`
    import { Home1Regular } from '@mingcute/vue/core-regular';
    console.log(Home1Regular);
  `);
  const contributingIcons = Object.entries(result.metafile.outputs['out.js'].inputs)
    .filter(([input, details]) => details.bytesInOutput > 0 && normalized(input).includes('dist/styles/core-regular/'))
    .map(([input]) => input);
  assert.equal(contributingIcons.length, 2);
  assert.ok(contributingIcons.every((input) => path.basename(input) === 'home-1.js'));
  assert.match(result.code, /Home1Regular/);
  assert.doesNotMatch(result.code, /User1Regular|CameraRegular|Home1Filled/);
});

test('importing one style never pulls another style index into the graph', async () => {
  const result = await bundle(`
    import { Home1Regular } from '@mingcute/vue/core-regular';
    export { Home1Regular };
  `);
  const inputs = Object.keys(result.metafile.inputs);
  assert.ok(inputs.some((input) => normalized(input).endsWith('dist/styles/core-regular.js')));
  for (const style of ['core-filled', 'core-duotone', 'core-light', 'sharp-light', 'core-twotone', 'cute-regular', 'cute-filled', 'cute-duotone', 'cute-light', 'sharp-regular', 'sharp-filled']) {
    assert.ok(!inputs.some((input) => normalized(input).endsWith(`dist/styles/${style}.js`)), `${style} index entered the graph`);
  }
});

test('a direct style icon subpath bypasses the style barrel', async () => {
  const result = await bundle(`
    import { Home1Regular } from '@mingcute/vue/core-regular/home-1';
    export { Home1Regular };
  `);
  const inputs = Object.keys(result.metafile.inputs);
  assert.ok(inputs.some((input) => normalized(input).endsWith('dist/styles/core-regular/home-1.js')));
  assert.ok(!inputs.some((input) => normalized(input).endsWith('dist/styles/core-regular.js')));
});

async function bundle(stdinContents) {
  const result = await build({
    stdin: { contents: stdinContents, resolveDir: packageRoot, sourcefile: 'entry.js' },
    bundle: true,
    format: 'esm',
    platform: 'browser',
    treeShaking: true,
    minify: false,
    metafile: true,
    write: false,
    outfile: 'out.js',
    external: ['vue'],
    logLevel: 'silent',
  });
  return { code: result.outputFiles[0].text, metafile: result.metafile };
}

function normalized(filePath) {
  return filePath.replaceAll('\\', '/');
}
