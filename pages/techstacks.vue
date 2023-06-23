<script setup>
    import stacks from '../assets/techstackItems.json'
    const isMenuHidden = useNuxtApp().$isMenuHiddenApp()
    
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
    <div class="mt-8 lg:mt-0 px-2 py-2 lg:max-w-[55vw] lg:h-[80svh] overflow-scroll transition-opacity duration-200" :class="[isMenuHidden?opac.show:opac.hide]">
        <p class="text-lg lg:text-xl mb-4 text-[var(--color-text)]">Listed are my current coding vocabularies. </p>
        <ul class=" grid grid-cols-1 gap-3 h-[inherit] overflow-scroll">
            <li v-for="(stack, ind) in stacks" :key="'stack'+ind" :class="['px-4 py-4 flex flex-col lg:flex-row-reverse items-center justify-between border border-[var(--color-border)] bg-[var(--color-background-soft)] rounded-xl']">
                <button :aria-label="'visit '+stack.title" class="min-w-[80px] min-h-[80px] mx-4 rounded-lg">
                    <a :href="stack.link" target="_blank" :aria-label="'visit '+stack.title">
                        <img :src="stack.iconURL" :alt="stack.title+' logo'" class="w-[80px] h-[80px]" />
                    </a>
                </button>  
                
                <div class="p-4">
                    <section>
                        <a :href="stack.link" target="_blank" :aria-label="'visit '+stack.title+' website'" class="text-lg lg:text-bold font-medium underline decoration-dotted underline-offset-4 text-[var(--color-text)]">{{ stack.title }}</a>
                        <span class="text-lg font-light text-[var(--color-text)]">&nbsp;{{ stack.description }}</span>
                    </section>
                    <p class="mt-2 font-extralight text-lg text-[var(--color-text)]">Area of application : {{ stack.application }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>