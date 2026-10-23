import { NotFoundException } from '@nestjs/common';
import type { AppConfigService } from '../config/app-config.service';
import type { PrismaService } from '../prisma/prisma.service';
import { ProjectsService } from './projects.service';

const row = (overrides: Record<string, unknown> = {}) => ({
  id: 'p1',
  slug: 'office-vrf',
  title: 'Office VRF installation',
  summary: 'Summary',
  buildingType: 'Commercial office',
  location: 'Malappuram',
  system: 'VRF',
  capacity: null,
  scope: 'Scope',
  servicesProvided: ['Piping'],
  serviceSlugs: ['vrf-vrv-systems'],
  challenge: 'c',
  solution: 's',
  execution: 'e',
  outcome: 'o',
  published: true,
  sortOrder: 1,
  completedAt: null,
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-01-02'),
  images: [
    { id: 'i2', projectId: 'p1', url: '/a.jpg', alt: 'after', kind: 'AFTER', width: 10, height: 10, sortOrder: 2 },
    { id: 'i1', projectId: 'p1', url: '/b.jpg', alt: 'before', kind: 'BEFORE', width: 10, height: 10, sortOrder: 1 },
  ],
  ...overrides,
});

function setup(includeDrafts = false) {
  const prisma = { project: { findMany: jest.fn().mockResolvedValue([row()]), findFirst: jest.fn() } };
  const config = { get: (k: string) => (k === 'PROJECTS_INCLUDE_DRAFTS' ? includeDrafts : undefined) };
  return {
    prisma,
    service: new ProjectsService(prisma as unknown as PrismaService, config as unknown as AppConfigService),
  };
}

describe('ProjectsService', () => {
  it('lists only published projects by default', async () => {
    const { service, prisma } = setup();
    const list = await service.list();
    expect(prisma.project.findMany.mock.calls[0][0].where).toEqual({ published: true });
    expect(list[0]).toMatchObject({
      slug: 'office-vrf',
      isDraft: false,
      beforeImage: { url: '/b.jpg', kind: 'before' },
      afterImage: { url: '/a.jpg', kind: 'after' },
      coverImage: { url: '/a.jpg' },
    });
  });

  it('includes drafts only when explicitly enabled', async () => {
    const { service, prisma } = setup(true);
    await service.list();
    expect(prisma.project.findMany.mock.calls[0][0].where).toEqual({});
  });

  it('filters by related service', async () => {
    const { service, prisma } = setup();
    await service.list({ service: 'hvac-amc' });
    expect(prisma.project.findMany.mock.calls[0][0].where).toEqual({
      published: true,
      serviceSlugs: { has: 'hvac-amc' },
    });
  });

  it('returns detail with images in display order', async () => {
    const { service, prisma } = setup();
    prisma.project.findFirst.mockResolvedValue(row());
    const detail = await service.getBySlug('office-vrf');
    expect(detail.images.map((i) => i.alt)).toEqual(['before', 'after']);
    expect(detail.updatedAt).toBe('2026-01-02T00:00:00.000Z');
  });

  it('404s for unknown, unpublished or malformed slugs without querying bad input', async () => {
    const { service, prisma } = setup();
    prisma.project.findFirst.mockResolvedValue(null);
    await expect(service.getBySlug('missing')).rejects.toBeInstanceOf(NotFoundException);
    await expect(service.getBySlug('../etc/passwd')).rejects.toBeInstanceOf(NotFoundException);
    expect(prisma.project.findFirst).toHaveBeenCalledTimes(1);
  });
});
