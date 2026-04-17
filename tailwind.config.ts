import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        'bg-card': '#0f0f0f',
        'text-main': '#E8E6E1',
        'text-muted': '#8A8881',
        accent: '#2C4A3B',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
      keyframes: {
        swipe: {
          '0%, 100%': { transform: 'translateX(0)', opacity: '0.4' },
          '50%': { transform: 'translateX(4px)', opacity: '1' },
        },
      },
      animation: {
        swipe: 'swipe 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
