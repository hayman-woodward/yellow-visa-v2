const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Inserindo nova atualização no sistema...');

  await prisma.systemLog.create({
    data: {
      title: 'Idiomas Limitados no Formulário',
      description: 'Em "Selecione o seu idioma", limitamos para apenas os 5 idiomas possíveis responder de acordo com o Salesforce (Português, Espanhol, Inglês, Turco, Chinês).',
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

