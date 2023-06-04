<script setup>
  import { onMounted } from 'vue'


  onMounted(()=> {
    console.log('app mounted');
  })

  const test = (x) => {
    console.log(x);
  }
</script>

<template>
  <NuxtPage @pgPath="(x)=> test(x)" />
  <NavBar  />
  <SocMed />
</template>



