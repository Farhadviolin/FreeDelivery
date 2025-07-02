import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedWalletDemoUser() {
  await prisma.user.create({
    data: {
      email: 'wallet-demo@kileifer.de',
      name: 'Wallet Demo User',
      role: 'CUSTOMER',
      wallet: {
        create: {
          balance: 1000,
          currency: 'EUR',
        },
      },
    },
  });
  console.log('Demo Wallet User seeded.');
}

seedWalletDemoUser().finally(() => prisma.$disconnect());
