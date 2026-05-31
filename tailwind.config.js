/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        cyber: {
          bg:         '#0b1120',
          surface:    '#141e33',
          'surface-2':'#1b2a47',
          primary:    '#38bdf8',
          secondary:  '#818cf8',
          accent:     '#22d3ee',
          success:    '#34d399',
          warning:    '#fbbf24',
          danger:     '#f87171',
          text:       '#f1f5f9',
          muted:      '#94a3b8',
          dim:        '#475569',
        },
      },
      boxShadow: {
        'clay-dark':    '6px 6px 20px rgba(0,0,0,0.55), -3px -3px 10px rgba(255,255,255,0.03), inset 1px 1px 2px rgba(255,255,255,0.07), inset -1px -1px 2px rgba(0,0,0,0.45)',
        'clay-dark-sm': '4px 4px 14px rgba(0,0,0,0.50), -2px -2px 8px rgba(255,255,255,0.02), inset 1px 1px 1px rgba(255,255,255,0.05), inset -1px -1px 1px rgba(0,0,0,0.38)',
        'clay-dark-lg': '10px 10px 32px rgba(0,0,0,0.65), -5px -5px 16px rgba(255,255,255,0.04), inset 2px 2px 4px rgba(255,255,255,0.09), inset -2px -2px 4px rgba(0,0,0,0.50)',
        'clay-dark-pressed': '2px 2px 8px rgba(0,0,0,0.65), inset 5px 5px 14px rgba(0,0,0,0.55), inset -2px -2px 6px rgba(255,255,255,0.04)',
        'clay-sky':     '6px 6px 20px rgba(0,0,0,0.55), 0 0 28px rgba(56,189,248,0.18), -3px -3px 10px rgba(255,255,255,0.03), inset 1px 1px 2px rgba(56,189,248,0.22), inset -1px -1px 2px rgba(0,0,0,0.40)',
        'glow-sky':     '0 0 24px rgba(56,189,248,0.30)',
        'glow-violet':  '0 0 24px rgba(129,140,248,0.30)',
        'glow-cyan':    '0 0 24px rgba(34,211,238,0.30)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-14px)' },
        },
        'scan-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%':      { opacity: '1' },
        },
        'border-glow': {
          '0%, 100%': { borderColor: 'rgba(56,189,248,0.2)' },
          '50%':      { borderColor: 'rgba(56,189,248,0.6)' },
        },
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'float-slow':   'float 9s ease-in-out infinite',
        'scan-pulse':   'scan-pulse 2s ease-in-out infinite',
        'border-glow':  'border-glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
