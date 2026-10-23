import 'server-only';
import type { ApiItem, ApiList, ProjectDetail, ProjectSummary } from '@aloft/content';
import { serverApiUrl } from './env';

/** Projects change rarely; pages re-fetch at most every five minutes. */
const REVALIDATE_SECONDS = 300;
const TIMEOUT_MS = 5000;

export type Result<T> = { ok: true; data: T } | { ok: false; status: number | null };

async function get<T>(path: string): Promise<Result<T>> {
  try {
    const res = await fetch(`${serverApiUrl}/api/v1${path}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: REVALIDATE_SECONDS, tags: ['projects'] },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return { ok: false, status: res.status };
    return { ok: true, data: (await res.json()) as T };
  } catch {
    // Network failure or timeout: callers render an unavailable state.
    return { ok: false, status: null };
  }
}

export async function getProjects(): Promise<Result<ProjectSummary[]>> {
  const res = await get<ApiList<ProjectSummary>>('/projects');
  return res.ok ? { ok: true, data: res.data.data } : res;
}

export async function getProject(slug: string): Promise<Result<ProjectDetail>> {
  const res = await get<ApiItem<ProjectDetail>>(`/projects/${encodeURIComponent(slug)}`);
  return res.ok ? { ok: true, data: res.data.data } : res;
}
