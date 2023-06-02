<script setup>
    import { SocMedVisibilityMngr } from '../components/SocMed.vue'
    import { isNavBtnHidden } from '../components/NavBar.vue'
    import { isMenuHidden } from '../components/NavBar.vue'
    import ContactForm from '../components/ContactForm.vue'

    // isNavBtnHidden.value = true
    useHead({  title: 'Contact' })
    SocMedVisibilityMngr(useRoute().path)

    const opac = {
        show: ["opacity-100"],
        hide: ["opacity-0"]
    }

</script>

<template>
    <div class="h-[100svh] flex flex-col justify-start items-center transition-all duration-500" :class="isMenuHidden?opac.show:opac.hide">
        <p class="py-4 mx-auto text-2xl text-[var(--color-text)]">Send Fidly a message &#128236;</p>
        <ContactForm />
    </div>
</template>

