<script setup>
  onMounted(()=> {
    console.log('app mounted: path=', useRoute().path); // to see reloaded page path
  })


  const currentPath = ref(useRoute().path)
  provide("dataProvide", currentPath)

  
  const providePathToNavBar = (x) => {
    console.log('pgPath :' , x);
    currentPath.value = x
  }
</script>

<template>
  <NuxtPage @pgPath="(x)=> providePathToNavBar(x)" />
  <NavBar  />
  <SocMed />
</template>



