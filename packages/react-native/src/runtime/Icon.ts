import { createElement, forwardRef, type ReactNode } from 'react';
import { Svg } from 'react-native-svg';
import type { IconProps } from './types.js';

export interface IconComponentProps extends IconProps { children?: ReactNode; }

export const Icon = forwardRef<Svg, IconComponentProps>(function Icon({
  size = 24,
  color = 'currentColor',
  primaryColor,
  title,
  children,
  width,
  height,
  accessible,
  accessibilityLabel,
  accessibilityRole,
  accessibilityElementsHidden,
  importantForAccessibility,
  ...props
}, ref) {
  const resolvedColor = primaryColor ?? color;
  const hasName = accessibilityLabel !== undefined || (typeof title === 'string' && title.length > 0);
  return createElement(Svg, {
    ...props,
    ref,
    width: width ?? size,
    height: height ?? size,
    color: resolvedColor,
    accessible: accessible ?? hasName,
    accessibilityLabel: accessibilityLabel ?? (hasName ? title : undefined),
    accessibilityRole: accessibilityRole ?? (hasName ? 'image' : undefined),
    accessibilityElementsHidden: accessibilityElementsHidden ?? (!hasName ? true : undefined),
    importantForAccessibility: importantForAccessibility ?? (!hasName ? 'no-hide-descendants' : undefined),
  }, children);
});

Icon.displayName = 'Icon';
