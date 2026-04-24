<script setup lang="ts">
const { t } = useI18n()
const year = new Date().getFullYear()
const route = useRoute()

const links = computed(() => [
  { label: t('nav.about'), href: '#o-mnie' },
  { label: t('nav.services'), href: '#uslugi' },
  { label: t('nav.process'), href: '#proces' },
  { label: t('nav.portfolio'), href: '#portfolio' },
  { label: t('nav.community'), href: '#siec' },
  { label: t('contact.badge'), href: '#kontakt' },
])

const legal = computed(() => [
  { label: t('footer.privacy'), href: '/polityka-prywatnosci' },
  { label: t('footer.cookies'), href: '/polityka-cookies' },
])

const navigateToSection = (href: string) => {
  const isHome = route.path === '/' || route.path === ''
  if (isHome) {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  } else {
    navigateTo(`/${href}`)
  }
}
</script>

<template>
  <footer class="border-t border-white/5 bg-brand-card/30" role="contentinfo">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid sm:grid-cols-3 gap-8 mb-8">
        <!-- Brand -->
        <div>
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-2 mb-3 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
          >
            <img src="~/assets/logo.svg" alt="Producktive" class="w-8 h-8" />
            <span class="font-display font-bold text-white">Producktive</span>
          </NuxtLink>
          <p class="text-brand-muted text-sm leading-relaxed">
            {{ t('footer.desc') }}
          </p>
          <p class="text-brand-muted/60 text-xs mt-3 flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 text-brand-primary/60 shrink-0" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {{ t('footer.location') }}
          </p>
        </div>

        <!-- Navigation -->
        <div>
          <div class="text-white/50 text-xs font-mono uppercase tracking-wider mb-3">
            {{ t('footer.navTitle') }}
          </div>
          <div class="space-y-2">
            <a
              v-for="link in links"
              :key="link.href"
              :href="link.href"
              class="block text-brand-muted hover:text-white transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded cursor-pointer"
              @click.prevent="navigateToSection(link.href)"
            >
              {{ link.label }}
            </a>
          </div>
        </div>

        <!-- Contact -->
        <div>
          <div class="text-white/50 text-xs font-mono uppercase tracking-wider mb-3">
            {{ t('footer.contactTitle') }}
          </div>
          <div class="space-y-2 text-sm text-brand-muted">
            <a
              href="mailto:kontakt@producktive.pl"
              class="block hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
            >
              kontakt@producktive.pl
            </a>
            <a
              href="tel:+48886127854"
              class="block hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
            >
              +48 886 127 854
            </a>
            <a
              href="https://www.linkedin.com/in/kamil-poniatowski-rev/"
              target="_blank"
              rel="noopener noreferrer"
              class="block hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
            >
              LinkedIn
              <span class="sr-only">({{ t('a11y.externalLink') }})</span>
            </a>
          </div>
        </div>
      </div>

      <div class="divider-gradient" />

      <div
        class="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-brand-muted"
      >
        <span>{{ t('footer.copyright', { year }) }}</span>
        <div class="flex gap-4">
          <NuxtLink
            v-for="l in legal"
            :key="l.href"
            :to="l.href"
            class="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
          >
            {{ l.label }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
