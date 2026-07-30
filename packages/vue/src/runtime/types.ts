import type { SVGAttributes } from 'vue';

export interface IconProps extends SVGAttributes {
  size?: number | string;
  color?: string;
  title?: string;
  /** Overrides the generated id used to associate a title with its SVG. */
  titleId?: string;
}
