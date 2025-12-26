import type { ErrorPattern, ErrorCategory } from '../learner/learner.types';
import type { TrendAnalysis, ErrorStats } from './memory.types';

export class ErrorPatternAnalyzer {
  analyzeTrends(
    patterns: ErrorPattern[],
    windowDays: number = 7
  ): TrendAnalysis[] {
    const now = new Date();
    const windowStart = new Date(now.getTime() - windowDays * 24 * 60 * 60 * 1000);
    const previousWindowStart = new Date(windowStart.getTime() - windowDays * 24 * 60 * 60 * 1000);

    return patterns.map((pattern) => {
      const recentExamples = pattern.examples.filter(
        (e) => new Date(e.timestamp) >= windowStart
      );
      const previousExamples = pattern.examples.filter(
        (e) => new Date(e.timestamp) >= previousWindowStart && new Date(e.timestamp) < windowStart
      );

      const currentCount = recentExamples.length;
      const previousCount = previousExamples.length;

      let trend: 'improving' | 'stable' | 'worsening' = 'stable';
      let percentageChange = 0;

      if (previousCount > 0) {
        percentageChange = ((currentCount - previousCount) / previousCount) * 100;

        if (percentageChange <= -20) {
          trend = 'improving';
        } else if (percentageChange >= 20) {
          trend = 'worsening';
        }
      } else if (currentCount > 0) {
        trend = 'worsening';
        percentageChange = 100;
      }

      return {
        category: pattern.category,
        subcategory: pattern.subcategory,
        trend,
        windowSize: windowDays,
        previousCount,
        currentCount,
        percentageChange,
      };
    });
  }

  calculateStats(patterns: ErrorPattern[]): ErrorStats {
    const totalErrors = patterns.reduce((sum, p) => sum + p.frequency, 0);

    const errorsByCategory = patterns.reduce(
      (acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + p.frequency;
        return acc;
      },
      {} as Record<ErrorCategory, number>
    );

    const recentErrorRate = patterns.reduce((sum, p) => sum + p.recentCount, 0);

    const mostCommonErrors = [...patterns]
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 5)
      .map((p) => ({
        category: p.category,
        subcategory: p.subcategory,
        count: p.frequency,
        trend: p.trend,
      }));

    return {
      totalErrors,
      errorsByCategory,
      recentErrorRate,
      mostCommonErrors,
    };
  }

  findPersistentErrors(
    patterns: ErrorPattern[],
    minOccurrences: number = 5
  ): ErrorPattern[] {
    return patterns.filter(
      (p) => p.frequency >= minOccurrences && p.trend !== 'improving'
    );
  }

  findImprovingAreas(patterns: ErrorPattern[]): ErrorPattern[] {
    return patterns.filter((p) => p.trend === 'improving');
  }

  findWorseningAreas(patterns: ErrorPattern[]): ErrorPattern[] {
    return patterns.filter((p) => p.trend === 'worsening');
  }

  suggestFocusAreas(patterns: ErrorPattern[]): {
    primary: ErrorPattern | null;
    secondary: ErrorPattern[];
    improving: ErrorPattern[];
  } {
    const worsening = this.findWorseningAreas(patterns);
    const persistent = this.findPersistentErrors(patterns);
    const improving = this.findImprovingAreas(patterns);

    const prioritized = [...new Set([...worsening, ...persistent])].sort(
      (a, b) => {
        if (a.trend === 'worsening' && b.trend !== 'worsening') return -1;
        if (b.trend === 'worsening' && a.trend !== 'worsening') return 1;
        return b.recentCount - a.recentCount;
      }
    );

    return {
      primary: prioritized[0] || null,
      secondary: prioritized.slice(1, 4),
      improving,
    };
  }

  generateFeedback(patterns: ErrorPattern[]): string[] {
    const feedback: string[] = [];
    const stats = this.calculateStats(patterns);
    const focus = this.suggestFocusAreas(patterns);

    if (focus.improving.length > 0) {
      feedback.push(
        `Great progress on ${focus.improving.map((p) => p.category).join(', ')}!`
      );
    }

    if (focus.primary) {
      feedback.push(
        `Let's focus on ${focus.primary.category}${focus.primary.subcategory ? ` (${focus.primary.subcategory})` : ''} this session.`
      );
    }

    if (stats.mostCommonErrors.length > 0) {
      const topError = stats.mostCommonErrors[0];
      feedback.push(
        `Most common challenge: ${topError.category}${topError.subcategory ? ` - ${topError.subcategory}` : ''}`
      );
    }

    return feedback;
  }

  updatePatternTrends(patterns: ErrorPattern[]): ErrorPattern[] {
    const trends = this.analyzeTrends(patterns);

    return patterns.map((pattern) => {
      const trend = trends.find(
        (t) =>
          t.category === pattern.category &&
          t.subcategory === pattern.subcategory
      );

      return {
        ...pattern,
        trend: trend?.trend || pattern.trend,
      };
    });
  }
}

export const errorPatternAnalyzer = new ErrorPatternAnalyzer();

