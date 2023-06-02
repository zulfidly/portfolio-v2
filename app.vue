<script setup>
  import { onMounted } from 'vue'
  import { isMenuHidden } from './components/NavBar.vue'


  onMounted(()=> {
    console.log('app mounted');
  })


</script>

<template>
  <NuxtPage  />
  <NavBar  />
  <SocMed />
</template>



