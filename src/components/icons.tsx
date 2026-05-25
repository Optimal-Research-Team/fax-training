import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const Check = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const CheckCircle = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
    <path d="m8.5 12.5 2.5 2.5 4.5-5" />
  </svg>
);

export const XCircle = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
    <path d="m15 9-6 6m0-6 6 6" />
  </svg>
);

export const ArrowRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14m-6-6 6 6-6 6" />
  </svg>
);

export const ArrowLeft = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M19 12H5m6 6-6-6 6-6" />
  </svg>
);

export const ChevronRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const ChevronDown = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const Clock = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const Lock = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

export const Restart = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

export const FaxIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M7 9V4h10v5" />
    <path d="M5 9h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1v-5H7v5H6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z" />
    <path d="M8 14h8v6H8z" />
  </svg>
);

export const Layers = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 13 9 5 9-5" />
  </svg>
);

export const Sparkle = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3v4m0 10v4m9-9h-4M7 12H3m13.5-6.5-2.8 2.8M9.3 14.7l-2.8 2.8m11 0-2.8-2.8M9.3 9.3 6.5 6.5" />
  </svg>
);

export const Info = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5m0-8h.01" />
  </svg>
);

export const Flag = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 21V4m0 1 5-1c2 0 3 1 5 1l4-1v10l-4 1c-2 0-3-1-5-1l-5 1" />
  </svg>
);

export const AlertTriangle = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M10.3 3.6 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z" />
    <path d="M12 9v4m0 4h.01" />
  </svg>
);

export const BookOpen = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 7c-1.5-1.3-3.5-2-6-2H3v13h3c2.5 0 4.5.7 6 2m0-13c1.5-1.3 3.5-2 6-2h3v13h-3c-2.5 0-4.5.7-6 2m0-13v13" />
  </svg>
);

export const Target = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);
