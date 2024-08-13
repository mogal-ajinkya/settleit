/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#91d700",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
