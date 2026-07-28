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
        primary: {
          DEFAULT: '#4F7DFF',
          dark: '#3A62D9',
        },
        secondary: {
          DEFAULT: '#64D2FF',
          dark: '#4BBDED',
        },
        accent: {
          DEFAULT: '#A855F7',
          dark: '#8B5CF6',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        glassBg: 'rgba(255, 255, 255, 0.45)',
        glassBgDark: 'rgba(15, 23, 42, 0.65)',
        glassBorder: 'rgba(255, 255, 255, 0.4)',
        glassBorderDark: 'rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        glass: '16px',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
        glassDark: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        glow: '0 0 20px rgba(79, 125, 255, 0.35)',
        glowAccent: '0 0 20px rgba(168, 85, 247, 0.35)',
      },
      animation: {
        'float-slow': 'float 12s ease-in-out infinite',
        'float-medium': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-soft': 'bounceSoft 0.4s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.05)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
          '75%': { transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
