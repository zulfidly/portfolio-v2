<script setup>
    import ContactForm from '../components/ContactForm.vue'
    const emiT = defineEmits(['pgPath', 'notifierMsg'])

    const props = defineProps({
        isMenuHidden: { type: Boolean, required: true },
    })

    onMounted(()=>{
        emiT('pgPath', useRoute().path)
    })

    const opac = {
        show: ["opacity-100 delay-100"],
        hide: ["opacity-0"]
    }
</script>

<template>
    <div class="h-fit mt-8 flex flex-col justify-start items-center transition-opacity duration-200"
        :class="[isMenuHidden ? opac.show : opac.hide]">
        <p class="py-4 mx-auto text-2xl text-[var(--color-text)]">Send Freddie a message &#128236;</p>
        <ContactForm @notifier-msg="(txt)=> emiT('notifierMsg', txt)"/>
        <p class="fixed bottom-0 text-xs text-center italic text-[var(--color-text)]">nodemailer 6.9.3 / @formkit/nuxt 0.17.2</p>
    </div>
</template>

