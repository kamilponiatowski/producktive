<script setup lang="ts">
const { t, locale } = useI18n()

const isScrolled = ref(false)
const isMobileOpen = ref(false)

const navLinks = computed(() => [
  { href: '#o-mnie', label: t('nav.about') },
  { href: '#uslugi', label: t('nav.services') },
  { href: '#proces', label: t('nav.process') },
  { href: '#portfolio', label: t('nav.portfolio') },
  { href: '#siec', label: t('nav.community') },
])

const availableLocales = computed(() => {
  const all = [
    { code: 'pl', name: 'Polski' },
    { code: 'en', name: 'English' },
  ]
  return all.filter((l) => l.code !== locale.value)
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const scrollTo = (href: string) => {
  isMobileOpen.value = false
  const route = useRoute()
  const isHome = route.path === '/' || route.path === '' || route.path === '/en' || route.path === '/en/'

  if (href === '#') {
    if (isHome) {
      const scrollingToTop = useState<boolean>('scrollingToTop')
      scrollingToTop.value = true
      window.scrollTo({ top: 0, behavior: 'smooth' })
      history.replaceState(null, '', window.location.pathname)
      setTimeout(() => { scrollingToTop.value = false }, 1200)
    } else {
      navigateTo('/')
    }
    return
  }

  if (isHome) {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    history.replaceState(null, '', href)
  } else {
    navigateTo(`/${href}`)
  }
}

const switchLocale = (code: string) => {
  const currentHash = window.location.hash
  // Set i18n cookie so detectBrowserLanguage doesn't immediately redirect back
  document.cookie = `i18n_lang=${code}; path=/; max-age=63072000; SameSite=Lax`
  if (code === 'en') {
    window.location.href = '/en' + currentHash
  } else {
    window.location.href = '/' + currentHash
  }
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
    :class="
      isScrolled
        ? 'bg-brand-dark/80 backdrop-blur-xl border-b border-white/5 shadow-card'
        : 'bg-transparent'
    "
    role="banner"
  >
    <nav
      class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
      :aria-label="t('nav.services')"
    >
      <!-- Logo -->
      <a
        href="#"
        class="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark rounded-lg"
        :aria-label="t('a11y.logo')"
        @click.prevent="scrollTo('#')"
      >
        <img
          src="/assets/logo.svg"
          alt="Logo"
          class="w-8 h-8 rounded-lg"
          aria-hidden="true"
        />
        <span
          class="font-display font-bold text-lg text-white group-hover:text-gradient transition-all"
        >
          Producktive
        </span>
      </a>

      <!-- Desktop nav -->
      <div class="hidden md:flex items-center gap-1" role="navigation">
        <button
          v-for="link in navLinks"
          :key="link.href"
          class="btn-ghost focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark rounded-lg"
          @click="scrollTo(link.href)"
        >
          {{ link.label }}
        </button>
      </div>

      <div class="hidden md:flex items-center gap-3">
        <!-- Desktop CTA -->
        <button
          class="btn-primary text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
          @click="scrollTo('#kontakt')"
        >
          {{ t('nav.cta') }}
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>

        <!-- Language switcher -->
        <button
          v-for="loc in availableLocales"
          :key="loc.code"
          class="text-xs font-mono text-brand-muted hover:text-white transition-colors px-2 py-1 rounded border border-white/10 hover:border-brand-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          :aria-label="`${t('a11y.languageSwitch')}: ${loc.name}`"
          @click="switchLocale(loc.code)"
        >
          {{ loc.code.toUpperCase() }}
        </button>
      </div>

      <!-- Mobile hamburger -->
      <div class="md:hidden flex items-center gap-2">
        <!-- Mobile language -->
        <button
          v-for="loc in availableLocales"
          :key="loc.code"
          class="text-xs font-mono text-brand-muted hover:text-white px-2 py-1 rounded border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          :aria-label="`${t('a11y.languageSwitch')}: ${loc.name}`"
          @click="switchLocale(loc.code)"
        >
          {{ loc.code.toUpperCase() }}
        </button>

        <button
          class="p-2 text-brand-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg"
          :aria-label="isMobileOpen ? t('nav.closeMenu') : t('nav.openMenu')"
          :aria-expanded="isMobileOpen"
          @click="isMobileOpen = !isMobileOpen"
        >
          <div class="w-5 h-4 flex flex-col justify-between">
            <span
              class="block h-0.5 bg-current transition-all duration-300"
              :class="isMobileOpen ? 'rotate-45 translate-y-1.5' : ''"
            />
            <span
              class="block h-0.5 bg-current transition-all duration-300"
              :class="isMobileOpen ? 'opacity-0' : ''"
            />
            <span
              class="block h-0.5 bg-current transition-all duration-300"
              :class="isMobileOpen ? '-rotate-45 -translate-y-1.5' : ''"
            />
          </div>
        </button>
      </div>
    </nav>

    <!-- Mobile drawer -->
    <Transition name="slide-down">
      <div
        v-if="isMobileOpen"
        class="md:hidden bg-brand-card/95 backdrop-blur-xl border-b border-white/5"
        role="navigation"
      >
        <div class="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-2">
          <button
            v-for="link in navLinks"
            :key="link.href"
            class="text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            @click="scrollTo(link.href)"
          >
            {{ link.label }}
          </button>
          <button
            class="btn-primary mt-2 justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            @click="scrollTo('#kontakt')"
          >
            {{ t('nav.cta') }} →
          </button>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.25s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
