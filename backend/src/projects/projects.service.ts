import { Injectable, NotFoundException } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import type { ProjectDetail, ProjectSummary } from '@aloft/content';
import { AppConfigService } from '../config/app-config.service';
import { PrismaService } from '../prisma/prisma.service';
import { toDetail, toSummary } from './project.mapper';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

@Injectable()
export class ProjectsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: AppConfigService,
  ) {}

  /** Only published case studies are public; drafts are a local preview aid. */
  private visibility(): Prisma.ProjectWhereInput {
    return this.config.get('PROJECTS_INCLUDE_DRAFTS') ? {} : { published: true };
  }

  async list(filter: { service?: string } = {}): Promise<ProjectSummary[]> {
    const rows = await this.prisma.project.findMany({
      where: {
        ...this.visibility(),
        ...(filter.service ? { serviceSlugs: { has: filter.service } } : {}),
      },
      include: { images: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
    return rows.map(toSummary);
  }

  async getBySlug(slug: string): Promise<ProjectDetail> {
    if (!SLUG_PATTERN.test(slug) || slug.length > 120) throw new NotFoundException('Project not found');
    const row = await this.prisma.project.findFirst({
      where: { slug, ...this.visibility() },
      include: { images: true },
    });
    if (!row) throw new NotFoundException('Project not found');
    return toDetail(row);
  }
}
