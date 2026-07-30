import assert from 'node:assert/strict';
import { createElement, createRef } from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import test from 'node:test';
import { loadRuntime } from './load-runtime.mjs';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const { Icon, Home1Regular, User2Filled } = await loadRuntime();

test('unlabelled icons are hidden by default and labelled icons are accessible', async () => {
  const hidden = await render(createElement(Home1Regular));
  const hiddenSvg = hidden.root.findByType('Svg');
  assert.equal(hiddenSvg.props.accessible, false);
  assert.equal(hiddenSvg.props.accessibilityElementsHidden, true);
  assert.equal(hiddenSvg.props.importantForAccessibility, 'no-hide-descendants');

  const labelled = await render(createElement(Home1Regular, { title: 'Home' }));
  const labelledSvg = labelled.root.findByType('Svg');
  assert.equal(labelledSvg.props.accessible, true);
  assert.equal(labelledSvg.props.accessibilityLabel, 'Home');
  assert.equal(labelledSvg.props.accessibilityRole, 'image');
  assert.equal(labelledSvg.props.accessibilityElementsHidden, undefined);
});

test('explicit accessibility props and dimensions take precedence', async () => {
  const onPress = () => {};
  const renderer = await render(createElement(Home1Regular, {
    size: 32, width: 40, height: 48, color: '#111827', title: 'Fallback',
    accessible: false, accessibilityLabel: 'Explicit', accessibilityRole: 'imagebutton',
    accessibilityElementsHidden: true, importantForAccessibility: 'yes',
    style: { margin: 2 }, testID: 'home-icon', onPress,
  }));
  const svg = renderer.root.findByType('Svg');
  assert.equal(svg.props.width, 40);
  assert.equal(svg.props.height, 48);
  assert.equal(svg.props.color, '#111827');
  assert.equal(svg.props.accessible, false);
  assert.equal(svg.props.accessibilityLabel, 'Explicit');
  assert.equal(svg.props.accessibilityRole, 'imagebutton');
  assert.equal(svg.props.accessibilityElementsHidden, true);
  assert.equal(svg.props.importantForAccessibility, 'yes');
  assert.deepEqual(svg.props.style, { margin: 2 });
  assert.equal(svg.props.testID, 'home-icon');
  assert.equal(svg.props.onPress, onPress);
});

test('refs reach the native Svg host and clear on unmount', async () => {
  const ref = createRef();
  const node = { nativeTag: 'Svg' };
  let renderer;
  await act(async () => {
    renderer = TestRenderer.create(createElement(Home1Regular, { ref }), {
      createNodeMock(element) { return element.type === 'Svg' ? node : null; },
    });
  });
  assert.equal(ref.current, node);
  await act(async () => renderer.unmount());
  assert.equal(ref.current, null);
});

test('filled icons honor the caller color', async () => {
  const renderer = await render(createElement(User2Filled, { color: '#111827' }));
  const paths = renderer.root.findAllByType('Path');
  assert.ok(paths.some((path) => path.props.fill === '#111827'));
});

test('shared Icon preserves the same accessibility defaults', async () => {
  const renderer = await render(createElement(Icon, { accessibilityLabel: 'Utility' }));
  const svg = renderer.root.findByType('Svg');
  assert.equal(svg.props.accessible, true);
  assert.equal(svg.props.accessibilityLabel, 'Utility');
});

async function render(element) {
  let renderer;
  await act(async () => { renderer = TestRenderer.create(element); });
  return renderer;
}
