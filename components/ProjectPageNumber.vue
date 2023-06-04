<script setup>
    defineProps({
        currentKard: {
            type: Number,
            required: true,
        },
        totalKards: {
            type: Number,
            required: true,
        },
    })
</script>

<template>
        <div class="flex items-center justify-center absolute bottom-[20px] right-[20px]">        
            <p class="flex items-center justify-center text-md rounded-md w-[65px] h-[30px] bg-[var(--color-background-soft)]">
                {{ currentKard }} / {{ totalKards }}
            </p>
        </div>
</template>