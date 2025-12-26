import { PrismaClient } from '@prisma/client';

const LANG = 'en-GB';
const MODULE = `${LANG}:1A`;

export async function seedScenarios1A(prisma: PrismaClient) {
  console.log('    📖 Seeding Module 1A scenarios...');

  const scenarios = [
    {
      id: `${MODULE}-1`,
      moduleId: MODULE,
      title: 'Greeting People Appropriately',
      context: 'Meeting someone at a British workplace or in social settings. Understanding when to use formal vs casual greetings.',
      objectives: [
        'Use appropriate greetings for formal/informal contexts',
        'Understand British personal space norms',
        'Master the art of the handshake and eye contact',
      ],
      practiceActivities: [
        {
          type: 'role-play',
          prompt: "You're meeting a new colleague on your first day at a London office",
          expectedBehaviors: ['Appropriate greeting', 'Small talk attempt', 'Professional but friendly tone'],
          difficulty: 'easy',
        },
        {
          type: 'scenario',
          prompt: "You bump into your neighbor in the hallway of your flat building",
          expectedBehaviors: ['Casual greeting', 'Brief weather comment', 'Polite exit'],
          difficulty: 'easy',
        },
      ],
      culturalInsights: [
        {
          topic: 'Personal Space',
          content: "British people typically maintain about arm's length distance. Standing too close can make people uncomfortable.",
          importance: 'essential',
        },
        {
          topic: 'The Handshake',
          content: 'A firm (but not crushing) handshake with brief eye contact is standard for formal introductions. Not too long!',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Modal Verbs for Politeness',
          content: "Use 'could' and 'would' for polite requests: 'Could I ask your name?' rather than 'What is your name?'",
          examples: ['Could you tell me...', 'Would you mind...', 'Might I ask...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Being too enthusiastic in greetings',
          correction: 'British greetings are typically understated',
          explanation: "Saying 'OH WOW, SO GREAT TO MEET YOU!' can feel overwhelming. 'Lovely to meet you' is more appropriate.",
        },
        {
          mistake: "Using 'How are you?' expecting a real answer",
          correction: "It's a greeting, not a genuine inquiry",
          explanation: "The expected response is 'Fine, thanks. You?' not a detailed health update.",
        },
      ],
      successCriteria: [
        'Uses appropriate greeting for context',
        'Demonstrates awareness of formality levels',
        'Maintains comfortable personal space',
      ],
      order: 1,
    },
    {
      id: `${MODULE}-2`,
      moduleId: MODULE,
      title: 'Shopping in British Supermarkets',
      context: 'Navigating Tesco, Sainsbury\'s, or local corner shops. Understanding British product names and shop etiquette.',
      objectives: [
        'Navigate supermarket layout and find products',
        'Understand British product names (aubergine, courgette, etc.)',
        'Handle checkout interactions confidently',
      ],
      practiceActivities: [
        {
          type: 'role-play',
          prompt: "You can't find the pasta sauce and need to ask a shop assistant for help",
          expectedBehaviors: ['Polite approach', 'Clear question', 'Thank the assistant'],
          difficulty: 'easy',
        },
        {
          type: 'scenario',
          prompt: 'At the checkout, your card is declined. Handle the situation.',
          expectedBehaviors: ['Stay calm', 'Apologize briefly', 'Offer alternative payment'],
          difficulty: 'medium',
        },
      ],
      culturalInsights: [
        {
          topic: 'The Art of Queuing',
          content: 'Queuing is sacred in Britain. Never jump a queue - it causes genuine outrage. Wait patiently and maintain queue discipline.',
          importance: 'essential',
        },
        {
          topic: 'Self-Checkout Etiquette',
          content: "If you're slow at self-checkout and there's a queue, a brief 'Sorry, won't be a moment' acknowledges others waiting.",
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Polite Requests',
          content: "Start requests with 'Excuse me' and use 'please': 'Excuse me, could you tell me where the bread is, please?'",
          examples: ['Excuse me, where would I find...', 'Sorry to bother you, but...', 'Could you point me to...'],
        },
      ],
      commonMistakes: [
        {
          mistake: "Calling trousers 'pants'",
          correction: "In British English, 'pants' means underwear",
          explanation: "Say 'trousers' for what Americans call 'pants'. This can cause embarrassing confusion!",
        },
        {
          mistake: 'Not having a bag ready',
          correction: 'Bring your own bags - single-use bags cost money',
          explanation: 'Most British shoppers bring reusable bags. Ask for a bag if needed but expect to pay.',
        },
      ],
      successCriteria: [
        'Asks for help politely',
        'Uses correct British product names',
        'Handles checkout interaction smoothly',
      ],
      order: 2,
    },
    {
      id: `${MODULE}-3`,
      moduleId: MODULE,
      title: 'Ordering at Cafés and Pubs',
      context: 'Understanding British café culture and pub etiquette. Ordering food and drinks with confidence.',
      objectives: [
        'Order drinks and food using British terminology',
        'Understand pub ordering system (bar vs table service)',
        'Navigate tipping culture appropriately',
      ],
      practiceActivities: [
        {
          type: 'role-play',
          prompt: 'Order a coffee and a pastry at a Costa or Caffè Nero',
          expectedBehaviors: ['Specify milk type', 'Choose size correctly', 'Handle payment'],
          difficulty: 'easy',
        },
        {
          type: 'challenge',
          prompt: "You're at a traditional pub. Order a round of drinks for yourself and two friends.",
          expectedBehaviors: ['Order at the bar', 'Remember all orders', 'Handle payment'],
          difficulty: 'medium',
        },
      ],
      culturalInsights: [
        {
          topic: 'Pub Culture',
          content: 'In most traditional pubs, you order at the bar and pay immediately. Table service is becoming more common but always check.',
          importance: 'essential',
        },
        {
          topic: 'Buying Rounds',
          content: "In a group, people take turns buying drinks for everyone. If someone buys you a drink, you're expected to buy the next round.",
          importance: 'essential',
        },
        {
          topic: 'Tipping',
          content: "Tipping isn't expected in pubs. In restaurants, 10-12.5% is standard if service isn't included. Check the bill first.",
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Ordering Language',
          content: "British ordering is softer than American: 'Could I have...' or 'I'll have...' rather than 'I want...' or 'Give me...'",
          examples: ["Could I have a latte, please?", "I'll have the fish and chips", "May I have the bill?"],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Waiting to be seated at a pub',
          correction: 'Walk in, find a table, then go to the bar to order',
          explanation: 'Unlike American restaurants, traditional pubs are self-service.',
        },
        {
          mistake: "Asking for 'regular' coffee",
          correction: "Specify what you want: 'Americano', 'flat white', 'latte'",
          explanation: "'Regular' doesn't mean anything specific in British cafés.",
        },
      ],
      successCriteria: [
        'Orders confidently using British terms',
        'Understands bar vs table service',
        'Handles payment and tipping appropriately',
      ],
      order: 3,
    },
    {
      id: `${MODULE}-4`,
      moduleId: MODULE,
      title: 'Using Public Transport',
      context: 'Navigating the Tube, buses, and trains. Buying tickets, understanding announcements, and asking for help.',
      objectives: [
        'Buy tickets and use Oyster/contactless payment',
        'Understand transport announcements',
        'Ask for directions confidently',
      ],
      practiceActivities: [
        {
          type: 'role-play',
          prompt: "You're lost on the Tube. Ask a fellow passenger for help getting to King's Cross.",
          expectedBehaviors: ['Polite approach', 'Clear question', 'Thank them'],
          difficulty: 'easy',
        },
        {
          type: 'scenario',
          prompt: 'Your train is delayed and you need information about alternatives.',
          expectedBehaviors: ['Find staff', 'Ask clear questions', 'Understand options'],
          difficulty: 'medium',
        },
      ],
      culturalInsights: [
        {
          topic: 'Tube Etiquette',
          content: 'Stand on the right of escalators, walk on the left. Let people off before boarding. Avoid eye contact. No talking.',
          importance: 'essential',
        },
        {
          topic: 'The Quiet Carriage',
          content: 'Some trains have quiet carriages where phone calls and loud conversations are discouraged. Look for signs.',
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Asking for Directions',
          content: "Use 'How do I get to...?' or 'Could you tell me the way to...?' followed by 'please'",
          examples: ['Excuse me, how do I get to...', 'Which platform for...', 'Is this the right train for...'],
        },
      ],
      commonMistakes: [
        {
          mistake: "Standing on the left of the escalator",
          correction: 'Stand right, walk left - always',
          explanation: "Londoners will tutting (the British 'tsk' sound of disapproval) or say 'excuse me' pointedly.",
        },
        {
          mistake: "Saying 'subway' instead of 'Tube' or 'Underground'",
          correction: "Use 'Tube' (informal) or 'Underground' (formal) in London",
          explanation: "'Subway' means a pedestrian underpass in British English.",
        },
      ],
      successCriteria: [
        'Navigates ticketing systems confidently',
        'Understands common announcements',
        'Asks for help appropriately',
        'Follows transport etiquette',
      ],
      order: 4,
    },
    {
      id: `${MODULE}-5`,
      moduleId: MODULE,
      title: 'Making Small Talk About Weather',
      context: 'The quintessentially British art of weather conversation. Using weather as a social lubricant.',
      objectives: [
        'Initiate and sustain weather-based small talk',
        'Use appropriate weather vocabulary',
        'Understand weather talk as social bonding',
      ],
      practiceActivities: [
        {
          type: 'discussion',
          prompt: 'Start a conversation with a stranger at a bus stop using the weather',
          expectedBehaviors: ['Comment on current weather', 'Invite response', 'Keep it brief'],
          difficulty: 'easy',
        },
        {
          type: 'role-play',
          prompt: "It's unexpectedly sunny. Have a weather conversation with your colleague at work.",
          expectedBehaviors: ['Express pleasant surprise', 'Make plans-related comment', 'Natural conversation flow'],
          difficulty: 'easy',
        },
      ],
      culturalInsights: [
        {
          topic: 'Weather as Social Glue',
          content: "Weather talk isn't really about weather - it's a safe, shared topic for connecting. It's okay to state the obvious.",
          importance: 'essential',
        },
        {
          topic: 'British Weather Pessimism',
          content: "British people often complain about weather even when it's nice. 'Too hot' in summer, 'too cold' in winter. Join in!",
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Weather Expressions',
          content: "Use British expressions: 'lovely day', 'bit nippy', 'absolutely chucking it down', 'glorious sunshine'",
          examples: ["Lovely day, isn't it?", "Bit grey today", "Can't believe this heat!"],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Giving detailed weather forecasts',
          correction: 'Keep it simple and observational',
          explanation: "Weather talk should be brief. 'Bit cold, isn't it?' not 'The Met Office says it'll be 8 degrees with...'",
        },
        {
          mistake: 'Not agreeing with weather complaints',
          correction: 'Always agree and add your own mild complaint',
          explanation: "If someone says 'Terrible weather', don't say 'I quite like it.' Say 'Dreadful, isn't it?'",
        },
      ],
      successCriteria: [
        'Initiates weather conversation naturally',
        'Uses appropriate British expressions',
        'Keeps conversation brief but warm',
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

  console.log(`      ✅ Created ${scenarios.length} scenarios for Module 1A`);
}

