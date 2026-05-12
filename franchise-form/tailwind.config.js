/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdf8ef',
          100: '#faeeda',
          200: '#f5d9a8',
          300: '#efc06b',
          400: '#e8a030',
          500: '#d4861a',
          600: '#b47a2e',
          700: '#8a5a1e',
          800: '#6b4318',
          900: '#412402',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
