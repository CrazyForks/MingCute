import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createComponent } from 'solid-js';
import { renderToString } from 'solid-js/web';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import test from 'node:test';
import { Icon } from '../dist/index.js';
import { Home1Regular } from '../dist/styles/core-regular.js';

test('decorative default and explicit aria-hidden values are respected', () => {
  const hidden = render(Home1Regular, {});
  assert.match(hidden, /aria-hidden="true"/); assert.doesNotMatch(hidden, /role="img"|<title/);
  assert.match(render(Home1Regular, { 'aria-hidden': false }), /aria-hidden="false"/);
  assert.match(render(Home1Regular, { 'aria-hidden': true, 'aria-label': 'Hidden home' }), /aria-hidden="true"/);
});
test('titles are uniquely associated and caller labels take precedence', () => {
  const markup = renderMany([
    [Home1Regular, { title: 'Home' }], [Home1Regular, { title: 'Second' }],
  ]);
  const ids = [...markup.matchAll(/<title id="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(ids.length, 2); assert.equal(new Set(ids).size, 2);
  assert.deepEqual([...markup.matchAll(/aria-labelledby="([^"]+)"/g)].map((match) => match[1]), ids);
  const labelled = render(Home1Regular, { title: 'Home', titleId: 'home-title', 'aria-label': 'Explicit', role: 'graphics-symbol' });
  assert.match(labelled, /<title id="home-title">Home<\/title>/); assert.match(labelled, /aria-label="Explicit"/);
  assert.match(labelled, /role="graphics-symbol"/); assert.doesNotMatch(labelled, /aria-labelledby=/);
  assert.match(render(Home1Regular, { title: 'Home', 'aria-labelledby': 'external' }), /aria-labelledby="external"/);
});
test('dimensions, class, style, data and event-compatible attrs are forwarded', () => {
  const markup = render(Home1Regular, { size: 32, width: 40, height: '3rem', color: 'red', class: 'sidebar-icon', style: { color: 'blue', 'stroke-width': 2 }, viewBox: '1 2 20 20', focusable: 'false', 'data-testid': 'home' });
  assert.match(markup, /width="40" height="3rem"/); assert.match(markup, /viewBox="1 2 20 20"/);
  assert.match(markup, /class="sidebar-icon/); assert.match(markup, /style="[^"]*color:blue;[^"]*stroke-width:2/);
  assert.match(markup, /focusable="false"/); assert.match(markup, /data-testid="home"/); assert.doesNotMatch(markup, /color:red/);
});
test('shared Icon utility has identical accessibility behavior', () => {
  const markup = render(Icon, { source: '<path/>', title: 'Utility', 'aria-label': 'Explicit utility', class: 'utility' });
  assert.match(markup, /class="utility/); assert.match(markup, /aria-label="Explicit utility"/); assert.doesNotMatch(markup, /aria-labelledby=/);
});
test('shared Icon rejects active SVG source', () => {
  assert.throws(
    () => render(Icon, { source: '<script>alert(1)</script>' }),
    /unsafe active or external content/,
  );
});
test('ref and events reach the real browser SVG element', async () => {
  const temporary = await mkdtemp(path.join(os.tmpdir(), 'mingcute-solid-ref-'));
  try {
    const entry = path.join(temporary, 'entry.js'); const output = path.join(temporary, 'bundle.mjs');
    await writeFile(entry, `import { render } from 'solid-js/web'; import { createComponent } from 'solid-js'; import { Home1Regular } from ${JSON.stringify(path.resolve(import.meta.dirname, '../dist/styles/core-regular/home-1.js'))}; export function mount(target, capture) { return render(() => createComponent(Home1Regular, { id: 'ref-icon', ref: (node) => capture.ref = node, onClick: () => capture.clicks++ }), target); }`);
    await build({ entryPoints: [entry], absWorkingDir: path.resolve(import.meta.dirname, '..'), nodePaths: [path.resolve(import.meta.dirname, '../node_modules')], outfile: output, bundle: true, format: 'esm', platform: 'browser', conditions: ['browser'], write: true, logLevel: 'silent' });
    const dom = new JSDOM('<div id="app"></div>', { url: 'https://example.test' });
    Object.assign(globalThis, { window: dom.window, document: dom.window.document, Node: dom.window.Node, Element: dom.window.Element });
    const { mount } = await import(`${new URL(`file://${output}`).href}?v=${Date.now()}`); const capture = { ref: undefined, clicks: 0 };
    const dispose = mount(document.getElementById('app'), capture);
    assert.equal(capture.ref?.tagName, 'svg'); assert.equal(capture.ref?.id, 'ref-icon');
    capture.ref.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true })); assert.equal(capture.clicks, 1);
    dispose(); assert.equal(document.getElementById('app').children.length, 0);
  } finally { await rm(temporary, { recursive: true, force: true }); }
});

function render(component, props) { return renderToString(() => createComponent(component, props)); }
function renderMany(items) { return renderToString(() => items.map(([component, props]) => createComponent(component, props))); }
