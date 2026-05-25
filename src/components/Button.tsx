import { Link, type LinkProps } from 'react-router-dom';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-ink text-white shadow-soft hover:bg-ink-soft hover:shadow-lift disabled:bg-ink/30 disabled:shadow-none',
  secondary:
    'bg-surface text-ink border border-line-strong shadow-card hover:border-ink/30 hover:shadow-soft disabled:opacity-50',
  ghost:
    'text-ink-soft hover:bg-ink/5 disabled:opacity-40',
};

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-[13px] gap-1.5 rounded-lg',
  md: 'h-11 px-5 text-sm gap-2 rounded-xl',
  lg: 'h-[52px] px-7 text-[15px] gap-2.5 rounded-xl',
};

const base =
  'inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-200 ease-snap outline-none disabled:cursor-not-allowed select-none';

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${base} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
} & LinkProps) {
  return (
    <Link
      className={`${base} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
