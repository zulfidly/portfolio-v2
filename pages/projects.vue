<script setup>
import data from "../assets/projectsItems.json"
// import ProjectCard from './components/ProjectCard.vue'

const props = defineProps({
  isMobile: { type: Boolean, required: true },
  isMenuHidden: { type: Boolean, required: true },
  isDark: { type: Boolean, required: true },
  isPortrait: { type: Boolean, required: true },
  customInnerHeight: { type: Number, required: true, default: 100 },
})
const emiT = defineEmits(["pgPath"])
onMounted(() => {
  emiT("pgPath", useRoute().path)
})
const currKard = ref(1)
const totalCards = Object.keys(data).length
const getHeight = computed(() => {
  return `height:${props.customInnerHeight - 32}px;`
})
let loadedImg = ref([0, 1])
function isCardInsideOfViewport() {
  data.forEach((x, ind) => {
    let y = document.getElementById("card" + ind)
    let z = y.firstElementChild
    const rect = z.getBoundingClientRect()
    const isInViewport =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= screen.height &&
      rect.right <= screen.width
    if (isInViewport) {
      currKard.value = ind + 1
      if (loadedImg.value.includes(ind + 1)) return
      loadedImg.value.push(ind + 1)
      // console.log(loadedImg.value);
    }
  })
}
const scrLscape = {
  uList: ["sm:grid sm:grid-cols-2 sm:grid-flow-row sm:gap-4"],
}
const scrollDirectRef = ref(null)
const scrollDirect = (ind) => {
  scrollDirectRef.value.scrollTop = scrollDirectRef.value.offsetHeight * ind
}
</script>

<template>
  <div
    class="transition-opacity duration-200 mx-auto border lg:border-0 border-[var(--color-border)] rounded-xl"
    :class="[
      isMobile
        ? [isMenuHidden ? 'opacity-100 delay-100' : 'opacity-0']
        : 'flex items-center justify-center',
    ]"
  >
    <ul
      v-if="!isMobile"
      class="p-1 lg:flex flex-col justify-center border border-[var(--color-border)] min-w-[350px] rounded-xl mr-4 overflow-scroll bg-[var(--color-background-soft)]"
      :class="[isMobile ? '' : 'h-[80svh]']"
    >
      <li
        class="mb-1 tracking-wider text-xl text-center font-bold underline underline-offset-2 text-[var(--color-text)]"
      >
        Titles
      </li>
      <li
        v-for="(z, index) in data"
        :key="index"
        class="p-0 mx-auto w-max text-[var(--color-text)] transition-all"
      >
        <button
          @click="scrollDirect(index)"
          :class="[
            currKard === index + 1
              ? 'text-orange-400 dark:text-slate-300'
              : 'text-[var(--color-text)]',
          ]"
          class="p-0.5 text-lg lg:hover:scale-105 transition-all duration-100"
          :aria-label="z.description"
        >
          {{ z.title }}
        </button>
      </li>
    </ul>
    <ul
      ref="scrollDirectRef"
      @scroll="isCardInsideOfViewport"
      :style="isMobile ? getHeight : ''"
      class="w-full grid gap-4 snap-y snap-mandatory overflow-scroll transition-all duration-300"
      :class="[
        isMobile
          ? [isPortrait ? '' : scrLscape.uList]
          : 'h-[80svh] min-w-[700px]',
      ]"
    >
      <li
        v-for="(x, ind) in data"
        class="relative list-none h-[inherit] snap-center"
        :key="ind"
      >
        <div
          :id="'card' + ind"
          class="h-full w-full bg-[var(--color-background-soft)] rounded-xl overflow-clip p-4 lg:border lg:border-[var(--color-border)]"
        >
          <ProjectCard
            :key="ind"
            :title="x.title"
            :description="x.description"
            :steks="x.stacks"
            :uiux="x.UI"
          >
            <template #image>
              <img
                :id="ind"
                :alt="x.description"
                class="mx-auto rounded-lg transition-all duration-300 w-[212px] h-[400px] sm:hidden lg:block"
                :class="[
                  loadedImg.includes(ind + 1) ? 'opacity-100' : 'opacity-0',
                  isDark ? 'grayscale-[75%]' : 'grayscale-0',
                ]"
                :src="[loadedImg.includes(ind) ? x.imgURL : '']"
              />
            </template>

            <template #links>
              <div
                class="space-x-14 p-2 flex justify-start pl-8 sm:pl-0 sm:justify-evenly"
              >
                <IconGitHub :link="x.githubURL" :is-dark="isDark" />
                <IconNetlify :link="x.netlifyURL" />
              </div>
            </template>
          </ProjectCard>
        </div>
      </li>
    </ul>

    <ProjectPageNumber :current-kard="currKard" :total-kards="totalCards" />
  </div>
</template>
