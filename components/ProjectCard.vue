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
            type: String,
            required: true,
        },
    })
</script>

<template>
    <div class="flex flex-col justify-between sm:justify-evenly relative h-[inherit] w-full rounded-xl">
        
        <div class="space-y-1.5">
            <p class="font-extrabold text-xl sm:text-xl text-center text-[var(--color-text)]"> {{ title }} </p>
            <p class="font-normal lg:font-medium text-lg text-center text-[var(--color-text)]"> {{ description }} </p>
    
            <table class="py-2 font-medium text-center text-md lg:text-lg mx-auto text-[var(--color-text)]">
                <tbody>
                    <tr class="[&>*]:lg:font-extralight [&>*]:align-top [&>*]:text-[var(--color-text)]">
                        <td> Stacks </td>
                        <td>&nbsp; : &nbsp;</td>
                        <td class="text-[var(--color-text)]"> {{ steks }} </td>
                    </tr>
                    <tr class="[&>*]:lg:font-extralight [&>*]:align-top [&>*]:text-[var(--color-text)]">
                        <td> UI/UX</td>
                        <td>&nbsp; : &nbsp;</td>
                        <td> {{ uiux }} </td>
                    </tr>
                </tbody>    
            </table>
        </div>

        <slot name="image"> <p>fallback</p> </slot>
        <slot name="links"> <p>fallback</p> </slot>
    </div>
</template>


