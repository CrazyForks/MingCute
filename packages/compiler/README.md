<a href="https://www.mingcute.com/">
  <img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner1.png" alt="Mingcute Icon System" width="100%" />
</a>

<h1 align="center">@mingcute/compiler</h1>

<h3 align="center">Private SVG compiler for the public Mingcute catalogue</h3>

<p align="center">
  <a href="https://www.mingcute.com/"><img src="https://img.shields.io/badge/mingcute.com-website-007AFF" alt="Mingcute website" /></a>&nbsp;
  <img src="https://img.shields.io/badge/workspace-private-007AFF" alt="Private workspace package" />&nbsp;
  <a href="https://bundlephobia.com/package/@mingcute/icons"><img src="https://img.shields.io/bundlephobia/minzip/@mingcute/icons?color=007AFF&label=gzip" alt="Mingcute Icons minified and gzipped size" /></a>&nbsp;
  <a href="https://www.npmjs.com/package/@mingcute/icons"><img src="https://img.shields.io/npm/dm/@mingcute/icons?color=23AF5F&label=downloads" alt="Mingcute Icons monthly npm downloads" /></a>&nbsp;
  <a href="https://github.com/mingcute-design/mingcute-icons/stargazers"><img src="https://img.shields.io/github/stars/mingcute-design/mingcute-icons?color=007AFF&style=flat" alt="Mingcute GitHub stars" /></a>&nbsp;
  <a href="https://x.com/MingCute_icon"><img src="https://img.shields.io/twitter/follow/MingCute_icon?style=social" alt="Follow Mingcute on X" /></a>
</p>

---

## Overview

`@mingcute/compiler` is the framework-neutral build pipeline that converts canonical SVG files into the shared `IconDefinition` model from `@mingcute/core`.

## Pipeline

```text
source discovery
  -> secure XML parsing
  -> SVG optimization
  -> geometry and resource normalization
  -> definition validation
  -> package-specific generation
```

The compiler preserves gradients, masks, clip paths, and self-contained image patterns while rejecting scripts, event handlers, external resources, malformed XML, and unsupported active content.

It does not generate React, Vue, or other framework code. Each consumer package owns its adapter and output generator.

<a href="https://www.mingcute.com/">
  <img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner2.png" alt="Mingcute icons in product interfaces" width="100%" />
</a>

## Publication Boundary

This package is marked private, has no publication configuration, and is used only during repository builds. Generated consumer packages have no runtime dependency on it.

## Maintainer Contract

- Compilation must be deterministic for identical source files and configuration.
- XML is parsed structurally; source must never be transformed with ad hoc string replacement.
- Unsupported active content and external resources fail the build rather than being silently retained.
- Resource IDs and references must remain internally consistent after optimization.
- Framework code generation belongs to adapters, not this compiler.

## Troubleshooting

- **An SVG fails security validation:** remove scripts, event attributes, external URLs, or unsupported active content from the canonical source.
- **Artwork changes after optimization:** compare the parsed definition and render fixture before changing optimizer settings.
- **Asset counts differ:** run `audit:assets` and resolve missing, duplicate, or unexpected source files before generation.
- **A framework output is wrong but the definition is correct:** fix the owning package adapter instead of adding framework behavior to the compiler.

## Development

```bash
pnpm --filter @mingcute/compiler build
pnpm --filter @mingcute/compiler typecheck
pnpm --filter @mingcute/compiler test
pnpm --filter @mingcute/compiler audit:assets
```

<img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner3.png" alt="Editable Mingcute vector construction" width="100%" />

## License

This private workspace package is covered by Apache-2.0 and is not published independently.

## Links

- [Mingcute website](https://www.mingcute.com/)
- [Package changelog](./CHANGELOG.md)
- [Repository architecture](../../README.md#repository-structure)
- [Repository](https://github.com/mingcute-design/mingcute-icons)
