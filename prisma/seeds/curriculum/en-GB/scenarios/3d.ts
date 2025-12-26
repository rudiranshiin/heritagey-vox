import { PrismaClient } from '@prisma/client';

const LANG = 'en-GB';
const MODULE = `${LANG}:3D`;

export async function seedScenarios3D(prisma: PrismaClient) {
  console.log('    📖 Seeding Module 3D scenarios...');

  const scenarios = [
    {
      id: `${MODULE}-1`,
      moduleId: MODULE,
      title: 'Communicating at Executive Level',
      context:
        'Engaging with C-suite executives and senior leadership with appropriate gravitas.',
      objectives: [
        'Communicate with appropriate executive presence',
        'Deliver strategic messages concisely',
        'Handle board-level interactions confidently',
      ],
      practiceActivities: [
        {
          type: 'role-play',
          prompt: 'Present a proposal to a company board in 5 minutes',
          expectedBehaviors: ['Executive summary approach', 'Confident delivery', 'Handle questions professionally'],
          difficulty: 'hard',
        },
        {
          type: 'scenario',
          prompt: 'Brief a CEO on a crisis situation clearly and calmly',
          expectedBehaviors: ['Lead with key facts', 'Present options', 'Recommend action'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'British Executive Style',
          content:
            'British executive communication values brevity, understatement, and substance over style.',
          importance: 'essential',
        },
        {
          topic: 'Boardroom Etiquette',
          content:
            'Know your role in the hierarchy. Contribute when appropriate. Listen more than you speak initially.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Executive Communication',
          content:
            '"The key issue is...", "My recommendation would be...", "The bottom line is..." - direct but not blunt.',
          examples: ['The key issue is...', 'My recommendation would be...', 'In summary...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Being too verbose with executives',
          correction: 'Get to the point quickly',
          explanation:
            'Executives value time. Lead with conclusions, provide detail only if asked.',
        },
        {
          mistake: 'Being overly deferential',
          correction: 'Be respectful but confident',
          explanation:
            'Excessive deference signals lack of confidence. Present your expertise clearly.',
        },
      ],
      successCriteria: [
        'Communicates with executive presence',
        'Delivers concise, strategic messages',
        'Handles senior interactions confidently',
      ],
      order: 1,
    },
    {
      id: `${MODULE}-2`,
      moduleId: MODULE,
      title: 'Handling High-Stakes Presentations',
      context:
        'Delivering important presentations where significant outcomes depend on performance.',
      objectives: [
        'Prepare and deliver high-stakes presentations',
        'Handle challenging questions under pressure',
        'Recover from mistakes or technical issues',
      ],
      practiceActivities: [
        {
          type: 'challenge',
          prompt: 'Deliver a presentation knowing major decisions rest on your performance',
          expectedBehaviors: ['Confident opening', 'Clear structure', 'Strong conclusion'],
          difficulty: 'hard',
        },
        {
          type: 'scenario',
          prompt: 'Your presentation technology fails - continue without slides',
          expectedBehaviors: ['Stay calm', 'Adapt content', 'Maintain confidence'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'British Presentation Style',
          content:
            'Less dramatic than American style. Understated confidence works better than aggressive enthusiasm.',
          importance: 'essential',
        },
        {
          topic: 'Handling Nerves',
          content:
            'Slight nervousness is acceptable and even endearing. Obvious panic is not. Practice managing visible anxiety.',
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Presentation Language',
          content:
            '"I\'d like to take you through...", "The key takeaway is...", "To summarize the implications..."',
          examples: ["I'd like to take you through...", 'The key takeaway...', 'To summarize...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Reading from slides or notes',
          correction: 'Know material well enough to speak naturally',
          explanation:
            'Reading suggests lack of mastery. Slides should prompt, not script.',
        },
        {
          mistake: 'Rushing due to nerves',
          correction: 'Practice pacing and use deliberate pauses',
          explanation:
            'Nerves speed up speech. Conscious slowing and pausing helps both you and audience.',
        },
      ],
      successCriteria: [
        'Delivers high-stakes presentations confidently',
        'Handles pressure professionally',
        'Recovers gracefully from problems',
      ],
      order: 2,
    },
    {
      id: `${MODULE}-3`,
      moduleId: MODULE,
      title: 'Mastering Professional Negotiations',
      context:
        'Negotiating contracts, terms, and agreements in British professional contexts.',
      objectives: [
        'Negotiate effectively in British business culture',
        'Balance firmness with relationship preservation',
        'Reach mutually beneficial agreements',
      ],
      practiceActivities: [
        {
          type: 'role-play',
          prompt: 'Negotiate contract terms with a client who has different priorities',
          expectedBehaviors: ['Understand their position', 'Present your case', 'Find common ground'],
          difficulty: 'hard',
        },
        {
          type: 'challenge',
          prompt: 'Decline terms that don\'t work while keeping the relationship intact',
          expectedBehaviors: ['Be clear about limits', 'Stay positive', 'Offer alternatives'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'British Negotiation Style',
          content:
            'British negotiations value fairness, reasonable compromise, and long-term relationships over short-term wins.',
          importance: 'essential',
        },
        {
          topic: 'The Gentleman\'s Agreement',
          content:
            'Handshake deals still carry weight in British business. Reputation for fairness matters long-term.',
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Negotiation Language',
          content:
            '"I appreciate your position, however...", "Perhaps we could consider...", "Would it be possible to..."',
          examples: ['I appreciate your position...', 'Perhaps we could consider...', 'Would it be possible...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Being too aggressive in negotiation',
          correction: 'Firm but fair is the British way',
          explanation:
            'Aggressive tactics damage relationships. British business values long-term partnerships.',
        },
        {
          mistake: 'Conceding too quickly',
          correction: 'Negotiate progressively',
          explanation:
            'Immediate concession signals either weakness or original overpricing. Negotiate in stages.',
        },
      ],
      successCriteria: [
        'Negotiates effectively in British contexts',
        'Balances firmness with relationship care',
        'Achieves fair outcomes',
      ],
      order: 3,
    },
    {
      id: `${MODULE}-4`,
      moduleId: MODULE,
      title: 'Using Industry-Specific Vocabulary',
      context:
        'Deploying specialized professional terminology with native-like precision.',
      objectives: [
        'Use industry terminology correctly',
        'Understand sector-specific jargon',
        'Communicate with specialists in their language',
      ],
      practiceActivities: [
        {
          type: 'discussion',
          prompt: 'Discuss your industry using appropriate technical terminology',
          expectedBehaviors: ['Use terms precisely', 'Explain when needed', 'Engage with specialists'],
          difficulty: 'hard',
        },
        {
          type: 'scenario',
          prompt: 'Translate technical concepts for non-specialist audience',
          expectedBehaviors: ['Simplify appropriately', 'Maintain accuracy', 'Check understanding'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Jargon Levels',
          content:
            'Match technical level to audience. Using jargon with generalists is exclusionary; avoiding it with specialists is amateurish.',
          importance: 'essential',
        },
        {
          topic: 'British Business Jargon',
          content:
            'British business has its own jargon: "touch base", "take offline", "going forward" are common but often mocked.',
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Technical Communication',
          content:
            'Define terms on first use if audience may not know them. "ROI, or return on investment..." helps clarity.',
          examples: ['ROI - return on investment', 'KPIs - key performance indicators', 'Due diligence - thorough investigation'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Using jargon to impress rather than communicate',
          correction: 'Jargon should clarify, not obscure',
          explanation:
            'Using technical terms incorrectly undermines credibility more than using simple language.',
        },
        {
          mistake: 'Assuming everyone knows technical terms',
          correction: 'Read your audience and explain when needed',
          explanation:
            'Brief clarification ("that\'s the technical term for...") includes everyone without condescending.',
        },
      ],
      successCriteria: [
        'Uses industry terminology correctly',
        'Adapts language to audience expertise',
        'Communicates technical concepts clearly',
      ],
      order: 4,
    },
    {
      id: `${MODULE}-5`,
      moduleId: MODULE,
      title: 'Demonstrating Strategic Communication',
      context:
        'Communicating with strategic intent and organizational awareness.',
      objectives: [
        'Align communication with strategic objectives',
        'Navigate organizational politics through language',
        'Influence through sophisticated communication',
      ],
      practiceActivities: [
        {
          type: 'challenge',
          prompt: 'Frame the same message for different organizational stakeholders',
          expectedBehaviors: ['Adjust framing for audience', 'Maintain core message', 'Address different concerns'],
          difficulty: 'hard',
        },
        {
          type: 'scenario',
          prompt: 'Communicate an unpopular decision while maintaining support',
          expectedBehaviors: ['Acknowledge concerns', 'Explain reasoning', 'Focus on path forward'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Strategic Messaging',
          content:
            'British business communication often involves careful stakeholder management and message positioning.',
          importance: 'essential',
        },
        {
          topic: 'Reading Political Context',
          content:
            'Understanding who influences whom, and what concerns different parties have, shapes effective communication.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Strategic Framing',
          content:
            '"In light of our strategic priorities...", "Considering stakeholder interests...", "With the long-term view in mind..."',
          examples: ['In light of our strategic priorities...', 'Considering all stakeholders...', 'With the long-term view...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Being too transparent about strategic maneuvering',
          correction: 'Strategy should be invisible in the communication',
          explanation:
            'Obvious manipulation backfires. Strategic communication should feel natural and genuine.',
        },
        {
          mistake: 'Ignoring political context',
          correction: 'Understand the landscape before communicating',
          explanation:
            'Messages that work in one context may fail in another. Know your environment.',
        },
      ],
      successCriteria: [
        'Communicates with strategic awareness',
        'Navigates organizational politics effectively',
        'Influences through sophisticated messaging',
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

  console.log(`      ✅ Created ${scenarios.length} scenarios for Module 3D`);
}

