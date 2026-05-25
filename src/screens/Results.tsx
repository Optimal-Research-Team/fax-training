import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/TopBar';
import { Button, ButtonLink } from '../components/Button';
import { useProgress } from '../context/ProgressContext';
import { FAXES } from '../data/faxes';
import { CATEGORIES, getCategory } from '../data/categories';
import { GUARDRAIL_MAP } from '../data/guardrails';
import type { CategoryId } from '../data/types';
import { calculateResults, formatDuration } from '../lib/scoring';
import {
  Restart,
  BookOpen,
  Target,
  Clock,
  Flag,
  ArrowRight,
  CheckCircle,
} from '../components/icons';

export function Results() {
  const navigate = useNavigate();
  const { state, answeredCount, resetAll } = useProgress();

  const results = useMemo(
    () => calculateResults(state.testAnswers, FAXES),
    [state.testAnswers],
  );

  const restart = () => {
    if (window.confirm('Restart the entire training? Your progress will be cleared.')) {
      resetAll();
      navigate('/');
    }
  };

  if (answeredCount === 0) {
    return (
      <div className="min-h-screen bg-paper">
        <TopBar step={3} />
        <div className="mx-auto max-w-md px-6 py-32 text-center">
          <h1 className="font-display text-3xl font-semibold text-ink">
            No results yet
          </h1>
          <p className="mt-3 text-ink-muted">
            Take the practice test to see your scored breakdown here.
          </p>
          <ButtonLink to="/overview" size="lg" className="mt-7">
            Start training
            <ArrowRight className="h-[18px] w-[18px]" />
          </ButtonLink>
        </div>
      </div>
    );
  }

  const tripped = results.trippedGuardrails
    .map((id) => GUARDRAIL_MAP[id])
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-paper">
      <TopBar
        step={3}
        right={
          <Button variant="ghost" size="sm" onClick={restart}>
            <Restart className="h-4 w-4" />
            Restart
          </Button>
        }
      />

      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        {/* Hero */}
        <div className="animate-fade-up grid items-center gap-8 rounded-3xl border border-line bg-surface p-7 shadow-soft sm:grid-cols-[auto_1fr] sm:p-10">
          <ScoreRing percent={results.percent} pass={results.pass} />
          <div>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-2xs font-bold uppercase tracking-wide ${
                results.pass
                  ? 'bg-ok/10 text-ok'
                  : 'bg-alert/10 text-alert'
              }`}
            >
              {results.pass ? <CheckCircle className="h-4 w-4" /> : null}
              {results.pass ? 'Passed' : 'Not yet passing'}
            </span>
            <h1 className="display-tight mt-3 text-4xl font-semibold text-ink sm:text-5xl">
              {results.score}
              <span className="text-ink-faint"> / {results.maxScore}</span>
            </h1>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink-soft">
              {results.pass
                ? 'You’re cleared to verify inbound faxes. Review anything you missed below to stay sharp.'
                : 'Passing is 80%. Review the mistakes below, then restart the test when you’re ready.'}
            </p>
          </div>
        </div>

        {/* Stat tiles */}
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <Stat
            icon={<Target className="h-5 w-5" />}
            label="Category accuracy"
            value={`${results.categoryCorrect}/${TOTAL}`}
            sub={`${Math.round((results.categoryCorrect / TOTAL) * 100)}% correct`}
          />
          <Stat
            icon={<Flag className="h-5 w-5" />}
            label="Priority accuracy"
            value={`${results.priorityCorrect}/${TOTAL}`}
            sub={`${Math.round((results.priorityCorrect / TOTAL) * 100)}% correct`}
          />
          <Stat
            icon={<Clock className="h-5 w-5" />}
            label="Time taken"
            value={formatDuration(results.totalTimeMs)}
            sub={`${results.answeredCount} of ${TOTAL} answered`}
          />
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          {/* Category breakdown */}
          <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
            <h2 className="text-lg font-semibold tracking-tight text-ink">
              Accuracy by category
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              How well you matched the AI’s category for each type of fax.
            </p>
            <div className="mt-5 space-y-3">
              {CATEGORIES.map((c) => {
                const stat = results.byCategory[c.id as CategoryId];
                if (!stat) return null;
                return <CategoryRow key={c.id} id={c.id} stat={stat} />;
              })}
            </div>
          </div>

          {/* Mistakes you made */}
          <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
            <h2 className="text-lg font-semibold tracking-tight text-ink">
              Mistakes to review
            </h2>
            {tripped.length === 0 ? (
              <div className="mt-5 flex flex-col items-center gap-3 rounded-xl bg-ok/[0.06] px-4 py-10 text-center">
                <CheckCircle className="h-8 w-8 text-ok" />
                <p className="text-sm font-medium text-ink">
                  No guardrail traps tripped.
                </p>
                <p className="text-2xs text-ink-muted">
                  You avoided every common mistake the test checks for.
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {tripped.map((g) => (
                  <div
                    key={g.id}
                    className="rounded-xl border border-line bg-[#FCFBF8] p-4"
                  >
                    <div className="flex items-start gap-2">
                      <Flag className="mt-0.5 h-4 w-4 shrink-0 text-alert" />
                      <div>
                        <h3 className="text-[13px] font-semibold text-ink">
                          {g.title}
                        </h3>
                        <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
                          {g.rule}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          <ButtonLink to="/review" variant="secondary" size="lg">
            <BookOpen className="h-[18px] w-[18px]" />
            Review my answers
          </ButtonLink>
          <Button size="lg" onClick={restart}>
            <Restart className="h-[18px] w-[18px]" />
            Restart training
          </Button>
        </div>
      </div>
    </div>
  );
}

const TOTAL = FAXES.length;

function ScoreRing({ percent, pass }: { percent: number; pass: boolean }) {
  const r = 58;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  const color = pass ? '#1D9E75' : '#E24B4A';
  return (
    <div className="relative grid h-40 w-40 place-items-center">
      <svg className="h-40 w-40 -rotate-90" viewBox="0 0 140 140">
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke="#EDEAE2"
          strokeWidth="10"
        />
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="font-display text-4xl font-semibold text-ink">
          {percent}%
        </div>
        <div className="text-2xs font-medium uppercase tracking-wide text-ink-faint">
          score
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
      <div className="flex items-center gap-2.5 text-ink-muted">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink/5">
          {icon}
        </span>
        <span className="text-[13px] font-medium">{label}</span>
      </div>
      <div className="mt-3 font-display text-2xl font-semibold tabular-nums text-ink">
        {value}
      </div>
      <div className="text-2xs text-ink-faint">{sub}</div>
    </div>
  );
}

function CategoryRow({
  id,
  stat,
}: {
  id: CategoryId;
  stat: { correct: number; total: number };
}) {
  const c = getCategory(id);
  const pct = Math.round((stat.correct / stat.total) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="flex w-28 shrink-0 items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: c.color }}
        />
        <span className="text-[13px] font-medium text-ink-soft">{c.name}</span>
      </div>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full transition-all duration-700 ease-snap"
          style={{ width: `${pct}%`, backgroundColor: c.color }}
        />
      </div>
      <span className="w-12 shrink-0 text-right text-[13px] font-semibold tabular-nums text-ink">
        {stat.correct}/{stat.total}
      </span>
    </div>
  );
}
