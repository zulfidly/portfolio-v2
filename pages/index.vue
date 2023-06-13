<script setup>
    const isMenuHidden = useNuxtApp().$isMenuHiddenApp()

    const emiT = defineEmits(['pgPath'])
    onMounted(()=>{
        emiT('pgPath', useRoute().path)
    })

    const intro = {
        init: ["text-4xl text-center text-[var(--color-text)] transition-opacity duration-200"],
        greet: ["text-7xl text-center text-[var(--color-text)] transition-opacity duration-200"],
        hide: ["opacity-0"],
        show: ["opacity-100 delay-100"],
    }
    const style = computed(() => {
        return [intro.init, isMenuHidden.value?intro.show:intro.hide]
    })
</script>

<template>
    <main class="p-4 mt-[15%] md:mt-0">
        <header :class="[intro.greet, isMenuHidden?intro.show:intro.hide]"> Welcome </header>
        <br>
        <p :class="style"> May this space</p>
        <p :class="style"> offers you a glimpse </p>
        <p :class="style"> into my coding</p>
        <p :class="style"> journey </p>
    </main>
    <h1 class="opacity-0">Welcome to freddie's online portfolio</h1>
</template>