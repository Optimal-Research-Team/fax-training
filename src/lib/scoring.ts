import type { CategoryId, TestAnswer, TestFax } from '../data/types';

export type CategoryStat = { correct: number; total: number };

export type Results = {
  score: number;
  maxScore: number;
  percent: number;
  pass: boolean;
  categoryCorrect: number;
  priorityCorrect: number;
  answeredCount: number;
  byCategory: Partial<Record<CategoryId, CategoryStat>>;
  trippedGuardrails: string[];
  totalTimeMs: number;
};

export const PASS_THRESHOLD = 0.8;

export function calculateResults(
  answers: TestAnswer[],
  faxes: TestFax[],
): Results {
  const faxMap = new Map(faxes.map((f) => [f.id, f]));

  let score = 0;
  let categoryCorrect = 0;
  let priorityCorrect = 0;
  let answeredCount = 0;
  let totalTimeMs = 0;
  const byCategory: Partial<Record<CategoryId, CategoryStat>> = {};
  const trippedGuardrails = new Set<string>();

  for (const a of answers) {
    const fax = faxMap.get(a.faxId);
    if (!fax) continue;

    const stat = (byCategory[fax.correctCategory] ??= { correct: 0, total: 0 });
    stat.total += 1;
    totalTimeMs += a.timeSpentMs;

    if (a.selectedCategory !== null || a.selectedPriority !== null) {
      answeredCount += 1;
    }

    if (a.selectedCategory === fax.correctCategory) {
      score += 1;
      categoryCorrect += 1;
      stat.correct += 1;
    } else if (a.selectedCategory !== null && fax.guardrailId) {
      trippedGuardrails.add(fax.guardrailId);
    }

    if (a.selectedPriority === fax.correctPriority) {
      score += 1;
      priorityCorrect += 1;
    }
  }

  const maxScore = faxes.length * 2;
  const percent = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

  return {
    score,
    maxScore,
    percent,
    pass: score >= maxScore * PASS_THRESHOLD,
    categoryCorrect,
    priorityCorrect,
    answeredCount,
    byCategory,
    trippedGuardrails: Array.from(trippedGuardrails),
    totalTimeMs,
  };
}

export function formatDuration(ms: number): string {
  const totalSec = Math.max(0, Math.round(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s.toString().padStart(2, '0')}s`;
  return `${s}s`;
}

export function formatClock(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
