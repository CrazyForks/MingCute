export type IconSource = string;

export interface IconOptions {
  size?: number | string;
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
  title?: string;
  titleId?: string;
  ariaLabel?: string;
  ariaHidden?: boolean;
  attributes?: Readonly<Record<string, string | number | boolean>>;
}
