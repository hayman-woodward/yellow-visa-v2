const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createSuperAdmin() {
  try {
    // Hash da senha
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Criar super admin
    const user = await prisma.user.create({
      data: {
        name: 'Rafael Dias',
        email: 'it@hayhyve.com',
        password: hashedPassword,
        role: 'super_admin'
      }
    });

    console.log('✅ Super Admin criado com sucesso!');
    console.log('👤 Nome:', user.name);
    console.log('📧 Email:', user.email);
    console.log('🔑 Senha: admin123');
    console.log('🔐 Role:', user.role);
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('⚠️  Usuário já existe! Tentando atualizar...');

      const user = await prisma.user.update({
        where: { email: 'it@hayhyve.com' },
        data: {
          name: 'Rafael Dias',
          role: 'super_admin'
        }
      });

      console.log('✅ Usuário atualizado para Super Admin!');
      console.log('👤 Nome:', user.name);
      console.log('📧 Email:', user.email);
      console.log('🔐 Role:', user.role);
    } else {
      console.error('❌ Erro:', error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createSuperAdmin();
