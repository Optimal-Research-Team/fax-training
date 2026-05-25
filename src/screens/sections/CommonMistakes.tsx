import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GUARDRAILS } from '../../data/guardrails';
import { useProgress } from '../../context/ProgressContext';
import { Check, AlertTriangle } from '../../components/icons';

export function CommonMistakes() {
  const { state, acknowledgeMistake, mistakesAcknowledged, totalMistakes } =
    useProgress();
  const [params] = useSearchParams();
  const focusId = params.get('focus');

  return (
    <div className="animate-fade-up space-y-8">
      <header>
        <span className="eyebrow">Section 5</span>
        <h2 className="display-tight mt-2 text-3xl font-semibold sm:text-4xl">
          Common mistakes
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
          These ten traps account for most misclassifications. Flip each card to
          read the correction, then mark it as understood — you’ll need all ten
          acknowledged before the test unlocks.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1.5 text-[13px] font-semibold text-brand-ink">
          <Check className="h-4 w-4" />
          {mistakesAcknowledged} / {totalMistakes} acknowledged
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {GUARDRAILS.map((g, i) => (
          <FlipCard
            key={g.id}
            index={i + 1}
            id={g.id}
            title={g.title}
            rule={g.rule}
            acknowledged={state.mistakesAcknowledged.includes(g.id)}
            onAcknowledge={(v) => acknowledgeMistake(g.id, v)}
            autoFocus={focusId === g.id}
          />
        ))}
      </div>
    </div>
  );
}

function FlipCard({
  index,
  title,
  rule,
  acknowledged,
  onAcknowledge,
  autoFocus,
}: {
  index: number;
  id: string;
  title: string;
  rule: string;
  acknowledged: boolean;
  onAcknowledge: (v: boolean) => void;
  autoFocus?: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (autoFocus) {
      setFlipped(true);
      setHighlight(true);
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const t = setTimeout(() => setHighlight(false), 2000);
      return () => clearTimeout(t);
    }
  }, [autoFocus]);

  return (
    <div
      ref={ref}
      className={`[perspective:1400px] transition-shadow ${highlight ? 'rounded-2xl ring-2 ring-brand ring-offset-2 ring-offset-paper' : ''}`}
    >
      <div
        className="relative h-[228px] w-full cursor-pointer transition-transform duration-500 ease-snap [transform-style:preserve-3d]"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        onClick={() => setFlipped((v) => !v)}
      >
        {/* Front */}
        <div className="absolute inset-0 flex flex-col rounded-2xl border border-line bg-surface p-5 shadow-card [backface-visibility:hidden]">
          <div className="flex items-center justify-between">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink/5 text-2xs font-bold text-ink-muted">
              {index.toString().padStart(2, '0')}
            </span>
            {acknowledged && (
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-2 py-1 text-2xs font-semibold text-brand-ink">
                <Check className="h-3 w-3" /> Understood
              </span>
            )}
          </div>
          <h3 className="mt-auto text-lg font-semibold leading-snug tracking-tight text-ink">
            {title}
          </h3>
          <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-faint">
            <AlertTriangle className="h-3.5 w-3.5" />
            Tap to see the correction
          </span>
        </div>

        {/* Back */}
        <div className="absolute inset-0 flex flex-col rounded-2xl border border-ink/10 bg-ink p-5 text-white shadow-soft [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="thin-scroll flex-1 overflow-y-auto">
            <p className="text-[14px] leading-relaxed text-white/85">{rule}</p>
          </div>
          <label
            onClick={(e) => e.stopPropagation()}
            className="mt-3 flex cursor-pointer select-none items-center gap-2.5 border-t border-white/15 pt-3 text-[13px] font-medium text-white/90"
          >
            <button
              type="button"
              onClick={() => onAcknowledge(!acknowledged)}
              className={`grid h-5 w-5 place-items-center rounded-md border transition-colors ${
                acknowledged
                  ? 'border-brand bg-brand text-white'
                  : 'border-white/30 bg-white/5'
              }`}
              aria-pressed={acknowledged}
            >
              {acknowledged && <Check className="h-3.5 w-3.5" />}
            </button>
            Mark as understood
          </label>
        </div>
      </div>
    </div>
  );
}
