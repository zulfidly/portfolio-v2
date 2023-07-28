# [my Portfolio (ver2)](https://portfolio-fidly.netlify.app/)

#### 2023-07-28, added Pinia, to replace the runtime useNuxtApp() provide method

## ```npx nuxi@latest init <project-name>```
- ```cd <project-name>```
- ```npm install```
- ```npm run dev -- -o``` (this opens new browser)

## install [Pinia](https://pinia.vuejs.org/ssr/nuxt.html)
- add ```overrides``` added to package.json
- ```npm install pinia @pinia/nuxt```
- ```export const useMainStorePinia = defineStore('appStore', {})```, dir: ```./composables/appStore.js``` 
- see ```@pinia/nuxt``` in nuxt.config.js
- see ```./composables/appStore.js```

## Adding Tailwind CSS 
- ```npm install -D @nuxtjs/tailwindcss```
- ```npx tailwindcss init -p``` (bring tailwindcss.config.js into root folder)
- see ```nuxt.config.ts```

<!-- ## Add ```<nuxt-img />``` directive
```npm install -D @nuxt/image@rc```
```npm uninstall -D @nuxt/image@rc```
- see edit > nuxt.config -->

## add VueUse for access to Vue3 friendly composables
- ```npm i -D @vueuse/nuxt @vueuse/core```
- use of ```useEventListener()``` in place of ```window.addEventListener()```

## Adding [FormKit](https://formkit.com/getting-started/installation) (contact page form build)
- ```npm install @formkit/nuxt```
- ```npm install @formkit/themes```, see edits in tailwind.config.js
- see ```nuxt.config.ts```


## CLI :  create a page => npx nuxi add page index
- landing page must be named index.vue
- this is to be used with ```<NuxtPage/>``` inside app.vue
- other pages for routing are placed inside the 'pages' folder


## Add nodemailer (contact form is emailed)
- ```npm install nodemailer```
- this server side code has 'post' as method, coded in its filename

## CI/CD implementation (continuous integration / continuous delivery)
- for Netlify deployment 
- Build command : ```npm run build```
- Publish directory : dist
- Import environment variables from the .env file (email & password)

## deleted file
- ```tsconfig.json```, content as below :
```
{
  // https://nuxt.com/docs/guide/concepts/typescript
  "extends": "./.nuxt/tsconfig.json"
}
```
