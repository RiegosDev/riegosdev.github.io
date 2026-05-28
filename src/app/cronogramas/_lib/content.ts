import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

export type CronogramaProject = {
  id: string;
  title: string;
  description?: string;
  status?: string;
  updatedAt: string;
  htmlPath: string;
};

export type CronogramasManifest = {
  version: 1;
  updatedAt: string;
  projects: CronogramaProject[];
};

export const contentRoot =
  process.env.CRONOGRAMAS_CONTENT_DIR ??
  path.join(process.cwd(), 'cronogramas-content');

export function resolveContentPath(relativePath: string) {
  const root = path.resolve(contentRoot);
  const target = path.resolve(root, relativePath);

  if (target !== root && !target.startsWith(root + path.sep)) {
    throw new Error('Invalid cronograma content path');
  }

  return target;
}

export async function readManifest() {
  const manifestFile = resolveContentPath('manifest.json');
  const raw = await readFile(manifestFile, 'utf8');
  const manifest = JSON.parse(raw) as CronogramasManifest;

  if (manifest.version !== 1 || !Array.isArray(manifest.projects)) {
    throw new Error('Invalid cronogramas manifest');
  }

  return manifest;
}

export async function getProject(projectId: string) {
  const manifest = await readManifest();
  return manifest.projects.find((project) => project.id === projectId) ?? null;
}

export async function getContentFile(relativePath: string) {
  const filePath = resolveContentPath(relativePath);
  const fileStat = await stat(filePath);

  if (!fileStat.isFile()) {
    throw new Error('Cronograma content path is not a file');
  }

  return readFile(filePath);
}

export function contentFileUrl(relativePath: string) {
  return `/cronogramas/file/${relativePath
    .split('/')
    .map(encodeURIComponent)
    .join('/')}`;
}

