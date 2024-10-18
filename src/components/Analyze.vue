<template>
  <div>
    <div ref="vantaRef" class="vanta-bg"></div>
    <div class="h-[calc(100vh-68px)]">
      <div v-if="loading" class="text-center">
        <span class="loading loading-spinner loading-lg"></span>
      </div>
      <div v-else-if="error" class="flex flex-row flex-wrap justify-center gap-4 pt-10 pb-4">
        <div role="alert" class="alert alert-warning w-3/4">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Warning! Analyzing page failed: {{ error }}</span>
          <div>
            <button class="btn btn-neutral" @click="goBack">Go back</button>
          </div>
        </div>
      </div>
      <div v-else-if="result" class="pb-20">
        <div class="flex flex-row flex-wrap justify-center gap-4 pt-10 pb-4">
          <div class="mockup-browser bg-base-300 bg-opacity-80 backdrop-blur w-2/3">
            <div class="mockup-browser-toolbar">
              <div class="input">{{ decodeURIComponent(uri) }}</div>
            </div>
            <div class="flex justify-center px-4 py-5 text-justify">
              <div>
                <h2 class="card-title selection-card-title">Summary</h2>
                {{ result.summary }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex w-full flex-col">
          <div class="divider divider-accent">Score</div>
        </div>

        <div class="flex flex-row flex-wrap justify-center gap-4 pt-2 pb-2">
          <div>
            <kinesis-container>
              <kinesis-element :strength="isMobile ? 0 : 20" type="depth">
                <div :class="['card w-72 bg-base-100 shadow-xl bg-opacity-75 hover:bg-opacity-85 hover:ring-4 transition-all', getHoverClass('stereotyping')]" @mouseenter="play" @mouseleave="stop">
                  <figure><img src="../assets/stereotyping.jpg" alt="Stereotyping" /></figure>
                  <div class="card-body">
                    <h2 class="card-title selection-card-title">Stereotyping</h2>
                    <p class="text-left">Does the text reinforce or challenge gender stereotypes?</p>
                    <div class="card-actions justify-center">
                      <span :class="['badge badge-lg', getBadgeClass(result.stereotyping_score)]">{{ result.stereotyping_score }} / 100</span>
                    </div>
                  </div>
                </div>
              </kinesis-element>
            </kinesis-container>
          </div>
          <div>
            <kinesis-container>
              <kinesis-element :strength="isMobile ? 0 : 20" type="depth">
                <div :class="['card w-72 bg-base-100 shadow-xl bg-opacity-75 hover:bg-opacity-85 hover:ring-4 transition-all', getHoverClass('representation')]" @mouseenter="play" @mouseleave="stop">
                  <figure><img src="../assets/representation.jpg" alt="Representation" /></figure>
                  <div class="card-body">
                    <h2 class="card-title selection-card-title">Representation</h2>
                    <p class="text-left">Are different genders equally and fairly represented?</p>
                    <div class="card-actions justify-center">
                      <span :class="['badge badge-lg', getBadgeClass(result.representation_score)]">{{ result.representation_score }} / 100</span>
                    </div>
                  </div>
                </div>
              </kinesis-element>
            </kinesis-container>
          </div>
          <div>
            <kinesis-container>
              <kinesis-element :strength="isMobile ? 0 : 20" type="depth">
                <div :class="['card w-72 bg-base-100 shadow-xl bg-opacity-75 hover:bg-opacity-85 hover:ring-4 transition-all', getHoverClass('language')]" @mouseenter="play" @mouseleave="stop">
                  <figure><img src="../assets/language.jpg" alt="Language" /></figure>
                  <div class="card-body">
                    <h2 class="card-title selection-card-title">Language</h2>
                    <p class="text-left">Is the language used gender-neutral and inclusive?</p>
                    <div class="card-actions justify-center">
                      <span :class="['badge badge-lg', getBadgeClass(result.language_score)]">{{ result.language_score }} / 100</span>
                    </div>
                  </div>
                </div>
              </kinesis-element>
            </kinesis-container>
          </div>
          <div>
            <kinesis-container>
              <kinesis-element :strength="isMobile ? 0 : 20" type="depth">
                <div :class="['card w-72 bg-base-100 shadow-xl bg-opacity-75 hover:bg-opacity-85 hover:ring-4 transition-all', getHoverClass('framing')]" @mouseenter="play" @mouseleave="stop">
                  <figure><img src="../assets/framing.jpg" alt="Framing" /></figure>
                  <div class="card-body">
                    <h2 class="card-title selection-card-title">Framing</h2>
                    <p class="text-left">How are gender-related issues presented and contextualized?</p>
                    <div class="card-actions justify-center">
                      <span :class="['badge badge-lg', getBadgeClass(result.framing_score)]">{{ result.framing_score }} / 100</span>
                    </div>
                  </div>
                </div>
              </kinesis-element>
            </kinesis-container>
          </div>
        </div>

        <div class="flex flex-row justify-center pt-2 pb-2">
          <div class="stats bg-opacity-70 backdrop-blur shadow z-50">

            <div class="stat">
              <div class="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.375 21.025q-.9-.025-1.713-.462t-1.537-1.288q-1-1.2-1.562-2.862T2 13q0-2.075.788-3.9t2.137-3.175T8.1 3.788T12 3t3.9.8t3.175 2.175T21.213 9.2T22 13.175q0 1.925-.625 3.6T19.6 19.6q-.7.7-1.475 1.063t-1.575.362q-.45 0-.9-.112t-.9-.338l-1.4-.7q-.3-.15-.638-.225T12 19.575t-.712.075t-.638.225l-1.4.7q-.475.25-.937.363t-.938.087M12 15q.825 0 1.413-.587T14 13q0-.2-.038-.4t-.112-.4l1.25-1.675q.25.325.438.687t.312.788h2.05q-.375-2.2-2.037-3.6T12 7T8.125 8.413T6.1 12h2.05q.35-1.35 1.425-2.175T12 9q.425 0 .8.075t.725.225l-1.275 1.725q-.05 0-.125-.013T12 11q-.825 0-1.412.588T10 13t.588 1.413T12 15"/></svg>
              </div>
              <div class="stat-title">Overall score</div>
              <div class="stat-value">{{ result.overall_score }} / 100</div>
            </div>

          </div>
        </div>

        <div class="flex w-full flex-col">
          <div class="divider divider-info">Details</div>
        </div>

        <div class="flex flex-row flex-wrap justify-center gap-4 pt-2 pb-2">
          <div role="tablist" class="tabs tabs-boxed w-full lg:w-2/3">
            <input type="radio" name="details_tabs" role="tab" class="tab" aria-label="Stereotyping" checked="checked" />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
              <div class="pb-5">
                <h2 class="card-title selection-card-title">Feedback</h2>
                {{ result.stereotyping_feedback }}
              </div>
              <div>
                <h2 class="card-title selection-card-title">Example</h2>
                {{ result.stereotyping_example }}
              </div>
            </div>

            <input type="radio" name="details_tabs" role="tab" class="tab" aria-label="Representation" />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
              <div class="pb-5">
                <h2 class="card-title selection-card-title">Feedback</h2>
                {{ result.representation_feedback }}
              </div>
              <div>
                <h2 class="card-title selection-card-title">Example</h2>
                {{ result.representation_example }}
              </div>
            </div>

            <input type="radio" name="details_tabs" role="tab" class="tab" aria-label="Language" />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
              <div class="pb-5">
                <h2 class="card-title selection-card-title">Feedback</h2>
                {{ result.language_feedback }}
              </div>
              <div>
                <h2 class="card-title selection-card-title">Example</h2>
                {{ result.language_example }}
              </div>
            </div>

            <input type="radio" name="details_tabs" role="tab" class="tab" aria-label="Framing" />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
              <div class="pb-5">
                <h2 class="card-title selection-card-title">Feedback</h2>
                {{ result.framing_feedback }}
              </div>
              <div>
                <h2 class="card-title selection-card-title">Example</h2>
                {{ result.framing_example }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex w-full flex-col">
          <div class="divider divider-success">Improvements</div>
        </div>

        <div class="flex flex-row flex-wrap justify-center gap-4 pt-2 pb-4">
          <div class="mockup-browser bg-base-300 bg-opacity-80 backdrop-blur w-2/3">
            <div class="mockup-browser-toolbar">
            </div>
            <div class="flex justify-center px-4 py-5 text-justify">
              <div>
                <h2 class="card-title selection-card-title">Suggestions</h2>
                {{ result.improvement_suggestions }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex w-full flex-col">
          <div class="divider divider-secondary">Stats</div>
        </div>

        <div class="flex flex-row justify-center pt-2 pb-2">
          <div class="stats stats-vertical lg:stats-horizontal bg-opacity-70 backdrop-blur shadow z-50">

            <div class="stat">
              <div class="stat-title">Representation ratio</div>
              <div class="stat-value">{{ result.male_to_female_mention_ratio }}</div>
              <div class="stat-desc">Ratio of male to female mentions in the text</div>
            </div>

            <div class="stat">
              <div class="stat-title">Gender neutral percentage</div>
              <div class="stat-value">{{ result.gender_neutral_language_percentage }}</div>
              <div class="stat-desc">Percentage of gender-neutral language used</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from "vue"
import HALO from 'vanta/dist/vanta.halo.min'
import * as THREE from 'three'
import selectionSfx from '../assets/selection.mp3'
import {API_BASE_URI} from "../config.js";
import {isMobile} from "mobile-device-detect";
import {useRouter} from "vue-router";
import {useSound} from "@vueuse/sound";

const router = useRouter();

const props = defineProps({
  uri: String
})

const { play, stop } = useSound(selectionSfx)

const vantaRef = ref(null)
let vantaEffect

const loading = ref(true)
const error = ref(null)
const result = ref(null)

async function getHeaders() {
  return {
    'Content-Type': 'application/json'
  }
}

async function getRequestOptions(method, body) {
  return {
    method,
    headers: await getHeaders(),
    body: JSON.stringify(body),
    redirect: 'follow'
  }
}

async function handleResponse(response) {
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText)
  }

  return response.json()
}

async function analyze(uri) {
  const analyzeEndpoint = `${API_BASE_URI}/analyze`
  const requestBody = { uri: uri }

  try {
    const response = await fetch(analyzeEndpoint, await getRequestOptions('POST', requestBody))
    const analyzeResponse = await handleResponse(response)

    return {
      result: analyzeResponse.result,
      error: null
    }
  } catch (err) {
    return {
      result: null,
      error: err.message
    }
  }
}

function goBack() {
  router.push({ name: 'Init' });
}

function getBadgeClass(score) {
  if (score <= 49) return 'badge-error'
  if (score >= 50 && score <= 69) return 'badge-warning'
  return 'badge-success'
}

function getHoverClass(mode) {
  switch (mode) {
    case 'stereotyping': return 'hover:ring-primary'
    case 'representation': return 'hover:ring-accent'
    case 'language': return 'hover:ring-orange-600'
    case 'framing': return 'hover:ring-yellow-300'
    default: return 'hover:ring-primary'
  }
}

onMounted(async () => {
  vantaEffect = HALO({
    el: vantaRef.value,
    THREE: THREE,
    size: 2
  })

  if (props.uri) {
    const decodedUri = decodeURIComponent(props.uri)
    const { result: analysisResult, error: analysisError } = await analyze(decodedUri)

    if (analysisError) {
      error.value = analysisError
    } else {
      result.value = analysisResult
    }
  } else {
    error.value = "No URI provided for analysis."
  }

  loading.value = false
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
