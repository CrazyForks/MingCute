import type { IconStyle } from '../styles/catalogue.js';

export interface IconMetadata {
  category?: string;
  keywords?: string[];
  tags?: string[];
  version?: string;
}

export interface IconRecord extends IconMetadata {
  name: string;
  componentName: string;
  style: IconStyle;
}

export function normalizeIconMetadata(metadata: IconMetadata = {}): IconMetadata {
  return {
    ...(metadata.category ? { category: metadata.category.trim() } : {}),
    ...(metadata.keywords ? { keywords: uniqueStrings(metadata.keywords) } : {}),
    ...(metadata.tags ? { tags: uniqueStrings(metadata.tags) } : {}),
    ...(metadata.version ? { version: metadata.version.trim() } : {}),
  };
}

function uniqueStrings(values: readonly string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}
