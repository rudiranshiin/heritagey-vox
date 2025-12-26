import { PrismaClient } from '@prisma/client';

const LANG = 'en-GB';
const MODULE = `${LANG}:2D`;

export async function seedScenarios2D(prisma: PrismaClient) {
  console.log('    📖 Seeding Module 2D scenarios...');

  const scenarios = [
    {
      id: `${MODULE}-1`,
      moduleId: MODULE,
      title: 'Speaking Impromptu on Any Topic',
      context:
        'Generating coherent extended speech without preparation on unexpected topics.',
      objectives: [
        'Speak for 5+ minutes on any topic',
        'Organize thoughts quickly',
        'Maintain coherence without preparation',
      ],
      practiceActivities: [
        {
          type: 'challenge',
          prompt: 'Given a random topic, speak about it for 3 minutes without preparation',
          expectedBehaviors: ['Start confidently', 'Structure thoughts', 'Conclude coherently'],
          difficulty: 'hard',
        },
        {
          type: 'scenario',
          prompt: 'Asked to share your thoughts on a topic you know little about',
          expectedBehaviors: ['Acknowledge limitations', 'Share what you know', 'Ask questions'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Thinking Aloud',
          content:
            "British speakers often think aloud: 'Let me think about that...', 'That's an interesting question...' buys thinking time.",
          importance: 'essential',
        },
        {
          topic: 'Admitting Uncertainty',
          content:
            "'To be honest, I'm not sure' is perfectly acceptable. Pretending to know everything is worse than admitting gaps.",
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Thinking Time Phrases',
          content:
            "Use: 'That's a good question...', 'Let me think...', 'Off the top of my head...' to buy time.",
          examples: ['That\'s a good question', 'Let me think about that', 'Off the top of my head'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Panicking when asked unexpected questions',
          correction: 'Use thinking phrases to buy time',
          explanation:
            'It\'s perfectly normal to pause and think. Rushing into a confused answer is worse than taking a moment.',
        },
        {
          mistake: 'Rambling without structure',
          correction: 'Use simple structure: point, evidence, link back',
          explanation:
            'Even impromptu speech benefits from "My main thought is... Because... So overall..."',
        },
      ],
      successCriteria: [
        'Speaks coherently without preparation',
        'Uses thinking time appropriately',
        'Structures impromptu responses',
      ],
      order: 1,
    },
    {
      id: `${MODULE}-2`,
      moduleId: MODULE,
      title: 'Self-Correcting Without Breaking Flow',
      context:
        'Making and correcting mistakes gracefully while maintaining conversation momentum.',
      objectives: [
        'Notice and correct own errors naturally',
        'Maintain conversational flow despite corrections',
        'Use self-correction as a natural part of speech',
      ],
      practiceActivities: [
        {
          type: 'role-play',
          prompt: 'Make a grammatical mistake and correct yourself mid-sentence',
          expectedBehaviors: ['Catch error quickly', 'Correct smoothly', 'Continue without dwelling'],
          difficulty: 'medium',
        },
        {
          type: 'scenario',
          prompt: 'Realize you\'ve said something factually incorrect - correct it naturally',
          expectedBehaviors: ['Acknowledge error briefly', 'Provide correct information', 'Move on'],
          difficulty: 'medium',
        },
      ],
      culturalInsights: [
        {
          topic: 'Self-Correction is Normal',
          content:
            'Native speakers self-correct constantly. "I went to... no, sorry, I mean..." is completely natural.',
          importance: 'essential',
        },
        {
          topic: 'Minimal Acknowledgment',
          content:
            'Don\'t over-apologize for mistakes. A quick "sorry, I mean..." is enough. Over-apologizing draws attention.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Self-Correction Phrases',
          content:
            "'Sorry, I mean...', 'Rather, I should say...', 'Actually, no...' are smooth correction markers.",
          examples: ['Sorry, I mean...', 'Actually, no...', 'What I meant to say was...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Stopping completely after an error',
          correction: 'Correct and continue smoothly',
          explanation:
            'Stopping mid-sentence draws more attention to the error than a smooth correction does.',
        },
        {
          mistake: 'Apologizing extensively for minor errors',
          correction: 'Quick correction is sufficient',
          explanation:
            'Saying "Oh I\'m so sorry, I always make that mistake, I\'m terrible at..." is excessive. Just correct it.',
        },
      ],
      successCriteria: [
        'Self-corrects smoothly',
        'Maintains conversation flow',
        'Doesn\'t over-apologize for errors',
      ],
      order: 2,
    },
    {
      id: `${MODULE}-3`,
      moduleId: MODULE,
      title: 'Handling Unexpected Situations',
      context:
        'Communicating effectively when plans go wrong or unexpected events occur.',
      objectives: [
        'Respond appropriately to unexpected situations',
        'Communicate calmly under pressure',
        'Solve problems through communication',
      ],
      practiceActivities: [
        {
          type: 'scenario',
          prompt: 'Your train is cancelled and you need to make alternative arrangements',
          expectedBehaviors: ['Get information', 'Consider options', 'Make decision'],
          difficulty: 'medium',
        },
        {
          type: 'challenge',
          prompt: 'You arrive at a meeting to find it\'s been moved - navigate the situation',
          expectedBehaviors: ['Stay calm', 'Get correct information', 'Arrive gracefully'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'British Stoicism',
          content:
            "'Keep calm and carry on' is real. Panicking publicly is frowned upon. Stay composed even when stressed.",
          importance: 'essential',
        },
        {
          topic: 'The Apologetic Approach',
          content:
            "When things go wrong, British people often apologize even if not at fault. 'I'm so sorry, there seems to be a problem...'",
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Problem-Solving Language',
          content:
            "'I'm afraid there's been...', 'It seems that...', 'Would it be possible to...' are useful in crises.",
          examples: ["I'm afraid there's been a mix-up", 'It seems there\'s been a change', 'Could we possibly...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Losing composure publicly',
          correction: 'Stay outwardly calm even if stressed inside',
          explanation:
            'Public displays of panic make situations worse. Take a breath and speak calmly.',
        },
        {
          mistake: 'Blaming others immediately',
          correction: 'Focus on solutions before assigning blame',
          explanation:
            'Saying "This is your fault!" doesn\'t help. "How can we fix this?" is more productive.',
        },
      ],
      successCriteria: [
        'Responds calmly to unexpected events',
        'Communicates effectively under pressure',
        'Solves problems constructively',
      ],
      order: 3,
    },
    {
      id: `${MODULE}-4`,
      moduleId: MODULE,
      title: 'Using Native-Like Fillers and Hesitation Patterns',
      context:
        'Incorporating natural pauses, fillers, and hesitation markers into speech.',
      objectives: [
        'Use fillers naturally like native speakers',
        'Pause appropriately for effect and thought',
        'Sound natural rather than rehearsed',
      ],
      practiceActivities: [
        {
          type: 'discussion',
          prompt: 'Have a casual conversation using natural fillers and pauses',
          expectedBehaviors: ['Use "um", "er" naturally', 'Pause for effect', 'Sound spontaneous'],
          difficulty: 'medium',
        },
        {
          type: 'role-play',
          prompt: 'Tell a story using natural hesitation patterns',
          expectedBehaviors: ['Think aloud naturally', 'Use fillers appropriately', 'Maintain engagement'],
          difficulty: 'medium',
        },
      ],
      culturalInsights: [
        {
          topic: 'British Fillers',
          content:
            "'Er' and 'erm' are more British than 'um'. 'Sort of', 'kind of', 'like' soften statements.",
          importance: 'essential',
        },
        {
          topic: 'Silence Tolerance',
          content:
            "British people are more comfortable with brief silences than some cultures. Pauses aren't always awkward.",
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Natural Fillers',
          content:
            "'Well...', 'You know...', 'I mean...', 'Sort of...' are common discourse markers.",
          examples: ['Well, the thing is...', 'You know what I mean?', 'I mean, it\'s sort of...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Speaking too perfectly/rehearsed',
          correction: 'Include natural hesitation',
          explanation:
            'Perfect fluency with no pauses can sound robotic. Natural speech includes thought pauses.',
        },
        {
          mistake: 'Overusing fillers',
          correction: 'Balance fillers with clear content',
          explanation:
            'Too many "like"s and "you know"s becomes distracting. Use them naturally, not excessively.',
        },
      ],
      successCriteria: [
        'Uses fillers naturally',
        'Pauses appropriately',
        'Sounds spontaneous not rehearsed',
      ],
      order: 4,
    },
    {
      id: `${MODULE}-5`,
      moduleId: MODULE,
      title: 'Adapting Communication Style to Context',
      context:
        'Adjusting tone, vocabulary, and style based on audience and situation.',
      objectives: [
        'Read audiences and contexts accurately',
        'Adapt style seamlessly',
        'Maintain authenticity while adapting',
      ],
      practiceActivities: [
        {
          type: 'challenge',
          prompt: 'Explain the same concept to a child, a peer, and an expert',
          expectedBehaviors: ['Adjust complexity', 'Change vocabulary', 'Maintain accuracy'],
          difficulty: 'hard',
        },
        {
          type: 'scenario',
          prompt: 'Move from a formal meeting to informal pub drinks with the same colleagues',
          expectedBehaviors: ['Shift register smoothly', 'Adjust topics', 'Maintain relationships'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Context is Everything',
          content:
            "The same person might be 'darling' to a friend and 'Mr. Smith' to a client. Context determines address.",
          importance: 'essential',
        },
        {
          topic: 'Reading the Room',
          content:
            "Watch how others communicate and mirror approximately. If everyone's joking, join in. If serious, match the tone.",
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Register Shifting',
          content:
            "Formal to casual: 'I was wondering...' → 'I thought maybe...', 'Would it be possible...' → 'Any chance...'",
          examples: ['Formal: Would it be possible...', 'Casual: Any chance of...', 'Very casual: Could you just...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Using same style in all contexts',
          correction: 'Actively adapt to different situations',
          explanation:
            'Speaking to your boss the same way as your friends seems either too casual or too formal.',
        },
        {
          mistake: 'Adapting so much you lose authenticity',
          correction: 'Adapt style, not personality',
          explanation:
            'Be yourself in different registers. Becoming a completely different person seems fake.',
        },
      ],
      successCriteria: [
        'Reads context accurately',
        'Adapts style smoothly',
        'Maintains authenticity while adapting',
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

  console.log(`      ✅ Created ${scenarios.length} scenarios for Module 2D`);
}

