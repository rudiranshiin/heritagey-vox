import { PrismaClient } from '@prisma/client';
import { seedScenarios1A } from './1a';
import { seedScenarios1B } from './1b';
import { seedScenarios1C } from './1c';
import { seedScenarios1D } from './1d';
import { seedScenarios2A } from './2a';
import { seedScenarios2B } from './2b';
import { seedScenarios2C } from './2c';
import { seedScenarios2D } from './2d';
import { seedScenarios3A } from './3a';
import { seedScenarios3B } from './3b';
import { seedScenarios3C } from './3c';
import { seedScenarios3D } from './3d';
import { seedScenarios4A } from './4a';
import { seedScenarios4B } from './4b';
import { seedScenarios4C } from './4c';

export async function seedBritishEnglishScenarios(prisma: PrismaClient) {
  // Module 1: Foundation (A2-B1)
  console.log('\n  📚 Module 1: Foundation');
  await seedScenarios1A(prisma);
  await seedScenarios1B(prisma);
  await seedScenarios1C(prisma);
  await seedScenarios1D(prisma);

  // Module 2: Intermediate (B1-B2)
  console.log('\n  📚 Module 2: Intermediate');
  await seedScenarios2A(prisma);
  await seedScenarios2B(prisma);
  await seedScenarios2C(prisma);
  await seedScenarios2D(prisma);

  // Module 3: Advanced (B2-C1)
  console.log('\n  📚 Module 3: Advanced');
  await seedScenarios3A(prisma);
  await seedScenarios3B(prisma);
  await seedScenarios3C(prisma);
  await seedScenarios3D(prisma);

  // Module 4: Mastery (C1-C2)
  console.log('\n  📚 Module 4: Mastery');
  await seedScenarios4A(prisma);
  await seedScenarios4B(prisma);
  await seedScenarios4C(prisma);
}
