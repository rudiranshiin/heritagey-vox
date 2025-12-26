import { prisma } from '../../shared/database/prisma';
import type { ErrorLogEntry, CreateErrorLogDTO, ErrorLogFilter, ErrorCategory } from './memory.types';
import { memoryService } from './memory.service';

export class ErrorLogService {
  async create(data: CreateErrorLogDTO): Promise<ErrorLogEntry> {
    const errorLog = await prisma.errorLog.create({
      data: {
        learnerId: data.learnerId,
        languageCode: data.languageCode,
        sessionId: data.sessionId,
        category: data.category,
        subcategory: data.subcategory,
        context: data.context,
        corrected: false,
      },
    });

    await memoryService.addErrorPattern(
      data.learnerId,
      data.languageCode,
      data.category,
      data.subcategory,
      data.context
    );

    return errorLog as ErrorLogEntry;
  }

  async markCorrected(id: string): Promise<ErrorLogEntry | null> {
    try {
      const updated = await prisma.errorLog.update({
        where: { id },
        data: { corrected: true },
      });
      return updated as ErrorLogEntry;
    } catch {
      return null;
    }
  }

  async getById(id: string): Promise<ErrorLogEntry | null> {
    const errorLog = await prisma.errorLog.findUnique({
      where: { id },
    });
    return errorLog as ErrorLogEntry | null;
  }

  async list(filter: ErrorLogFilter): Promise<{ errors: ErrorLogEntry[]; total: number }> {
    const where: Record<string, unknown> = {
      learnerId: filter.learnerId,
    };

    if (filter.languageCode) {
      where.languageCode = filter.languageCode;
    }
    if (filter.category) {
      where.category = filter.category;
    }
    if (filter.sessionId) {
      where.sessionId = filter.sessionId;
    }
    if (filter.corrected !== undefined) {
      where.corrected = filter.corrected;
    }
    if (filter.startDate || filter.endDate) {
      where.timestamp = {};
      if (filter.startDate) {
        (where.timestamp as Record<string, Date>).gte = filter.startDate;
      }
      if (filter.endDate) {
        (where.timestamp as Record<string, Date>).lte = filter.endDate;
      }
    }

    const [errors, total] = await Promise.all([
      prisma.errorLog.findMany({
        where,
        take: filter.limit || 50,
        skip: filter.offset || 0,
        orderBy: { timestamp: 'desc' },
      }),
      prisma.errorLog.count({ where }),
    ]);

    return {
      errors: errors as ErrorLogEntry[],
      total,
    };
  }

  async getRecent(
    learnerId: string,
    languageCode: string,
    limit: number = 10
  ): Promise<ErrorLogEntry[]> {
    const errors = await prisma.errorLog.findMany({
      where: { learnerId, languageCode },
      take: limit,
      orderBy: { timestamp: 'desc' },
    });

    return errors as ErrorLogEntry[];
  }

  async getBySession(sessionId: string): Promise<ErrorLogEntry[]> {
    const errors = await prisma.errorLog.findMany({
      where: { sessionId },
      orderBy: { timestamp: 'asc' },
    });

    return errors as ErrorLogEntry[];
  }

  async getCountsByCategory(
    learnerId: string,
    languageCode: string,
    days: number = 30
  ): Promise<Record<ErrorCategory, number>> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const errors = await prisma.errorLog.groupBy({
      by: ['category'],
      where: {
        learnerId,
        languageCode,
        timestamp: { gte: startDate },
      },
      _count: { category: true },
    });

    const counts: Record<string, number> = {};
    for (const error of errors) {
      counts[error.category] = error._count.category;
    }

    return counts as Record<ErrorCategory, number>;
  }

  async getErrorRate(
    learnerId: string,
    languageCode: string,
    windowDays: number = 7
  ): Promise<{ current: number; previous: number; change: number }> {
    const now = new Date();
    const currentStart = new Date(now.getTime() - windowDays * 24 * 60 * 60 * 1000);
    const previousStart = new Date(currentStart.getTime() - windowDays * 24 * 60 * 60 * 1000);

    const [currentCount, previousCount] = await Promise.all([
      prisma.errorLog.count({
        where: {
          learnerId,
          languageCode,
          timestamp: { gte: currentStart },
        },
      }),
      prisma.errorLog.count({
        where: {
          learnerId,
          languageCode,
          timestamp: { gte: previousStart, lt: currentStart },
        },
      }),
    ]);

    const change = previousCount > 0
      ? ((currentCount - previousCount) / previousCount) * 100
      : currentCount > 0
        ? 100
        : 0;

    return {
      current: currentCount,
      previous: previousCount,
      change,
    };
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.errorLog.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  async deleteForSession(sessionId: string): Promise<number> {
    const result = await prisma.errorLog.deleteMany({
      where: { sessionId },
    });
    return result.count;
  }
}

export const errorLogService = new ErrorLogService();

