import type { SessionEventInput, ErrorLogInput, AppropriracyScore } from '../assessment.types';

export class AppropriracyScorer {
  score(events: SessionEventInput[], errorLogs: ErrorLogInput[]): AppropriracyScore {
    const userMessages = events.filter((e) => e.type === 'user_message');

    const culturalErrors = errorLogs.filter((e) => e.category === 'cultural');
    const registerErrors = errorLogs.filter((e) => e.category === 'register');
    const pragmaticErrors = errorLogs.filter((e) => e.category === 'pragmatic');

    const registerMatch = this.calculateRegisterMatch(registerErrors.length, userMessages.length);
    const culturalAwareness = this.calculateCulturalAwareness(culturalErrors.length, userMessages.length);
    const politenessLevel = this.calculatePolitenessLevel(userMessages);
    const contextSuitability = this.calculateContextSuitability(pragmaticErrors.length, userMessages.length);

    const score = Math.round(
      registerMatch * 0.25 +
        culturalAwareness * 0.25 +
        politenessLevel * 0.25 +
        contextSuitability * 0.25
    );

    const feedback = this.generateFeedback(score, {
      registerMatch,
      culturalAwareness,
      politenessLevel,
      contextSuitability,
    });

    return {
      score,
      components: {
        registerMatch,
        culturalAwareness,
        politenessLevel,
        contextSuitability,
      },
      feedback,
    };
  }

  private calculateRegisterMatch(registerErrors: number, totalUtterances: number): number {
    if (totalUtterances === 0) return 50;
    const errorRate = registerErrors / totalUtterances;

    if (errorRate === 0) return 100;
    if (errorRate < 0.05) return 90;
    if (errorRate < 0.1) return 75;
    if (errorRate < 0.2) return 60;
    return 40;
  }

  private calculateCulturalAwareness(culturalErrors: number, totalUtterances: number): number {
    if (totalUtterances === 0) return 50;
    const errorRate = culturalErrors / totalUtterances;

    if (errorRate === 0) return 100;
    if (errorRate < 0.05) return 85;
    if (errorRate < 0.1) return 70;
    if (errorRate < 0.2) return 55;
    return 40;
  }

  private calculatePolitenessLevel(userMessages: SessionEventInput[]): number {
    const politePatterns = [
      /\bplease\b/gi,
      /\bthank you\b/gi,
      /\bthanks\b/gi,
      /\bsorry\b/gi,
      /\bexcuse me\b/gi,
      /\bwould you\b/gi,
      /\bcould you\b/gi,
      /\bmight i\b/gi,
      /\bi wonder if\b/gi,
      /\bwould you mind\b/gi,
      /\bi\'m afraid\b/gi,
    ];

    let politeExpressions = 0;
    let totalMessages = 0;

    for (const msg of userMessages) {
      const content = (msg.data?.content as string) || '';
      if (content.length === 0) continue;

      totalMessages++;

      for (const pattern of politePatterns) {
        if (pattern.test(content)) {
          politeExpressions++;
          break;
        }
      }
    }

    if (totalMessages === 0) return 50;

    const politenessRate = politeExpressions / totalMessages;

    if (politenessRate >= 0.5) return 100;
    if (politenessRate >= 0.3) return 80;
    if (politenessRate >= 0.2) return 65;
    if (politenessRate >= 0.1) return 50;
    return 35;
  }

  private calculateContextSuitability(pragmaticErrors: number, totalUtterances: number): number {
    if (totalUtterances === 0) return 50;
    const errorRate = pragmaticErrors / totalUtterances;

    if (errorRate === 0) return 100;
    if (errorRate < 0.05) return 85;
    if (errorRate < 0.1) return 70;
    if (errorRate < 0.2) return 55;
    return 40;
  }

  private generateFeedback(
    score: number,
    components: {
      registerMatch: number;
      culturalAwareness: number;
      politenessLevel: number;
      contextSuitability: number;
    }
  ): string {
    if (score >= 85) {
      return 'Excellent! Your language is culturally appropriate and well-suited to the context.';
    }

    if (score >= 70) {
      return 'Good appropriacy! Minor adjustments would make your language even more natural.';
    }

    const weakest = Object.entries(components).sort((a, b) => a[1] - b[1])[0];

    switch (weakest[0]) {
      case 'registerMatch':
        return 'Pay attention to formality levels - match your language to the situation.';
      case 'culturalAwareness':
        return 'Learn more about British cultural conventions and expectations.';
      case 'politenessLevel':
        return 'Try using more polite expressions like "please", "would you mind", "I wonder if".';
      case 'contextSuitability':
        return 'Consider the context more carefully when choosing how to express yourself.';
      default:
        return 'Keep practicing to improve your appropriacy!';
    }
  }
}

export const appropriacyScorer = new AppropriracyScorer();

