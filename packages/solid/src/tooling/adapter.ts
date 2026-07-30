import {
  iconStyles, frameworkStyleExports, toKebabCase, type AdapterContext, type FrameworkAdapter, type GeneratedFile,
  type IconDefinition, type PackageContext, type IconStyle,
} from '@mingcute/core';

export const solidAdapter: FrameworkAdapter = {
  name: 'solid',
  generateIcon(definition: IconDefinition, context: AdapterContext): GeneratedFile[] {
    assertStyleContext(definition, context);
    const fileName = toKebabCase(definition.name);
    const basePath = `dist/styles/${context.style}/${fileName}`;
    return [
      { path: `${basePath}.js`, kind: 'source', contents: [
        "import { createIcon } from '../../runtime/createIcon.js';",
        `import definition from '@mingcute/icons/${context.style}/${fileName}';`,
        "import { renderIconBody } from '@mingcute/icons';",
        'const source = renderIconBody(definition);',
        `export const ${definition.componentName} = /* @__PURE__ */ createIcon(source, ${JSON.stringify(definition.viewBox)}, ${JSON.stringify(definition.componentName)});`,
        `export default ${definition.componentName};`, ''
      ].join('\n') },
      { path: `${basePath}.d.ts`, kind: 'types', contents: [
        "import type { Component } from 'solid-js';",
        "import type { IconProps } from '../../runtime/types.js';",
        `export declare const ${definition.componentName}: Component<IconProps>;`,
        `export default ${definition.componentName};`, ''
      ].join('\n') },
    ];
  },
  generateStyleIndex(style: IconStyle, icons: readonly IconDefinition[]): GeneratedFile[] {
    const sorted = [...icons].sort((a, b) => toKebabCase(a.name).localeCompare(toKebabCase(b.name)));
    const exports = sorted.map((icon) => `export { ${icon.componentName} } from './${style}/${toKebabCase(icon.name)}.js';`).join('\n');
    return [
      { path: `dist/styles/${style}.js`, contents: `${exports}\n`, kind: 'source' },
      { path: `dist/styles/${style}.d.ts`, contents: `${exports}\n`, kind: 'types' },
    ];
  },
  generateRootIndex(): GeneratedFile[] {
    return [
      { path: 'dist/index.js', contents: "export { Icon } from './runtime/Icon.js';\n", kind: 'source' },
      { path: 'dist/index.d.ts', contents: "export { Icon } from './runtime/Icon.js';\nexport type { IconProps } from './runtime/types.js';\n", kind: 'types' },
    ];
  },
  generatePackageManifest(context: PackageContext): Record<string, unknown> {
    return {
      name: context.packageName, version: context.version, description: 'Mingcute SVG icon components for SolidJS.',
      license: 'Apache-2.0', private: false, type: 'module', main: './dist/index.js', types: './dist/index.d.ts',
      exports: frameworkStyleExports(context.styles),
      files: ['dist', 'README.md', 'LICENSE'], peerDependencies: { 'solid-js': '>=1.9.0 <2' },
      dependencies: { '@mingcute/icons': `workspace:*` },
      publishConfig: { access: 'public' }, sideEffects: false,
    };
  },
};

function assertStyleContext(definition: IconDefinition, context: AdapterContext): void {
  if (definition.style !== context.style) throw new Error(`Icon style ${definition.style} does not match adapter context ${context.style}.`);
  if (!iconStyles.includes(context.style)) throw new Error(`Unsupported icon style: ${context.style}`);
}
