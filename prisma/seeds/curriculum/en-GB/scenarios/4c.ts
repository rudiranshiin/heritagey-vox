import { PrismaClient } from '@prisma/client';

const LANG = 'en-GB';
const MODULE = `${LANG}:4C`;

export async function seedScenarios4C(prisma: PrismaClient) {
  console.log('    📖 Seeding Module 4C scenarios...');

  const scenarios = [
    {
      id: `${MODULE}-1`,
      moduleId: MODULE,
      title: 'Functioning as Cultural Insider',
      context: 'Operating in British contexts with the ease and fluency of a cultural insider.',
      objectives: [
        'Navigate all British social contexts naturally',
        'Be accepted as culturally fluent',
        'Contribute to British cultural life',
      ],
      practiceActivities: [
        {
          type: 'challenge',
          prompt: 'Navigate a complex British social situation with complete ease',
          expectedBehaviors: [
            'Instinctive appropriate response',
            'Cultural fluency',
            'Natural integration',
          ],
          difficulty: 'hard',
        },
        {
          type: 'scenario',
          prompt: 'Host British guests and make them feel at ease',
          expectedBehaviors: [
            'Cultural sensitivity',
            'Appropriate hospitality',
            'Natural interaction',
          ],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Insider Status',
          content:
            'Cultural insider means understanding unwritten rules, shared references, and implicit expectations.',
          importance: 'essential',
        },
        {
          topic: 'Natural Integration',
          content:
            'True fluency means not thinking about cultural rules - just doing what feels natural.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Automatic Responses',
          content:
            '"Sorry" when someone bumps into you, "Cheers" for thanks, "Right" to signal moving on - these are automatic.',
          examples: [
            'Sorry (when bumped)',
            'Cheers (thanks)',
            'Right (moving on)',
            'Ta (casual thanks)',
          ],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Still thinking explicitly about cultural rules',
          correction: 'Cultural fluency should be automatic',
          explanation:
            'If you\'re still consciously thinking "British people do X", you\'re not yet at insider level.',
        },
        {
          mistake: 'Over-performing British-ness',
          correction: 'Be yourself within British culture',
          explanation:
            "Cultural fluency isn't performance. It's integrating British ways into your authentic self.",
        },
      ],
      successCriteria: [
        'Functions naturally in all British contexts',
        'Responds automatically appropriately',
        'Is accepted as culturally fluent',
      ],
      order: 1,
    },
    {
      id: `${MODULE}-2`,
      moduleId: MODULE,
      title: 'Contributing to British Cultural Discourse',
      context:
        'Participating in and contributing to British public discourse and cultural conversations.',
      objectives: [
        'Contribute to public discussions on British topics',
        'Engage with current cultural debates',
        'Add perspective to British conversations',
      ],
      practiceActivities: [
        {
          type: 'challenge',
          prompt: 'Contribute a thoughtful perspective to a current British cultural debate',
          expectedBehaviors: ['Informed view', 'Cultural sensitivity', 'Valuable contribution'],
          difficulty: 'hard',
        },
        {
          type: 'discussion',
          prompt: 'Discuss what it means to be British in contemporary society',
          expectedBehaviors: ['Nuanced perspective', 'Acknowledge complexity', 'Add insight'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Public Discourse',
          content:
            'British public discourse happens through newspapers, radio (especially BBC Radio 4), TV, and increasingly social media.',
          importance: 'essential',
        },
        {
          topic: 'Valued Contributions',
          content:
            'Outsider perspectives can add value to British discourse when offered with respect and knowledge.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Public Discourse Language',
          content:
            '"One might argue...", "It\'s worth considering...", "There\'s a case to be made for..." - measured contribution language.',
          examples: [
            'One might argue that...',
            "It's worth considering...",
            "There's a case to be made...",
          ],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Contributing without sufficient understanding',
          correction: 'Listen extensively before speaking',
          explanation:
            'Uninformed contributions are easily spotted. Deep understanding precedes valuable contribution.',
        },
        {
          mistake: 'Over-emphasizing outsider status',
          correction: 'Contribute as participant, not observer',
          explanation:
            'Constant references to being an outsider limit integration. Participate as a member.',
        },
      ],
      successCriteria: [
        'Contributes meaningfully to British discourse',
        'Engages with cultural debates knowledgeably',
        'Adds valuable perspectives',
      ],
      order: 2,
    },
    {
      id: `${MODULE}-3`,
      moduleId: MODULE,
      title: 'Teaching British Culture and English',
      context: 'Being able to teach British English and culture to others effectively.',
      objectives: [
        'Teach British English effectively',
        'Explain British culture to learners',
        'Bridge understanding between cultures',
      ],
      practiceActivities: [
        {
          type: 'challenge',
          prompt: 'Design and deliver a lesson on a British cultural topic',
          expectedBehaviors: ['Accurate content', 'Clear explanation', 'Engaging delivery'],
          difficulty: 'hard',
        },
        {
          type: 'scenario',
          prompt: 'Help someone prepare for life in Britain',
          expectedBehaviors: ['Practical advice', 'Cultural preparation', 'Language guidance'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Cultural Teaching',
          content:
            'Teaching culture requires explaining the "why" behind behaviors, not just the "what".',
          importance: 'essential',
        },
        {
          topic: 'Experience-Based Teaching',
          content:
            'Your journey to fluency provides valuable teaching material. Share what helped you.',
          importance: 'helpful',
        },
      ],
      grammarNotes: [
        {
          topic: 'Teaching Language',
          content:
            '"In British culture, we often...", "This might seem strange, but...", "The reason British people do this is..."',
          examples: [
            'In British culture...',
            'The reason for this is...',
            "You'll find that British people...",
          ],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Teaching stereotypes rather than nuance',
          correction: 'Present accurate, nuanced cultural information',
          explanation:
            'Stereotypes oversimplify. Good teaching acknowledges diversity and complexity.',
        },
        {
          mistake: 'Not relating to learner experience',
          correction: 'Connect British culture to learner background',
          explanation:
            'Effective teaching bridges from what learners know to what they need to learn.',
        },
      ],
      successCriteria: [
        'Teaches British English effectively',
        'Explains culture clearly',
        'Bridges cultural understanding',
      ],
      order: 3,
    },
    {
      id: `${MODULE}-4`,
      moduleId: MODULE,
      title: 'Maintaining and Developing Proficiency',
      context: 'Continuing to grow and maintain native-like proficiency over time.',
      objectives: [
        'Maintain high level of British English',
        'Continue developing and learning',
        'Stay current with language evolution',
      ],
      practiceActivities: [
        {
          type: 'discussion',
          prompt: 'Discuss how you maintain and develop your British English proficiency',
          expectedBehaviors: [
            'Reflect on learning',
            'Share strategies',
            'Demonstrate ongoing commitment',
          ],
          difficulty: 'medium',
        },
        {
          type: 'challenge',
          prompt: 'Engage with very current British content and new language trends',
          expectedBehaviors: ['Current awareness', 'Openness to new forms', 'Critical engagement'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Lifelong Learning',
          content:
            'Even native speakers continue learning. New words, changing norms, evolving culture - learning never stops.',
          importance: 'essential',
        },
        {
          topic: 'Staying Current',
          content:
            'Regular engagement with British media, people, and culture keeps language fresh and current.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Current Language',
          content:
            'New words and meanings emerge constantly. Stay open to "new" British English while maintaining core proficiency.',
          examples: ['New slang terms', 'Evolving meanings', 'Emerging expressions'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Assuming proficiency is permanent',
          correction: 'Language proficiency needs maintenance',
          explanation:
            'Without ongoing use and exposure, proficiency can decline. Continued engagement is necessary.',
        },
        {
          mistake: 'Resisting language change',
          correction: 'Embrace evolution while knowing standards',
          explanation:
            'Language changes. Being proficient means staying current, not frozen in one era.',
        },
      ],
      successCriteria: [
        'Maintains high proficiency over time',
        'Continues learning and developing',
        'Stays current with language change',
      ],
      order: 4,
    },
    {
      id: `${MODULE}-5`,
      moduleId: MODULE,
      title: 'Integrating British English into Identity',
      context:
        'Making British English a natural part of your multilingual, multicultural identity.',
      objectives: [
        'Integrate British English into personal identity',
        'Balance multiple linguistic identities',
        'Achieve authentic bicultural/multicultural fluency',
      ],
      practiceActivities: [
        {
          type: 'discussion',
          prompt: 'Reflect on how British English has become part of who you are',
          expectedBehaviors: [
            'Personal reflection',
            'Identity integration',
            'Authentic expression',
          ],
          difficulty: 'hard',
        },
        {
          type: 'challenge',
          prompt: 'Express your multicultural identity through British English',
          expectedBehaviors: ['Authentic voice', 'Cultural integration', 'Personal expression'],
          difficulty: 'hard',
        },
      ],
      culturalInsights: [
        {
          topic: 'Multicultural Britain',
          content:
            'Modern Britain is multicultural. Your multilingual identity enriches British culture, not contradicts it.',
          importance: 'essential',
        },
        {
          topic: 'Authentic Integration',
          content:
            'True proficiency means British English feels like yours - not an act or a performance.',
          importance: 'essential',
        },
      ],
      grammarNotes: [
        {
          topic: 'Identity Language',
          content:
            'Expressing identity: "As someone who...", "In my experience...", "Part of who I am is..."',
          examples: ['As someone who...', 'Part of who I am...', 'In my experience as...'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Feeling you must choose between identities',
          correction: 'Multilingual identity is additive, not replacement',
          explanation:
            "British English adds to who you are. It doesn't replace your other languages and cultures.",
        },
        {
          mistake: 'Performing rather than being',
          correction: 'Let British English be authentically yours',
          explanation:
            "The goal isn't to pretend to be British. It's to be yourself, fluently, in British English.",
        },
      ],
      successCriteria: [
        'Has integrated British English into identity',
        'Expresses authentic multilingual self',
        'Demonstrates complete, natural proficiency',
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

  console.log(`      ✅ Created ${scenarios.length} scenarios for Module 4C`);
}
