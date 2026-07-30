import type { SvgProps } from 'react-native-svg';

export interface IconProps extends Omit<SvgProps, 'color'> {
  size?: number | string;
  color?: string;
  primaryColor?: string;
  secondaryColor?: string;
  secondaryOpacity?: number;
  title?: string;
}
