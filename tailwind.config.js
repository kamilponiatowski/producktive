/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#6C63FF',
          accent:  '#FF6584',
          dark:    '#0F0F1A',
          card:    '#1A1A2E',
          muted:   '#8B8BA7',
          success: '#4ADE80',
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body:    ['"Inter"', 'sans-serif'],
        mono:    ['"DM Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #6C63FF, #FF6584)',
        'gradient-dark':  'linear-gradient(180deg, #0F0F1A 0%, #1A1A2E 100%)',
        'gradient-card':  'linear-gradient(135deg, rgba(108,99,255,0.12), rgba(255,101,132,0.08))',
      },
      animation: {
        'shimmer': 'shimmer 2.5s linear infinite',
        'float':   'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        }
      },
      boxShadow: {
        'brand':  '0 0 40px rgba(108, 99, 255, 0.25)',
        'card':   '0 8px 32px rgba(0,0,0,0.4)',
        'card-hover': '0 16px 48px rgba(108,99,255,0.2)',
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
