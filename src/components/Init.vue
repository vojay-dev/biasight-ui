<template>
  <div>
    <div ref="vantaRef" class="vanta-bg"></div>
    <div class="hero h-[calc(100vh-68px)]">
      <div class="hero-overlay bg-none"></div>
      <div class="hero-content text-center text-neutral-content">
        <kinesis-container>
          <kinesis-element :strength="isMobile ? 0 : 10">
            <div class="max-w-screen-md bg-neutral-900 bg-opacity-50 p-5 rounded-2xl">
              <kinesis-element :strength="isMobile ? 0 : 5">
                <p class="mb-2">Enter URL to analyze</p>
                <p class="mb-5">
                  <label class="input input-bordered input-primary input-md w-96 max-w-lg flex items-center gap-2">
                    <span class="badge badge-info">URL</span>
                    <input v-model="url" type="url" class="grow" placeholder="https://..." @keyup.enter="handleAnalyze" />
                  </label>
                </p>
                <Transition name="fade">
                  <div v-if="showError" class="my-5">
                    <div role="alert" class="alert alert-error">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-6 w-6 shrink-0 stroke-current"
                          fill="none"
                          viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Please enter a valid URL.</span>
                    </div>
                  </div>
                </Transition>
                <div class="flex flex-wrap gap-4 items-center justify-center">
                  <div>
                    <button @click="handleAnalyze" class="btn btn-primary btn-outline w-48">
                      Analyze
                    </button>
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
import {onBeforeUnmount, onMounted, ref} from "vue"
import HALO from 'vanta/dist/vanta.halo.min'
import * as THREE from 'three'
import {isMobile} from "mobile-device-detect"
import {useRouter} from "vue-router"

const vantaRef = ref(null)
let vantaEffect

const router = useRouter()
const url = ref('')
const showError = ref(false)

function validate(string) {
  // prepend https:// if protocol is missing
  if (!/^https?:\/\//i.test(string)) {
    string = 'https://' + string;
  }

  try {
    const url = new URL(string);
    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.href
    }
  } catch (_) {
  }

  return null
}

function handleAnalyze() {
  const validUrl = validate(url.value)
  if (validUrl) {
    showError.value = false
    router.push({
      name: 'Analyze',
      params: { uri: encodeURIComponent(validUrl) }
    })
  } else {
    showError.value = true
  }
}

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
