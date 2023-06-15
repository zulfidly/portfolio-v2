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
    <div class="mt-8 lg:mt-0 px-2 py-2 lg:max-w-[55vw] lg:h-[80svh] transition-opacity duration-200" :class="[isMenuHidden?opac.show:opac.hide]">
        <p class="text-xl mb-4 text-[var(--color-text)]">My current coding vocabularies includes </p>
        <ul class=" grid grid-cols-1 gap-3 h-[inherit] overflow-scroll">
            <li v-for="(stack, ind) in stacks" :key="stack+ind" :class="['px-4 py-8 flex flex-col lg:flex-row-reverse items-center justify-between border border-[var(--color-border)] bg-[var(--color-background-soft)] rounded-xl']">
                <button :aria-label="'visit '+stacks.title" class="mx-4 rounded-lg">
                    <a :href="stack.link" target="_blank" :aria-label="'visit '+stack.title">
                        <img :src="stack.iconURL" :alt="stack.title+' logo'" class="rounded-xl"/>
                    </a>
                </button>
    
                
                <div class="p-4">
                    <section>
                        <span class="text-lg font-bold text-[var(--color-text)]">{{ stack.title }}</span>
                        <span class="text-lg text-[var(--color-text)]">&nbsp;{{ stack.description }}</span>
                    </section>
                    <p class="mt-2 text-lg text-[var(--color-text)]">Area of application : {{ stack.application }}</p>
                </div>
    
            
            </li>
        </ul>
    </div>

</template>