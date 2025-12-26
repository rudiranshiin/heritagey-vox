import { PrismaClient } from '@prisma/client';
import { seedCurriculum } from './curriculum';

const prisma = new PrismaClient();

async function seedLanguages() {
  console.log('🌍 Seeding Languages...');

  const languages = [
    {
      code: 'en-GB',
      name: 'British English',
      nativeName: 'British English',
      flag: '🇬🇧',
      isActive: true,
    },
    {
      code: 'fr-FR',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷',
      isActive: false,
    },
    {
      code: 'es-ES',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸',
      isActive: false,
    },
    {
      code: 'de-DE',
      name: 'German',
      nativeName: 'Deutsch',
      flag: '🇩🇪',
      isActive: false,
    },
  ];

  for (const lang of languages) {
    await prisma.language.upsert({
      where: { code: lang.code },
      update: lang,
      create: lang,
    });
    console.log(`  ✅ ${lang.name} (${lang.code})`);
  }
}

async function main() {
  console.log('🌱 Starting seed...\n');

  // Seed languages first
  await seedLanguages();

  // Seed curriculum (modules, scenarios, pathways)
  await seedCurriculum(prisma);

  console.log('🌱 All seeding complete!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

