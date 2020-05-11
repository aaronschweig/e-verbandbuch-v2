const defaults = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.vue"],
  theme: {
    fontFamily: {
      sans: ["Inter", ...defaults.fontFamily.sans]
    },
    extend: {}
  },
  variants: {},
  plugins: []
};
