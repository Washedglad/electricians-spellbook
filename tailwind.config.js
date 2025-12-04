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
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
        },
        secondary: {
          green: 'var(--color-secondary-green)',
          burgundy: 'var(--color-secondary-burgundy)',
        },
        accent: {
          gold: 'var(--color-accent-gold)',
          silver: '#c0c0c0',
        },
        parchment: 'var(--color-parchment)',
        danger: '#8b0000',
        'bg-page': 'var(--color-bg-page)',
        'text-main': 'var(--color-text-main)',
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

