import type { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  title?: string;
  /** Overrides the generated id used to associate a title with its SVG. */
  titleId?: string;
}
