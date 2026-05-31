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
        clay: {
          bg: '#edf2fb',
          surface: '#ffffff',
          primary: '#7c3aed',
          'primary-light': '#a78bfa',
          'primary-dark': '#5b21b6',
          text: '#1e1b4b',
          muted: '#64748b',
          tag: '#ede9fe',
          'tag-text': '#5b21b6',
          border: '#e2e8f0',
        },
      },
      boxShadow: {
        'clay': '8px 8px 20px rgba(0,0,0,0.10), -4px -4px 12px rgba(255,255,255,0.95), inset 2px 2px 5px rgba(255,255,255,0.85), inset -2px -2px 5px rgba(0,0,0,0.06)',
        'clay-sm': '4px 4px 12px rgba(0,0,0,0.08), -2px -2px 8px rgba(255,255,255,0.90), inset 1px 1px 3px rgba(255,255,255,0.80), inset -1px -1px 3px rgba(0,0,0,0.04)',
        'clay-lg': '12px 12px 30px rgba(0,0,0,0.12), -6px -6px 16px rgba(255,255,255,0.98), inset 3px 3px 8px rgba(255,255,255,0.90), inset -3px -3px 8px rgba(0,0,0,0.07)',
        'clay-pressed': '2px 2px 6px rgba(0,0,0,0.12), -1px -1px 3px rgba(255,255,255,0.80), inset 6px 6px 14px rgba(0,0,0,0.12), inset -3px -3px 6px rgba(255,255,255,0.75)',
        'clay-violet': '8px 8px 20px rgba(124,58,237,0.25), -4px -4px 12px rgba(255,255,255,0.95), inset 2px 2px 5px rgba(255,255,255,0.30), inset -2px -2px 5px rgba(0,0,0,0.12)',
        'clay-violet-sm': '4px 4px 12px rgba(124,58,237,0.30), -2px -2px 8px rgba(255,255,255,0.70)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(3deg)' },
        },
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
      },
    },
  },
  plugins: [],
}
