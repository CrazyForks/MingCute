<a href="https://www.mingcute.com/">
  <img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner1.png" alt="Mingcute Icon System" width="100%" />
</a>

<h1 align="center">@mingcute/react-native</h1>

<h3 align="center">Carefully crafted Mingcute icon components for React Native</h3>

<p align="center">
  <a href="https://www.mingcute.com/"><img src="https://img.shields.io/badge/mingcute.com-website-007AFF" alt="Mingcute website" /></a>&nbsp;
  <a href="https://www.npmjs.com/package/@mingcute/react-native"><img src="https://img.shields.io/npm/v/@mingcute/react-native?color=007AFF&label=version" alt="@mingcute/react-native npm version" /></a>&nbsp;
  <a href="https://bundlephobia.com/package/@mingcute/react-native"><img src="https://img.shields.io/bundlephobia/minzip/@mingcute/react-native?color=007AFF&label=gzip" alt="@mingcute/react-native minified and gzipped size" /></a>&nbsp;
  <a href="https://www.npmjs.com/package/@mingcute/react-native"><img src="https://img.shields.io/npm/dm/@mingcute/react-native?color=23AF5F&label=downloads" alt="@mingcute/react-native monthly npm downloads" /></a>&nbsp;
  <a href="https://github.com/mingcute-design/mingcute-icons/stargazers"><img src="https://img.shields.io/github/stars/mingcute-design/mingcute-icons?color=007AFF&style=flat" alt="Mingcute GitHub stars" /></a>&nbsp;
  <a href="https://x.com/MingCute_icon"><img src="https://img.shields.io/twitter/follow/MingCute_icon?style=social" alt="Follow Mingcute on X" /></a>
</p>

---

## Overview

`@mingcute/react-native` renders Core Regular and Filled as typed React Native components. Geometry comes from `@mingcute/icons`, so the adapter remains focused on rendering, accessibility, prop precedence, refs, and framework lifecycle behavior.

## Why Use This Adapter?

- Idiomatic React Native components with strict TypeScript types.
- Style and direct-icon subpaths designed for tree shaking.
- Decorative accessibility defaults with caller-controlled labels and roles.
- Instance-scoped SVG resources for repeated icons.
- No duplicated definition catalogue inside the adapter.

<a href="https://www.mingcute.com/">
  <img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner2.png" alt="Mingcute icons in product interfaces" width="100%" />
</a>

## Installation

```bash
# npm
npm i @mingcute/react-native

# pnpm
pnpm add @mingcute/react-native

# Yarn
yarn add @mingcute/react-native

# Bun
bun add @mingcute/react-native
```

**Compatibility:** React 18+, React Native 0.72+, and react-native-svg 13+.

## Quick Start

```tsx
import { Home1Regular } from '@mingcute/react-native/core-regular';

<Home1Regular size={24} color="#10161F" />;
```

## Imports

```ts
// Convenient style barrel
import { Home1Regular, Search2Regular } from '@mingcute/react-native/core-regular';

// Smallest direct module
import Home1Regular from '@mingcute/react-native/core-regular/home-1';
```

The package root exports the shared `Icon` utility and public types only. It does not export every icon.

## API Reference

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `size` | `number \| string` | `24` | Sets width and height unless either is overridden |
| `width`, `height` | `SvgProps` values | `size` | Override one dimension |
| `color` | `string` | `currentColor` | Sets the primary theme color |
| `primaryColor` | `string` | `color` | Explicitly overrides the primary color |
| `secondaryColor` | `string` | primary color | Overrides themeable secondary artwork when present |
| `secondaryOpacity` | `number` | `0.3` | Controls themeable secondary artwork opacity |
| `title` | `string` | none | Supplies the default native accessibility label |
| `ref` | React ref | none | Accesses the underlying `Svg` host |
| Other props | `SvgProps` | none | Forwards native SVG and accessibility props |

Angular gradients are rendered as clipped native SVG wedges without a WebView or extra graphics dependency. Accessibility maps to React Native image semantics.

## Accessibility

Icons without a title or `accessibilityLabel` are hidden from the native accessibility tree. Supplying either exposes image semantics unless the caller overrides `accessible`, `accessibilityRole`, or related React Native props. Keep icons decorative when adjacent text already provides the label.

## Production Guidance

- The package is ESM-only and side-effect free.
- React 18+, React Native 0.72+, and `react-native-svg` 13+ are required peers.
- Prefer direct icon subpaths to reduce Metro's module graph.
- Refs target the underlying `Svg` component; no WebView or browser DOM is required.

## Troubleshooting

- **`react-native-svg` cannot be resolved:** install a compatible peer and complete the platform's normal native dependency setup.
- **An icon is missing from a release build:** reset Metro's cache after changing package versions, then rebuild the native application.
- **A layered color does not change:** only themeable secondary artwork responds to `secondaryColor`; original-color artwork preserves authored colors.
- **Rendering differs from web:** React Native uses native SVG primitives and approximates angular gradients with clipped wedges.

## Available Styles

| Import subpath | Source style | Icons |
|---|---|---:|
| `core-regular` | Core Regular | 1,663 |
| `core-filled` | Core Filled | 1,663 |

## Integration with Definitions

The adapter consumes canonical geometry from `@mingcute/icons`. That package owns icon names, paths, layers, and metadata; `@mingcute/react-native` owns native SVG rendering and accessibility behavior. Keeping those responsibilities separate prevents duplicate icon data and keeps every framework adapter visually consistent.

## Development

This package is generated from canonical SVG sources. Do not edit generated output by hand.

```bash
pnpm --filter @mingcute/react-native check
```

<img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner3.png" alt="Editable Mingcute vector construction" width="100%" />

## License

Licensed under Apache-2.0.

## Links

- [Mingcute website](https://www.mingcute.com/)
- [Package changelog](./CHANGELOG.md)
- [Mingcute Icons packages](../../README.md#packages)
- [Repository](https://github.com/mingcute-design/mingcute-icons)
