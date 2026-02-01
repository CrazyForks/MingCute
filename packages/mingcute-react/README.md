<p align="center">
  <a href="https://www.mingcute.com/">
    <img src="https://raw.githubusercontent.com/mingcute-design/mingcute-docs/main/images/mingcute_react.png" alt="MingCute icon library for React applications.">
  </a>
</p>

<p align="center">
Implementation of the MingCute Icons library for React applications.
</p>

<p align="center">
  <a href="https://www.mingcute.com/">Browse all icons at MingCute.com →</a>
</p>

[![npm](https://img.shields.io/npm/v/@mingcute/react.svg?labelColor=4A4A4A&color=007AFF&style=shield)](https://www.npmjs.com/package/@mingcute/react)
[![stars](https://img.shields.io/github/stars/Richard9394/MingCute.svg?labelColor=4A4A4A&color=FE7D37&style=shield)](https://github.com/Richard9394/MingCute/stargazers)
[![downloads](https://img.shields.io/npm/dt/mingcute_icon.svg?labelColor=4A4A4A&color=23AF5F&style=shield)](https://www.npmjs.com/package/mingcute_icon)
[![twitter](https://img.shields.io/twitter/follow/MingCute_icon.svg?label=MingCute_icon&style=social)](https://x.com/MingCute_icon)

# MingCute Icons for React

## Installation

```bash
npm install @mingcute/react
# or
yarn add @mingcute/react
# or
pnpm add @mingcute/react
```

## Usage

### Basic Usage

Import icons from `@mingcute/react`.

```jsx
import { MingcuteFill, Home1Line, SearchLine } from '@mingcute/react';

function App() {
  return (
    <div>
      {/* Default: 24px size and currentColor */}
      <MingcuteFill />

      {/* Custom size and color */}
      <Home1Line size={32} color="#007AFF" />

      {/* Inherits standard SVG props */}
      <SearchLine opacity={0.5} />
    </div>
  );
}
```

### Props

All icons accept standard SVG attributes and the following optional props:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `number \| string` | `24` | The size of the icon (width and height). |
| `color` | `string` | `currentColor` | The color of the icon. |

### Color Control

You can control the icon color using the `color` prop or CSS `color` property.
The icons use `currentColor` by default, so they will inherit the text color of their parent element.

```jsx
// Use color prop
<MingcuteFill color="red" />

// Use CSS inheritance
<div style={{ color: 'blue' }}>
  <MingcuteFill /> 
</div>
```

##  License

[Apache-2.0 License](https://github.com/mingcute-design/mingcute-icons/blob/main/LICENSE)