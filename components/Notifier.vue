<script setup>
    const isShow = useNuxtApp().$notifier()

    defineProps({
        msg: {
            type: String,
            default: 'initialised'
        }
    })

    const card = {
        init: ['fixed z-10 mt-3 w-11/12 py-4 px-12 text-center bg-orange-300 rounded-xl text-xl tracking-wider text-[var(--vt-c-indigo)] transition-all duration-700'],
        show: ['opacity-100 top-0'],
        hide: ['opacity-0 -top-full'],
    }
</script>

<template>
    <p :class="[card.init, isShow.isShown?card.show:card.hide]" >
        {{ msg }}
    </p>
</template>