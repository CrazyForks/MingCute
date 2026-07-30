import type { IconDefinition } from '../icons/definition.js';
import type { IconStyle } from '../styles/catalogue.js';

export type GeneratedFileKind = 'source' | 'types' | 'manifest' | 'asset' | 'metadata';

export interface GeneratedFile {
  path: string;
  contents: string | Uint8Array;
  kind?: GeneratedFileKind;
}

export interface AdapterContext {
  packageName: string;
  style: IconStyle;
  sourcePath?: string;
}

export interface PackageContext {
  packageName: string;
  version: string;
  styles: readonly IconStyle[];
}

/**
 * Shared generation contract implemented by every framework and format
 * adapter. Style declarations remain in the internal core workspace.
 */
export interface FrameworkAdapter {
  readonly name: string;
  generateIcon(definition: IconDefinition, context: AdapterContext): GeneratedFile[];
  generateStyleIndex(style: IconStyle, icons: readonly IconDefinition[]): GeneratedFile[];
  generateRootIndex(styles: readonly IconStyle[]): GeneratedFile[];
  generatePackageManifest(context: PackageContext): Record<string, unknown>;
}

export interface ModuleExportTarget {
  types: string;
  import: string;
}

export type PackageExportMap = Record<string, ModuleExportTarget>;

export function frameworkStyleExports(styles: readonly IconStyle[]): PackageExportMap {
  const exports: PackageExportMap = {
    '.': {
      types: './dist/index.d.ts',
      import: './dist/index.js',
    },
  };

  for (const style of styles) {
    exports[`./${style}`] = {
      types: `./dist/styles/${style}.d.ts`,
      import: `./dist/styles/${style}.js`,
    };
    exports[`./${style}/*`] = {
      types: `./dist/styles/${style}/*.d.ts`,
      import: `./dist/styles/${style}/*.js`,
    };
  }

  return exports;
}
