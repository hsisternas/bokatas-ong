/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './{components,hooks,services}/**/*.{ts,tsx}', './App.tsx', './index.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2AA7DF',
        'primary-dark': '#1C92D2',
        secondary: '#E6F4FB',
        accent: '#FFD166',
        'text-main': '#2E2E2E',
        'text-light': '#6F7A8A',
        background: '#F9FBFD',
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
