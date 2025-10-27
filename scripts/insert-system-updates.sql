-- Script para inserir atualizações do sistema manualmente
-- Execute este script no Prisma Studio ou direto no banco

-- Update 1: Foto Mobile atualizada
INSERT INTO "system_logs" (id, title, description, category, "isRead", "created_at", "updated_at")
VALUES (
  gen_random_uuid(),
  'Imagem Hero Mobile Atualizada',
  'Nova foto do hero na versão mobile para melhor visualização e engagement.',
  'update',
  false,
  NOW(),
  NOW()
);

-- Update 2: Tracking Analytics corrigido
INSERT INTO "system_logs" (id, title, description, category, "isRead", "created_at", "updated_at")
VALUES (
  gen_random_uuid(),
  'Sistema de Tracking Corrigido',
  'Correção completa do tracking analytics. Eventos form_start, form_progress e form_convert agora funcionando corretamente em GTM, Facebook Pixel e Segment.',
  'update',
  false,
  NOW(),
  NOW()
);

-- Update 3: Formulário separado em 2 campos
INSERT INTO "system_logs" (id, title, description, category, "isRead", "created_at", "updated_at")
VALUES (
  gen_random_uuid(),
  'Formulário com Campos Separados',
  'Formulário de captura agora tem campos separados (nome e sobrenome) em vez de um campo único. Facilita nomes compostos e melhora a qualidade dos dados.',
  'update',
  false,
  NOW(),
  NOW()
);

