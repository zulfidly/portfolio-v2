<script setup>
    import { computed } from 'vue'
    import { isMenuHidden } from '../components/NavBar.vue'
    import { SocMedVisibilityMngr } from '../components/SocMed.vue'

    useHead({  title: 'Home' })
    SocMedVisibilityMngr(useRoute().path)

    // console.log("Homepage loaded");
    const intro = {
        init: ["transition-all duration-300"],
        hide: ["opacity-0"],
        show: ["opacity-100 delay-300"],
        greet: ["text-7xl text-center"],
        msg: ["text-4xl text-center"],
    }
    const style = computed(() => {
        return [intro.msg, intro.init, isMenuHidden.value?intro.show:intro.hide]
    })
</script>

<template>
    <main class="p-4 mt-[15%] md:mt-0">
        <p :class="[intro.greet, intro.init, isMenuHidden?intro.show:intro.hide]"> Welcome </p>
        <br>
        <p :class="style"> May this space</p>
        <p :class="style"> offers you a glimpse </p>
        <p :class="style"> into my coding</p>
        <p :class="style"> journey </p>
    </main>
</template>