import { PrismaClient } from '@prisma/client';
import { seedModules } from './modules';
import { seedScenarios1A } from './scenarios-1a';
import { seedScenarios1B } from './scenarios-1b';
import { seedScenarios1C } from './scenarios-1c';
import { seedScenarios1D } from './scenarios-1d';
import { seedScenarios2A } from './scenarios-2a';
import { seedScenarios2B } from './scenarios-2b';
import { seedScenarios2C } from './scenarios-2c';
import { seedScenarios2D } from './scenarios-2d';
import { seedScenarios3A } from './scenarios-3a';
import { seedScenarios3B } from './scenarios-3b';
import { seedScenarios3C } from './scenarios-3c';
import { seedScenarios3D } from './scenarios-3d';
import { seedScenarios4A } from './scenarios-4a';
import { seedScenarios4B } from './scenarios-4b';
import { seedScenarios4C } from './scenarios-4c';
import { seedPathways } from './pathways';

export async function seedCurriculum(prisma: PrismaClient) {
  console.log('\n🎓 Seeding British English Curriculum...');

  // Seed modules first (parent before children)
  await seedModules(prisma);

  // Seed scenarios for Module 1: Foundation (A2-B1)
  console.log('\n  📚 Module 1: Foundation');
  await seedScenarios1A(prisma); // Essential Daily Interactions
  await seedScenarios1B(prisma); // Building Social Connections
  await seedScenarios1C(prisma); // Practical Life Management
  await seedScenarios1D(prisma); // Expanding Conversational Range

  // Seed scenarios for Module 2: Intermediate (B1-B2)
  console.log('\n  📚 Module 2: Intermediate');
  await seedScenarios2A(prisma); // Mastering British Idioms and Expressions
  await seedScenarios2B(prisma); // Professional and Academic Communication
  await seedScenarios2C(prisma); // Deep Cultural Immersion
  await seedScenarios2D(prisma); // Spontaneous Communication Mastery

  // Seed scenarios for Module 3: Advanced (B2-C1)
  console.log('\n  📚 Module 3: Advanced');
  await seedScenarios3A(prisma); // Subtle Language Mastery
  await seedScenarios3B(prisma); // Intellectual and Abstract Discourse
  await seedScenarios3C(prisma); // Perfecting Pronunciation and Prosody
  await seedScenarios3D(prisma); // Professional Excellence

  // Seed scenarios for Module 4: Mastery (C1-C2)
  console.log('\n  📚 Module 4: Mastery');
  await seedScenarios4A(prisma); // Creative Language Use
  await seedScenarios4B(prisma); // Complete Register Command
  await seedScenarios4C(prisma); // Cultural Insider Status

  // Seed pathways
  console.log('\n  🛤️  Seeding Adaptive Pathways...');
  await seedPathways(prisma);

  console.log('\n🎓 Curriculum seeding complete!');
  console.log('   ✅ 19 modules seeded');
  console.log('   ✅ 75 scenarios seeded (5 per sub-module)');
  console.log('   ✅ 5 adaptive pathways seeded\n');
}
