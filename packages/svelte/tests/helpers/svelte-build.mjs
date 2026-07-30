import { readFile } from 'node:fs/promises';
import { build } from 'esbuild';
import path from 'node:path';
import { compile } from 'svelte/compiler';

export function sveltePlugin(generate) {
  return {
    name: `svelte-${generate}`,
    setup(builder) {
      builder.onLoad({ filter: /\.svelte$/ }, async ({ path }) => ({
        contents: compile(await readFile(path, 'utf8'), { filename: path, generate, dev: false }).js.code,
        loader: 'js',
      }));
    },
  };
}

export async function loadServerComponent(entryPoint) {
  const result = await build({
    entryPoints: [entryPoint],
    absWorkingDir: process.cwd(),
    bundle: true,
    platform: 'node',
    format: 'esm',
    write: false,
    logLevel: 'silent',
    plugins: [sveltePlugin('server')],
  });
  return (await import(dataUrl(result.outputFiles[0].text))).default;
}

export async function loadClientModule(entryPoint) {
  const result = await build({
    stdin: {
      contents: `import { mount, unmount } from 'svelte'; import Component from ${JSON.stringify(entryPoint)}; export const start = (target, props) => mount(Component, { target, props }); export { unmount };`,
      resolveDir: path.dirname(entryPoint),
    },
    bundle: true,
    platform: 'browser',
    conditions: ['browser'],
    format: 'esm',
    write: false,
    logLevel: 'silent',
    plugins: [sveltePlugin('client')],
  });
  return import(dataUrl(result.outputFiles[0].text));
}

export async function bundleClient(contents, resolveDir) {
  return build({
    stdin: { contents, resolveDir },
    bundle: true,
    platform: 'browser',
    conditions: ['browser', 'svelte'],
    format: 'esm',
    treeShaking: true,
    metafile: true,
    write: false,
    outfile: 'out.js',
    logLevel: 'silent',
    plugins: [sveltePlugin('client')],
  });
}

function dataUrl(source) {
  return `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
}
