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
          primary: '#0ea5e9', // celeste (sky-500)
          secondary: '#171717', // negro (neutral-900)
          light: '#e0f2fe', // celeste claro (sky-100)
        }
      }
    },
  },
  plugins: [],
}
