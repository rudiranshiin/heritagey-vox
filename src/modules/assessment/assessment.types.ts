import type { Level, ErrorCategory } from '../learner/learner.types';

export type AssessmentType = 'INFORMAL' | 'MILESTONE';

export interface Assessment {
  id: string;
  learnerId: string;
  languageCode: string;
  type: AssessmentType;
  moduleId: string | null;
  scores: AssessmentScores;
  recommendations: AssessmentRecommendation[];
  createdAt: Date;
}

export interface AssessmentScores {
  overall: number;
  fluency: FluencyScore;
  accuracy: AccuracyScore;
  appropriacy: AppropriracyScore;
  confidence: ConfidenceScore;
  breakdown: ScoreBreakdown;
}

export interface FluencyScore {
  score: number;
  components: {
    speakingPace: number;
    hesitationFrequency: number;
    fillerUsage: number;
    naturalFlow: number;
  };
  feedback: string;
}

export interface AccuracyScore {
  score: number;
  components: {
    grammarAccuracy: number;
    vocabularyAccuracy: number;
    pronunciationAccuracy: number;
    errorRecovery: number;
  };
  errorsByCategory: Record<ErrorCategory, number>;
  feedback: string;
}

export interface AppropriracyScore {
  score: number;
  components: {
    registerMatch: number;
    culturalAwareness: number;
    politenessLevel: number;
    contextSuitability: number;
  };
  feedback: string;
}

export interface ConfidenceScore {
  score: number;
  components: {
    riskTaking: number;
    selfCorrection: number;
    persistenceLevel: number;
    complexityAttempts: number;
  };
  feedback: string;
}

export interface ScoreBreakdown {
  strengths: string[];
  areasForImprovement: string[];
  comparedToPrevious: {
    improved: string[];
    declined: string[];
    stable: string[];
  };
}

export interface AssessmentRecommendation {
  type: 'module' | 'scenario' | 'focus_area' | 'level_change' | 'practice_type';
  value: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

export interface CreateAssessmentDTO {
  learnerId: string;
  languageCode: string;
  type: AssessmentType;
  moduleId?: string;
  sessionId?: string;
}

export interface AssessmentFilter {
  learnerId?: string;
  languageCode?: string;
  type?: AssessmentType;
  moduleId?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

export interface AssessmentInput {
  sessionId?: string;
  moduleId?: string;
  events: SessionEventInput[];
  errorLogs: ErrorLogInput[];
  duration: number;
}

export interface SessionEventInput {
  type: string;
  timestamp: string;
  data: Record<string, unknown>;
}

export interface ErrorLogInput {
  category: ErrorCategory;
  subcategory?: string;
  context: string;
  corrected: boolean;
}

export interface ProgressionResult {
  canAdvance: boolean;
  currentLevel: Level;
  recommendedLevel: Level | null;
  moduleCompletion: {
    moduleId: string;
    completed: boolean;
    score: number;
    requiredScore: number;
  } | null;
  reasons: string[];
  nextSteps: string[];
}

export interface CompetencyThreshold {
  level: Level;
  minOverallScore: number;
  minFluencyScore: number;
  minAccuracyScore: number;
  minAppropriracyScore: number;
  requiredModules: string[];
}

export interface ReviewRecommendation {
  type: 'module' | 'scenario' | 'skill';
  id: string;
  name: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  lastPracticedAt?: string;
  currentScore?: number;
  targetScore: number;
}

export interface LearnerProgress {
  currentLevel: Level;
  percentToNextLevel: number;
  modulesCompleted: number;
  modulesTotal: number;
  averageScore: number;
  streak: number;
  totalPracticeTime: number;
  strongAreas: string[];
  weakAreas: string[];
}

