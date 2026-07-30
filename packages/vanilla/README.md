<a href="https://www.mingcute.com/">
  <img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner1.png" alt="Mingcute Icon System" width="100%" />
</a>

<h1 align="center">@mingcute/vanilla</h1>

<h3 align="center">Mingcute SVG strings and DOM helpers with no framework runtime</h3>

<p align="center">
  <a href="https://www.mingcute.com/"><img src="https://img.shields.io/badge/mingcute.com-website-007AFF" alt="Mingcute website" /></a>&nbsp;
  <a href="https://www.npmjs.com/package/@mingcute/vanilla"><img src="https://img.shields.io/npm/v/@mingcute/vanilla?color=007AFF&label=version" alt="@mingcute/vanilla npm version" /></a>&nbsp;
  <a href="https://bundlephobia.com/package/@mingcute/vanilla"><img src="https://img.shields.io/bundlephobia/minzip/@mingcute/vanilla?color=007AFF&label=gzip" alt="@mingcute/vanilla minified and gzipped size" /></a>&nbsp;
  <a href="https://www.npmjs.com/package/@mingcute/vanilla"><img src="https://img.shields.io/npm/dm/@mingcute/vanilla?color=23AF5F&label=downloads" alt="@mingcute/vanilla monthly npm downloads" /></a>&nbsp;
  <a href="https://github.com/mingcute-design/mingcute-icons/stargazers"><img src="https://img.shields.io/github/stars/mingcute-design/mingcute-icons?color=007AFF&style=flat" alt="Mingcute GitHub stars" /></a>&nbsp;
  <a href="https://x.com/MingCute_icon"><img src="https://img.shields.io/twitter/follow/MingCute_icon?style=social" alt="Follow Mingcute on X" /></a>
</p>

---

## Overview

`@mingcute/vanilla` provides compiled SVG strings together with `toSvgString()` and `createIcon()`. Use it for server rendering, static templates, browser DOM insertion, or custom integrations that do not need a framework adapter.

<a href="https://www.mingcute.com/">
  <img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner2.png" alt="Mingcute icons in product interfaces" width="100%" />
</a>

## Installation

```bash
# npm
npm i @mingcute/vanilla

# pnpm
pnpm add @mingcute/vanilla

# Yarn
yarn add @mingcute/vanilla

# Bun
bun add @mingcute/vanilla
```

## Quick Start

```ts
import { createIcon, toSvgString } from '@mingcute/vanilla';
import { Home1Regular } from '@mingcute/vanilla/core-regular';

const markup = toSvgString(Home1Regular, {
  size: 24,
  color: 'currentColor',
  title: 'Home',
});

const element = createIcon(Home1Regular, {
  className: 'navigation-icon',
  ariaLabel: 'Home',
});

document.querySelector('nav')?.append(element);
```

`toSvgString()` is safe in Node.js and server environments. `createIcon()` requires a DOM and throws a clear error when `document` is unavailable.

## API Reference

| Option | Type | Purpose |
|---|---|---|
| `size` | `number \| string` | Default width and height |
| `width`, `height` | `number \| string` | Override individual dimensions |
| `color` | `string` | Sets inherited SVG color |
| `className` | `string` | Adds an SVG class |
| `title`, `titleId` | `string` | Creates an accessible title |
| `ariaLabel`, `ariaHidden` | typed values | Controls accessibility |
| `attributes` | record | Adds validated SVG attributes |

Attribute names are validated and values are XML-escaped before serialization.

## Production Guidance

- The package is ESM-only and declares `sideEffects: false`.
- `toSvgString()` works in Node.js, edge runtimes, and browsers without reading global DOM state.
- `createIcon()` requires `document` and should run only in a browser or DOM-compatible test environment.
- Prefer direct icon subpaths in bundle-sensitive code.
- Keep generated icon source immutable and pass customization through `IconOptions`.

## Troubleshooting

- **`document` is unavailable:** use `toSvgString()` during SSR and call `createIcon()` after the browser mounts.
- **An attribute is rejected:** use a valid SVG/XML attribute name and place it in `attributes`.
- **The icon is announced unexpectedly:** set `ariaHidden: true` for decorative icons or provide one clear accessible name.
- **Bundle is unexpectedly large:** import the SVG string from its direct icon subpath.

## Imports and Styles

```ts
import { Home1Regular } from '@mingcute/vanilla/core-regular';
import Home1RegularDirect from '@mingcute/vanilla/core-regular/home-1';
```

| Import subpath | Source style | Icons |
|---|---|---:|
| `core-regular` | Core Regular | 1,663 |
| `core-filled` | Core Filled | 1,663 |

## Integration with Definitions

This package compiles canonical definitions from `@mingcute/icons` into self-contained SVG strings. `@mingcute/icons` owns the structured geometry and metadata; `@mingcute/vanilla` owns serialization options and browser DOM creation.

## Development

This package is generated from canonical SVG sources. Do not edit generated output by hand.

```bash
pnpm --filter @mingcute/vanilla check
```

<img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner3.png" alt="Editable Mingcute vector construction" width="100%" />

## License

Licensed under Apache-2.0.

## Links

- [Mingcute website](https://www.mingcute.com/)
- [Package changelog](./CHANGELOG.md)
- [Mingcute Icons packages](../../README.md#packages)
- [Repository](https://github.com/mingcute-design/mingcute-icons)
