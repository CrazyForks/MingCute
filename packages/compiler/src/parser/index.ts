import { SaxesParser } from 'saxes';
import type { ParsedSvg, SvgNode } from './types.js';

export class SvgParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SvgParseError';
  }
}

export interface ParseSvgOptions {
  allowMingcuteAngularPaint?: boolean;
}

/** Parses trusted icon markup and rejects active content, doctypes, and untrusted foreign objects. */
export function parseSvg(source: string, options: ParseSvgOptions = {}): ParsedSvg {
  const parser = new SaxesParser({ xmlns: false });
  const stack: SvgNode[] = [];
  let root: SvgNode | undefined;
  let failure: Error | undefined;

  parser.on('doctype', () => {
    failure = new SvgParseError('SVG doctypes are not allowed.');
  });
  parser.on('opentag', (tag) => {
    if (failure) return;
    const isTrustedFigmaPaint =
      tag.attributes['data-figma-skip-parse'] === 'true' ||
      stack.some((node) => node.attributes['data-figma-skip-parse'] === 'true');
    const isGeneratedAngularPaint =
      options.allowMingcuteAngularPaint === true &&
      stack.some((node) => Boolean(node.attributes['data-mingcute-angular-gradient']));
    const isActiveElement = /^(?:script|iframe|object|embed)$/i.test(tag.name);
    const isUntrustedForeignObject =
      /^foreignObject$/i.test(tag.name) &&
      !isTrustedFigmaPaint &&
      !isGeneratedAngularPaint;
    if (isActiveElement || isUntrustedForeignObject) {
      failure = new SvgParseError(`Unsafe SVG element <${tag.name}> is not allowed.`);
      return;
    }
    const node: SvgNode = {
      name: tag.name,
      attributes: Object.fromEntries(
        Object.entries(tag.attributes).map(([name, value]) => [name, value]),
      ),
      children: [],
    };
    const parent = stack.at(-1);
    if (parent) parent.children.push(node);
    else if (root) failure = new SvgParseError('SVG must have exactly one root element.');
    else root = node;
    stack.push(node);
  });
  parser.on('closetag', () => {
    stack.pop();
  });
  parser.on('text', (text) => {
    if (failure) return;
    if (text.trim() && !stack.some((node) => ['title', 'desc', 'style', 'script'].includes(node.name))) {
      failure = new SvgParseError('Unexpected text content in SVG markup.');
    }
  });
  parser.on('error', (error) => {
    failure = new SvgParseError(error.message);
  });

  parser.write(source).close();
  if (failure) throw failure;
  if (!root || root.name !== 'svg') throw new SvgParseError('Expected an <svg> root element.');
  return { attributes: root.attributes, children: root.children };
}

export type { ParsedSvg, SvgNode } from './types.js';
