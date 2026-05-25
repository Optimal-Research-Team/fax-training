import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { TopBar } from '../components/TopBar';
import { Button } from '../components/Button';
import { FaxPreview } from '../components/FaxPreview';
import { CategoryButton, CategoryBadge } from '../components/CategoryChip';
import { useProgress } from '../context/ProgressContext';
import { FAXES } from '../data/faxes';
import { CATEGORIES, getCategory } from '../data/categories';
import { GUARDRAIL_MAP } from '../data/guardrails';
import type { CategoryId, Priority } from '../data/types';
import { formatClock } from '../lib/scoring';
import {
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Info,
  Flag,
} from '../components/icons';

const TOTAL = FAXES.length;

export function Test() {
  const { n } = useParams();
  const navigate = useNavigate();
  const { state, submitAnswer, setTestIndex, completeTest } = useProgress();

  const parsed = n ? parseInt(n, 10) : NaN;

  // Resolve / normalise the route
  useEffect(() => {
    if (!n) {
      navigate(`/test/${state.testIndex + 1}`, { replace: true });
      return;
    }
    if (Number.isNaN(parsed) || parsed < 1 || parsed > TOTAL) {
      navigate('/test/1', { replace: true });
      return;
    }
    setTestIndex(parsed - 1);
    window.scrollTo({ top: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  if (!n || Number.isNaN(parsed) || parsed < 1 || parsed > TOTAL) return null;

  const idx = parsed - 1;
  const fax = FAXES[idx];
  const answer = state.testAnswers.find((a) => a.faxId === fax.id)!;
  const answered =
    answer.selectedCategory !== null && answer.selectedPriority !== null;

  return (
    <Question
      key={fax.id}
      idx={idx}
      answered={answered}
      onSubmit={submitAnswer}
      onComplete={() => {
        completeTest();
        navigate('/results');
      }}
      onNavigate={(i) => navigate(`/test/${i + 1}`)}
    />
  );
}

function Question({
  idx,
  answered,
  onSubmit,
  onComplete,
  onNavigate,
}: {
  idx: number;
  answered: boolean;
  onSubmit: (
    faxId: number,
    c: CategoryId,
    p: Priority,
    ms: number,
  ) => void;
  onComplete: () => void;
  onNavigate: (i: number) => void;
}) {
  const { state } = useProgress();
  const fax = FAXES[idx];
  const answer = state.testAnswers.find((a) => a.faxId === fax.id)!;

  const [selCat, setSelCat] = useState<CategoryId | null>(
    answer.selectedCategory,
  );
  const [selPri, setSelPri] = useState<Priority | null>(answer.selectedPriority);

  const startRef = useRef<number>(Date.now());
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (answered) return;
    const t = setInterval(() => setElapsed(Date.now() - startRef.current), 250);
    return () => clearInterval(t);
  }, [answered]);

  const handleSubmit = () => {
    if (!selCat || !selPri) return;
    onSubmit(fax.id, selCat, selPri, Date.now() - startRef.current);
  };

  // Running score
  const points = state.testAnswers.reduce(
    (s, a) => s + (a.isCategoryCorrect ? 1 : 0) + (a.isPriorityCorrect ? 1 : 0),
    0,
  );
  const answeredCount = state.testAnswers.filter(
    (a) => a.selectedCategory !== null,
  ).length;

  const correctCat = getCategory(fax.correctCategory);
  const isLast = idx === TOTAL - 1;
  const clockMs = answered ? answer.timeSpentMs : elapsed;

  const chipState = (cid: CategoryId): 'correct' | 'wrong' | 'reveal' | null => {
    if (!answered) return null;
    if (cid === fax.correctCategory)
      return answer.selectedCategory === cid ? 'correct' : 'reveal';
    if (cid === answer.selectedCategory) return 'wrong';
    return null;
  };

  return (
    <div className="min-h-screen bg-paper">
      <TopBar
        step={2}
        right={
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-ink/5 px-3 py-1.5 text-[13px] font-semibold tabular-nums text-ink">
              {points} pts
            </span>
            <span className="hidden text-[13px] font-medium text-ink-muted sm:block">
              {answeredCount}/{TOTAL} answered
            </span>
          </div>
        }
      />

      <div className="mx-auto max-w-3xl px-5 pb-28 pt-8 sm:px-8">
        {/* Question header */}
        <div className="mb-5 flex items-end justify-between">
          <div>
            <span className="eyebrow">Practice test</span>
            <h1 className="mt-1 font-display text-2xl font-semibold text-ink">
              Question {idx + 1}{' '}
              <span className="text-ink-faint">/ {TOTAL}</span>
            </h1>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-medium tabular-nums text-ink-soft shadow-card">
            <Clock className="h-4 w-4 text-ink-faint" />
            {formatClock(clockMs)}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-7 h-1.5 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-ink transition-all duration-500 ease-snap"
            style={{ width: `${((idx + 1) / TOTAL) * 100}%` }}
          />
        </div>

        <FaxPreview fax={fax} />

        {/* Category */}
        <div className="mt-7">
          <div className="mb-3 flex items-baseline justify-between">
            <span className="text-sm font-semibold text-ink">Category</span>
            <span className="text-2xs text-ink-faint">Pick one of 11</span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {CATEGORIES.map((c) => (
              <CategoryButton
                key={c.id}
                category={c}
                selected={
                  answered ? c.id === answer.selectedCategory : c.id === selCat
                }
                disabled={answered}
                state={chipState(c.id)}
                onClick={() => setSelCat(c.id)}
              />
            ))}
          </div>
        </div>

        {/* Priority */}
        <div className="mt-7">
          <span className="mb-3 block text-sm font-semibold text-ink">
            Priority
          </span>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <PriorityChoice
              value="normal"
              selected={
                answered ? answer.selectedPriority === 'normal' : selPri === 'normal'
              }
              disabled={answered}
              correct={answered ? fax.correctPriority === 'normal' : undefined}
              picked={answered ? answer.selectedPriority === 'normal' : false}
              onClick={() => setSelPri('normal')}
            />
            <PriorityChoice
              value="abnormal"
              selected={
                answered
                  ? answer.selectedPriority === 'abnormal'
                  : selPri === 'abnormal'
              }
              disabled={answered}
              correct={answered ? fax.correctPriority === 'abnormal' : undefined}
              picked={answered ? answer.selectedPriority === 'abnormal' : false}
              onClick={() => setSelPri('abnormal')}
            />
          </div>
        </div>

        {/* Submit / Feedback */}
        {!answered ? (
          <div className="mt-7">
            <Button
              size="lg"
              className="w-full"
              disabled={!selCat || !selPri}
              onClick={handleSubmit}
            >
              Submit answer
            </Button>
            {(!selCat || !selPri) && (
              <p className="mt-2 text-center text-2xs text-ink-faint">
                Choose a category and a priority to submit.
              </p>
            )}
          </div>
        ) : (
          <Feedback
            fax={fax}
            categoryCorrect={!!answer.isCategoryCorrect}
            priorityCorrect={!!answer.isPriorityCorrect}
            correctCategoryEl={<CategoryBadge category={correctCat} />}
          />
        )}

        {/* Pager */}
        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="secondary"
            disabled={idx === 0}
            onClick={() => onNavigate(idx - 1)}
          >
            <ArrowLeft className="h-[18px] w-[18px]" />
            Previous
          </Button>

          {isLast ? (
            <Button onClick={onComplete} disabled={!answered}>
              Finish & see results
              <ArrowRight className="h-[18px] w-[18px]" />
            </Button>
          ) : (
            <Button onClick={() => onNavigate(idx + 1)} disabled={!answered}>
              Next question
              <ArrowRight className="h-[18px] w-[18px]" />
            </Button>
          )}
        </div>

        {/* Question navigator */}
        <QuestionNav idx={idx} onNavigate={onNavigate} />
      </div>
    </div>
  );
}

function PriorityChoice({
  value,
  selected,
  disabled,
  correct,
  picked,
  onClick,
}: {
  value: Priority;
  selected: boolean;
  disabled?: boolean;
  correct?: boolean;
  picked?: boolean;
  onClick: () => void;
}) {
  const isNormal = value === 'normal';
  const accent = isNormal ? '#639922' : '#E24B4A';
  const tint = isNormal ? 'rgba(99,153,34,0.10)' : 'rgba(226,75,74,0.08)';
  const showCorrectMark = disabled && correct;
  const showWrongMark = disabled && picked && !correct;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={[
        'relative flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-200 ease-snap',
        disabled ? 'cursor-default' : 'hover:-translate-y-px hover:shadow-soft',
        selected || showCorrectMark
          ? 'border-transparent shadow-soft'
          : 'border-line bg-surface hover:border-line-strong',
        showWrongMark ? 'opacity-70' : '',
      ].join(' ')}
      style={
        selected || showCorrectMark
          ? { backgroundColor: tint, boxShadow: `inset 0 0 0 1.5px ${accent}66` }
          : undefined
      }
    >
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
        style={{ backgroundColor: tint, color: accent }}
      >
        {isNormal ? (
          <CheckCircle className="h-5 w-5" />
        ) : (
          <Flag className="h-5 w-5" />
        )}
      </span>
      <span className="flex-1">
        <span
          className="block text-sm font-semibold capitalize"
          style={{ color: selected || showCorrectMark ? accent : '#3D3B36' }}
        >
          {value}
        </span>
        <span className="block text-2xs text-ink-faint">
          {isNormal ? 'Routine — no urgent action' : 'Needs prompt review'}
        </span>
      </span>
      {showCorrectMark && (
        <span
          className="text-2xs font-bold uppercase tracking-wide"
          style={{ color: accent }}
        >
          correct
        </span>
      )}
      {showWrongMark && <XCircle className="h-4 w-4 text-alert" />}
    </button>
  );
}

function Feedback({
  fax,
  categoryCorrect,
  priorityCorrect,
  correctCategoryEl,
}: {
  fax: (typeof FAXES)[number];
  categoryCorrect: boolean;
  priorityCorrect: boolean;
  correctCategoryEl: React.ReactNode;
}) {
  const guardrail = fax.guardrailId ? GUARDRAIL_MAP[fax.guardrailId] : null;
  const bothRight = categoryCorrect && priorityCorrect;

  return (
    <div className="animate-fade-up mt-7 overflow-hidden rounded-2xl border border-line bg-surface shadow-soft">
      <div
        className={`flex items-center gap-2 px-5 py-3.5 ${
          bothRight ? 'bg-ok/[0.08]' : 'bg-[#FCFBF8]'
        }`}
      >
        {bothRight ? (
          <CheckCircle className="h-5 w-5 text-ok" />
        ) : (
          <Info className="h-5 w-5 text-ink-muted" />
        )}
        <span className="text-sm font-semibold text-ink">
          {bothRight ? 'Both correct — nicely done.' : 'Here’s the breakdown.'}
        </span>
      </div>

      <div className="grid gap-px bg-line sm:grid-cols-2">
        <Verdict
          label="Category"
          correct={categoryCorrect}
          answerEl={correctCategoryEl}
        />
        <Verdict
          label="Priority"
          correct={priorityCorrect}
          answerEl={
            <span
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold capitalize"
              style={{
                color: fax.correctPriority === 'normal' ? '#3B6D11' : '#A32D2D',
              }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor:
                    fax.correctPriority === 'normal' ? '#639922' : '#E24B4A',
                }}
              />
              {fax.correctPriority}
            </span>
          }
        />
      </div>

      <div className="space-y-4 p-5">
        <div>
          <div className="eyebrow mb-1.5 text-ink-faint">Why</div>
          <p className="text-[15px] leading-relaxed text-ink-soft">
            {fax.teachingNote}
          </p>
        </div>

        <div className="rounded-xl border border-dashed border-line-strong bg-[#FCFBF8] px-4 py-3">
          <div className="eyebrow text-ink-faint">Suggested document name</div>
          <div className="mt-1 font-mono text-[13px] text-ink-soft">
            {fax.suggestedDescription}
          </div>
        </div>

        {guardrail && (
          <Link
            to={`/overview/mistakes?focus=${guardrail.id}`}
            className="flex items-start gap-2.5 rounded-xl bg-brand-soft px-4 py-3 text-[13px] text-brand-ink transition-opacity hover:opacity-90"
          >
            <Flag className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              <span className="font-semibold">Related rule: </span>
              {guardrail.title}
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}

function Verdict({
  label,
  correct,
  answerEl,
}: {
  label: string;
  correct: boolean;
  answerEl: React.ReactNode;
}) {
  return (
    <div className="bg-surface p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-ink">{label}</span>
        {correct ? (
          <span className="inline-flex items-center gap-1 text-2xs font-bold uppercase tracking-wide text-ok">
            <CheckCircle className="h-4 w-4" /> Correct
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-2xs font-bold uppercase tracking-wide text-alert">
            <XCircle className="h-4 w-4" /> Incorrect
          </span>
        )}
      </div>
      <div className="mt-2.5 flex items-center gap-2">
        <span className="text-2xs text-ink-faint">Correct answer:</span>
        {answerEl}
      </div>
    </div>
  );
}

function QuestionNav({
  idx,
  onNavigate,
}: {
  idx: number;
  onNavigate: (i: number) => void;
}) {
  const { state } = useProgress();
  return (
    <div className="mt-10 border-t border-line pt-6">
      <div className="eyebrow mb-3">Jump to question</div>
      <div className="grid grid-cols-10 gap-1.5">
        {FAXES.map((f, i) => {
          const a = state.testAnswers.find((x) => x.faxId === f.id)!;
          const done = a.selectedCategory !== null;
          const current = i === idx;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => onNavigate(i)}
              title={`Question ${i + 1}${done ? ' · answered' : ''}`}
              className={[
                'grid h-8 place-items-center rounded-md text-2xs font-semibold tabular-nums transition-all',
                current
                  ? 'bg-ink text-white shadow-soft'
                  : done
                    ? 'bg-brand-soft text-brand-ink hover:bg-brand/20'
                    : 'bg-surface text-ink-faint ring-1 ring-line hover:ring-line-strong',
              ].join(' ')}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
