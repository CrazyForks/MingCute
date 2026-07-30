export function scopeSvgIds(source, prefix) {
  assertSafeIconSource(source);
  const ids = [...source.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  let scoped = source;
  for (const id of ids) {
    const next = `${prefix}-${id}`;
    scoped = scoped
      .replaceAll(`id="${id}"`, `id="${next}"`)
      .replaceAll(`url(#${id})`, `url(#${next})`)
      .replaceAll(`href="#${id}"`, `href="#${next}"`);
  }
  return scoped;
}

function assertSafeIconSource(source) {
  if (
    /<\s*(?:script|iframe|object|embed|link|meta)\b|\bon[a-z]+\s*=|javascript\s*:|data\s*:\s*text\/html|expression\s*\(/i.test(source) ||
    /\b(?:href|xlink:href)\s*=\s*["'](?!#|data:image\/(?:gif|jpeg|png|webp);base64,)/i.test(source) ||
    /url\(\s*(?!#)/i.test(source)
  ) {
    throw new TypeError('Icon source contains unsafe active or external content.');
  }
}
