/*
  Warnings:

  - You are about to drop the `faqs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."faqs";

-- CreateTable
CREATE TABLE "public"."faq_groups" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "image_url" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faq_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."faq_questions" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "faq_questions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "faq_groups_slug_key" ON "public"."faq_groups"("slug");

-- AddForeignKey
ALTER TABLE "public"."faq_questions" ADD CONSTRAINT "faq_questions_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "public"."faq_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
