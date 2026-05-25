import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TopBar } from '../components/TopBar';
import { Button } from '../components/Button';
import { useProgress, OVERVIEW_SECTIONS, type SectionId } from '../context/ProgressContext';
import { WhyThisMatters } from './sections/WhyThisMatters';
import { Categories } from './sections/Categories';
import { Naming } from './sections/Naming';
import { Priority } from './sections/Priority';
import { CommonMistakes } from './sections/CommonMistakes';
import { Check, ArrowRight, Lock, ArrowLeft } from '../components/icons';

const SECTION_META: { id: SectionId; label: string; blurb: string }[] = [
  { id: 'why', label: 'Why this matters', blurb: 'Your role' },
  { id: 'categories', label: 'The 12 categories', blurb: '12 cards' },
  { id: 'naming', label: 'Naming documents', blurb: 'The formula' },
  { id: 'priority', label: 'Priority triage', blurb: 'Normal vs abnormal' },
  { id: 'mistakes', label: 'Common mistakes', blurb: '10 to acknowledge' },
];

const SECTION_COMPONENTS: Record<SectionId, React.FC> = {
  why: WhyThisMatters,
  categories: Categories,
  naming: Naming,
  priority: Priority,
  mistakes: CommonMistakes,
};

function isSectionId(v: string | undefined): v is SectionId {
  return !!v && (OVERVIEW_SECTIONS as readonly string[]).includes(v);
}

export function Overview() {
  const { section } = useParams();
  const navigate = useNavigate();
  const {
    state,
    visitSection,
    sectionsVisited,
    mistakesAcknowledged,
    totalSections,
    totalMistakes,
    overviewComplete,
  } = useProgress();

  const active: SectionId = isSectionId(section) ? section : 'why';
  const activeIndex = OVERVIEW_SECTIONS.indexOf(active);

  useEffect(() => {
    visitSection(active);
    window.scrollTo({ top: 0 });
  }, [active, visitSection]);

  const ActiveComponent = SECTION_COMPONENTS[active];

  const goTo = (id: SectionId) => navigate(`/overview/${id}`);
  const prev = activeIndex > 0 ? OVERVIEW_SECTIONS[activeIndex - 1] : null;
  const next =
    activeIndex < OVERVIEW_SECTIONS.length - 1
      ? OVERVIEW_SECTIONS[activeIndex + 1]
      : null;

  return (
    <div className="min-h-screen bg-paper">
      <TopBar
        step={1}
        right={
          <div className="flex items-center gap-3">
            <span className="hidden text-[13px] font-medium text-ink-muted sm:block">
              {sectionsVisited}/{totalSections} sections ·{' '}
              {mistakesAcknowledged}/{totalMistakes} mistakes
            </span>
            <StartTestButton enabled={overviewComplete} />
          </div>
        }
      />

      <div className="mx-auto flex max-w-7xl gap-8 px-5 py-8 sm:px-8 lg:gap-12">
        {/* Sticky nav */}
        <aside className="hidden w-[240px] shrink-0 lg:block">
          <nav className="sticky top-24 space-y-1">
            <div className="eyebrow mb-3 px-3">Step 1 · Overview</div>
            {SECTION_META.map((s, i) => {
              const visited = state.overviewSectionsVisited.includes(s.id);
              const isActive = s.id === active;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goTo(s.id)}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                    isActive ? 'bg-surface shadow-card' : 'hover:bg-surface/60'
                  }`}
                >
                  <span
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-2xs font-bold transition-colors ${
                      visited
                        ? 'bg-brand text-white'
                        : isActive
                          ? 'border border-ink bg-paper text-ink'
                          : 'border border-line-strong text-ink-faint'
                    }`}
                  >
                    {visited ? <Check className="h-3.5 w-3.5" /> : i + 1}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block truncate text-sm font-medium ${isActive ? 'text-ink' : 'text-ink-soft'}`}
                    >
                      {s.label}
                    </span>
                    <span className="block truncate text-2xs text-ink-faint">
                      {s.blurb}
                    </span>
                  </span>
                </button>
              );
            })}

            <div className="!mt-5 rounded-xl border border-line bg-surface p-3.5">
              <GateProgress
                sectionsVisited={sectionsVisited}
                totalSections={totalSections}
                mistakesAcknowledged={mistakesAcknowledged}
                totalMistakes={totalMistakes}
              />
            </div>
          </nav>
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1 pb-16">
          {/* Mobile section pills */}
          <div className="no-scrollbar -mx-5 mb-6 flex gap-2 overflow-x-auto px-5 lg:hidden">
            {SECTION_META.map((s, i) => {
              const visited = state.overviewSectionsVisited.includes(s.id);
              const isActive = s.id === active;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goTo(s.id)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-medium ${
                    isActive
                      ? 'border-ink bg-ink text-white'
                      : 'border-line bg-surface text-ink-soft'
                  }`}
                >
                  <span className="grid h-4 w-4 place-items-center rounded-full text-[9px]">
                    {visited ? <Check className="h-3 w-3" /> : i + 1}
                  </span>
                  {s.label}
                </button>
              );
            })}
          </div>

          <ActiveComponent />

          {/* Section pager */}
          <div className="mt-12 flex items-center justify-between border-t border-line pt-6">
            {prev ? (
              <Button variant="secondary" onClick={() => goTo(prev)}>
                <ArrowLeft className="h-[18px] w-[18px]" />
                {SECTION_META[activeIndex - 1].label}
              </Button>
            ) : (
              <span />
            )}
            {next ? (
              <Button onClick={() => goTo(next)}>
                {SECTION_META[activeIndex + 1].label}
                <ArrowRight className="h-[18px] w-[18px]" />
              </Button>
            ) : (
              <StartTestButton enabled={overviewComplete} size="md" />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function StartTestButton({
  enabled,
  size = 'sm',
}: {
  enabled: boolean;
  size?: 'sm' | 'md';
}) {
  const navigate = useNavigate();
  return (
    <Button
      size={size}
      disabled={!enabled}
      onClick={() => navigate('/test')}
      title={
        enabled
          ? undefined
          : 'Visit all 5 sections and acknowledge all 10 mistakes first'
      }
    >
      {enabled ? null : <Lock className="h-4 w-4" />}
      Start the test
      {enabled && <ArrowRight className="h-[18px] w-[18px]" />}
    </Button>
  );
}

function GateProgress({
  sectionsVisited,
  totalSections,
  mistakesAcknowledged,
  totalMistakes,
}: {
  sectionsVisited: number;
  totalSections: number;
  mistakesAcknowledged: number;
  totalMistakes: number;
}) {
  const items = [
    { label: 'Sections visited', v: sectionsVisited, t: totalSections },
    { label: 'Mistakes acknowledged', v: mistakesAcknowledged, t: totalMistakes },
  ];
  return (
    <div className="space-y-3">
      <div className="eyebrow">Unlock the test</div>
      {items.map((it) => (
        <div key={it.label}>
          <div className="flex items-center justify-between text-2xs font-medium text-ink-muted">
            <span>{it.label}</span>
            <span className="tabular-nums">
              {it.v}/{it.t}
            </span>
          </div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-brand transition-all duration-500 ease-snap"
              style={{ width: `${(it.v / it.t) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
