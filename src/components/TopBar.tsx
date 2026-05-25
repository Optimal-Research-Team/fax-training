import type { ReactNode } from 'react';
import { BrandMark } from './BrandMark';
import { Check } from './icons';

type Step = 1 | 2 | 3;

const STEPS: { n: Step; label: string }[] = [
  { n: 1, label: 'Overview' },
  { n: 2, label: 'Practice test' },
  { n: 3, label: 'Results' },
];

export function Stepper({ current }: { current: Step }) {
  return (
    <div className="hidden items-center gap-1.5 md:flex">
      {STEPS.map((s, i) => {
        const done = s.n < current;
        const active = s.n === current;
        return (
          <div key={s.n} className="flex items-center gap-1.5">
            <span
              className={[
                'flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors',
                active
                  ? 'bg-ink text-white'
                  : done
                    ? 'bg-brand-soft text-brand-ink'
                    : 'text-ink-faint',
              ].join(' ')}
            >
              <span
                className={[
                  'grid h-4 w-4 place-items-center rounded-full text-[10px] font-bold',
                  active
                    ? 'bg-white/20'
                    : done
                      ? 'bg-brand text-white'
                      : 'border border-line-strong',
                ].join(' ')}
              >
                {done ? <Check className="h-2.5 w-2.5" /> : s.n}
              </span>
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <span className="h-px w-4 bg-line-strong" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function TopBar({
  step,
  right,
}: {
  step?: Step;
  right?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <BrandMark />
        {step && <Stepper current={step} />}
        <div className="flex items-center gap-3">{right}</div>
      </div>
    </header>
  );
}
