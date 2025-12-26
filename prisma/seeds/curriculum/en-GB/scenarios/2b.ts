import { PrismaClient } from '@prisma/client';

const LANG = 'en-GB';
const MODULE = `${LANG}:2B`;

export async function seedScenarios2B(prisma: PrismaClient) {
  console.log('    📖 Seeding Module 2B scenarios...');

  const scenarios = [
    {
      id: `${MODULE}-1`,
      moduleId: MODULE,
      title: 'Succeeding in Job Interviews',
      context:
        'Navigating British job interviews with confidence and cultural awareness.',
      objectives: [
        'Answer interview questions effectively',
        'Demonstrate competence without arrogance',
        'Ask appropriate questions at the end',
      ],
      practiceActivities: [
        {
          type: 'role-play',
          prompt: 'Answer "Tell me about yourself" in a British job interview',
          expectedBehaviors: ['Be concise', 'Show relevant experience', 'Avoid overselling'],
          difficulty: 'medium',
        },
        {
          type: 'scenario',
          prompt: 'Asked about a failure - respond using British self-deprecation appropriately',
          expectedBehaviors: ['Acknowledge mistake', 'Show learning', 'Don\'t over-criticize self'],
          difficulty: 'hard',
        },
        {
          type: 'challenge',
          prompt: 'Ask the interviewer three appropriate questions at the end',
          expectedBehaviors: ['Show genuine interest', 'Ask about role/team', 'Avoid salary initially'],
          difficulty: 'medium',
        },
      ],
      culturalInsights: [
        {
          topic: 'British Interview Style',
          content:
            'British interviews value understated competence. "I\'m reasonably confident in..." sounds better than "I\'m an expert at..."',
          importance: 'essential',
        },
        {
          topic: 'Salary Discussions',
          content:
            'Salary is typically discussed at offer stage, not first interview. Asking too early can seem presumptuous.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Interview Language',
          content:
            "Use modulated confidence: 'I believe I can...', 'I'm confident that...', 'My experience has shown me...'",
          examples: ['I believe I would be...', 'My experience suggests...', 'I\'m confident I could...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Being too boastful about achievements',
          correction: 'State achievements modestly with evidence',
          explanation:
            "'I increased sales by 30%' is fine. 'I single-handedly revolutionized the department' sounds arrogant.",
        },
        {
          mistake: 'Not asking any questions',
          correction: 'Always have 2-3 thoughtful questions prepared',
          explanation:
            'Not asking questions suggests lack of interest. Questions about team culture and role development are safe.',
        },
      ],
      successCriteria: [
        'Answers questions with appropriate confidence',
        'Demonstrates competence without arrogance',
        'Asks insightful questions',
      ],
      order: 1,
    },
    {
      id: `${MODULE}-2`,
      moduleId: MODULE,
      title: 'Participating in Meetings Effectively',
      context:
        'Contributing to workplace meetings with appropriate British professional style.',
      objectives: [
        'Contribute ideas in meetings appropriately',
        'Navigate meeting dynamics and politics',
        'Follow up on action items professionally',
      ],
      practiceActivities: [
        {
          type: 'role-play',
          prompt: 'Propose an idea in a team meeting',
          expectedBehaviors: ['Introduce idea tentatively', 'Explain benefits', 'Invite feedback'],
          difficulty: 'medium',
        },
        {
          type: 'scenario',
          prompt: 'Disagree with your manager\'s suggestion in a meeting',
          expectedBehaviors: ['Acknowledge their point', 'Raise concern diplomatically', 'Offer alternative'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Meeting Dynamics',
          content:
            'British meetings often have unwritten hierarchy. Junior staff may wait for seniors to speak first.',
          importance: 'essential',
        },
        {
          topic: 'Post-Meeting Email',
          content:
            'Following up with email notes ("As discussed...") is common and appreciated.',
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Meeting Contribution Language',
          content:
            "Use tentative language: 'I wonder if we might...', 'One possibility could be...', 'Just thinking aloud...'",
          examples: ['I wonder if we might consider...', 'One option could be...', 'I\'m just thinking...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Speaking too often or too loudly',
          correction: 'Contribute meaningfully, not constantly',
          explanation:
            'Quality over quantity. A few good contributions beat constant input that adds nothing new.',
        },
        {
          mistake: 'Disagreeing bluntly',
          correction: 'Frame disagreement as alternative perspective',
          explanation:
            "'I think you\'re wrong' is confrontational. 'Another angle might be...' achieves the same goal diplomatically.",
        },
      ],
      successCriteria: [
        'Contributes appropriately to discussions',
        'Disagrees diplomatically when needed',
        'Follows meeting etiquette',
      ],
      order: 2,
    },
    {
      id: `${MODULE}-3`,
      moduleId: MODULE,
      title: 'Writing Professional Emails in British Style',
      context:
        'Composing emails that follow British professional conventions.',
      objectives: [
        'Structure emails appropriately for British workplaces',
        'Match tone to relationship and seniority',
        'Use British email conventions correctly',
      ],
      practiceActivities: [
        {
          type: 'challenge',
          prompt: 'Write an email requesting time off from your manager',
          expectedBehaviors: ['Polite opening', 'Clear request', 'Offer flexibility'],
          difficulty: 'medium',
        },
        {
          type: 'scenario',
          prompt: 'Follow up on an unanswered email without seeming pushy',
          expectedBehaviors: ['Reference original', 'Give easy out', 'Keep it light'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Email Greetings',
          content:
            "'Hi [Name]' is standard for known colleagues. 'Dear [Name]' for formal/external. 'Dear Sir/Madam' only if name unknown.",
          importance: 'essential',
        },
        {
          topic: 'Email Sign-offs',
          content:
            "'Best regards' is safe and common. 'Kind regards' slightly warmer. 'Best' or 'Thanks' for informal. 'Yours faithfully/sincerely' very formal.",
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Email Phrases',
          content:
            "'I hope this email finds you well', 'I trust you\'re well', 'Further to our conversation...' are common openers.",
          examples: ['I hope this finds you well', 'Further to our call...', 'Just following up on...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Being too casual in first contact',
          correction: 'Start formal, relax if they do',
          explanation:
            'Mirror the formality of responses. If they sign "Cheers, Dave", you can relax. Start formal to be safe.',
        },
        {
          mistake: 'Very long emails',
          correction: 'Keep emails concise with clear action points',
          explanation:
            'British professionals appreciate brevity. Put key request in first paragraph. Use bullet points for clarity.',
        },
      ],
      successCriteria: [
        'Writes emails with appropriate formality',
        'Uses correct conventions for greetings/sign-offs',
        'Communicates clearly and concisely',
      ],
      order: 3,
    },
    {
      id: `${MODULE}-4`,
      moduleId: MODULE,
      title: 'Navigating Workplace Hierarchies',
      context:
        'Understanding and operating within British workplace social structures.',
      objectives: [
        'Recognize formal and informal workplace hierarchies',
        'Communicate appropriately across levels',
        'Navigate office politics diplomatically',
      ],
      practiceActivities: [
        {
          type: 'scenario',
          prompt: 'Approach a senior executive you don\'t know well with a question',
          expectedBehaviors: ['Appropriate formality', 'Clear question', 'Thank them for time'],
          difficulty: 'hard',
        },
        {
          type: 'role-play',
          prompt: 'Your peer asks you to do their work - decline without damaging relationship',
          expectedBehaviors: ['Understand their situation', 'Explain your constraints', 'Offer alternative help'],
          difficulty: 'medium',
        },
      ],
      culturalInsights: [
        {
          topic: 'Flat vs Hierarchical',
          content:
            'British workplaces can seem casual but have real hierarchies. First names don\'t mean no structure exists.',
          importance: 'essential',
        },
        {
          topic: 'Going Around Your Boss',
          content:
            'Skipping your direct manager is often seen as inappropriate. Usually involve them first.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Hierarchy-Appropriate Language',
          content:
            "To seniors: 'I was wondering if you might have a moment...', To peers: 'Got a sec?', To juniors: 'Could you help me with...'",
          examples: ['I was wondering if...', 'When you have a moment...', 'Would it be possible to...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Treating everyone identically regardless of level',
          correction: 'Adjust formality to relationship and seniority',
          explanation:
            'While British workplaces use first names, communication style should still reflect hierarchy.',
        },
        {
          mistake: 'Being too deferential to peers',
          correction: 'Be collegial and equal with same-level colleagues',
          explanation:
            'Overly formal language with peers can create distance. Match their casual level.',
        },
      ],
      successCriteria: [
        'Recognizes workplace hierarchies',
        'Adjusts communication to seniority',
        'Navigates office dynamics appropriately',
      ],
      order: 4,
    },
    {
      id: `${MODULE}-5`,
      moduleId: MODULE,
      title: 'Using Sophisticated Hedging and Diplomatic Language',
      context:
        'Mastering the art of saying things indirectly for professional contexts.',
      objectives: [
        'Use hedging language effectively',
        'Deliver difficult messages diplomatically',
        'Soften criticism and negative feedback',
      ],
      practiceActivities: [
        {
          type: 'challenge',
          prompt: 'Give negative feedback on a colleague\'s work diplomatically',
          expectedBehaviors: ['Start with positive', 'Frame criticism constructively', 'Offer support'],
          difficulty: 'hard',
        },
        {
          type: 'scenario',
          prompt: 'Decline a project request from another team without causing offense',
          expectedBehaviors: ['Acknowledge their need', 'Explain constraints', 'Suggest alternatives'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'The Feedback Sandwich',
          content:
            'British feedback often follows: positive comment, constructive criticism, encouraging close. This softens the message.',
          importance: 'essential',
        },
        {
          topic: 'Reading Between Lines',
          content:
            "'That\'s an interesting approach' may mean 'I don\'t agree'. British indirectness requires careful listening.",
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Hedging Language',
          content:
            "Use: 'Perhaps we might consider...', 'I wonder whether...', 'It could be worth looking at...'",
          examples: ['Perhaps we might...', 'I wonder whether...', 'One thing to consider might be...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Being too blunt with criticism',
          correction: 'Always soften with hedging and positive framing',
          explanation:
            "'This is wrong' is too direct. 'I wonder if we might approach this differently?' achieves more.",
        },
        {
          mistake: 'Over-hedging to the point of confusion',
          correction: 'Be clear enough that your point comes across',
          explanation:
            'Too much hedging can obscure your message. Balance diplomacy with clarity.',
        },
      ],
      successCriteria: [
        'Uses hedging language effectively',
        'Delivers difficult messages diplomatically',
        'Maintains clarity while being tactful',
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

  console.log(`      ✅ Created ${scenarios.length} scenarios for Module 2B`);
}

