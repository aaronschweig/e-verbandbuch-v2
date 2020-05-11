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
        primary: defaults.colors.teal[400],
        hover: defaults.colors.teal[500],
      },
    },
  },
  variants: {
    borderColor: ['responsive', 'hover', 'focus', 'focus-within'],
  },
  plugins: [],
};
