<template>
  <Notifier ref="exposeNotifierRef" />
  <NuxtPage
    :is-menu-hidden="isMenuHidden"
    :is-dark="appStore.clientApp.isDarkViewport"
    :is-mobile="appStore.clientScr.isMobile"
    :is-portrait="appStore.isPortrait"
    :custom-inner-height="appStore.clientScr.innerH"
    @pgPath="(path) => (currentPath = path)"
    @notifier-msg="(txt) => displayNotifier(txt, 2000)"
  />

  <NavBar
    @toggleMenu="(bool) => (isMenuHidden = bool)"
    :is-mobile="appStore.clientScr.isMobile"
    :current-path="currentPath"
  />

  <ColorModeSwitch
    ref="exposeColorModeSwitchRef"
    :is-mobile="appStore.clientScr.isMobile"
    :current-path="currentPath"
    :is-dark-device="appStore.clientScr.isDarkDevice"
    :is-dark-viewport="appStore.clientApp.isDarkViewport"
    @user-toggle-color-mode="(bool) => appStore.client_IsDarkViewport(bool)"
  />

  <SocMed
    :is-mobile="appStore.clientScr.isMobile"
    :current-path="currentPath"
    :is-dark="appStore.clientApp.isDarkViewport"
    @is-soc-med-visible="(bool) => appStore.client_socMedVisibilityMngr(bool)"
  />
</template>

<script setup>
const currentPath = ref(useRoute().path)
const appStore = useMainStorePinia()
const exposeNotifierRef = ref(null)
const exposeColorModeSwitchRef = ref(null)
const isMenuHidden = ref(true)
watch(
  currentPath,
  () => {
    appStore.client_updateCurrentPath(currentPath.value.toString())
  },
  { immediate: true },
)

console.log("app loading - - -")

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} : Freddie's Portfolio`
      : "Freddie's Portfolio"
  },
  script: `(()=> { 
    if(window.matchMedia("(prefers-color-scheme:dark)").matches) {
      document.documentElement.classList.add("dark");
    };
  })();`,
  htmlAttrs: { lang: "en", class: {} },
}, { mode: "server" })

useServerSeoMeta({
  author: "zulfidly@gmail.com",
  description: "zulfidly, a frontend web developer",
  keywords: "vuejs, nuxtjs, html, css, javascript",
  themeColor: "#34495E",
})

onMounted(() => {
  // displayNotifier('Welcome 🎵', 2000)
  updateClientScreenPropertiesOnMounted()
  initClientAppPropertiesOnMounted()
  useEventListener("resize", updateClientScreenPropertiesOnMounted)
  window.matchMedia("(prefers-color-scheme:dark)").addEventListener('change', syncViewportColorModeToDevice)
})

function syncViewportColorModeToDevice() {
  appStore.m_clientScrIsDarkDevice()
  appStore.client_IsDarkViewport(appStore.clientScr.isDarkDevice)
  exposeColorModeSwitchRef.value.singularColorModeCheckAndToggle(appStore.clientScr.isDarkDevice)
}

function initClientAppPropertiesOnMounted() {
  appStore.client_updateCurrentPath(useRoute().path)
  appStore.client_IsDarkViewport(appStore.clientScr.isDarkDevice) // initialise viewport's color mode to follow system's color mode
}

function updateClientScreenPropertiesOnMounted() {
  appStore.m_clientScrW()
  appStore.m_clientScrH()
  appStore.m_clientScrOrientation()
  appStore.m_clientScrRatioWH()
  appStore.m_clientScrFormFactor()
  appStore.m_clientScrIsMobile()
  appStore.m_clientScrIsMobileAndLandscape()
  appStore.m_clientScrIsDarkDevice()
}

function displayNotifier(text, duration) {
  exposeNotifierRef.value.showNotifier(text.toString(), duration)
}
</script>
