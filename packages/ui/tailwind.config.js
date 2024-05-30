const tailwindCss = require("@milkyway-engine/configs/tailwind/tailwind.config.js");

module.exports = {
  ...tailwindCss,
  plugins: [
    require("tailwindcss-react-aria-components"),
    require("tailwindcss-animate"),
  ],
};
