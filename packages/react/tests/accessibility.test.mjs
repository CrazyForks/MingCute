import assert from 'node:assert/strict';
import { createRef, createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import TestRenderer, { act } from 'react-test-renderer';
import test from 'node:test';
import { Icon } from '../dist/index.js';
import { Home1Regular } from '../dist/styles/core-regular.js';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

test('unlabelled icons are hidden from assistive technology by default', () => {
  const markup = renderToStaticMarkup(createElement(Home1Regular));
  assert.match(markup, /aria-hidden="true"/);
  assert.doesNotMatch(markup, /role="img"|<title/);
  assert.match(markup, /width="24" height="24"/);
});

test('title creates an associated accessible name with a unique id', () => {
  const markup = renderToStaticMarkup(createElement('div', null,
    createElement(Home1Regular, { title: 'Home' }),
    createElement(Home1Regular, { title: 'Second home' }),
  ));
  const titleIds = [...markup.matchAll(/<title id="([^"]+)">/g)].map((match) => match[1]);
  const labelledBy = [...markup.matchAll(/aria-labelledby="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(titleIds.length, 2);
  assert.equal(new Set(titleIds).size, 2);
  assert.deepEqual(labelledBy, titleIds);
  assert.match(markup, /role="img"/);
  assert.doesNotMatch(markup, /aria-hidden/);
});

test('a supplied titleId is preserved', () => {
  const markup = renderToStaticMarkup(createElement(Home1Regular, { title: 'Home', titleId: 'custom-home-title' }));
  assert.match(markup, /<title id="custom-home-title">Home<\/title>/);
  assert.match(markup, /aria-labelledby="custom-home-title"/);
});

test('aria-label takes precedence over automatic title labelling', () => {
  const markup = renderToStaticMarkup(createElement(Home1Regular, {
    title: 'Decorative title text',
    'aria-label': 'Explicit home label',
  }));
  assert.match(markup, /aria-label="Explicit home label"/);
  assert.doesNotMatch(markup, /aria-labelledby=/);
  assert.match(markup, /<title[^>]*>Decorative title text<\/title>/);
});

test('explicit aria-labelledby and role are never overwritten', () => {
  const markup = renderToStaticMarkup(createElement(Home1Regular, {
    title: 'Home',
    'aria-labelledby': 'external-label',
    role: 'graphics-symbol',
  }));
  assert.match(markup, /aria-labelledby="external-label"/);
  assert.match(markup, /role="graphics-symbol"/);
});

test('explicit aria-hidden values override both the default and labelled states', () => {
  const visible = renderToStaticMarkup(createElement(Home1Regular, { 'aria-hidden': false }));
  const hiddenLabelled = renderToStaticMarkup(createElement(Home1Regular, {
    'aria-hidden': true,
    'aria-label': 'Hidden by caller',
  }));
  assert.match(visible, /aria-hidden="false"/);
  assert.match(hiddenLabelled, /aria-hidden="true"/);
  assert.match(hiddenLabelled, /aria-label="Hidden by caller"/);
});

test('size defaults yield to explicit dimensions and standard props are forwarded', () => {
  const markup = renderToStaticMarkup(createElement(Home1Regular, {
    size: 32,
    width: 40,
    height: '3rem',
    color: 'red',
    className: 'sidebar-icon',
    style: { color: 'blue', strokeWidth: 2 },
    viewBox: '1 2 20 20',
    focusable: 'false',
    'data-testid': 'home-icon',
  }));
  assert.match(markup, /width="40" height="3rem"/);
  assert.match(markup, /viewBox="1 2 20 20"/);
  assert.match(markup, /class="sidebar-icon"/);
  assert.match(markup, /style="color:blue;stroke-width:2"/);
  assert.match(markup, /focusable="false"/);
  assert.match(markup, /data-testid="home-icon"/);
  assert.doesNotMatch(markup, /style="[^"]*color:red/);
});

test('refs are forwarded to the underlying SVG and cleared on unmount', async () => {
  const svgNode = { tagName: 'svg', fixture: true };
  const ref = createRef();
  let renderer;
  await act(async () => {
    renderer = TestRenderer.create(createElement(Home1Regular, { ref }), {
      createNodeMock(element) {
        return element.type === 'svg' ? svgNode : null;
      },
    });
  });
  assert.equal(ref.current, svgNode);
  await act(async () => renderer.unmount());
  assert.equal(ref.current, null);
});

test('the shared Icon utility has the same accessibility and forwarding behavior', () => {
  const markup = renderToStaticMarkup(createElement(Icon, {
    title: 'Shared utility',
    className: 'utility',
    'aria-label': 'Explicit utility label',
  }));
  assert.match(markup, /class="utility"/);
  assert.match(markup, /aria-label="Explicit utility label"/);
  assert.doesNotMatch(markup, /aria-labelledby=/);
});
