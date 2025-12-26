import type { ErrorCategory, ErrorPattern, ProgressData } from '../learner/learner.types';

export interface ErrorLogEntry {
  id: string;
  learnerId: string;
  languageCode: string;
  sessionId?: string;
  category: ErrorCategory;
  subcategory?: string;
  context: string;
  corrected: boolean;
  timestamp: Date;
}

export interface CreateErrorLogDTO {
  learnerId: string;
  languageCode: string;
  sessionId?: string;
  category: ErrorCategory;
  subcategory?: string;
  context: string;
}

export interface ErrorLogFilter {
  learnerId: string;
  languageCode?: string;
  category?: ErrorCategory;
  sessionId?: string;
  startDate?: Date;
  endDate?: Date;
  corrected?: boolean;
  limit?: number;
  offset?: number;
}

export interface ErrorStats {
  totalErrors: number;
  errorsByCategory: Record<ErrorCategory, number>;
  recentErrorRate: number;
  mostCommonErrors: {
    category: ErrorCategory;
    subcategory?: string;
    count: number;
    trend: 'improving' | 'stable' | 'worsening';
  }[];
}

export interface TrendAnalysis {
  category: ErrorCategory;
  subcategory?: string;
  trend: 'improving' | 'stable' | 'worsening';
  windowSize: number;
  previousCount: number;
  currentCount: number;
  percentageChange: number;
}

export interface L1Prediction {
  category: ErrorCategory;
  subcategory?: string;
  likelihood: 'high' | 'medium' | 'low';
  reason: string;
  preventiveTips: string[];
}

export interface L1ChallengeMap {
  [nativeLanguage: string]: {
    challenges: {
      category: ErrorCategory;
      subcategory?: string;
      description: string;
      tips: string[];
    }[];
  };
}

export interface PreferenceUpdate {
  type: 'session_duration' | 'practice_style' | 'scenario_type' | 'topic_preference';
  value: string;
  confidence: number;
  source: 'explicit' | 'inferred';
}

export interface SessionMetrics {
  duration: number;
  scenarioType: string;
  topic: string;
  completionRate: number;
  engagementScore: number;
  errors: ErrorLogEntry[];
}

export interface ProgressUpdate {
  scenarioId?: string;
  moduleId?: string;
  sessionDuration: number;
  completed: boolean;
  score?: number;
}

export type { ErrorCategory, ErrorPattern, ProgressData };

