import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.profile.createMany({
    data: [
      {
        name: 'Adarsh Jain',
        email: 'adarsh.jain@example.com',
        bio: 'I am a software developer.',
        title: 'Software Developer',
        adminKey: "sssss"
      }
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });