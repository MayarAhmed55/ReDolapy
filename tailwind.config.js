/** @type {import('tailwindcss').Config} */
module.exports = {
  // 🟢 This line enables toggling dark mode via the 'dark' class
  darkMode: 'class', 
  
  // Make sure Tailwind scans all your Vue files for styling classes
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}