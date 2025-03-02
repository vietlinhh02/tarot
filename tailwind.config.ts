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
        'mystic': {
          light: 'rgb(var(--mystic-gradient-3) / <alpha-value>)',
          DEFAULT: 'rgb(var(--mystic-gradient-2) / <alpha-value>)',
          dark: 'rgb(var(--mystic-gradient-1) / <alpha-value>)',
        },
        'accent': 'rgb(var(--accent-color) / <alpha-value>)',
        'accent-secondary': 'rgb(var(--accent-secondary) / <alpha-value>)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mystic-gradient': 'linear-gradient(135deg, rgb(var(--mystic-gradient-1)), rgb(var(--mystic-gradient-2)), rgb(var(--mystic-gradient-3)))',
      },
      boxShadow: {
        'mystic': '0 4px 20px -2px rgba(var(--mystic-gradient-2), 0.5)',
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.3)',
        'glow': '0 0 15px rgba(var(--accent-color), 0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
        'shine': 'shine 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shine: {
          '0%': { backgroundPosition: '-200% -200%' },
          '100%': { backgroundPosition: '200% 200%' },
        },
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Lora', 'Times New Roman', 'serif'],
        'mystic': ['Dancing Script', 'cursive'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config 