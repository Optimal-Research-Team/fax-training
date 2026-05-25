import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { CategoryId, Priority, ProgressState } from '../data/types';
import { FAXES } from '../data/faxes';
import { GUARDRAILS } from '../data/guardrails';
import { clearState, loadState, makeInitialState, saveState } from '../lib/storage';

export const OVERVIEW_SECTIONS = [
  'why',
  'categories',
  'naming',
  'priority',
  'mistakes',
] as const;
export type SectionId = (typeof OVERVIEW_SECTIONS)[number];

const FAX_MAP = new Map(FAXES.map((f) => [f.id, f]));
const TOTAL_SECTIONS = OVERVIEW_SECTIONS.length;
const TOTAL_MISTAKES = GUARDRAILS.length;

type ProgressContextValue = {
  state: ProgressState;
  // Overview
  visitSection: (id: SectionId) => void;
  acknowledgeMistake: (id: string, ack: boolean) => void;
  sectionsVisited: number;
  mistakesAcknowledged: number;
  totalSections: number;
  totalMistakes: number;
  overviewComplete: boolean;
  // Test
  submitAnswer: (
    faxId: number,
    category: CategoryId,
    priority: Priority,
    timeSpentMs: number,
  ) => void;
  setTestIndex: (n: number) => void;
  markReviewed: (faxId: number) => void;
  completeTest: () => void;
  answeredCount: number;
  testInProgress: boolean;
  testComplete: boolean;
  // Lifecycle
  resetAll: () => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(() => loadState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  const visitSection = useCallback((id: SectionId) => {
    setState((prev) =>
      prev.overviewSectionsVisited.includes(id)
        ? prev
        : {
            ...prev,
            overviewSectionsVisited: [...prev.overviewSectionsVisited, id],
          },
    );
  }, []);

  const acknowledgeMistake = useCallback((id: string, ack: boolean) => {
    setState((prev) => {
      const has = prev.mistakesAcknowledged.includes(id);
      if (ack === has) return prev;
      return {
        ...prev,
        mistakesAcknowledged: ack
          ? [...prev.mistakesAcknowledged, id]
          : prev.mistakesAcknowledged.filter((m) => m !== id),
      };
    });
  }, []);

  const submitAnswer = useCallback(
    (
      faxId: number,
      category: CategoryId,
      priority: Priority,
      timeSpentMs: number,
    ) => {
      const fax = FAX_MAP.get(faxId);
      if (!fax) return;
      setState((prev) => ({
        ...prev,
        testAnswers: prev.testAnswers.map((a) =>
          a.faxId === faxId
            ? {
                ...a,
                selectedCategory: category,
                selectedPriority: priority,
                isCategoryCorrect: category === fax.correctCategory,
                isPriorityCorrect: priority === fax.correctPriority,
                timeSpentMs: a.timeSpentMs + timeSpentMs,
              }
            : a,
        ),
      }));
    },
    [],
  );

  const setTestIndex = useCallback((n: number) => {
    setState((prev) => {
      const clamped = Math.max(0, Math.min(FAXES.length - 1, n));
      if (clamped === prev.testIndex) return prev;
      return { ...prev, testIndex: clamped };
    });
  }, []);

  const markReviewed = useCallback((faxId: number) => {
    setState((prev) => ({
      ...prev,
      testAnswers: prev.testAnswers.map((a) =>
        a.faxId === faxId ? { ...a, reviewed: true } : a,
      ),
    }));
  }, []);

  const completeTest = useCallback(() => {
    setState((prev) =>
      prev.completedAt
        ? prev
        : { ...prev, completedAt: new Date().toISOString() },
    );
  }, []);

  const resetAll = useCallback(() => {
    clearState();
    setState(makeInitialState());
  }, []);

  const derived = useMemo(() => {
    const sectionsVisited = state.overviewSectionsVisited.filter((s) =>
      (OVERVIEW_SECTIONS as readonly string[]).includes(s),
    ).length;
    const mistakesAcknowledged = state.mistakesAcknowledged.length;
    const answeredCount = state.testAnswers.filter(
      (a) => a.selectedCategory !== null || a.selectedPriority !== null,
    ).length;
    return {
      sectionsVisited,
      mistakesAcknowledged,
      overviewComplete:
        sectionsVisited >= TOTAL_SECTIONS &&
        mistakesAcknowledged >= TOTAL_MISTAKES,
      answeredCount,
      testInProgress: answeredCount > 0 && !state.completedAt,
      testComplete: Boolean(state.completedAt),
    };
  }, [state]);

  const value: ProgressContextValue = {
    state,
    visitSection,
    acknowledgeMistake,
    totalSections: TOTAL_SECTIONS,
    totalMistakes: TOTAL_MISTAKES,
    submitAnswer,
    setTestIndex,
    markReviewed,
    completeTest,
    resetAll,
    ...derived,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
