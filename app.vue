<script setup>
  const nuxtApp = useNuxtApp()
  const currentPath = ref(useRoute().path)
  const isDark = ref(true)
  nuxtApp.provide("currentPathApp", ()=> currentPath)
  nuxtApp.provide("isDarkApp", ()=> isDark)

  const isNavBtnHiddenApp = ref(false)
  const isMenuHiddenApp = ref(true)
  nuxtApp.provide('isNavBtnHiddenApp', ()=> isNavBtnHiddenApp)    // data direction is parent to child only (same as Vue3's provide/inject)
  nuxtApp.provide('isMenuHiddenApp', ()=> isMenuHiddenApp)

  const provideNavBarEventsToOthers = (y)=> {
    isNavBtnHiddenApp.value = y.isNavBtnHiddenEmitted
    isMenuHiddenApp.value = y.isMenuHiddenEmitted
  }

  onMounted(()=> {
      console.log('app mounted: path=', useRoute().path); // to see reloaded page path    
      checkIfDark( window.matchMedia("(prefers-color-scheme: dark)").matches)
    window.matchMedia("(prefers-color-scheme:dark)").addEventListener("change", () => {
      checkIfDark( window.matchMedia("(prefers-color-scheme: dark)").matches)
      // console.log('is system Dark ? : ', window.matchMedia("(prefers-color-scheme: dark)").matches);
    })
  })

  const checkIfDark = (X) => {
    if(X) {
      isDark.value = true 
      document.querySelector('html').classList.add('dark')
    }
    else {
      isDark.value = false
      document.querySelector('html').classList.remove('dark')
    }
  }
  
  const providePathToNavBar = (x) => {
    // console.log('pgPath :' , x);
    currentPath.value = x
  }

  const darkManualToggle = () => {
    const htmlTop = document.querySelector('html')
    htmlTop.classList.toggle('dark')
    isDark.value = !isDark.value
  }
</script>

<template>
  <NuxtPage @pgPath="(x)=> providePathToNavBar(x)" />
  <NavBar  @toggleMenu="(y)=> provideNavBarEventsToOthers(y)"/>
  <SocMed />
  
  <!-- <button @click="darkManualToggle" class=" text-[var(--color-text)] fixed m-1 top-0 right-0 border-2 rounded-full border-green-700 h-[60px] w-[60px] bg-[var(--color-background-mute)]">
    {{ isDark?'Dark':'Light' }}
  </button> -->
</template>



