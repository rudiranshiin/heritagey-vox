import type { ErrorCategory, ErrorPattern } from '../learner/learner.types';
import type { L1Prediction, L1ChallengeMap } from './memory.types';

const L1_CHALLENGE_DATABASE: L1ChallengeMap = {
  'zh': {
    challenges: [
      {
        category: 'grammar',
        subcategory: 'articles',
        description: 'Articles (a, an, the) are difficult as Mandarin lacks them',
        tips: [
          'Practice using "a/an" for first mention, "the" for known items',
          'Remember: countable nouns need articles in singular',
        ],
      },
      {
        category: 'grammar',
        subcategory: 'plurals',
        description: 'Plural forms require practice as Mandarin uses context',
        tips: [
          'Add "-s" or "-es" to most nouns for plural',
          'Watch for irregular plurals (child/children, man/men)',
        ],
      },
      {
        category: 'pronunciation',
        subcategory: 'consonant-clusters',
        description: 'Consonant clusters at word ends can be challenging',
        tips: [
          'Practice final consonants clearly: "test", "asked"',
          'Don\'t add extra vowels between consonants',
        ],
      },
      {
        category: 'grammar',
        subcategory: 'tense',
        description: 'Verb tenses need practice as Mandarin relies on time markers',
        tips: [
          'English verb forms change for past/present/future',
          'Practice irregular past tenses regularly',
        ],
      },
    ],
  },
  'es': {
    challenges: [
      {
        category: 'grammar',
        subcategory: 'word-order',
        description: 'Adjective position differs (English: adjective before noun)',
        tips: [
          'In English, adjectives come BEFORE nouns: "red car" not "car red"',
          'Multiple adjectives follow a specific order',
        ],
      },
      {
        category: 'vocabulary',
        subcategory: 'false-friends',
        description: 'False cognates can cause confusion',
        tips: [
          '"Actual" means real, not current (use "current")',
          '"Embarazada" means pregnant, not embarrassed',
        ],
      },
      {
        category: 'pronunciation',
        subcategory: 'vowel-sounds',
        description: 'English has more vowel sounds than Spanish',
        tips: [
          'Practice distinguishing "ship/sheep", "bit/beat"',
          'English vowels have long and short versions',
        ],
      },
    ],
  },
  'ar': {
    challenges: [
      {
        category: 'pronunciation',
        subcategory: 'vowels',
        description: 'English vowel system is larger than Arabic',
        tips: [
          'Focus on short vowel sounds: /ɪ/, /ʊ/, /ə/',
          'Practice minimal pairs for vowel distinction',
        ],
      },
      {
        category: 'grammar',
        subcategory: 'verb-be',
        description: '"To be" is often omitted in Arabic present tense',
        tips: [
          'English requires "is/are/am": "He is happy" not "He happy"',
          'Practice including "be" in all present tense sentences',
        ],
      },
      {
        category: 'cultural',
        subcategory: 'directness',
        description: 'British indirectness may seem unclear',
        tips: [
          'British "Maybe" often means "No"',
          'Soften requests with "Would you mind..." or "Could you possibly..."',
        ],
      },
    ],
  },
  'hi': {
    challenges: [
      {
        category: 'pronunciation',
        subcategory: 'th-sounds',
        description: 'The "th" sounds don\'t exist in Hindi',
        tips: [
          'Practice "th" with tongue between teeth',
          'Distinguish "think" (voiceless) from "this" (voiced)',
        ],
      },
      {
        category: 'grammar',
        subcategory: 'prepositions',
        description: 'Preposition usage differs significantly',
        tips: [
          'English uses "in" for time periods, "at" for specific times',
          'Practice common preposition combinations',
        ],
      },
    ],
  },
  'ja': {
    challenges: [
      {
        category: 'pronunciation',
        subcategory: 'r-l-sounds',
        description: 'R and L distinction is challenging',
        tips: [
          'For "L", touch tongue to roof of mouth',
          'For "R", tongue doesn\'t touch anything',
        ],
      },
      {
        category: 'grammar',
        subcategory: 'articles',
        description: 'Articles don\'t exist in Japanese',
        tips: [
          'Practice using "a/an" for new information',
          'Use "the" when both speaker and listener know the referent',
        ],
      },
      {
        category: 'pragmatic',
        subcategory: 'directness',
        description: 'British style differs from Japanese indirectness patterns',
        tips: [
          'British indirectness has its own patterns',
          'Learn to decode understatement: "Not bad" = "Good"',
        ],
      },
    ],
  },
  'de': {
    challenges: [
      {
        category: 'grammar',
        subcategory: 'word-order',
        description: 'Verb position rules differ in English',
        tips: [
          'English has SVO order in most sentences',
          'Verb doesn\'t go to end in subordinate clauses',
        ],
      },
      {
        category: 'pronunciation',
        subcategory: 'w-v-sounds',
        description: 'W/V distinction needs practice',
        tips: [
          '"W" in English is like German "W"',
          '"V" in English is voiced (vocal cords vibrate)',
        ],
      },
    ],
  },
  'fr': {
    challenges: [
      {
        category: 'pronunciation',
        subcategory: 'h-sound',
        description: 'Initial "H" is pronounced in English',
        tips: [
          'English "H" is aspirated: "house", "happy"',
          'Don\'t drop the H sound at word beginnings',
        ],
      },
      {
        category: 'grammar',
        subcategory: 'present-tense',
        description: 'English uses continuous forms more than French',
        tips: [
          '"I am eating" (right now) vs "I eat" (in general)',
          'Use continuous for actions happening at this moment',
        ],
      },
    ],
  },
  'default': {
    challenges: [
      {
        category: 'grammar',
        subcategory: 'tense',
        description: 'English tense system can be complex',
        tips: [
          'Focus on the difference between simple and continuous',
          'Perfect tenses connect past to present',
        ],
      },
      {
        category: 'cultural',
        subcategory: 'politeness',
        description: 'British politeness conventions are important',
        tips: [
          'Use "please", "thank you", "sorry" frequently',
          'Soften requests with modal verbs',
        ],
      },
    ],
  },
};

