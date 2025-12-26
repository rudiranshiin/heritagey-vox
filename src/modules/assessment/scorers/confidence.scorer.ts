import type { SessionEventInput, ErrorLogInput, ConfidenceScore } from '../assessment.types';

export class ConfidenceScorer {
  score(events: SessionEventInput[], errorLogs: ErrorLogInput[]): ConfidenceScore {
    const userMessages = events.filter((e) => e.type === 'user_message');
    const correctionAccepted = events.filter((e) => e.type === 'correction_accepted');

    const riskTaking = this.calculateRiskTaking(userMessages);
    const selfCorrection = this.calculateSelfCorrection(errorLogs, correctionAccepted.length);
    const persistenceLevel = this.calculatePersistenceLevel(events);
    const complexityAttempts = this.calculateComplexityAttempts(userMessages);

    const score = Math.round(
      riskTaking * 0.25 +
        selfCorrection * 0.3 +
        persistenceLevel * 0.25 +
        complexityAttempts * 0.2
    );

    const feedback = this.generateFeedback(score, {
      riskTaking,
      selfCorrection,
      persistenceLevel,
      complexityAttempts,
    });

    return {
      score,
      components: {
        riskTaking,
        selfCorrection,
        persistenceLevel,
        complexityAttempts,
      },
      feedback,
    };
  }

  private calculateRiskTaking(userMessages: SessionEventInput[]): number {
    let totalWords = 0;
    let complexSentences = 0;

    const complexPatterns = [
      /\b(although|however|nevertheless|furthermore|moreover)\b/gi,
      /\b(if .+ then|when .+ will|because .+ so)\b/gi,
      /\b(not only .+ but also)\b/gi,
      /\b(on the one hand|on the other hand)\b/gi,
      /\b(as a result|in contrast|for instance)\b/gi,
    ];

    for (const msg of userMessages) {
      const content = (msg.data?.content as string) || '';
      const words = content.split(/\s+/).filter((w) => w.length > 0);
      totalWords += words.length;

      for (const pattern of complexPatterns) {
        if (pattern.test(content)) {
          complexSentences++;
          break;
        }
      }
    }

    if (userMessages.length === 0) return 50;

    const avgWordCount = totalWords / userMessages.length;
    const complexityRate = complexSentences / userMessages.length;

    let score = 50;

    if (avgWordCount >= 15) score += 25;
    else if (avgWordCount >= 10) score += 15;
    else if (avgWordCount >= 6) score += 5;

    if (complexityRate >= 0.2) score += 25;
    else if (complexityRate >= 0.1) score += 15;
    else if (complexityRate >= 0.05) score += 5;

    return Math.min(score, 100);
  }

  private calculateSelfCorrection(
    errorLogs: ErrorLogInput[],
    correctionsAccepted: number
  ): number {
    if (errorLogs.length === 0) return 100;

    const correctionRate = correctionsAccepted / errorLogs.length;

    if (correctionRate >= 0.9) return 100;
    if (correctionRate >= 0.7) return 85;
    if (correctionRate >= 0.5) return 70;
    if (correctionRate >= 0.3) return 55;
    return 40;
  }

  private calculatePersistenceLevel(events: SessionEventInput[]): number {
    const hintsRequested = events.filter((e) => e.type === 'hint_requested').length;
    const activitiesStarted = events.filter((e) => e.type === 'practice_activity_started').length;
    const activitiesCompleted = events.filter((e) => e.type === 'practice_activity_completed').length;

    let score = 70;

    if (activitiesStarted > 0) {
      const completionRate = activitiesCompleted / activitiesStarted;
      if (completionRate >= 1) score += 20;
      else if (completionRate >= 0.7) score += 10;
      else if (completionRate < 0.3) score -= 20;
    }

    if (hintsRequested > 0 && activitiesStarted > 0) {
      const hintRate = hintsRequested / activitiesStarted;
      if (hintRate > 2) score -= 15;
      else if (hintRate > 1) score -= 5;
    }

    return Math.max(Math.min(score, 100), 0);
  }

  private calculateComplexityAttempts(userMessages: SessionEventInput[]): number {
    const advancedPatterns = [
      /\b(subjunctive|conditional|passive)\b/gi,
      /\b(i wish|if only|had i known)\b/gi,
      /\b(having been|being|to have been)\b/gi,
      /\b(it is said that|it appears that|it seems)\b/gi,
      /\b(might have|could have|would have|should have)\b/gi,
      /\b(were i to|should you|had we)\b/gi,
    ];

    let complexAttempts = 0;

    for (const msg of userMessages) {
      const content = (msg.data?.content as string) || '';

      for (const pattern of advancedPatterns) {
        if (pattern.test(content)) {
          complexAttempts++;
          break;
        }
      }
    }

    if (userMessages.length === 0) return 50;

    const complexityRate = complexAttempts / userMessages.length;

    if (complexityRate >= 0.3) return 100;
    if (complexityRate >= 0.2) return 85;
    if (complexityRate >= 0.1) return 70;
    if (complexityRate >= 0.05) return 55;
    return 40;
  }

  private generateFeedback(
    score: number,
    components: {
      riskTaking: number;
      selfCorrection: number;
      persistenceLevel: number;
      complexityAttempts: number;
    }
  ): string {
    if (score >= 85) {
      return 'Excellent confidence! You take risks, learn from mistakes, and persist through challenges.';
    }

    if (score >= 70) {
      return 'Good confidence! Keep pushing yourself to try new structures and expressions.';
    }

    const weakest = Object.entries(components).sort((a, b) => a[1] - b[1])[0];

    switch (weakest[0]) {
      case 'riskTaking':
        return 'Try using longer sentences and more complex structures. It\'s okay to make mistakes!';
      case 'selfCorrection':
        return 'When you make a mistake, try to correct yourself. This shows active learning!';
      case 'persistenceLevel':
        return 'Keep going even when it gets difficult. Persistence is key to improvement!';
      case 'complexityAttempts':
        return 'Challenge yourself with more advanced grammar structures.';
      default:
        return 'Keep building your confidence through regular practice!';
    }
  }
}

export const confidenceScorer = new ConfidenceScorer();

