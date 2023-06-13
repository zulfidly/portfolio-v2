<template>
  <NuxtPage @pgPath="(x)=> providePathToNavBar(x)" />
    <SocMed />  
    <ColorModeSwitch @click="darkManualToggle" />
    <NavBar @toggleMenu="(y)=> provideNavBarEventsToOthers(y)"  />
</template>

<script setup>
  useHead({
    title: 'loading...',
    script: `if(window.matchMedia("(prefers-color-scheme:dark)").matches) document.querySelector('html').classList.add('dark')`,
    htmlAttrs:{ lang:'en', class: { 'zappa1':true, 'zappa2':false, } },
  })
  useServerSeoMeta({
    author: 'zulfidly@gmail.com',
    description: 'zulfidly, a frontend web developer',
    keywords: 'vuejs, nuxtjs, html, css, javascript',
    themeColor: "#34495E",    
  })  
  const nuxtApp = useNuxtApp()
  const isDark = ref(undefined); nuxtApp.provide("isDarkApp", ()=> isDark);
  const currentPath = ref(useRoute().path); nuxtApp.provide("currentPathApp", ()=> currentPath);
  const isNavBtnHiddenApp = ref(false); nuxtApp.provide('isNavBtnHiddenApp', ()=> isNavBtnHiddenApp)    // data direction is parent to child only (similar to Vue3's provide/inject)
  const isMenuHiddenApp = ref(true); nuxtApp.provide('isMenuHiddenApp', ()=> isMenuHiddenApp)  
  const isMobile = ref(true); nuxtApp.provide('isMobile', ()=> isMobile)
  const scrBreakpoint = ref(1024); // set mobile vs desktop breakpoint here

  onMounted(()=> {    // hydrating
    addListener_WhenUserChangeSystemColorMode()
    addListener_WhenInnerWidthChanges()
  })
  onNuxtReady(()=> {  // hydrated
    // console.log('onNuxtReady: path=', useRoute().path); // to see reloaded page path    
    useHead({
      title: getTabTitle(),
      htmlAttrs: { 
        class: { 'dark':isDark.value, 'zappa1':true, 'zappa2':true, },
      }
    }, { mode: 'client' }) // extras
  })

  function checkSystemColorMode(X) {
    if(X)               { isDark.value = true;  useHead({ htmlAttrs: {class: { 'dark': true }}}) }    
    else if(X == false) { isDark.value = false; useHead({ htmlAttrs: {class: { 'dark': false}}}) }
    else console.log('app.vue: unknown prefers-color-scheme');
  }      
  function addListener_WhenInnerWidthChanges() {
    if(window.innerWidth >= scrBreakpoint.value) isMobile.value = false;
    window.addEventListener("resize", ()=> {
      if(window.innerWidth >= scrBreakpoint.value) isMobile.value = false;
      else isMobile.value = true
    })
  }
  function addListener_WhenUserChangeSystemColorMode() {
    checkSystemColorMode( window.matchMedia("(prefers-color-scheme:dark)").matches)
    window.matchMedia("(prefers-color-scheme:dark)").addEventListener("change", () => {
      checkSystemColorMode( window.matchMedia("(prefers-color-scheme: dark)").matches) // switches when user change local system color setting
    })
  }

  function getTabTitle() {
    let temp = currentPath.value.toString()
      if(temp == '/') return 'Home : Freddie\'s Portfolio'
      else if(temp == '/projects') return 'Projects : Freddie\'s Portfolio'
      else if(temp == '/about') return 'About : Freddie\'s Portfolio'
      else if(temp == '/contact') return 'Contact : Freddie\'s Portfolio'
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





