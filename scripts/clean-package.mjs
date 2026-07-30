import { rm } from 'node:fs/promises';
import path from 'node:path';

const packageRoot = process.cwd();
for (const target of process.argv.slice(2)) {
  const destination = path.resolve(packageRoot, target);
  if (!destination.startsWith(`${packageRoot}${path.sep}`)) {
    throw new Error(`Refusing to clean outside package: ${target}`);
  }
  await rm(destination, { recursive: true, force: true });
}
