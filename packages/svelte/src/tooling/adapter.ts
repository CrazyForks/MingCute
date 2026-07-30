import {
  iconStyles,
  toKebabCase,
  type AdapterContext,
  type FrameworkAdapter,
  type GeneratedFile,
  type IconDefinition,
  type PackageContext,
  type IconStyle,
} from '@mingcute/core';

export const svelteAdapter: FrameworkAdapter = {
  name: 'svelte',

  generateIcon(definition: IconDefinition, context: AdapterContext): GeneratedFile[] {
    assertStyleContext(definition, context);
    const fileName = toKebabCase(definition.name);
    const basePath = `dist/styles/${context.style}/${fileName}`;
    const component = [
      '<script>',
      "  import Icon from '../../runtime/Icon.svelte';",
      `  import definition from '@mingcute/icons/${context.style}/${fileName}';`,
      "  import { renderIconBody } from '@mingcute/icons';",
      '  const source = renderIconBody(definition);',
      `  const viewBox = ${JSON.stringify(definition.viewBox)};`,
      '  let { ref = $bindable(), ...props } = $props();',
      '</script>',
      '',
      `<Icon {source} {viewBox} name=${JSON.stringify(definition.componentName)} {...props} bind:ref />`,
      '',
    ].join('\n');
    const declarations = [
      "import type { Component } from 'svelte';",
      "import type { IconProps } from '../../runtime/types.js';",
      `declare const ${definition.componentName}: Component<IconProps, {}, 'ref'>;`,
      `export default ${definition.componentName};`,
      '',
    ].join('\n');
    return [
      { path: `${basePath}.svelte`, contents: component, kind: 'source' },
      { path: `${basePath}.d.ts`, contents: declarations, kind: 'types' },
    ];
  },

  generateStyleIndex(style: IconStyle, icons: readonly IconDefinition[]): GeneratedFile[] {
    const sorted = [...icons].sort((left, right) => toKebabCase(left.name).localeCompare(toKebabCase(right.name)));
    const exports = sorted.map((icon) =>
      `export { default as ${icon.componentName} } from './${style}/${toKebabCase(icon.name)}.svelte';`).join('\n');
    return [
      { path: `dist/styles/${style}.js`, contents: `${exports}\n`, kind: 'source' },
      { path: `dist/styles/${style}.d.ts`, contents: `${exports}\n`, kind: 'types' },
    ];
  },

  generateRootIndex(): GeneratedFile[] {
    return [
      { path: 'dist/index.js', contents: "export { default as Icon } from './runtime/Icon.svelte';\n", kind: 'source' },
      {
        path: 'dist/index.d.ts',
        contents: "export { default as Icon } from './runtime/Icon.svelte';\nexport type { IconDataProps, IconProps } from './runtime/types.js';\n",
        kind: 'types',
      },
    ];
  },

  generatePackageManifest(context: PackageContext): Record<string, unknown> {
    const styleExports = Object.fromEntries(context.styles.flatMap((style) => [
      [
        `./${style}`,
        {
          types: `./dist/styles/${style}.d.ts`,
          svelte: `./dist/styles/${style}.js`,
          import: `./dist/styles/${style}.js`,
        },
      ],
      [
        `./${style}/*`,
        {
          types: `./dist/styles/${style}/*.d.ts`,
          svelte: `./dist/styles/${style}/*.svelte`,
          import: `./dist/styles/${style}/*.svelte`,
        },
      ],
    ]));
    return {
      name: context.packageName,
      version: context.version,
      description: 'Mingcute SVG icon components for Svelte.',
      license: 'Apache-2.0',
      private: false,
      type: 'module',
      svelte: './dist/index.js',
      main: './dist/index.js',
      types: './dist/index.d.ts',
      exports: {
        '.': { types: './dist/index.d.ts', svelte: './dist/index.js', import: './dist/index.js' },
        ...styleExports,
      },
      files: ['dist', 'README.md', 'LICENSE'],
      dependencies: { '@mingcute/icons': `workspace:*` },
      peerDependencies: { svelte: '>=5.20.0' },
      publishConfig: { access: 'public' },
      sideEffects: false,
    };
  },
};

function assertStyleContext(definition: IconDefinition, context: AdapterContext): void {
  if (definition.style !== context.style) {
    throw new Error(`Icon style ${definition.style} does not match adapter context ${context.style}.`);
  }
  if (!iconStyles.includes(context.style)) throw new Error(`Unsupported icon style: ${context.style}`);
}
