import { useNavigate } from 'react-router-dom';
import { BrandMark } from '../components/BrandMark';
import { ButtonLink, Button } from '../components/Button';
import { FaxPreview } from '../components/FaxPreview';
import { CategoryButton } from '../components/CategoryChip';
import { useProgress } from '../context/ProgressContext';
import { CATEGORIES } from '../data/categories';
import { FAXES } from '../data/faxes';
import {
  ArrowRight,
  BookOpen,
  Target,
  Restart,
  CheckCircle,
} from '../components/icons';

const TEASER_FAX = FAXES[1]; // ECG — a classic trap

export function Landing() {
  const navigate = useNavigate();
  const {
    testInProgress,
    testComplete,
    answeredCount,
    sectionsVisited,
    overviewComplete,
    resetAll,
  } = useProgress();

  const startOver = () => {
    if (
      window.confirm(
        'Start over? This clears your overview progress and all test answers.',
      )
    ) {
      resetAll();
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-20 items-center justify-between">
          <BrandMark />
          <span className="hidden text-xs font-medium text-ink-muted sm:block">
            beOptimal.ca · Internal training
          </span>
        </div>

        <main className="grid items-center gap-12 pb-24 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-16">
          {/* Copy column */}
          <div className="min-w-0 animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-2xs font-semibold uppercase tracking-[0.12em] text-ink-muted shadow-card">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              Medical admin certification
            </span>

            <h1 className="display-tight mt-6 text-[2.75rem] font-semibold text-ink sm:text-6xl">
              Classify every inbound fax with confidence.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Our AI classifier is fast — but it isn’t perfect. This module
              teaches you the exact ruleset it follows, then tests your judgment
              on {FAXES.length} realistic faxes so you can verify and correct its
              work.
            </p>

            {/* Resume / CTA states */}
            <div className="mt-9">
              {testComplete ? (
                <div className="flex flex-wrap items-center gap-3">
                  <ButtonLink to="/results" size="lg">
                    View your results
                    <ArrowRight className="h-[18px] w-[18px]" />
                  </ButtonLink>
                  <Button variant="secondary" size="lg" onClick={startOver}>
                    <Restart className="h-[18px] w-[18px]" />
                    Restart training
                  </Button>
                </div>
              ) : testInProgress ? (
                <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
                  <p className="text-sm font-medium text-ink">
                    You have a training in progress —{' '}
                    <span className="text-brand-ink">
                      question {Math.min(answeredCount + 1, FAXES.length)} of{' '}
                      {FAXES.length}
                    </span>
                    .
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <ButtonLink to="/test" size="md">
                      Resume test
                      <ArrowRight className="h-[18px] w-[18px]" />
                    </ButtonLink>
                    <Button variant="ghost" size="md" onClick={startOver}>
                      Start over
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-3">
                  <ButtonLink to="/overview" size="lg">
                    {sectionsVisited > 0 ? 'Continue training' : 'Start training'}
                    <ArrowRight className="h-[18px] w-[18px]" />
                  </ButtonLink>
                  {overviewComplete && (
                    <ButtonLink to="/test" variant="secondary" size="lg">
                      Skip to the test
                    </ButtonLink>
                  )}
                </div>
              )}
            </div>

            {/* Two-step explainer */}
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              <StepCard
                n={1}
                icon={<BookOpen className="h-5 w-5" />}
                title="Interactive overview"
                body="Click through the 13 categories, the naming formula, priority triage, and the common-mistake guardrails."
              />
              <StepCard
                n={2}
                icon={<Target className="h-5 w-5" />}
                title={`${FAXES.length}-question practice test`}
                body="Pick a category and priority for each fax. Get instant feedback and a scored breakdown."
              />
            </div>
          </div>

          {/* Visual column */}
          <div className="min-w-0 animate-scale-in [animation-delay:120ms]">
            <div className="relative">
              <div className="dot-grid absolute inset-0 -z-10 scale-105 rounded-3xl opacity-70" />
              <div className="rounded-3xl border border-line bg-surface/70 p-4 shadow-lift backdrop-blur sm:p-5">
                <div className="mb-3 flex items-center justify-between px-1">
                  <span className="eyebrow">Sample question</span>
                  <span className="text-2xs font-medium text-ink-faint">
                    Question 2 / {FAXES.length}
                  </span>
                </div>
                <FaxPreview fax={TEASER_FAX} />
                <div className="mt-4 px-1">
                  <span className="eyebrow text-ink-faint">Choose a category</span>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {CATEGORIES.slice(0, 6).map((c) => (
                      <CategoryButton
                        key={c.id}
                        category={c}
                        selected={c.id === 'Lab'}
                        disabled
                        onClick={() => navigate('/overview')}
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-2 rounded-xl bg-brand-soft px-3 py-2.5 text-[13px] font-medium text-brand-ink">
                    <CheckCircle className="h-4 w-4 shrink-0" />
                    ECGs are Lab — even on cardiology letterhead.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Category palette footer motif */}
        <footer className="border-t border-line py-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {CATEGORIES.map((c) => (
                <span
                  key={c.id}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: c.color }}
                  />
                  {c.name}
                </span>
              ))}
            </div>
            <p className="text-2xs text-ink-faint">
              13 categories · 2 priority levels · localStorage progress
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function StepCard({
  n,
  icon,
  title,
  body,
}: {
  n: number;
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="card group p-5 transition-shadow hover:shadow-soft">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-brand-ink">
          {icon}
        </span>
        <span className="text-2xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
          Step {n}
        </span>
      </div>
      <h3 className="mt-4 text-base font-semibold tracking-tight text-ink">
        {title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{body}</p>
    </div>
  );
}
