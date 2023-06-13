<script setup>
    defineProps({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        steks: {
            type: String,
            required: true,
        },
        uiux: {
            type: Object,
            required: true,
        },
    })
</script>

<template>
    <div class="flex flex-col justify-between sm:justify-evenly relative h-[inherit] w-full bg-[var(--color-background-mute)] rounded-xl">
        
        <div class="space-y-4">
            <p class="font-extrabold text-2xl sm:text-xl text-center text-[var(--color-text)]"> {{ title }} </p>
            <p class="font-semibold text-xl text-center text-[var(--color-text)]"> {{ description }} </p>
    
            <table class="py-2 font-medium text-center text-md lg:text-lg mx-auto text-[var(--color-text)]">
                <tbody>
                    <tr>
                        <td class="align-top text-[var(--color-text)]"> Stacks </td>
                        <td class="align-top text-[var(--color-text)]">&nbsp; : &nbsp;</td>
                        <td class="text-[var(--color-text)]"> {{ steks }} </td>
                    </tr>
                    <tr>
                        <td class="align-top text-[var(--color-text)]"> UI/UX</td>
                        <td class="align-top text-[var(--color-text)]">&nbsp; : &nbsp;</td>
                        <td>
                            <li v-for="x in uiux"  class="text-[var(--color-text)]">{{ x }}</li>                        
                        </td>
                    </tr>
                </tbody>    
            </table>
        </div>

        <slot name="image"> <p>fallback</p> </slot>
        <slot name="links"> <p>fallback</p> </slot>
    </div>
</template>


