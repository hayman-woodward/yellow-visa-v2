-- Add notes and negative status fields
ALTER TABLE "system_logs" ADD COLUMN IF NOT EXISTS "notes" TEXT;
ALTER TABLE "system_logs" ADD COLUMN IF NOT EXISTS "isNegative" BOOLEAN NOT NULL DEFAULT false;

