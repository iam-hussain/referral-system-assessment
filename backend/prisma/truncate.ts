import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function truncate() {
  // Delete items in all tables
  await prisma.user.deleteMany({
    where: {
      refereeId: {
        not: null,
      },
    },
  });

  await prisma.user.deleteMany();

  console.log('All records have been deleted');
}

truncate()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
