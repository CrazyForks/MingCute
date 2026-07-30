<script>
  import { scopeSvgIds } from './scope.js';

  let {
    source,
    viewBox = '0 0 24 24',
    name = 'Icon',
    size = 24,
    width = size,
    height = size,
    color = 'currentColor',
    title,
    titleId,
    ariaLabel,
    ariaHidden,
    class: classValue,
    className,
    style = '',
    ref = $bindable(),
    'aria-label': ariaLabelAttribute,
    'aria-labelledby': ariaLabelledBy,
    'aria-hidden': ariaHiddenAttribute,
    role,
    ...rest
  } = $props();

  const rawInstanceId = $props.id();
  const instanceId = rawInstanceId.replace(/[^a-zA-Z0-9_-]/g, '');
  const safeName = name.replace(/[^a-zA-Z0-9_-]/g, '');
  const hasTitle = $derived(typeof title === 'string' && title.length > 0);
  const explicitLabel = $derived(ariaLabelAttribute ?? ariaLabel);
  const explicitHidden = $derived(ariaHiddenAttribute ?? ariaHidden);
  const resolvedTitleId = $derived(titleId ?? `mgc-title-${instanceId}`);
  const resolvedLabelledBy = $derived(ariaLabelledBy ?? (hasTitle && explicitLabel === undefined ? resolvedTitleId : undefined));
  const resolvedHidden = $derived(explicitHidden ?? (!hasTitle && explicitLabel === undefined && ariaLabelledBy === undefined ? true : undefined));
  const resolvedRole = $derived(role ?? (hasTitle || explicitLabel !== undefined || ariaLabelledBy !== undefined ? 'img' : undefined));
  const scopedSource = $derived(scopeSvgIds(source, `mgc-${safeName}-${instanceId}`));
  const resolvedStyle = $derived(`color:${color}${style ? `;${style}` : ''}`);
</script>

<svg
  {...rest}
  bind:this={ref}
  xmlns="http://www.w3.org/2000/svg"
  {viewBox}
  {width}
  {height}
  class={classValue ?? className}
  style={resolvedStyle}
  role={resolvedRole}
  aria-label={explicitLabel}
  aria-labelledby={resolvedLabelledBy}
  aria-hidden={resolvedHidden}
>
  {#if hasTitle}<title id={resolvedTitleId}>{title}</title>{/if}
  {@html scopedSource}
</svg>
