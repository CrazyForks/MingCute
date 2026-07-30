import { toKebabCase, type IconDefinition } from '@mingcute/core';

export const codepointRange = Object.freeze({ start: 0xe001, end: 0xf8ff });

export interface CodepointLedger {
  schemaVersion: 1;
  range: { start: string; end: string };
  assignments: Record<string, string>;
  aliases: Record<string, string>;
  retired: Record<string, string>;
}

export function iconIdentity(definition: Pick<IconDefinition, 'name'>): string {
  return toKebabCase(definition.name);
}

export function resolveCodepoint(ledger: CodepointLedger, identityOrName: string): number {
  const identity = toKebabCase(identityOrName);
  const canonical = ledger.aliases[identity] ?? identity;
  const encoded = ledger.assignments[canonical];
  if (!encoded) throw new Error(`No font codepoint is assigned to ${identity}. Run codepoints:update explicitly.`);
  return Number.parseInt(encoded, 16);
}

export function validateCodepointLedger(value: unknown): asserts value is CodepointLedger {
  if (!value || typeof value !== 'object') throw new Error('Codepoint ledger must be an object.');
  const ledger = value as Partial<CodepointLedger>;
  if (ledger.schemaVersion !== 1) throw new Error('Unsupported codepoint ledger schema.');
  if (ledger.range?.start !== 'E001' || ledger.range?.end !== 'F8FF') {
    throw new Error('Codepoint ledger must use the approved E001-F8FF range.');
  }
  for (const key of ['assignments', 'aliases', 'retired'] as const) {
    if (!ledger[key] || typeof ledger[key] !== 'object' || Array.isArray(ledger[key])) {
      throw new Error(`Codepoint ledger ${key} must be an object.`);
    }
  }

  const used = new Map<string, string>();
  for (const [status, records] of [['active', ledger.assignments], ['retired', ledger.retired]] as const) {
    for (const [identity, encoded] of Object.entries(records!)) {
      if (identity !== toKebabCase(identity) || !identity) throw new Error(`Invalid canonical icon identity: ${identity}`);
      if (!/^[0-9A-F]{4,6}$/.test(encoded)) throw new Error(`Invalid codepoint for ${identity}: ${encoded}`);
      const codepoint = Number.parseInt(encoded, 16);
      if (codepoint < codepointRange.start || codepoint > codepointRange.end) {
        throw new Error(`Codepoint for ${identity} is outside the approved private-use range: ${encoded}`);
      }
      const previous = used.get(encoded);
      if (previous) throw new Error(`Codepoint ${encoded} is assigned to both ${previous} and ${identity}.`);
      used.set(encoded, `${status}:${identity}`);
    }
  }

  for (const [alias, target] of Object.entries(ledger.aliases!)) {
    if (alias !== toKebabCase(alias) || !alias) throw new Error(`Invalid codepoint alias: ${alias}`);
    if (!ledger.assignments![target]) throw new Error(`Codepoint alias ${alias} targets missing active identity ${target}.`);
    if (ledger.assignments![alias] || ledger.retired![alias]) throw new Error(`Codepoint alias ${alias} collides with a ledger identity.`);
  }
}

export function validateCorpusCoverage(ledger: CodepointLedger, identities: ReadonlySet<string>): void {
  const missing = [...identities].filter((identity) => !ledger.assignments[identity] && !ledger.aliases[identity]).sort();
  if (missing.length) throw new Error(`Unassigned font identities: ${missing.slice(0, 10).join(', ')}`);
  const absent = Object.keys(ledger.assignments).filter((identity) => !identities.has(identity)).sort();
  if (absent.length) {
    throw new Error(`Active codepoint identities absent from the corpus; retire explicitly: ${absent.slice(0, 10).join(', ')}`);
  }
}

export function assertAppendOnlyCodepoints(previous: CodepointLedger, current: CodepointLedger): void {
  validateCodepointLedger(previous);
  validateCodepointLedger(current);
  for (const [identity, encoded] of Object.entries(previous.assignments)) {
    const aliasTarget = current.aliases[identity];
    const currentValue = current.assignments[identity] ?? current.retired[identity] ??
      (aliasTarget ? current.assignments[aliasTarget] : undefined);
    if (currentValue !== encoded) {
      throw new Error(`Released codepoint changed or disappeared: ${identity} was ${encoded}, now ${currentValue ?? 'missing'}.`);
    }
  }
  for (const [identity, encoded] of Object.entries(previous.retired)) {
    if (current.retired[identity] !== encoded) {
      throw new Error(`Retired codepoint changed or was reused: ${identity} was ${encoded}.`);
    }
  }
  for (const [alias, previousTarget] of Object.entries(previous.aliases)) {
    const currentTarget = current.aliases[alias];
    const previousValue = previous.assignments[previousTarget];
    if (!currentTarget || current.assignments[currentTarget] !== previousValue) {
      throw new Error(`Released codepoint alias changed or disappeared: ${alias}.`);
    }
  }
}

export function formatCodepoint(value: number): string {
  return value.toString(16).toUpperCase().padStart(4, '0');
}
