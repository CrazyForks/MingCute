import type { JSX } from 'solid-js';

export interface IconProps extends Omit<JSX.SvgSVGAttributes<SVGSVGElement>, 'color' | 'height' | 'width'> {
  size?: number | string;
  width?: number | string;
  height?: number | string;
  color?: string;
  title?: string;
  titleId?: string;
  ariaLabel?: string;
  ariaHidden?: boolean | 'true' | 'false';
  className?: string;
}

export interface IconDataProps extends IconProps {
  source: string;
  viewBox?: string;
  name?: string;
}
