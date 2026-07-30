import { createRequire } from 'node:module';
import path from 'node:path';
import { build } from 'esbuild';

const packageRoot = path.resolve(import.meta.dirname, '..');
const nativeComponents = [
  'Circle', 'ClipPath', 'Defs', 'Ellipse', 'G', 'Image', 'Line', 'LinearGradient',
  'Mask', 'Path', 'Pattern', 'Polygon', 'Polyline', 'RadialGradient', 'Rect', 'Stop', 'Svg',
];

export async function loadRuntime() {
  const result = await build({
    stdin: {
      contents: [
        "export { Icon } from '../dist/index.js';",
        "export { Home1Regular, LoadingRegular } from '../dist/styles/core-regular.js';",
        "export { User2Filled } from '../dist/styles/core-filled.js';",
      ].join('\n'),
      resolveDir: path.join(packageRoot, 'tests'),
    },
    bundle: true,
    format: 'cjs',
    platform: 'node',
    write: false,
    external: ['react'],
    plugins: [{
      name: 'react-native-svg-test-hosts',
      setup(buildApi) {
        buildApi.onResolve({ filter: /^react-native-svg$/ }, () => ({ path: 'react-native-svg', namespace: 'rn-svg-stub' }));
        buildApi.onLoad({ filter: /.*/, namespace: 'rn-svg-stub' }, () => ({
          loader: 'js',
          contents: [
            "import React, { forwardRef } from 'react';",
            "const host = (name) => { const Component = forwardRef((props, ref) => React.createElement(name, { ...props, ref }, props.children)); Component.displayName = name; return Component; };",
            ...nativeComponents.map((name) => `export const ${name} = host(${JSON.stringify(name)});`),
            'export default Svg;',
          ].join('\n'),
        }));
      },
    }],
    logLevel: 'silent',
  });
  const module = { exports: {} };
  const localRequire = createRequire(import.meta.url);
  new Function('require', 'module', 'exports', result.outputFiles[0].text)(localRequire, module, module.exports);
  return module.exports;
}
