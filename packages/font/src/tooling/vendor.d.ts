declare module 'svgpath' {
  interface SvgPath {
    scale(sx: number, sy?: number): SvgPath;
    translate(x: number, y?: number): SvgPath;
    round(precision: number): SvgPath;
    toString(): string;
  }
  export default function svgpath(path: string): SvgPath;
}

declare module 'svg2ttf' {
  interface Svg2TtfResult { buffer: Uint8Array }
  export default function svg2ttf(source: string, options?: Record<string, unknown>): Svg2TtfResult;
}
