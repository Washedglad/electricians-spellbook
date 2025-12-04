/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          dark: 'rgb(var(--color-primary-dark) / <alpha-value>)',
        },
        secondary: {
          green: 'rgb(var(--color-secondary-green) / <alpha-value>)',
          burgundy: 'rgb(var(--color-secondary-burgundy) / <alpha-value>)',
        },
        accent: {
          gold: 'rgb(var(--color-accent-gold) / <alpha-value>)',
          silver: '#c0c0c0',
        },
        parchment: 'rgb(var(--color-parchment) / <alpha-value>)',
        danger: '#8b0000',
        'bg-page': 'rgb(var(--color-bg-page) / <alpha-value>)',
        'text-main': 'rgb(var(--color-text-main) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['Crimson Text', 'serif'],
        display: ['Cinzel', 'serif'],
        script: ['IM Fell English', 'serif'],
      },
      backgroundImage: {
        'parchment': "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\"...)",
      },
      boxShadow: {
        'magical': '0 0 20px rgba(212, 175, 55, 0.3)',
        'candlelight': '0 0 30px rgba(255, 200, 100, 0.4)',
      },
    },
  },
  plugins: [],
}

