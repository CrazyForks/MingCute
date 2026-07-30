<a href="https://www.mingcute.com/">
  <img src="./images/banner1.png" alt="MGC Icon System: Core Regular and Core Filled" width="100%" />
</a>

<h1 align="center">Mingcute Icons</h1>

<h3 align="center">Carefully Designed Icon Library</h3>

<p align="center">
  <a href="https://www.mingcute.com/"><img src="https://img.shields.io/badge/mingcute.com-website-007AFF" alt="Mingcute website" /></a>&nbsp;
  <a href="https://www.npmjs.com/package/@mingcute/icons"><img src="https://img.shields.io/npm/v/@mingcute/icons?color=007AFF&label=version" alt="npm version" /></a>&nbsp;
  <a href="https://bundlephobia.com/package/@mingcute/icons"><img src="https://img.shields.io/bundlephobia/minzip/@mingcute/icons?color=007AFF&label=gzip" alt="minified and gzipped npm package size" /></a>&nbsp;
  <a href="https://www.npmjs.com/package/@mingcute/icons"><img src="https://img.shields.io/npm/dm/@mingcute/icons?color=23AF5F&label=downloads" alt="monthly npm downloads" /></a>&nbsp;
  <a href="https://github.com/mingcute-design/mingcute-icons/stargazers"><img src="https://img.shields.io/github/stars/mingcute-design/mingcute-icons?color=007AFF&style=flat" alt="GitHub stars" /></a>&nbsp;
  <a href="https://x.com/MingCute_icon"><img src="https://img.shields.io/twitter/follow/MingCute_icon?style=social" alt="Follow Mingcute on X" /></a>
</p>

---

## Overview

Mingcute Icons is the public, open-source distribution of the Mingcute Icon System. It ships 1,663 icons in Core Regular and Core Filled across ten focused packages for framework components, raw SVG, icon fonts, and framework-neutral definitions.

Every renderer consumes the same generated `@mingcute/icons` definitions. Icon geometry is compiled once rather than copied into every framework package, keeping the repository maintainable and package behavior consistent.

## Highlights

- **3,326 styled definitions:** 1,663 icons in both Core Regular and Core Filled.
- **Ten production packages:** React, Vue, React Native, Svelte, SolidJS, Vanilla JavaScript, Web Components, SVG, fonts, and framework-neutral definitions.
- **Tree-shakeable exports:** use a style barrel for convenience or a direct icon subpath for the smallest module graph.
- **Accessible defaults:** components are decorative until given a title or accessible name.
- **Rendering fidelity:** gradients, masks, clipping paths, and self-contained patterns survive compilation.
- **Strict TypeScript:** framework packages include generated declarations and typed component props.
- **One source of geometry:** framework adapters consume `@mingcute/icons` instead of shipping duplicate icon data.

<a href="https://www.mingcute.com/">
  <img src="./images/banner2.png" alt="Mingcute icons used across production interfaces" width="100%" />
</a>

## Design Foundation

Every Mingcute icon is drawn on a 24×24 grid. The free catalogue provides Core Regular and Core Filled, with the Regular family authored around a consistent 2px stroke. Vector geometry remains editable in the source design files and scales through SVG without losing its intended proportions.

