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
        
        <div class="space-y-1">
            <p class="font-bold text-2xl sm:text-xl text-center"> {{ title }} </p>
            <p class="text-xl text-center"> {{ description }} </p>
    
            <table class="text-md mx-auto">
                <tbody>
                    <tr class="py-2">
                        <td class="align-top text-center"> Stacks </td>
                        <td class="align-top">&nbsp; : &nbsp;</td>
                        <td class="text-center"> {{ steks }} </td>
                    </tr>
                    <tr>
                        <td class="align-top text-center"> UI/UX</td>
                        <td class="align-top">&nbsp; : &nbsp;</td>
                        <td>
                            <li class="text-center" v-for="x in uiux">{{ x }}</li>                        
                        </td>
                    </tr>
                </tbody>    
            </table>
        </div>

        <slot name="image"> <p>fallback</p> </slot>
        <slot name="links"> <p>fallback</p> </slot>
    </div>
</template>


