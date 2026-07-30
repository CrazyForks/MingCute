import type { IconOptions, IconSource } from './types.js';

let titleSequence = 0;
const ATTRIBUTE_NAME = /^[A-Za-z_:][A-Za-z0-9_.:-]*$/;

export function toSvgString(source: IconSource, options: IconOptions = {}): string {
  assertSafeIconSource(source);
  const match = source.trim().match(/^<svg\b([^>]*)>([\s\S]*)<\/svg>$/);
  if (!match) throw new TypeError('Expected a compiled Mingcute SVG string.');
  const attributes = parseAttributes(match[1]);
  const custom = options.attributes ?? {};
  const hasTitle = typeof options.title === 'string' && options.title.length > 0;
  const ariaLabel = custom['aria-label'] ?? options.ariaLabel;
  const ariaLabelledBy = custom['aria-labelledby'];

  const size = options.size ?? 24;
  attributes.set('width', String(size));
  attributes.set('height', String(size));
  if (options.width !== undefined) attributes.set('width', String(options.width));
  if (options.height !== undefined) attributes.set('height', String(options.height));
  attributes.set('color', options.color ?? 'currentColor');
  if (options.className !== undefined) attributes.set('class', options.className);
  if (options.ariaLabel !== undefined) attributes.set('aria-label', options.ariaLabel);
  if (options.ariaHidden !== undefined) attributes.set('aria-hidden', String(options.ariaHidden));

  let title = '';
  if (hasTitle) {
    const titleId = options.titleId ?? `mgc-title-${++titleSequence}`;
    title = `<title id="${escapeXml(titleId)}">${escapeXml(options.title!)}</title>`;
    if (ariaLabel === undefined && ariaLabelledBy === undefined) attributes.set('aria-labelledby', titleId);
    if (!attributes.has('role')) attributes.set('role', 'img');
  } else if (ariaLabel !== undefined || ariaLabelledBy !== undefined) {
    if (!attributes.has('role')) attributes.set('role', 'img');
  } else if (options.ariaHidden === undefined && custom['aria-hidden'] === undefined) {
    attributes.set('aria-hidden', 'true');
  }

  for (const [name, value] of Object.entries(custom)) {
    if (!ATTRIBUTE_NAME.test(name)) throw new TypeError(`Invalid SVG attribute name: ${name}`);
    attributes.set(name, String(value));
  }

  return `<svg${serializeAttributes(attributes)}>${title}${match[2]}</svg>`;
}

export function createIcon(source: IconSource, options: IconOptions = {}): SVGSVGElement {
  if (typeof document === 'undefined') {
    throw new Error('createIcon() requires a DOM. Use toSvgString() in server or non-browser environments.');
  }
  const template = document.createElement('template');
  template.innerHTML = toSvgString(source, options);
  const element = template.content.firstElementChild;
  if (!element || element.namespaceURI !== 'http://www.w3.org/2000/svg' || element.localName !== 'svg') {
    throw new Error('Unable to create an SVG element from the compiled icon.');
  }
  return element as SVGSVGElement;
}

function parseAttributes(source: string): Map<string, string> {
  const attributes = new Map<string, string>();
  const pattern = /([A-Za-z_:][A-Za-z0-9_.:-]*)="([^"]*)"/g;
  for (const match of source.matchAll(pattern)) attributes.set(match[1], decodeXml(match[2]));
  return attributes;
}

function serializeAttributes(attributes: Map<string, string>): string {
  return [...attributes].map(([name, value]) => ` ${name}="${escapeXml(value)}"`).join('');
}

function escapeXml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function decodeXml(value: string): string {
  return value.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

function assertSafeIconSource(source: string): void {
  const activeContent = /<\s*(?:script|iframe|object|embed|link|meta)\b|\bon[a-z]+\s*=|javascript\s*:|data\s*:\s*text\/html|expression\s*\(/i;
  const externalReference = /\b(?:href|xlink:href)\s*=\s*["'](?!#|data:image\/(?:gif|jpeg|png|webp);base64,)/i;
  const externalCssUrl = /url\(\s*(?!#)/i;
  if (activeContent.test(source) || externalReference.test(source) || externalCssUrl.test(source)) {
    throw new TypeError('Icon source contains unsafe active or external content.');
  }
}
