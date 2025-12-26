import { PrismaClient } from '@prisma/client';

const LANG = 'en-GB';
const MODULE = `${LANG}:1B`;

export async function seedScenarios1B(prisma: PrismaClient) {
  console.log('    📖 Seeding Module 1B scenarios...');

  const scenarios = [
    {
      id: `${MODULE}-1`,
      moduleId: MODULE,
      title: 'Introducing Yourself Effectively',
      context:
        'Meeting new people at social events, parties, or networking occasions. Making memorable first impressions.',
      objectives: [
        'Introduce yourself with appropriate formality',
        'Share information about yourself naturally',
        'Ask follow-up questions to show interest',
      ],
      practiceActivities: [
        {
          type: 'role-play',
          prompt: "You're at a friend's birthday party and meet someone new",
          expectedBehaviors: ['Natural introduction', 'Find common ground', 'Exchange contact details'],
          difficulty: 'easy',
        },
        {
          type: 'scenario',
          prompt: 'At a professional networking event, introduce yourself to a potential contact',
          expectedBehaviors: ['Professional introduction', 'Mention your work briefly', 'Show genuine interest'],
          difficulty: 'medium',
        },
      ],
      culturalInsights: [
        {
          topic: 'The Art of Self-Deprecation',
          content:
            "British people often downplay achievements. Saying 'I dabble in' rather than 'I'm an expert at' is more culturally appropriate.",
          importance: 'essential',
        },
        {
          topic: 'Names and Titles',
          content:
            "Use first names quickly in casual settings. In formal contexts, wait to be invited: 'Please, call me John.'",
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Introduction Phrases',
          content:
            "British introductions are often understated: 'I'm John, by the way' or 'I don't think we've met - I'm Sarah.'",
          examples: ["I'm [name], by the way", "I don't think we've met", 'Lovely to meet you'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Oversharing personal information immediately',
          correction: 'Keep initial exchanges light and general',
          explanation:
            'British social norms favor gradual revelation. Save personal details for later conversations.',
        },
        {
          mistake: 'Asking direct salary or age questions',
          correction: 'These topics are considered intrusive',
          explanation: "Avoid 'How much do you earn?' or 'How old are you?' - it's considered rude.",
        },
      ],
      successCriteria: [
        'Introduces self naturally without overselling',
        'Finds conversational common ground',
        'Ends interaction gracefully',
      ],
      order: 1,
    },
    {
      id: `${MODULE}-2`,
      moduleId: MODULE,
      title: 'Discussing Hobbies and Weekend Plans',
      context:
        'Casual conversations about leisure activities and plans. Building rapport through shared interests.',
      objectives: [
        'Discuss hobbies using appropriate vocabulary',
        'Ask about others\' interests genuinely',
        'Make and respond to suggestions for activities',
      ],
      practiceActivities: [
        {
          type: 'discussion',
          prompt: 'Your colleague asks what you did at the weekend',
          expectedBehaviors: ['Share briefly', 'Ask them back', 'Find connection points'],
          difficulty: 'easy',
        },
        {
          type: 'role-play',
          prompt: 'Discover you share a hobby with someone and discuss it',
          expectedBehaviors: ['Show enthusiasm appropriately', 'Exchange tips', 'Suggest meeting up'],
          difficulty: 'medium',
        },
      ],
      culturalInsights: [
        {
          topic: 'British Hobbies',
          content:
            'Gardening, walking, going to the pub, watching football, and DIY are quintessentially British pastimes. Knowing about them helps conversation.',
          importance: 'helpful',
        },
        {
          topic: 'Understated Enthusiasm',
          content:
            "Express interest with restraint: 'That sounds rather nice' or 'I'm quite into that' rather than 'OMG I LOVE THAT!'",
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Hobby Vocabulary',
          content:
            "Use 'I'm into...' or 'I'm quite keen on...' to express interest. 'I'm rather fond of...' for stronger affection.",
          examples: ["I'm into gardening", "I'm quite keen on hiking", "I'm rather fond of old films"],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Being overly enthusiastic about hobbies',
          correction: 'British modesty applies to hobbies too',
          explanation:
            "Say 'I quite enjoy tennis' rather than 'Tennis is my absolute passion!' unless you're a professional.",
        },
        {
          mistake: 'Not reciprocating questions',
          correction: 'Always ask "And you?" or "What about yourself?"',
          explanation: 'British conversation is reciprocal. Not asking back seems self-centered.',
        },
      ],
      successCriteria: [
        'Discusses hobbies with appropriate enthusiasm',
        'Shows genuine interest in others\' activities',
        'Uses British expressions for leisure activities',
      ],
      order: 2,
    },
    {
      id: `${MODULE}-3`,
      moduleId: MODULE,
      title: 'Accepting and Declining Invitations',
      context:
        'Responding to social invitations gracefully. Accepting warmly and declining without causing offense.',
      objectives: [
        'Accept invitations with appropriate enthusiasm',
        'Decline politely while preserving relationships',
        'Offer alternatives when declining',
      ],
      practiceActivities: [
        {
          type: 'role-play',
          prompt: "A colleague invites you to their birthday drinks but you can't attend",
          expectedBehaviors: ['Express regret', 'Give brief reason', 'Suggest alternative'],
          difficulty: 'medium',
        },
        {
          type: 'scenario',
          prompt: 'Accept an invitation to a dinner party and confirm details',
          expectedBehaviors: ['Show pleasure', 'Confirm date/time', 'Ask what to bring'],
          difficulty: 'easy',
        },
      ],
      culturalInsights: [
        {
          topic: 'The Soft Decline',
          content:
            "British declining is indirect. 'That sounds lovely, but I'm afraid I can't' is gentler than 'No, I can't come.'",
          importance: 'essential',
        },
        {
          topic: 'Bringing Something',
          content:
            "When invited to someone's home, always ask 'Can I bring anything?' A bottle of wine is a safe default.",
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Declining Language',
          content:
            "Use hedging: 'I'm afraid I...', 'Unfortunately...', 'I'd love to, but...' to soften refusals.",
          examples: ["I'm afraid I can't make it", "I'd love to, but I've already got plans", 'That sounds lovely, but unfortunately...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Declining with just "No" or "I can\'t"',
          correction: 'Always soften with explanation and regret',
          explanation:
            'A bare refusal sounds rude. Add "I\'m so sorry" or "What a shame" to show you value the invitation.',
        },
        {
          mistake: 'Vague acceptance without follow-up',
          correction: 'Confirm details when accepting',
          explanation:
            "Saying 'Yeah, sounds good' without confirming time/place can lead to misunderstandings.",
        },
      ],
      successCriteria: [
        'Accepts with appropriate warmth',
        'Declines politely with reason',
        'Suggests alternatives when declining',
      ],
      order: 3,
    },
    {
      id: `${MODULE}-4`,
      moduleId: MODULE,
      title: 'Making Arrangements and Suggesting Alternatives',
      context:
        'Coordinating plans with friends and colleagues. Negotiating times, places, and activities.',
      objectives: [
        'Propose meeting times and places',
        'Negotiate when initial suggestions don\'t work',
        'Confirm arrangements clearly',
      ],
      practiceActivities: [
        {
          type: 'role-play',
          prompt: 'Arrange to meet a friend for coffee next week',
          expectedBehaviors: ['Suggest options', 'Be flexible', 'Confirm final plan'],
          difficulty: 'easy',
        },
        {
          type: 'challenge',
          prompt: 'Your suggested time doesn\'t work for the other person - find an alternative',
          expectedBehaviors: ['Accept gracefully', 'Offer alternatives', 'Reach agreement'],
          difficulty: 'medium',
        },
      ],
      culturalInsights: [
        {
          topic: 'Tentative Suggestions',
          content:
            "British suggestions are often tentative: 'Would Saturday work for you?' rather than 'Let's meet Saturday.'",
          importance: 'essential',
        },
        {
          topic: 'Confirming Plans',
          content:
            "It's common to send a confirmation text on the day: 'Still on for tonight?' This isn't doubting - it's polite checking.",
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Suggestion Structures',
          content:
            "Use modal verbs: 'Shall we...?', 'Would you fancy...?', 'How about...?' for polite suggestions.",
          examples: ['Shall we say 3 o\'clock?', 'Would you fancy grabbing lunch?', 'How about the Italian place?'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Being too direct with suggestions',
          correction: 'Phrase as questions, not statements',
          explanation:
            "'Let's meet at 6' sounds demanding. 'Does 6 work for you?' gives the other person room to negotiate.",
        },
        {
          mistake: 'Not confirming before the event',
          correction: 'A brief confirmation message is expected',
          explanation:
            'British people appreciate a "See you at 7!" text on the day to confirm plans are still on.',
        },
      ],
      successCriteria: [
        'Makes tentative suggestions appropriately',
        'Negotiates alternatives flexibly',
        'Confirms arrangements clearly',
      ],
      order: 4,
    },
    {
      id: `${MODULE}-5`,
      moduleId: MODULE,
      title: 'Handling Misunderstandings Gracefully',
      context:
        'Navigating confusion, mistakes, and miscommunication without causing awkwardness or offense.',
      objectives: [
        'Clarify misunderstandings politely',
        'Apologize appropriately for confusion',
        'Move past awkward moments smoothly',
      ],
      practiceActivities: [
        {
          type: 'scenario',
          prompt: 'You arrive at the wrong café - call your friend to clarify',
          expectedBehaviors: ['Acknowledge mistake', 'Clarify location', 'Apologize briefly'],
          difficulty: 'easy',
        },
        {
          type: 'role-play',
          prompt: 'Someone misunderstands something you said - clear it up without making them feel bad',
          expectedBehaviors: ['Take some blame', 'Clarify meaning', 'Move on smoothly'],
          difficulty: 'medium',
        },
      ],
      culturalInsights: [
        {
          topic: 'Taking the Blame',
          content:
            "Even if it's not your fault, saying 'Sorry, I must not have been clear' smooths social interactions.",
          importance: 'essential',
        },
        {
          topic: 'Moving On',
          content:
            "British people prefer to move past awkwardness quickly. Don't dwell on misunderstandings - a brief 'Right, anyway...' changes the subject.",
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Clarification Phrases',
          content:
            "Use softening language: 'I think there might be a bit of confusion', 'Sorry, I meant to say...'",
          examples: ['Sorry, I think I was unclear', 'What I meant was...', 'Let me put it another way'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Blaming the other person directly',
          correction: 'Share responsibility even if not at fault',
          explanation:
            "'You got it wrong' is confrontational. 'There must have been a mix-up' is diplomatic.",
        },
        {
          mistake: 'Over-apologizing and dwelling on the mistake',
          correction: 'Acknowledge, clarify, and move on',
          explanation:
            "Endless apologies make things more awkward. A single 'Sorry about that!' is usually enough.",
        },
      ],
      successCriteria: [
        'Handles confusion without creating tension',
        'Uses diplomatic language to clarify',
        'Moves past awkward moments gracefully',
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

  console.log(`      ✅ Created ${scenarios.length} scenarios for Module 1B`);
}

