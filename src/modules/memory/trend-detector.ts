import type { ErrorPattern, ErrorCategory } from '../learner/learner.types';
import type { TrendAnalysis } from './memory.types';

export interface TrendWindow {
  startDate: Date;
  endDate: Date;
  errorCount: number;
  categories: Record<ErrorCategory, number>;
}

export interface TrendReport {
  overallTrend: 'improving' | 'stable' | 'worsening';
  categoryTrends: TrendAnalysis[];
  recommendations: string[];
  significantChanges: {
    category: ErrorCategory;
    subcategory?: string;
    direction: 'better' | 'worse';
    magnitude: 'slight' | 'moderate' | 'significant';
  }[];
}

export class TrendDetector {
  private readonly DEFAULT_WINDOW_SIZE = 7;
  private readonly IMPROVEMENT_THRESHOLD = -20;
  private readonly WORSENING_THRESHOLD = 20;

  analyzePatterns(
    patterns: ErrorPattern[],
    windowDays: number = this.DEFAULT_WINDOW_SIZE
  ): TrendReport {
    const categoryTrends = this.calculateCategoryTrends(patterns, windowDays);
    const overallTrend = this.calculateOverallTrend(categoryTrends);
    const significantChanges = this.findSignificantChanges(categoryTrends);
    const recommendations = this.generateRecommendations(categoryTrends, significantChanges);

    return {
      overallTrend,
      categoryTrends,
      recommendations,
      significantChanges,
    };
  }

  calculateCategoryTrends(patterns: ErrorPattern[], windowDays: number): TrendAnalysis[] {
    const now = new Date();
    const windowStart = new Date(now.getTime() - windowDays * 24 * 60 * 60 * 1000);
    const previousWindowStart = new Date(windowStart.getTime() - windowDays * 24 * 60 * 60 * 1000);

    return patterns.map((pattern) => {
      const currentExamples = pattern.examples.filter((e) => new Date(e.timestamp) >= windowStart);
      const previousExamples = pattern.examples.filter(
        (e) => new Date(e.timestamp) >= previousWindowStart && new Date(e.timestamp) < windowStart
      );

      const currentCount = currentExamples.length;
      const previousCount = previousExamples.length;

      let percentageChange = 0;
      if (previousCount > 0) {
        percentageChange = ((currentCount - previousCount) / previousCount) * 100;
      } else if (currentCount > 0) {
        percentageChange = 100;
      }

      let trend: 'improving' | 'stable' | 'worsening' = 'stable';
      if (percentageChange <= this.IMPROVEMENT_THRESHOLD) {
        trend = 'improving';
      } else if (percentageChange >= this.WORSENING_THRESHOLD) {
        trend = 'worsening';
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

  calculateOverallTrend(trends: TrendAnalysis[]): 'improving' | 'stable' | 'worsening' {
    if (trends.length === 0) return 'stable';

    const totalCurrentErrors = trends.reduce((sum, t) => sum + t.currentCount, 0);
    const totalPreviousErrors = trends.reduce((sum, t) => sum + t.previousCount, 0);

    if (totalPreviousErrors === 0) {
      return totalCurrentErrors === 0 ? 'stable' : 'worsening';
    }

    const overallChange = ((totalCurrentErrors - totalPreviousErrors) / totalPreviousErrors) * 100;

    if (overallChange <= this.IMPROVEMENT_THRESHOLD) {
      return 'improving';
    } else if (overallChange >= this.WORSENING_THRESHOLD) {
      return 'worsening';
    }

    return 'stable';
  }

  findSignificantChanges(trends: TrendAnalysis[]): TrendReport['significantChanges'] {
    return trends
      .filter((t) => Math.abs(t.percentageChange) >= 30)
      .map((t) => {
        let magnitude: 'slight' | 'moderate' | 'significant' = 'slight';
        const absChange = Math.abs(t.percentageChange);

        if (absChange >= 70) {
          magnitude = 'significant';
        } else if (absChange >= 50) {
          magnitude = 'moderate';
        }

        return {
          category: t.category,
          subcategory: t.subcategory,
          direction: t.percentageChange < 0 ? ('better' as const) : ('worse' as const),
          magnitude,
        };
      })
      .sort((a, b) => {
        const magnitudeOrder = { significant: 0, moderate: 1, slight: 2 };
        return magnitudeOrder[a.magnitude] - magnitudeOrder[b.magnitude];
      });
  }

  generateRecommendations(
    trends: TrendAnalysis[],
    significantChanges: TrendReport['significantChanges']
  ): string[] {
    const recommendations: string[] = [];

    const improving = significantChanges.filter((c) => c.direction === 'better');
    const worsening = significantChanges.filter((c) => c.direction === 'worse');

    if (worsening.length > 0) {
      const worst = worsening[0];
      recommendations.push(
        `Focus on ${worst.category}${worst.subcategory ? ` (${worst.subcategory})` : ''} - this area needs attention`
      );
    }

    if (improving.length > 0) {
      const best = improving[0];
      recommendations.push(
        `Great progress on ${best.category}${best.subcategory ? ` (${best.subcategory})` : ''}! Keep practicing`
      );
    }

    const persistentIssues = trends.filter((t) => t.currentCount >= 3 && t.trend !== 'improving');
    if (persistentIssues.length > 0 && recommendations.length < 3) {
      const persistent = persistentIssues[0];
      recommendations.push(
        `${persistent.category} has been a consistent challenge - try different practice approaches`
      );
    }

    const noErrors = trends.every((t) => t.currentCount === 0);
    if (noErrors && trends.length > 0) {
      recommendations.push('Excellent! Consider increasing difficulty level');
    }

    if (recommendations.length === 0) {
      recommendations.push('Keep up your consistent practice!');
    }

    return recommendations.slice(0, 5);
  }

  compareTimeframes(
    patterns: ErrorPattern[],
    currentDays: number,
    previousDays: number
  ): {
    improvement: number;
    categoryChanges: Record<ErrorCategory, number>;
  } {
    const currentTrends = this.calculateCategoryTrends(patterns, currentDays);

    const categoryChanges: Record<string, number> = {};
    let totalChange = 0;
    let count = 0;

    for (const trend of currentTrends) {
      categoryChanges[trend.category] = trend.percentageChange;
      totalChange += trend.percentageChange;
      count += 1;
    }

    return {
      improvement: count > 0 ? -totalChange / count : 0,
      categoryChanges: categoryChanges as Record<ErrorCategory, number>,
    };
  }
}

export const trendDetector = new TrendDetector();
