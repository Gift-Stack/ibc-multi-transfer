const theme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    ...theme,
    extend: {
      fontFamily: {
        mono: [
          "ui-monospace",
          "Menlo",
          "Monaco",
          "Cascadia Mono",
          "Segoe UI Mono",
          "Roboto Mono",
          "Oxygen Mono",
          "Ubuntu Monospace",
          "Source Code Pro",
          "Fira Mono",
          "Droid Sans Mono",
          "Courier New",
          "monospace",
        ],
      },
    },
  },
};
