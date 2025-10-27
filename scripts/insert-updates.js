const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Inserindo nova atualização no sistema...');

  await prisma.systemLog.create({
    data: {
      title: 'Campo WhatsApp Adicionado ao Formulário de Contato',
      description: 'Implementado toggle WhatsApp no formulário de contato (etapa 7) com integração completa ao banco de dados. Adicionado campo whatsapp (boolean) que é salvo no banco dentro de notes (JSON) e enviado para ambas as APIs (interna e externa). No painel de detalhes dos leads, aparece um badge verde indicando se o telefone é WhatsApp. Toggle customizado com dimensões 40x24px (track) e 16x16px (thumb) conforme Figma.',
      category: 'update',
      isRead: false,
    }
  });

  console.log('✅ Nova atualização inserida com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

