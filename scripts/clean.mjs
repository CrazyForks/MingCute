import { readdir, rm } from 'node:fs/promises';
import path from 'node:path';

const rootDir = path.resolve(import.meta.dirname, '..');
for (const entry of await readdir(path.join(rootDir, 'packages'), { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const packageDir = path.join(rootDir, 'packages', entry.name);
  await rm(path.join(packageDir, 'dist'), {
    recursive: true,
    force: true,
    maxRetries: 5,
    retryDelay: 100,
  });
  await rm(path.join(packageDir, '.tooling'), {
    recursive: true,
    force: true,
    maxRetries: 5,
    retryDelay: 100,
  });
}
