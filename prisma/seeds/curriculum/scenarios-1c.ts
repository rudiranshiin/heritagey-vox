import { PrismaClient } from '@prisma/client';

const LANG = 'en-GB';
const MODULE = `${LANG}:1C`;

export async function seedScenarios1C(prisma: PrismaClient) {
  console.log('    📖 Seeding Module 1C scenarios...');

  const scenarios = [
    {
      id: `${MODULE}-1`,
      moduleId: MODULE,
      title: 'Renting Accommodation',
      context:
        'Finding and securing rental property. Communicating with landlords and estate agents.',
      objectives: [
        'View properties and ask relevant questions',
        'Negotiate terms and understand contracts',
        'Communicate issues to landlords',
      ],
      practiceActivities: [
        {
          type: 'role-play',
          prompt: 'Call an estate agent to arrange a viewing of a flat',
          expectedBehaviors: ['Polite introduction', 'Ask about availability', 'Confirm details'],
          difficulty: 'easy',
        },
        {
          type: 'scenario',
          prompt: 'During a viewing, ask important questions about the property',
          expectedBehaviors: ['Ask about bills', 'Check contract terms', 'Inquire about area'],
          difficulty: 'medium',
        },
        {
          type: 'challenge',
          prompt: 'The boiler has broken - contact your landlord to report the issue',
          expectedBehaviors: ['Describe problem clearly', 'Be polite but firm', 'Request timeline'],
          difficulty: 'medium',
        },
      ],
      culturalInsights: [
        {
          topic: 'Estate Agents',
          content:
            'Estate agents are common in Britain. They handle viewings and act as intermediaries between tenants and landlords.',
          importance: 'essential',
        },
        {
          topic: 'Deposits and Contracts',
          content:
            'Deposits must be protected in government schemes. ASTs (Assured Shorthold Tenancies) are standard 6-12 month contracts.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Formal Inquiry Language',
          content:
            "Use formal language with agents: 'I'd like to enquire about...', 'Would it be possible to view...?'",
          examples: ["I'm interested in the property on...", 'Could you tell me about...', 'Would it be possible to...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Not understanding British property terms',
          correction: 'Learn key terms: flat, bedsit, council tax, bills included',
          explanation:
            "'Flat' = apartment, 'bedsit' = studio, 'council tax' = local property tax, 'bills' = utilities.",
        },
        {
          mistake: 'Being too passive about issues',
          correction: 'Be politely persistent about repairs',
          explanation:
            "Landlords have legal obligations. It's appropriate to follow up: 'Just checking on the repair...'",
        },
      ],
      successCriteria: [
        'Arranges viewings professionally',
        'Asks relevant questions about property',
        'Reports issues clearly and politely',
      ],
      order: 1,
    },
    {
      id: `${MODULE}-2`,
      moduleId: MODULE,
      title: 'Banking and Financial Matters',
      context:
        'Opening accounts, managing banking relationships, and handling financial conversations.',
      objectives: [
        'Open a bank account and understand options',
        'Discuss account features and fees',
        'Handle problems with accounts or cards',
      ],
      practiceActivities: [
        {
          type: 'role-play',
          prompt: 'Visit a bank branch to open a current account',
          expectedBehaviors: ['Explain your needs', 'Ask about requirements', 'Provide documentation'],
          difficulty: 'medium',
        },
        {
          type: 'scenario',
          prompt: 'Your card has been declined - call the bank to investigate',
          expectedBehaviors: ['Verify identity', 'Explain situation', 'Resolve issue'],
          difficulty: 'medium',
        },
      ],
      culturalInsights: [
        {
          topic: 'British Banking Terms',
          content:
            "Current account = checking account, sort code = routing number, standing order = recurring payment, direct debit = automatic payment.",
          importance: 'essential',
        },
        {
          topic: 'Cash vs Card',
          content:
            "Britain is increasingly cashless. Contactless payment is everywhere, and many places don't accept cash at all.",
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Formal Financial Language',
          content:
            "Use formal register: 'I wish to open an account', 'Could you explain the terms?', 'I'd like to make a complaint.'",
          examples: ['I wish to enquire about...', 'Could you clarify...', 'I\'d like to report...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Not having proof of address ready',
          correction: 'Bring utility bills or bank statements from home',
          explanation:
            'UK banks require proof of UK address. Council tax bills, utility bills, or employer letters work.',
        },
        {
          mistake: 'Saying "check" instead of "cheque"',
          correction: 'Use British spelling in financial contexts',
          explanation:
            'While spoken it sounds the same, be aware of the spelling difference in written communication.',
        },
      ],
      successCriteria: [
        'Opens accounts with correct documentation',
        'Uses appropriate banking terminology',
        'Resolves account issues effectively',
      ],
      order: 2,
    },
    {
      id: `${MODULE}-3`,
      moduleId: MODULE,
      title: 'Registering with a GP and Healthcare',
      context:
        'Navigating the NHS system. Registering with a GP, booking appointments, and discussing health issues.',
      objectives: [
        'Register with a local GP practice',
        'Book and attend medical appointments',
        'Describe symptoms and understand advice',
      ],
      practiceActivities: [
        {
          type: 'role-play',
          prompt: 'Call a GP surgery to register as a new patient',
          expectedBehaviors: ['Explain you want to register', 'Ask about process', 'Arrange appointment'],
          difficulty: 'easy',
        },
        {
          type: 'scenario',
          prompt: 'Describe your symptoms to a doctor during an appointment',
          expectedBehaviors: ['Describe symptoms clearly', 'Answer questions', 'Ask about treatment'],
          difficulty: 'medium',
        },
        {
          type: 'challenge',
          prompt: "You're unsure if your condition is urgent - call 111 for advice",
          expectedBehaviors: ['Explain situation', 'Answer triage questions', 'Follow advice given'],
          difficulty: 'medium',
        },
      ],
      culturalInsights: [
        {
          topic: 'The NHS',
          content:
            'The National Health Service provides free healthcare at point of use. GP = General Practitioner (family doctor). A&E = Accident & Emergency.',
          importance: 'essential',
        },
        {
          topic: 'NHS 111',
          content:
            "Call 111 for non-emergency medical advice. It's free and available 24/7. They'll direct you to the right service.",
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Describing Symptoms',
          content:
            "Use present perfect for ongoing symptoms: 'I've been feeling unwell for two days', 'I've had a headache since yesterday.'",
          examples: ["I've been having...", "It's been hurting since...", 'I noticed it started...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Going to A&E for non-emergencies',
          correction: 'Use GP, walk-in centres, or 111 for non-urgent issues',
          explanation:
            "A&E is for life-threatening emergencies. GPs handle most issues. This is a cultural norm, not just preference.",
        },
        {
          mistake: 'Expecting immediate specialist referrals',
          correction: 'GPs are gatekeepers to specialist care',
          explanation:
            'Unlike some countries, you usually need a GP referral to see a specialist. This is the NHS system.',
        },
      ],
      successCriteria: [
        'Registers with GP practice correctly',
        'Describes symptoms clearly',
        'Navigates NHS system appropriately',
      ],
      order: 3,
    },
    {
      id: `${MODULE}-4`,
      moduleId: MODULE,
      title: 'Dealing with Utilities and Council Services',
      context:
        'Setting up and managing utilities. Interacting with local council services.',
      objectives: [
        'Set up utilities (gas, electricity, internet)',
        'Understand and pay council tax',
        'Request council services appropriately',
      ],
      practiceActivities: [
        {
          type: 'role-play',
          prompt: 'Call to set up an internet connection at your new flat',
          expectedBehaviors: ['Explain needs', 'Compare packages', 'Arrange installation'],
          difficulty: 'easy',
        },
        {
          type: 'scenario',
          prompt: 'Your bins haven\'t been collected - report to the council',
          expectedBehaviors: ['Find correct channel', 'Report issue', 'Get resolution timeline'],
          difficulty: 'medium',
        },
      ],
      culturalInsights: [
        {
          topic: 'Council Tax',
          content:
            'Council tax funds local services (bins, roads, libraries). Students get exemptions. Most people pay monthly.',
          importance: 'essential',
        },
        {
          topic: 'Utility Switching',
          content:
            "Unlike some countries, you can choose your energy supplier. Comparison sites like Uswitch help find deals.",
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Formal Complaint Language',
          content:
            "Use formal register: 'I wish to report...', 'I would like to make a formal complaint about...'",
          examples: ['I wish to report an issue with...', 'Could you investigate...', 'When can I expect...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Ignoring council tax bills',
          correction: 'Council tax is legally required - ignoring leads to court action',
          explanation:
            'This is a serious legal obligation. Set up a payment plan immediately if you have difficulty paying.',
        },
        {
          mistake: 'Not taking meter readings when moving',
          correction: 'Take photos of all meters on moving day',
          explanation:
            'This proves your usage and prevents billing disputes with previous occupants.',
        },
      ],
      successCriteria: [
        'Sets up utilities correctly',
        'Understands council tax obligations',
        'Reports issues through proper channels',
      ],
      order: 4,
    },
    {
      id: `${MODULE}-5`,
      moduleId: MODULE,
      title: 'Making Complaints Politely but Firmly',
      context:
        'Complaining about products, services, or situations while maintaining British politeness.',
      objectives: [
        'Express dissatisfaction appropriately',
        'Escalate complaints when necessary',
        'Achieve resolution while staying polite',
      ],
      practiceActivities: [
        {
          type: 'role-play',
          prompt: 'Your meal at a restaurant is cold - complain to the waiter',
          expectedBehaviors: ['Get attention politely', 'Explain issue', 'Request solution'],
          difficulty: 'medium',
        },
        {
          type: 'scenario',
          prompt: 'A product you bought online is faulty - call customer service',
          expectedBehaviors: ['Explain problem', 'Know your rights', 'Get refund/replacement'],
          difficulty: 'medium',
        },
        {
          type: 'challenge',
          prompt: 'Your complaint is being dismissed - escalate to a manager',
          expectedBehaviors: ['Request escalation politely', 'Summarize issue', 'Stay calm but firm'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'British Complaining Style',
          content:
            "British complaints are typically indirect: 'I'm terribly sorry to bother you, but...' or 'I wonder if you could help with a small problem...'",
          importance: 'essential',
        },
        {
          topic: 'Consumer Rights',
          content:
            "UK consumer law is strong. 'Not fit for purpose' is a key phrase. You have rights to refunds for faulty goods.",
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Diplomatic Complaint Language',
          content:
            "Soften with: 'I'm afraid there seems to be a problem...', 'I wonder if you could help me with...'",
          examples: ["I'm afraid this isn't quite right", 'There seems to be an issue with...', 'I wonder if you could...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Being too direct or aggressive',
          correction: 'Stay polite even when frustrated',
          explanation:
            'Raised voices and aggression are counterproductive. Firm but polite gets better results.',
        },
        {
          mistake: 'Not knowing when to escalate',
          correction: 'Ask for a manager if front-line staff can\'t help',
          explanation:
            "It's perfectly acceptable to say: 'I appreciate you're trying to help, but could I speak to a manager, please?'",
        },
      ],
      successCriteria: [
        'Expresses complaints diplomatically',
        'Achieves resolution professionally',
        'Escalates appropriately when needed',
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

  console.log(`      ✅ Created ${scenarios.length} scenarios for Module 1C`);
}

