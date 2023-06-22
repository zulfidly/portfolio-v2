## [view site](https://portfolio-fidly.netlify.app/)

## npx nuxi init 'project name'
- cd to project folder
- npm install
- npm run dev -- -o (this opens new browser)

## Adding Tailwind CSS 
```npm install -D @nuxtjs/tailwindcss```
```npx tailwindcss init -p (to bring tailwindcss.config.js into root folder)```
- see edits > nuxt.config.ts


## Adding [FormKit](https://formkit.com/getting-started/installation) (contact page form build)
```npm install @formkit/nuxt```
- see edits > nuxt.config.ts


## CLI :  create a page => npx nuxi add page index
- landing page must be named index.vue
- this is to be used with <code><NuxtPage/></code> inside app.vue
- other pages for routing are placed inside the 'pages' folder


## Add nodemailer
```npm install nodemailer```
- this fully server side code has 'post' as method, and is coded in its filename

## CI/CD implementation (continuous integration / continuous delivery)
- for Netlify deployment 
- Build command : npm run build
- Publish directory : dist
- Import environment variables from the .env file (email & password)