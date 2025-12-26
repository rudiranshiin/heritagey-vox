import { PrismaClient } from '@prisma/client';
import { seedModules } from './modules';
import { seedPathways } from './pathways';
import { seedBritishEnglishScenarios } from './scenarios';

export async function seedBritishEnglish(prisma: PrismaClient) {
  console.log('\n🇬🇧 Seeding British English Curriculum...');

  // Seed modules first (parent before children)
  await seedModules(prisma);

  // Seed all scenarios
  await seedBritishEnglishScenarios(prisma);

  // Seed pathways
  console.log('\n  🛤️  Seeding Adaptive Pathways...');
  await seedPathways(prisma);

  console.log('\n🇬🇧 British English seeding complete!');
  console.log('   ✅ 19 modules');
  console.log('   ✅ 75 scenarios (5 per sub-module)');
  console.log('   ✅ 5 adaptive pathways\n');
}

