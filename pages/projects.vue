<script setup>
    import data from '../assets/projectsItems.json'
    import ProjectCardPagination from '../components/ProjectPageNumber.vue'
    import { isMenuHidden } from '~/components/NavBar.vue';
    import { SocMedVisibilityMngr } from '../components/SocMed.vue'
    import { ref } from 'vue'
    import { onMounted } from 'vue'
    import { computed } from 'vue'

    // console.log(data);
    // console.log(Object.keys(data).length);
    useHead({  title: 'Projects' })
    SocMedVisibilityMngr(useRoute().path)
    const cardRef = ref(null)
    const currKard = ref(1)
    const totalCards = Object.keys(data).length;
 
    let loadedImg = [0, 1]
    function isCardInsideOfViewport() {  
        console.log(cardRef.value);            
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
    const getWidth = ref('width:100px;') // dummy init for server side
    const getHeight = ref('height:100px;') // dummy init for server side

    onMounted(()=> {
        getWidth.value = window.innerWidth
        getHeight.value = window.innerHeight
    })

    
</script>

<template>
    <div class="transition-all duration-500" :class="[isMenuHidden ? 'opacity-100' : 'opacity-0']" >
        <ul @scroll="isCardInsideOfViewport" class="h-[95svh] w-full grid snap-y snap-mandatory overflow-scroll">    
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
                                class="mx-auto mt-4 rounded-lg transition-all duration-500 delay-100 w-auto max-h-[380px] sm:hidden"
                                :class="loadedImg.includes(ind+1) ? 'opacity-100' : 'opacity-0' "
                                :src="loadedImg.includes(ind) ? x.imgURL : '#' "
                            />
                        </template>

                        <template #links>
                            <div class="space-x-14 flex justify-start pl-8">
                                <IconGitHub :link="x.githubURL" />
                                <IconNetlify :link="x.netlifyURL" />
                            </div>
                        </template>

                    </ProjectCard>              
                         
                </div>
            </li>    
        </ul>
        <ProjectCardPagination :current-kard="currKard" :total-kards="totalCards" />

    </div>
</template>


