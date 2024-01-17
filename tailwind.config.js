/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customDecoration: " #026985", // Replace with your desired color
      },
    },
  },
  plugins: [],
};
