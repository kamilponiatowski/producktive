<script setup lang="ts">
// Lofi music player — uses SomaFM Secret Agent public stream (free, no auth required)
// Vibe: cocktail lounge jazz + bossa nova + spy beats — happy, upbeat, jazzy mood
// Users can dismiss. State persisted in localStorage.

const STREAM_URL = 'https://streams.ilovemusic.de/iloveradio17.mp3' // Chillhop Radio: spokojny lofi hiphop
const LS_DISMISSED = 'lofi-dismissed'
const LS_PLAYING = 'lofi-playing'

const playing = ref(false)
const visible = ref(true)
const audioRef = ref<HTMLAudioElement | null>(null)
const loading = ref(false)
const error = ref(false)
// pendingAutoplay: user had music on before reload but browser blocked autoplay
const pendingAutoplay = ref(false)

const tryPlay = async (fromAutoplay = false) => {
  if (!audioRef.value) return
  error.value = false
  loading.value = true
  try {
    audioRef.value.volume = 0.4 // soft background level — 40% so it doesn't startle
    audioRef.value.src = STREAM_URL
    await audioRef.value.play()
    playing.value = true
    pendingAutoplay.value = false
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LS_PLAYING, 'true')
    }
  } catch {
    playing.value = false
    if (fromAutoplay) {
      pendingAutoplay.value = true // show "click to resume" indicator
    } else {
      error.value = true
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  // Respect user's previous dismiss choice
  if (typeof localStorage !== 'undefined') {
    const dismissed = localStorage.getItem(LS_DISMISSED)
    if (dismissed === 'true') visible.value = false

    // Auto-play if user was previously listening
    const wasPlaying = localStorage.getItem(LS_PLAYING)
    if (wasPlaying === 'true' && visible.value) {
      nextTick(() => tryPlay(true))
    }
  }

  // Also auto-play when user accepts cookies (user gesture satisfies browser autoplay policy)
  const handleCookieAccept = () => {
    if (!visible.value || playing.value) return
    tryPlay(false)
  }

  window.addEventListener('cookie-consent-accepted', handleCookieAccept, { once: true })
  onUnmounted(() => window.removeEventListener('cookie-consent-accepted', handleCookieAccept))
})

const toggle = async () => {
  if (!audioRef.value) return
  error.value = false
  pendingAutoplay.value = false
  if (playing.value) {
    audioRef.value.pause()
    playing.value = false
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(LS_PLAYING)
    }
  } else {
    await tryPlay(false)
  }
}

const dismiss = () => {
  if (audioRef.value) {
    audioRef.value.pause()
  }
  playing.value = false
  pendingAutoplay.value = false
  visible.value = false
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(LS_DISMISSED, 'true')
    localStorage.removeItem(LS_PLAYING)
  }
}

const reopen = () => {
  visible.value = true
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(LS_DISMISSED)
  }
}

const onError = () => {
  error.value = true
  playing.value = false
  loading.value = false
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(LS_PLAYING)
  }
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
        <span v-else-if="pendingAutoplay" class="text-brand-accent animate-pulse-slow">▶ wznów</span>
        <span v-else>lofi</span>
      </button>
    </div>
  </Transition>

  <!-- Collapsed reopen button (visible when player is dismissed) -->
  <Transition name="lofi-peek">
    <button
      v-if="!visible"
      class="fixed bottom-32 right-0 z-40 flex items-center gap-1.5 pl-2 pr-1 py-1.5 rounded-l-xl bg-brand-card/80 border border-r-0 border-brand-primary/20 text-brand-primary hover:bg-brand-primary/10 hover:pr-3 transition-all duration-300 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary shadow-card group"
      aria-label="Pokaż odtwarzacz muzyki"
      @click="reopen"
    >
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M9 18V5l12-2v13"/>
        <circle cx="6" cy="18" r="3"/>
        <circle cx="18" cy="16" r="3"/>
      </svg>
      <span class="text-xs font-mono max-w-0 overflow-hidden group-hover:max-w-[60px] transition-all duration-300">lofi</span>
    </button>
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

.lofi-peek-enter-active,
.lofi-peek-leave-active {
  transition: all 0.3s ease;
}
.lofi-peek-enter-from,
.lofi-peek-leave-to {
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
