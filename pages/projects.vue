<script setup>
    import data from '../assets/projectsItems.json'
    import ProjectCardPagination from '../components/ProjectPageNumber.vue'
    import { SocMedVisibilityMngr } from '../components/SocMed.vue'
    SocMedVisibilityMngr(useRoute().path)
    // console.log(data, Object.keys(data).length);
    const isDarkScoped = useNuxtApp().$isDarkApp()
    const isMenuHidden = useNuxtApp().$isMenuHiddenApp()

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
            isPortrait.value = window.matchMedia("(orientation: portrait)").matches
            getHeight.value = `height:${window.innerHeight-32}px;`
        })
        getHeight.value = `height:${window.innerHeight-32}px;`
    })    

    let loadedImg = [0, 1]
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
                if(loadedImg.includes(ind + 1)) return
                loadedImg.push(ind + 1)                
                // console.log(loadedImg);
            }            
        })
    }    
    const scrLscape = {
        uList: ["sm:grid sm:grid-cols-2 sm:grid-flow-row sm:gap-4"]
    }
</script>

<template>
    <div class="transition-opacity duration-200 sm:px-8" :class="[isMenuHidden ? 'opacity-100 delay-100' : 'opacity-0']" >
        <ul @scroll="isCardInsideOfViewport" :style="getHeight" class="w-full grid gap-4 snap-y snap-mandatory overflow-scroll transition-all duration-300" :class="[isPortrait?'':scrLscape.uList]" >    
            <li v-for="(x, ind) in data" class="relative list-none h-[inherit] snap-center p-0" :key="'li'+ind">
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
                                :hidden="false"
                                class="mx-auto rounded-lg transition-all duration-300 w-auto h-auto sm:hidden"
                                :class="[loadedImg.includes(ind+1) ? 'opacity-100' : 'opacity-0', isDarkScoped?'grayscale':'grayscale-0']"
                                :src="loadedImg.includes(ind)&&isPortrait ? x.imgURL : '#' "
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
        <ProjectCardPagination :current-kard="currKard" :total-kards="totalCards" v-if="isPortrait"/>

    </div>
</template>


