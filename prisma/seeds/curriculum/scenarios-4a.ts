import { PrismaClient } from '@prisma/client';

const LANG = 'en-GB';
const MODULE = `${LANG}:4A`;

export async function seedScenarios4A(prisma: PrismaClient) {
  console.log('    📖 Seeding Module 4A scenarios...');

  const scenarios = [
    {
      id: `${MODULE}-1`,
      moduleId: MODULE,
      title: 'Creating Original Humor',
      context:
        'Producing humor that is original, culturally appropriate, and genuinely funny to British audiences.',
      objectives: [
        'Create original jokes and witty observations',
        'Tailor humor to audience and context',
        'Demonstrate British comedic sensibilities',
      ],
      practiceActivities: [
        {
          type: 'challenge',
          prompt: 'Make an original humorous observation about a situation',
          expectedBehaviors: ['Original insight', 'British tone', 'Land the joke'],
          difficulty: 'hard',
        },
        {
          type: 'discussion',
          prompt: 'Engage in extended comedic back-and-forth with a conversation partner',
          expectedBehaviors: ['Build on their humor', 'Contribute original lines', 'Maintain flow'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'British Comedy DNA',
          content:
            'Understatement, irony, wordplay, and self-deprecation are the building blocks of British humor.',
          importance: 'essential',
        },
        {
          topic: 'Observational Comedy',
          content:
            'British humor often finds absurdity in the ordinary. Noticing oddities of everyday life is a core skill.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Comedic Timing',
          content:
            'The pause before the punchline, the throwaway delivery, the callback - these are technical skills.',
          examples: ['The pause before revealing', 'Deadpan delivery', 'The callback reference'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Trying too hard to be funny',
          correction: 'Let humor arise naturally',
          explanation:
            'Forced jokes fall flat. The best British humor seems effortless and almost accidental.',
        },
        {
          mistake: 'Humor that punches down',
          correction: 'Target absurdity, not people',
          explanation:
            'Modern British humor mocks situations and ideas, not marginalized groups.',
        },
      ],
      successCriteria: [
        'Creates original, contextual humor',
        'Demonstrates British comedic style',
        'Reads audience reactions accurately',
      ],
      order: 1,
    },
    {
      id: `${MODULE}-2`,
      moduleId: MODULE,
      title: 'Linguistic Playfulness and Wordplay',
      context:
        'Playing with language creatively through puns, double meanings, and linguistic creativity.',
      objectives: [
        'Create puns and wordplay naturally',
        'Recognize and respond to others\' wordplay',
        'Use language creatively in conversation',
      ],
      practiceActivities: [
        {
          type: 'challenge',
          prompt: 'Create a pun or play on words in natural conversation',
          expectedBehaviors: ['Spot opportunity', 'Execute wordplay', 'Don\'t over-explain'],
          difficulty: 'hard',
        },
        {
          type: 'discussion',
          prompt: 'Engage in a conversation featuring creative language use',
          expectedBehaviors: ['Use metaphor creatively', 'Play with language', 'Be inventive'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Punning Culture',
          content:
            'British love of puns is well-documented. A good pun receives groans, which are actually appreciation.',
          importance: 'essential',
        },
        {
          topic: 'Double Entendre',
          content:
            'British humor frequently uses innocent-seeming phrases with secondary meanings. Carry On films pioneered this.',
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Wordplay Techniques',
          content:
            'Homophones (bear/bare), semantic ambiguity (bank), portmanteau (breakfast+lunch=brunch), and spoonerisms.',
          examples: ['Time flies like an arrow; fruit flies like a banana', 'I used to be a banker, but I lost interest'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Explaining puns after delivery',
          correction: 'Let wordplay land on its own',
          explanation:
            'Explaining a pun kills it. If it didn\'t land, move on. The groan is the reward.',
        },
        {
          mistake: 'Forcing wordplay when there\'s no opportunity',
          correction: 'Wait for natural openings',
          explanation:
            'Good wordplay seems spontaneous. Stretching for a pun that doesn\'t fit sounds awkward.',
        },
      ],
      successCriteria: [
        'Creates natural wordplay',
        'Recognizes others\' linguistic creativity',
        'Uses language playfully',
      ],
      order: 2,
    },
    {
      id: `${MODULE}-3`,
      moduleId: MODULE,
      title: 'Breaking Rules Creatively',
      context:
        'Knowing grammar and conventions well enough to break them for effect.',
      objectives: [
        'Break language rules intentionally for effect',
        'Know when rule-breaking works',
        'Use non-standard language strategically',
      ],
      practiceActivities: [
        {
          type: 'challenge',
          prompt: 'Use a grammatical "error" for deliberate effect',
          expectedBehaviors: ['Know the rule', 'Break it intentionally', 'Create intended effect'],
          difficulty: 'hard',
        },
        {
          type: 'discussion',
          prompt: 'Use informal or non-standard language in a context where it adds to communication',
          expectedBehaviors: ['Choose strategically', 'Enhance rather than detract', 'Show control'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Intentional Errors',
          content:
            'Native speakers break rules constantly for effect. "That is so not what I meant" is grammatically wrong but communicatively effective.',
          importance: 'essential',
        },
        {
          topic: 'Register Mixing',
          content:
            'Mixing formal and informal registers can create humor or emphasis. "The conference was, frankly, rubbish."',
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Deliberate Deviation',
          content:
            'Starting sentences with "And" or "But", split infinitives, sentence fragments - all used by native speakers for effect.',
          examples: ['But that\'s not the point.', 'To boldly go', 'Absolutely not.'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Breaking rules accidentally rather than intentionally',
          correction: 'Know the rule before breaking it',
          explanation:
            'Intentional rule-breaking shows mastery. Accidental errors just show lack of knowledge.',
        },
        {
          mistake: 'Breaking rules in contexts where correctness matters',
          correction: 'Know when formality requires standard language',
          explanation:
            'Creative rule-breaking in academic writing or formal documents is inappropriate.',
        },
      ],
      successCriteria: [
        'Breaks rules intentionally for effect',
        'Demonstrates knowledge of rules being broken',
        'Creates intended communicative effect',
      ],
      order: 3,
    },
    {
      id: `${MODULE}-4`,
      moduleId: MODULE,
      title: 'Producing Creative Written Work',
      context:
        'Writing creatively at a level comparable to educated native speakers.',
      objectives: [
        'Write creatively with native-like quality',
        'Develop personal voice in writing',
        'Produce varied styles of creative work',
      ],
      practiceActivities: [
        {
          type: 'challenge',
          prompt: 'Write a short creative piece (story, poem, or essay) in British English',
          expectedBehaviors: ['Show voice', 'Use language creatively', 'Engage reader'],
          difficulty: 'hard',
        },
        {
          type: 'scenario',
          prompt: 'Write a humorous piece that British readers would find genuinely funny',
          expectedBehaviors: ['British sensibility', 'Original humor', 'Skilled execution'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'British Literary Voice',
          content:
            'British writing often features irony, understatement, and attention to class and social nuance.',
          importance: 'essential',
        },
        {
          topic: 'Personal Voice',
          content:
            'Developing a distinctive voice is valued. Imitation of others is a learning stage to move beyond.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Creative Writing Elements',
          content:
            'Varied sentence length, strategic punctuation, careful word choice, rhythm and flow.',
          examples: ['Short. Punchy. Effective.', 'The long, winding sentence that builds and builds before finally...', 'Juxtaposition'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Over-writing with excessive description',
          correction: 'British style often favors precision over abundance',
          explanation:
            'One perfect word beats three adequate ones. British writing values economy.',
        },
        {
          mistake: 'Imitating without developing own voice',
          correction: 'Learn from influences but develop personal style',
          explanation:
            'Influence is inevitable and positive, but your writing should eventually sound like you.',
        },
      ],
      successCriteria: [
        'Writes creatively at native level',
        'Shows distinctive personal voice',
        'Produces engaging creative work',
      ],
      order: 4,
    },
    {
      id: `${MODULE}-5`,
      moduleId: MODULE,
      title: 'Contributing to Language Community',
      context:
        'Actively participating in and contributing to British English language communities.',
      objectives: [
        'Contribute meaningfully to language discussions',
        'Create content for British English speakers',
        'Engage with language evolution and trends',
      ],
      practiceActivities: [
        {
          type: 'challenge',
          prompt: 'Create content (article, review, or commentary) for a British audience',
          expectedBehaviors: ['Appropriate tone', 'Cultural relevance', 'Engaging content'],
          difficulty: 'hard',
        },
        {
          type: 'discussion',
          prompt: 'Discuss language evolution and your perspective on it',
          expectedBehaviors: ['Informed opinions', 'Nuanced views', 'Engage with others\' perspectives'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Language Debates',
          content:
            'British English has ongoing debates: prescriptivism vs descriptivism, Americanization, new words. These are cultural topics.',
          importance: 'essential',
        },
        {
          topic: 'Content Creation',
          content:
            'Writing for British audiences requires understanding their references, humor, and expectations.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Language Commentary',
          content:
            'Discussing language itself: "The use of \'literally\' has evolved...", "There\'s a trend towards..."',
          examples: ['The use of X has evolved', 'There\'s an interesting trend', 'Language change is natural'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Being prescriptivist without nuance',
          correction: 'Understand language evolves',
          explanation:
            'Complaining about all language change seems outdated. Thoughtful perspectives are more valued.',
        },
        {
          mistake: 'Not engaging with British content sphere',
          correction: 'Consume and contribute to British media',
          explanation:
            'Understanding what British people read, watch, and discuss keeps your English current.',
        },
      ],
      successCriteria: [
        'Creates content for British audiences',
        'Engages with language discussions',
        'Contributes to English language community',
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

  console.log(`      ✅ Created ${scenarios.length} scenarios for Module 4A`);
}

