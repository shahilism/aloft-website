import type { Project, ProjectImage as ProjectImageRow } from '@prisma/client';
import type { ProjectDetail, ProjectImage, ProjectSummary } from '@aloft/content';

export type ProjectWithImages = Project & { images: ProjectImageRow[] };

function toImage(row: ProjectImageRow): ProjectImage {
  return {
    url: row.url,
    alt: row.alt,
    kind: row.kind.toLowerCase() as ProjectImage['kind'],
    width: row.width,
    height: row.height,
  };
}

export function toSummary(p: ProjectWithImages): ProjectSummary {
  const images = [...p.images].sort((a, b) => a.sortOrder - b.sortOrder).map(toImage);
  const find = (kind: ProjectImage['kind']) => images.find((i) => i.kind === kind) ?? null;
  return {
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    buildingType: p.buildingType,
    location: p.location,
    system: p.system,
    capacity: p.capacity,
    servicesProvided: p.servicesProvided,
    serviceSlugs: p.serviceSlugs,
    coverImage: find('cover') ?? find('after') ?? images[0] ?? null,
    beforeImage: find('before'),
    afterImage: find('after'),
    isDraft: !p.published,
  };
}

export function toDetail(p: ProjectWithImages): ProjectDetail {
  return {
    ...toSummary(p),
    challenge: p.challenge,
    solution: p.solution,
    execution: p.execution,
    outcome: p.outcome,
    images: [...p.images].sort((a, b) => a.sortOrder - b.sortOrder).map(toImage),
    completedAt: p.completedAt?.toISOString() ?? null,
    updatedAt: p.updatedAt.toISOString(),
  };
}
