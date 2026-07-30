import { h, type ComponentObjectPropsOptions, type FunctionalComponent } from 'vue';
import { useStableIconId } from './ids.js';
import type { IconProps } from './types.js';

export const iconPropOptions = {
  size: { type: [Number, String], default: 24 },
  color: { type: String, default: 'currentColor' },
  title: { type: String, default: undefined },
  titleId: { type: String, default: undefined },
} satisfies ComponentObjectPropsOptions<IconProps>;

export const Icon: FunctionalComponent<IconProps> = (props, { attrs, slots }) => {
  const generatedId = useStableIconId();
  const hasTitle = typeof props.title === 'string' && props.title.length > 0;
  const ariaLabel = attrs['aria-label'];
  const ariaLabelledBy = attrs['aria-labelledby'];
  const ariaHidden = attrs['aria-hidden'];
  const role = attrs.role;
  const hasExplicitName = ariaLabel !== undefined || ariaLabelledBy !== undefined;
  const resolvedTitleId = props.titleId ?? `mgc-title-${generatedId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const resolvedLabelledBy = ariaLabelledBy ?? (hasTitle && ariaLabel === undefined ? resolvedTitleId : undefined);
  const resolvedHidden = ariaHidden !== undefined ? ariaHidden : (!hasTitle && !hasExplicitName ? true : undefined);
  const resolvedRole = role ?? (hasTitle || hasExplicitName ? 'img' : undefined);

  return h('svg', {
    ...attrs,
    xmlns: 'http://www.w3.org/2000/svg',
    width: attrs.width !== undefined ? attrs.width : props.size,
    height: attrs.height !== undefined ? attrs.height : props.size,
    style: [{ color: props.color }, attrs.style],
    role: resolvedRole,
    'aria-label': ariaLabel,
    'aria-labelledby': resolvedLabelledBy,
    'aria-hidden': resolvedHidden,
  }, [
    hasTitle ? h('title', { id: resolvedTitleId }, props.title) : null,
    ...(slots.default?.() ?? []),
  ]);
};

Icon.props = iconPropOptions;
Icon.inheritAttrs = false;
Icon.displayName = 'Icon';
