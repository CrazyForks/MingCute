import { rm } from 'node:fs/promises';
import path from 'node:path';
import { iconStyles } from '@mingcute/core';

const packageRoot = path.resolve(import.meta.dirname, '..');
for (const style of iconStyles) await rm(path.join(packageRoot, style), { recursive: true, force: true });
await rm(path.join(packageRoot, 'styles.json'), { force: true });
await rm(path.join(packageRoot, 'dist'), { recursive: true, force: true });
