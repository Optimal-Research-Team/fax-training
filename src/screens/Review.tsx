import { useMemo, useState } from 'react';
import { TopBar } from '../components/TopBar';
import { ButtonLink } from '../components/Button';
import { CategoryBadge } from '../components/CategoryChip';
import { useProgress } from '../context/ProgressContext';
import { FAXES } from '../data/faxes';
import { getCategory } from '../data/categories';
import type { CategoryId, Priority } from '../data/types';
import {
  ArrowLeft,
  ChevronDown,
  CheckCircle,
  XCircle,
} from '../components/icons';

type Filter = 'all' | 'incorrect';

export function Review() {
  const { state } = useProgress();
  const [filter, setFilter] = useState<Filter>('all');
  const [open, setOpen] = useState<number | null>(null);

  const rows = useMemo(
    () =>
      FAXES.map((fax) => {
        const a = state.testAnswers.find((x) => x.faxId === fax.id)!;
        const fullyRight = a.isCategoryCorrect && a.isPriorityCorrect;
        return { fax, a, fullyRight };
      }),
    [state.testAnswers],
  );

  const visible = rows.filter((r) =>
    filter === 'incorrect' ? !r.fullyRight : true,
  );
  const wrongCount = rows.filter((r) => !r.fullyRight).length;

  return (
    <div className="min-h-screen bg-paper">
      <TopBar
        step={3}
        right={
          <ButtonLink to="/results" variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
            Back to results
          </ButtonLink>
        }
      />

      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Answer review</span>
            <h1 className="display-tight mt-1 font-display text-3xl font-semibold text-ink">
              All {FAXES.length} questions
            </h1>
          </div>
          <div className="inline-flex rounded-xl border border-line bg-surface p-1 shadow-card">
            <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
              All
            </FilterButton>
            <FilterButton
              active={filter === 'incorrect'}
              onClick={() => setFilter('incorrect')}
            >
              Needs review ({wrongCount})
            </FilterButton>
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="rounded-2xl border border-line bg-surface px-6 py-16 text-center shadow-card">
            <CheckCircle className="mx-auto h-9 w-9 text-ok" />
            <p className="mt-3 font-medium text-ink">Nothing to review.</p>
            <p className="text-sm text-ink-muted">
              You answered every question correctly.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {visible.map(({ fax, a, fullyRight }) => {
              const isOpen = open === fax.id;
              const correctCat = getCategory(fax.correctCategory);
              return (
                <div
                  key={fax.id}
                  className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : fax.id)}
                    className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-ink/[0.02]"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-ink/5 text-2xs font-bold text-ink-muted">
                      {fax.id}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink">
                        {fax.display.sender}
                      </span>
                      <span className="block truncate text-2xs text-ink-faint">
                        {fax.display.snippet.split('\n')[0]}
                      </span>
                    </span>
                    <span className="hidden items-center gap-1 sm:flex">
                      <Mark ok={!!a.isCategoryCorrect} label="Cat" />
                      <Mark ok={!!a.isPriorityCorrect} label="Pri" />
                    </span>
                    <span
                      className={`grid h-6 w-6 place-items-center rounded-full ${
                        fullyRight ? 'bg-ok/10 text-ok' : 'bg-alert/10 text-alert'
                      }`}
                    >
                      {fullyRight ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <XCircle className="h-4 w-4" />
                      )}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-ink-faint transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="animate-slide-down border-t border-line px-5 py-5">
                      <pre className="ocr mb-4 whitespace-pre-wrap rounded-xl bg-[#FCFBF8] p-4 font-mono">
                        {fax.display.snippet}
                      </pre>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <CompareRow
                          label="Category"
                          correct={!!a.isCategoryCorrect}
                          yours={
                            a.selectedCategory ? (
                              <CategoryBadge
                                category={getCategory(a.selectedCategory as CategoryId)}
                              />
                            ) : (
                              <span className="text-2xs text-ink-faint">No answer</span>
                            )
                          }
                          right={<CategoryBadge category={correctCat} />}
                        />
                        <CompareRow
                          label="Priority"
                          correct={!!a.isPriorityCorrect}
                          yours={<PriorityTag p={a.selectedPriority} />}
                          right={<PriorityTag p={fax.correctPriority} />}
                        />
                      </div>

                      <div className="mt-4 rounded-xl bg-brand-soft/50 px-4 py-3">
                        <div className="eyebrow text-brand-ink/70">Teaching note</div>
                        <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">
                          {fax.teachingNote}
                        </p>
                      </div>

                      <div className="mt-3 font-mono text-2xs text-ink-faint">
                        Suggested name: {fax.suggestedDescription}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors ${
        active ? 'bg-ink text-white' : 'text-ink-muted hover:text-ink'
      }`}
    >
      {children}
    </button>
  );
}

function Mark({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-2xs font-semibold ${
        ok ? 'bg-ok/10 text-ok' : 'bg-alert/10 text-alert'
      }`}
    >
      {ok ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
      {label}
    </span>
  );
}

function CompareRow({
  label,
  correct,
  yours,
  right,
}: {
  label: string;
  correct: boolean;
  yours: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-line p-3.5">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-[13px] font-semibold text-ink">{label}</span>
        {correct ? (
          <CheckCircle className="h-4 w-4 text-ok" />
        ) : (
          <XCircle className="h-4 w-4 text-alert" />
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-12 text-2xs text-ink-faint">Yours</span>
          {yours}
        </div>
        <div className="flex items-center gap-2">
          <span className="w-12 text-2xs text-ink-faint">Correct</span>
          {right}
        </div>
      </div>
    </div>
  );
}

function PriorityTag({ p }: { p: Priority | null }) {
  if (!p) return <span className="text-2xs text-ink-faint">No answer</span>;
  const normal = p === 'normal';
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[13px] font-semibold capitalize"
      style={{ color: normal ? '#3B6D11' : '#A32D2D' }}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: normal ? '#639922' : '#E24B4A' }}
      />
      {p}
    </span>
  );
}
