export interface SvgNode {
  name: string;
  attributes: Record<string, string>;
  children: SvgNode[];
}

export interface ParsedSvg {
  attributes: Record<string, string>;
  children: SvgNode[];
}
