<template>
  <div>
    <div ref="vantaRef" class="vanta-bg"></div>
    <div class="hero h-[calc(100vh-68px)]">
      <div class="hero-overlay bg-none"></div>
      <div class="hero-content text-center text-neutral-content">
        <kinesis-container>
          <kinesis-element :strength="isMobile ? 0 : 30">
            <div class="max-w-screen-md bg-neutral-900 bg-opacity-50 p-5 rounded-2xl">
              <kinesis-element :strength="isMobile ? 0 : 20">
                <div class="divider text-lg uppercase home-title opacity-70 hover:opacity-100 transition-all">Welcome to</div>
                <h1 class="mb-5 text-5xl font-bold home-title"><span class="gemini">Gemini</span> BiaSight</h1>
              </kinesis-element>
              <kinesis-element :strength="isMobile ? 0 : 10">
                <p class="mb-2"><span class="badge badge-success badge-outline">WORDS MATTER</span> – Make your language more inclusive.</p>
                <p class="mb-5">BiaSight analyzes websites for gender bias, providing feedback and suggestions using <span class="badge badge-warning badge-outline tooltip tooltip-bottom" data-tip="Using Google Gemini">AI</span>.</p>
                <div class="flex flex-wrap gap-4 items-center justify-center">
                  <div>
                    <router-link to="/init" tag="button" class="btn btn-success btn-outline w-48">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                      </svg>

                      Get started
                    </router-link>
                  </div>
                  <div>
                    <router-link to="/about" tag="button" class="btn btn-primary btn-outline w-48">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                      </svg>

                      Learn More
                    </router-link>
                  </div>
                </div>
              </kinesis-element>
            </div>
          </kinesis-element>
        </kinesis-container>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue'
import BIRDS from 'vanta/dist/vanta.birds.min.js'
import * as THREE from 'three'
import {isMobile} from 'mobile-device-detect'

const vantaRef = ref(null)
let vantaEffect

onMounted(() => {
  vantaEffect = BIRDS({
    el: vantaRef.value,
    THREE: THREE,
    color1: 0x59ff,
    color2: 0xd200ff
  })
})

onBeforeUnmount(() => {
  if (vantaEffect) {
    vantaEffect.destroy()
  }
})
</script>
