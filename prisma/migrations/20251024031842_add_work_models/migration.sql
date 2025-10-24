/*
  Warnings:

  - You are about to drop the `work` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."work";

-- CreateTable
CREATE TABLE "Work" (
    "id" TEXT NOT NULL,
    "language" JSONB NOT NULL,
    "framework" JSONB,
    "repositoryUrl" TEXT NOT NULL,
    "imageUrl" TEXT,
    "imageAlt" TEXT,

    CONSTRAINT "Work_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkTranslation" (
    "id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "technicalHighlights" JSONB NOT NULL,
    "workId" TEXT NOT NULL,

    CONSTRAINT "WorkTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkTranslation_workId_language_key" ON "WorkTranslation"("workId", "language");

-- AddForeignKey
ALTER TABLE "WorkTranslation" ADD CONSTRAINT "WorkTranslation_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE CASCADE ON UPDATE CASCADE;
