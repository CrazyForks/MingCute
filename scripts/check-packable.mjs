import { spawnSync } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { discoverReleasePackages, loadReleasePolicy, validateRelease } from './release-policy.mjs';

const rootDir = path.resolve(import.meta.dirname, '..');
const tempDir = await mkdtemp(path.join(os.tmpdir(), 'mingcute-free-pack-'));
const packages = await discoverReleasePackages(rootDir);
validateRelease(await loadReleasePolicy(rootDir), packages);

try {
  for (const { directory, manifest } of packages) {
    const result = spawnSync('pnpm', ['--dir', directory, 'pack', '--pack-destination', tempDir], {
      cwd: rootDir,
      encoding: 'utf8',
      stdio: ['ignore', 'ignore', 'pipe'],
    });
    if (result.status !== 0) throw new Error(`pnpm pack failed for ${manifest.name}: ${result.stderr}`);
  }
} finally {
  await rm(tempDir, { recursive: true, force: true });
}

console.log(`Pack check passed for ${packages.length} public Mingcute packages.`);
