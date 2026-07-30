import assert from 'node:assert/strict';
import test from 'node:test';
import {
  componentNameFor,
  iconStyles,
  isIconStyle,
  resolveIconStyles,
  styleComponentSuffix,
} from '../dist/index.js';

test('the free style catalogue contains only Regular and Filled', () => {
  assert.deepEqual(iconStyles, ['core-regular', 'core-filled']);
  assert.equal(iconStyles.every(isIconStyle), true);
  assert.deepEqual(resolveIconStyles(['core-filled', 'core-regular', 'core-filled']), ['core-filled', 'core-regular']);
  assert.throws(() => resolveIconStyles(['duotone']), /Unsupported Mingcute style/);
});

test('component naming remains compatible with the Pro edition', () => {
  assert.equal(styleComponentSuffix('core-regular'), 'Regular');
  assert.equal(componentNameFor('home_1', 'core-filled'), 'Home1Filled');
  assert.equal(componentNameFor('3d_box', 'core-regular'), 'Mgc3DBoxRegular');
});
