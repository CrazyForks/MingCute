import assert from 'node:assert/strict';
import { createRenderer, createSSRApp, h, nextTick, ref } from 'vue';
import { renderToString } from '@vue/server-renderer';
import test from 'node:test';
import { Icon } from '../dist/index.js';
import { Home1Regular } from '../dist/styles/core-regular.js';

test('unlabelled icons are hidden from assistive technology by default', async () => {
  const markup = await render(Home1Regular);
  assert.match(markup, /aria-hidden="true"/);
  assert.doesNotMatch(markup, /role="img"|<title/);
  assert.match(markup, /width="24" height="24"/);
});

test('title creates an associated accessible name with a unique id', async () => {
  const markup = await render('div', {}, () => [
    h(Home1Regular, { title: 'Home' }),
    h(Home1Regular, { title: 'Second home' }),
  ]);
  const titleIds = [...markup.matchAll(/<title id="([^"]+)">/g)].map((match) => match[1]);
  const labelledBy = [...markup.matchAll(/aria-labelledby="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(titleIds.length, 2);
  assert.equal(new Set(titleIds).size, 2);
  assert.deepEqual(labelledBy, titleIds);
  assert.match(markup, /role="img"/);
  assert.doesNotMatch(markup, /aria-hidden/);
});

test('a supplied titleId is preserved', async () => {
  const markup = await render(Home1Regular, { title: 'Home', titleId: 'custom-home-title' });
  assert.match(markup, /<title id="custom-home-title">Home<\/title>/);
  assert.match(markup, /aria-labelledby="custom-home-title"/);
});

test('aria-label takes precedence over automatic title labelling', async () => {
  const markup = await render(Home1Regular, {
    title: 'Decorative title text',
    'aria-label': 'Explicit home label',
  });
  assert.match(markup, /aria-label="Explicit home label"/);
  assert.doesNotMatch(markup, /aria-labelledby=/);
  assert.match(markup, /<title[^>]*>Decorative title text<\/title>/);
});

test('explicit aria-labelledby and role are never overwritten', async () => {
  const markup = await render(Home1Regular, {
    title: 'Home',
    'aria-labelledby': 'external-label',
    role: 'graphics-symbol',
  });
  assert.match(markup, /aria-labelledby="external-label"/);
  assert.match(markup, /role="graphics-symbol"/);
});

test('explicit aria-hidden values override both the default and labelled states', async () => {
  const visible = await render(Home1Regular, { 'aria-hidden': false });
  const hiddenLabelled = await render(Home1Regular, {
    'aria-hidden': true,
    'aria-label': 'Hidden by caller',
  });
  assert.match(visible, /aria-hidden="false"/);
  assert.match(hiddenLabelled, /aria-hidden="true"/);
  assert.match(hiddenLabelled, /aria-label="Hidden by caller"/);
});

test('size defaults yield to explicit dimensions and standard attrs are forwarded', async () => {
  const markup = await render(Home1Regular, {
    size: 32,
    width: 40,
    height: '3rem',
    color: 'red',
    class: 'sidebar-icon',
    style: { color: 'blue', strokeWidth: 2 },
    viewBox: '1 2 20 20',
    focusable: 'false',
    'data-testid': 'home-icon',
  });
  assert.match(markup, /width="40" height="3rem"/);
  assert.match(markup, /viewBox="1 2 20 20"/);
  assert.match(markup, /class="sidebar-icon"/);
  assert.match(markup, /style="[^"]*color:blue;[^"]*stroke-width:2/);
  assert.match(markup, /focusable="false"/);
  assert.match(markup, /data-testid="home-icon"/);
  assert.doesNotMatch(markup, /style="[^"]*color:red/);
});

test('refs and event attrs reach the underlying SVG element', async () => {
  const iconRef = ref();
  const onClick = () => {};
  const host = createHostRenderer();
  const root = host.root();
  const app = host.renderer.createApp({
    render: () => h(Home1Regular, { ref: iconRef, id: 'ref-icon', onClick }),
  });
  app.mount(root);
  await nextTick();
  assert.equal(iconRef.value.tag, 'svg');
  assert.equal(iconRef.value.props.id, 'ref-icon');
  assert.equal(iconRef.value.props.onClick, onClick);
  app.unmount();
  await nextTick();
  assert.equal(iconRef.value, null);
});

test('the shared Icon utility has the same accessibility and forwarding behavior', async () => {
  const markup = await render(Icon, {
    title: 'Shared utility',
    class: 'utility',
    'aria-label': 'Explicit utility label',
  });
  assert.match(markup, /class="utility"/);
  assert.match(markup, /aria-label="Explicit utility label"/);
  assert.doesNotMatch(markup, /aria-labelledby=/);
});

async function render(component, props = {}, slots) {
  return renderToString(createSSRApp({ render: () => h(component, props, slots?.()) }));
}

function createHostRenderer() {
  const renderer = createRenderer({
    patchProp(element, key, _previous, value) { element.props[key] = value; },
    insert(element, parent, anchor) {
      element.parent = parent;
      const index = anchor ? parent.children.indexOf(anchor) : -1;
      if (index < 0) parent.children.push(element);
      else parent.children.splice(index, 0, element);
    },
    remove(element) {
      const index = element.parent?.children.indexOf(element) ?? -1;
      if (index >= 0) element.parent.children.splice(index, 1);
    },
    createElement(tag) { return { tag, props: {}, children: [], parent: null }; },
    createText(text) { return { text, parent: null }; },
    createComment(text) { return { comment: text, parent: null }; },
    setText(node, text) { node.text = text; },
    setElementText(node, text) { node.text = text; },
    parentNode(node) { return node.parent; },
    nextSibling(node) {
      const siblings = node.parent?.children ?? [];
      return siblings[siblings.indexOf(node) + 1] ?? null;
    },
    querySelector() { return null; },
    setScopeId() {},
    insertStaticContent() { return []; },
  });
  return {
    renderer,
    root: () => ({ tag: 'root', props: {}, children: [], parent: null }),
  };
}
