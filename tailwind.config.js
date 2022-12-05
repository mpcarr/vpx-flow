/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [{
    pattern: /bg/
  },{
    pattern: /text-/
  }],
  theme: {
    extend: {},
  },
  plugins: [],
}