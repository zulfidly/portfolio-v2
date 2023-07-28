<script setup>
    const props = defineProps({
        isMobile: { type: Boolean, required: true },
        isMenuHidden: { type: Boolean, required: true },
        isDark: { type: Boolean, required: true },
    })

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
    <div class="mt-[15px] p-3 md:px-14 transition-opacity duration-200" :class="[isMobile ? [isMenuHidden?opac.show:opac.hide] : 'grid grid-cols-1 place-items-center']">
        <img class="mx-auto md:float-left md:m-4 max-w-[200px] max-h-[200px]"
            :class="[isDark ? 'grayscale-[20%]' : 'grayscale-0']" src="/images/profilePhoto.png" alt="freddie's cartoon" />

        <p class="text-2xl md:text-xl lg:text-3xl text-center py-2 px-4 text-[var(--color-text)]">
            I'm Freddie, a frontend developer dedicated to crafting captivating user experiences. With clean code and seamless design, I create visually appealing and functional websites. Let's collaborate to shape the future of the web. Explore my portfolio and let's create exceptional digital experiences together.
        </p>
    </div>
</template>
