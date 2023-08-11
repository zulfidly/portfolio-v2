<script setup>
const props = defineProps({
  currentPath: { type: String, required: true },
  isDark: { type: Boolean, required: true },
  isMobile: { type: Boolean, required: true },
  // isSocMedHidden: { type: Boolean, required: true },
})
const emiT = defineEmits(["isSocMedVisible"])
const isSocMedHidden = computed(() => {
  if (props.currentPath === "/" || props.currentPath === "/about") {
    emiT("isSocMedVisible", false)
    return false
  } else if (
    props.currentPath === "/projects" ||
    props.currentPath === "/contact" ||
    props.currentPath === "/techstacks"
  ) {
    emiT("isSocMedVisible", true)
    return true
  } else console.log("error in SocMed.vue")
})
const mobi = {
  init: [
    "fixed w-full translate-1/2 left-0 space-y-2 transition-all duration-300",
  ],
  show: ["opacity-100 bottom-0"],
  hide: ["opacity-0 -bottom-full"],
}
</script>

<template>
  <div
    :class="[
      isMobile
        ? [mobi.init, isSocMedHidden ? mobi.hide : mobi.show]
        : 'absolute top-0 right-0 mt-24 mr-0',
    ]"
  >
    <div
      :class="[
        isMobile
          ? 'flex justify-evenly'
          : ['flex flex-col gap-5 transition-all duration-200'],
      ]"
    >
      <button
        class="[&>a>svg>g>path]:dark:lg:hover:fill-[#0077B5]"
        aria-label="visit linked in website"
      >
        <a
          href="https://www.linkedin.com/in/zulfidly/"
          target="_blank"
          aria-label="visit linked in website"
        >
          <svg
            name="linkedin"
            x="0px"
            y="0px"
            width="40px"
            height="40px"
            viewBox="0 0 40 40"
            enable-background="new 0 0 40 40"
            xml:space="preserve"
          >
            <g>
              <path
                class="fill-[var(--linkedin)] transition duration-300"
                d="M19.962,39.997c-5.656,0-11.312-0.021-16.969,0.013c-1.501,0.008-2.771-1.037-2.976-2.457
                                c-0.021-0.146-0.03-0.297-0.03-0.445C-0.014,25.708-0.014,14.308-0.014,2.908c0-1.644,1.226-2.891,2.878-2.903
                                C4.675-0.01,6.485,0,8.296,0c9.577,0,19.153,0.01,28.729-0.01c1.55-0.003,2.603,1.053,2.857,2.037
                                c0.071,0.274,0.125,0.563,0.125,0.844c0.006,11.413,0.006,22.824,0.006,34.236c0,1.619-1.23,2.875-2.857,2.886
                                c-2.137,0.014-4.27,0.004-6.405,0.004C27.154,39.997,23.559,39.997,19.962,39.997z M21.332,17.567c0-0.802-0.016-1.488,0.006-2.173
                                c0.012-0.338-0.09-0.453-0.441-0.45c-1.635,0.018-3.271,0.021-4.905-0.001c-0.394-0.005-0.476,0.128-0.475,0.493
                                c0.01,6.082,0.01,12.162,0,18.241c-0.001,0.375,0.103,0.497,0.484,0.493c1.698-0.018,3.396-0.018,5.094,0.001
                                c0.383,0.004,0.48-0.119,0.479-0.494c-0.017-3.059-0.019-6.116-0.003-9.177c0.004-0.633,0.043-1.271,0.156-1.895
                                c0.229-1.293,0.821-2.341,2.205-2.687c0.418-0.104,0.862-0.126,1.295-0.121c1.443,0.018,2.323,0.685,2.645,2.104
                                c0.17,0.757,0.236,1.551,0.242,2.33c0.027,3.146,0.017,6.291,0.005,9.438c-0.001,0.368,0.103,0.504,0.485,0.5
                                c1.697-0.018,3.396-0.018,5.095-0.001c0.366,0.004,0.461-0.119,0.46-0.474c-0.012-3.385-0.012-6.768-0.004-10.15
                                c0.005-1.388-0.067-2.768-0.387-4.121c-0.375-1.601-1.076-3.004-2.517-3.926c-0.89-0.569-1.883-0.845-2.92-0.958
                                c-1.271-0.138-2.533-0.153-3.758,0.317C23.221,15.377,22.166,16.248,21.332,17.567z M5.852,24.57c0,3.045,0.006,6.091-0.008,9.136
                                c-0.002,0.369,0.118,0.467,0.47,0.464c1.709-0.016,3.419-0.013,5.129-0.003c0.33,0.003,0.458-0.087,0.457-0.442
                                c-0.01-6.115-0.01-12.23,0-18.347c0.001-0.362-0.132-0.434-0.458-0.431c-1.684,0.013-3.369,0.006-5.054,0.006
                                c-0.535,0-0.535,0.001-0.535,0.52C5.852,18.505,5.852,21.538,5.852,24.57z M8.844,12.387c1.941,0.003,3.5-1.521,3.504-3.426
                                c0.005-1.949-1.534-3.521-3.45-3.523C6.945,5.435,5.4,6.967,5.399,8.907C5.397,10.843,6.923,12.384,8.844,12.387z"
              />
            </g>
          </svg>
        </a>
      </button>

      <button
        :class="[
          isDark ? '[&>a>svg]:dark:lg:hover:fill-[var(--vt-c-white-soft)]' : '',
        ]"
        aria-label="visit github in website"
      >
        <a
          href="https://github.com/zulfidly"
          target="_blank"
          aria-label="visit github in website"
        >
          <svg
            name="github"
            class="fill-[var(--color-text)] transition-all duration-300"
            x="0px"
            y="0px"
            width="40px"
            height="40px"
            viewBox="0 0 40 40"
            enable-background="new 0 0 40 40"
            xml:space="preserve"
          >
            <g>
              <path
                d="M20,0C9.236,0,0.516,8.956,0.516,20c0,11.046,8.726,20,19.484,20c10.764,0,19.484-8.953,19.484-20
                                C39.484,8.956,30.764,0,20,0z M25.85,37.963c-0.938,0.188-1.27-0.402-1.27-0.91c0-0.619,0.021-2.66,0.021-5.191
                                c0-1.768-0.594-2.922-1.254-3.51c4.113-0.465,8.43-2.068,8.43-9.337c0-2.066-0.715-3.76-1.899-5.082
                                c0.188-0.479,0.826-2.4-0.183-5.009c0,0-1.547-0.51-5.072,1.943c-1.475-0.421-3.055-0.634-4.622-0.642
                                c-1.571,0.008-3.151,0.217-4.62,0.642c-3.527-2.449-5.078-1.943-5.078-1.943c-1.004,2.608-0.371,4.531-0.18,5.009
                                c-1.18,1.322-1.898,3.012-1.898,5.082c0,7.251,4.311,8.876,8.408,9.355c-0.525,0.473-1.004,1.307-1.172,2.529
                                c-1.053,0.482-3.727,1.318-5.371-1.574c0,0-0.975-1.816-2.828-1.951c0,0-1.804-0.023-0.125,1.15c0,0,1.211,0.58,2.047,2.768
                                c0,0,1.086,3.682,6.221,2.539c0.009,1.58,0.025,2.771,0.025,3.221c0,0.502-0.334,1.086-1.262,0.91
                                C6.83,35.457,1.543,28.363,1.543,20C1.539,9.551,9.805,1.079,20,1.079s18.462,8.472,18.462,18.93
                                C38.462,28.369,33.176,35.457,25.85,37.963z"
              />
            </g>
          </svg>
        </a>
      </button>

      <button
        class="[&>a>img]:dark:lg:hover:grayscale-0 [&>a>img]:dark:lg:hover:invert-0"
        aria-label="visit instagram in website"
      >
        <a
          href="https://www.instagram.com/fidlybass/"
          target="_blank"
          aria-label="visit freddie's instagram"
        >
          <nuxt-img
            format="webp"
            loading="lazy"
            width="40"
            height="40"
            class="grayscale-0 dark:grayscale invert-0 dark:invert-[60%] transition-all duration-300"
            src="/icons/insta40.png"
            alt="Instagram logo"
          />
        </a>
      </button>
    </div>
    <p
      :class="[
        isMobile ? '' : 'fixed bottom-0 left-1/2 -translate-x-1/2',
        currentPath != '/contact' ? '' : 'hidden',
      ]"
      class="text-xs text-center italic text-[var(--color-text)] transition-all duration-300"
    >
      Nuxt 3.4.3 / @nuxt/tailwindcss 6.6.8
    </p>
  </div>
</template>
