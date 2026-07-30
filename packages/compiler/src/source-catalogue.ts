import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { iconStyles, type IconStyle } from '@mingcute/core';
import { compileSvg } from './compile.js';
import { normalizeSourceName } from './metadata/index.js';
import type { CompileResult } from './types.js';

interface SourceManifestEntry {
  path: string;
  packageStyle: string;
  packageCategory: string;
  packageFileName: string;
}

interface SourceManifest {
  schemaVersion: number;
  count: number;
  failed: unknown[];
  entries: SourceManifestEntry[];
}

export interface IconSource {
  sourcePath: string;
  name: string;
  style: IconStyle;
  category: string;
}

export async function discoverIconSources(assetRoot: string, style: IconStyle): Promise<IconSource[]> {
  const manifestPath = path.join(assetRoot, 'manifest.json');
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8')) as SourceManifest;
  validateManifest(manifest, manifestPath);

  const sources = manifest.entries
    .filter((entry) => entry.packageStyle === style)
    .map((entry) => toIconSource(assetRoot, style, entry));
  const names = new Set<string>();

  for (const source of sources) {
    if (names.has(source.name)) {
      throw new Error(`${manifestPath}: duplicate package icon "${source.name}" in style "${style}".`);
    }
    names.add(source.name);
  }

  return sources.sort((left, right) =>
    left.name.localeCompare(right.name) || left.sourcePath.localeCompare(right.sourcePath));
}

export async function compileIconSource(source: IconSource): Promise<CompileResult> {
  const svg = await readFile(source.sourcePath, 'utf8');
  return compileSvg(svg, {
    name: source.name,
    style: source.style,
    sourcePath: source.sourcePath,
    metadata: { category: source.category },
  });
}

function toIconSource(assetRoot: string, style: IconStyle, entry: SourceManifestEntry): IconSource {
  if (!entry.path || !entry.packageCategory || !entry.packageFileName.endsWith('.svg')) {
    throw new Error(`Invalid source manifest entry for style "${style}".`);
  }
  if (path.basename(entry.packageFileName) !== entry.packageFileName) {
    throw new Error(`Unsafe package filename in source manifest: ${entry.packageFileName}`);
  }

  const sourcePath = path.resolve(assetRoot, entry.path);
  const rootPrefix = `${path.resolve(assetRoot)}${path.sep}`;
  if (!sourcePath.startsWith(rootPrefix)) {
    throw new Error(`Unsafe source path in manifest: ${entry.path}`);
  }

  return {
    sourcePath,
    name: normalizeSourceName(path.basename(entry.packageFileName, '.svg'), style),
    style,
    category: entry.packageCategory,
  };
}

function validateManifest(manifest: SourceManifest, manifestPath: string): void {
  if (manifest.schemaVersion !== 2 || !Array.isArray(manifest.entries) || !Array.isArray(manifest.failed)) {
    throw new Error(`${manifestPath}: unsupported source manifest.`);
  }
  if (manifest.failed.length !== 0) {
    throw new Error(`${manifestPath}: source export contains ${manifest.failed.length} failed icons.`);
  }
  if (manifest.count !== manifest.entries.length) {
    throw new Error(`${manifestPath}: declared count does not match its entries.`);
  }

  const styles = new Set<string>(iconStyles);
  const unsupported = manifest.entries.find((entry) => !styles.has(entry.packageStyle));
  if (unsupported) {
    throw new Error(`${manifestPath}: unsupported package style "${unsupported.packageStyle}".`);
  }
}
