import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import { bundleClient } from './helpers/svelte-build.mjs';

const packageRoot = path.resolve(import.meta.dirname, '..');

test('a named style import contributes one icon component and no unrelated styles', async () => {
  const result = await bundleClient(
    "import { Home1Regular } from '@mingcute/svelte/core-regular'; console.log(Home1Regular);",
    packageRoot,
  );
  const inputs = Object.entries(result.metafile.outputs['out.js'].inputs);
  const contributingIcons = inputs.filter(([input, details]) =>
    details.bytesInOutput > 0 && normalized(input).includes('dist/styles/core-regular/') && input.endsWith('.svelte'));
  assert.deepEqual(contributingIcons.map(([input]) => path.basename(input)), ['home-1.svelte']);
  const allInputs = Object.keys(result.metafile.inputs).map(normalized);
  for (const style of ['core-filled', 'core-duotone', 'core-light', 'sharp-light', 'core-twotone', 'cute-regular', 'cute-filled', 'cute-duotone', 'cute-light', 'sharp-regular', 'sharp-filled']) {
    assert.ok(!allInputs.some((input) => input.endsWith(`dist/styles/${style}.js`)));
  }
});

test('a direct icon import bypasses the style index', async () => {
  const result = await bundleClient(
    "import Home from '@mingcute/svelte/core-regular/home-1'; console.log(Home);",
    packageRoot,
  );
  const inputs = Object.keys(result.metafile.inputs).map(normalized);
  assert.ok(inputs.some((input) => input.endsWith('dist/styles/core-regular/home-1.svelte')));
  assert.ok(!inputs.some((input) => input.endsWith('dist/styles/core-regular.js')));
});

function normalized(file) { return file.replaceAll('\\', '/'); }
