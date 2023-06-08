<script setup>
    import { SocMedVisibilityMngr } from '../components/SocMed.vue'
    import ContactForm from '../components/ContactForm.vue'
    SocMedVisibilityMngr(useRoute().path)
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
    <div class="h-fit mt-10 flex flex-col justify-start items-center transition-opacity duration-200" :class="isMenuHidden?opac.show:opac.hide">
        <p class="py-4 mx-auto text-2xl text-[var(--color-text)]">Send Fidly a message &#128236;</p>
        <ContactForm />
        <p class="fixed bottom-0 text-xs text-center italic text-[var(--color-text)]">nodemailer 6.9.3 / @formkit/nuxt 0.17.2</p>
    </div>
</template>

