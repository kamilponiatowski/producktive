<script setup lang="ts">
const { t } = useI18n()
const year = new Date().getFullYear()

const links = computed(() => [
  { label: t('nav.services'), href: '#uslugi' },
  { label: t('nav.portfolio'), href: '#portfolio' },
  { label: t('nav.about'), href: '#o-mnie' },
  { label: t('contact.badge'), href: '#kontakt' },
])

const legal = computed(() => [
  { label: t('footer.privacy'), href: '/privacy' },
  { label: t('footer.terms'), href: '/terms' },
])
</script>

<template>
  <footer class="border-t border-white/5 bg-brand-card/30" role="contentinfo">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid sm:grid-cols-3 gap-8 mb-8">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2 mb-3">
            <div
              class="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center font-bold text-white text-sm font-mono"
              aria-hidden="true"
            >
              P
            </div>
            <span class="font-display font-bold text-white">Producktive</span>
          </div>
          <p class="text-brand-muted text-sm leading-relaxed">
            {{ t('footer.desc') }}
          </p>
          <p class="text-brand-muted/60 text-xs mt-3 flex items-center gap-1">
            📍 {{ t('footer.location') }}
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
              class="block text-brand-muted hover:text-white transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
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
              href="https://linkedin.com/in/producktive"
              target="_blank"
              rel="noopener noreferrer"
              class="block hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
            >
              LinkedIn
              <span class="sr-only">({{ t('a11y.externalLink') }})</span>
            </a>
            <a
              href="https://github.com/producktive"
              target="_blank"
              rel="noopener noreferrer"
              class="block hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
            >
              GitHub
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
          <a
            v-for="l in legal"
            :key="l.href"
            :href="l.href"
            class="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
          >
            {{ l.label }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
