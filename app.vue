<script setup>
  const isDark = ref(undefined)
  const nuxtApp = useNuxtApp()
// console.log(nuxtApp);
  console.log('scripte setup');
  const currentPath = ref(useRoute().path)
  nuxtApp.provide("currentPathApp", ()=> currentPath)
  nuxtApp.provide("isDarkApp", ()=> isDark)

  const isNavBtnHiddenApp = ref(false)
  const isMenuHiddenApp = ref(true)
  nuxtApp.provide('isNavBtnHiddenApp', ()=> isNavBtnHiddenApp)    // data direction is parent to child only (same as Vue3's provide/inject)
  nuxtApp.provide('isMenuHiddenApp', ()=> isMenuHiddenApp)
  
  onMounted(()=> {  // upon user landing
    console.log('app mounted: path=', useRoute().path); // to see reloaded page path    
    checkSystemColorMode( window.matchMedia("(prefers-color-scheme: dark)").matches)
    addListener_WhenUserChangeSystemColorMode()
    useHeadInitialLoad(isDark.value)      
  })

  function useHeadInitialLoad(x) {      
    useHead({  title: getTabTitle(), htmlAttrs: { class: { 'dark': x  }, lang:'en' }}) // init upon browser reload
  }

  function addListener_WhenUserChangeSystemColorMode() {
    window.matchMedia("(prefers-color-scheme:dark)").addEventListener("change", () => {
      checkSystemColorMode( window.matchMedia("(prefers-color-scheme: dark)").matches) // switches when user change local system color setting
    })
  }

  function getTabTitle() {
    let temp = currentPath.value.toString()
      if(temp == '/') return 'Home'
      else if(temp == '/projects') return 'Projects'
      else if(temp == '/about') return 'About'
      else if(temp == '/contact') return 'Contact'
      else return 'Others'
  }

  watch ( currentPath,
    ()=> { useHead({  title: getTabTitle() }) }
  )

  const provideNavBarEventsToOthers = (y)=> {
    isNavBtnHiddenApp.value = y.isNavBtnHiddenEmitted
    isMenuHiddenApp.value = y.isMenuHiddenEmitted
  }

  function checkSystemColorMode(X) {
    if(X)               { isDark.value = true;  useHead({ htmlAttrs: { class: { 'dark': X  }, }}); }    
    else if(X == false) { isDark.value = false; useHead({ htmlAttrs: { class: { 'dark': X  }, }}); }
    else console.log('app.vue: unknown prefers-color-scheme');
  }      
  
  const providePathToNavBar = (x) => {
    currentPath.value = x
  }

  const darkManualToggle = () => {
    document.querySelector('html').classList.toggle('dark')
    isDark.value = !isDark.value
  }
</script>

<template>
  <NuxtPage @pgPath="(x)=> providePathToNavBar(x)" />
  <NavBar  @toggleMenu="(y)=> provideNavBarEventsToOthers(y)"/>
  <SocMed />
  
  <button @click="darkManualToggle" class=" text-[var(--color-text)] absolute m-1 top-0 right-0 border-2 rounded-full border-green-700 h-[60px] w-[60px] bg-[var(--color-background-mute)]">
    {{ isDark?'Dark':'Light' }}
  </button>
</template>



