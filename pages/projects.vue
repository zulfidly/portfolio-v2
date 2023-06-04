<script setup>
    import data from '../assets/projectsItems.json'
    import ProjectCardPagination from '../components/ProjectPageNumber.vue'
    import { isMenuHidden } from '~/components/NavBar.vue';
    import { SocMedVisibilityMngr } from '../components/SocMed.vue'
    import { ref } from 'vue'
    import { onMounted } from 'vue'
    useHead({  title: 'Projects' })
    SocMedVisibilityMngr(useRoute().path)
    // console.log(data);
    // console.log(Object.keys(data).length);

    const currKard = ref(1)
    const totalCards = Object.keys(data).length;

    const getWidth = ref('width:100px;') // dummy init for server side
    const getHeight = ref('height:100px;') // dummy init for server side
    const isPortrait = ref(undefined)    
    onMounted(()=> {
        // console.log(' projects mounted');
        isPortrait.value = window.matchMedia("(orientation: portrait)").matches
        window.addEventListener("resize", () => {
                isPortrait.value = window.matchMedia("(orientation: portrait)").matches
                // console.log('isPortrait :', isPortrait.value);  
                getHeight.value = `height:${window.innerHeight-32}px;`
        })
        getWidth.value = window.innerWidth
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
        uL: ["sm:grid sm:grid-cols-2 sm:grid-flow-row sm:gap-4"]
    }
</script>

<template>
    <div class="transition-all duration-200 sm:px-8" :class="[isMenuHidden ? 'opacity-100' : 'opacity-0']" >
        <ul @scroll="isCardInsideOfViewport" :style="getHeight" class="w-full grid gap-4 snap-y snap-mandatory overflow-scroll transition-all duration-200" :class="[isPortrait?'':scrLscape.uL]" >    
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
                                class="mx-auto rounded-lg transition-all duration-500 w-auto h-auto sm:hidden"
                                :class="loadedImg.includes(ind+1) ? 'opacity-100' : 'opacity-0' "
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


