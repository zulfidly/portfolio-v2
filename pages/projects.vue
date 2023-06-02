<script setup>
    import data from '../assets/projectsItems.json'
    import ProjectCardPagination from '../components/ProjectPageNumber.vue'
    import { isMenuHidden } from '~/components/NavBar.vue';
    import { SocMedVisibilityMngr } from '../components/SocMed.vue'
    import { ref } from 'vue'
    // console.log(data);
    // console.log(Object.keys(data).length);
    useHead({  title: 'Projects' })
    SocMedVisibilityMngr(useRoute().path)
    
    const currKard = ref(1)
    const totalCards = Object.keys(data).length;
 
    let loadedImg = [0]
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
                if(loadedImg.includes(ind)) return
                loadedImg.push(ind)                
                // console.log(loadedImg);
            }            
        })
    }    
</script>

<template>
    <div class="transition-all duration-500" :class="[isMenuHidden ? 'opacity-100' : 'opacity-0']" >
        <ul @scroll="isCardInsideOfViewport" class="h-[90svh] w-full grid snap-y snap-mandatory overflow-scroll">    
            <li v-for="(x, ind) in data" class="relative list-none h-[inherit] snap-center p-0.5" :key="'li'+ind">
                <div :id="'card'+ind" class="h-full w-full bg-[var(--color-background-mute)] rounded-xl overflow-clip p-6">
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
                                class="mx-auto mt-4 rounded-lg transition-all duration-500 delay-100 w-[212px] h-[400px] md:hidden"
                                :class="loadedImg.includes(ind) ? 'opacity-100' : 'opacity-0' "
                                :src="loadedImg.includes(ind) ? x.imgURL : '#' "
                            />
                        </template>
                    </ProjectCard>              
                         
                    <div class="absolute bottom-[15px] left-[50px] space-x-14 flex">
                        <IconGitHub :link="x.githubURL" />
                        <IconNetlify :link="x.netlifyURL" />
                    </div>
                </div>
            </li>    
        </ul>
        
        <ProjectCardPagination :current-kard="currKard" :total-kards="totalCards" />

    </div>
</template>


