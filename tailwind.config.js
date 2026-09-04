/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sanpatricio: {
          primary: '#064e3b', // emerald-900
          secondary: '#facc15', // yellow-400 (Assuming gold/yellow for contrast/details)
          light: '#d1fae5', // emerald-100
        }
      }
    },
  },
  plugins: [],
}
