import type { IconDefinition, IconMetadata, IconStyle } from '@mingcute/core';

export type CompileDiagnosticCode =
  | 'figma-paint-normalized'
  | 'unsupported-element-omitted'
  | 'unsupported-paint-server-flattened';

export interface CompileDiagnostic {
  code: CompileDiagnosticCode;
  message: string;
  element?: string;
}

export interface CompileOptions {
  name: string;
  style: IconStyle;
  metadata?: IconMetadata;
  sourcePath?: string;
}

export interface CompileFileOptions {
  style: IconStyle;
  sourceRoot?: string;
  metadata?: IconMetadata;
}

export interface CompileResult {
  definition: IconDefinition;
  optimizedSvg: string;
  innerSvg: string;
  diagnostics: CompileDiagnostic[];
}
