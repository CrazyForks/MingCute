import {
  componentNameFor,
  normalizeIconMetadata,
  type IconMetadata,
  type IconStyle,
} from '@mingcute/core';

export function sourceSuffixForStyle(style: IconStyle): string {
  return `_${style.slice('core-'.length)}`;
}

export function normalizeSourceName(fileName: string, style: IconStyle): string {
  const suffix = sourceSuffixForStyle(style);
  return fileName.endsWith(suffix) ? fileName.slice(0, -suffix.length) : fileName;
}

export function generateMetadata(metadata: IconMetadata | undefined): IconMetadata {
  return normalizeIconMetadata(metadata);
}

export function generateComponentName(name: string, style: IconStyle): string {
  return componentNameFor(name, style);
}
