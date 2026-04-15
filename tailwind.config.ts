import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: [
    './components/**/*.{vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.ts',
    './plugins/**/*.ts',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#00E5FF',  // neon cyan — main accent
          accent:  '#D4AF37',  // gold — premium
          gold:    '#FFD700',  // energy gold — data/indicators
          dark:    '#0a0e14',  // deep dark base
          card:    '#161B22',  // panel / card background
          muted:   '#8B8BA7',
          success: '#4ADE80',
          text:    '#f0f6fc',  // main light text
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body:    ['"Inter"', 'sans-serif'],
        mono:    ['"DM Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #00E5FF, #D4AF37)',
        'gradient-dark':  'linear-gradient(180deg, #0a0e14 0%, #161B22 100%)',
        'gradient-card':  'linear-gradient(135deg, rgba(0,229,255,0.07), rgba(212,175,55,0.05))',
      },
      animation: {
        shimmer:      'shimmer 9s linear infinite',
        float:        'float 6s ease-in-out infinite',
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
        },
      },
      boxShadow: {
        brand:       '0 0 40px rgba(0, 229, 255, 0.22)',
        card:        '0 8px 32px rgba(0,0,0,0.4)',
        'card-hover': '0 16px 48px rgba(0,229,255,0.16)',
      },
    },
  },
  plugins: [typography],
} satisfies Config
