<a href="https://www.mingcute.com/">
  <img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner1.png" alt="Mingcute Icon System" width="100%" />
</a>

<h1 align="center">@mingcute/svelte</h1>

<h3 align="center">Carefully crafted Mingcute icon components for Svelte</h3>

<p align="center">
  <a href="https://www.mingcute.com/"><img src="https://img.shields.io/badge/mingcute.com-website-007AFF" alt="Mingcute website" /></a>&nbsp;
  <a href="https://www.npmjs.com/package/@mingcute/svelte"><img src="https://img.shields.io/npm/v/@mingcute/svelte?color=007AFF&label=version" alt="@mingcute/svelte npm version" /></a>&nbsp;
  <a href="https://bundlephobia.com/package/@mingcute/svelte"><img src="https://img.shields.io/bundlephobia/minzip/@mingcute/svelte?color=007AFF&label=gzip" alt="@mingcute/svelte minified and gzipped size" /></a>&nbsp;
  <a href="https://www.npmjs.com/package/@mingcute/svelte"><img src="https://img.shields.io/npm/dm/@mingcute/svelte?color=23AF5F&label=downloads" alt="@mingcute/svelte monthly npm downloads" /></a>&nbsp;
  <a href="https://github.com/mingcute-design/mingcute-icons/stargazers"><img src="https://img.shields.io/github/stars/mingcute-design/mingcute-icons?color=007AFF&style=flat" alt="Mingcute GitHub stars" /></a>&nbsp;
  <a href="https://x.com/MingCute_icon"><img src="https://img.shields.io/twitter/follow/MingCute_icon?style=social" alt="Follow Mingcute on X" /></a>
</p>

---

## Overview

`@mingcute/svelte` renders Core Regular and Filled as typed Svelte components. Geometry comes from `@mingcute/icons`, so the adapter remains focused on rendering, accessibility, prop precedence, refs, and framework lifecycle behavior.

## Why Use This Adapter?

- Idiomatic Svelte components with strict TypeScript types.
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
npm i @mingcute/svelte

# pnpm
pnpm add @mingcute/svelte

# Yarn
yarn add @mingcute/svelte

# Bun
bun add @mingcute/svelte
```

**Compatibility:** Svelte 5.20 or newer.

## Quick Start

```svelte
<script>
  import { Home1Regular } from '@mingcute/svelte/core-regular';
</script>

<Home1Regular size={24} title="Home" bind:ref />
```

## Imports

```ts
// Convenient style barrel
import { Home1Regular, Search2Regular } from '@mingcute/svelte/core-regular';

// Smallest direct module
import Home1Regular from '@mingcute/svelte/core-regular/home-1';
```

The package root exports the shared `Icon` utility and public types only. It does not export every icon.

## API Reference

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `size` | `number \| string` | `24` | Sets width and height unless either is overridden |
| `width`, `height` | `number \| string` | `size` | Override one dimension |
| `color` | `string` | `currentColor` | Sets the inherited SVG paint color |
| `title` | `string` | none | Adds an accessible `<title>` |
| `titleId` | `string` | generated | Overrides the title association ID |
| `class`, `className`, `style` | Svelte SVG values | none | Styles the rendered SVG |
| `ref` | `SVGSVGElement` | none | Supports `bind:ref` |
| Other props | Svelte SVG attributes | none | Forwards SVG attributes, events, and ARIA |

The runtime uses `$props.id()` for SSR-safe resource and title IDs. Components require Svelte 5.20 or newer.

## Accessibility

Icons without a title or explicit accessible name are hidden from assistive technology. Supplying `title`, `aria-label`, or `aria-labelledby` exposes the icon with image semantics unless the caller overrides them. Keep icons decorative when adjacent text already provides the label.

## Production Guidance

- The package is ESM-only, side-effect free, and requires Svelte 5.20 or newer.
- Prefer direct icon subpaths in libraries and bundle-sensitive routes.
- Keep server and client package versions aligned so `$props.id()` values hydrate consistently.
- Use `bind:ref` only when direct SVG access is required.

## Troubleshooting

- **Component import not found:** use the PascalCase named export or kebab-case direct path.
- **`$props.id()` or rune errors:** upgrade the consuming project to Svelte 5.20 or newer.
- **SSR hydration warning:** confirm identical component trees and Mingcute versions on server and client.
- **Bundle is unexpectedly large:** import from the direct icon subpath.

## Available Styles

| Import subpath | Source style | Icons |
|---|---|---:|
| `core-regular` | Core Regular | 1,663 |
| `core-filled` | Core Filled | 1,663 |

## Integration with Definitions

The adapter consumes canonical geometry from `@mingcute/icons`. That package owns icon names, paths, layers, and metadata; `@mingcute/svelte` owns Svelte rendering and accessibility behavior. Keeping those responsibilities separate prevents duplicate icon data and keeps every framework adapter visually consistent.

## Development

This package is generated from canonical SVG sources. Do not edit generated output by hand.

```bash
pnpm --filter @mingcute/svelte check
```

<img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner3.png" alt="Editable Mingcute vector construction" width="100%" />

## License

Licensed under Apache-2.0.

## Links

- [Mingcute website](https://www.mingcute.com/)
- [Package changelog](./CHANGELOG.md)
- [Mingcute Icons packages](../../README.md#packages)
- [Repository](https://github.com/mingcute-design/mingcute-icons)
