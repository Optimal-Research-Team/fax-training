import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import type { Category } from '../../data/types';
import { ChevronDown, ArrowRight } from '../../components/icons';

export function Categories() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className="animate-fade-up space-y-8">
      <header>
        <span className="eyebrow">Section 2</span>
        <h2 className="display-tight mt-2 text-3xl font-semibold sm:text-4xl">
          The 13 categories
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Every fax lands in exactly one of these. The color coding matches your
          PDF reference guide — learn the colors and you’ll recognise categories
          at a glance. Expand any card to see examples and a sample document
          name.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {CATEGORIES.map((c) => (
          <CategoryCard
            key={c.id}
            category={c}
            open={expanded.has(c.id)}
            onToggle={() => toggle(c.id)}
          />
        ))}
      </div>
    </div>
  );
}

function CategoryCard({
  category,
  open,
  onToggle,
}: {
  category: Category;
  open: boolean;
  onToggle: () => void;
}) {
  const navigate = useNavigate();

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-shadow hover:shadow-soft"
      style={{ borderLeft: `3px solid ${category.color}` }}
    >
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: category.color }}
          />
          <h3 className="text-base font-semibold tracking-tight text-ink">
            {category.name}
          </h3>
        </div>
        <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
          {category.definition}
        </p>

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="mt-4 inline-flex items-center gap-1 self-start text-[13px] font-semibold text-ink-soft transition-colors hover:text-ink"
        >
          {open ? 'Hide examples' : 'See examples'}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {open && (
          <div className="animate-slide-down mt-4 space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {category.examples.map((ex) => (
                <span
                  key={ex}
                  className="rounded-md px-2 py-1 text-xs font-medium"
                  style={{ backgroundColor: category.bg, color: category.text }}
                >
                  {ex}
                </span>
              ))}
            </div>
            <div className="rounded-lg border border-dashed border-line-strong bg-[#FCFBF8] px-3 py-2.5">
              <div className="text-2xs font-semibold uppercase tracking-wide text-ink-faint">
                Sample name
              </div>
              <div className="mt-0.5 font-mono text-[13px] text-ink-soft">
                {category.namingExample}
              </div>
            </div>
          </div>
        )}
      </div>

      {category.mistakeId && (
        <button
          type="button"
          onClick={() =>
            navigate(`/overview/mistakes?focus=${category.mistakeId}`)
          }
          className="flex items-center justify-between gap-2 border-t border-line bg-[#FCFBF8] px-5 py-3 text-left text-xs font-medium text-ink-muted transition-colors hover:bg-ink/[0.03] hover:text-ink"
        >
          Watch out for the common mistake
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
