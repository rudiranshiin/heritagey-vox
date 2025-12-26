export interface Learner {
  id: string;
  externalId: string;
  createdAt: Date;
  updatedAt: Date;
  languages?: LearnerLanguage[];
  memories?: LearnerMemory[];
}

export interface LearnerLanguage {
  id: string;
  learnerId: string;
  languageCode: string;
  currentLevel: Level;
  currentModuleId: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type Level = 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface LearnerMemory {
  id: string;
  learnerId: string;
  languageCode: string;
  progressData: ProgressData;
  errorPatterns: ErrorPattern[];
  preferences: LearnerPreferences;
  profile: LearnerProfile;
  updatedAt: Date;
}

export interface ProgressData {
  completedModules: string[];
  completedScenarios: string[];
  currentStreak: number;
  longestStreak: number;
  totalSessions: number;
  totalPracticeMinutes: number;
  lastSessionAt?: string;
  moduleProgress: Record<string, ModuleProgress>;
}

export interface ModuleProgress {
  moduleId: string;
  scenariosCompleted: number;
  scenariosTotal: number;
  averageScore: number;
  lastPracticedAt?: string;
}

export interface ErrorPattern {
  category: ErrorCategory;
  subcategory?: string;
  frequency: number;
  recentCount: number;
  trend: 'improving' | 'stable' | 'worsening';
  examples: ErrorExample[];
  lastOccurrence?: string;
  firstOccurrence?: string;
}

export type ErrorCategory =
  | 'grammar'
  | 'vocabulary'
  | 'pronunciation'
  | 'cultural'
  | 'pragmatic'
  | 'register';

export interface ErrorExample {
  context: string;
  error: string;
  correction?: string;
  timestamp: string;
  sessionId?: string;
}

export interface LearnerPreferences {
  sessionDuration: 'short' | 'medium' | 'long';
  practiceStyle: 'conversational' | 'structured' | 'mixed';
  feedbackLevel: 'minimal' | 'moderate' | 'detailed';
  voiceSpeed: 'slow' | 'normal' | 'fast';
  focusAreas: string[];
  avoidTopics: string[];
  preferredScenarioTypes: string[];
  challengeLevel: 'comfortable' | 'balanced' | 'challenging';
}

export interface LearnerProfile {
  nativeLanguage: string;
  otherLanguages: string[];
  learningGoals: string[];
  occupation?: string;
  interests: string[];
  pathwayId?: string;
  timezone?: string;
  ageGroup?: 'teen' | 'young-adult' | 'adult' | 'senior';
}

export interface CreateLearnerDTO {
  externalId: string;
  languageCode?: string;
  profile?: Partial<LearnerProfile>;
}

export interface UpdateLearnerDTO {
  profile?: Partial<LearnerProfile>;
}

export interface AddLanguageDTO {
  languageCode: string;
  currentLevel?: Level;
}

export interface UpdateLanguageDTO {
  currentLevel?: Level;
  currentModuleId?: string;
  isActive?: boolean;
}

export interface UpdatePreferencesDTO extends Partial<LearnerPreferences> {}

export interface LearnerWithProgress extends Learner {
  languages: (LearnerLanguage & {
    memory?: LearnerMemory;
  })[];
}

export interface LearnerSummary {
  id: string;
  externalId: string;
  languages: {
    code: string;
    level: Level;
    isActive: boolean;
    progress: {
      completedModules: number;
      totalSessions: number;
      currentStreak: number;
    };
  }[];
  createdAt: Date;
}

