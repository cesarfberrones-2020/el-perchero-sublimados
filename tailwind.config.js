/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#080c14',
          surface: '#0f172a',
          card: '#162032',
          cardHover: '#1c2840',
          border: '#1e293b',
          borderLight: '#334155',
          pink: '#f43f5e',
          cyan: '#06b6d4',
          yellow: '#f59e0b',
          purple: '#8b5cf6',
          violet: '#6366f1'
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'gradient-x': 'gradient-x 6s ease infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        'neon-pink': '0 0 25px -5px rgba(244, 63, 94, 0.4)',
        'neon-purple': '0 0 25px -5px rgba(139, 92, 246, 0.4)',
      },
    },
  },
  plugins: [],
}
