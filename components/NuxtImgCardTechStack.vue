<script setup>
import { useImage } from "@vueuse/core";

const props = defineProps({
    imgSrc: { type: String, required: true },
    imgAlt: { type: String, required: true },
})
const { isLoading } = useImage({ src: props.imgSrc })

</script>

<template>
        <div>
        <div v-if="isLoading"
            class="flex justify-center items-center">
            <IconLoader></IconLoader>
        </div>
        <img v-else
            :src="imgSrc"
            :alt="imgAlt"
            class="w-[80px] h-[80px] hover:scale-110 transition-transform"
        />
    </div>

</template>