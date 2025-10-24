-- CreateTable
CREATE TABLE "work" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "technicalHighlights" JSONB NOT NULL,
    "language" JSONB NOT NULL,
    "framework" JSONB,
    "repositoryUrl" TEXT NOT NULL,
    "imageUrl" TEXT,
    "imageAlt" TEXT,

    CONSTRAINT "work_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "work_title_key" ON "work"("title");
