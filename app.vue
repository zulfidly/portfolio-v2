<script setup>
  useHead({
    title: 'loading...',
    script: `if(window.matchMedia("(prefers-color-scheme:dark)").matches) document.querySelector('html').classList.add('dark')`,
    htmlAttrs:{ lang:'en', class: { 'zappa1':true, 'zappa2':false, } },
  })
  // console.log('script setup App');
  const nuxtApp = useNuxtApp()
  const isDark = ref(undefined); nuxtApp.provide("isDarkApp", ()=> isDark);
  const currentPath = ref(useRoute().path); nuxtApp.provide("currentPathApp", ()=> currentPath);
  const isNavBtnHiddenApp = ref(false); nuxtApp.provide('isNavBtnHiddenApp', ()=> isNavBtnHiddenApp)    // data direction is parent to child only (similar to Vue3's provide/inject)
  const isMenuHiddenApp = ref(true); nuxtApp.provide('isMenuHiddenApp', ()=> isMenuHiddenApp)  

  onNuxtReady(()=> {  // upon landed
    // console.log('onNuxtReady: path=', useRoute().path); // to see reloaded page path    
    checkSystemColorMode( window.matchMedia("(prefers-color-scheme:dark)").matches)
    addListener_WhenUserChangeSystemColorMode()
      useHead({
        title: getTabTitle(),
        htmlAttrs: { 
          lang:'en', 
          class: { 'dark':isDark.value, 'zappa1':true, 'zappa2':true, },
        }
      }, { mode: 'client' }) // extras
  })

  function checkSystemColorMode(X) {
    if(X)               { isDark.value = true;  useHead({ htmlAttrs: {class: { 'dark': true }}}) }    
    else if(X == false) { isDark.value = false; useHead({ htmlAttrs: {class: { 'dark': false}}}) }
    else console.log('app.vue: unknown prefers-color-scheme');
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
 
  watch ( currentPath,    // zappa classes removed upon navigation
    ()=> { useHead({  title: getTabTitle(), htmlAttrs: {class: { 'dark': isDark.value}} }) }
  )

  const provideNavBarEventsToOthers = (y)=> {
    isNavBtnHiddenApp.value = y.isNavBtnHiddenEmitted
    isMenuHiddenApp.value = y.isMenuHiddenEmitted
  }
  
  const providePathToNavBar = (x) => currentPath.value = x

  const darkManualToggle = () => {
    document.querySelector('html').classList.toggle('dark')
    isDark.value = !isDark.value
  }
</script>

<template>
  <NuxtPage @pgPath="(x)=> providePathToNavBar(x)" />
  <NavBar  @toggleMenu="(y)=> provideNavBarEventsToOthers(y)" />
  <SocMed />  
  <ColorModeSwitch @click="darkManualToggle" />

</template>



