<script setup>
    import { SocMedVisibilityMngr } from '../components/SocMed.vue'
    import { isMenuHidden } from '../components/NavBar.vue'
    import ContactForm from '../components/ContactForm.vue'
    useHead({  title: 'Contact' })
    SocMedVisibilityMngr(useRoute().path)
    
    const emiT = defineEmits(['pgPath'])
    onMounted(()=>{
        emiT('pgPath', useRoute().path)
    })
    const opac = {
        show: ["opacity-100"],
        hide: ["opacity-0"]
    }

</script>

<template>
    <div class="h-[100svh] flex flex-col justify-start items-center transition-all duration-200" :class="isMenuHidden?opac.show:opac.hide">
        <p class="py-4 mx-auto text-2xl text-[var(--color-text)]">Send Fidly a message &#128236;</p>
        <ContactForm />
        <p class="fixed bottom-0 text-xs text-center italic">nodemailer 6.9.3 / @formkit/nuxt 0.17.2</p>
    </div>
</template>

