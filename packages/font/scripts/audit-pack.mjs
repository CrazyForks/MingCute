import { spawnSync } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const packageRoot = path.resolve(import.meta.dirname, '..');
const cache = await mkdtemp(path.join(os.tmpdir(), 'mingcute-font-pack-'));
try {
  const packed = spawnSync('npm', ['pack', '--dry-run', '--json'], {
    cwd: packageRoot,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
    env: { ...process.env, npm_config_cache: cache },
  });
  if (packed.status !== 0) throw new Error(packed.stderr || packed.stdout);
  const report = JSON.parse(packed.stdout)[0];
  const files = report.files.map(({ path: filePath }) => filePath);
  const fonts = files.filter((file) => /^dist\/fonts\/[^/]+\.woff2$/.test(file));
  const stylesheets = files.filter((file) => /^dist\/css\/[^/]+\.min\.css$/.test(file));
  const metadata = files.filter((file) => /^dist\/metadata\/[^/]+\.json$/.test(file));
  const sources = files.filter((file) => /^(?:src|scripts|tests|\.tooling|metadata)\//.test(file));
  const maps = files.filter((file) => file.endsWith('.map'));
  console.table({
    package: `${report.name}@${report.version}`,
    files: files.length,
    fontFiles: fonts.length,
    stylesheets: stylesheets.length,
    metadataFiles: metadata.length,
    sourceFiles: sources.length,
    sourceMaps: maps.length,
    unpackedBytes: report.unpackedSize,
  });
  if (fonts.length !== 2 || stylesheets.length !== 3 || metadata.length !== 3 || sources.length || maps.length) {
    throw new Error('Font packed-artifact audit failed.');
  }
  console.log('Font packed-artifact audit passed.');
} finally {
  await rm(cache, { recursive: true, force: true });
}
