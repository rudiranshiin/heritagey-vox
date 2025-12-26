import { PrismaClient } from '@prisma/client';

const LANG = 'en-GB';
const MODULE = `${LANG}:1D`;

export async function seedScenarios1D(prisma: PrismaClient) {
  console.log('    📖 Seeding Module 1D scenarios...');

  const scenarios = [
    {
      id: `${MODULE}-1`,
      moduleId: MODULE,
      title: 'Discussing News and Current Events',
      context:
        'Having conversations about news, current affairs, and what\'s happening in the world.',
      objectives: [
        'Discuss news stories with appropriate vocabulary',
        'Express opinions carefully with hedging',
        'Navigate potentially sensitive topics diplomatically',
      ],
      practiceActivities: [
        {
          type: 'discussion',
          prompt: 'Discuss a recent news story with a colleague during lunch',
          expectedBehaviors: ['Introduce topic naturally', 'Share perspective', 'Invite their view'],
          difficulty: 'medium',
        },
        {
          type: 'role-play',
          prompt: 'Someone mentions a controversial topic - respond diplomatically',
          expectedBehaviors: ['Acknowledge their view', 'Share your perspective carefully', 'Avoid confrontation'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'British News Sources',
          content:
            'BBC is seen as relatively neutral. Guardian is left-leaning, Telegraph right-leaning. Tabloids (Sun, Mirror) are for entertainment.',
          importance: 'helpful',
        },
        {
          topic: 'Avoiding Controversy',
          content:
            "Religion and politics are traditionally avoided in casual conversation. 'I try not to get too political' is a common deflection.",
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Hedging Opinions',
          content:
            "Use hedging language: 'I might be wrong, but...', 'It seems to me that...', 'I suppose one could argue...'",
          examples: ['It seems to me that...', 'I might be wrong, but...', 'Some would say...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Expressing strong political opinions in casual settings',
          correction: 'Keep opinions mild unless you know your audience',
          explanation:
            'British social norms favor understatement. Strong opinions can make others uncomfortable.',
        },
        {
          mistake: 'Not balancing views',
          correction: 'Acknowledge other perspectives exist',
          explanation:
            "Even if you feel strongly, add 'But I can see the other side too' to show you're not dogmatic.",
        },
      ],
      successCriteria: [
        'Discusses current events appropriately',
        'Uses hedging language for opinions',
        'Navigates sensitive topics tactfully',
      ],
      order: 1,
    },
    {
      id: `${MODULE}-2`,
      moduleId: MODULE,
      title: 'Talking About Films, TV, and Books',
      context:
        'Discussing entertainment, media, and culture. Sharing recommendations and preferences.',
      objectives: [
        'Discuss entertainment preferences naturally',
        'Give and receive recommendations',
        'Express opinions about cultural products',
      ],
      practiceActivities: [
        {
          type: 'discussion',
          prompt: 'Recommend a TV show to a friend who asks what they should watch',
          expectedBehaviors: ['Describe without spoiling', 'Explain why they\'d like it', 'Gauge their interest'],
          difficulty: 'easy',
        },
        {
          type: 'role-play',
          prompt: 'Discuss a book you\'ve both read but have different opinions about',
          expectedBehaviors: ['Share your view', 'Listen to theirs', 'Find common ground'],
          difficulty: 'medium',
        },
      ],
      culturalInsights: [
        {
          topic: 'British TV Culture',
          content:
            'BBC dramas, panel shows, and soaps are cultural touchstones. EastEnders, Strictly, and Bake Off are household names.',
          importance: 'helpful',
        },
        {
          topic: 'Spoiler Etiquette',
          content:
            "Warning about spoilers is important: 'Have you seen it? I don't want to spoil anything.' Very British to be considerate.",
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Recommendation Language',
          content:
            "Use: 'Have you seen...?', 'You might enjoy...', 'It's worth a watch/read' for suggestions.",
          examples: ['Have you seen...?', 'You might enjoy...', 'It\'s worth watching if you like...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Spoiling plots without warning',
          correction: 'Always check if they\'ve seen/read it first',
          explanation:
            "Spoiling is considered quite rude. 'I won't give anything away, but...' is the safe approach.",
        },
        {
          mistake: 'Being dismissive of their preferences',
          correction: 'Respect different tastes',
          explanation:
            "Don't say 'That's rubbish!' Say 'It's not really my thing, but I can see why people like it.'",
        },
      ],
      successCriteria: [
        'Discusses entertainment naturally',
        'Gives helpful recommendations',
        'Respects different tastes',
      ],
      order: 2,
    },
    {
      id: `${MODULE}-3`,
      moduleId: MODULE,
      title: 'Sharing Travel Experiences and Plans',
      context:
        'Discussing holidays, travel stories, and future travel plans.',
      objectives: [
        'Describe travel experiences engagingly',
        'Ask about others\' travel experiences',
        'Discuss and plan future trips',
      ],
      practiceActivities: [
        {
          type: 'discussion',
          prompt: 'Tell a colleague about your recent holiday',
          expectedBehaviors: ['Share highlights', 'Be enthusiastic but not boastful', 'Ask about their travels'],
          difficulty: 'easy',
        },
        {
          type: 'role-play',
          prompt: 'A friend is planning to visit a place you\'ve been - give advice',
          expectedBehaviors: ['Share useful tips', 'Recommend highlights', 'Warn about pitfalls'],
          difficulty: 'medium',
        },
      ],
      culturalInsights: [
        {
          topic: 'British Holiday Habits',
          content:
            'Spain is the most popular destination. "Bank holiday" weekends are key travel times. "Staycation" means holidaying in the UK.',
          importance: 'helpful',
        },
        {
          topic: 'Holiday vs Vacation',
          content:
            "British English uses 'holiday' for vacation. 'I\'m on holiday' not 'I\'m on vacation.'",
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Travel Narratives',
          content:
            "Use past simple for completed trips: 'We went to...', 'We stayed at...', 'The highlight was...'",
          examples: ['We went to...', 'The best bit was...', 'You must see...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Humble-bragging about expensive trips',
          correction: 'Focus on experiences, not costs',
          explanation:
            "Mentioning how expensive your hotel was comes across as boastful. Focus on what you did and saw.",
        },
        {
          mistake: 'Monologuing about your trip',
          correction: 'Keep it interactive - ask about their experiences too',
          explanation:
            'British conversation is reciprocal. After sharing your story, ask "Have you been anywhere nice recently?"',
        },
      ],
      successCriteria: [
        'Shares travel stories engagingly',
        'Shows interest in others\' travels',
        'Uses appropriate vocabulary',
      ],
      order: 3,
    },
    {
      id: `${MODULE}-4`,
      moduleId: MODULE,
      title: 'Expressing Opinions with Appropriate Hedging',
      context:
        'Sharing views on various topics while maintaining British conversational norms.',
      objectives: [
        'Express opinions with appropriate softening',
        'Agree and disagree diplomatically',
        'Navigate differences of opinion gracefully',
      ],
      practiceActivities: [
        {
          type: 'discussion',
          prompt: 'Share your opinion on a topic when directly asked',
          expectedBehaviors: ['Give clear view with hedging', 'Acknowledge other perspectives', 'Invite their opinion'],
          difficulty: 'medium',
        },
        {
          type: 'role-play',
          prompt: 'Disagree politely with someone\'s opinion',
          expectedBehaviors: ['Acknowledge their point', 'Offer alternative view gently', 'Find middle ground'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'The Art of Understatement',
          content:
            "'Quite good' often means 'very good'. 'Not bad' is praise. 'Interesting' can mean 'I disagree but won't say so.'",
          importance: 'essential',
        },
        {
          topic: 'Agreeing to Disagree',
          content:
            "'Let's agree to disagree' or 'Each to their own' are face-saving ways to end disagreements.",
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Softening Disagreement',
          content:
            "Use: 'I see what you mean, but...', 'That's a fair point, although...', 'I take your point, however...'",
          examples: ['I see what you mean, but...', 'That\'s interesting, although I wonder if...', 'I take your point, however...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Saying "You\'re wrong" directly',
          correction: 'Frame disagreement as your perspective, not their error',
          explanation:
            "'I see it differently' is much better than 'You're wrong.' Preserve their face while expressing your view.",
        },
        {
          mistake: 'Pushing too hard in disagreements',
          correction: 'Know when to back off',
          explanation:
            'If someone seems uncomfortable, say "But that\'s just my view" and change the subject.',
        },
      ],
      successCriteria: [
        'Expresses opinions with appropriate hedging',
        'Disagrees diplomatically',
        'Manages different viewpoints gracefully',
      ],
      order: 4,
    },
    {
      id: `${MODULE}-5`,
      moduleId: MODULE,
      title: 'Telling Engaging Stories',
      context:
        'Recounting experiences, anecdotes, and narratives in a way that captures attention.',
      objectives: [
        'Structure stories with clear narrative arc',
        'Use appropriate storytelling language',
        'Engage listeners and respond to reactions',
      ],
      practiceActivities: [
        {
          type: 'discussion',
          prompt: 'Tell a funny story about something that happened to you',
          expectedBehaviors: ['Set the scene', 'Build tension', 'Deliver punchline'],
          difficulty: 'medium',
        },
        {
          type: 'role-play',
          prompt: 'Recount an interesting experience to colleagues during a break',
          expectedBehaviors: ['Engage listeners', 'Respond to questions', 'Conclude satisfactorily'],
          difficulty: 'medium',
        },
      ],
      culturalInsights: [
        {
          topic: 'Self-Deprecating Humour',
          content:
            'British stories often feature the speaker as the butt of the joke. Making fun of yourself is endearing.',
          importance: 'essential',
        },
        {
          topic: 'Story Length',
          content:
            "Keep anecdotes relatively brief. 'To cut a long story short...' signals you're wrapping up.",
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Narrative Tenses',
          content:
            "Use past simple for main events, past continuous for background: 'I was walking down the street when I saw...'",
          examples: ['So there I was...', 'And then, out of nowhere...', 'You\'ll never guess what happened next...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Stories that go on too long',
          correction: 'Edit ruthlessly - get to the point',
          explanation:
            'British audiences appreciate brevity. If you see eyes glazing, use "Anyway, long story short..."',
        },
        {
          mistake: 'Stories that make you look too good',
          correction: 'Include your own mistakes and embarrassments',
          explanation:
            'Self-aggrandizing stories fall flat. Showing vulnerability is more relatable and British.',
        },
      ],
      successCriteria: [
        'Tells engaging, well-paced stories',
        'Uses appropriate narrative language',
        'Responds to audience reactions',
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

  console.log(`      ✅ Created ${scenarios.length} scenarios for Module 1D`);
}

