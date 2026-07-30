<a href="https://www.mingcute.com/">
  <img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner1.png" alt="Mingcute Icon System" width="100%" />
</a>

<h1 align="center">@mingcute/core</h1>

<h3 align="center">Private shared contracts for the Mingcute Icons workspace</h3>

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

`@mingcute/core` is a private workspace package. It is not an npm product and must never be added to an application dependency list. It centralizes architecture rules used by package generators and tests.

This package owns:

- Core Regular and Filled style declarations;
- icon and metadata contracts;
- naming and component-name normalization; and
- framework adapter contracts.

## Workspace Exports

- `@mingcute/core`: shared contracts and helpers.
- `@mingcute/core/styles`: style catalogue and resolution.
- `@mingcute/core/icons`: normalized icon types and naming.
- `@mingcute/core/adapters`: stable framework adapter contract.

<a href="https://www.mingcute.com/">
  <img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner2.png" alt="Mingcute icons in product interfaces" width="100%" />
</a>

## Publication Boundary

The manifest uses `"private": true`, has no `publishConfig`, and is rejected by release guards if it appears as a public runtime dependency. Consumer packages expose self-contained public types or depend on `@mingcute/icons` instead.

## Maintainer Contract

- Style identifiers and icon names are release contracts consumed by every generator.
- Naming helpers must remain deterministic across operating systems and filesystem order.
- Adapter contracts describe build output only; they must not introduce framework runtime dependencies here.
- Changes that affect generated public exports require a coordinated version and regeneration of every consumer package.
- The package must remain private, side-effect free, and absent from packed public dependency graphs.

## Troubleshooting

- **A generator cannot resolve a style:** confirm it exists in the Core Regular and Filled catalogue and regenerate from the same workspace version.
- **Component names collide:** fix canonical naming at the source contract instead of adding adapter-specific exceptions.
- **A release audit finds `@mingcute/core`:** remove the runtime dependency from the consumer package and generate self-contained public output.

## Development

```bash
pnpm --filter @mingcute/core build
pnpm --filter @mingcute/core typecheck
pnpm --filter @mingcute/core test
```

<img src="https://raw.githubusercontent.com/mingcute-design/mingcute-icons/main/images/banner3.png" alt="Editable Mingcute vector construction" width="100%" />

## License

This private workspace package is covered by Apache-2.0 and is not published independently.

## Links

- [Mingcute website](https://www.mingcute.com/)
- [Package changelog](./CHANGELOG.md)
- [Repository architecture](../../README.md#repository-structure)
- [Repository](https://github.com/mingcute-design/mingcute-icons)
