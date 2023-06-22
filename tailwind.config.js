/** @type {import('tailwindcss').Config} */

const formKitTailwind = require('@formkit/themes/tailwindcss')

module.exports = {
  darkMode: 'class',

  content: [
    './src/**/*.{html,js,vue}',
    './node_modules/@formkit/themes/dist/tailwindcss/genesis/index.cjs',
    '/formkit.config.js'
  ],
  theme: {
    extend: {
      boxShadow: {
        'color-mode-sw': '0 1px 2px rgba(0, 0, 0, .04), 0 1px 2px rgba(0, 0, 0, .06)',
      }
    },
  },
  plugins: [formKitTailwind],
}

