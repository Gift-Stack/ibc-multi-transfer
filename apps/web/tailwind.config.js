const tailwindConfig = require("@milkyway-engine/tailwind-config/tailwind.config");

tailwindConfig.theme.extend.colors = {
  callout: "rgb(var(--callout-rgb))",
  "callout-border": "rgba(var(--callout-border-rgb), 0.3)",
  card: "rgb(var(--card-rgb))",
  "card-border": "rgb(var(--card-border-rgb))",
};

module.exports = tailwindConfig;
