<a href="https://www.mingcute.com/">
  <img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner1.png" alt="Mingcute Icon System" width="100%" />
</a>

<h1 align="center">@mingcute/web-components</h1>

<h3 align="center">Tree-shakeable Mingcute custom elements with explicit registration</h3>

<p align="center">
  <a href="https://www.mingcute.com/"><img src="https://img.shields.io/badge/mingcute.com-website-007AFF" alt="Mingcute website" /></a>&nbsp;
  <a href="https://www.npmjs.com/package/@mingcute/web-components"><img src="https://img.shields.io/npm/v/@mingcute/web-components?color=007AFF&label=version" alt="@mingcute/web-components npm version" /></a>&nbsp;
  <a href="https://bundlephobia.com/package/@mingcute/web-components"><img src="https://img.shields.io/bundlephobia/minzip/@mingcute/web-components?color=007AFF&label=gzip" alt="@mingcute/web-components minified and gzipped size" /></a>&nbsp;
  <a href="https://www.npmjs.com/package/@mingcute/web-components"><img src="https://img.shields.io/npm/dm/@mingcute/web-components?color=23AF5F&label=downloads" alt="@mingcute/web-components monthly npm downloads" /></a>&nbsp;
  <a href="https://github.com/mingcute-design/mingcute-icons/stargazers"><img src="https://img.shields.io/github/stars/mingcute-design/mingcute-icons?color=007AFF&style=flat" alt="Mingcute GitHub stars" /></a>&nbsp;
  <a href="https://x.com/MingCute_icon"><img src="https://img.shields.io/twitter/follow/MingCute_icon?style=social" alt="Follow Mingcute on X" /></a>
</p>

---

## Overview

`@mingcute/web-components` provides one custom-element class and registration function per icon. Importing a module does not mutate the global custom-element registry; registration is explicit, idempotent, and safe to control at application startup.

<a href="https://www.mingcute.com/">
  <img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner2.png" alt="Mingcute icons in product interfaces" width="100%" />
</a>

## Installation

```bash
# npm
npm i @mingcute/web-components

# pnpm
pnpm add @mingcute/web-components

# Yarn
yarn add @mingcute/web-components

# Bun
bun add @mingcute/web-components
```

## Quick Start

```js
import { defineHome1Regular } from '@mingcute/web-components/core-regular/home-1';

defineHome1Regular();
```

```html
<mingcute-home-1-regular size="24" title="Home"></mingcute-home-1-regular>
```

## API Reference

| Attribute | Default | Purpose |
|---|---|---|
| `size` | `24` | Sets width and height unless either is provided |
| `width`, `height` | `size` | Override one dimension |
| `color` | `currentColor` | Sets the inherited SVG paint color |
| `title` | none | Adds an accessible `<title>` |
| `title-id` | generated | Overrides the title association ID |
| `aria-label`, `aria-labelledby`, `aria-hidden`, `role` | accessibility defaults | Override accessible naming and visibility |
| `class`, `style` | none | Styles the internal SVG host values |

The rendered SVG is exposed through `element.svg` and `part="svg"`.

```css
mingcute-home-1-regular::part(svg) {
  display: block;
}
```

## Registration

`defineHome1Regular(name?, registry?)` registers the generated icon class and returns its constructor. The lower-level `defineIconElement(tagName, constructor, registry?)` supports an explicit registry for tests or isolated environments. Registration rejects invalid names and refuses to replace an existing tag with a different constructor.

## Accessibility

Unlabeled elements render as decorative. A `title`, `aria-label`, or `aria-labelledby` exposes image semantics while preserving caller overrides.

## Production Guidance

- The package is ESM-only and side-effect free.
- Importing an icon does not register it; call its `define...()` function in browser startup code.
- Direct icon imports keep the module graph small and make registered tags explicit.
- Custom elements require browser support for Custom Elements and Shadow DOM.
- Style the internal SVG through `::part(svg)`; ordinary descendant selectors do not cross the shadow boundary.

## Troubleshooting

- **The tag renders nothing:** confirm its `define...()` function ran after `customElements` became available.
- **Registration throws:** the same tag was already assigned to another constructor; choose a unique tag name.
- **CSS does not reach the SVG:** use the exposed `svg` part or set supported attributes on the host element.
- **Server rendering fails during registration:** import safely on the server, but defer the registration call to the browser.

## Available Styles

| Import subpath | Source style | Icons |
|---|---|---:|
| `core-regular` | Core Regular | 1,663 |
| `core-filled` | Core Filled | 1,663 |

## Integration with Definitions

Generated custom elements consume canonical geometry from `@mingcute/icons`. The definitions package owns icon data; `@mingcute/web-components` owns custom-element registration, Shadow DOM rendering, attributes, and accessibility behavior.

## Development

This package is generated from canonical SVG sources. Do not edit generated output by hand.

```bash
pnpm --filter @mingcute/web-components check
```

<img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner3.png" alt="Editable Mingcute vector construction" width="100%" />

## License

Licensed under Apache-2.0.

## Links

- [Mingcute website](https://www.mingcute.com/)
- [Package changelog](./CHANGELOG.md)
- [Mingcute Icons packages](../../README.md#packages)
- [Repository](https://github.com/mingcute-design/mingcute-icons)
