<script setup>
import { useImage } from "@vueuse/core";

const props = defineProps({
    imgSrc: { type: String, required: true },
    imgAlt: { type: String, required: true },
    isColorDark: { type: Boolean, required: true },
})
const { isLoading } = useImage({ src: props.imgSrc })

</script>

<template>
    <div>
        <div v-if="isLoading"
            class="flex justify-center items-center mx-auto md:float-top">
            <IconLoader></IconLoader>
        </div>
        <nuxt-img v-else
            sizes="sm:180px xl:220px"
            :src="imgSrc"
            :alt="imgAlt"
            class="mx-auto rounded-lg transition-all duration-300 sm:hidden lg:block"
            :class="[isColorDark ? 'grayscale-[75%]' : 'grayscale-0']"
        />
    </div>
</template>