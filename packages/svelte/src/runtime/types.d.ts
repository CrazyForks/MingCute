import type { SVGAttributes } from 'svelte/elements';

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, 'color' | 'height' | 'width'> {
  size?: number | string;
  width?: number | string;
  height?: number | string;
  color?: string;
  title?: string;
  titleId?: string;
  ariaLabel?: string;
  ariaHidden?: boolean | 'true' | 'false';
  className?: string;
  ref?: SVGSVGElement | null;
}

export interface IconDataProps extends IconProps {
  source: string;
  viewBox?: string;
  name?: string;
}
