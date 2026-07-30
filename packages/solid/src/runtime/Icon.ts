import { createComponent, createUniqueId, mergeProps, splitProps, type Component, type JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { escapeXml, scopeSvgIds } from './scope.js';
import type { IconDataProps } from './types.js';

const localKeys = [
  'source', 'viewBox', 'name', 'size', 'width', 'height', 'color', 'title', 'titleId',
  'ariaLabel', 'ariaHidden', 'aria-label', 'aria-labelledby', 'aria-hidden', 'role',
  'class', 'className', 'style',
] as const;

export const Icon: Component<IconDataProps> = (inputProps) => {
  const props = mergeProps({ viewBox: '0 0 24 24', name: 'Icon', size: 24, color: 'currentColor' }, inputProps);
  const [local, rest] = splitProps(props, localKeys);
  const instanceId = createUniqueId().replace(/[^a-zA-Z0-9_-]/g, '');

  const svgProps = mergeProps(rest, {
    component: 'svg',
    xmlns: 'http://www.w3.org/2000/svg',
    get viewBox() { return local.viewBox; },
    get width() { return local.width ?? local.size; },
    get height() { return local.height ?? local.size; },
    get class() { return local.class ?? local.className; },
    get style() { return mergeStyle(local.color, local.style); },
    get role() { return local.role ?? (hasAccessibleName(local) ? 'img' : undefined); },
    get ['aria-label']() { return local['aria-label'] ?? local.ariaLabel; },
    get ['aria-labelledby']() {
      return local['aria-labelledby'] ?? (hasTitle(local) && (local['aria-label'] ?? local.ariaLabel) === undefined ? resolvedTitleId(local, instanceId) : undefined);
    },
    get ['aria-hidden']() {
      return local['aria-hidden'] ?? local.ariaHidden ?? (!hasAccessibleName(local) ? true : undefined);
    },
    get innerHTML() {
      const title = hasTitle(local) ? `<title id="${escapeXml(resolvedTitleId(local, instanceId))}">${escapeXml(local.title!)}</title>` : '';
      const safeName = String(local.name).replace(/[^a-zA-Z0-9_-]/g, '');
      return `${title}${scopeSvgIds(local.source, `mgc-${safeName}-${instanceId}`)}`;
    },
  });
  return createComponent(Dynamic, svgProps as Parameters<typeof Dynamic>[0]);
};

function hasTitle(props: Pick<IconDataProps, 'title'>): boolean {
  return typeof props.title === 'string' && props.title.length > 0;
}
function hasAccessibleName(props: IconDataProps): boolean {
  return hasTitle(props) || (props['aria-label'] ?? props.ariaLabel) !== undefined || props['aria-labelledby'] !== undefined;
}
function resolvedTitleId(props: IconDataProps, instanceId: string): string {
  return props.titleId ?? `mgc-title-${instanceId}`;
}
function mergeStyle(color: string | undefined, style: JSX.CSSProperties | string | undefined): JSX.CSSProperties | string {
  if (typeof style === 'string') return `color:${color ?? 'currentColor'}${style ? `;${style}` : ''}`;
  return { color: color ?? 'currentColor', ...(style ?? {}) };
}
