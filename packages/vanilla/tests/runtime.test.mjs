import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import test from 'node:test';
import { createIcon, toSvgString } from '../dist/index.js';
import { Home1Regular } from '../dist/styles/core-regular.js';

test('string output has accessible defaults and caller-controlled dimensions', () => {
  const output = toSvgString(Home1Regular);
  assert.match(output, /width="24" height="24" color="currentColor" aria-hidden="true"/);
  const sized = toSvgString(Home1Regular, { size: 32, width: 40, height: '3rem', color: '#123456', className: 'sidebar' });
  assert.match(sized, /width="40" height="3rem" color="#123456" class="sidebar"/);
});

test('titles have unique associations and explicit labels take precedence', () => {
  const first = toSvgString(Home1Regular, { title: 'Home' });
  const second = toSvgString(Home1Regular, { title: 'Second home' });
  const firstId = first.match(/<title id="([^"]+)">/)[1];
  const secondId = second.match(/<title id="([^"]+)">/)[1];
  assert.notEqual(firstId, secondId);
  assert.match(first, new RegExp(`aria-labelledby="${firstId}"`));
  assert.match(first, /role="img"/);
  assert.doesNotMatch(first, /aria-hidden/);

  const labelled = toSvgString(Home1Regular, { title: 'Home', ariaLabel: 'Explicit home' });
  assert.match(labelled, /aria-label="Explicit home"/);
  assert.doesNotMatch(labelled, /aria-labelledby/);
});

test('explicit accessibility and arbitrary attributes override defaults safely', () => {
  const output = toSvgString(Home1Regular, {
    title: 'Home', ariaHidden: false, attributes: {
      'aria-hidden': true, role: 'graphics-symbol', focusable: false, 'data-testid': 'home', width: 52,
    },
  });
  assert.match(output, /aria-hidden="true"/);
  assert.match(output, /role="graphics-symbol"/);
  assert.match(output, /focusable="false"/);
  assert.match(output, /data-testid="home"/);
  assert.match(output, /width="52"/);
  assert.throws(() => toSvgString(Home1Regular, { attributes: { 'bad name': 'x' } }), /Invalid SVG attribute name/);
});

test('text and attributes are escaped', () => {
  const output = toSvgString(Home1Regular, { title: '<Home & "office">', className: 'a"b' });
  assert.match(output, /<title[^>]*>&lt;Home &amp; &quot;office&quot;&gt;<\/title>/);
  assert.match(output, /class="a&quot;b"/);
});

test('rejects active and externally referenced SVG source', () => {
  assert.throws(
    () => toSvgString('<svg viewBox="0 0 24 24"><script>alert(1)</script></svg>'),
    /unsafe active or external content/,
  );
  assert.throws(
    () => toSvgString('<svg viewBox="0 0 24 24"><image href="https://example.com/tracker.png"/></svg>'),
    /unsafe active or external content/,
  );
});

test('createIcon returns a real SVG element with nested geometry', () => {
  const dom = new JSDOM('<!doctype html><body></body>');
  const previous = globalThis.document;
  globalThis.document = dom.window.document;
  try {
    const icon = createIcon(Home1Regular, { title: 'Home', className: 'created-icon', size: 36 });
    assert.equal(icon.namespaceURI, 'http://www.w3.org/2000/svg');
    assert.equal(icon.localName, 'svg');
    assert.equal(icon.getAttribute('width'), '36');
    assert.equal(icon.getAttribute('class'), 'created-icon');
    assert.equal(icon.querySelector('title')?.textContent, 'Home');
    assert.ok(icon.querySelector('path'));
  } finally {
    if (previous === undefined) delete globalThis.document;
    else globalThis.document = previous;
  }
});
