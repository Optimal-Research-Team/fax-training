import { AlertTriangle, Sparkle, CheckCircle, ArrowRight } from '../../components/icons';

export function WhyThisMatters() {
  return (
    <div className="animate-fade-up space-y-10">
      <header>
        <span className="eyebrow">Section 1</span>
        <h2 className="display-tight mt-2 text-3xl font-semibold sm:text-4xl">
          Why this matters
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Every fax that arrives is auto-sorted by our AI classifier. It’s fast
          and right most of the time — but a misfiled lab result or a missed
          legal deadline can have real consequences. Your job is to be the
          second set of eyes.
        </p>
      </header>

      {/* The loop */}
      <div className="grid gap-4 sm:grid-cols-3">
        <LoopCard
          step="The AI classifies"
          icon={<Sparkle className="h-5 w-5" />}
          body="Each fax is assigned a category and a priority automatically, in seconds."
          tone="brand"
        />
        <LoopCard
          step="You verify"
          icon={<CheckCircle className="h-5 w-5" />}
          body="You read the fax with the same ruleset the AI uses and confirm it got it right."
          tone="ink"
        />
        <LoopCard
          step="You correct"
          icon={<ArrowRight className="h-5 w-5" />}
          body="When the AI is wrong, you fix the category, priority, and document name."
          tone="ink"
        />
      </div>

      {/* The golden principle */}
      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
        <div className="flex items-start gap-4 border-b border-line bg-[#FCFBF8] p-5 sm:p-6">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-alert/10 text-alert">
            <AlertTriangle className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-base font-semibold text-ink">
              The one principle that guides priority
            </h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">
              When in doubt, prefer{' '}
              <strong className="font-semibold text-alert">abnormal</strong> over{' '}
              <strong className="font-semibold text-ok">normal</strong>. A false
              positive (flagging something that turns out fine) is far less
              harmful than a false negative (missing something urgent).
            </p>
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <p className="text-sm leading-relaxed text-ink-muted">
            But there’s a guardrail: never mark a fax{' '}
            <em className="not-italic font-medium text-ink">abnormal</em> unless
            the text actually contains abnormal/critical language, out-of-range
            results, or an urgent action request. Don’t flag on a hunch, and
            never invent findings that aren’t written in the document.
          </p>
        </div>
      </div>

      <p className="text-sm text-ink-muted">
        Ready? Work through each section in the left rail — they unlock the
        practice test once you’ve seen them all.
      </p>
    </div>
  );
}

function LoopCard({
  step,
  icon,
  body,
  tone,
}: {
  step: string;
  icon: React.ReactNode;
  body: string;
  tone: 'brand' | 'ink';
}) {
  return (
    <div className="card p-5">
      <span
        className={`grid h-10 w-10 place-items-center rounded-xl ${
          tone === 'brand'
            ? 'bg-brand-soft text-brand-ink'
            : 'bg-ink/5 text-ink-soft'
        }`}
      >
        {icon}
      </span>
      <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-ink">
        {step}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{body}</p>
    </div>
  );
}
