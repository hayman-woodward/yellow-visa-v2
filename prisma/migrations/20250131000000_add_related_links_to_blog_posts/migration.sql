-- Add related links fields to blog_posts
ALTER TABLE "blog_posts" ADD COLUMN IF NOT EXISTS "related_links_enabled" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "blog_posts" ADD COLUMN IF NOT EXISTS "related_links" TEXT;

