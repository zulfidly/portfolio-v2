console.log('pinia loading');
export const useMainStorePinia = defineStore('appStore', {
    state: ()=> ({      // ref
        clientScr: {
            innerW: 0,
            innerH: 0,
            isMobile: true,     // mobile first approach
            isDarkDevice: false,
            ratioWH: undefined,
            orientation: undefined,
            formFactor: undefined,
            isMobileAndLandscape: false,        
        },
        clientApp: {
            isDarkViewport: false,
            isSocMedHidden: false,
            isMenuHidden: true,
            currPath: undefined,
        },
    }),
    getters: {      // computed (eager to execute), state may not update although reactive; think isMobile
        isDesktop: (state)=> state.clientScr.formFactor === 'Desktop|Laptop' ? true : false, 
        isPortrait: (state)=> state.clientScr.orientation === 'portrait-primary' || state.clientScr.orientation === 'portrait-secondary' ? true : false, 
        // does not mutate original state
    },
    actions: {      // function(); will mutate original state
        m_clientScrW() { this.clientScr.innerW = window.innerWidth },
        m_clientScrH() { this.clientScr.innerH = window.innerHeight },
        m_clientScrOrientation() { this.clientScr.orientation = window.screen.orientation.type },
        m_clientScrRatioWH() { this.clientScr.ratioWH = (window.screen.width / window.screen.height).toFixed(2) * 1 },
        m_clientScrFormFactor() { this.clientScr.formFactor = getUserDeviceFormFactor() },
        m_clientScrIsMobile() { this.clientScr.isMobile = this.clientScr.formFactor === 'Smartphone' || this.clientScr.formFactor === 'Tablet' ? true : false },
        m_clientScrIsMobileAndLandscape() { this.clientScr.isMobileAndLandscape = getIsMobileAndLandscapeStatus() },
        m_clientScrIsDarkDevice() { this.clientScr.isDarkDevice = getIsDarkDeviceStatus() },
        client_IsDarkViewport(bool) { this.clientApp.isDarkViewport = bool },
        client_updateCurrentPath(path) { this.clientApp.currPath = path },
        client_socMedVisibilityMngr(bool) { this.clientApp.isSocMedHidden = bool }
    }
})
// client-side only functions 
function getUserDeviceFormFactor() {
    // CSS pixel breakpoint is set to 1024
    let orientation = window.screen.orientation.type
    if(
        orientation === 'portrait-primary' || 
        orientation === 'portrait-secondary'
    ) {
        let ratio = window.screen.width / window.screen.height
        if(window.screen.height < 1024) {     // entering hand-held devices
            if      (ratio < 0.5) return 'Smartphone'
            else if (0.5 <= ratio && ratio < 1) return 'Tablet'
            else return 'unknown form factor 1'
        }
        else {    // if height > 1024px in portrait i.e: vertical LED screen
            return 'Desktop|Laptop'
        }
    }
    else if(
        orientation==='landscape-primary' || 
        orientation==='landscape-secondary'
    ) {
        if(window.screen.width < 1024) {
            let ratio = window.screen.height / window.screen.width
            if      (ratio < 0.5) return 'Smartphone'
            else if (0.5 <= ratio && ratio < 1) return 'Tablet'
            else return 'unknown form factor 2'
        }
        else {    // if width > 1024px in landscape i.e: laptops or normal horizontal desktop screens 
            return 'Desktop|Laptop'
        }
    }
    else return 'unknown form factor 3'
}
function getIsMobileAndLandscapeStatus() {
    let orientation = window.screen.orientation.type
    let formFactor = getUserDeviceFormFactor()
    if(
        (formFactor === 'Smartphone' || formFactor === 'Tablet') && 
        (orientation === 'landscape-primary'|| orientation === 'landscape-secondary')
    ) return true
    else return false
}
function getIsDarkDeviceStatus() {
    let isDark = window.matchMedia("(prefers-color-scheme:dark)").matches
    if(isDark) return true
    else return false        
}

// // parent side codes (client-side only)
// const appStore = useMainStorePinia()
// function updateclientScreenPropertiesOnMounted() {   
//     appStore.m_clientScrW()
//     appStore.m_clientScrH()
//     appStore.m_clientScrFormFactor()
//     appStore.m_clientScrIsMobile()
//     appStore.m_clientScrIsMobileAndLandscape()
//     appStore.m_clientScrOrientation()
//     appStore.m_clientScrRatioWH()
//     appStore.m_clientScrIsDarkDevice()
//   }

//      use event listener at parent side 
//      useEventListener('resize', ()=> { updateclientScreenPropertiesOnMounted() })
//      useEventListener(window.matchMedia("(prefers-color-scheme:dark)"), 'change', ()=>{ updateclientScreenPropertiesOnMounted() })

// need to change extension to .js from .ts
// export default defineNuxtConfig({
//     devtools: { enabled: false },
//     modules: [
//       '@nuxtjs/tailwindcss',
//       '@vueuse/nuxt',
//       '@pinia/nuxt',  
//     ],
//     css: [
//       '/assets/style.css',
//     ],
//     pinia: {
//       autoImports: [
//         // automatically imports `defineStore`
//         'defineStore', // don't have to include import { defineStore } from 'pinia' anymore
//         ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
//       ],
//     },  
// })
  