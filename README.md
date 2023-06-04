## [view site](https://portfolio-fidly.netlify.app/)

## npx nuxi init 'project name'
- cd to project folder
- npm install
- npm run dev -- -o (this opens new browser)

# Adding Tailwind CSS 
- npm install -D @nuxtjs/tailwindcss
    export default defineNuxtConfig({
        modules: ['@nuxtjs/tailwindcss'],
    })

# Adding FormKit 
https://formkit.com/getting-started/installation
npm install @formkit/nuxt
// nuxt.config
    export default defineNuxtConfig({
    modules: ['@formkit/nuxt'],
    })

# CLI :  create a page => npx nuxi add page index
index.vue  //landing page must be named index.vue
this is to be used with <code><NuxtPage/></code> inside app.vue

# Add nodemailer
- npm install nodemailer
