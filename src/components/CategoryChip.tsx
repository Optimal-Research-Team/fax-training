import type { Category } from '../data/types';
import { Check } from './icons';

export function CategoryDot({
  category,
  size = 8,
}: {
  category: Category;
  size?: number;
}) {
  return (
    <span
      className="inline-block shrink-0 rounded-full"
      style={{ width: size, height: size, backgroundColor: category.color }}
    />
  );
}

/** Read-only tinted label used in feedback, results, review. */
export function CategoryBadge({
  category,
  className = '',
}: {
  category: Category;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[13px] font-semibold ${className}`}
      style={{ backgroundColor: category.bg, color: category.text }}
    >
      <CategoryDot category={category} size={7} />
      {category.name}
    </span>
  );
}

/** Selectable chip used on the test screen. */
export function CategoryButton({
  category,
  selected,
  disabled,
  state,
  onClick,
}: {
  category: Category;
  selected: boolean;
  disabled?: boolean;
  /** Post-submit visual state */
  state?: 'correct' | 'wrong' | 'reveal' | null;
  onClick: () => void;
}) {
  const showAccent = selected || state === 'correct' || state === 'reveal';
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-pressed={selected}
      className={[
        'group relative flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 ease-snap',
        disabled ? 'cursor-default' : 'hover:-translate-y-px hover:shadow-soft',
        showAccent
          ? 'border-transparent shadow-soft'
          : 'border-line bg-surface text-ink-soft hover:border-line-strong',
        state === 'wrong' ? 'opacity-60' : '',
      ].join(' ')}
      style={
        showAccent
          ? { backgroundColor: category.bg, color: category.text, boxShadow: `inset 0 0 0 1.5px ${category.color}55` }
          : undefined
      }
    >
      <span
        className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: category.color }}
      />
      <span className="flex-1 truncate">{category.name}</span>
      {state === 'correct' && (
        <Check className="h-4 w-4" style={{ color: category.text }} />
      )}
      {state === 'reveal' && (
        <span
          className="text-2xs font-semibold uppercase tracking-wide"
          style={{ color: category.text }}
        >
          answer
        </span>
      )}
    </button>
  );
}
