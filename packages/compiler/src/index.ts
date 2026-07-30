export { compileIconFile, compileStyleDirectory, compileSvg, discoverSvgFiles } from './compile.js';
export { generateComponentName, generateMetadata, normalizeSourceName, sourceSuffixForStyle } from './metadata/index.js';
export { normalizeSvg, type NormalizedSvg } from './normaliser/index.js';
export { extractSvgInner, optimiseSvg } from './optimiser/index.js';
export { parseSvg, SvgParseError, type ParsedSvg, type SvgNode } from './parser/index.js';
export { compileIconSource, discoverIconSources, type IconSource } from './source-catalogue.js';
export { IconValidationError, validateIconDefinition } from './validator/index.js';
export type {
  CompileDiagnostic,
  CompileDiagnosticCode,
  CompileFileOptions,
  CompileOptions,
  CompileResult,
} from './types.js';
