<script setup>
import ProjectList from "../assets/projectsItems.json"

const currKard = ref(1)
const totalCards = Object.keys(ProjectList).length

// const allItems = ref(data)
// const { list, containerProps, wrapperProps } = useVirtualList(
//   allItems,
//   { itemHeight: 25, },
// )

const props = defineProps({
  isMobile: { type: Boolean, required: true },
  isMenuHidden: { type: Boolean, required: true },
  isDark: { type: Boolean, required: true },
  isPortrait: { type: Boolean, required: true },
  customInnerHeight: { type: Number, required: true },
})
const emiT = defineEmits(["pgPath"])
onMounted(() => {
  emiT("pgPath", useRoute().path)
})

let loadedImg = ref([0, 1]) //init with 1st & 2nd card images

const scrLscape = {
  uList: ["sm:grid sm:grid-cols-2 sm:grid-flow-row sm:gap-4"],
}
const scrollDirectRef = ref(null)
const scrollDirect = (ind) => {
  scrollDirectRef.value.scrollTop = scrollDirectRef.value.offsetHeight * ind
}

function individualCardIsVisibleWithinViewport(ind, txt) {
  // console.log(ind, txt)
  currKard.value = ind + 1
  // if (loadedImg.value.includes(ind + 1)) return
  // else loadedImg.value.push(ind + 1)
}
</script>

<template>
  <div>
    <ClientOnly>
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
            v-for="(z, index) in ProjectList"
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
          :style="isMobile ? `height:${customInnerHeight - 32}px;` : ''"
          ref="scrollDirectRef"
          class="w-full grid gap-4 snap-y snap-mandatory overflow-scroll transition-all duration-300"
          :class="[
            isMobile
              ? [isPortrait ? '' : scrLscape.uList]
              : 'h-[80svh] min-w-[700px]',
          ]"
        >
          <ProjectCard
            v-for="(kard, ind) in ProjectList"
            :title="kard.title"
            :description="kard.description"
            :steks="kard.stacks"
            :uiux="kard.UI"
            :index="ind"
            @is-visible-emit="
              (ind, txt) => individualCardIsVisibleWithinViewport(ind, txt)
            "
          >
            <template #image>
              <nuxt-img
                loading="lazy"
                format="webp"
                sizes="sm:180px xl:220px"
                :src="kard.imgURL"
                :alt="kard.description"
                class="mx-auto rounded-lg transition-all duration-300 sm:hidden lg:block"
                :class="[isDark ? 'grayscale-[75%]' : 'grayscale-0']"
              />
            </template>

            <template #links>
              <div
                class="space-x-14 p-2 flex justify-start pl-8 sm:pl-0 sm:justify-evenly"
              >
                <IconGitHub :link="kard.githubURL" :is-dark="isDark" />
                <IconNetlify :link="kard.netlifyURL" />
              </div>
            </template>
          </ProjectCard>
        </ul>

        <ProjectPageNumber :current-kard="currKard" :total-kards="totalCards" />
      </div>
    </ClientOnly>
  </div>
</template>
