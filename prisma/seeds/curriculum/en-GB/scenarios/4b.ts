import { PrismaClient } from '@prisma/client';

const LANG = 'en-GB';
const MODULE = `${LANG}:4B`;

export async function seedScenarios4B(prisma: PrismaClient) {
  console.log('    📖 Seeding Module 4B scenarios...');

  const scenarios = [
    {
      id: `${MODULE}-1`,
      moduleId: MODULE,
      title: 'Mastering All Registers Completely',
      context:
        'Moving seamlessly between any register from street slang to highest formal English.',
      objectives: [
        'Command all registers fluently',
        'Switch registers seamlessly as needed',
        'Produce appropriate language for any context',
      ],
      practiceActivities: [
        {
          type: 'challenge',
          prompt: 'Express the same idea in five different registers from very casual to very formal',
          expectedBehaviors: ['Accurate register shifts', 'Appropriate vocabulary', 'Natural expression'],
          difficulty: 'hard',
        },
        {
          type: 'scenario',
          prompt: 'Navigate a situation requiring rapid register switching',
          expectedBehaviors: ['Read context instantly', 'Switch smoothly', 'Maintain content'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Register Spectrum',
          content:
            'From "Mate, what\'s occurring?" to "I wonder whether you might advise..." - the full spectrum exists within one speaker.',
          importance: 'essential',
        },
        {
          topic: 'Code-Switching Mastery',
          content:
            'Fluid register movement marks truly proficient speakers. It should be unconscious and immediate.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Register Markers Across Spectrum',
          content:
            'Casual: "dunno, gonna, ain\'t", Neutral: "I don\'t know, going to", Formal: "I am uncertain, intending to".',
          examples: ['Casual: Yeah, cheers mate', 'Neutral: Yes, thank you', 'Formal: Indeed, I am most grateful'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Register stuck in one mode',
          correction: 'Develop fluency across the spectrum',
          explanation:
            'Being only formal or only casual limits effectiveness. Full range is the goal.',
        },
        {
          mistake: 'Awkward register transitions',
          correction: 'Practice smooth shifts',
          explanation:
            'Clunky movement between registers sounds unnatural. Transitions should be seamless.',
        },
      ],
      successCriteria: [
        'Commands all registers fluently',
        'Switches seamlessly between registers',
        'Matches register to context perfectly',
      ],
      order: 1,
    },
    {
      id: `${MODULE}-2`,
      moduleId: MODULE,
      title: 'Understanding Historical British English',
      context:
        'Comprehending older forms of British English in literature, documents, and cultural references.',
      objectives: [
        'Understand historical British English texts',
        'Recognize archaic vocabulary and grammar',
        'Appreciate historical context of language',
      ],
      practiceActivities: [
        {
          type: 'challenge',
          prompt: 'Read and discuss a Victorian-era text understanding its language and context',
          expectedBehaviors: ['Comprehend archaic forms', 'Understand historical context', 'Appreciate style'],
          difficulty: 'hard',
        },
        {
          type: 'discussion',
          prompt: 'Compare historical British English to modern usage',
          expectedBehaviors: ['Identify changes', 'Understand evolution', 'Show awareness'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Literary Heritage',
          content:
            'Shakespeare, Austen, Dickens, and other historical writers are still referenced. Basic familiarity is cultural literacy.',
          importance: 'essential',
        },
        {
          topic: 'Formal Documents',
          content:
            'Legal and ceremonial language often retains archaic forms. "Hereby", "whereas", "notwithstanding" are still used.',
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Archaic Forms',
          content:
            '"Thou/thee" (old singular you), "hath" (has), "whilst" (still used in British English), "ere" (before).',
          examples: ['Hast thou seen...', 'She hath gone', 'Ere the dawn'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Using archaic forms in modern speech',
          correction: 'Understand but don\'t use except humorously',
          explanation:
            'Using "thee" and "thou" seriously sounds ridiculous. Understand for reading, not speaking.',
        },
        {
          mistake: 'Ignoring historical language entirely',
          correction: 'Basic historical literacy is expected',
          explanation:
            'Educated British people can engage with historical texts. This is part of cultural literacy.',
        },
      ],
      successCriteria: [
        'Understands historical British English',
        'Recognizes archaic forms in context',
        'Appreciates language evolution',
      ],
      order: 2,
    },
    {
      id: `${MODULE}-3`,
      moduleId: MODULE,
      title: 'Achieving Professional Specialization',
      context:
        'Operating at expert level in a specific professional or academic field.',
      objectives: [
        'Function at expert level in specialized field',
        'Communicate with specialists as peer',
        'Produce field-specific content at professional level',
      ],
      practiceActivities: [
        {
          type: 'challenge',
          prompt: 'Engage in expert-level discussion in your professional field',
          expectedBehaviors: ['Use terminology precisely', 'Engage as peer', 'Contribute insights'],
          difficulty: 'hard',
        },
        {
          type: 'scenario',
          prompt: 'Write a professional document in your field at publication quality',
          expectedBehaviors: ['Field-appropriate conventions', 'Expert-level content', 'Professional quality'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'British Professional Conventions',
          content:
            'Each field has its own conventions in British contexts. Academic, legal, medical, business - all differ.',
          importance: 'essential',
        },
        {
          topic: 'Peer Recognition',
          content:
            'Being accepted as a peer in professional settings requires field-specific language mastery.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Field-Specific Language',
          content:
            'Each field has conventions: medical "present tense" case reports, legal "shall" for obligations, academic hedging.',
          examples: ['Medical: Patient presents with...', 'Legal: The party shall...', 'Academic: This suggests that...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Using general language in specialized contexts',
          correction: 'Learn field-specific conventions',
          explanation:
            'Professional fields have their own languages. Mastering these signals expertise.',
        },
        {
          mistake: 'Over-generalizing from one field',
          correction: 'Each field is different',
          explanation:
            'Academic writing conventions don\'t transfer to business writing. Learn each field.',
        },
      ],
      successCriteria: [
        'Operates at expert level in field',
        'Communicates as professional peer',
        'Produces specialized content professionally',
      ],
      order: 3,
    },
    {
      id: `${MODULE}-4`,
      moduleId: MODULE,
      title: 'Commanding Regional British Varieties',
      context:
        'Understanding and appreciating the full diversity of British regional Englishes.',
      objectives: [
        'Understand multiple British regional varieties',
        'Appreciate regional linguistic heritage',
        'Communicate effectively with all British speakers',
      ],
      practiceActivities: [
        {
          type: 'challenge',
          prompt: 'Understand and discuss content in various British regional accents and dialects',
          expectedBehaviors: ['Comprehend varied accents', 'Appreciate differences', 'Respond appropriately'],
          difficulty: 'hard',
        },
        {
          type: 'discussion',
          prompt: 'Discuss regional variation in British English with knowledge and appreciation',
          expectedBehaviors: ['Show awareness', 'Avoid stereotypes', 'Demonstrate knowledge'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Regional Pride',
          content:
            'Regional accents carry identity. Scots, Welsh, Northern English, and other varieties are points of pride.',
          importance: 'essential',
        },
        {
          topic: 'Mutual Intelligibility',
          content:
            'All British English varieties are mutually intelligible with effort. Comprehension is a skill to develop.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Regional Grammar Variations',
          content:
            'Scots "dinny" (don\'t), Northern "nowt" (nothing), West Country "be" for "is" - regional grammar exists.',
          examples: ['Scots: dinny ken (don\'t know)', 'Northern: nowt wrong', 'Yorkshire: been there before'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Treating regional varieties as incorrect',
          correction: 'All varieties are valid linguistic systems',
          explanation:
            'Regional dialects are not "bad English". They are different but equally valid systems.',
        },
        {
          mistake: 'Unable to understand regional accents',
          correction: 'Develop comprehension through exposure',
          explanation:
            'Exposure builds comprehension. Listen to varied British media to develop this skill.',
        },
      ],
      successCriteria: [
        'Understands regional varieties',
        'Appreciates linguistic diversity',
        'Communicates across regional differences',
      ],
      order: 4,
    },
    {
      id: `${MODULE}-5`,
      moduleId: MODULE,
      title: 'Teaching British English to Others',
      context:
        'Explaining British English rules, patterns, and culture to learners.',
      objectives: [
        'Explain British English accurately to learners',
        'Answer questions about English usage',
        'Help others navigate British culture linguistically',
      ],
      practiceActivities: [
        {
          type: 'challenge',
          prompt: 'Explain a complex grammatical point to a learner clearly',
          expectedBehaviors: ['Accurate explanation', 'Clear examples', 'Check understanding'],
          difficulty: 'hard',
        },
        {
          type: 'scenario',
          prompt: 'Help someone understand why a cultural-linguistic situation occurred',
          expectedBehaviors: ['Explain cultural context', 'Clarify language use', 'Build understanding'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Metalinguistic Awareness',
          content:
            'Being able to explain language requires thinking about how it works, not just using it.',
          importance: 'essential',
        },
        {
          topic: 'Cultural Translation',
          content:
            'Explaining why British people communicate as they do requires cultural insight.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Explaining Grammar',
          content:
            'Know terminology: subject, object, tense, aspect, mood, etc. Be able to explain why things are said.',
          examples: ['The present perfect is used for...', 'We use "would" here because...', 'British English prefers...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Not being able to explain intuitive knowledge',
          correction: 'Develop metalinguistic awareness',
          explanation:
            'Knowing how to use language isn\'t the same as knowing why. Both are needed to teach.',
        },
        {
          mistake: 'Over-complicating explanations',
          correction: 'Clear and simple first, then add complexity',
          explanation:
            'Good explanations are appropriate to learner level. Don\'t overwhelm with detail.',
        },
      ],
      successCriteria: [
        'Explains English accurately and clearly',
        'Answers questions helpfully',
        'Bridges cultural understanding',
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

  console.log(`      ✅ Created ${scenarios.length} scenarios for Module 4B`);
}

