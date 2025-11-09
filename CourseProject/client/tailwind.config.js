/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // или 'media', если хочешь использовать системную тему
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
