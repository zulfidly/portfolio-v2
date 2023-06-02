<script setup>
  import { onMounted } from 'vue'

  onMounted(()=> {
    console.log('app mounted');
  })
</script>

<template>
  <NuxtPage  />
  <NavBar  />
  <SocMed />
</template>



