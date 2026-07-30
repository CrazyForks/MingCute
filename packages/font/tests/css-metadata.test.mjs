import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const root = path.resolve(import.meta.dirname, '..');
const styles = JSON.parse(await readFile(path.join(root, 'dist/metadata/styles.json'), 'utf8')).styles;
const icons = JSON.parse(await readFile(path.join(root, 'dist/metadata/icons.json'), 'utf8')).icons;

test('style CSS maps every free icon to its stable codepoint', async () => {
  assert.deepEqual(styles.map(({ id }) => id), ['core-regular', 'core-filled']);
  for (const style of styles) {
    const css = await readFile(path.join(root, 'dist', style.cssFile), 'utf8');
    assert.equal(style.fidelity, 'single-color');
    assert.match(css, new RegExp(`@font-face\\{font-family:"${style.fontFamily}"`));
    for (const icon of icons.filter((entry) => entry.styles.includes(style.id))) {
      assert.ok(css.includes(`.mgc-${icon.name}-${style.id}::before`));
      assert.ok(css.includes(`content:"\\${icon.codepoint.toLowerCase()}"`));
    }
  }
});

test('the bundle imports only Regular and Filled', async () => {
  const css = await readFile(path.join(root, 'dist/css/bundle.min.css'), 'utf8');
  assert.deepEqual(
    [...css.matchAll(/@import "\.\/([^"/]+)\.min\.css";/g)].map((match) => match[1]),
    ['core-regular', 'core-filled'],
  );
});
