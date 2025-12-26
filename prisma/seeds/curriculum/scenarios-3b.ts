import { PrismaClient } from '@prisma/client';

const LANG = 'en-GB';
const MODULE = `${LANG}:3B`;

export async function seedScenarios3B(prisma: PrismaClient) {
  console.log('    📖 Seeding Module 3B scenarios...');

  const scenarios = [
    {
      id: `${MODULE}-1`,
      moduleId: MODULE,
      title: 'Engaging in Extended Intellectual Discussions',
      context:
        'Participating in hour-long discussions on complex topics with educated speakers.',
      objectives: [
        'Sustain intellectual conversation over extended periods',
        'Develop and defend complex positions',
        'Engage with others\' arguments substantively',
      ],
      practiceActivities: [
        {
          type: 'discussion',
          prompt: 'Discuss the ethics of AI with an informed conversation partner',
          expectedBehaviors: ['Present nuanced views', 'Engage with counterarguments', 'Build on discussion'],
          difficulty: 'hard',
        },
        {
          type: 'challenge',
          prompt: 'Sustain a 30-minute discussion on a philosophical question',
          expectedBehaviors: ['Maintain focus', 'Develop ideas', 'Conclude meaningfully'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Oxbridge Discussion Style',
          content:
            'British intellectual discourse often involves Socratic questioning, building on others\' points, and rigorous but polite challenge.',
          importance: 'essential',
        },
        {
          topic: 'Playing Devil\'s Advocate',
          content:
            'Arguing a position you don\'t hold to test ideas is valued. "Devil\'s advocate here, but..." is a useful phrase.',
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Academic Discussion Phrases',
          content:
            '"Building on that...", "To develop your point...", "That raises an interesting question..."',
          examples: ['Building on what you said...', 'To develop that further...', 'That raises the question of...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Treating discussions as debates to win',
          correction: 'Focus on exploring ideas together',
          explanation:
            'British intellectual discussion values collaborative exploration over competitive point-scoring.',
        },
        {
          mistake: 'Not acknowledging valid opposing points',
          correction: 'Concede good points before countering',
          explanation:
            '"That\'s a fair point, although I\'d add..." shows you\'re engaging genuinely.',
        },
      ],
      successCriteria: [
        'Sustains complex discussions',
        'Engages with ideas substantively',
        'Builds collaborative dialogue',
      ],
      order: 1,
    },
    {
      id: `${MODULE}-2`,
      moduleId: MODULE,
      title: 'Constructing Multi-Layered Arguments',
      context:
        'Building sophisticated arguments with evidence, acknowledgment of complexity, and nuanced conclusions.',
      objectives: [
        'Structure arguments with multiple supporting points',
        'Acknowledge counterarguments and limitations',
        'Draw nuanced conclusions',
      ],
      practiceActivities: [
        {
          type: 'challenge',
          prompt: 'Present a position with at least three supporting arguments and acknowledge weaknesses',
          expectedBehaviors: ['Clear structure', 'Multiple supports', 'Honest limitations'],
          difficulty: 'hard',
        },
        {
          type: 'discussion',
          prompt: 'Defend a position you personally disagree with',
          expectedBehaviors: ['Present strongest case', 'Be fair to position', 'Maintain intellectual honesty'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'British Argumentation',
          content:
            'British academic style values balanced presentation. Acknowledging the other side strengthens your position.',
          importance: 'essential',
        },
        {
          topic: 'Rhetorical Flourish',
          content:
            'Using literary references, historical parallels, and wit elevates arguments in British contexts.',
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Argument Structure Language',
          content:
            '"Firstly... Furthermore... Moreover...", "Granted, however...", "While it\'s true that..., nevertheless..."',
          examples: ['While it\'s true that...', 'Granted, X, however...', 'This notwithstanding...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Making absolute claims',
          correction: 'Qualify statements appropriately',
          explanation:
            '"This is always true" invites easy counterexample. "This is often the case" is more defensible.',
        },
        {
          mistake: 'Ignoring obvious counterarguments',
          correction: 'Address them proactively',
          explanation:
            'Preemptively addressing objections shows intellectual depth and strengthens your position.',
        },
      ],
      successCriteria: [
        'Constructs layered arguments',
        'Acknowledges complexity honestly',
        'Draws nuanced conclusions',
      ],
      order: 2,
    },
    {
      id: `${MODULE}-3`,
      moduleId: MODULE,
      title: 'Using Abstract Vocabulary with Precision',
      context:
        'Employing sophisticated academic and abstract vocabulary accurately.',
      objectives: [
        'Use abstract terms precisely',
        'Distinguish between similar concepts',
        'Employ academic vocabulary naturally',
      ],
      practiceActivities: [
        {
          type: 'discussion',
          prompt: 'Explain the difference between similar abstract concepts (e.g., ethics vs morality)',
          expectedBehaviors: ['Define precisely', 'Give examples', 'Show nuanced understanding'],
          difficulty: 'hard',
        },
        {
          type: 'challenge',
          prompt: 'Use ten abstract academic terms correctly in a natural discussion',
          expectedBehaviors: ['Use naturally', 'Define if needed', 'Apply correctly'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Academic Register',
          content:
            'British academic discourse uses precise terminology. "Systemic" differs from "systematic", "infer" from "imply".',
          importance: 'essential',
        },
        {
          topic: 'Latin and Greek Roots',
          content:
            'Many academic terms derive from Latin/Greek. Understanding roots helps decode new words.',
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Precision Words',
          content:
            '"Epistemological" vs "empirical", "ontological" vs "phenomenological" - each has specific meaning.',
          examples: ['Epistemological concerns', 'Empirical evidence', 'Phenomenological approach'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Using impressive words incorrectly',
          correction: 'Only use words you fully understand',
          explanation:
            'Misusing sophisticated vocabulary undermines credibility more than using simple words.',
        },
        {
          mistake: 'Overusing abstract jargon',
          correction: 'Mix abstract with concrete examples',
          explanation:
            'Ground abstract concepts in examples: "To illustrate what I mean by epistemic uncertainty..."',
        },
      ],
      successCriteria: [
        'Uses abstract terms precisely',
        'Distinguishes similar concepts',
        'Balances abstraction with clarity',
      ],
      order: 3,
    },
    {
      id: `${MODULE}-4`,
      moduleId: MODULE,
      title: 'Demonstrating British Rhetorical Patterns',
      context:
        'Using persuasive techniques characteristic of educated British discourse.',
      objectives: [
        'Employ British rhetorical devices',
        'Use understatement and litotes for effect',
        'Apply classical rhetorical structures',
      ],
      practiceActivities: [
        {
          type: 'challenge',
          prompt: 'Make a persuasive case using understatement rather than exaggeration',
          expectedBehaviors: ['Use litotes effectively', 'Build through suggestion', 'Let audience draw conclusions'],
          difficulty: 'hard',
        },
        {
          type: 'discussion',
          prompt: 'Use the rule of three in presenting an argument',
          expectedBehaviors: ['Three-part structure', 'Rhythmic delivery', 'Memorable conclusion'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Litotes',
          content:
            'Affirming by negating the opposite: "She\'s not unintelligent" (= she\'s very clever). Classic British understatement.',
          importance: 'essential',
        },
        {
          topic: 'The Rule of Three',
          content:
            'Three examples, three adjectives, three points - this pattern is deeply embedded in British rhetoric.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Rhetorical Devices',
          content:
            'Litotes ("not inconsiderable"), tricolon (three-part lists), anaphora (repeated phrase openings).',
          examples: ['Not inconsiderable', 'Blood, sweat, and tears', 'We shall fight...we shall fight...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Overusing rhetorical devices',
          correction: 'Use sparingly for maximum effect',
          explanation:
            'A well-placed rhetorical flourish is powerful. Constant use becomes tiresome.',
        },
        {
          mistake: 'Being too obviously persuasive',
          correction: 'British rhetoric works through suggestion',
          explanation:
            'Heavy-handed persuasion feels crude. Guiding someone to a conclusion works better.',
        },
      ],
      successCriteria: [
        'Uses British rhetorical devices effectively',
        'Employs understatement for impact',
        'Structures arguments rhetorically',
      ],
      order: 4,
    },
    {
      id: `${MODULE}-5`,
      moduleId: MODULE,
      title: 'Challenging and Defending Ideas at High Level',
      context:
        'Engaging in rigorous intellectual challenge while maintaining collegiality.',
      objectives: [
        'Challenge ideas robustly but politely',
        'Defend positions under scrutiny',
        'Maintain productive intellectual tension',
      ],
      practiceActivities: [
        {
          type: 'role-play',
          prompt: 'Challenge someone\'s position rigorously while remaining collegial',
          expectedBehaviors: ['Target ideas not person', 'Be thorough but fair', 'Acknowledge valid points'],
          difficulty: 'hard',
        },
        {
          type: 'challenge',
          prompt: 'Defend your position when challenged with strong counterarguments',
          expectedBehaviors: ['Stay calm', 'Address points directly', 'Concede if necessary'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Robust but Friendly',
          content:
            'British academic culture allows fierce intellectual challenge while maintaining personal warmth.',
          importance: 'essential',
        },
        {
          topic: 'Post-Debate Cordiality',
          content:
            'Vigorous disagreement in discussion followed by friendly drinks is normal. Ideas and persons are separate.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Challenging Language',
          content:
            '"I\'m not sure that quite follows...", "Might one argue that...", "I wonder whether..."',
          examples: ["I'm not sure that follows", 'Might one argue...', 'Could it not be the case that...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Taking intellectual challenges personally',
          correction: 'Separate ideas from identity',
          explanation:
            'Having your ideas challenged is not an attack on you. Engage with the intellectual content.',
        },
        {
          mistake: 'Being too aggressive in challenges',
          correction: 'Challenge ideas, not intelligence',
          explanation:
            '"That argument doesn\'t work because..." is fine. "How can you think that?" is not.',
        },
      ],
      successCriteria: [
        'Challenges ideas robustly but politely',
        'Defends positions calmly under pressure',
        'Maintains collegial atmosphere during debate',
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

  console.log(`      ✅ Created ${scenarios.length} scenarios for Module 3B`);
}

