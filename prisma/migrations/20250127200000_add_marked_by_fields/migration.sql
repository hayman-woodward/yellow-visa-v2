-- Add fields to track who marked as read
ALTER TABLE "system_logs" ADD COLUMN IF NOT EXISTS "markedByUserId" TEXT;
ALTER TABLE "system_logs" ADD COLUMN IF NOT EXISTS "markedByUserName" TEXT;