Use the [Mingcute website](https://www.mingcute.com/) to search the catalogue, adjust icon color and size, and download individual SVG or PNG assets. Use the packages in this repository when icons need to be installed, versioned, tree-shaken, and rendered consistently in an application.

<img src="./images/banner3.png" alt="Editable Mingcute vector construction" width="100%" />

## Packages

| Target | Package | Install | Purpose |
|---|---|---|---|
| Icon definitions | [`@mingcute/icons`](./packages/icons/README.md) | `npm i @mingcute/icons` | Framework-neutral definitions and rendering helpers |
| React | [`@mingcute/react`](./packages/react/README.md) | `npm i @mingcute/react` | Typed React SVG components |
| Vue | [`@mingcute/vue`](./packages/vue/README.md) | `npm i @mingcute/vue` | Typed Vue 3 SVG components |
| React Native | [`@mingcute/react-native`](./packages/react-native/README.md) | `npm i @mingcute/react-native` | Native components powered by `react-native-svg` |
| Svelte | [`@mingcute/svelte`](./packages/svelte/README.md) | `npm i @mingcute/svelte` | Svelte 5 icon components |
| SolidJS | [`@mingcute/solid`](./packages/solid/README.md) | `npm i @mingcute/solid` | SolidJS icon components |
| Vanilla JavaScript | [`@mingcute/vanilla`](./packages/vanilla/README.md) | `npm i @mingcute/vanilla` | SVG strings and DOM helpers |
| Web Components | [`@mingcute/web-components`](./packages/web-components/README.md) | `npm i @mingcute/web-components` | Explicitly registered custom elements |
| SVG | [`@mingcute/svg`](./packages/svg/README.md) | `npm i @mingcute/svg` | Optimized standalone SVG files |
| Font | [`@mingcute/font`](./packages/font/README.md) | `npm i @mingcute/font` | WOFF2 fonts, CSS classes, and metadata |

Install only the package for your target. Framework packages install `@mingcute/icons` automatically.

## Available Styles

| Import subpath | Source style | Icons |
|---|---|---:|
| `core-regular` | Core Regular | 1,663 |
| `core-filled` | Core Filled | 1,663 |

The public release contains exactly 3,326 styled definitions. Additional Mingcute families and styles are available in [Mingcute Pro](https://www.mingcute.com/).

## Free and Pro

| Capability | Mingcute Icons | Mingcute Pro |
|---|---|---|
| Styles | Core Regular and Core Filled | Twelve Core, Cute, and Sharp package styles |
| Styled definitions | 3,326 | 20,152 |
| Package names | `@mingcute/*` | `@mingcute/pro` and `@mingcute/*-pro` |
| Distribution | Public npm registry | Protected Mingcute registry |
| Access | No account or CLI required | Active Pro entitlement and CLI registry setup |
| License | Apache-2.0 | Mingcute Pro Commercial License |

The public and Pro packages use the same framework conventions and import shape, making upgrades straightforward without mixing their source repositories or licensing boundaries.

## Figma Plugin and Resources

<a href="https://www.figma.com/community/plugin/1306884809438005528/mingcute-icon">
  <img src="./images/figma.png" alt="Mingcute Icon Figma plugin" width="100%" />
</a>

Install the [Mingcute Icon Figma plugin](https://www.figma.com/community/plugin/1306884809438005528/mingcute-icon) to search and place icons directly in Figma.

Related MGC design resources:

- [MGC UI](https://mgcui.framer.website/) — design system and UI kit for Figma.
- [MGC Icon System](https://mgc.mingcute.com/) — carefully designed icon system.
- [MGC Weather Icons](https://mgcweather.framer.website/) — 120 weather icons.
- [MGC Animation Icons](https://www.mingcute.com/animation) — animated icons for product interfaces.

## Installation

Install only the package your application uses:

```bash
# npm
npm i @mingcute/react

# pnpm
pnpm add @mingcute/react

# Yarn
yarn add @mingcute/react

# Bun
bun add @mingcute/react
```

Replace `@mingcute/react` with another package from the table above. Required framework peer dependencies are declared by each adapter.

## Quick Start

### React

```tsx
import { Home1Regular } from '@mingcute/react/core-regular';

export function HomeLink() {
  return <Home1Regular size={24} title="Home" />;
}
```

### Vue

```vue
<script setup lang="ts">
import { Home1Filled } from '@mingcute/vue/core-filled';
</script>

<template>
  <Home1Filled :size="24" title="Home" />
</template>
```

### Svelte

```svelte
<script>
  import { Home1Regular } from '@mingcute/svelte/core-regular';
</script>

<Home1Regular size={24} title="Home" />
```

### React Native

```tsx
import { Home1Regular } from '@mingcute/react-native/core-regular';

<Home1Regular size={24} color="#10161F" title="Home" />;
```

### SolidJS

```tsx
import { Home1Regular } from '@mingcute/solid/core-regular';

<Home1Regular size={24} title="Home" />;
```

### Vanilla JavaScript

```ts
import { createIcon } from '@mingcute/vanilla';
import { Home1Regular } from '@mingcute/vanilla/core-regular';

document.querySelector('nav')?.append(
  createIcon(Home1Regular, { size: 24, title: 'Home' }),
);
```

### Web Components

```js
import { defineHome1Regular } from '@mingcute/web-components/core-regular/home-1';

defineHome1Regular();
```

```html
<mingcute-home-1-regular size="24" title="Home"></mingcute-home-1-regular>
```

### Raw SVG

```ts
import homeUrl from '@mingcute/svg/core-regular/home-1.svg';
```

### Icon Font

```js
import '@mingcute/font/core-regular.min.css';
```

```html
<i class="mgc mgc-home-1-regular" aria-hidden="true"></i>
```

### Framework-Neutral Definitions

```ts
import { renderIconSource } from '@mingcute/icons';
import { Home1Icon } from '@mingcute/icons/core-regular';

const svg = renderIconSource(Home1Icon);
```

## Import Strategy

Style barrels are convenient:

```ts
import { Home1Regular, Search2Regular } from '@mingcute/react/core-regular';
```

Direct icon subpaths give bundlers the smallest possible graph:

```ts
import Home1Regular from '@mingcute/react/core-regular/home-1';
```

Package roots intentionally export only shared utilities and types. They do not re-export the complete icon catalogue.

## Performance and Module Format

Consumer packages are ESM-only and expose explicit subpaths through `package.json`. JavaScript packages declare `sideEffects: false`; the font package marks CSS as side-effectful so bundlers retain imported stylesheets.

For predictable bundle size:

- prefer direct icon imports in shared libraries and performance-sensitive entry points;
- avoid namespace imports from a style barrel;
- use dynamic `import()` when an icon-heavy feature is already code-split; and
- verify production bundles with your framework's normal analyzer.

## Accessibility

Framework components are decorative by default and render with `aria-hidden` unless they receive a title or explicit accessible name. Meaningful standalone icons should use `title`, `aria-label`, or visible text. Icons inside labeled buttons should normally remain decorative.

## Rendering

The compiler preserves standard SVG geometry, gradients, masks, clipping paths, and self-contained image patterns. Resource IDs are scoped per rendered instance to prevent collisions when the same icon appears more than once.

## Compatibility

| Package | Supported runtime |
|---|---|
| `@mingcute/react` | React 18 or 19 |
| `@mingcute/vue` | Vue 3.5 or newer |
| `@mingcute/react-native` | React 18+, React Native 0.72+, and `react-native-svg` 13+ |
| `@mingcute/svelte` | Svelte 5.20 or newer |
| `@mingcute/solid` | SolidJS 1.9.x |
| Vanilla, Web Components, and SVG | Modern ESM toolchains and standards-compliant SVG environments |
| Font | Modern browsers with WOFF2 support |

The repository toolchain requires Node.js 22 or newer and pnpm 9.15.0. Consumer applications do not need pnpm unless they are contributing to this repository.

## Troubleshooting

**An icon import cannot be resolved**

Confirm the icon name and style subpath. Icon filenames are kebab-case (`home-1`), while component exports are PascalCase with a style suffix (`Home1Regular`).

**The production bundle is larger than expected**

Switch from a style barrel to the direct icon path, then confirm the application bundler is tree-shaking ESM.

**An icon is announced twice**

Keep the icon decorative when adjacent text labels the control. Add a title or accessible name only when the icon carries meaning by itself.

**A gradient or brand icon differs in another format**

Use the SVG or framework package for maximum fidelity. Icon fonts cannot reproduce every gradient, mask, or original-color asset.

## Repository Structure

```text
mingcute-icons/
├── assets/svg/core/{regular,filled}
├── packages/
│   ├── core/              private build contracts
│   ├── compiler/          private SVG compiler
│   ├── icons/             @mingcute/icons
│   ├── react/             @mingcute/react
│   ├── vue/               @mingcute/vue
│   ├── react-native/      @mingcute/react-native
│   ├── svelte/            @mingcute/svelte
│   ├── solid/             @mingcute/solid
│   ├── vanilla/           @mingcute/vanilla
│   ├── web-components/    @mingcute/web-components
│   ├── svg/               @mingcute/svg
│   └── font/              @mingcute/font
├── release.json
└── pnpm-workspace.yaml
```

`@mingcute/core` and `@mingcute/compiler` are private workspace packages. They are never published and cannot appear in a consumer runtime dependency tree.

## Development

Prerequisites: Node.js 22 or newer and pnpm 9.15.0.

```bash
pnpm i --frozen-lockfile
pnpm build
pnpm check
pnpm release:check
pnpm pack:dry
```

`pnpm release:check` verifies the public package set, Apache licensing, repository metadata, style boundaries, and the absence of private delivery infrastructure.

## Contributing

1. Use Node.js 22 or newer and pnpm 9.15.0.
2. Change canonical source or the owning generator; do not edit generated package output by hand.
3. Add focused tests for changes to shared contracts, compilation, rendering, exports, or accessibility.
4. Run `pnpm check` and `pnpm pack:dry` before opening a pull request.
5. Keep Pro artwork, commercial license material, registry configuration, credentials, and private delivery code out of this repository.

Bug reports should include the affected package and version, framework and bundler versions, exact import path, and a minimal reproduction.

## Security and Support

Do not report suspected vulnerabilities in a public issue. Contact the Mingcute team through the [official website](https://www.mingcute.com/) with reproduction details and affected versions.

For usage defects, include the package name and version, framework and bundler versions, the exact import path, and a minimal reproduction in a [GitHub issue](https://github.com/mingcute-design/mingcute-icons/issues).

## Versioning

The ten public packages use one coordinated version from `release.json`. A release is complete only when every required package passes build, test, type, and packed-artifact checks.

## License

Mingcute Icons is licensed under the [Apache License 2.0](./LICENSE).

## Links

- [Mingcute website](https://www.mingcute.com/)
- [Changelog](./CHANGELOG.md)
- [Repository](https://github.com/mingcute-design/mingcute-icons)
- [Figma plugin](https://www.figma.com/community/plugin/1306884809438005528/mingcute-icon)

- [Mingcute MCP server](https://www.npmjs.com/package/@mingcute/mcp-server)
- [Mingcute on X](https://x.com/MingCute_icon)
- [Issue tracker](https://github.com/mingcute-design/mingcute-icons/issues)
- [Mingcute GitHub](https://github.com/mingcute-design)

## Preview

<img src="https://raw.githubusercontent.com/mingcute-design/mingcute-docs/main/images/MingCute_icon.png" alt="Preview of Mingcute icons" width="100%" />
