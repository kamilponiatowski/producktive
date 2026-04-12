<script setup lang="ts">
const { t } = useI18n()

const networkBenefits = computed(() => [
  {
    key: 'benefit1',
    svgPath: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
  },
  {
    key: 'benefit2',
    svgPath: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6" aria-hidden="true"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>`,
  },
  {
    key: 'benefit3',
    svgPath: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
  },
])

const resources = computed(() => [
  { key: 'resource1', icon: 'file' },
  { key: 'resource2', icon: 'wind' },
  { key: 'resource3', icon: 'layout' },
  { key: 'resource4', icon: 'database' },
])

const resourceIcons: Record<string, string> = {
  file: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 shrink-0" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
  wind: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 shrink-0" aria-hidden="true"><path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2"/></svg>`,
  layout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 shrink-0" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
  database: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 shrink-0" aria-hidden="true"><ellipse cx="12" cy="7" rx="9" ry="4"/><path d="M3 7v5a9 4 0 0018 0V7"/><path d="M3 12v5a9 4 0 0018 0v-5"/></svg>`,
}
</script>

<template>
  <section
    id="siec"
    class="py-24 relative overflow-hidden"
    aria-labelledby="community-heading"
  >
    <!-- Glow orb -->
    <div
      class="glow-orb w-[500px] h-[500px] bg-brand-accent/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      aria-hidden="true"
    />

    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16 reveal">
        <span class="badge mb-4">{{ t('community.badge') }}</span>
        <h2 id="community-heading" class="section-title mb-4">
          {{ t('community.title') }}
          <span class="text-gradient">{{ t('community.titleHighlight') }}</span>
        </h2>
        <p class="section-subtitle mx-auto">
          {{ t('community.subtitle') }}
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Network benefits -->
        <div class="reveal">
          <h3 class="text-white font-semibold text-lg mb-6 flex items-center gap-2">
            <span class="badge">{{ t('community.networkTitle') }}</span>
          </h3>
          <div class="space-y-4">
            <div
              v-for="benefit in networkBenefits"
              :key="benefit.key"
              class="card p-5 flex gap-4 items-start"
            >
              <div class="text-brand-primary shrink-0 mt-0.5" v-html="benefit.svgPath" />
              <div>
                <div class="font-semibold text-white text-sm mb-1">
                  {{ t(`community.${benefit.key}Title`) }}
                </div>
                <div class="text-brand-muted text-sm leading-relaxed">
                  {{ t(`community.${benefit.key}Desc`) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Free resources -->
        <div class="reveal" style="transition-delay: 150ms">
          <h3 class="text-white font-semibold text-lg mb-6 flex items-center gap-2">
            <span class="badge-accent">{{ t('community.resourcesTitle') }}</span>
          </h3>

          <div class="card-gradient p-6 space-y-4">
            <p class="text-brand-muted text-sm leading-relaxed">
              {{ t('community.resourcesDesc') }}
            </p>

            <ul class="space-y-3">
              <li
                v-for="resource in resources"
                :key="resource.key"
                class="flex items-start gap-3 text-sm text-brand-muted"
              >
                <span class="text-brand-accent mt-0.5" v-html="resourceIcons[resource.icon]" />
                <span>{{ t(`community.${resource.key}`) }}</span>
              </li>
            </ul>

            <!-- CTA -->
            <div class="pt-4 border-t border-white/5">
              <a
                href="#kontakt"
                class="btn-primary w-full justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                </svg>
                {{ t('community.cta') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
