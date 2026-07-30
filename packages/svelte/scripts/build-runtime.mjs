import { cp, mkdir } from 'node:fs/promises';
import path from 'node:path';

const packageRoot = path.resolve(import.meta.dirname, '..');
const source = path.join(packageRoot, 'src/runtime');
const destination = path.join(packageRoot, 'dist/runtime');
await mkdir(destination, { recursive: true });
for (const file of ['Icon.svelte', 'Icon.d.ts', 'scope.js', 'scope.d.ts', 'types.d.ts']) {
  await cp(path.join(source, file), path.join(destination, file));
}
