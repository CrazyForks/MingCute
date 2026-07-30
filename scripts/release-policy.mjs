import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const PUBLIC_PACKAGE = /^@mingcute\/[a-z0-9-]+$/;
const PRIVATE_WORKSPACE_PACKAGES = new Set(['@mingcute/core', '@mingcute/compiler']);
const REPOSITORY = 'git+https://github.com/mingcute-design/mingcute-icons.git';
const ISSUES = 'https://github.com/mingcute-design/mingcute-icons/issues';
const WEBSITE = 'https://www.mingcute.com/';
const ALLOWED_STYLES = new Set(['core-regular', 'core-filled']);

export async function loadReleasePolicy(rootDir) {
  const policy = JSON.parse(await readFile(path.join(rootDir, 'release.json'), 'utf8'));
  if (policy.schemaVersion !== 1) throw new Error(`Unsupported release policy schema: ${policy.schemaVersion}`);
  if (!/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(policy.version)) {
    throw new Error(`Release version is not valid SemVer: ${policy.version}`);
  }
  return policy;
}

export async function discoverReleasePackages(rootDir) {
  const entries = await readdir(path.join(rootDir, 'packages'), { withFileTypes: true });
  const packages = [];
  for (const entry of entries.filter((candidate) => candidate.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))) {
    const directory = path.join(rootDir, 'packages', entry.name);
    const manifest = JSON.parse(await readFile(path.join(directory, 'package.json'), 'utf8'));
    if (PUBLIC_PACKAGE.test(manifest.name ?? '') && manifest.private !== true) {
      packages.push({ directory, manifest });
    }
  }
  return packages;
}

export function validateRelease(policy, packages) {
  const errors = [];
  const names = new Set(packages.map(({ manifest }) => manifest.name));
  for (const name of policy.requiredPackages) {
    if (!names.has(name)) errors.push(`Required release package is missing: ${name}`);
  }
  if (packages.length !== policy.requiredPackages.length) {
    errors.push(`Expected ${policy.requiredPackages.length} public packages, found ${packages.length}`);
  }

  for (const { manifest } of packages) {
    if (!policy.requiredPackages.includes(manifest.name)) errors.push(`Unexpected public package: ${manifest.name}`);
    if (manifest.version !== policy.version) errors.push(`${manifest.name} must use version ${policy.version}`);
    if (manifest.license !== 'Apache-2.0') errors.push(`${manifest.name} must use Apache-2.0`);
    if (manifest.publishConfig?.access !== 'public') errors.push(`${manifest.name} must use public npm access`);
    if (manifest.publishConfig?.registry) errors.push(`${manifest.name} must not override the public npm registry`);
    if (manifest.homepage !== WEBSITE) errors.push(`${manifest.name} homepage must be ${WEBSITE}`);
    if (manifest.repository?.url !== REPOSITORY) errors.push(`${manifest.name} must point to the public repository`);
    if (manifest.bugs?.url !== ISSUES) errors.push(`${manifest.name} issues must point to the public repository`);
    const directoryName = manifest.name === '@mingcute/icons' ? 'icons' : manifest.name.slice('@mingcute/'.length);
    if (manifest.repository?.directory !== `packages/${directoryName}`) {
      errors.push(`${manifest.name} has an incorrect repository.directory`);
    }
    for (const field of ['dependencies', 'optionalDependencies']) {
      for (const name of Object.keys(manifest[field] ?? {})) {
        if (PRIVATE_WORKSPACE_PACKAGES.has(name)) errors.push(`${manifest.name} exposes private workspace runtime dependency ${name}`);
      }
    }
    for (const key of Object.keys(manifest.exports ?? {})) {
      const style = key.startsWith('./')
        ? key.slice(2).replace(/\/\*$/, '').replace(/\.min\.css$/, '')
        : undefined;
      if (style && !ALLOWED_STYLES.has(style) && !['*', 'styles.json', 'metadata', 'package.json', 'fonts', 'bundle'].includes(style)) {
        errors.push(`${manifest.name} exposes unavailable style ${style}`);
      }
    }
  }

  if (errors.length) throw new Error(`Public release validation failed:\n- ${errors.join('\n- ')}`);
  return packages.map(({ manifest }) => ({ name: manifest.name, version: manifest.version }));
}
