<a href="https://www.mingcute.com/">
  <img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner1.png" alt="Mingcute Icon System" width="100%" />
</a>

<h1 align="center">@mingcute/icons</h1>

<h3 align="center">Framework-neutral Mingcute definitions for Core Regular and Filled</h3>

<p align="center">
  <a href="https://www.mingcute.com/"><img src="https://img.shields.io/badge/mingcute.com-website-007AFF" alt="Mingcute website" /></a>&nbsp;
  <a href="https://www.npmjs.com/package/@mingcute/icons"><img src="https://img.shields.io/npm/v/@mingcute/icons?color=007AFF&label=version" alt="@mingcute/icons npm version" /></a>&nbsp;
  <a href="https://bundlephobia.com/package/@mingcute/icons"><img src="https://img.shields.io/bundlephobia/minzip/@mingcute/icons?color=007AFF&label=gzip" alt="@mingcute/icons minified and gzipped size" /></a>&nbsp;
  <a href="https://www.npmjs.com/package/@mingcute/icons"><img src="https://img.shields.io/npm/dm/@mingcute/icons?color=23AF5F&label=downloads" alt="@mingcute/icons monthly npm downloads" /></a>&nbsp;
  <a href="https://github.com/mingcute-design/mingcute-icons/stargazers"><img src="https://img.shields.io/github/stars/mingcute-design/mingcute-icons?color=007AFF&style=flat" alt="Mingcute GitHub stars" /></a>&nbsp;
  <a href="https://x.com/MingCute_icon"><img src="https://img.shields.io/twitter/follow/MingCute_icon?style=social" alt="Follow Mingcute on X" /></a>
</p>

---

## Overview

`@mingcute/icons` is the shared data foundation for the public Mingcute packages. Each icon is represented as a typed `IconDefinition` containing its view box, normalized geometry, optional gradients, masks, clip paths, embedded patterns, and metadata.

Framework renderers depend on this package instead of embedding a second copy of the SVG catalogue.

<a href="https://www.mingcute.com/">
  <img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner2.png" alt="Mingcute icons in product interfaces" width="100%" />
</a>

## Installation

```bash
# npm
npm i @mingcute/icons

# pnpm
pnpm add @mingcute/icons

# Yarn
yarn add @mingcute/icons

# Bun
bun add @mingcute/icons
```

## Usage

```ts
import { Home1Icon } from '@mingcute/icons/core-regular';
import { renderIconSource } from '@mingcute/icons';

const svg = renderIconSource(Home1Icon);
```

For the smallest module graph:

```ts
import Home1Icon from '@mingcute/icons/core-regular/home-1';
```

Metadata can be loaded without importing icon modules:

```ts
import metadata from '@mingcute/icons/metadata/core-regular' with { type: 'json' };
```

## API Reference

| Export | Purpose |
|---|---|
| `renderIconBody(definition, idPrefix?)` | Renders inner SVG markup with scoped resource IDs |
| `renderIconSource(definition, idPrefix?)` | Renders a complete standalone SVG document |
| `/<style>` | Provides named definitions for one style |
| `/<style>/<icon>` | Provides one default icon definition |
| `/metadata/<style>` | Provides generated JSON metadata |
| `/styles.json` | Provides the canonical style catalogue |

## Available Styles

| Import subpath | Source style | Icons |
|---|---|---:|
| `core-regular` | Core Regular | 1,663 |
| `core-filled` | Core Filled | 1,663 |

## Definition Model

`IconDefinition` keeps SVG resources structured rather than flattening them into unsafe markup. The renderer escapes XML values, scopes resource references, preserves self-contained embedded images, and never permits external image URLs.

## Production Guidance

- The package is ESM-only and declares `sideEffects: false`.
- Import a direct definition when a custom renderer needs only one icon.
- Pass a stable custom prefix to rendering helpers when integrating into a renderer that owns instance identity.
- Treat generated definitions and metadata as immutable build artifacts.
- Do not inject untrusted markup around rendered output; the package guarantees only its generated icon data.

## Troubleshooting

- **Definition import not found:** use a PascalCase named export from a style barrel or the kebab-case direct path.
- **JSON import fails:** configure the toolchain for JSON modules or load the metadata file through its asset API.
- **Duplicate SVG IDs:** give each independently rendered instance a distinct ID prefix.
- **A custom renderer drops artwork:** support every element and resource type represented by `IconDefinition`, including masks, clip paths, gradients, and patterns.

## Development

This package is generated from canonical SVG sources. Do not edit generated output by hand.

```bash
pnpm --filter @mingcute/icons check
```

<img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner3.png" alt="Editable Mingcute vector construction" width="100%" />

## License

Licensed under Apache-2.0. See the included `LICENSE` file.

## Links

- [Mingcute website](https://www.mingcute.com/)
- [Package changelog](./CHANGELOG.md)
- [Mingcute Icons packages](../../README.md#packages)
- [Repository](https://github.com/mingcute-design/mingcute-icons)
