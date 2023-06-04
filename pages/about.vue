<script setup>
    import { isMenuHidden } from '../components/NavBar.vue'
    import { SocMedVisibilityMngr } from '../components/SocMed.vue'

    SocMedVisibilityMngr(useRoute().path)

    useHead({  title: 'About' })

    const opac = {
        show: ["opacity-100"],
        hide: ["opacity-0"]
    }
</script>

<template>
    <div class="mt-[15px] p-3 md:px-14 transition-all duration-200" :class="isMenuHidden?opac.show:opac.hide">
        <img class="mx-auto md:float-left md:m-4" src="/images/profilePhoto.png" />

        <p class="text-2xl md:text-xl text-center py-2 px-4">
            I'm Fidly, a frontend developer dedicated to crafting captivating user experiences. With clean code and seamless design, I create visually appealing and functional websites. Let's collaborate to shape the future of the web. Explore my portfolio and let's create exceptional digital experiences together.
        </p>
    </div>
</template>
