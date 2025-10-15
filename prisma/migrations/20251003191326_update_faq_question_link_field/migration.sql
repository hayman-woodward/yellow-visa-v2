/*
  Warnings:

  - You are about to drop the column `answer` on the `faq_questions` table. All the data in the column will be lost.
  - Added the required column `link` to the `faq_questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."faq_questions" DROP COLUMN "answer",
ADD COLUMN     "link" TEXT NOT NULL;
