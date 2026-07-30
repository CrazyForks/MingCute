import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import test from 'node:test';

const dom = new JSDOM('<!doctype html><body></body>', { url: 'https://example.test' });
Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement, customElements: dom.window.customElements });
const { Home1Regular, defineHome1Regular, tagName } = await import('../dist/styles/core-regular/home-1.js');

test('registration is explicit, idempotent and returns the class', () => {
  assert.equal(customElements.get(tagName), undefined); assert.equal(defineHome1Regular(), Home1Regular); assert.equal(customElements.get(tagName), Home1Regular); assert.equal(defineHome1Regular(), Home1Regular);
});
test('decorative icons default hidden and explicit hidden values win', () => {
  const icon = mount(); assert.equal(icon.svg.getAttribute('aria-hidden'), 'true'); assert.equal(icon.svg.hasAttribute('role'), false);
  icon.setAttribute('aria-hidden', 'false'); assert.equal(icon.svg.getAttribute('aria-hidden'), 'false');
  icon.setAttribute('aria-label', 'Home'); icon.setAttribute('aria-hidden', 'true'); assert.equal(icon.svg.getAttribute('aria-label'), 'Home'); assert.equal(icon.svg.getAttribute('aria-hidden'), 'true');
});
test('titles are unique and explicit ARIA names and roles take precedence', () => {
  const first = mount({ title: 'Home' }); const second = mount({ title: 'Second home' });
  const firstTitle = first.svg.querySelector('title'); const secondTitle = second.svg.querySelector('title');
  assert.notEqual(firstTitle.id, secondTitle.id); assert.equal(first.svg.getAttribute('aria-labelledby'), firstTitle.id); assert.equal(first.svg.getAttribute('role'), 'img');
  const explicit = mount({ title: 'Tooltip', 'title-id': 'custom-title', 'aria-label': 'Explicit home', role: 'graphics-symbol' });
  assert.equal(explicit.svg.querySelector('title').id, 'custom-title'); assert.equal(explicit.svg.getAttribute('aria-label'), 'Explicit home'); assert.equal(explicit.svg.hasAttribute('aria-labelledby'), false); assert.equal(explicit.svg.getAttribute('role'), 'graphics-symbol');
  explicit.removeAttribute('aria-label'); explicit.setAttribute('aria-labelledby', 'external'); assert.equal(explicit.svg.getAttribute('aria-labelledby'), 'external');
});
test('dimensions, class, style and standard attributes are forwarded to SVG', () => {
  const icon = mount({ size: '32', width: '40', height: '3rem', color: 'red', class: 'sidebar-icon', style: 'color:blue;stroke-width:2', focusable: 'false', 'data-testid': 'home' });
  assert.equal(icon.svg.getAttribute('width'), '40'); assert.equal(icon.svg.getAttribute('height'), '3rem'); assert.equal(icon.svg.getAttribute('class'), 'sidebar-icon');
  assert.match(icon.svg.getAttribute('style'), /color:red;color:blue;stroke-width:2/); assert.equal(icon.svg.getAttribute('focusable'), 'false'); assert.equal(icon.svg.getAttribute('data-testid'), 'home');
  assert.equal(icon.svg, icon.shadowRoot.querySelector('svg')); assert.equal(icon.svg.getAttribute('part'), 'svg');
});

function mount(attributes = {}) { const icon = new Home1Regular(); for (const [name, value] of Object.entries(attributes)) icon.setAttribute(name, value); document.body.append(icon); return icon; }
