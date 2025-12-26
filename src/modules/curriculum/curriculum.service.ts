import { prisma } from '../../shared/database/prisma';
import { cacheGet, cacheSet, cacheDelete } from '../../shared/cache/redis';
import type {
  GetModulesQuery,
  ModuleWithScenarios,
  ScenarioFull,
  CreateModuleDto,
  CreateScenarioDto,
  CreatePathwayDto,
} from './curriculum.types';

const CACHE_TTL = 3600; // 1 hour

export class CurriculumService {
  // ==================== MODULES ====================

  async getModules(query: GetModulesQuery = {}) {
    const cacheKey = `modules:${JSON.stringify(query)}`;
    const cached = await cacheGet<ModuleWithScenarios[]>(cacheKey);
    if (cached) return cached;

    const where: Record<string, unknown> = {};
    if (query.language) where.languageCode = query.language;
    if (query.level) where.level = query.level;
    if (query.parentModule) where.parentModuleId = query.parentModule;

    const modules = await prisma.module.findMany({
      where,
      include: {
        scenarios: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    });

    await cacheSet(cacheKey, modules, CACHE_TTL);
    return modules;
  }

  async getModuleById(id: string) {
    const cacheKey = `module:${id}`;
    const cached = await cacheGet<ModuleWithScenarios>(cacheKey);
    if (cached) return cached;

    const module = await prisma.module.findUnique({
      where: { id },
      include: {
        scenarios: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (module) {
      await cacheSet(cacheKey, module, CACHE_TTL);
    }
    return module;
  }

  async createModule(data: CreateModuleDto) {
    const module = await prisma.module.create({
      data: {
        id: data.id,
        languageCode: data.languageCode,
        parentModuleId: data.parentModuleId,
        title: data.title,
        description: data.description,
        level: data.level,
        objectives: data.objectives,
        duration: data.duration,
        order: data.order,
      },
    });
    await this.invalidateModuleCache();
    return module;
  }

  async updateModule(id: string, data: Partial<CreateModuleDto>) {
    const module = await prisma.module.update({
      where: { id },
      data,
    });
    await this.invalidateModuleCache();
    await cacheDelete(`module:${id}`);
    return module;
  }

  // ==================== SCENARIOS ====================

  async getScenariosByModule(moduleId: string) {
    const cacheKey = `scenarios:module:${moduleId}`;
    const cached = await cacheGet<ScenarioFull[]>(cacheKey);
    if (cached) return cached;

    const scenarios = await prisma.scenario.findMany({
      where: { moduleId },
      orderBy: { order: 'asc' },
    });

    await cacheSet(cacheKey, scenarios, CACHE_TTL);
    return scenarios;
  }

  async getScenarioById(id: string) {
    const cacheKey = `scenario:${id}`;
    const cached = await cacheGet<ScenarioFull>(cacheKey);
    if (cached) return cached;

    const scenario = await prisma.scenario.findUnique({
      where: { id },
      include: { module: true },
    });

    if (scenario) {
      await cacheSet(cacheKey, scenario, CACHE_TTL);
    }
    return scenario;
  }

  async createScenario(data: CreateScenarioDto) {
    const scenario = await prisma.scenario.create({
      data: {
        id: data.id,
        moduleId: data.moduleId,
        title: data.title,
        context: data.context,
        objectives: data.objectives,
        practiceActivities: data.practiceActivities,
        culturalInsights: data.culturalInsights,
        grammarNotes: data.grammarNotes,
        commonMistakes: data.commonMistakes,
        successCriteria: data.successCriteria,
        order: data.order,
      },
    });
    await cacheDelete(`scenarios:module:${data.moduleId}`);
    await cacheDelete(`module:${data.moduleId}`);
    return scenario;
  }

  // ==================== PATHWAYS ====================

  async getPathways(languageCode?: string) {
    const cacheKey = `pathways:${languageCode || 'all'}`;
    const cached = await cacheGet(cacheKey);
    if (cached) return cached;

    const where = languageCode ? { languageCode } : {};
    const pathways = await prisma.pathway.findMany({
      where,
      orderBy: { name: 'asc' },
    });

    await cacheSet(cacheKey, pathways, CACHE_TTL);
    return pathways;
  }

  async getPathwayById(id: string) {
    const cacheKey = `pathway:${id}`;
    const cached = await cacheGet(cacheKey);
    if (cached) return cached;

    const pathway = await prisma.pathway.findUnique({
      where: { id },
    });

    if (pathway) {
      await cacheSet(cacheKey, pathway, CACHE_TTL);
    }
    return pathway;
  }

  async createPathway(data: CreatePathwayDto) {
    const pathway = await prisma.pathway.create({
      data: {
        id: data.id,
        languageCode: data.languageCode,
        name: data.name,
        description: data.description,
        moduleOverrides: data.moduleOverrides,
        additionalContent: data.additionalContent,
      },
    });
    await cacheDelete(`pathways:${data.languageCode}`);
    await cacheDelete('pathways:all');
    return pathway;
  }

  // ==================== CACHE HELPERS ====================

  private async invalidateModuleCache() {
    await cacheDelete('modules:*');
  }
}

export const curriculumService = new CurriculumService();

