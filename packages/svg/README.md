<a href="https://www.mingcute.com/">
  <img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner1.png" alt="Mingcute Icon System" width="100%" />
</a>

<h1 align="center">@mingcute/svg</h1>

<h3 align="center">Optimized, Carefully crafted Mingcute SVG assets</h3>

<p align="center">
  <a href="https://www.mingcute.com/"><img src="https://img.shields.io/badge/mingcute.com-website-007AFF" alt="Mingcute website" /></a>&nbsp;
  <a href="https://www.npmjs.com/package/@mingcute/svg"><img src="https://img.shields.io/npm/v/@mingcute/svg?color=007AFF&label=version" alt="@mingcute/svg npm version" /></a>&nbsp;
  <a href="https://bundlephobia.com/package/@mingcute/svg"><img src="https://img.shields.io/bundlephobia/minzip/@mingcute/svg?color=007AFF&label=gzip" alt="@mingcute/svg minified and gzipped size" /></a>&nbsp;
  <a href="https://www.npmjs.com/package/@mingcute/svg"><img src="https://img.shields.io/npm/dm/@mingcute/svg?color=23AF5F&label=downloads" alt="@mingcute/svg monthly npm downloads" /></a>&nbsp;
  <a href="https://github.com/mingcute-design/mingcute-icons/stargazers"><img src="https://img.shields.io/github/stars/mingcute-design/mingcute-icons?color=007AFF&style=flat" alt="Mingcute GitHub stars" /></a>&nbsp;
  <a href="https://x.com/MingCute_icon"><img src="https://img.shields.io/twitter/follow/MingCute_icon?style=social" alt="Follow Mingcute on X" /></a>
</p>

---

## Overview

`@mingcute/svg` ships standalone SVG files for Core Regular and Filled. Files are compiled from canonical design sources, optimized, validated, and packaged without framework code.

<a href="https://www.mingcute.com/">
  <img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner2.png" alt="Mingcute icons in product interfaces" width="100%" />
</a>

## Installation

```bash
# npm
npm i @mingcute/svg

# pnpm
pnpm add @mingcute/svg

# Yarn
yarn add @mingcute/svg

# Bun
bun add @mingcute/svg
```

## Usage

```ts
import homeUrl from '@mingcute/svg/core-regular/home-1.svg';
```

```html
<!-- After copying the package asset into your public output directory -->
<img src="/icons/home-1.svg" alt="" />
```

Build tools that support package asset imports can return a URL, source string, or asset module depending on configuration.

## Package Layout

```text
<style>/<icon>.svg
<style>/metadata.json
styles.json
```

The package root intentionally has no icon barrel. Import files through explicit style paths.

Canonical artwork is organized internally as
`{family}/{style}/{category}/{icon}.svg`, but those source directories are not
part of the package API. The public SVG package exposes `core-regular` and `core-filled`
directly, for example `@mingcute/svg/core-regular/home-1.svg`.

The style is intentionally not repeated in each npm filename. The containing
subpath already makes the variant unambiguous and keeps direct imports concise.

## Rendering Fidelity

SVG is the recommended format for gradients, masks, clip paths, angular paint, and original-color brand artwork. Embedded images are self-contained data resources; external image URLs and active content are rejected by the compiler.

## Production Guidance

- Import an SVG through the application's asset pipeline or copy it into the public output directory during the build.
- The package exposes explicit file paths and does not execute JavaScript at runtime.
- Preserve the `viewBox` when resizing so artwork scales correctly.
- Prefer SVG over icon fonts for gradients, masks, clipping paths, and authored brand colors.
- Configure a content security policy that allows only the image sources required by the application.

## Troubleshooting

- **The bundler cannot import `.svg`:** use its URL or raw-asset query syntax, or copy the file as a build asset.
- **The browser requests a `node_modules` URL:** do not expose package internals directly; emit the SVG into the application's public assets.
- **The icon has a fixed dark color:** themeable assets use `currentColor`, while original-color brand artwork intentionally preserves authored paint.
- **A sanitizer removes artwork:** allow standard SVG resources such as `defs`, gradients, masks, clip paths, patterns, and data-backed images.

## Available Styles

| Import subpath | Source style | Icons |
|---|---|---:|
| `core-regular` | Core Regular | 1,663 |
| `core-filled` | Core Filled | 1,663 |

## Development

This package is generated from canonical SVG sources. Do not edit generated output by hand.

```bash
pnpm --filter @mingcute/svg check
```

<img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner3.png" alt="Editable Mingcute vector construction" width="100%" />

## License

Licensed under Apache-2.0.

## Links

- [Mingcute website](https://www.mingcute.com/)
- [Package changelog](./CHANGELOG.md)
- [Mingcute Icons packages](../../README.md#packages)
- [Repository](https://github.com/mingcute-design/mingcute-icons)
