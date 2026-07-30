import { createComponent, mergeProps, type Component } from 'solid-js';
import { Icon } from './Icon.js';
import type { IconProps } from './types.js';

export function createIcon(source: string, viewBox: string, name: string): Component<IconProps> {
  const Component: Component<IconProps> = (props) => createComponent(Icon, mergeProps({ source, viewBox, name }, props));
  return Component;
}
