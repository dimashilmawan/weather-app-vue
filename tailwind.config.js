/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui", ...defaultTheme.fontFamily.sans],
      serif: ["ui-serif", "Georgia", ...defaultTheme.fontFamily.serif],
      mono: ["ui-monospace", "SFMono-Regular", ...defaultTheme.fontFamily.mono],
      roboto: ["Roboto", "sans-serif"],
    },
  },
  plugins: [],
};
