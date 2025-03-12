/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".transition": {
          "@apply transition-all delay-150 duration-300 ease-in-out": {},
        },
      });
    },
  ],
};
