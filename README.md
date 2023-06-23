# [my Portfolio (ver2)](https://portfolio-fidly.netlify.app/)

## npx nuxi init 'project name'
- cd to project folder
```npm install```
```npm run dev -- -o``` (this opens new browser)

## Adding Tailwind CSS 
```npm install -D @nuxtjs/tailwindcss```
```npx tailwindcss init -p``` (bring tailwindcss.config.js into root folder)
- see edits > nuxt.config.ts

<!-- ## Add ```<nuxt-img />``` directive
```npm install -D @nuxt/image@rc```
```npm uninstall -D @nuxt/image@rc```
- see edit > nuxt.config -->

## Adding [FormKit](https://formkit.com/getting-started/installation) (contact page form build)
```npm install @formkit/nuxt```
- see edits > nuxt.config.ts


## CLI :  create a page => npx nuxi add page index
- landing page must be named index.vue
- this is to be used with ```<NuxtPage/>``` inside app.vue
- other pages for routing are placed inside the 'pages' folder


## Add nodemailer (contact form is emailed)
```npm install nodemailer```
- this server side code has 'post' as method, coded in its filename

## CI/CD implementation (continuous integration / continuous delivery)
- for Netlify deployment 
- Build command : npm run build
- Publish directory : dist
- Import environment variables from the .env file (email & password)