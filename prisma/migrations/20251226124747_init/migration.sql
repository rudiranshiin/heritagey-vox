-- CreateEnum
CREATE TYPE "Level" AS ENUM ('A2', 'B1', 'B2', 'C1', 'C2');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'ABANDONED', 'PAUSED');

-- CreateEnum
CREATE TYPE "AssessmentType" AS ENUM ('INFORMAL', 'MILESTONE');

-- CreateTable
CREATE TABLE "Language" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nativeName" TEXT NOT NULL,
    "flag" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Learner" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Learner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearnerLanguage" (
    "id" TEXT NOT NULL,
    "learnerId" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "currentLevel" "Level" NOT NULL DEFAULT 'A2',
    "currentModuleId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LearnerLanguage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearnerMemory" (
    "id" TEXT NOT NULL,
    "learnerId" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "progressData" JSONB NOT NULL DEFAULT '{}',
    "errorPatterns" JSONB NOT NULL DEFAULT '[]',
    "preferences" JSONB NOT NULL DEFAULT '{}',
    "profile" JSONB NOT NULL DEFAULT '{}',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LearnerMemory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "parentModuleId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "level" TEXT NOT NULL,
    "objectives" JSONB NOT NULL DEFAULT '[]',
    "duration" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scenario" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "objectives" JSONB NOT NULL DEFAULT '[]',
    "practiceActivities" JSONB NOT NULL DEFAULT '[]',
    "culturalInsights" JSONB NOT NULL DEFAULT '[]',
    "grammarNotes" JSONB NOT NULL DEFAULT '[]',
    "commonMistakes" JSONB NOT NULL DEFAULT '[]',
    "successCriteria" JSONB NOT NULL DEFAULT '[]',
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scenario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pathway" (
    "id" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "moduleOverrides" JSONB NOT NULL DEFAULT '{}',
    "additionalContent" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pathway_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "learnerId" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "scenarioId" TEXT,
    "status" "SessionStatus" NOT NULL DEFAULT 'ACTIVE',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "events" JSONB NOT NULL DEFAULT '[]',
    "metrics" JSONB,
    "metadata" JSONB,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ErrorLog" (
    "id" TEXT NOT NULL,
    "learnerId" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "sessionId" TEXT,
    "category" TEXT NOT NULL,
    "subcategory" TEXT,
    "context" TEXT NOT NULL,
    "corrected" BOOLEAN NOT NULL DEFAULT false,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ErrorLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assessment" (
    "id" TEXT NOT NULL,
    "learnerId" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "type" "AssessmentType" NOT NULL,
    "moduleId" TEXT,
    "scores" JSONB NOT NULL DEFAULT '{}',
    "recommendations" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Learner_externalId_key" ON "Learner"("externalId");

-- CreateIndex
CREATE INDEX "Learner_externalId_idx" ON "Learner"("externalId");

-- CreateIndex
CREATE INDEX "LearnerLanguage_learnerId_idx" ON "LearnerLanguage"("learnerId");

-- CreateIndex
CREATE INDEX "LearnerLanguage_languageCode_idx" ON "LearnerLanguage"("languageCode");

-- CreateIndex
CREATE UNIQUE INDEX "LearnerLanguage_learnerId_languageCode_key" ON "LearnerLanguage"("learnerId", "languageCode");

-- CreateIndex
CREATE INDEX "LearnerMemory_learnerId_idx" ON "LearnerMemory"("learnerId");

-- CreateIndex
CREATE INDEX "LearnerMemory_languageCode_idx" ON "LearnerMemory"("languageCode");

-- CreateIndex
CREATE UNIQUE INDEX "LearnerMemory_learnerId_languageCode_key" ON "LearnerMemory"("learnerId", "languageCode");

-- CreateIndex
CREATE INDEX "Module_languageCode_idx" ON "Module"("languageCode");

-- CreateIndex
CREATE INDEX "Module_parentModuleId_idx" ON "Module"("parentModuleId");

-- CreateIndex
CREATE INDEX "Module_level_idx" ON "Module"("level");

-- CreateIndex
CREATE INDEX "Scenario_moduleId_idx" ON "Scenario"("moduleId");

-- CreateIndex
CREATE INDEX "Pathway_languageCode_idx" ON "Pathway"("languageCode");

-- CreateIndex
CREATE INDEX "Session_learnerId_idx" ON "Session"("learnerId");

-- CreateIndex
CREATE INDEX "Session_languageCode_idx" ON "Session"("languageCode");

-- CreateIndex
CREATE INDEX "Session_status_idx" ON "Session"("status");

-- CreateIndex
CREATE INDEX "Session_startedAt_idx" ON "Session"("startedAt");

-- CreateIndex
CREATE INDEX "ErrorLog_learnerId_idx" ON "ErrorLog"("learnerId");

-- CreateIndex
CREATE INDEX "ErrorLog_languageCode_idx" ON "ErrorLog"("languageCode");

-- CreateIndex
CREATE INDEX "ErrorLog_category_idx" ON "ErrorLog"("category");

-- CreateIndex
CREATE INDEX "ErrorLog_timestamp_idx" ON "ErrorLog"("timestamp");

-- CreateIndex
CREATE INDEX "ErrorLog_learnerId_languageCode_category_idx" ON "ErrorLog"("learnerId", "languageCode", "category");

-- CreateIndex
CREATE INDEX "Assessment_learnerId_idx" ON "Assessment"("learnerId");

-- CreateIndex
CREATE INDEX "Assessment_languageCode_idx" ON "Assessment"("languageCode");

-- CreateIndex
CREATE INDEX "Assessment_type_idx" ON "Assessment"("type");

-- CreateIndex
CREATE INDEX "Assessment_createdAt_idx" ON "Assessment"("createdAt");

-- AddForeignKey
ALTER TABLE "LearnerLanguage" ADD CONSTRAINT "LearnerLanguage_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "Learner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearnerLanguage" ADD CONSTRAINT "LearnerLanguage_languageCode_fkey" FOREIGN KEY ("languageCode") REFERENCES "Language"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearnerMemory" ADD CONSTRAINT "LearnerMemory_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "Learner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearnerMemory" ADD CONSTRAINT "LearnerMemory_languageCode_fkey" FOREIGN KEY ("languageCode") REFERENCES "Language"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_languageCode_fkey" FOREIGN KEY ("languageCode") REFERENCES "Language"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scenario" ADD CONSTRAINT "Scenario_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pathway" ADD CONSTRAINT "Pathway_languageCode_fkey" FOREIGN KEY ("languageCode") REFERENCES "Language"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "Learner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_scenarioId_fkey" FOREIGN KEY ("scenarioId") REFERENCES "Scenario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ErrorLog" ADD CONSTRAINT "ErrorLog_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "Learner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ErrorLog" ADD CONSTRAINT "ErrorLog_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "Learner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
