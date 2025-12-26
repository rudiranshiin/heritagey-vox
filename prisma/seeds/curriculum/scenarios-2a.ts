import { PrismaClient } from '@prisma/client';

const LANG = 'en-GB';
const MODULE = `${LANG}:2A`;

export async function seedScenarios2A(prisma: PrismaClient) {
  console.log('    📖 Seeding Module 2A scenarios...');

  const scenarios = [
    {
      id: `${MODULE}-1`,
      moduleId: MODULE,
      title: 'Understanding and Using Common Idioms',
      context:
        'Recognizing and appropriately using British idioms in everyday conversation.',
      objectives: [
        'Understand 20+ common British idioms',
        'Use idioms in appropriate contexts',
        'Recognize when idioms are being used',
      ],
      practiceActivities: [
        {
          type: 'discussion',
          prompt: 'Explain a situation using an appropriate idiom',
          expectedBehaviors: ['Select right idiom', 'Use naturally', 'Explain if asked'],
          difficulty: 'medium',
        },
        {
          type: 'role-play',
          prompt: 'Someone uses an idiom you don\'t know - ask for clarification naturally',
          expectedBehaviors: ['Admit confusion politely', 'Ask for explanation', 'Use it correctly after'],
          difficulty: 'medium',
        },
      ],
      culturalInsights: [
        {
          topic: 'Idiom Origins',
          content:
            'Many British idioms come from cricket, naval history, or class divisions. Understanding origins helps remember them.',
          importance: 'helpful',
        },
        {
          topic: 'Regional Variations',
          content:
            'Some idioms are regional. Northern expressions may confuse Southerners and vice versa.',
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Essential British Idioms',
          content:
            "Key idioms: 'Bob's your uncle' (it's done), 'taking the biscuit' (outrageous), 'the penny dropped' (understood finally).",
          examples: ["Bob's your uncle", 'Taking the biscuit', 'The penny dropped', 'Raining cats and dogs'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Using idioms incorrectly or in wrong contexts',
          correction: 'Learn the exact meaning and appropriate situations',
          explanation:
            'Misused idioms sound odd. Learn when NOT to use them as well as when to use them.',
        },
        {
          mistake: 'Overusing idioms to sound more British',
          correction: 'Use sparingly - native speakers don\'t use them constantly',
          explanation:
            'One or two idioms in a conversation is natural. Every sentence having one sounds unnatural.',
        },
      ],
      successCriteria: [
        'Recognizes common idioms when heard',
        'Uses idioms in appropriate contexts',
        'Asks about unknown idioms naturally',
      ],
      order: 1,
    },
    {
      id: `${MODULE}-2`,
      moduleId: MODULE,
      title: 'Engaging in British Banter',
      context:
        'Understanding and participating in the British tradition of playful teasing and humorous exchange.',
      objectives: [
        'Recognize banter vs genuine criticism',
        'Participate in light teasing appropriately',
        'Know when banter is and isn\'t appropriate',
      ],
      practiceActivities: [
        {
          type: 'role-play',
          prompt: 'A friend teases you about something - respond with appropriate banter',
          expectedBehaviors: ['Take it well', 'Return gentle teasing', 'Keep it light'],
          difficulty: 'medium',
        },
        {
          type: 'scenario',
          prompt: 'Initiate friendly banter with a colleague you know well',
          expectedBehaviors: ['Keep it kind', 'Read their reaction', 'Adjust if needed'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Banter as Bonding',
          content:
            'British banter is a sign of affection. Being teased often means you\'re liked. Not being teased can feel like exclusion.',
          importance: 'essential',
        },
        {
          topic: 'Banter Boundaries',
          content:
            'Good banter never punches down or targets genuine insecurities. It should make everyone laugh, including the target.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Banter Language',
          content:
            "Banter uses exaggeration and understatement: 'Oh, only took you an hour?' (for something quick), 'Not bad at all' (for something great).",
          examples: ['Oh, very impressive!', 'What are you like?', 'Charming as ever, I see'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Taking banter personally',
          correction: 'Recognize the affection behind teasing',
          explanation:
            'Getting offended by gentle teasing can create awkwardness. If you\'re not sure, assume good intent.',
        },
        {
          mistake: 'Being too harsh with banter',
          correction: 'Keep it light and kind',
          explanation:
            'Banter should never genuinely hurt. If you see discomfort, apologize and ease off immediately.',
        },
      ],
      successCriteria: [
        'Recognizes banter appropriately',
        'Responds to teasing good-naturedly',
        'Initiates appropriate banter',
      ],
      order: 2,
    },
    {
      id: `${MODULE}-3`,
      moduleId: MODULE,
      title: 'Understanding British Slang',
      context:
        'Decoding and appropriately using informal British vocabulary.',
      objectives: [
        'Understand common British slang terms',
        'Recognize generational and regional slang differences',
        'Use slang appropriately without over-doing it',
      ],
      practiceActivities: [
        {
          type: 'discussion',
          prompt: 'Describe your weekend using appropriate informal language',
          expectedBehaviors: ['Use casual vocabulary naturally', 'Match register to context', 'Stay authentic'],
          difficulty: 'medium',
        },
        {
          type: 'scenario',
          prompt: 'Someone uses slang you don\'t understand - work out meaning from context',
          expectedBehaviors: ['Use context clues', 'Ask if needed', 'Remember for next time'],
          difficulty: 'medium',
        },
      ],
      culturalInsights: [
        {
          topic: 'Generational Slang',
          content:
            'Slang changes fast. What\'s current for teens sounds dated to 30-year-olds. Be age-appropriate.',
          importance: 'essential',
        },
        {
          topic: 'Cockney Rhyming Slang',
          content:
            'Traditional London slang where words rhyme: "apples and pears" (stairs), "dog and bone" (phone). Mostly used ironically now.',
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Common British Slang',
          content:
            "'Chuffed' = pleased, 'knackered' = exhausted, 'gutted' = devastated, 'sorted' = arranged, 'dodgy' = suspicious.",
          examples: ["I'm absolutely chuffed", "I'm completely knackered", 'That looks a bit dodgy'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Using slang in formal contexts',
          correction: 'Match vocabulary to setting',
          explanation:
            'Saying "I\'m gutted about the financial results" in a board meeting sounds wrong. Save slang for casual contexts.',
        },
        {
          mistake: 'Using outdated slang',
          correction: 'Stay current or stick to established informal words',
          explanation:
            'Using slang that peaked years ago makes you sound out of touch. "Groovy" isn\'t coming back.',
        },
      ],
      successCriteria: [
        'Understands common slang when heard',
        'Uses slang appropriately in casual settings',
        'Avoids slang in formal contexts',
      ],
      order: 3,
    },
    {
      id: `${MODULE}-4`,
      moduleId: MODULE,
      title: 'Code-Switching Between Registers',
      context:
        'Adjusting language formality based on situation, audience, and context.',
      objectives: [
        'Recognize when to switch formality levels',
        'Transition smoothly between registers',
        'Match language to social context',
      ],
      practiceActivities: [
        {
          type: 'scenario',
          prompt: 'You\'re chatting casually with colleagues when your boss joins - adjust your register',
          expectedBehaviors: ['Notice the change', 'Shift language appropriately', 'Stay natural'],
          difficulty: 'medium',
        },
        {
          type: 'challenge',
          prompt: 'Explain the same story to a friend, then to a senior manager',
          expectedBehaviors: ['Change vocabulary', 'Adjust tone', 'Maintain core message'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'British Class and Language',
          content:
            'Register is complex in Britain due to class awareness. People often "code-switch" to fit different social contexts.',
          importance: 'essential',
        },
        {
          topic: 'Reading the Room',
          content:
            'Notice how others speak and mirror approximately. If everyone is casual, being very formal feels stiff.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Register Markers',
          content:
            "Formal: 'Perhaps we might consider...', Neutral: 'Maybe we should think about...', Casual: 'What about...?'",
          examples: ['Formal: I would suggest...', 'Neutral: I think we should...', 'Casual: Why don\'t we...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Staying too formal when others are casual',
          correction: 'Mirror the formality level around you',
          explanation:
            'Maintaining formal language when everyone else relaxes can create distance and seem unfriendly.',
        },
        {
          mistake: 'Being too casual in formal situations',
          correction: 'Err on the side of formality when unsure',
          explanation:
            'It\'s safer to be slightly too formal than too casual. You can always relax once you read the room.',
        },
      ],
      successCriteria: [
        'Reads social context accurately',
        'Switches registers smoothly',
        'Matches language to situation',
      ],
      order: 4,
    },
    {
      id: `${MODULE}-5`,
      moduleId: MODULE,
      title: 'Following Group Conversations at Natural Speed',
      context:
        'Participating in fast-paced group discussions with multiple speakers.',
      objectives: [
        'Follow rapid topic changes in group settings',
        'Find opportunities to contribute naturally',
        'Handle simultaneous conversations and interruptions',
      ],
      practiceActivities: [
        {
          type: 'challenge',
          prompt: 'Join an ongoing group conversation about a topic you weren\'t following',
          expectedBehaviors: ['Listen first', 'Ask clarifying question', 'Contribute when ready'],
          difficulty: 'hard',
        },
        {
          type: 'scenario',
          prompt: 'In a group discussion, two people speak at once - navigate the situation',
          expectedBehaviors: ['Handle overlap gracefully', 'Yield or continue appropriately', 'Maintain flow'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Turn-Taking in British English',
          content:
            'British conversation has subtle cues for turn-taking. Slight pauses, falling intonation, and eye contact signal you\'re done.',
          importance: 'essential',
        },
        {
          topic: 'Catching Up',
          content:
            "It's acceptable to ask 'Sorry, what are we talking about?' when joining a conversation mid-flow.",
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Conversation Entry Points',
          content:
            "Use: 'Sorry to interrupt, but...', 'Can I just add...', 'That reminds me...' to join conversations.",
          examples: ['Sorry, can I just...', 'That reminds me of...', 'Going back to what you said...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Interrupting mid-sentence',
          correction: 'Wait for natural pauses',
          explanation:
            'British conversation values letting others finish. Interrupting feels rude unless you have something urgent.',
        },
        {
          mistake: 'Not contributing due to speed',
          correction: 'Practice listening and jumping in at pauses',
          explanation:
            'Staying silent too long can be seen as disengagement. A simple "Mm-hmm" or "Really?" shows you\'re following.',
        },
      ],
      successCriteria: [
        'Follows rapid group conversations',
        'Contributes at appropriate moments',
        'Handles overlapping speech gracefully',
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

  console.log(`      ✅ Created ${scenarios.length} scenarios for Module 2A`);
}

