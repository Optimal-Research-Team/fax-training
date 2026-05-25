import { useState } from 'react';
import { NAMING, NAMING_PRESETS, type NamingPreset } from '../../data/naming';
import { Sparkle } from '../../components/icons';

export function Naming() {
  const [prefix, setPrefix] = useState(NAMING.prefixes[0]);
  const [suffix1, setSuffix1] = useState(NAMING.suffix1[0]);
  const [suffix2, setSuffix2] = useState(NAMING.suffix2[0]);
  const [useRegion, setUseRegion] = useState(false);

  const preview = `${prefix} ${suffix1}${useRegion ? ` — ${suffix2}` : ''}`;

  const applyPreset = (p: NamingPreset) => {
    setPrefix(p.prefix);
    setSuffix1(p.suffix1);
    if (p.suffix2) {
      setSuffix2(p.suffix2);
      setUseRegion(true);
    } else {
      setUseRegion(false);
    }
  };

  return (
    <div className="animate-fade-up space-y-9">
      <header>
        <span className="eyebrow">Section 3</span>
        <h2 className="display-tight mt-2 text-3xl font-semibold sm:text-4xl">
          How to name documents
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
          A good name follows a simple formula: a{' '}
          <strong className="font-semibold text-ink">prefix</strong> (the
          subject), a{' '}
          <strong className="font-semibold text-ink">document type</strong>,
          and — only for radiology, imaging, and pathology — a{' '}
          <strong className="font-semibold text-ink">body region</strong>.
        </p>
      </header>

      {/* Formula */}
      <div className="flex flex-wrap items-center gap-2">
        {NAMING.formula.map((part, i) => (
          <div key={part} className="flex items-center gap-2">
            <span className="rounded-lg border border-line bg-surface px-3 py-2 text-sm font-medium text-ink-soft shadow-card">
              {part}
            </span>
            {i < NAMING.formula.length - 1 && (
              <span className="text-ink-faint">+</span>
            )}
          </div>
        ))}
      </div>

      {/* Builder */}
      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
        <div className="grid gap-px bg-line sm:grid-cols-3">
          <Field label="Prefix" value={prefix} onChange={setPrefix} options={NAMING.prefixes} />
          <Field label="Suffix 1 · type" value={suffix1} onChange={setSuffix1} options={NAMING.suffix1} />
          <Field
            label="Suffix 2 · region"
            value={suffix2}
            onChange={setSuffix2}
            options={NAMING.suffix2}
            disabled={!useRegion}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-[#FCFBF8] px-5 py-3">
          <label className="flex cursor-pointer select-none items-center gap-2.5 text-sm font-medium text-ink-soft">
            <button
              type="button"
              role="switch"
              aria-checked={useRegion}
              onClick={() => setUseRegion((v) => !v)}
              className={`relative h-5 w-9 rounded-full transition-colors ${useRegion ? 'bg-brand' : 'bg-line-strong'}`}
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${useRegion ? 'translate-x-4' : 'translate-x-0.5'}`}
              />
            </button>
            Include body region
          </label>
          <span className="text-2xs text-ink-faint">
            Radiology · Imaging · Pathology only
          </span>
        </div>

        {/* Live preview */}
        <div className="border-t border-line p-5 sm:p-6">
          <div className="eyebrow text-ink-faint">Document name preview</div>
          <div className="mt-2 flex items-center gap-2.5">
            <Sparkle className="h-4 w-4 text-brand" />
            <span className="font-mono text-lg font-medium text-ink">
              {preview}
            </span>
          </div>
        </div>
      </div>

      {/* Presets */}
      <div>
        <div className="eyebrow mb-3">Worked examples — tap to load</div>
        <div className="flex flex-wrap gap-2">
          {NAMING_PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => applyPreset(p)}
              title={p.note}
              className="rounded-full border border-line bg-surface px-3.5 py-2 text-[13px] font-medium text-ink-soft shadow-card transition-all hover:-translate-y-px hover:border-ink/30 hover:shadow-soft"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Special rules */}
      <div>
        <h3 className="text-lg font-semibold tracking-tight text-ink">
          Special naming rules
        </h3>
        <p className="mt-1 text-sm text-ink-muted">
          Eight situations where the name needs more than the basic formula.
        </p>
        <div className="mt-4 space-y-2.5">
          {NAMING.specialRules.map((r) => (
            <div
              key={r.trigger}
              className="rounded-xl border border-line bg-surface p-4 shadow-card"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <span className="text-sm font-semibold text-ink">
                  {r.trigger}
                </span>
                {r.example && (
                  <span className="shrink-0 font-mono text-xs text-brand-ink">
                    {r.example}
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                {r.rule}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  options,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  disabled?: boolean;
}) {
  return (
    <label
      className={`block bg-surface px-4 py-3.5 transition-opacity ${disabled ? 'opacity-45' : ''}`}
    >
      <span className="text-2xs font-semibold uppercase tracking-[0.1em] text-ink-faint">
        {label}
      </span>
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full cursor-pointer rounded-lg border border-line bg-paper px-3 py-2 text-sm font-medium text-ink outline-none transition-shadow focus:border-brand focus:shadow-focus disabled:cursor-not-allowed"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
