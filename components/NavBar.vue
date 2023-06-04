<script setup>
    import { computed } from 'vue'
    import { ref } from 'vue' 
    import { onMounted } from 'vue'

    const centerMark = ref(undefined)
    const navButtonRef = ref(null)
    const navButtonSensorRef = ref(null)

    onMounted(()=> {
        centerMark.value = `top:${ window.innerHeight/2 }px;`        
        window.addEventListener("resize", () => {
            centerMark.value = `top:${ window.innerHeight/2 }px;`
        })
    })    

    function toggleMenu() {
        isNavBtnHidden.value = !isNavBtnHidden.value
        if(isNavBtnHidden.value) isMenuHidden.value = false
        else isMenuHidden.value = true
    }
    
    const nav = {
        svg: {
            init: ["transition-all duration-200"],
            close: ["scale-100 fill-[var(--color-background-soft)] "],
            open: ["scale-[12] md:scale-[18] fill-[var(--color-background-mute)]"],
        },
        sign: {
            init: ["transition-all fill-[var(--color-text)]"],
            close: ["delay-150"],
            open: ["opacity-0 rotate-45"],
        },
        menu: {
            ctnr: {
                init: ["fixed -translate-y-1/2 top-1/2 flex flex-col space-y-4"],
                close: ["right-full delay-150"],
                open: ["right-[90%]"]
            },
            init: ["text-6xl md:text-3xl transition-all duration-150"],
            close: ["opacity-0 -translate-x-0"],
            open: ["opacity-100 translate-x-full"],
        },
        closeSVG: {
            init: [" transition-all duration-150 fill-[var(--color-text)]"],
        }
    }
    const navSensor = {
        init: ["block w-[8px] h-[76px] bg-red-400 rounded-e-full "],
        in: ["left-0"],
        out: ["-left-full"],
        ctnr: ["fixed w-[55px] h-[76px] -translate-y-1/2 transition-all duration-150"]
    }
    const navBtn = {
        init: ["fixed -translate-y-1/2 transition-all duration-150"],
        hide: ["-left-full"],
        show: ["left-0"]
    }

    const slideInNavIcon = () => {
        console.log('slideInNavIcon');
        isNavBtnHidden.value = false
    }
    const isSensorHidden = computed(()=> {
        if(isMenuHidden.value && isNavBtnHidden.value) return false
        else return true
    })

    var link = computed(()=> {
        return [nav.menu.init, isMenuHidden.value?nav.menu.close:nav.menu.open]
    })
</script>

<script>
    import { watch } from 'vue'
    export const isNavBtnHidden = ref(false)
    export const isMenuHidden = ref(true)
    // console.log('script NavBar.vue loaded');
    watch(
        isNavBtnHidden,
        ()=> {
            if(isNavBtnHidden.value==false) {
                const x = setTimeout(()=> {
                    if(isMenuHidden.value==true) {
                        console.log("isNavBtnHidden.value = true")
                        isNavBtnHidden.value = true
                    } else clearTimeout(x)
                }, 1500)
            } else return
        },
    )
</script>

<template>
    <button ref="navButtonRef" :style="centerMark" :class="[navBtn.init, isSensorHidden?navBtn.show:navBtn.hide]" @click="toggleMenu">
        <svg :class="[nav.svg.init, isMenuHidden?nav.svg.close:nav.svg.open]" x="0px" y="0px" width="55px" height="76px" viewBox="0 0 55 76" enable-background="new 0 0 55 76" xml:space="preserve">
            <path d="M17,0c-0.084,0-0.166,0.006-0.25,0.006V0h-17v76h17v-0.006C16.834,75.994,16.916,76,17,76c20.987,0,38-17.013,38-38 C55,17.013,37.987,0,17,0z"/>
            <path :class="[nav.sign.init, isMenuHidden?nav.sign.close:nav.sign.open]" d="M37.75,37h-6v-6.5c0-0.828-0.672-1.5-1.5-1.5s-1.5,0.672-1.5,1.5V37h-6c-0.828,0-1.5,0.672-1.5,1.5 s0.672,1.5,1.5,1.5h6v5.5c0,0.828,0.672,1.5,1.5,1.5s1.5-0.672,1.5-1.5V40h6c0.828,0,1.5-0.672,1.5-1.5S38.578,37,37.75,37z"/>
        </svg>
    </button>

    <button ref="navButtonSensorRef" :style="centerMark" :class="[navSensor.ctnr, isSensorHidden?navSensor.out:navSensor.in]"  @click="slideInNavIcon">
        <span id="navIconSensor" :class="[navSensor.init]"></span>
    </button>

	<div :class="[nav.menu.ctnr.init, isMenuHidden?nav.menu.ctnr.close:nav.menu.ctnr.open]">
		<NuxtLink @mousedown="toggleMenu" to="/">           <p :class="link, 'underline underline-offset-2'" class="delay-[30ms]" >Home</p></NuxtLink>
		<NuxtLink @mousedown="toggleMenu" to="/projects">   <p :class="link" class="delay-[60ms]">Projects</p></NuxtLink>
		<NuxtLink @mousedown="toggleMenu" to="/about">      <p :class="link" class="delay-[90ms]">About</p></NuxtLink>
		<NuxtLink @mousedown="toggleMenu" to="/contact">    <p :class="link" class="delay-[120ms]">Contact</p></NuxtLink>

        <button @click="toggleMenu" class="pt-8 flex justify-center delay-[150ms]"  :class="[nav.closeSVG.init, isMenuHidden?nav.menu.close:nav.menu.open]">
            <svg x="0px" y="0px"  width="51px" height="22px" viewBox="0 0 51 22" enable-background="new 0 0 51 22" xml:space="preserve">
                <path d="M49,9H7.193l5.821-5.821c0.648-0.647,0.648-1.698,0-2.346c-0.648-0.648-1.698-0.648-2.346,0L0.5,11l10.168,10.167 c0.324,0.323,0.749,0.486,1.173,0.486c0.424,0,0.85-0.163,1.172-0.486c0.648-0.647,0.648-1.698,0-2.346L7.193,13H49 c0.828,0,1.5-0.893,1.5-2S49.828,9,49,9z"/>
            </svg>
        </button>
	</div>
</template>
