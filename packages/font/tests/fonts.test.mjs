import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import * as fontkit from 'fontkit';
import { iconStyles } from '@mingcute/core';

const packageRoot = path.resolve(import.meta.dirname, '..');
const metadata = JSON.parse(await readFile(path.join(packageRoot, 'dist/metadata/icons.json'), 'utf8'));

test('Regular and Filled WOFF2 files contain the documented codepoints', () => {
  assert.deepEqual(iconStyles, ['core-regular', 'core-filled']);
  for (const style of iconStyles) {
    const font = fontkit.openSync(path.join(packageRoot, `dist/fonts/${style}.woff2`));
    assert.equal(font.type, 'WOFF2');
    assert.equal(font.unitsPerEm, 300);
    const expected = metadata.icons
      .filter((icon) => icon.styles.includes(style))
      .map((icon) => Number.parseInt(icon.codepoint, 16))
      .sort((a, b) => a - b);
    assert.deepEqual([...font.characterSet].sort((a, b) => a - b), expected);
  }
});

test('fragile glyphs retain visible outlines in both styles', () => {
  for (const iconName of ['sparkles', 'loading-2']) {
    const icon = metadata.icons.find((entry) => entry.name === iconName);
    assert.ok(icon, `${iconName} metadata is missing`);
    const codepoint = Number.parseInt(icon.codepoint, 16);
    for (const style of iconStyles) {
      const font = fontkit.openSync(path.join(packageRoot, `dist/fonts/${style}.woff2`));
      const glyph = font.glyphForCodePoint(codepoint);
      assert.ok(glyph.path.commands.length >= 8, `${style} ${iconName} has too little outline data`);
      assert.ok(glyph.bbox.maxX - glyph.bbox.minX >= 40, `${style} ${iconName} is too narrow`);
      assert.ok(glyph.bbox.maxY - glyph.bbox.minY >= 40, `${style} ${iconName} is too short`);
    }
  }
});
