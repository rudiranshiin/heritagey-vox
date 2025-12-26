import type { SessionEventInput } from '../assessment.types';
import type { FluencyScore } from '../assessment.types';

export class FluencyScorer {
  score(events: SessionEventInput[], durationSeconds: number): FluencyScore {
    const userMessages = events.filter((e) => e.type === 'user_message');

    const speakingPace = this.calculateSpeakingPace(userMessages, durationSeconds);
    const hesitationFrequency = this.calculateHesitationFrequency(userMessages);
    const fillerUsage = this.calculateFillerUsage(userMessages);
    const naturalFlow = this.calculateNaturalFlow(userMessages);

    const score = Math.round(
      speakingPace * 0.25 + hesitationFrequency * 0.25 + fillerUsage * 0.2 + naturalFlow * 0.3
    );

    const feedback = this.generateFeedback(score, {
      speakingPace,
      hesitationFrequency,
      fillerUsage,
      naturalFlow,
    });

    return {
      score,
      components: {
        speakingPace,
        hesitationFrequency,
        fillerUsage,
        naturalFlow,
      },
      feedback,
    };
  }

  private calculateSpeakingPace(
    userMessages: SessionEventInput[],
    durationSeconds: number
  ): number {
    if (userMessages.length < 2 || durationSeconds < 60) {
      return 50;
    }

    const messagesPerMinute = userMessages.length / (durationSeconds / 60);

    if (messagesPerMinute >= 3 && messagesPerMinute <= 6) {
      return 100;
    } else if (messagesPerMinute >= 2 && messagesPerMinute <= 8) {
      return 80;
    } else if (messagesPerMinute >= 1 && messagesPerMinute <= 10) {
      return 60;
    } else {
      return 40;
    }
  }

  private calculateHesitationFrequency(userMessages: SessionEventInput[]): number {
    if (userMessages.length < 2) {
      return 50;
    }

    let longPauses = 0;
    for (let i = 1; i < userMessages.length; i++) {
      const gap =
        new Date(userMessages[i].timestamp).getTime() -
        new Date(userMessages[i - 1].timestamp).getTime();
      if (gap > 10000) {
        longPauses++;
      }
    }

    const hesitationRate = longPauses / userMessages.length;

    if (hesitationRate < 0.1) return 100;
    if (hesitationRate < 0.2) return 80;
    if (hesitationRate < 0.3) return 60;
    if (hesitationRate < 0.5) return 40;
    return 20;
  }

  private calculateFillerUsage(userMessages: SessionEventInput[]): number {
    const fillerPatterns = [
      /\bum+\b/gi,
      /\buh+\b/gi,
      /\berm+\b/gi,
      /\blike\b/gi,
      /\byou know\b/gi,
      /\bso+\b/gi,
      /\bwell+\b/gi,
      /\bbasically\b/gi,
      /\bactually\b/gi,
    ];

    let totalFillers = 0;
    let totalWords = 0;

    for (const msg of userMessages) {
      const content = (msg.data?.content as string) || '';
      const words = content.split(/\s+/).filter((w) => w.length > 0);
      totalWords += words.length;

      for (const pattern of fillerPatterns) {
        const matches = content.match(pattern);
        if (matches) {
          totalFillers += matches.length;
        }
      }
    }

    if (totalWords === 0) return 50;

    const fillerRate = totalFillers / totalWords;

    if (fillerRate < 0.02) return 100;
    if (fillerRate < 0.05) return 80;
    if (fillerRate < 0.1) return 60;
    if (fillerRate < 0.15) return 40;
    return 20;
  }

  private calculateNaturalFlow(userMessages: SessionEventInput[]): number {
    if (userMessages.length < 3) {
      return 50;
    }

    const gaps: number[] = [];
    for (let i = 1; i < userMessages.length; i++) {
      const gap =
        new Date(userMessages[i].timestamp).getTime() -
        new Date(userMessages[i - 1].timestamp).getTime();
      gaps.push(gap);
    }

    const avgGap = gaps.reduce((a, b) => a + b, 0) / gaps.length;
    const variance =
      gaps.reduce((sum, gap) => sum + Math.pow(gap - avgGap, 2), 0) / gaps.length;
    const stdDev = Math.sqrt(variance);

    const coefficientOfVariation = stdDev / avgGap;

    if (coefficientOfVariation < 0.3) return 100;
    if (coefficientOfVariation < 0.5) return 80;
    if (coefficientOfVariation < 0.7) return 60;
    if (coefficientOfVariation < 1.0) return 40;
    return 20;
  }

  private generateFeedback(
    score: number,
    components: {
      speakingPace: number;
      hesitationFrequency: number;
      fillerUsage: number;
      naturalFlow: number;
    }
  ): string {
    if (score >= 80) {
      return 'Excellent fluency! Your speech flows naturally and confidently.';
    }

    const weakest = Object.entries(components).sort((a, b) => a[1] - b[1])[0];

    switch (weakest[0]) {
      case 'speakingPace':
        return 'Try to maintain a more consistent speaking pace - not too fast, not too slow.';
      case 'hesitationFrequency':
        return 'Work on reducing long pauses. Practice helps build confidence!';
      case 'fillerUsage':
        return 'Try to reduce filler words like "um" and "like". It\'s okay to pause briefly instead.';
      case 'naturalFlow':
        return 'Focus on maintaining a natural rhythm in your speech.';
      default:
        return 'Keep practicing to improve your fluency!';
    }
  }
}

export const fluencyScorer = new FluencyScorer();

