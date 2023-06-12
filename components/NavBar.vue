<script setup>
    const centerMark = ref('position:fixed; top:100%; left:-100%;') //dummy init for server side
    const currentPath = useNuxtApp().$currentPathApp()
    const isMobile = useNuxtApp().$isMobile()
    const isNavBtnHidden = ref(false)
    const isMenuHidden = ref(true)
    
    onMounted(()=> {
        watch(
            isNavBtnHidden,
            ()=> {
                if(isNavBtnHidden.value == true) return
                let delay = undefined
                if(isMenuHidden.value) delay = 1700
                if(isMenuHidden.value == false) delay = 10
    
                setTimeout(()=> {
                    console.log("isNavBtnHidden.value = true")
                    isNavBtnHidden.value = true
                }, delay)
            },
        )
        centerMark.value = `top:${ window.innerHeight/2 }px;`        
        window.addEventListener("resize", () => {
            centerMark.value = `top:${ window.innerHeight/2 }px;`
        })
    })    
    
    const nav = {
        svg: {
            init: ["transition-all duration-[250ms]"],
            close: ["scale-100 fill-[var(--color-background-soft)]"],
            open: ["scale-[12] md:scale-[18] fill-[var(--color-background-mute)]"],
        },
        sign: {
            init: ["transition-all fill-[var(--color-text)]"],
            open: ["opacity-0 rotate-45"],
        },
        menu: {
            ctnr: {
                init: ["fixed -translate-y-1/2 flex flex-col space-y-4 transition-all duration-200 "],
                close: ["right-full "],
                open: ["right-[10%]"]
            },
            init: ["text-6xl md:text-3xl text-[var(--color-text)]"],
            close: ["opacity-0 -translate-x-0"],
            open: ["opacity-100 translate-x-full"],
        },
        closeSVG: {
            init: ["transition-all duration-[250ms] fill-[var(--color-text)] pt-8 flex justify-center"],
        }
    }
    const navSensor = {
        init: ["block w-[8px] h-[76px] bg-orange-300 rounded-e-full "],
        in: ["left-0"],
        out: ["-left-full"],
        ctnr: ["fixed w-[55px] h-[76px] -translate-y-1/2 transition-all duration-200"]
    }
    const navBtn = {
        init: ["fixed -translate-y-1/2 transition-all duration-[200ms]"],
        hide: ["-left-full"],
        show: ["left-0"]
    }
    const pop = {
        init: ['font-normal scale-100'],
        currLink: ["font-bold drop-shadow-sm scale-105"]
    }
    const slideInNavIcon = () => {
        console.log('slideInNavIcon');
        isNavBtnHidden.value = false
    }

    // <NavBar  @toggleMenu="(y)=> test2(y)" />
    const emiT = defineEmits(['toggleMenu'])
    function toggleMenu() {
        if(isMobile.value == false) return
        isNavBtnHidden.value = !isNavBtnHidden.value
        if(isNavBtnHidden.value) isMenuHidden.value = false
        else isMenuHidden.value = true
        
        emiT('toggleMenu', {
            'isNavBtnHiddenEmitted': isNavBtnHidden.value,
            'isMenuHiddenEmitted': isMenuHidden.value,
        })
    }
    const isSensorHidden = computed(()=> {
        if(isMenuHidden.value && isNavBtnHidden.value) return false
        else return true
    })    
    const nLink = {
        ctnrInit: ['fixed -translate-x-[110%] -translate-y-1/2 flex flex-col space-y-4 '],
        ctnrInitDesktop: ['flex flex-row gap-8 '],
        div: {
            init: ['transition-all duration-200'],
            hide: ['translate-x-0 opacity-0'],
            show: ['translate-x-[115%] opacity-100'],
        },
        link: ['text-6xl md:text-3xl text-[var(--color-text)]'],
        linkDesktop: ['text-4xl text-[var(--color-text)] transition-transform duration-200'],
    }
    
</script>

