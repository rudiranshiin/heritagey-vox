// Common types used across the application

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

// Learner Memory Types
export interface ProgressData {
  completedScenarios: string[];
  milestones: string[];
  totalSessionTime: number;
  lastSessionAt?: string;
  sessionsCount: number;
}

export interface ErrorPattern {
  category: string;
  subcategory?: string;
  frequency: number;
  lastOccurred: string;
  trend: 'improving' | 'stable' | 'regressing';
  weight: number;
}

export interface LearnerPreferences {
  formalityLevel: 'formal' | 'moderate' | 'casual';
  engagingTopics: string[];
  boringTopics: string[];
  pace: 'fast' | 'moderate' | 'slow';
  feedbackStyle: 'implicit' | 'explicit' | 'mixed';
}

export interface LearnerProfile {
  l1Background?: string;
  field?: string;
  goals: string[];
  interests: string[];
  timeline?: string;
  hasUKFamily?: boolean;
  targetRegion?: string;
}

// Curriculum Types
export interface PracticeActivity {
  type: 'role-play' | 'scenario' | 'challenge' | 'discussion' | 'drill';
  prompt: string;
  expectedBehaviors: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface CulturalInsight {
  topic: string;
  content: string;
  importance: 'essential' | 'helpful' | 'enrichment';
}

export interface GrammarNote {
  topic: string;
  content: string;
  examples: string[];
}

export interface CommonMistake {
  mistake: string;
  correction: string;
  explanation?: string;
}

// Session Types
export type SessionEventType =
  | 'session_started'
  | 'topic_engaged'
  | 'error_detected'
  | 'self_correction'
  | 'cultural_confusion'
  | 'fluency_hesitation'
  | 'session_completed'
  | 'session_abandoned';

export interface SessionEvent {
  type: SessionEventType;
  timestamp: string;
  data: Record<string, unknown>;
}

export interface SessionMetrics {
  fluencyScore: number;
  accuracyScore: number;
  appropriacyScore: number;
  confidenceScore: number;
  engagementScore: number;
  durationSeconds: number;
  errorCount: number;
  selfCorrectionCount: number;
}

// Assessment Types
export interface AssessmentScores {
  fluency: number;
  accuracy: number;
  appropriacy: number;
  confidence: number;
  overall: number;
}

export interface ProgressionRecommendation {
  action: 'advance' | 'consolidate' | 'review';
  targetModuleId?: string;
  confidence: number;
  reasoning: string;
}

