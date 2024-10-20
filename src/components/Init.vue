<template>
  <div>
    <div ref="vantaRef" class="vanta-bg"></div>
    <div class="h-[calc(100vh-68px)]">
      <div class="flex flex-row flex-wrap justify-center gap-4 pt-10 pb-2">
        <div>
          <kinesis-container>
            <kinesis-element :strength="isMobile ? 0 : 5" type="depth">
              <div class="card max-w-xl bg-base-100 shadow-xl bg-opacity-75 hover:bg-opacity-85 hover:ring-4 transition-all">
                <figure><img src="../assets/biasight.jpg" alt="Stereotyping" /></figure>
                <div class="card-body">
                  <h2 class="card-title selection-card-title">BiaSight – Words Matter</h2>
                  <p class="text-left">Enter URL to analyze for gender equity and bias</p>

                  <label class="input input-bordered input-primary input-md w-full flex items-center gap-2">
                    <span class="badge badge-info">URL</span>
                    <input v-model="url" type="url" class="grow" placeholder="https://..." @keyup.enter="handleAnalyze" />
                  </label>

                  <Transition name="fade">
                    <div v-if="showError" class="my-2">
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

                  <div class="card-actions justify-center pt-2">
                    <button @click="handleAnalyze" class="btn btn-success btn-outline w-48">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                      </svg>

                      Analyze
                    </button>
                  </div>
                </div>
              </div>
            </kinesis-element>
          </kinesis-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue'
import HALO from 'vanta/dist/vanta.halo.min'
import * as THREE from 'three'
import {isMobile} from 'mobile-device-detect'
import {useRouter} from 'vue-router'

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
    const url = new URL(string)
    if (url.protocol === 'http:' || url.protocol === 'https:') {
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

<style scoped>
.vanta-bg {
  opacity: 0.4;
}
</style>
