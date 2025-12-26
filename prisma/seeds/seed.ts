import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Seed Languages
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
      isActive: false, // Coming soon
    },
    {
      code: 'es-ES',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸',
      isActive: false, // Coming soon
    },
    {
      code: 'de-DE',
      name: 'German',
      nativeName: 'Deutsch',
      flag: '🇩🇪',
      isActive: false, // Coming soon
    },
  ];

  for (const lang of languages) {
    await prisma.language.upsert({
      where: { code: lang.code },
      update: lang,
      create: lang,
    });
    console.log(`  ✅ Language: ${lang.name} (${lang.code})`);
  }

  console.log('🌱 Seed completed!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

