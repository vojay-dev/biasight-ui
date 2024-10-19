<template>
  <div>
    <div ref="vantaRef" class="vanta-bg"></div>
    <div class="flex w-4/5 lg:w-3/5 flex-col border-opacity-50 mx-auto pt-10">
      <div class="flex flex-row flex-wrap gap-4 justify-center items-center mb-5">
        <h1 class="mb-5 text-5xl font-bold">About <span class="gemini">BiaSight</span></h1>
      </div>

      <div class="flex flex-row flex-wrap gap-4 justify-left items-center mb-5">
        <h2 class="text-2xl gemini">Motivation</h2>

        <p class="mb-2 text-justify">
          <strong>Words matter</strong>. In a world where gender inequality persists despite decades of progress, BiaSight addresses one of the most pervasive yet often overlooked aspects of discrimination: the language we use in our digital spaces. BiaSight uses the power of Google's cutting-edge AI, including Gemini, to analyze and improve the inclusivity of online content.
        </p>

        <p class="mb-2 text-justify">
          While content creators and website authors often focus on performance, usability, and visual appeal, the impact of words on discrimination against women and girls and how this impacts equality is frequently underestimated. BiaSight aims to change this by providing an intuitive, AI-driven analysis of web content across various equality categories, much like how Google PageSpeed Insights has become an indispensable tool for web performance optimization.
        </p>

        <p class="mb-2 text-justify">
          The vision of BiaSight is to make gender-inclusive language as integral to web development as responsive design or SEO optimization and to inspire creators for change.
        </p>

        <p class="mb-2 text-justify">
          Remember, words matter. They shape perceptions, influence behaviors, and can either reinforce or challenge the gender inequalities that persist in our society.
        </p>

        <p class="mb-2 text-justify">
          Please also read the <a href="https://www.un.org/sustainabledevelopment/gender-equality/" class="link link-hover font-bold text-white underline decoration-sky-600 hover:decoration-2" target="_blank">UN Sustainable Development Goal 5: Achieve gender equality and empower all women and girls</a> for more context.
        </p>

        <div role="alert" class="alert">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="h-6 w-6 shrink-0 stroke-current">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>
            To manage costs and maintain the prototype as a free-to-use service, I've implemented a daily limit for BiaSight analysis. It resets automatically at midnight, ensuring a fresh start each day.
          </span>
        </div>

      </div>

      <div class="flex flex-row flex-wrap gap-4 justify-left items-center mb-5">
        <p class="mb-2 text-justify">
          This project was created as part of the <a href="https://womentechmakers.devpost.com/" class="link link-hover font-bold text-white underline decoration-sky-600 hover:decoration-2" target="_blank">She Builds AI Hackathon 2024</a>.
        </p>
      </div>

      <div class="flex flex-row flex-wrap gap-4 justify-left items-center mb-5">
          <h2 class="text-2xl gemini">Backend</h2>
          <p class="mb-2 text-justify">
            The BiaSight backend is a powerful engine built with FastAPI and Python. It leverages BeautifulSoup to extract readable content from web pages, preparing it for analysis. Using Jinja templating, prompt generation is modularized, allowing seamless integration of web content into advanced prompts for Google’s Gemini LLM.
          </p>

          <p class="mb-2 text-justify">
            To ensure both accurate and deterministic results, Gemini is configured to use JSON mode for structured output and a low-temperature setting is applied to minimize variability in its generation. Pydantic ensures robust data modeling and validation, while Poetry manages dependencies efficiently. Docker streamlines deployment, and Ruff, combined with GitHub Actions, maintains high code quality through automated testing and linting.
          </p>

          <p class="mb-2 text-justify">
            For optimal performance and user experience, the backend employs a TTLCache, reducing analysis time by caching recent results. This architecture fosters easy and secure extensibility, allowing for future enhancements and integrations as BiaSight continues to evolve.
          </p>
      </div>

      <div class="flex flex-row flex-wrap gap-4 justify-left items-center mb-20">
          <h2 class="text-2xl gemini">Frontend</h2>
          <p class="mb-2 text-justify">
            The frontend is powered by Vue 3 and Vite, supported by daisyUI and Tailwind CSS for efficient frontend development. Together, these tools provide users with a sleek and modern interface for seamless interaction with the backend.
          </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from "vue"
import HALO from 'vanta/dist/vanta.halo.min'
import * as THREE from 'three'

const showSystemOverview = ref(false)

const vantaRef = ref(null)
let vantaEffect

onMounted(() => {
  vantaEffect = HALO({
    el: vantaRef.value,
    THREE: THREE,
    size: 2
  })
})

onBeforeUnmount(() => {
  if (vantaEffect) {
    vantaEffect.destroy()
  }
})
</script>

<style scoped>
.vanta-bg {
  opacity: 0.2;
}
</style>
