import { PrismaClient } from '@prisma/client';

const LANG = 'en-GB';
const MODULE = `${LANG}:3A`;

export async function seedScenarios3A(prisma: PrismaClient) {
  console.log('    📖 Seeding Module 3A scenarios...');

  const scenarios = [
    {
      id: `${MODULE}-1`,
      moduleId: MODULE,
      title: 'Detecting Subtext and Implicit Meaning',
      context:
        'Understanding what British people really mean when they say something different.',
      objectives: [
        'Recognize when literal meaning differs from intent',
        'Decode common British understatements',
        'Respond appropriately to subtext',
      ],
      practiceActivities: [
        {
          type: 'scenario',
          prompt: 'Someone says "That\'s quite interesting" about your proposal - interpret and respond',
          expectedBehaviors: ['Recognize possible criticism', 'Probe for real opinion', 'Adjust if needed'],
          difficulty: 'hard',
        },
        {
          type: 'challenge',
          prompt: 'Decode what someone really means when they say "We should do this again sometime"',
          expectedBehaviors: ['Gauge sincerity', 'Respond appropriately', 'Follow up or not accordingly'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'The British Translation',
          content:
            '"Quite good" = good. "Not bad" = good. "Interesting" = I disagree. "With respect" = I\'m about to tell you you\'re wrong.',
          importance: 'essential',
        },
        {
          topic: 'Why Subtext?',
          content:
            'British indirect communication avoids confrontation and preserves face. Direct criticism feels aggressive.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Subtext Markers',
          content:
            '"To be honest...", "With respect...", "I hear what you\'re saying, but..." often signal disagreement.',
          examples: ['To be honest...', 'With respect...', 'I hear what you\'re saying...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Taking everything at face value',
          correction: 'Listen for tone and context cues',
          explanation:
            'If something feels too polite, it might contain hidden criticism. Watch for pattern breaks.',
        },
        {
          mistake: 'Over-interpreting everything',
          correction: 'Most communication is straightforward',
          explanation:
            'Don\'t become paranoid. Most statements are genuine. Subtext appears in specific contexts.',
        },
      ],
      successCriteria: [
        'Recognizes common British understatements',
        'Interprets subtext appropriately',
        'Responds to real meaning, not literal',
      ],
      order: 1,
    },
    {
      id: `${MODULE}-2`,
      moduleId: MODULE,
      title: 'Using Euphemisms and Indirect Language',
      context:
        'Employing softening language for difficult, embarrassing, or sensitive topics.',
      objectives: [
        'Use euphemisms naturally for difficult topics',
        'Choose appropriate level of directness',
        'Navigate sensitive subjects with tact',
      ],
      practiceActivities: [
        {
          type: 'role-play',
          prompt: 'Tell someone their work isn\'t good enough using only indirect language',
          expectedBehaviors: ['Soften the message', 'Make point clearly enough', 'Preserve their dignity'],
          difficulty: 'hard',
        },
        {
          type: 'scenario',
          prompt: 'Discuss a redundancy situation using appropriate euphemistic language',
          expectedBehaviors: ['Use business euphemisms', 'Be clear about facts', 'Show empathy'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Death and Illness Euphemisms',
          content:
            '"Passed away", "no longer with us", "going through a difficult time" soften hard topics.',
          importance: 'essential',
        },
        {
          topic: 'Workplace Euphemisms',
          content:
            '"Let go", "made redundant", "restructuring", "streamlining" soften job losses.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Common Euphemisms',
          content:
            '"Economical with the truth" = lying. "Between jobs" = unemployed. "Character building" = difficult.',
          examples: ['Economical with the truth', 'Between jobs', 'Character building experience'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Being too blunt about sensitive topics',
          correction: 'Use softening language for difficult subjects',
          explanation:
            'Saying "He\'s dying" can be jarring. "He\'s not doing well" is gentler.',
        },
        {
          mistake: 'Using euphemisms when clarity is needed',
          correction: 'Be direct when practical information is required',
          explanation:
            'In emergencies or practical matters, clarity trumps euphemism. Balance is key.',
        },
      ],
      successCriteria: [
        'Uses euphemisms appropriately',
        'Navigates sensitive topics tactfully',
        'Balances softness with clarity',
      ],
      order: 2,
    },
    {
      id: `${MODULE}-3`,
      moduleId: MODULE,
      title: 'Understanding and Producing Sophisticated Humor',
      context:
        'Grasping complex British humor including irony, sarcasm, and wit.',
      objectives: [
        'Recognize irony and sarcasm',
        'Produce appropriate witty responses',
        'Understand British comedy conventions',
      ],
      practiceActivities: [
        {
          type: 'discussion',
          prompt: 'Respond with dry wit to a situation that has gone wrong',
          expectedBehaviors: ['Understate the problem', 'Use irony', 'Keep it light'],
          difficulty: 'hard',
        },
        {
          type: 'challenge',
          prompt: 'Make a self-deprecating joke about a mistake you made',
          expectedBehaviors: ['Acknowledge error', 'Make it funny', 'Move on gracefully'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Irony and Sarcasm',
          content:
            'British humor relies heavily on saying the opposite of what you mean with a straight face.',
          importance: 'essential',
        },
        {
          topic: 'Deadpan Delivery',
          content:
            'The funniest British humor is delivered without smiling. The joke is in the contrast.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Ironic Markers',
          content:
            '"Absolutely marvelous" (for something terrible). "How delightful" (for something awful). Tone indicates irony.',
          examples: ['How absolutely marvellous', 'What a treat', 'Thrilling stuff'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Missing irony and responding literally',
          correction: 'Listen for tone mismatches',
          explanation:
            'If someone says "Lovely weather" in pouring rain, they\'re not confused - they\'re being ironic.',
        },
        {
          mistake: 'Announcing sarcasm',
          correction: 'Let the irony speak for itself',
          explanation:
            'Saying "That was sarcasm" kills the joke. True British sarcasm leaves you wondering.',
        },
      ],
      successCriteria: [
        'Recognizes British irony and sarcasm',
        'Produces appropriate witty responses',
        'Appreciates complex British humor',
      ],
      order: 3,
    },
    {
      id: `${MODULE}-4`,
      moduleId: MODULE,
      title: 'Navigating Sensitive Topics Diplomatically',
      context:
        'Discussing controversial, personal, or difficult subjects with appropriate care.',
      objectives: [
        'Approach sensitive topics carefully',
        'Express difficult truths diplomatically',
        'Exit conversations that become uncomfortable',
      ],
      practiceActivities: [
        {
          type: 'scenario',
          prompt: 'A colleague brings up a controversial political topic - navigate the conversation',
          expectedBehaviors: ['Listen without committing', 'Offer balanced view if pressed', 'Exit gracefully if needed'],
          difficulty: 'hard',
        },
        {
          type: 'challenge',
          prompt: 'Tell someone something they don\'t want to hear using maximum diplomacy',
          expectedBehaviors: ['Prepare them', 'Deliver news gently', 'Offer support'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Topics to Avoid',
          content:
            'Money (especially salary), religion, politics, and personal appearance are traditionally sensitive.',
          importance: 'essential',
        },
        {
          topic: 'The Graceful Exit',
          content:
            '"I should probably go...", "I\'ll let you get on..." signal you want to leave a conversation.',
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Diplomatic Language',
          content:
            '"I can see where you\'re coming from...", "There\'s something to be said for that...", "That\'s a fair point..."',
          examples: ['I can see where you\'re coming from', 'There\'s something to be said for...', 'That\'s one way of looking at it'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Jumping into controversial topics',
          correction: 'Wait until you know your audience',
          explanation:
            'What\'s acceptable with close friends may offend strangers. Read the room first.',
        },
        {
          mistake: 'Getting trapped in uncomfortable conversations',
          correction: 'Have exit strategies ready',
          explanation:
            '"I should probably..." or "I\'ll leave you to it..." are valid escape routes.',
        },
      ],
      successCriteria: [
        'Approaches sensitive topics carefully',
        'Uses diplomatic language effectively',
        'Exits conversations gracefully when needed',
      ],
      order: 4,
    },
    {
      id: `${MODULE}-5`,
      moduleId: MODULE,
      title: 'Showing Native-Like Intuition for Expression',
      context:
        'Choosing the right word, phrase, or approach instinctively rather than through analysis.',
      objectives: [
        'Select expressions that feel natural',
        'Avoid word choices that sound "off"',
        'Develop native-like language instincts',
      ],
      practiceActivities: [
        {
          type: 'challenge',
          prompt: 'Given several word choices, select the most natural British option',
          expectedBehaviors: ['Trust instinct', 'Consider connotations', 'Choose natural option'],
          difficulty: 'hard',
        },
        {
          type: 'discussion',
          prompt: 'Explain why one phrasing sounds better than another',
          expectedBehaviors: ['Articulate differences', 'Note connotations', 'Explain cultural fit'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Collocations',
          content:
            'Some words "go together" in British English: "heavy rain" not "strong rain", "make a decision" not "take a decision".',
          importance: 'essential',
        },
        {
          topic: 'Register Matching',
          content:
            'Using overly formal words in casual speech sounds odd. "I\'m fatigued" vs "I\'m knackered" - context matters.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Natural Collocations',
          content:
            '"Make a mistake", "take a break", "have a go", "get the hang of" - these combinations are natural.',
          examples: ['Make a mistake', 'Take a break', 'Have a go at it', 'Get the hang of'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Direct translation from L1',
          correction: 'Think in British English patterns',
          explanation:
            'Translating word-for-word often produces unnatural-sounding sentences even if grammatically correct.',
        },
        {
          mistake: 'Using thesaurus alternatives randomly',
          correction: 'Learn words in context and collocations',
          explanation:
            '"Big problem" and "enormous problem" work, but "gigantic problem" sounds odd in most contexts.',
        },
      ],
      successCriteria: [
        'Selects natural-sounding expressions',
        'Uses appropriate collocations',
        'Shows instinctive language choices',
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

  console.log(`      ✅ Created ${scenarios.length} scenarios for Module 3A`);
}

