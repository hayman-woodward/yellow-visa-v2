const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Inserindo atualizações do sistema...');

  await prisma.systemLog.createMany({
    data: [
      {
        title: 'Imagem Hero Mobile Atualizada',
        description: 'Nova foto do hero na versão mobile para melhor visualização e engagement.',
        category: 'update',
        isRead: false,
      },
      {
        title: 'Sistema de Tracking Corrigido',
        description: 'Correção completa do tracking analytics. Eventos form_start, form_progress e form_convert agora funcionando corretamente em GTM, Facebook Pixel e Segment.',
        category: 'update',
        isRead: false,
      },
      {
        title: 'Formulário com Campos Separados',
        description: 'Formulário de captura agora tem campos separados (nome e sobrenome) em vez de um campo único. Facilita nomes compostos e melhora a qualidade dos dados.',
        category: 'update',
        isRead: false,
      },
    ],
  });

  console.log('✅ Atualizações inseridas com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

