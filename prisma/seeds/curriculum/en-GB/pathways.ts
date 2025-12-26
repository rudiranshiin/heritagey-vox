import { PrismaClient } from '@prisma/client';

const LANG = 'en-GB';

export async function seedPathways(prisma: PrismaClient) {
  console.log('  🛤️ Seeding British English pathways...');

  const pathways = [
    {
      id: `${LANG}:business`,
      languageCode: LANG,
      name: 'Business Professional',
      description:
        'Focused pathway for those needing British English for work. Emphasizes professional communication, interviews, meetings, and workplace culture.',
      moduleOverrides: {
        '2B': 1, // Professional communication first
        '3D': 2, // Professional excellence
        '2A': 3, // Idioms and expressions
      },
      additionalContent: [
        'Business email writing workshop',
        'Interview preparation intensive',
        'Networking language practice',
        'Presentation skills module',
      ],
    },
    {
      id: `${LANG}:academic`,
      languageCode: LANG,
      name: 'Academic Learner',
      description:
        'For students preparing for UK university or academic careers. Focuses on academic writing, seminar participation, and intellectual discourse.',
      moduleOverrides: {
        '2B': 1, // Academic communication
        '3B': 2, // Intellectual discourse
        '2C': 3, // Cultural immersion
      },
      additionalContent: [
        'Academic writing conventions',
        'Seminar participation practice',
        'Critical analysis language',
        'Thesis defense preparation',
      ],
    },
    {
      id: `${LANG}:social`,
      languageCode: LANG,
      name: 'Social and Cultural',
      description:
        'For those wanting to make friends, integrate socially, and enjoy British culture. Emphasizes casual conversation, humor, and cultural knowledge.',
      moduleOverrides: {
        '1B': 1, // Social connections
        '2C': 2, // Cultural immersion
        '2A': 3, // Idioms and banter
      },
      additionalContent: [
        'Pub conversation practice',
        'British humor workshop',
        'Sports conversation module',
        'Regional dialect exposure',
      ],
    },
    {
      id: `${LANG}:relocation`,
      languageCode: LANG,
      name: 'Relocation Preparation',
      description:
        'For those moving to the UK. Prioritizes practical life skills: housing, healthcare, banking, and everyday necessities.',
      moduleOverrides: {
        '1C': 1, // Practical life management
        '1A': 2, // Daily interactions
        '1B': 3, // Social connections
      },
      additionalContent: [
        'NHS registration guide',
        'Housing market vocabulary',
        'Banking and utilities module',
        'School enrollment language (for parents)',
      ],
    },
    {
      id: `${LANG}:heritage`,
      languageCode: LANG,
      name: 'Heritage and Family',
      description:
        'For those with British family connections looking to reconnect with their heritage. Focuses on intergenerational communication and cultural roots.',
      moduleOverrides: {
        '2C': 1, // Cultural deep-dive
        '1B': 2, // Family social connections
        '4C': 3, // Cultural insider status
      },
      additionalContent: [
        'Family history conversation',
        'Regional identity exploration',
        'Traditional British customs',
        'Intergenerational communication',
      ],
    },
  ];

  for (const pathway of pathways) {
    await prisma.pathway.upsert({
      where: { id: pathway.id },
      update: pathway,
      create: pathway,
    });
  }

  console.log(`    ✅ Created ${pathways.length} pathways`);
}
