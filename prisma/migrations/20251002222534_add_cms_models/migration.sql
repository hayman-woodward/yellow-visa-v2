/*
  Warnings:

  - You are about to drop the column `categoryId` on the `vistos` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `vistos` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `vistos` table. All the data in the column will be lost.
  - You are about to drop the column `featured` on the `vistos` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `vistos` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `vistos` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `vistos` table. All the data in the column will be lost.
  - You are about to drop the column `requirements` on the `vistos` table. All the data in the column will be lost.
  - Added the required column `country` to the `vistos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visto_type` to the `vistos` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `vistos` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."vistos" DROP CONSTRAINT "vistos_categoryId_fkey";

-- AlterTable
ALTER TABLE "public"."vistos" DROP COLUMN "categoryId",
DROP COLUMN "content",
DROP COLUMN "duration",
DROP COLUMN "featured",
DROP COLUMN "image",
DROP COLUMN "price",
DROP COLUMN "published",
DROP COLUMN "requirements",
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'draft',
ADD COLUMN     "visto_type" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."historias" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image_url" TEXT,
    "author_name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "historias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."destinos" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT,
    "country" TEXT NOT NULL,
    "continent" TEXT NOT NULL,
    "highlights" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "destinos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "historias_slug_key" ON "public"."historias"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "destinos_slug_key" ON "public"."destinos"("slug");
