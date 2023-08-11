<template>
  <li
    ref="domEL"
    class="px-4 py-4 flex flex-col lg:flex-row-reverse items-center justify-between border border-[var(--color-border)] bg-[var(--color-background-soft)] rounded-xl transition-opacity duration-300"
    :class="[isVisible ? 'opacity-100' : 'opacity-0']"
  >
    <button
      :aria-label="'visit ' + stack.title"
      class="min-w-[80px] min-h-[80px] mx-4 rounded-lg"
    >
      <a
        :href="stack.link"
        target="_blank"
        :aria-label="'visit ' + stack.title"
      >
        <abbr :title="stack.title">
          <nuxt-img
            width="80"
            height="80"
            loading="lazy"
            :src="stack.iconURL"
            :alt="stack.title + ' logo'"
          />
        </abbr>
      </a>
    </button>

    <div class="p-4">
      <section>
        <a
          target="_blank"
          :href="stack.link"
          :aria-label="'visit ' + stack.title + ' website'"
          class="text-lg lg:text-bold font-medium underline decoration-dotted underline-offset-4 text-[var(--color-text)]"
        >
          {{ stack.title }}
        </a>
        <span class="text-lg font-light text-[var(--color-text)]"
          >&nbsp;{{ stack.description }}</span
        >
      </section>
      <p class="mt-2 font-extralight text-lg text-[var(--color-text)]">
        Area of application : {{ stack.application }}
      </p>
    </div>
  </li>
</template>

<script setup>
const domEL = ref(null)
const isVisible = useElementVisibility(domEL)
defineProps({
  stack: { type: Object, required: true },
})
</script>
