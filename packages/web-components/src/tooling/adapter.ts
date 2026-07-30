import {
  iconStyles, frameworkStyleExports, toKebabCase, type AdapterContext, type FrameworkAdapter, type GeneratedFile,
  type IconDefinition, type PackageContext, type IconStyle,
} from '@mingcute/core';

export const webComponentsAdapter: FrameworkAdapter = {
  name: 'web-components',
  generateIcon(definition: IconDefinition, context: AdapterContext): GeneratedFile[] {
    assertStyleContext(definition, context);
    const fileName = toKebabCase(definition.name); const basePath = `dist/styles/${context.style}/${fileName}`;
    const tagName = `mingcute-${fileName}-${context.style}`; const defineName = `define${definition.componentName}`;
    return [
      { path: `${basePath}.js`, kind: 'source', contents: [
        "import { MingcuteIconElement, defineIconElement } from '../../runtime/element.js';",
        `import definition from '@mingcute/icons/${context.style}/${fileName}';`,
        `export class ${definition.componentName} extends MingcuteIconElement {`,
        '  static source = definition;', `  static iconName = ${JSON.stringify(definition.componentName)};`, '}',
        `export const tagName = ${JSON.stringify(tagName)};`,
        `export function ${defineName}(name = tagName, registry) { return defineIconElement(name, ${definition.componentName}, registry); }`,
        `export default ${definition.componentName};`, ''
      ].join('\n') },
      { path: `${basePath}.d.ts`, kind: 'types', contents: [
        "import { MingcuteIconElement } from '../../runtime/element.js';",
        `export declare class ${definition.componentName} extends MingcuteIconElement {}`,
        'export declare const tagName: string;',
        `export declare function ${defineName}(name?: string, registry?: CustomElementRegistry): typeof ${definition.componentName};`,
        `export default ${definition.componentName};`, ''
      ].join('\n') },
    ];
  },
  generateStyleIndex(style: IconStyle, icons: readonly IconDefinition[]): GeneratedFile[] {
    const sorted = [...icons].sort((a, b) => toKebabCase(a.name).localeCompare(toKebabCase(b.name)));
    const exports = sorted.map((icon) => `export { ${icon.componentName}, define${icon.componentName} } from './${style}/${toKebabCase(icon.name)}.js';`).join('\n');
    return [
      { path: `dist/styles/${style}.js`, contents: `${exports}\n`, kind: 'source' },
      { path: `dist/styles/${style}.d.ts`, contents: `${exports}\n`, kind: 'types' },
    ];
  },
  generateRootIndex(): GeneratedFile[] { return [
    { path: 'dist/index.js', contents: "export { MingcuteIconElement, defineIconElement } from './runtime/element.js';\n", kind: 'source' },
    { path: 'dist/index.d.ts', contents: "export { MingcuteIconElement, defineIconElement } from './runtime/element.js';\nexport type { IconDefinitionData, MingcuteIconConstructor } from './runtime/types.js';\n", kind: 'types' },
  ]; },
  generatePackageManifest(context: PackageContext): Record<string, unknown> { return {
    name: context.packageName, version: context.version, description: 'Mingcute SVG icon custom elements.',
    license: 'Apache-2.0', private: false, type: 'module', main: './dist/index.js', types: './dist/index.d.ts',
    exports: frameworkStyleExports(context.styles),
    files: ['dist','README.md','LICENSE'], dependencies: { '@mingcute/icons': `workspace:*` },
    publishConfig: { access: 'public' }, sideEffects: false,
  }; },
};
function assertStyleContext(definition: IconDefinition, context: AdapterContext): void {
  if (definition.style !== context.style) throw new Error(`Icon style ${definition.style} does not match adapter context ${context.style}.`);
  if (!iconStyles.includes(context.style)) throw new Error(`Unsupported icon style: ${context.style}`);
}
