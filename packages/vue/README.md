<a href="https://www.mingcute.com/">
  <img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner1.png" alt="Mingcute Icon System" width="100%" />
</a>

<h1 align="center">@mingcute/vue</h1>

<h3 align="center">Carefully crafted Mingcute icon components for Vue</h3>

<p align="center">
  <a href="https://www.mingcute.com/"><img src="https://img.shields.io/badge/mingcute.com-website-007AFF" alt="Mingcute website" /></a>&nbsp;
  <a href="https://www.npmjs.com/package/@mingcute/vue"><img src="https://img.shields.io/npm/v/@mingcute/vue?color=007AFF&label=version" alt="@mingcute/vue npm version" /></a>&nbsp;
  <a href="https://bundlephobia.com/package/@mingcute/vue"><img src="https://img.shields.io/bundlephobia/minzip/@mingcute/vue?color=007AFF&label=gzip" alt="@mingcute/vue minified and gzipped size" /></a>&nbsp;
  <a href="https://www.npmjs.com/package/@mingcute/vue"><img src="https://img.shields.io/npm/dm/@mingcute/vue?color=23AF5F&label=downloads" alt="@mingcute/vue monthly npm downloads" /></a>&nbsp;
  <a href="https://github.com/mingcute-design/mingcute-icons/stargazers"><img src="https://img.shields.io/github/stars/mingcute-design/mingcute-icons?color=007AFF&style=flat" alt="Mingcute GitHub stars" /></a>&nbsp;
  <a href="https://x.com/MingCute_icon"><img src="https://img.shields.io/twitter/follow/MingCute_icon?style=social" alt="Follow Mingcute on X" /></a>
</p>

---

## Overview

`@mingcute/vue` renders Core Regular and Filled as typed Vue components. Geometry comes from `@mingcute/icons`, so the adapter remains focused on rendering, accessibility, prop precedence, refs, and framework lifecycle behavior.

## Why Use This Adapter?

- Idiomatic Vue components with strict TypeScript types.
- Style and direct-icon subpaths designed for tree shaking.
- Decorative accessibility defaults with caller-controlled labels and roles.
- Instance-scoped SVG resources for repeated icons and SSR.
- No duplicated definition catalogue inside the adapter.

<a href="https://www.mingcute.com/">
  <img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner2.png" alt="Mingcute icons in product interfaces" width="100%" />
</a>

## Installation

```bash
# npm
npm i @mingcute/vue

# pnpm
pnpm add @mingcute/vue

# Yarn
yarn add @mingcute/vue

# Bun
bun add @mingcute/vue
```

**Compatibility:** Vue 3.5 or newer.

## Quick Start

```vue
<script setup lang="ts">
import { Home1Regular } from '@mingcute/vue/core-regular';
</script>

<template>
  <Home1Regular :size="24" color="currentColor" title="Home" />
</template>
```

## Imports

```ts
// Convenient style barrel
import { Home1Regular, Search2Regular } from '@mingcute/vue/core-regular';

// Smallest direct module
import Home1Regular from '@mingcute/vue/core-regular/home-1';
```

The package root exports the shared `Icon` utility and public types only. It does not export every icon.

## API Reference

| Prop or attribute | Type | Default | Purpose |
|---|---|---|---|
| `size` | `number \| string` | `24` | Sets width and height unless either attribute is provided |
| `width`, `height` | SVG attribute | `size` | Override one dimension |
| `color` | `string` | `currentColor` | Sets the inherited SVG paint color |
| `title` | `string` | none | Adds an accessible `<title>` |
| `titleId` | `string` | generated | Overrides the title association ID |
| Other attributes | Vue `SVGAttributes` | none | Forwards SVG attributes, listeners, classes, styles, and ARIA |

Functional components use Vue stable IDs to isolate SVG resources and preserve server-rendered hydration.

## Accessibility

Icons without a title or explicit accessible name are hidden from assistive technology. Supplying `title`, `aria-label`, or `aria-labelledby` exposes the icon with image semantics unless the caller overrides them. Keep icons decorative when adjacent text already provides the label.

## Production Guidance

- The package is ESM-only, side-effect free, and requires Vue 3.5 or newer.
- Prefer direct icon subpaths in shared libraries and bundle-sensitive entry points.
- Keep server and client package versions aligned so generated title and resource IDs hydrate consistently.
- Vue attributes and listeners are forwarded to the `<svg>`; explicit `width` and `height` override `size`.

## Troubleshooting

- **Component import not found:** use the PascalCase named export or the kebab-case direct file path.
- **Attributes do not appear:** pass them to the icon component itself; they are forwarded by the functional renderer.
- **SSR hydration warning:** verify identical component trees and Mingcute versions on the server and client.
- **Bundle is unexpectedly large:** import the icon from its direct subpath instead of a namespace or complete style barrel.

## Available Styles

| Import subpath | Source style | Icons |
|---|---|---:|
| `core-regular` | Core Regular | 1,663 |
| `core-filled` | Core Filled | 1,663 |

## Integration with Definitions

The adapter consumes canonical geometry from `@mingcute/icons`. That package owns icon names, paths, layers, and metadata; `@mingcute/vue` owns Vue rendering and accessibility behavior. Keeping those responsibilities separate prevents duplicate icon data and keeps every framework adapter visually consistent.

## Development

This package is generated from canonical SVG sources. Do not edit generated output by hand.

```bash
pnpm --filter @mingcute/vue check
```

<img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner3.png" alt="Editable Mingcute vector construction" width="100%" />

## License

Licensed under Apache-2.0.

## Links

- [Mingcute website](https://www.mingcute.com/)
- [Package changelog](./CHANGELOG.md)
- [Mingcute Icons packages](../../README.md#packages)
- [Repository](https://github.com/mingcute-design/mingcute-icons)
