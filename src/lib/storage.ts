import type { ProgressState } from '../data/types';
import { FAXES } from '../data/faxes';

// v2: the “Referral” category was removed (Avaros files those as Consult),
// so any v1 state may hold an invalid category selection — start clean.
const KEY = 'fax_training_progress_v2';

export function makeInitialState(): ProgressState {
  return {
    overviewSectionsVisited: [],
    mistakesAcknowledged: [],
    testAnswers: FAXES.map((f) => ({
      faxId: f.id,
      selectedCategory: null,
      selectedPriority: null,
      isCategoryCorrect: null,
      isPriorityCorrect: null,
      timeSpentMs: 0,
      reviewed: false,
    })),
    testIndex: 0,
    startedAt: new Date().toISOString(),
    completedAt: null,
  };
}

export function loadState(): ProgressState {
  const base = makeInitialState();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    const answers =
      Array.isArray(parsed.testAnswers) &&
      parsed.testAnswers.length === base.testAnswers.length
        ? parsed.testAnswers
        : base.testAnswers;
    return {
      ...base,
      ...parsed,
      overviewSectionsVisited: parsed.overviewSectionsVisited ?? [],
      mistakesAcknowledged: parsed.mistakesAcknowledged ?? [],
      testAnswers: answers,
      testIndex: typeof parsed.testIndex === 'number' ? parsed.testIndex : 0,
      startedAt: parsed.startedAt || base.startedAt,
      completedAt: parsed.completedAt ?? null,
    };
  } catch {
    return base;
  }
}

export function saveState(state: ProgressState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable — training still works in-memory */
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* noop */
  }
}
