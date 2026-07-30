import { forwardRef, useId, type ReactNode } from 'react';
import type { IconProps } from './types.js';

export interface IconComponentProps extends IconProps {
  children?: ReactNode;
}

export const Icon = forwardRef<SVGSVGElement, IconComponentProps>(function Icon(
  {
    size = 24,
    color = 'currentColor',
    title,
    titleId: suppliedTitleId,
    children,
    style,
    width,
    height,
    role,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-hidden': ariaHidden,
    ...svgProps
  },
  ref,
) {
  const generatedId = useId();
  const hasTitle = typeof title === 'string' && title.length > 0;
  const hasExplicitName = ariaLabel !== undefined || ariaLabelledBy !== undefined;
  const resolvedTitleId = suppliedTitleId ?? `mgc-title-${generatedId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const resolvedLabelledBy = ariaLabelledBy ?? (hasTitle && ariaLabel === undefined ? resolvedTitleId : undefined);
  const resolvedHidden = ariaHidden ?? (!hasTitle && !hasExplicitName ? true : undefined);
  const resolvedRole = role ?? (hasTitle || hasExplicitName ? 'img' : undefined);

  return (
    <svg
      {...svgProps}
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? size}
      height={height ?? size}
      style={{ color, ...style }}
      role={resolvedRole}
      aria-label={ariaLabel}
      aria-labelledby={resolvedLabelledBy}
      aria-hidden={resolvedHidden}
    >
      {hasTitle ? <title id={resolvedTitleId}>{title}</title> : null}
      {children}
    </svg>
  );
});

Icon.displayName = 'Icon';
