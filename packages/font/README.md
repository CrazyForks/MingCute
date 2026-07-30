<a href="https://www.mingcute.com/">
  <img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner1.png" alt="Mingcute Icon System" width="100%" />
</a>

<h1 align="center">@mingcute/font</h1>

<h3 align="center">Mingcute WOFF2 fonts, CSS classes, and stable codepoint metadata</h3>

<p align="center">
  <a href="https://www.mingcute.com/"><img src="https://img.shields.io/badge/mingcute.com-website-007AFF" alt="Mingcute website" /></a>&nbsp;
  <a href="https://www.npmjs.com/package/@mingcute/font"><img src="https://img.shields.io/npm/v/@mingcute/font?color=007AFF&label=version" alt="@mingcute/font npm version" /></a>&nbsp;
  <a href="https://bundlephobia.com/package/@mingcute/font"><img src="https://img.shields.io/bundlephobia/minzip/@mingcute/font?color=007AFF&label=gzip" alt="@mingcute/font minified and gzipped size" /></a>&nbsp;
  <a href="https://www.npmjs.com/package/@mingcute/font"><img src="https://img.shields.io/npm/dm/@mingcute/font?color=23AF5F&label=downloads" alt="@mingcute/font monthly npm downloads" /></a>&nbsp;
  <a href="https://github.com/mingcute-design/mingcute-icons/stargazers"><img src="https://img.shields.io/github/stars/mingcute-design/mingcute-icons?color=007AFF&style=flat" alt="Mingcute GitHub stars" /></a>&nbsp;
  <a href="https://x.com/MingCute_icon"><img src="https://img.shields.io/twitter/follow/MingCute_icon?style=social" alt="Follow Mingcute on X" /></a>
</p>

---

## Overview

`@mingcute/font` packages Mingcute as WOFF2 fonts with generated CSS mappings and an append-only codepoint ledger. It is designed for stylesheet-based projects, server templates, and environments where component packages are not practical.

<a href="https://www.mingcute.com/">
  <img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner2.png" alt="Mingcute icons in product interfaces" width="100%" />
</a>

## Installation

```bash
# npm
npm i @mingcute/font

# pnpm
pnpm add @mingcute/font

# Yarn
yarn add @mingcute/font

# Bun
bun add @mingcute/font
```

## Quick Start

```js
import '@mingcute/font/core-regular.min.css';
```

```html
<i class="mgc mgc-home-1-regular" aria-hidden="true"></i>
```

Use visually hidden text or an `aria-label` when an icon communicates meaning without an adjacent label.

## Loading

Import `regular.min.css`, `filled.min.css`, or `bundle.min.css`. Font assets are also available from `@mingcute/font/fonts/*`, with codepoint and style metadata under `@mingcute/font/metadata/*`.

## Public Exports

| Import | Contents |
|---|---|
| `@mingcute/font/core-regular.min.css` | Core Regular classes and font face |
| `@mingcute/font/core-filled.min.css` | Core Filled classes and font face |
| `@mingcute/font/bundle.min.css` | Both public styles |
| `@mingcute/font/fonts/*` | Generated WOFF2 files |
| `@mingcute/font/metadata/*` | Codepoint and style metadata |

## Stable Codepoints

The same canonical icon name uses the same codepoint across styles. The checked-in ledger is append-only: removed values are retired rather than reused, and ordinary builds never allocate new codepoints.

## Production Guidance

- Import one style stylesheet when the application uses one style; `bundle.min.css` includes both public styles.
- The package marks CSS as side-effectful so bundlers retain imported font declarations.
- Serve WOFF2 files with the `font/woff2` MIME type and long-lived cache headers when URLs are content-versioned.
- Preload only fonts needed in the first viewport; preloading every style can delay more important resources.
- Use SVG or a framework package when exact gradients, masks, or brand colors matter.

## Troubleshooting

- **Icons show empty squares:** confirm the emitted CSS can resolve its relative `../fonts/*.woff2` URLs.
- **A class renders the wrong glyph:** use the complete generated class, including the icon name and style suffix.
- **Fonts are blocked in production:** allow the deployed font origin in `font-src` and verify CORS headers for cross-origin assets.
- **Text flashes or shifts:** load only required styles and avoid injecting the stylesheet after the interface has rendered.

## Available Styles

| Import subpath | Source style | Icons |
|---|---|---:|
| `core-regular` | Core Regular | 1,663 |
| `core-filled` | Core Filled | 1,663 |

## Development

This package is generated from canonical SVG sources. Do not edit generated output by hand.

```bash
pnpm --filter @mingcute/font check
```

<img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner3.png" alt="Editable Mingcute vector construction" width="100%" />

## License

Licensed under Apache-2.0.

## Links

- [Mingcute website](https://www.mingcute.com/)
- [Package changelog](./CHANGELOG.md)
- [Mingcute Icons packages](../../README.md#packages)
- [Repository](https://github.com/mingcute-design/mingcute-icons)
