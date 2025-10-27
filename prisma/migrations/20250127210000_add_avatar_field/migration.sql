-- Add avatar field
ALTER TABLE "system_logs" ADD COLUMN IF NOT EXISTS "markedByUserAvatar" TEXT;

