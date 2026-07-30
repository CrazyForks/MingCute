import type { IconStyle } from '../styles/catalogue.js';
import { styleComponentSuffix } from '../styles/resolver.js';

const acronyms = new Set([
  'ai', 'api', 'ar', 'aws', 'css', 'csv', 'dns', 'gif', 'gps', 'hd', 'html',
  'id', 'ip', 'ios', 'js', 'json', 'pdf', 'png', 'ppt', 'qr', 'rss', 'sdk',
  'seo', 'svg', 'tv', 'ui', 'url', 'usb', 'ux', 'vip', 'vr', 'wifi', 'www',
  'xls', 'xml', 'zip', 'abs',
]);

export function toKebabCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

export function toPascalCase(value: string): string {
  const name = value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map(toPascalPart)
    .join('');

  return /^\d/.test(name) ? `Mgc${name}` : name;
}

export function componentNameFor(iconName: string, style: IconStyle): string {
  return `${toPascalCase(iconName)}${styleComponentSuffix(style)}`;
}

function toPascalPart(part: string): string {
  const lower = part.toLowerCase();
  if (acronyms.has(lower)) return lower.toUpperCase();
  if (/^\d+[a-z]+$/i.test(part)) {
    return part.replace(/[a-z]+/i, (letters) => letters.toUpperCase());
  }
  return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
}
