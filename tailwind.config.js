/* eslint-disable */
const defaults = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.html', './src/**/*.vue'],
  theme: {
    fontFamily: {
      sans: ['Inter', ...defaults.fontFamily.sans],
    },
    extend: {
      colors: {
        primary: defaults.colors.green[400],
        hover: defaults.colors.green[500],
      },
    },
  },
  variants: {
    borderColor: ['responsive', 'hover', 'focus', 'focus-within'],
  },
  plugins: [],
};
