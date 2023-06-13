<script setup>
    import data from '../assets/projectsItems.json'
    import ProjectCardPagination from '../components/ProjectPageNumber.vue'
    // console.log(data, Object.keys(data).length);
    const isDarkScoped = useNuxtApp().$isDarkApp()
    const isMenuHidden = useNuxtApp().$isMenuHiddenApp()
    const isMobile = useNuxtApp().$isMobile()

    const emiT = defineEmits(['pgPath'])
    onMounted(()=>{
        emiT('pgPath', useRoute().path)
    })
    const currKard = ref(1)
    const totalCards = Object.keys(data).length;
    const getHeight = ref('height:100px;') // dummy init for server side
    const isPortrait = ref(undefined)    
    onMounted(()=> {
        isPortrait.value = window.matchMedia("(orientation: portrait)").matches
        window.addEventListener("resize", () => {
            if(isMobile.value==false) return
            isPortrait.value = window.matchMedia("(orientation: portrait)").matches
            getHeight.value = `height:${window.innerHeight-32}px;`
        })
        getHeight.value = `height:${window.innerHeight-32}px;`
    })    

    let loadedImg = ref([0, 1])
    function isCardInsideOfViewport() {  
        data.forEach((x, ind)=> {
            let y = document.getElementById('card' + ind)
            let z = y.firstElementChild
            const rect = z.getBoundingClientRect();
            const isInViewport = 
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (screen.height) &&
                rect.right <= (screen.width);
            if(isInViewport) {
                currKard.value = ind + 1
                if(loadedImg.value.includes(ind + 1)) return
                loadedImg.value.push(ind + 1)                
                // console.log(loadedImg.value);
            }            
        })
    }    
    const scrLscape = {
        uList: ["sm:grid sm:grid-cols-2 sm:grid-flow-row sm:gap-4"]
    }
    const scrollDirectRef = ref(null)
    const scrollDirect = (ind) => {
        scrollDirectRef.value.scrollTop = scrollDirectRef.value.offsetHeight * (ind)
    }
</script>

<template>
    <div class="transition-opacity duration-200 mx-auto" :class="[isMobile?[isMenuHidden?'opacity-100 delay-100':'opacity-0']:'flex items-center justify-center'] " >
        <ul class="hidden p-1 lg:flex border min-w-[350px] h-[80svh] rounded-xl  flex-col justify-center mr-4 box-border">
            <p class="mb-2 tracking-wider text-2xl text-center font-bold underline underline-offset-2 text-[var(--color-text)]"> Titles </p>
            <li v-for="(z, index) in data" :key="'deskli'+index" class="p-0.5 mx-auto text-2xl w-max text-[var(--color-text)]" >
                <button @click="scrollDirect(index)" :class="[currKard==(index+1)?'translate-x-[-1%] font-bold':'']" class="text-2xl p-0.5 hover:scale-105 transition duration-150 hover:translate-x-[-1%]" :aria-label="z.description">
                    {{ z.title }}
                </button>
            </li>
        </ul>
        <ul ref="scrollDirectRef" @scroll="isCardInsideOfViewport" :style="isMobile?getHeight:''" class="w-full grid gap-4 snap-y snap-mandatory overflow-scroll transition-all duration-300" :class="[isMobile?[isPortrait?'':scrLscape.uList]:'h-[80svh] min-w-[700px]']" >    
            <li v-for="(x, ind) in data" class="relative list-none h-[inherit] snap-center" :key="'li'+ind">
                <div :id="'card'+ind" class="h-full w-full bg-[var(--color-background-mute)] rounded-xl overflow-clip p-4">
                    <ProjectCard :key="'card'+ind"
                        :title="x.title"
                        :description="x.description"
                        :steks="x.stacks"
                        :uiux="x.UI"
                    >                                       
                        <template #image>
                            <img
                                :id="'imgCard'+ind"
                                :alt="x.description"                        
                                class="mx-auto rounded-lg transition-all duration-300 w-auto h-auto sm:hidden lg:block"
                                :class="[loadedImg.includes(ind +1)?'opacity-100':'opacity-0', isDarkScoped?'grayscale-[75%]':'grayscale-0']"                               
                                :src="[loadedImg.includes(ind)?x.imgURL:undefined]"                                
                            />
                        </template>

                        <template #links>
                            <div class="space-x-14 p-2 flex justify-start pl-8 sm:pl-0 sm:justify-evenly">
                                <IconGitHub :link="x.githubURL" />
                                <IconNetlify :link="x.netlifyURL" />
                            </div>
                        </template>
                    </ProjectCard>   
                </div>
            </li>    
        </ul>
        <ProjectCardPagination :current-kard="currKard" :total-kards="totalCards"  />

    </div>
</template>