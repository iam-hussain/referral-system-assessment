import { PrismaClient } from '@prisma/client';

import generateNanoID from '../src/utils/generate-nano-id';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function seed() {
  // Insert the data into Prisma models
  await prisma.user.createMany({
    data: [
      {
        name: 'Alice',
        referralCode: generateNanoID(),
      },
      {
        name: 'Bob',
        referralCode: generateNanoID(),
      },
      {
        name: 'Dan',
        referralCode: generateNanoID(),
      },
    ],
  });
}

seed()
  .then(() => {
    console.log('Data seed successfully.');
  })
  .catch((error) => {
    console.error('Error data seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
