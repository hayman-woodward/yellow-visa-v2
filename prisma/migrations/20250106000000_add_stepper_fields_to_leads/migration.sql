-- AddStepperFieldsToLeads
ALTER TABLE "leads" ADD COLUMN "pais" TEXT;
ALTER TABLE "leads" ADD COLUMN "idioma" TEXT;
ALTER TABLE "leads" ADD COLUMN "dados_adicionais" JSONB;
