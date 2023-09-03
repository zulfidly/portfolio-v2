<script setup>
const props = defineProps({
  isMenuHidden: {
    type: Boolean,
    required: true,
  },
})

const emiT = defineEmits(["pgPath"])
onMounted(() => {
  emiT("pgPath", useRoute().path)
})
useHead({
  title: 'Home'
})
const intro = {
  init: [
    "text-4xl text-center text-[var(--color-text)] transition-opacity duration-200",
  ],
  greet: [
    "text-7xl text-center text-[var(--color-text)] transition-opacity duration-200",
  ],
  hide: ["opacity-0"],
  show: ["opacity-100 delay-100"],
}
const style = computed(() => {
  return [intro.init, props.isMenuHidden ? intro.show : intro.hide]
})
</script>

<template>
  <main class="p-4 mt-[15%] md:mt-0">
    <header :class="[intro.greet, isMenuHidden ? intro.show : intro.hide]">
      Welcome
    </header>
    <br />
    <h1 :class="style">May this space</h1>
    <h1 :class="style">offers you a glimpse</h1>
    <h1 :class="style">into my coding</h1>
    <h1 :class="style">journey</h1>
  </main>
</template>
