import { PrismaClient } from '@prisma/client';
import { seedModules } from './modules';
import { seedScenarios1A } from './scenarios-1a';
import { seedPathways } from './pathways';

export async function seedCurriculum(prisma: PrismaClient) {
  console.log('\n🎓 Seeding British English Curriculum...');

  // Seed modules first (parent before children)
  await seedModules(prisma);

  // Seed scenarios for each module
  await seedScenarios1A(prisma);
  // TODO: Add more scenario files as they're created
  // await seedScenarios1B(prisma);
  // await seedScenarios1C(prisma);
  // await seedScenarios1D(prisma);
  // await seedScenarios2A(prisma);
  // ... etc

  // Seed pathways
  await seedPathways(prisma);

  console.log('🎓 Curriculum seeding complete!\n');
}

