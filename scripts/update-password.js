const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function updatePassword() {
  try {
    // Hash da nova senha
    const hashedPassword = await bcrypt.hash('@Boxe130911', 10);

    // Atualizar senha
    const user = await prisma.user.update({
      where: { email: 'it@hayhyve.com' },
      data: {
        password: hashedPassword
      }
    });

    console.log('✅ Senha atualizada com sucesso!');
    console.log('👤 Nome:', user.name);
    console.log('📧 Email:', user.email);
    console.log('🔑 Nova senha: @Boxe130911');
    console.log('🔐 Role:', user.role);
  } catch (error) {
    console.error('❌ Erro ao atualizar senha:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updatePassword();
