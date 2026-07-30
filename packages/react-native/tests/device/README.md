# React Native Angular Gradient Device Gate

`AngularGradientFixture.ts` contains every free angular-gradient icon audited by
the compiler and SVG packages. Type-check it before mounting:

```bash
pnpm --filter @mingcute/react-native typecheck:device
```

Mount `AngularGradientFixture` as the root screen of a React Native or Expo
development app that resolves this workspace package. Inspect both sizes on a
real device or simulator for seams, hard opacity bands, clipping overflow, and
color differences. Record the package version, platform, device, and screenshot
with the release evidence.
