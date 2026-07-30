import svg2ttf from 'svg2ttf';
import ttf2woff2 from 'ttf2woff2';
import type { IconDefinition } from '@mingcute/core';
import { definitionToGlyphPath, fontMetrics, type GlyphLayer } from './glyph.js';
import { formatCodepoint } from './codepoints.js';

export interface FontGlyphInput {
  definition: IconDefinition;
  identity: string;
  codepoint: number;
}

export function buildWoff2Font(
  familyName: string,
  glyphs: readonly FontGlyphInput[],
  layer: GlyphLayer = 'all',
  version = '0.1.0',
): Uint8Array {
  const glyphXml = glyphs.map(({ definition, identity, codepoint }) => {
    const pathData = definitionToGlyphPath(definition, layer);
    return `<glyph glyph-name="${escapeXml(identity)}" unicode="&#x${formatCodepoint(codepoint)};" horiz-adv-x="${fontMetrics.advanceWidth}" d="${escapeXml(pathData)}"/>`;
  }).join('');
  const source = `<svg xmlns="http://www.w3.org/2000/svg"><defs><font id="${escapeXml(familyName.replace(/[^A-Za-z0-9]/g, ''))}" horiz-adv-x="${fontMetrics.advanceWidth}">` +
    `<font-face font-family="${escapeXml(familyName)}" units-per-em="${fontMetrics.unitsPerEm}" ascent="${fontMetrics.ascent}" descent="${fontMetrics.descent}"/>` +
    `<missing-glyph horiz-adv-x="${fontMetrics.advanceWidth}"/>${glyphXml}</font></defs></svg>`;
  const ttf = svg2ttf(source, {
    copyright: 'Mingcute commercial license',
    description: `${familyName} icon font`,
    ts: 0,
    version: openTypeVersion(version),
  });
  return new Uint8Array(ttf2woff2(Buffer.from(ttf.buffer)));
}

function openTypeVersion(version: string): string {
  const match = version.match(/^(\d+)\.(\d+)(?:\.\d+)?(?:[-+].*)?$/);
  if (!match) throw new TypeError(`Invalid font package version: ${version}`);
  return `${match[1]}.${match[2]}`;
}

function escapeXml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
