import { escapeXml, renderIconBody } from './render.js';
import type { IconDefinitionData, MingcuteIconConstructor } from './types.js';

const HTMLElementBase = (globalThis.HTMLElement ?? class {}) as typeof HTMLElement;
let instanceSequence = 0;
const CONTROL_ATTRIBUTES = new Set(['size', 'width', 'height', 'color', 'title', 'title-id', 'class', 'style']);

export abstract class MingcuteIconElement extends HTMLElementBase {
  static readonly source: IconDefinitionData;
  static readonly iconName: string;
  readonly #instanceId = ++instanceSequence;

  static get observedAttributes(): string[] {
    return ['size', 'width', 'height', 'color', 'title', 'title-id', 'aria-label', 'aria-labelledby', 'aria-hidden', 'role', 'class', 'style'];
  }

  connectedCallback(): void {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    this.render();
  }

  attributeChangedCallback(): void {
    if (this.isConnected) this.render();
  }

  get svg(): SVGSVGElement | null {
    return this.shadowRoot?.querySelector('svg') ?? null;
  }

  get size(): string | null { return this.getAttribute('size'); }
  set size(value: string | number | null) { reflect(this, 'size', value); }
  get color(): string | null { return this.getAttribute('color'); }
  set color(value: string | null) { reflect(this, 'color', value); }
  get title(): string { return this.getAttribute('title') ?? ''; }
  set title(value: string) { reflect(this, 'title', value || null); }
  get ariaLabel(): string | null { return this.getAttribute('aria-label'); }
  set ariaLabel(value: string | null) { reflect(this, 'aria-label', value); }
  get ariaHidden(): string | null { return this.getAttribute('aria-hidden'); }
  set ariaHidden(value: string | boolean | null) { reflect(this, 'aria-hidden', value); }

  protected render(): void {
    if (!this.shadowRoot) return;
    const constructor = this.constructor as typeof MingcuteIconElement;
    const title = this.getAttribute('title');
    const explicitLabel = this.getAttribute('aria-label');
    const explicitLabelledBy = this.getAttribute('aria-labelledby');
    const explicitHidden = this.getAttribute('aria-hidden');
    const titleId = this.getAttribute('title-id') ?? `mgc-title-${this.#instanceId}`;
    const attributes = new Map<string, string>([
      ['part', 'svg'], ['xmlns', 'http://www.w3.org/2000/svg'], ['viewBox', constructor.source.viewBox],
      ['width', this.getAttribute('width') ?? this.getAttribute('size') ?? '24'],
      ['height', this.getAttribute('height') ?? this.getAttribute('size') ?? '24'],
      ['class', this.getAttribute('class') ?? ''],
      ['style', `color:${this.getAttribute('color') ?? 'currentColor'}${this.getAttribute('style') ? `;${this.getAttribute('style')}` : ''}`],
    ]);
    for (const attribute of Array.from(this.attributes)) {
      if (!CONTROL_ATTRIBUTES.has(attribute.name) && !attribute.name.startsWith('aria-') && attribute.name !== 'role') attributes.set(attribute.name, attribute.value);
    }
    if (explicitLabel !== null) attributes.set('aria-label', explicitLabel);
    if (explicitLabelledBy !== null) attributes.set('aria-labelledby', explicitLabelledBy);
    else if (title && explicitLabel === null) attributes.set('aria-labelledby', titleId);
    if (explicitHidden !== null) attributes.set('aria-hidden', explicitHidden);
    else if (!title && explicitLabel === null && explicitLabelledBy === null) attributes.set('aria-hidden', 'true');
    const explicitRole = this.getAttribute('role');
    if (explicitRole !== null) attributes.set('role', explicitRole);
    else if (title || explicitLabel !== null || explicitLabelledBy !== null) attributes.set('role', 'img');
    const prefix = `mgc-${constructor.iconName.replace(/[^a-zA-Z0-9_-]/g, '')}-${this.#instanceId}`;
    const titleMarkup = title ? `<title id="${escapeXml(titleId)}">${escapeXml(title)}</title>` : '';
    this.shadowRoot.innerHTML = `<svg${serializeAttributes(attributes)}>${titleMarkup}${scopeSvgIds(renderIconBody(constructor.source), prefix)}</svg>`;
  }
}

export function defineIconElement(tagName: string, constructor: MingcuteIconConstructor, registry: CustomElementRegistry = customElements): MingcuteIconConstructor {
  if (!tagName.includes('-')) throw new TypeError(`Custom-element name must contain a hyphen: ${tagName}`);
  const existing = registry.get(tagName);
  if (existing && existing !== constructor) throw new Error(`Custom element ${tagName} is already defined with a different constructor.`);
  if (!existing) registry.define(tagName, constructor);
  return constructor;
}

function reflect(element: Element, name: string, value: string | number | boolean | null): void {
  if (value === null) element.removeAttribute(name); else element.setAttribute(name, String(value));
}
function serializeAttributes(attributes: Map<string, string>): string {
  return [...attributes].map(([name, value]) => ` ${name}="${escapeXml(value)}"`).join('');
}
function scopeSvgIds(source: string, prefix: string): string {
  const ids = [...source.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]); let scoped = source;
  for (const id of ids) { const next = `${prefix}-${id}`; scoped = scoped.split(`id="${id}"`).join(`id="${next}"`).split(`url(#${id})`).join(`url(#${next})`).split(`href="#${id}"`).join(`href="#${next}"`); }
  return scoped;
}
