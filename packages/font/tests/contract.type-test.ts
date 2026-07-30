import type { FrameworkAdapter } from '@mingcute/core';
import { createFontAdapter } from '../src/tooling/adapter.js';
import type { CodepointLedger } from '../src/tooling/codepoints.js';

const ledger: CodepointLedger = {
  schemaVersion: 1,
  range: { start: 'E001', end: 'F8FF' },
  assignments: {},
  aliases: {},
  retired: {},
};
const adapter: FrameworkAdapter = createFontAdapter(ledger);
void adapter;
