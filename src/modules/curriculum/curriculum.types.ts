import { Module, Scenario, Pathway } from '@prisma/client';

// Request/Response Types
export interface GetModulesQuery {
  language?: string;
  level?: string;
  parentModule?: string;
}

export interface GetScenariosQuery {
  moduleId?: string;
}

// Extended types with relations
export interface ModuleWithScenarios extends Module {
  scenarios: Scenario[];
}

export interface ScenarioFull extends Scenario {
  module?: Module;
}

// Create/Update DTOs
export interface CreateModuleDto {
  id: string;
  languageCode: string;
  parentModuleId?: string;
  title: string;
  description?: string;
  level: string;
  objectives: string[];
  duration: string;
  order: number;
}

export interface CreateScenarioDto {
  id: string;
  moduleId: string;
  title: string;
  context: string;
  objectives: string[];
  practiceActivities: PracticeActivity[];
  culturalInsights: CulturalInsight[];
  grammarNotes: GrammarNote[];
  commonMistakes: CommonMistake[];
  successCriteria: string[];
  order: number;
}

export interface CreatePathwayDto {
  id: string;
  languageCode: string;
  name: string;
  description: string;
  moduleOverrides: Record<string, number>;
  additionalContent: string[];
}

// Curriculum Content Types
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

// API Response Types
export interface ModuleResponse {
  id: string;
  languageCode: string;
  parentModuleId: string | null;
  title: string;
  description: string | null;
  level: string;
  objectives: string[];
  duration: string;
  order: number;
  scenarioCount?: number;
}

export interface ScenarioResponse {
  id: string;
  moduleId: string;
  title: string;
  context: string;
  objectives: string[];
  practiceActivities: PracticeActivity[];
  culturalInsights: CulturalInsight[];
  grammarNotes: GrammarNote[];
  commonMistakes: CommonMistake[];
  successCriteria: string[];
  order: number;
}

export interface PathwayResponse {
  id: string;
  languageCode: string;
  name: string;
  description: string;
  moduleOverrides: Record<string, number>;
  additionalContent: string[];
}

