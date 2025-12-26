import type { SessionEventInput, ErrorLogInput, AccuracyScore } from '../assessment.types';
import type { ErrorCategory } from '../../learner/learner.types';

export class AccuracyScorer {
  score(
    events: SessionEventInput[],
    errorLogs: ErrorLogInput[]
  ): AccuracyScore {
    const userMessages = events.filter((e) => e.type === 'user_message');
    const totalUtterances = userMessages.length || 1;

    const grammarErrors = errorLogs.filter((e) => e.category === 'grammar');
    const vocabErrors = errorLogs.filter((e) => e.category === 'vocabulary');
    const pronunciationErrors = errorLogs.filter((e) => e.category === 'pronunciation');
    const correctedErrors = errorLogs.filter((e) => e.corrected);

    const grammarAccuracy = this.calculateCategoryAccuracy(grammarErrors.length, totalUtterances);
    const vocabularyAccuracy = this.calculateCategoryAccuracy(vocabErrors.length, totalUtterances);
    const pronunciationAccuracy = this.calculateCategoryAccuracy(pronunciationErrors.length, totalUtterances);
    const errorRecovery = this.calculateErrorRecovery(errorLogs.length, correctedErrors.length);

    const score = Math.round(
      grammarAccuracy * 0.35 +
        vocabularyAccuracy * 0.25 +
        pronunciationAccuracy * 0.25 +
        errorRecovery * 0.15
    );

    const errorsByCategory = this.countErrorsByCategory(errorLogs);

    const feedback = this.generateFeedback(score, errorsByCategory);

    return {
      score,
      components: {
        grammarAccuracy,
        vocabularyAccuracy,
        pronunciationAccuracy,
        errorRecovery,
      },
      errorsByCategory,
      feedback,
    };
  }

  private calculateCategoryAccuracy(errorCount: number, totalUtterances: number): number {
    const errorRate = errorCount / totalUtterances;

    if (errorRate === 0) return 100;
    if (errorRate < 0.05) return 90;
    if (errorRate < 0.1) return 80;
    if (errorRate < 0.2) return 70;
    if (errorRate < 0.3) return 60;
    if (errorRate < 0.4) return 50;
    if (errorRate < 0.5) return 40;
    return 30;
  }

  private calculateErrorRecovery(totalErrors: number, correctedErrors: number): number {
    if (totalErrors === 0) return 100;

    const recoveryRate = correctedErrors / totalErrors;

    if (recoveryRate >= 0.9) return 100;
    if (recoveryRate >= 0.7) return 80;
    if (recoveryRate >= 0.5) return 60;
    if (recoveryRate >= 0.3) return 40;
    return 20;
  }

  private countErrorsByCategory(errorLogs: ErrorLogInput[]): Record<ErrorCategory, number> {
    const counts: Partial<Record<ErrorCategory, number>> = {};

    for (const error of errorLogs) {
      counts[error.category] = (counts[error.category] || 0) + 1;
    }

    return counts as Record<ErrorCategory, number>;
  }

  private generateFeedback(
    score: number,
    errorsByCategory: Record<ErrorCategory, number>
  ): string {
    if (score >= 90) {
      return 'Excellent accuracy! Very few errors and great self-correction.';
    }

    if (score >= 80) {
      return 'Good accuracy! Minor errors that don\'t impede communication.';
    }

    const topErrors = Object.entries(errorsByCategory)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2);

    if (topErrors.length === 0) {
      return 'Keep practicing to improve your accuracy!';
    }

    const mainIssue = topErrors[0][0];

    switch (mainIssue) {
      case 'grammar':
        return 'Focus on grammar patterns, especially verb tenses and articles.';
      case 'vocabulary':
        return 'Expand your vocabulary through reading and listening exercises.';
      case 'pronunciation':
        return 'Practice pronunciation by listening to native speakers and repeating.';
      case 'cultural':
        return 'Pay attention to British cultural conventions in your responses.';
      case 'pragmatic':
        return 'Work on expressing yourself more naturally in context.';
      case 'register':
        return 'Match your formality level to the situation.';
      default:
        return 'Keep practicing to improve your accuracy!';
    }
  }
}

export const accuracyScorer = new AccuracyScorer();

