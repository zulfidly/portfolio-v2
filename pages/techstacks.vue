<script setup>
import stacks from "../assets/techstackItems.json"
// import TechStackCard from './components/TechStackCard.vue'

const props = defineProps({
  isMenuHidden: { type: Boolean, required: true },
})

const emiT = defineEmits(["pgPath"])

onMounted(() => {
  emiT("pgPath", useRoute().path)
})
const opac = {
  show: ["opacity-100 delay-100"],
  hide: ["opacity-0"],
}
</script>

<template>
  <div
    class="mt-8 lg:mt-0 px-2 py-2 lg:max-w-[55vw] lg:h-[80svh] transition-opacity duration-200"
    :class="[isMenuHidden ? opac.show : opac.hide]"
  >
    <p class="text-lg lg:text-xl mb-4 text-[var(--color-text)]">
      Listed are my current coding vocabularies.
    </p>

    <ul class="grid grid-cols-1 gap-3 h-[inherit] overflow-scroll">
      <TechStackCard v-for="(stackItem, ind) in stacks" :stack="stackItem" />
    </ul>
  </div>
</template>
