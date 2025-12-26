import { PrismaClient } from '@prisma/client';

const LANG = 'en-GB';
const MODULE = `${LANG}:2C`;

export async function seedScenarios2C(prisma: PrismaClient) {
  console.log('    📖 Seeding Module 2C scenarios...');

  const scenarios = [
    {
      id: `${MODULE}-1`,
      moduleId: MODULE,
      title: 'Discussing British History and Culture',
      context:
        'Engaging in conversations about British historical events, traditions, and cultural heritage.',
      objectives: [
        'Discuss key historical periods and events',
        'Understand historical references in conversation',
        'Connect history to modern British life',
      ],
      practiceActivities: [
        {
          type: 'discussion',
          prompt: 'Discuss what you know about the British monarchy and its role today',
          expectedBehaviors: ['Show knowledge', 'Express nuanced views', 'Acknowledge different perspectives'],
          difficulty: 'medium',
        },
        {
          type: 'scenario',
          prompt: 'A British person mentions World War II in conversation - engage meaningfully',
          expectedBehaviors: ['Show awareness', 'Be respectful', 'Ask questions appropriately'],
          difficulty: 'medium',
        },
      ],
      culturalInsights: [
        {
          topic: 'WWII in British Identity',
          content:
            'The Second World War remains central to British identity. "The Blitz spirit" is still referenced in times of crisis.',
          importance: 'essential',
        },
        {
          topic: 'The Royal Family',
          content:
            'Views on the monarchy vary widely. Some are devoted royalists, others republicans. Gauge your audience.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Historical Discussion Language',
          content:
            "'During the war' often means WWII. 'Post-war' refers to 1945-1960s. 'Victorian' describes 19th century values/style.",
          examples: ['During the war...', 'In the post-war period...', 'That\'s very Victorian...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Assuming views on controversial historical topics',
          correction: 'Be neutral and exploratory about sensitive history',
          explanation:
            'Colonial history and immigration are complex topics. Listen more than you opine initially.',
        },
        {
          mistake: 'Not knowing key historical references',
          correction: 'Learn basic British history touchstones',
          explanation:
            'References to "the Blitz", "Dunkirk", or "the Empire" come up often. Basic knowledge helps.',
        },
      ],
      successCriteria: [
        'Engages meaningfully with historical topics',
        'Shows cultural awareness',
        'Navigates sensitive history diplomatically',
      ],
      order: 1,
    },
    {
      id: `${MODULE}-2`,
      moduleId: MODULE,
      title: 'Understanding Cultural References in Media',
      context:
        'Recognizing and understanding allusions, references, and cultural touchstones in British media.',
      objectives: [
        'Recognize common cultural references',
        'Understand British humor in media',
        'Discuss British media intelligently',
      ],
      practiceActivities: [
        {
          type: 'discussion',
          prompt: 'Discuss a British TV show and why it\'s culturally significant',
          expectedBehaviors: ['Explain cultural context', 'Identify typical British elements', 'Share your reaction'],
          difficulty: 'medium',
        },
        {
          type: 'scenario',
          prompt: 'Someone makes a reference you don\'t understand - ask about it naturally',
          expectedBehaviors: ['Admit unfamiliarity politely', 'Ask for context', 'Show interest in learning'],
          difficulty: 'easy',
        },
      ],
      culturalInsights: [
        {
          topic: 'British Comedy Touchstones',
          content:
            'Fawlty Towers, Blackadder, The Office, Monty Python are referenced constantly. Basic familiarity helps.',
          importance: 'essential',
        },
        {
          topic: 'Literary References',
          content:
            'Shakespeare, Austen, Dickens are common reference points. "It was the best of times..." needs no explanation.',
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Reference Language',
          content:
            "'Don\'t mention the war' (Fawlty Towers), 'I have a cunning plan' (Blackadder), 'that\'s what she said' (The Office).",
          examples: ['Don\'t mention the war', 'I have a cunning plan', 'And now for something completely different'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Pretending to understand references',
          correction: 'It\'s fine to ask "What\'s that from?"',
          explanation:
            'British people enjoy explaining cultural references. Pretending to know then getting it wrong is worse.',
        },
        {
          mistake: 'Only knowing American versions',
          correction: 'Watch original British versions when they exist',
          explanation:
            'The British Office, Shameless, etc. differ significantly from US versions. Know the difference.',
        },
      ],
      successCriteria: [
        'Recognizes common cultural references',
        'Asks about unfamiliar references appropriately',
        'Discusses British media knowledgeably',
      ],
      order: 2,
    },
    {
      id: `${MODULE}-3`,
      moduleId: MODULE,
      title: 'Discussing British Society and Values',
      context:
        'Understanding and discussing contemporary British social issues and values.',
      objectives: [
        'Discuss British social issues thoughtfully',
        'Understand British values like fairness and tolerance',
        'Navigate discussions about social change',
      ],
      practiceActivities: [
        {
          type: 'discussion',
          prompt: 'Discuss how British society has changed in recent decades',
          expectedBehaviors: ['Show knowledge of changes', 'Present balanced view', 'Listen to other perspectives'],
          difficulty: 'hard',
        },
        {
          type: 'scenario',
          prompt: 'Someone brings up Brexit - navigate the conversation diplomatically',
          expectedBehaviors: ['Stay neutral initially', 'Listen to their view', 'Share if appropriate'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Core British Values',
          content:
            'Fairness, queuing, tolerance, stoicism, and self-deprecation are considered quintessentially British.',
          importance: 'essential',
        },
        {
          topic: 'Class Consciousness',
          content:
            'Class remains important in Britain though discussing it directly is awkward. Accent, vocabulary, and taste signal class.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Social Discussion Language',
          content:
            "'Fair enough', 'each to their own', 'horses for courses' signal acceptance of different views.",
          examples: ['Fair enough', 'Each to their own', 'That\'s a matter of opinion', 'I see where you\'re coming from'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Asking directly about class',
          correction: 'Observe and infer rather than asking',
          explanation:
            'Asking "What class are you?" is extremely awkward. British people signal class indirectly.',
        },
        {
          mistake: 'Assuming political views',
          correction: 'Let people reveal their views naturally',
          explanation:
            'Don\'t assume political allegiance based on location, accent, or job. Britain is politically diverse.',
        },
      ],
      successCriteria: [
        'Discusses social issues sensitively',
        'Shows awareness of British values',
        'Navigates politically sensitive topics',
      ],
      order: 3,
    },
    {
      id: `${MODULE}-4`,
      moduleId: MODULE,
      title: 'Understanding Regional and Class Differences',
      context:
        'Recognizing and navigating the diversity of British accents, dialects, and cultural differences.',
      objectives: [
        'Recognize major British accents',
        'Understand regional stereotypes and sensitivities',
        'Adapt to regional variations in language',
      ],
      practiceActivities: [
        {
          type: 'scenario',
          prompt: 'You\'re talking to someone with a strong regional accent - navigate the interaction',
          expectedBehaviors: ['Listen carefully', 'Ask for clarification if needed', 'Don\'t mock or imitate'],
          difficulty: 'medium',
        },
        {
          type: 'discussion',
          prompt: 'Discuss differences between London and other regions',
          expectedBehaviors: ['Show awareness', 'Avoid stereotypes', 'Be respectful'],
          difficulty: 'medium',
        },
      ],
      culturalInsights: [
        {
          topic: 'North-South Divide',
          content:
            'There\'s real cultural and economic difference between North and South England. Don\'t dismiss either.',
          importance: 'essential',
        },
        {
          topic: 'Accent Prejudice',
          content:
            'Some accents face discrimination (unfortunately). Be aware that accent doesn\'t equal intelligence or competence.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Regional Vocabulary',
          content:
            "'Tea' means dinner in the North. 'Cob', 'bap', 'roll', 'barm' all mean bread roll depending on region.",
          examples: ['Regional: dinner vs tea', 'Regional: bread roll names', 'Scotland: wee, aye'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Imitating regional accents',
          correction: 'Never mimic someone\'s accent, even affectionately',
          explanation:
            'Accent mockery is offensive. Even well-intentioned imitation usually comes across badly.',
        },
        {
          mistake: 'Treating London as "real" Britain',
          correction: 'Recognize that Britain is not just London',
          explanation:
            'Many British people are sensitive about London-centrism. Show interest in other regions.',
        },
      ],
      successCriteria: [
        'Recognizes regional differences respectfully',
        'Understands without imitating accents',
        'Shows awareness of regional sensitivities',
      ],
      order: 4,
    },
    {
      id: `${MODULE}-5`,
      moduleId: MODULE,
      title: 'Discussing Sports as a Cultural Phenomenon',
      context:
        'Understanding British sports culture, especially football, cricket, and rugby.',
      objectives: [
        'Discuss major British sports knowledgeably',
        'Understand sports as social glue',
        'Navigate sports conversations appropriately',
      ],
      practiceActivities: [
        {
          type: 'discussion',
          prompt: 'Discuss the Premier League with a colleague',
          expectedBehaviors: ['Show some knowledge', 'Ask about their team', 'Engage appropriately'],
          difficulty: 'medium',
        },
        {
          type: 'scenario',
          prompt: 'Someone asks which football team you support - handle it if you don\'t follow football',
          expectedBehaviors: ['Be honest', 'Show interest anyway', 'Ask about their team'],
          difficulty: 'easy',
        },
      ],
      culturalInsights: [
        {
          topic: 'Football as Religion',
          content:
            'Football (soccer) is enormous in Britain. Premier League teams have fierce tribal loyalties. Tread carefully with rivalries.',
          importance: 'essential',
        },
        {
          topic: 'Cricket and Class',
          content:
            'Cricket traditionally has class associations - more middle/upper class. Understanding basic rules helps at work events.',
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Sports Vocabulary',
          content:
            "'Football' not 'soccer'. 'Pitch' not 'field'. 'Nil' not 'zero'. 'Match' not 'game' (usually).",
          examples: ['Three-nil', 'On the pitch', 'What a match!', 'Did you watch the game?'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Saying "soccer"',
          correction: 'Always say "football" in Britain',
          explanation:
            'While "soccer" is understood, using it marks you as non-British immediately.',
        },
        {
          mistake: 'Supporting a rival team',
          correction: 'Be careful about declaring team allegiances',
          explanation:
            'If you\'re asked, it\'s safest to admit you don\'t really follow football rather than picking a random team.',
        },
      ],
      successCriteria: [
        'Uses correct sports terminology',
        'Engages in sports conversations appropriately',
        'Navigates team loyalties tactfully',
      ],
      order: 5,
    },
  ];

  for (const scenario of scenarios) {
    await prisma.scenario.upsert({
      where: { id: scenario.id },
      update: scenario,
      create: scenario,
    });
  }

  console.log(`      ✅ Created ${scenarios.length} scenarios for Module 2C`);
}

