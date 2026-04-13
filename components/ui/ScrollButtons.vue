<script setup lang="ts">
// Scroll navigation buttons — show/hide based on scroll position
const showTop = ref(false)
const showBottom = ref(false)

const updateVisibility = () => {
  const scrollY = window.scrollY
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  showTop.value = scrollY > 300
  showBottom.value = scrollY < maxScroll - 300
}

onMounted(() => {
  updateVisibility()
  window.addEventListener('scroll', updateVisibility, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateVisibility)
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const scrollToBottom = () => {
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
}
</script>

<template>
  <div
    class="fixed bottom-4 right-4 z-40 flex flex-col gap-2"
    aria-label="Nawigacja przewijania"
    role="navigation"
  >
    <!-- Scroll to top -->
    <div class="w-10 h-10">
      <Transition name="scroll-btn">
        <button
          v-show="showTop"
          class="w-full h-full rounded-xl bg-brand-card/90 border border-brand-primary/30 text-brand-primary hover:bg-brand-primary/15 hover:border-brand-primary transition-all duration-200 backdrop-blur-sm flex items-center justify-center shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          aria-label="Przewiń do góry"
          @click="scrollToTop"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </button>
      </Transition>
    </div>

    <!-- Scroll to bottom -->
    <div class="w-10 h-10">
      <Transition name="scroll-btn">
        <button
          v-show="showBottom"
          class="w-full h-full rounded-xl bg-brand-card/90 border border-white/10 text-brand-muted hover:bg-white/5 hover:text-white hover:border-brand-primary/30 transition-all duration-200 backdrop-blur-sm flex items-center justify-center shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          aria-label="Przewiń do dołu"
          @click="scrollToBottom"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.scroll-btn-enter-active,
.scroll-btn-leave-active {
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.scroll-btn-enter-from,
.scroll-btn-leave-to {
  opacity: 0;
  transform: scale(0.7);
}
</style>
