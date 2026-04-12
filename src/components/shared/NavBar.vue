<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMobileOpen = ref(false)

const navLinks = [
  { href: '#uslugi',    label: 'Usługi' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#o-mnie',   label: 'O mnie' },
  { href: '#proces',   label: 'Proces' },
]

const handleScroll = () => { isScrolled.value = window.scrollY > 40 }
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const scrollTo = (href: string) => {
  isMobileOpen.value = false
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
    :class="isScrolled
      ? 'bg-brand-dark/80 backdrop-blur-xl border-b border-white/5 shadow-card'
      : 'bg-transparent'"
  >
    <nav class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- Logo -->
      <a href="#" class="flex items-center gap-2 group" @click.prevent="scrollTo('#')">
        <div class="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center font-bold text-white text-sm font-mono">P</div>
        <span class="font-display font-bold text-lg text-white group-hover:text-gradient transition-all">Producktive</span>
      </a>

      <!-- Desktop nav -->
      <div class="hidden md:flex items-center gap-1">
        <button
          v-for="link in navLinks"
          :key="link.href"
          class="btn-ghost"
          @click="scrollTo(link.href)"
        >{{ link.label }}</button>
      </div>

      <!-- Desktop CTA -->
      <button
        class="hidden md:flex btn-primary text-sm"
        @click="scrollTo('#kontakt')"
      >
        Porozmawiajmy
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </button>

      <!-- Mobile hamburger -->
      <button
        class="md:hidden p-2 text-brand-muted hover:text-white transition-colors"
        @click="isMobileOpen = !isMobileOpen"
        aria-label="Menu"
      >
        <div class="w-5 h-4 flex flex-col justify-between">
          <span class="block h-0.5 bg-current transition-all duration-300" :class="isMobileOpen ? 'rotate-45 translate-y-1.5' : ''" />
          <span class="block h-0.5 bg-current transition-all duration-300" :class="isMobileOpen ? 'opacity-0' : ''" />
          <span class="block h-0.5 bg-current transition-all duration-300" :class="isMobileOpen ? '-rotate-45 -translate-y-1.5' : ''" />
        </div>
      </button>
    </nav>

    <!-- Mobile drawer -->
    <Transition name="slide-down">
      <div v-if="isMobileOpen" class="md:hidden bg-brand-card/95 backdrop-blur-xl border-b border-white/5">
        <div class="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-2">
          <button
            v-for="link in navLinks"
            :key="link.href"
            class="text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
            @click="scrollTo(link.href)"
          >{{ link.label }}</button>
          <button class="btn-primary mt-2 justify-center" @click="scrollTo('#kontakt')">
            Porozmawiajmy →
          </button>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.25s ease; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
