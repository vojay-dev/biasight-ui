<template>
  <div>
    <div ref="vantaRef" class="vanta-bg"></div>
    <div class="h-[calc(100vh-68px)]">
      <div v-if="loading" class="text-center">
        <LoadingAnimation loadingText="Loading" />
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
            <div class="flex justify-left px-4 py-5 text-justify">
              <div>
                <h2 class="card-title selection-card-title">Summary</h2>
                <p>{{ result.summary }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex w-full flex-col">
          <div class="divider divider-accent">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-14">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
            Score
          </div>
        </div>

        <div class="flex flex-row flex-wrap justify-center gap-4 pt-2 pb-2">
          <div>
            <kinesis-container>
              <kinesis-element :strength="isMobile ? 0 : 20" type="depth">
                <div :class="['card w-72 bg-base-100 shadow-xl bg-opacity-75 hover:bg-opacity-85 hover:ring-4 transition-all', getHoverClass('stereotyping')]" @mouseenter="play" @mouseleave="stop">
                  <figure><img src="../assets/stereotyping.jpg" alt="Stereotyping" /></figure>
                  <div class="card-body">
                    <h2 class="card-title selection-card-title">Stereotyping</h2>
                    <p class="text-left">Does the content reinforce or challenge gender stereotypes?</p>
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
              <div :class="['stat-figure', getScoreClass(result.overall_score)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.375 21.025q-.9-.025-1.713-.462t-1.537-1.288q-1-1.2-1.562-2.862T2 13q0-2.075.788-3.9t2.137-3.175T8.1 3.788T12 3t3.9.8t3.175 2.175T21.213 9.2T22 13.175q0 1.925-.625 3.6T19.6 19.6q-.7.7-1.475 1.063t-1.575.362q-.45 0-.9-.112t-.9-.338l-1.4-.7q-.3-.15-.638-.225T12 19.575t-.712.075t-.638.225l-1.4.7q-.475.25-.937.363t-.938.087M12 15q.825 0 1.413-.587T14 13q0-.2-.038-.4t-.112-.4l1.25-1.675q.25.325.438.687t.312.788h2.05q-.375-2.2-2.037-3.6T12 7T8.125 8.413T6.1 12h2.05q.35-1.35 1.425-2.175T12 9q.425 0 .8.075t.725.225l-1.275 1.725q-.05 0-.125-.013T12 11q-.825 0-1.412.588T10 13t.588 1.413T12 15"/></svg>
              </div>
              <div class="stat-title">Overall score</div>
              <div class="stat-value">{{ result.overall_score }} / 100</div>
            </div>

          </div>
        </div>

        <div class="flex w-full flex-col">
          <div class="divider divider-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-14">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
            Details
          </div>
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
          <div class="divider divider-success">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-14">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            Positive Aspects / Improvements
          </div>
        </div>

        <div class="flex flex-row flex-wrap justify-center gap-4 pt-2 pb-4">
          <div class="mockup-browser bg-base-300 bg-opacity-80 backdrop-blur w-2/3">
            <div class="mockup-browser-toolbar">
            </div>
            <div class="flex justify-left px-4 py-5 text-justify">
              <div>
                <h2 class="card-title text-green-300">Positive Aspects</h2>
                {{ result.positive_aspects }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-row flex-wrap justify-center gap-4 pt-2 pb-4">
          <div class="mockup-browser bg-base-300 bg-opacity-80 backdrop-blur w-2/3">
            <div class="mockup-browser-toolbar">
            </div>
            <div class="flex justify-left px-4 py-5 text-justify">
              <div>
                <h2 class="card-title selection-card-title">Suggestions</h2>
                {{ result.improvement_suggestions }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex w-full flex-col">
          <div class="divider divider-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-14">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
            Stats
          </div>
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

        <div class="flex w-full flex-col">
          <div class="divider divider-warning">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-14">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
            </svg>

            Actions
          </div>
        </div>

        <div class="flex flex-row justify-center pt-2 pb-2">
          <div>
            <router-link to="/" tag="button" class="btn btn-primary btn-outline w-48">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
              </svg>

              Start again
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {inject, onBeforeUnmount, onMounted, ref} from 'vue'
import HALO from 'vanta/dist/vanta.halo.min'
import * as THREE from 'three'
import selectionSfx from '../assets/selection.mp3'
import {isMobile} from 'mobile-device-detect'
import {useRouter} from 'vue-router'
import {useSound} from '@vueuse/sound'
import LoadingAnimation from './LoadingAnimation.vue'
import {analyze} from '../client.js'

const router = useRouter()
const emitter = inject('emitter')

const props = defineProps({
  uri: String
})

const { play, stop } = useSound(selectionSfx)

const vantaRef = ref(null)
let vantaEffect

const loading = ref(true)
const error = ref(null)
const result = ref(null)

function goBack() {
  router.push({ name: 'Init' })
}

function getScoreClass(score) {
  if (score <= 49) return 'text-error'
  if (score >= 50 && score <= 69) return 'text-warning'
  return 'text-success'
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

    emitter.emit('update-usage', {})
  } else {
    error.value = 'No URI provided for analysis.'
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
