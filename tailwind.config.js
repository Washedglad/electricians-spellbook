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
          DEFAULT: '#2D1B4E',
          dark: '#1a1a2e',
        },
        secondary: {
          green: '#0f4c3a',
          burgundy: '#5c1a1a',
        },
        accent: {
          gold: '#d4af37',
          silver: '#c0c0c0',
        },
        parchment: '#f4f1de',
        danger: '#8b0000',
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

