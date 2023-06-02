<script setup>
  import { onMounted } from 'vue'

  onMounted(()=> {
    console.log('app mounted');
  })

  definePageMeta({
    'Permissions-Policy': 'interest-cohort=()'
  })
</script>

<template>
  <NuxtPage  />
  <NavBar  />
  <SocMed />
</template>



