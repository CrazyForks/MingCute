export function scopeSvgIds(source: string, prefix: string): string {
  assertSafeIconSource(source);
  const ids = [...source.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  let scoped = source;
  for (const id of ids) {
    const next = `${prefix}-${id}`;
    scoped = scoped
      .split(`id="${id}"`).join(`id="${next}"`)
      .split(`url(#${id})`).join(`url(#${next})`)
      .split(`href="#${id}"`).join(`href="#${next}"`);
  }
  return scoped;
}

export function escapeXml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function assertSafeIconSource(source: string): void {
  if (
    /<\s*(?:script|iframe|object|embed|link|meta)\b|\bon[a-z]+\s*=|javascript\s*:|data\s*:\s*text\/html|expression\s*\(/i.test(source) ||
    /\b(?:href|xlink:href)\s*=\s*["'](?!#|data:image\/(?:gif|jpeg|png|webp);base64,)/i.test(source) ||
    /url\(\s*(?!#)/i.test(source)
  ) {
    throw new TypeError('Icon source contains unsafe active or external content.');
  }
}
