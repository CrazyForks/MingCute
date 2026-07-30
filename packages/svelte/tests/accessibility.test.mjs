import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import { render } from 'svelte/server';
import { loadClientModule, loadServerComponent } from './helpers/svelte-build.mjs';
import { scopeSvgIds } from '../dist/runtime/scope.js';

const packageRoot = path.resolve(import.meta.dirname, '..');
const homePath = path.join(packageRoot, 'dist/styles/core-regular/home-1.svelte');
const Home = await loadServerComponent(homePath);

test('decorative defaults and caller-controlled dimensions render correctly', () => {
  const markup = render(Home, { props: {} }).body;
  assert.match(markup, /width="24" height="24"/);
  assert.match(markup, /aria-hidden="true"/);
  assert.doesNotMatch(markup, /role="img"|<title/);

  const sized = render(Home, { props: { size: 32, width: 40, height: '3rem' } }).body;
  assert.match(sized, /width="40" height="3rem"/);
});

test('titles are uniquely associated and explicit labels take precedence', async () => {
  const Fixture = await loadServerComponent(path.join(packageRoot, 'tests/fixtures/AccessibilityFixture.svelte'));
  const pair = render(Fixture).body;
  const titleIds = [...pair.matchAll(/<title id="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(titleIds.length, 2);
  assert.equal(new Set(titleIds).size, 2);
  for (const id of titleIds) assert.match(pair, new RegExp(`aria-labelledby="${id}"`));

  const labelled = render(Home, { props: { title: 'Home', 'aria-label': 'Explicit home' } }).body;
  assert.match(labelled, /aria-label="Explicit home"/);
  assert.match(labelled, /role="img"/);
  assert.doesNotMatch(labelled, /aria-labelledby=/);
});

test('explicit accessibility, class, style, and arbitrary attributes override defaults', () => {
  const markup = render(Home, { props: {
    ariaHidden: true,
    'aria-hidden': false,
    'aria-labelledby': 'external-label',
    role: 'presentation',
    className: 'fallback',
    class: 'explicit-class',
    style: 'stroke-width:2',
    color: '#123456',
    'data-probe': 'forwarded',
  } }).body;
  assert.match(markup, /aria-hidden="false"/);
  assert.match(markup, /aria-labelledby="external-label"/);
  assert.match(markup, /role="presentation"/);
  assert.match(markup, /class="explicit-class"/);
  assert.match(markup, /style="color:#123456;stroke-width:2"/);
  assert.match(markup, /data-probe="forwarded"/);
});

test('runtime scoping rejects active SVG source', () => {
  assert.throws(
    () => scopeSvgIds('<script>alert(1)</script>', 'test'),
    /unsafe active or external content/,
  );
});

test('bind:ref exposes the real SVG element in a client mount', async () => {
  const dom = new JSDOM('<div id="app"></div>', { url: 'https://example.test/' });
  const previous = installDom(dom.window);
  try {
    const client = await loadClientModule(path.join(packageRoot, 'tests/fixtures/RefFixture.svelte'));
    let captured;
    const app = client.start(document.querySelector('#app'), { capture: (value) => { captured = value; } });
    await Promise.resolve();
    assert.equal(captured?.localName, 'svg');
    assert.equal(captured?.getAttribute('data-ref-fixture'), 'true');
    client.unmount(app);
  } finally {
    restoreDom(previous);
  }
});

function installDom(window) {
  const keys = ['window', 'document', 'Node', 'Element', 'Text', 'Comment', 'DocumentFragment', 'Event', 'CustomEvent'];
  const previous = new Map(keys.map((key) => [key, globalThis[key]]));
  for (const key of keys) globalThis[key] = window[key];
  return previous;
}
function restoreDom(previous) {
  for (const [key, value] of previous) value === undefined ? delete globalThis[key] : globalThis[key] = value;
}
