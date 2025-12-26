import type { ErrorCategory, ErrorPattern, LearnerPreferences, LearnerProfile, ProgressData } from '../learner/learner.types';

export type SessionStatus = 'ACTIVE' | 'COMPLETED' | 'ABANDONED' | 'PAUSED';

export interface Session {
  id: string;
  learnerId: string;
  languageCode: string;
  scenarioId: string | null;
  status: SessionStatus;
  startedAt: Date;
  completedAt: Date | null;
  events: SessionEvent[];
  metrics: SessionMetrics | null;
  metadata: SessionMetadata | null;
}

export interface SessionEvent {
  id: string;
  type: EventType;
  timestamp: string;
  data: Record<string, unknown>;
}

export type EventType =
  | 'session_start'
  | 'session_end'
  | 'user_message'
  | 'agent_message'
  | 'error_detected'
  | 'correction_given'
  | 'correction_accepted'
  | 'hint_requested'
  | 'hint_given'
  | 'scenario_started'
  | 'scenario_completed'
  | 'practice_activity_started'
  | 'practice_activity_completed'
  | 'feedback_given'
  | 'pause'
  | 'resume';

export interface SessionMetrics {
  duration: number;
  messageCount: number;
  userMessageCount: number;
  agentMessageCount: number;
  errorsDetected: number;
  correctionsMade: number;
  correctionsAccepted: number;
  hintsRequested: number;
  activitiesCompleted: number;
  engagementScore: number;
  fluencyScore: number;
  accuracyScore: number;
  overallScore: number;
}

export interface SessionMetadata {
  deviceType?: string;
  platform?: string;
  voiceQuality?: 'low' | 'medium' | 'high';
  networkQuality?: 'low' | 'medium' | 'high';
  timezone?: string;
  locale?: string;
}

export interface CreateSessionDTO {
  learnerId: string;
  languageCode: string;
  scenarioId?: string;
  metadata?: SessionMetadata;
}

export interface UpdateSessionDTO {
  status?: SessionStatus;
  scenarioId?: string;
  metadata?: Partial<SessionMetadata>;
}

export interface SessionFilter {
  learnerId?: string;
  languageCode?: string;
  scenarioId?: string;
  status?: SessionStatus;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

export interface SessionContext {
  session: SessionSummary;
  learner: {
    id: string;
    languageCode: string;
    currentLevel: string;
    currentModuleId: string | null;
  };
  memory: {
    progressData: ProgressData;
    errorPatterns: ErrorPattern[];
    preferences: LearnerPreferences;
    profile: LearnerProfile;
  };
  scenario: ScenarioContext | null;
  recommendations: SessionRecommendation[];
  preSessionTips: string[];
}

export interface SessionSummary {
  id: string;
  status: SessionStatus;
  startedAt: Date;
  duration: number;
  eventsCount: number;
}

export interface ScenarioContext {
  id: string;
  moduleId: string;
  title: string;
  context: string;
  objectives: string[];
  practiceActivities: PracticeActivityContext[];
  culturalInsights: CulturalInsightContext[];
  grammarNotes: GrammarNoteContext[];
  commonMistakes: CommonMistakeContext[];
  successCriteria: string[];
}

export interface PracticeActivityContext {
  type: string;
  prompt: string;
  expectedBehaviors: string[];
  difficulty: string;
}

export interface CulturalInsightContext {
  topic: string;
  content: string;
  importance: string;
}

export interface GrammarNoteContext {
  topic: string;
  content: string;
  examples: string[];
}

export interface CommonMistakeContext {
  mistake: string;
  correction: string;
  explanation: string;
}

export interface SessionRecommendation {
  type: 'scenario' | 'focus_area' | 'difficulty' | 'practice_type';
  value: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

export interface AddEventDTO {
  type: EventType;
  data?: Record<string, unknown>;
}

export interface ErrorEventData {
  category: ErrorCategory;
  subcategory?: string;
  context: string;
  userUtterance?: string;
  expectedForm?: string;
}

export interface CorrectionEventData {
  errorEventId: string;
  correction: string;
  explanation?: string;
  accepted?: boolean;
}

export interface SessionCompletionResult {
  session: Session;
  metrics: SessionMetrics;
  memoryUpdated: boolean;
  progressUpdate: {
    scenarioCompleted: boolean;
    moduleProgress: number;
    newStreak: number;
  };
  feedback: string[];
}

export interface ActiveSessionState {
  sessionId: string;
  learnerId: string;
  languageCode: string;
  scenarioId: string | null;
  startedAt: string;
  lastEventAt: string;
  eventsCount: number;
  errorsInSession: number;
  currentActivityIndex: number;
}

