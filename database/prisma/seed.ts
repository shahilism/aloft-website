/**
 * Seeds the case-study templates from the content draft as UNPUBLISHED
 * drafts. They contain placeholders, so they are never served publicly
 * unless PROJECTS_INCLUDE_DRAFTS=true (local layout preview only).
 *
 * To publish a real project: replace every placeholder with verified,
 * client-approved details, add site photographs, then set published = true.
 */
import { PrismaClient } from '@prisma/client';
import { projectDraftTemplates } from '@aloft/content';

const prisma = new PrismaClient();

async function main() {
  for (const p of projectDraftTemplates) {
    const existing = await prisma.project.findUnique({ where: { slug: p.slug } });
    if (existing) {
      console.log(`skip  ${p.slug} (already exists)`);
      continue;
    }
    await prisma.project.create({ data: { ...p, published: false } });
    console.log(`draft ${p.slug}`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
