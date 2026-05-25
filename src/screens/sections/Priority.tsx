import { useState } from 'react';
import { PRIORITY } from '../../data/priority';
import { CATEGORIES, getCategory } from '../../data/categories';
import type { CategoryId } from '../../data/types';
import { AlertTriangle, CheckCircle, XCircle } from '../../components/icons';

export function Priority() {
  const [selected, setSelected] = useState<CategoryId>('Lab');
  const rules = PRIORITY.perCategory[selected];
  const category = getCategory(selected);

  return (
    <div className="animate-fade-up space-y-9">
      <header>
        <span className="eyebrow">Section 4</span>
        <h2 className="display-tight mt-2 text-3xl font-semibold sm:text-4xl">
          Priority triage — normal vs. abnormal
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
          After the category, every fax gets a priority. The triggers differ by
          category — pick one below to see exactly what makes it abnormal.
        </p>
      </header>

      {/* Global principle */}
      <div className="rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6">
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-alert/10 text-alert">
            <AlertTriangle className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[15px] font-medium leading-relaxed text-ink">
              {PRIORITY.global.principle}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {PRIORITY.global.constraint}
            </p>
          </div>
        </div>
        <ul className="mt-4 grid gap-2 sm:grid-cols-3">
          {PRIORITY.global.rules.map((r) => (
            <li
              key={r}
              className="rounded-lg bg-[#FCFBF8] px-3 py-2.5 text-[13px] leading-relaxed text-ink-soft"
            >
              {r}
            </li>
          ))}
        </ul>
      </div>

      {/* Category selector */}
      <div>
        <div className="eyebrow mb-3">Pick a category</div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const active = c.id === selected;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelected(c.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] font-medium transition-all ${
                  active
                    ? 'border-transparent shadow-soft'
                    : 'border-line bg-surface text-ink-soft hover:border-line-strong'
                }`}
                style={
                  active
                    ? { backgroundColor: c.bg, color: c.text }
                    : undefined
                }
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: c.color }}
                />
                {c.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Two columns for selected category */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Abnormal */}
        <div className="overflow-hidden rounded-2xl border border-alert/25 bg-surface shadow-card">
          <div className="flex items-center gap-2 border-b border-alert/15 bg-alert/[0.06] px-5 py-3.5">
            <XCircle className="h-5 w-5 text-alert" />
            <h3 className="text-sm font-semibold text-alert">
              Flag <span className="uppercase tracking-wide">abnormal</span> if
              any apply
            </h3>
          </div>
          <div className="thin-scroll max-h-[420px] overflow-y-auto p-4">
            {rules.rule ? (
              <p className="text-sm text-ink-soft">{rules.rule}</p>
            ) : (
              <ul className="space-y-1.5">
                {rules.abnormalIfAny?.map((t) => (
                  <li
                    key={t}
                    className="flex gap-2.5 rounded-lg px-2 py-1.5 text-[13px] leading-relaxed text-ink-soft"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-alert/70" />
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Normal */}
        <div className="overflow-hidden rounded-2xl border border-ok/25 bg-surface shadow-card">
          <div className="flex items-center gap-2 border-b border-ok/15 bg-ok/[0.06] px-5 py-3.5">
            <CheckCircle className="h-5 w-5 text-ok" />
            <h3 className="text-sm font-semibold text-ok">
              Keep <span className="uppercase tracking-wide">normal</span> when
            </h3>
          </div>
          <div className="p-5">
            <p className="text-sm leading-relaxed text-ink-soft">
              {rules.normalIf ?? 'Always normal.'}
            </p>
            <div className="mt-5 flex items-center gap-2 rounded-lg bg-[#FCFBF8] px-3 py-2.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-xs font-medium text-ink-muted">
                Showing rules for{' '}
                <span style={{ color: category.text }}>{category.name}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
