<script setup lang="ts">
const { t } = useI18n()

// SVG paths for each service icon (cyan/stroke-based)
const serviceIcons: Record<string, string> = {
  website: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"/></svg>`,
  landing: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
  blog: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  shop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>`,
  saas: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  design: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7"><circle cx="13.5" cy="6.5" r="3.5"/><circle cx="17.5" cy="13.5" r="3.5"/><circle cx="8.5" cy="14.5" r="3.5"/><circle cx="6.5" cy="7.5" r="3.5"/></svg>`,
}

const services = computed(() => [
  {
    key: 'website',
    tags: ['Vue 3', 'TailwindCSS', 'Vercel'],
    highlight: false,
    comingSoon: false,
  },
  {
    key: 'landing',
    tags: ['A/B testing', 'Analytics', 'Fast'],
    highlight: true,
    comingSoon: false,
  },
  {
    key: 'blog',
    tags: ['SEO', 'CMS', 'Markdown'],
    highlight: false,
    comingSoon: false,
  },
  {
    key: 'shop',
    tags: ['Headless', 'Stripe', 'Nuxt 4'],
    highlight: false,
    comingSoon: true,
  },
  {
    key: 'saas',
    tags: ['Vue 3', 'Supabase', 'Auth'],
    highlight: false,
    comingSoon: true,
  },
  {
    key: 'design',
    tags: ['Figma', 'Prototyp', 'Design System'],
    highlight: false,
    comingSoon: false,
    collaborator: true,
  },
])
</script>

<template>
  <section id="uslugi" class="py-24 relative" aria-labelledby="services-heading">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16 reveal">
        <span class="badge mb-4">{{ t('services.badge') }}</span>
        <h2 id="services-heading" class="section-title mb-4">
          {{ t('services.title') }}
          <span class="text-gradient">{{ t('services.titleHighlight') }}</span>
        </h2>
        <p class="section-subtitle mx-auto">
          {{ t('services.subtitle') }}
        </p>
      </div>

      <!-- Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="(service, i) in services"
          :key="service.key"
          class="card p-6 flex flex-col gap-4 reveal relative group"
          :class="[
            service.highlight ? 'border-brand-primary/50 shadow-brand' : '',
            service.comingSoon ? 'opacity-70' : '',
          ]"
          :style="{ transitionDelay: `${i * 80}ms` }"
        >
          <!-- Popular / Coming soon badge -->
          <div
            v-if="service.highlight"
            class="absolute -top-3 left-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono
                   backdrop-blur-md bg-brand-accent/30 border border-brand-accent/60
                   text-brand-accent shadow-lg"
          >
            {{ t('services.popular') }}
          </div>
          <div
            v-if="service.comingSoon"
            class="absolute -top-3 left-6 badge text-xs px-3 py-1 bg-brand-muted/20 text-brand-muted"
          >
            {{ t('services.comingSoon') }}
          </div>

          <!-- Icon + title -->
          <div class="flex items-start gap-3">
            <div
              class="text-brand-primary shrink-0 mt-0.5"
              v-html="serviceIcons[service.key]"
            />
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="font-display font-bold text-lg text-white">
                  {{ t(`services.items.${service.key}.title`) }}
                </h3>
                <!-- Collaboration badge for design -->
                <span
                  v-if="service.collaborator"
                  class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-brand-accent/15 text-brand-accent border border-brand-accent/25"
                >
                  <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
                  we współpracy z Designerem
                </span>
              </div>
              <div class="flex items-center gap-2 mt-1 text-xs text-brand-muted">
                <svg class="w-3 h-3 text-brand-muted/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {{ t(`services.items.${service.key}.days`) }}
                <span aria-hidden="true">·</span>
                <span class="text-brand-accent font-semibold">
                  {{ t(`services.items.${service.key}.price`) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Description -->
          <p class="text-brand-muted text-sm leading-relaxed">
            {{ t(`services.items.${service.key}.desc`) }}
          </p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in service.tags" :key="tag" class="badge text-xs">{{ tag }}</span>
          </div>

          <!-- CTA hover -->
          <a
            v-if="!service.comingSoon"
            href="#kontakt"
            class="mt-auto flex items-center gap-2 text-sm font-medium text-brand-primary md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
          >
            {{ t('services.askAbout') }}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </article>
      </div>

      <!-- Custom project CTA -->
      <div class="mt-8 card-gradient p-6 text-center reveal">
        <div class="flex justify-center mb-3" aria-hidden="true">
          <svg class="w-10 h-10 text-brand-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18h6"/>
            <path d="M10 22h4"/>
            <path d="M12 2a7 7 0 014 12.73V17a1 1 0 01-1 1H9a1 1 0 01-1-1v-2.27A7 7 0 0112 2z"/>
          </svg>
        </div>
        <p class="text-white font-semibold mb-2">{{ t('services.customTitle') }}</p>
        <p class="text-brand-muted text-sm mb-4">{{ t('services.customDesc') }}</p>
        <a
          href="#kontakt"
          class="btn-primary inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {{ t('services.customCta') }}
        </a>
      </div>
    </div>
  </section>
</template>
