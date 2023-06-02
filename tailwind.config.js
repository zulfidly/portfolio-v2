/** @type {import('tailwindcss').Config} */

const formKitTailwind = require('@formkit/themes/tailwindcss')

module.exports = {
  content: [
    './src/**/*.{html,js,vue}',
    './node_modules/@formkit/themes/dist/tailwindcss/genesis/index.cjs',
    '/formkit.config.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [formKitTailwind],
}

