import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Aumveda brand palette — earthy, calming
        brand: {
          50:  '#f5f0eb',
          100: '#e8ddd2',
          200: '#d4bea8',
          300: '#be9d7c',
          400: '#a97c55',
          500: '#8b5e38', // primary warm brown
          600: '#704a2a',
          700: '#56381f',
          800: '#3d2814',
          900: '#261808',
        },
        sage: {
          50:  '#f2f5f0',
          100: '#e0e9db',
          200: '#c3d4b9',
          300: '#a3bc96',
          400: '#82a372',
          500: '#638a52', // primary sage green
          600: '#4e6e40',
          700: '#3b5330',
          800: '#283921',
          900: '#172113',
        },
        cream: '#faf6f0',
        parchment: '#f2ead9',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #f5f0eb 0%, #e8ddd2 100%)',
      },
    },
  },
  plugins: [],
}

export default config
