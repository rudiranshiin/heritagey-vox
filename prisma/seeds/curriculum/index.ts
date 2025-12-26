import { PrismaClient } from '@prisma/client';
import { seedBritishEnglish } from './en-GB';
// Future languages:
// import { seedFrench } from './fr-FR';
// import { seedSpanish } from './es-ES';
// import { seedGerman } from './de-DE';

export async function seedCurriculum(prisma: PrismaClient) {
  console.log('\n🎓 Seeding Curriculum...');

  // Seed British English
  await seedBritishEnglish(prisma);

  // Future: Add more languages here
  // await seedFrench(prisma);
  // await seedSpanish(prisma);
  // await seedGerman(prisma);

  console.log('\n🎓 All curriculum seeding complete!\n');
}
