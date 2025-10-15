const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createUser() {
  try {
    // Hash da senha
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        name: 'Admin Yellow Visa',
        email: 'admin@yellowvisa.com',
        password: hashedPassword,
        role: 'admin'
      }
    });

    console.log('✅ Usuário criado com sucesso!');
    console.log('📧 Email:', user.email);
    console.log('🔑 Senha: admin123');
    console.log('👤 Role:', user.role);
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('⚠️  Usuário já existe no banco!');
    } else {
      console.error('❌ Erro ao criar usuário:', error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createUser();