export class L1Predictor {
  predictChallenges(
    nativeLanguage: string,
    existingPatterns: ErrorPattern[]
  ): L1Prediction[] {
    const langCode = this.normalizeLangCode(nativeLanguage);
    const knownChallenges = L1_CHALLENGE_DATABASE[langCode] || L1_CHALLENGE_DATABASE['default'];

    const predictions: L1Prediction[] = [];

    for (const challenge of knownChallenges.challenges) {
      const existingPattern = existingPatterns.find(
        (p) =>
          p.category === challenge.category &&
          (!challenge.subcategory || p.subcategory === challenge.subcategory)
      );

      let likelihood: 'high' | 'medium' | 'low' = 'medium';

      if (existingPattern) {
        if (existingPattern.frequency > 5 && existingPattern.trend !== 'improving') {
          likelihood = 'high';
        } else if (existingPattern.trend === 'improving') {
          likelihood = 'low';
        }
      }

      predictions.push({
        category: challenge.category,
        subcategory: challenge.subcategory,
        likelihood,
        reason: challenge.description,
        preventiveTips: challenge.tips,
      });
    }

    return predictions.sort((a, b) => {
      const order = { high: 0, medium: 1, low: 2 };
      return order[a.likelihood] - order[b.likelihood];
    });
  }

  getPreSessionTips(
    nativeLanguage: string,
    scenarioType: string,
    existingPatterns: ErrorPattern[]
  ): string[] {
    const predictions = this.predictChallenges(nativeLanguage, existingPatterns);
    const highLikelihood = predictions.filter((p) => p.likelihood === 'high');

    const tips: string[] = [];

    if (highLikelihood.length > 0) {
      const top = highLikelihood[0];
      tips.push(`Watch out for ${top.category}${top.subcategory ? ` (${top.subcategory})` : ''}`);
      tips.push(...top.preventiveTips.slice(0, 2));
    }

    const worseningPattern = existingPatterns.find((p) => p.trend === 'worsening');
    if (worseningPattern) {
      tips.push(
        `Recent challenge: ${worseningPattern.category} - let's focus on this`
      );
    }

    return tips.slice(0, 5);
  }

  getRelevantChallenges(
    nativeLanguage: string,
    category: ErrorCategory
  ): L1Prediction[] {
    const langCode = this.normalizeLangCode(nativeLanguage);
    const knownChallenges = L1_CHALLENGE_DATABASE[langCode] || L1_CHALLENGE_DATABASE['default'];

    return knownChallenges.challenges
      .filter((c) => c.category === category)
      .map((c) => ({
        category: c.category,
        subcategory: c.subcategory,
        likelihood: 'medium' as const,
        reason: c.description,
        preventiveTips: c.tips,
      }));
  }

  getSupportedLanguages(): string[] {
    return Object.keys(L1_CHALLENGE_DATABASE).filter((k) => k !== 'default');
  }

  private normalizeLangCode(language: string): string {
    const normalized = language.toLowerCase().substring(0, 2);

    const mappings: Record<string, string> = {
      chinese: 'zh',
      mandarin: 'zh',
      spanish: 'es',
      arabic: 'ar',
      hindi: 'hi',
      japanese: 'ja',
      german: 'de',
      french: 'fr',
    };

    return mappings[normalized] || normalized;
  }
}

export const l1Predictor = new L1Predictor();

