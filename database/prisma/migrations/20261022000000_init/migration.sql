-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "EnquiryStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'CLOSED', 'SPAM');

-- CreateEnum
CREATE TYPE "ProjectImageKind" AS ENUM ('COVER', 'BEFORE', 'AFTER', 'GALLERY');

-- CreateTable
CREATE TABLE "enquiries" (
    "id" UUID NOT NULL,
    "fullName" VARCHAR(100) NOT NULL,
    "companyName" VARCHAR(120),
    "email" VARCHAR(254) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "projectLocation" VARCHAR(120) NOT NULL,
    "service" VARCHAR(40) NOT NULL,
    "buildingType" VARCHAR(40) NOT NULL,
    "approxArea" VARCHAR(60),
    "projectStage" VARCHAR(40) NOT NULL,
    "message" TEXT NOT NULL,
    "sourcePath" VARCHAR(200),
    "status" "EnquiryStatus" NOT NULL DEFAULT 'NEW',
    "ipHash" VARCHAR(64),
    "userAgent" VARCHAR(300),
    "notifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "enquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" UUID NOT NULL,
    "slug" VARCHAR(120) NOT NULL,
    "title" VARCHAR(160) NOT NULL,
    "summary" TEXT NOT NULL,
    "buildingType" VARCHAR(120) NOT NULL,
    "location" VARCHAR(160) NOT NULL,
    "system" VARCHAR(160) NOT NULL,
    "capacity" VARCHAR(120),
    "scope" TEXT NOT NULL,
    "servicesProvided" TEXT[],
    "serviceSlugs" TEXT[],
    "challenge" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "execution" TEXT NOT NULL,
    "outcome" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_images" (
    "id" UUID NOT NULL,
    "projectId" UUID NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "alt" VARCHAR(300) NOT NULL,
    "kind" "ProjectImageKind" NOT NULL DEFAULT 'GALLERY',
    "width" INTEGER,
    "height" INTEGER,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "project_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "enquiries_createdAt_idx" ON "enquiries"("createdAt");

-- CreateIndex
CREATE INDEX "enquiries_status_idx" ON "enquiries"("status");

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");

-- CreateIndex
CREATE INDEX "projects_published_sortOrder_idx" ON "projects"("published", "sortOrder");

-- CreateIndex
CREATE INDEX "project_images_projectId_sortOrder_idx" ON "project_images"("projectId", "sortOrder");

-- AddForeignKey
ALTER TABLE "project_images" ADD CONSTRAINT "project_images_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

