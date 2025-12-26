import { PrismaClient } from '@prisma/client';

const LANG = 'en-GB';
const MODULE = `${LANG}:3C`;

export async function seedScenarios3C(prisma: PrismaClient) {
  console.log('    📖 Seeding Module 3C scenarios...');

  const scenarios = [
    {
      id: `${MODULE}-1`,
      moduleId: MODULE,
      title: 'Achieving Near-Native Pronunciation',
      context:
        'Developing pronunciation that is comfortable and natural for British listeners.',
      objectives: [
        'Produce sounds accurately in connected speech',
        'Reduce L1 interference in pronunciation',
        'Be easily understood by all British listeners',
      ],
      practiceActivities: [
        {
          type: 'challenge',
          prompt: 'Read a paragraph of text with natural British pronunciation',
          expectedBehaviors: ['Clear vowels', 'Natural rhythm', 'Connected speech features'],
          difficulty: 'hard',
        },
        {
          type: 'scenario',
          prompt: 'Have a phone conversation where the other person cannot see you',
          expectedBehaviors: ['Clear articulation', 'Natural pace', 'Understandable without visual cues'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Accent Goals',
          content:
            'Perfect native accent is not necessary or expected. Clear, easily understood pronunciation is the goal.',
          importance: 'essential',
        },
        {
          topic: 'Accent Diversity',
          content:
            'Britain has enormous accent diversity. There is no single "correct" British accent.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Key Sound Distinctions',
          content:
            'British vowels differ from American: "bath" with long "a", "about" with schwa, "r" often silent.',
          examples: ['Bath/bar (long a)', 'About (schwa)', 'Car (silent r)'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Trying to sound "posh" or BBC',
          correction: 'Aim for natural and clear, not affected',
          explanation:
            'Exaggerated RP (Received Pronunciation) sounds artificial. Natural clarity is better.',
        },
        {
          mistake: 'Neglecting connected speech',
          correction: 'Practice how words link together',
          explanation:
            'Native speech connects words: "an apple" sounds like "anapple". Practice linking.',
        },
      ],
      successCriteria: [
        'Produces clear, understandable pronunciation',
        'Uses natural connected speech',
        'Reduces L1 interference',
      ],
      order: 1,
    },
    {
      id: `${MODULE}-2`,
      moduleId: MODULE,
      title: 'Using Appropriate Intonation for All Speech Acts',
      context:
        'Applying correct intonation patterns for questions, statements, emphasis, and emotional expression.',
      objectives: [
        'Use rising and falling intonation appropriately',
        'Express meaning through intonation',
        'Avoid flat or monotonous delivery',
      ],
      practiceActivities: [
        {
          type: 'challenge',
          prompt: 'Say the same sentence with different intonations to change meaning',
          expectedBehaviors: ['Vary pitch meaningfully', 'Express different attitudes', 'Control prosody'],
          difficulty: 'hard',
        },
        {
          type: 'scenario',
          prompt: 'Use intonation to show surprise, doubt, and certainty',
          expectedBehaviors: ['Appropriate pitch patterns', 'Clear emotional expression', 'Natural delivery'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'British Intonation',
          content:
            'British English often has more pitch movement than some languages. Flat intonation can sound bored or rude.',
          importance: 'essential',
        },
        {
          topic: 'Question Intonation',
          content:
            'Yes/no questions rise. Wh-questions often fall. Statement questions (checking) rise.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Intonation Patterns',
          content:
            'Statements fall. Yes/no questions rise. Tag questions rise for uncertainty, fall for confirmation.',
          examples: ['Statement: falling', 'Yes/no question: rising', 'Tag question: varies'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Using L1 intonation patterns',
          correction: 'Learn British-specific patterns',
          explanation:
            'Intonation transfers from L1 and can cause misunderstanding. British patterns differ.',
        },
        {
          mistake: 'Monotonous delivery',
          correction: 'Vary pitch to express meaning',
          explanation:
            'Flat delivery sounds bored or robotic. Natural speech has melody.',
        },
      ],
      successCriteria: [
        'Uses appropriate intonation patterns',
        'Expresses meaning through pitch',
        'Sounds natural and engaged',
      ],
      order: 2,
    },
    {
      id: `${MODULE}-3`,
      moduleId: MODULE,
      title: 'Demonstrating Natural Rhythm and Pacing',
      context:
        'Producing speech with native-like rhythm, stress, and timing.',
      objectives: [
        'Use stress-timed rhythm naturally',
        'Pace speech appropriately for context',
        'Balance speech rate with clarity',
      ],
      practiceActivities: [
        {
          type: 'challenge',
          prompt: 'Deliver the same message slowly and quickly while remaining natural',
          expectedBehaviors: ['Maintain clarity at both speeds', 'Keep natural rhythm', 'Adjust appropriately'],
          difficulty: 'hard',
        },
        {
          type: 'scenario',
          prompt: 'Tell a story with appropriate pacing for tension and resolution',
          expectedBehaviors: ['Vary pace for effect', 'Use pauses effectively', 'Build and release tension'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Stress-Timed Rhythm',
          content:
            'English is stress-timed: stressed syllables come at roughly regular intervals. Unstressed syllables are compressed.',
          importance: 'essential',
        },
        {
          topic: 'Strategic Pauses',
          content:
            'Pauses create emphasis and give listeners time to process. British speakers use them strategically.',
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Rhythm Features',
          content:
            'Content words stressed, function words reduced. "I\'m going to the shop" = "I\'m gonna the shop".',
          examples: ['Gonna (going to)', 'Wanna (want to)', 'Shoulda (should have)'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Giving equal stress to all syllables',
          correction: 'Stress content words, reduce function words',
          explanation:
            'Syllable-timed rhythm sounds foreign in English. Learn which words to stress.',
        },
        {
          mistake: 'Speaking too fast without variation',
          correction: 'Vary pace and use pauses',
          explanation:
            'Constant fast speech is hard to follow. Strategic slowing and pausing aids comprehension.',
        },
      ],
      successCriteria: [
        'Uses stress-timed rhythm',
        'Paces speech appropriately',
        'Uses pauses effectively',
      ],
      order: 3,
    },
    {
      id: `${MODULE}-4`,
      moduleId: MODULE,
      title: 'Expressing Emotional Range Through Prosody',
      context:
        'Conveying emotions, attitudes, and subtle meanings through voice features.',
      objectives: [
        'Express emotions through voice quality',
        'Use prosody to convey attitude',
        'Match voice to emotional content',
      ],
      practiceActivities: [
        {
          type: 'role-play',
          prompt: 'Express sympathy, excitement, and concern through voice alone',
          expectedBehaviors: ['Match tone to emotion', 'Use appropriate pitch and pace', 'Sound genuine'],
          difficulty: 'hard',
        },
        {
          type: 'challenge',
          prompt: 'Convey sarcasm without changing words, only through prosody',
          expectedBehaviors: ['Use tone to signal intent', 'Maintain subtlety', 'Be understood'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'British Emotional Expression',
          content:
            'British emotional expression is often understated. Slight voice changes convey significant meaning.',
          importance: 'essential',
        },
        {
          topic: 'Prosodic Cues',
          content:
            'Pitch height, range, pace, and pause length all carry emotional meaning.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Emotional Prosody',
          content:
            'Sympathy: lower pitch, slower. Excitement: higher pitch, faster. Concern: varied pitch, careful pace.',
          examples: ['Sympathy: softer, slower', 'Excitement: faster, higher', 'Concern: careful, variable'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Over-expressing emotions in voice',
          correction: 'British style is often understated',
          explanation:
            'Excessive emotional expression can seem theatrical. Subtle changes are often sufficient.',
        },
        {
          mistake: 'Mismatching emotion and prosody',
          correction: 'Voice should match content',
          explanation:
            'Delivering sad news with bright voice is jarring. Emotional congruence is important.',
        },
      ],
      successCriteria: [
        'Expresses emotions through voice naturally',
        'Uses subtle prosodic cues',
        'Matches voice to content appropriately',
      ],
      order: 4,
    },
    {
      id: `${MODULE}-5`,
      moduleId: MODULE,
      title: 'Adjusting Accent for Clarity When Needed',
      context:
        'Modifying pronunciation strategically to ensure understanding in challenging situations.',
      objectives: [
        'Identify when clarity adjustments are needed',
        'Modify pronunciation for different listeners',
        'Balance natural speech with intelligibility',
      ],
      practiceActivities: [
        {
          type: 'scenario',
          prompt: 'Communicate with someone who is having difficulty understanding you',
          expectedBehaviors: ['Identify comprehension issues', 'Adjust speech appropriately', 'Maintain naturalness'],
          difficulty: 'hard',
        },
        {
          type: 'challenge',
          prompt: 'Spell a name or technical term clearly over the phone',
          expectedBehaviors: ['Articulate clearly', 'Use phonetic alphabet if needed', 'Confirm understanding'],
          difficulty: 'medium',
        },
      ],
      culturalInsights: [
        {
          topic: 'Accommodation',
          content:
            'Native speakers naturally adjust their speech for different listeners. This is a sophisticated skill.',
          importance: 'essential',
        },
        {
          topic: 'Clarity vs Naturalness',
          content:
            'Over-articulation sounds condescending. The goal is effortless clarity, not exaggerated speech.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Clarity Strategies',
          content:
            'Slow slightly, reduce contractions, pronounce endings clearly. "Going to" not "gonna" when clarity needed.',
          examples: ['Fewer contractions', 'Clearer endings', 'Strategic pausing'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Shouting to be understood',
          correction: 'Slower and clearer, not louder',
          explanation:
            'Volume doesn\'t help comprehension. Clear articulation and pacing do.',
        },
        {
          mistake: 'Being patronizing when adjusting',
          correction: 'Adjust naturally without being obvious',
          explanation:
            'Exaggerated simplification is insulting. Subtle adjustments are respectful.',
        },
      ],
      successCriteria: [
        'Adjusts speech for clarity when needed',
        'Maintains naturalness while being clear',
        'Respects listeners while accommodating',
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

  console.log(`      ✅ Created ${scenarios.length} scenarios for Module 3C`);
}

