<script setup>
    import { SocMedVisibilityMngr } from '../components/SocMed.vue'
    SocMedVisibilityMngr(useRoute().path)
    const isMenuHidden =  useNuxtApp().$isMenuHiddenApp()

    const emiT = defineEmits(['pgPath'])
    onMounted(()=>{
        emiT('pgPath', useRoute().path)
    })

    const opac = {
        show: ["opacity-100 delay-100"],
        hide: ["opacity-0"]
    }
</script>

<template>
    <div class="mt-[15px] p-3 md:px-14 transition-opacity duration-200" :class="isMenuHidden?opac.show:opac.hide">
        <img class="mx-auto md:float-left md:m-4" src="/images/profilePhoto.png" />

        <p class="text-2xl md:text-xl text-center py-2 px-4 text-[var(--color-text)]">
            I'm Fidly, a frontend developer dedicated to crafting captivating user experiences. With clean code and seamless design, I create visually appealing and functional websites. Let's collaborate to shape the future of the web. Explore my portfolio and let's create exceptional digital experiences together.
        </p>
    </div>
</template>
