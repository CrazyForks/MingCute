import { MingcuteCoreError } from '../errors.js';
import { iconStyles, type IconStyle } from './catalogue.js';

const styleSet: ReadonlySet<string> = new Set(iconStyles);

export function isIconStyle(value: unknown): value is IconStyle {
  return typeof value === 'string' && styleSet.has(value);
}

export function assertIconStyle(value: unknown): IconStyle {
  if (!isIconStyle(value)) {
    throw new MingcuteCoreError('invalid_style', `Unsupported Mingcute style: ${String(value)}`);
  }

  return value;
}

export function resolveIconStyles(values?: readonly unknown[]): readonly IconStyle[] {
  if (!values) return iconStyles;

  const resolved = values.map(assertIconStyle);
  return [...new Set(resolved)];
}

export function styleDisplayName(style: IconStyle): string {
  return style
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function styleComponentSuffix(style: IconStyle): string {
  return style
    .slice('core-'.length)
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}
