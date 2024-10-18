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
                    <router-link to="/init" tag="button" class="btn btn-primary btn-outline w-48">
                      Get started
                    </router-link>
                  </div>
                  <div>
                    <router-link to="/init" tag="button" class="btn btn-success btn-outline w-48">
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
import GLOBE from 'vanta/dist/vanta.globe.min.js'
import * as THREE from 'three'
import {isMobile} from 'mobile-device-detect'

const vantaRef = ref(null)
let vantaEffect

onMounted(() => {
  vantaEffect = GLOBE({
    el: vantaRef.value,
    THREE: THREE,
    color: 0x3697dc,
    backgroundColor: 0xf0f0f
  })
})

onBeforeUnmount(() => {
  if (vantaEffect) {
    vantaEffect.destroy()
  }
})
</script>
