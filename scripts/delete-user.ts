import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteUser() {
  const email = process.argv[2];

  if (!email) {
    console.error('❌ Por favor, forneça um email!');
    console.log('Uso: npm run delete-user email@exemplo.com');
    process.exit(1);
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      console.log(`⚠️  Usuário com email "${email}" não encontrado.`);
      process.exit(0);
    }

    await prisma.user.delete({
      where: { email }
    });

    console.log(`✅ Usuário "${user.name}" (${email}) deletado com sucesso!`);
  } catch (error) {
    console.error('❌ Erro ao deletar usuário:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

deleteUser();

