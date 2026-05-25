import { Link } from 'react-router-dom';

export function Logo({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <span
      className={`grid place-items-center rounded-xl bg-brand text-white shadow-[0_4px_14px_-4px_rgba(15,110,86,0.6)] ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-[55%] w-[55%]">
        <path
          d="M7 8V4h10v4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 8h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1v-4H7v4H6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 13.5h5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function BrandMark({
  to = '/',
  subtitle = 'Fax Classification Training',
}: {
  to?: string;
  subtitle?: string;
}) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-3 rounded-xl outline-none"
    >
      <Logo />
      <span className="leading-tight">
        <span className="block text-[15px] font-semibold tracking-tight text-ink">
          Optimal Health
        </span>
        <span className="block text-xs text-ink-muted">{subtitle}</span>
      </span>
    </Link>
  );
}
