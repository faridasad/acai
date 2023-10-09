/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "accent-100": 'hsl(267, 49%, 35%, .15)',
        "neutral-100": "hsl(270, 100%, 96%)",
      },
    },
  },
  plugins: [],
};
