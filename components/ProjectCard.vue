<script setup>

const props = defineProps({
  index: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  steks: { type: String, required: true },
  uiux: { type: String, required: true },
})
const projectCardRef = ref(null)
const isVisible = useElementVisibility(projectCardRef)
const emiT = defineEmits(["isVisibleEmit"])
watch(
  isVisible, // isVisible mutates on page load, so watch runs accordingly (not a default behavior)
  () => {
    if (isVisible.value === true) {
      emiT("isVisibleEmit", props.index, props.title)
    }
  },
)
</script>

<template>
  <li ref="projectCardRef" class="relative list-none h-[inherit] snap-center">
    <div
      :id="'card' + index"
      class="h-full w-full bg-[var(--color-background-soft)] rounded-xl overflow-clip p-4 lg:border lg:border-[var(--color-border)]"
    >
      <div
        v-if="isVisible"
        class="flex flex-col justify-between sm:justify-evenly relative h-[inherit] w-full rounded-xl"
      >
        <div class="space-y-1.5">
          <p
            class="font-extrabold text-xl sm:text-xl text-center text-[var(--color-text)]"
          >
            {{ title }}
          </p>
          <p
            class="font-normal lg:font-medium text-lg text-center text-[var(--color-text)]"
          >
            {{ description }}
          </p>

          <table
            class="py-2 font-medium text-center text-md lg:text-lg mx-auto text-[var(--color-text)]"
          >
            <tbody>
              <tr
                class="[&>*]:lg:font-extralight [&>*]:align-top [&>*]:text-[var(--color-text)]"
              >
                <td>Stacks</td>
                <td>&nbsp; : &nbsp;</td>
                <td class="text-[var(--color-text)]">{{ steks }}</td>
              </tr>
              <tr
                class="[&>*]:lg:font-extralight [&>*]:align-top [&>*]:text-[var(--color-text)]"
              >
                <td>UI/UX</td>
                <td>&nbsp; : &nbsp;</td>
                <td>{{ uiux }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <slot name="image"> <p>fallback</p> </slot>
        <slot name="links"> <p>fallback</p> </slot>
      </div>
    </div>
  </li>
</template>
