/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Fraunces Variable"', 'Fraunces', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        paper: '#FAF9F6',
        surface: '#FFFFFF',
        ink: {
          DEFAULT: '#1B1A17',
          soft: '#3D3B36',
          muted: '#76736B',
          faint: '#A4A199',
        },
        line: {
          DEFAULT: '#E9E5DC',
          soft: '#F0EDE5',
          strong: '#DCD7CB',
        },
        brand: {
          DEFAULT: '#0F6E56',
          soft: '#E1F5EE',
          ink: '#0B4E3D',
        },
        ok: '#639922',
        alert: '#E24B4A',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.125rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(27,26,23,0.04), 0 1px 1px rgba(27,26,23,0.03)',
        soft: '0 4px 24px -8px rgba(27,26,23,0.10), 0 2px 6px -2px rgba(27,26,23,0.05)',
        lift: '0 14px 44px -14px rgba(27,26,23,0.20), 0 4px 12px -4px rgba(27,26,23,0.08)',
        focus: '0 0 0 3px rgba(15,110,86,0.18)',
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.04em' }],
      },
      transitionTimingFunction: {
        snap: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fade-in 0.4s ease both',
        'scale-in': 'scale-in 0.35s cubic-bezier(0.22,1,0.36,1) both',
        'slide-down': 'slide-down 0.3s cubic-bezier(0.22,1,0.36,1) both',
      },
    },
  },
  plugins: [],
};