<template>
    <div :class="isMobile?'':'absolute top-0 left-0 ml-12 my-6'">
        <button :style="isMobile?centerMark:'display:none;'" :class="[navBtn.init, isSensorHidden?navBtn.show:navBtn.hide]" @click="toggleMenu" aria-haspopup="menu" :aria-expanded="[isMenuHidden?'false':'true']" aria-label="Toggle navigation menu">
            <svg :class="[nav.svg.init, isMenuHidden?nav.svg.close:nav.svg.open]" x="0px" y="0px" width="55px" height="76px" viewBox="0 0 55 76" enable-background="new 0 0 55 76" xml:space="preserve">
                <path d="M17,0c-0.084,0-0.166,0.006-0.25,0.006V0h-17v76h17v-0.006C16.834,75.994,16.916,76,17,76c20.987,0,38-17.013,38-38 C55,17.013,37.987,0,17,0z"/>
                <path :class="[nav.sign.init, isMenuHidden?'':nav.sign.open]" d="M37.75,37h-6v-6.5c0-0.828-0.672-1.5-1.5-1.5s-1.5,0.672-1.5,1.5V37h-6c-0.828,0-1.5,0.672-1.5,1.5 s0.672,1.5,1.5,1.5h6v5.5c0,0.828,0.672,1.5,1.5,1.5s1.5-0.672,1.5-1.5V40h6c0.828,0,1.5-0.672,1.5-1.5S38.578,37,37.75,37z"/>
            </svg>
        </button>
    
        <button :style="isMobile?centerMark:'display:none;'" :class="[navSensor.ctnr, isSensorHidden?navSensor.out:navSensor.in]" @click="slideInNavIcon" aria-label="nav bar button sensor">
            <span id="navIconSensor" :class="[navSensor.init]"></span>
        </button>
    
        <ul :style="isMobile?centerMark:''" :class="[isMobile?nLink.ctnrInit:nLink.ctnrInitDesktop]">
            <li @click="toggleMenu"
                :class="[nLink.div.init, isMobile?[isMenuHidden?nLink.div.hide:nLink.div.show]:'' ]"
                class="delay-[0ms]" 
            >
                    <NuxtLink to="/">           <p :class="[isMobile?nLink.link:nLink.linkDesktop, currentPath=='/'?pop.currLink:pop.init]"          >Home</p></NuxtLink>
            </li>
            <li @click="toggleMenu"
                :class="[nLink.div.init, isMobile?[isMenuHidden?nLink.div.hide:nLink.div.show]:'']"
                class="delay-[50ms]"
            >
                    <NuxtLink to="/projects">   <p :class="[isMobile?nLink.link:nLink.linkDesktop, currentPath=='/projects'?pop.currLink:pop.init]" >Projects</p>  </NuxtLink>
            </li>
            <li @click="toggleMenu"
                :class="[nLink.div.init, isMobile?[isMenuHidden?nLink.div.hide:nLink.div.show]:'']"
                class="delay-[100ms]"
            >
                    <NuxtLink to="/about">      <p :class="[isMobile?nLink.link:nLink.linkDesktop, currentPath=='/about'?pop.currLink:pop.init]"    >About</p>     </NuxtLink>
            </li>
            <li @click="toggleMenu"
                :class="[nLink.div.init, isMobile?[isMenuHidden?nLink.div.hide:nLink.div.show]:'']"
                class="delay-[150ms]"
            >
                    <NuxtLink to="/contact">    <p :class="[isMobile?nLink.link:nLink.linkDesktop, currentPath=='/contact'?pop.currLink:pop.init]"   >Contact</p>   </NuxtLink>
            </li>
    
            <button @click="toggleMenu" :class="[isMobile?nav.closeSVG.init:'hidden', isMenuHidden?nav.menu.close:nav.menu.open]" class="delay-[200ms]" aria-label="close navigation bar menu">
                <svg x="0px" y="0px"  width="51px" height="22px" viewBox="0 0 51 22" enable-background="new 0 0 51 22" xml:space="preserve">
                    <path d="M49,9H7.193l5.821-5.821c0.648-0.647,0.648-1.698,0-2.346c-0.648-0.648-1.698-0.648-2.346,0L0.5,11l10.168,10.167 c0.324,0.323,0.749,0.486,1.173,0.486c0.424,0,0.85-0.163,1.172-0.486c0.648-0.647,0.648-1.698,0-2.346L7.193,13H49 c0.828,0,1.5-0.893,1.5-2S49.828,9,49,9z"/>
                </svg>
            </button>
        </ul>
    </div>
</template>
