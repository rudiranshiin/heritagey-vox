import { errorLogService } from '../memory/error-log.service';
import { memoryService } from '../memory/memory.service';
import { errorPatternAnalyzer } from '../memory/error-pattern.analyzer';
import { sessionCache } from './session.cache';
import type { CreateErrorLogDTO } from '../memory/memory.types';
import type { ErrorPattern, ErrorCategory } from '../learner/learner.types';

export interface ErrorFeedback {
  immediateCorrection: string;
  explanation: string;
  relatedTip?: string;
  patternWarning?: string;
}

export interface ErrorContext {
  learnerId: string;
  languageCode: string;
  sessionId: string;
  category: ErrorCategory;
  subcategory?: string;
  context: string;
}

export class RealtimeErrorHandler {
  async handleError(sessionId: string, errorContext: ErrorContext): Promise<ErrorFeedback> {
    await errorLogService.create({
      learnerId: errorContext.learnerId,
      languageCode: errorContext.languageCode,
      sessionId: errorContext.sessionId,
      category: errorContext.category,
      subcategory: errorContext.subcategory,
      context: errorContext.context,
    });

    await memoryService.addErrorPattern(
      errorContext.learnerId,
      errorContext.languageCode,
      errorContext.category,
      errorContext.subcategory,
      errorContext.context
    );

    await sessionCache.incrementErrorsCount(sessionId);

    const feedback = await this.generateFeedback(errorContext);

    return feedback;
  }

  private async generateFeedback(errorContext: ErrorContext): Promise<ErrorFeedback> {
    const patterns = await memoryService.getErrorPatterns(
      errorContext.learnerId,
      errorContext.languageCode
    );

    const currentPattern = patterns.find(
      (p) =>
        p.category === errorContext.category &&
        p.subcategory === errorContext.subcategory
    );

    let patternWarning: string | undefined;
    if (currentPattern && currentPattern.frequency >= 3) {
      if (currentPattern.trend === 'worsening') {
        patternWarning = `This is a recurring challenge for you. Let's work on it together!`;
      } else if (currentPattern.trend === 'stable' && currentPattern.frequency >= 5) {
        patternWarning = `You've had this error before. Pay special attention to this area.`;
      }
    }

    const feedback = this.getErrorFeedback(errorContext.category, errorContext.subcategory);

    return {
      ...feedback,
      patternWarning,
    };
  }

  private getErrorFeedback(
    category: ErrorCategory,
    subcategory?: string
  ): Omit<ErrorFeedback, 'patternWarning'> {
    const feedbackMap: Record<string, Omit<ErrorFeedback, 'patternWarning'>> = {
      'grammar:articles': {
        immediateCorrection: 'Remember to use the correct article here.',
        explanation: 'In British English, articles (a, an, the) are essential for noun phrases.',
        relatedTip: "Use 'a' before consonant sounds, 'an' before vowel sounds.",
      },
      'grammar:tense': {
        immediateCorrection: 'Check your verb tense here.',
        explanation: 'The verb form needs to match the time frame of the action.',
        relatedTip: 'Consider when the action happened - past, present, or future.',
      },
      'grammar:word-order': {
        immediateCorrection: 'The word order needs adjustment.',
        explanation: 'English typically follows Subject-Verb-Object order.',
        relatedTip: 'Adjectives come before nouns in English.',
      },
      vocabulary: {
        immediateCorrection: "There's a more suitable word choice here.",
        explanation: 'Word choice affects how natural your speech sounds.',
        relatedTip: 'Consider the context and formality level.',
      },
      pronunciation: {
        immediateCorrection: 'Pay attention to the pronunciation here.',
        explanation: 'Clear pronunciation helps with being understood.',
        relatedTip: 'Listen to native speakers and practice the sound.',
      },
      cultural: {
        immediateCorrection: 'Consider the cultural context here.',
        explanation: 'British culture has specific conventions for this situation.',
        relatedTip: 'When in doubt, err on the side of politeness.',
      },
      pragmatic: {
        immediateCorrection: 'The phrasing could be more appropriate.',
        explanation: 'How you say something matters as much as what you say.',
        relatedTip: 'British English often uses indirect language.',
      },
      register: {
        immediateCorrection: 'The formality level might not match the context.',
        explanation: 'Different situations call for different levels of formality.',
        relatedTip: 'Match your language to your audience and setting.',
      },
    };

    const key = subcategory ? `${category}:${subcategory}` : category;
    return (
      feedbackMap[key] ||
      feedbackMap[category] || {
        immediateCorrection: "Let's work on this together.",
        explanation: 'Practice makes perfect!',
      }
    );
  }

  async getSessionErrorSummary(sessionId: string): Promise<{
    totalErrors: number;
    byCategory: Record<ErrorCategory, number>;
    mostFrequent: { category: ErrorCategory; count: number } | null;
    suggestions: string[];
  }> {
    const errors = await errorLogService.getBySession(sessionId);

    const byCategory: Partial<Record<ErrorCategory, number>> = {};
    for (const error of errors) {
      const cat = error.category as ErrorCategory;
      byCategory[cat] = (byCategory[cat] || 0) + 1;
    }

    let mostFrequent: { category: ErrorCategory; count: number } | null = null;
    for (const [category, count] of Object.entries(byCategory)) {
      if (!mostFrequent || count > mostFrequent.count) {
        mostFrequent = { category: category as ErrorCategory, count };
      }
    }

    const suggestions: string[] = [];
    if (mostFrequent) {
      suggestions.push(`Focus on ${mostFrequent.category} - it came up ${mostFrequent.count} times`);
    }
    if (errors.length > 5) {
      suggestions.push("Consider slowing down and focusing on accuracy");
    }
    if (errors.length === 0) {
      suggestions.push("Great session! Your accuracy is excellent");
    }

    return {
      totalErrors: errors.length,
      byCategory: byCategory as Record<ErrorCategory, number>,
      mostFrequent,
      suggestions,
    };
  }

  async checkForPatternBreakthrough(
    learnerId: string,
    languageCode: string,
    category: ErrorCategory,
    subcategory?: string
  ): Promise<{ isBreakthrough: boolean; message?: string }> {
    const patterns = await memoryService.getErrorPatterns(learnerId, languageCode);
    const pattern = patterns.find(
      (p) => p.category === category && p.subcategory === subcategory
    );

    if (!pattern) {
      return { isBreakthrough: false };
    }

    if (pattern.trend === 'improving' && pattern.recentCount === 0) {
      return {
        isBreakthrough: true,
        message: `Amazing progress on ${category}! You haven't made this error recently.`,
      };
    }

    return { isBreakthrough: false };
  }
}

export const realtimeErrorHandler = new RealtimeErrorHandler();

