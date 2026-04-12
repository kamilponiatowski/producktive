<script setup lang="ts">
// Lofi music player — uses SomaFM Secret Agent public stream (free, no auth required)
// Vibe: cocktail lounge jazz + bossa nova + spy beats — happy, upbeat, jazzy mood
// Users can dismiss. State persisted in localStorage.

const STREAM_URL = 'https://streams.ilovemusic.de/iloveradio17.mp3' // Chillhop Radio: spokojny lofi hiphop

const playing = ref(false)
const visible = ref(true)
const audioRef = ref<HTMLAudioElement | null>(null)
const loading = ref(false)
const error = ref(false)

onMounted(() => {
  // Respect user's previous dismiss choice
  if (typeof localStorage !== 'undefined') {
    const dismissed = localStorage.getItem('lofi-dismissed')
    if (dismissed === 'true') visible.value = false
  }
})

const toggle = async () => {
  if (!audioRef.value) return
  error.value = false
  if (playing.value) {
    audioRef.value.pause()
    playing.value = false
  } else {
    loading.value = true
    try {
      audioRef.value.src = STREAM_URL
      await audioRef.value.play()
      playing.value = true
    } catch {
      error.value = true
    } finally {
      loading.value = false
    }
  }
}

const dismiss = () => {
  if (audioRef.value) {
    audioRef.value.pause()
  }
  playing.value = false
  visible.value = false
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('lofi-dismissed', 'true')
  }
}

const onError = () => {
  error.value = true
  playing.value = false
  loading.value = false
}
</script>

<template>
  <Transition name="lofi-slide">
    <div
      v-if="visible"
      class="fixed bottom-32 right-4 z-40 flex items-center gap-2"
      role="complementary"
      aria-label="Odtwarzacz muzyki lofi"
    >
      <!-- Audio element (hidden) -->
      <audio
        ref="audioRef"
        preload="none"
        @error="onError"
        aria-hidden="true"
      />

      <!-- Dismiss button -->
      <button
        class="w-7 h-7 rounded-full bg-brand-card/80 border border-white/10 flex items-center justify-center text-brand-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary backdrop-blur-sm"
        :aria-label="'Zamknij odtwarzacz'"
        @click="dismiss"
      >
        <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      <!-- Play/pause button -->
      <button
        class="flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-card/90 border border-brand-primary/30 text-brand-primary hover:bg-brand-primary/10 transition-all duration-200 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary text-xs font-mono shadow-card"
        :aria-label="playing ? 'Zatrzymaj muzykę lofi' : 'Odtwórz muzykę lofi'"
        :aria-pressed="playing"
        @click="toggle"
      >
        <!-- Loading spinner -->
        <svg v-if="loading" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>

        <!-- Play icon -->
        <svg v-else-if="!playing" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <polygon points="10 8 16 12 10 16 10 8"/>
        </svg>

        <!-- Pause icon (with animated bars when playing) -->
        <span v-else class="flex items-end gap-0.5 h-4" aria-hidden="true">
          <span class="w-0.5 bg-brand-primary rounded-full animate-lofi-bar1" style="height:60%"/>
          <span class="w-0.5 bg-brand-primary rounded-full animate-lofi-bar2" style="height:100%"/>
          <span class="w-0.5 bg-brand-primary rounded-full animate-lofi-bar3" style="height:40%"/>
          <span class="w-0.5 bg-brand-primary rounded-full animate-lofi-bar2" style="height:80%"/>
        </span>

        <span v-if="error" class="text-red-400">Brak połączenia</span>
        <span v-else>lofi</span>
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.lofi-slide-enter-active,
.lofi-slide-leave-active {
  transition: all 0.3s ease;
}
.lofi-slide-enter-from,
.lofi-slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

@keyframes lofiBar1 {
  0%, 100% { height: 30%; }
  50% { height: 80%; }
}
@keyframes lofiBar2 {
  0%, 100% { height: 100%; }
  50% { height: 40%; }
}
@keyframes lofiBar3 {
  0%, 100% { height: 50%; }
  33% { height: 90%; }
  66% { height: 20%; }
}

.animate-lofi-bar1 { animation: lofiBar1 0.9s ease-in-out infinite; }
.animate-lofi-bar2 { animation: lofiBar2 0.7s ease-in-out infinite; }
.animate-lofi-bar3 { animation: lofiBar3 1.1s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .animate-lofi-bar1,
  .animate-lofi-bar2,
  .animate-lofi-bar3 {
    animation: none;
    height: 60%;
  }
}
</style>
