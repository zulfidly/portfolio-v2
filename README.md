## [my Portfolio (ver2)](https://portfolio-fidly.netlify.app/)

##### 2023-07-28 (commit 35), added Pinia, to replace the runtime useNuxtApp() provide method
##### 2023-08-01 (commit 37), added Prettier (3.0.0)
##### 2023-08-10 (commit 39), use of ```<ClientOnly>``` on projects.vue elements which 'waits' for window object input

### Install [Nuxt](Install)

- `npx nuxi@latest init <project-name>`
- `cd <project-name>`
- `npm install`
- `npm run dev -- -o` (this opens new browser)

### Install [Pinia](https://pinia.vuejs.org/ssr/nuxt.html)

- add `overrides` to package.json
- `npm install pinia @pinia/nuxt`
- `export const useMainStorePinia = defineStore('appStore', {})`, dir: `./composables/appStore.js`
- see `@pinia/nuxt` in nuxt.config.js
- see `./composables/appStore.js`
 
### Install [Tailwind CSS](https://tailwindcss.com/)

- `npm install -D @nuxtjs/tailwindcss`
- `npx tailwindcss init -p` (bring tailwindcss.config.js into root folder)
- see `nuxt.config.ts`

<!-- ## Add ```<nuxt-img />``` directive
```npm install -D @nuxt/image@rc```
```npm uninstall -D @nuxt/image@rc```
- see edit > nuxt.config -->

### Install [VueUse](https://vueuse.org/) for access to Vue3 friendly composables

- `npm i -D @vueuse/nuxt @vueuse/core`
- use of `useEventListener()` in place of `window.addEventListener()`

### Install [FormKit](https://formkit.com/getting-started/installation) (contact page form build)

- `npm install @formkit/nuxt`
- `npm install @formkit/themes`, see edits in tailwind.config.js
- see `nuxt.config.ts`

### Install [nodemailer](https://nodemailer.com/about/) (contact form is emailed)

- `npm install nodemailer`
- this server side code has 'post' as method, coded in its filename

### Install [Prettier](https://prettier.io/) for codes auto-formatting

- `npm install --save-dev --save-exact prettier`
- `npx prettier --check .` to check all relevant status
- `npx prettier --write .` to write all relevant files
- see ```prettierrc.json``` config (personal preference to not have semicolons)

### CLI : create a page => npx nuxi add page index

- landing page must be named index.vue
- this is to be used with `<NuxtPage/>` inside app.vue
- other pages for routing are placed inside the 'pages' folder

### CI/CD implementation (continuous integration / continuous delivery)

- for Netlify deployment
- Build command : `npm run build`
- Publish directory : dist
- Import environment variables from the .env file (email & password)

### deleted file `/server/tsconfig.json`

- Content as below :

```
{
  // https://nuxt.com/docs/guide/concepts/typescript
  "extends": "./.nuxt/tsconfig.json"
}
```

#### Extra notes:
- element's resize also triggers ```@scroll``` ???
- use of ```<ClientOnly>``` can speed up rendering if its DOM properties required window inputs