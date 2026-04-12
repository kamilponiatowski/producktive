<script setup lang="ts">
const { t } = useI18n()

const skills = [
  {
    categoryKey: 'frontend',
    items: ['Vue 3', 'Nuxt', 'TypeScript', 'TailwindCSS', 'Vite'],
  },
  {
    categoryKey: 'backend',
    items: ['Node.js', 'Supabase', 'PostgreSQL', 'REST API', 'Edge Functions'],
  },
  {
    categoryKey: 'design',
    items: ['Figma', 'Design Systems', 'UX Research', 'Prototyping'],
  },
  {
    categoryKey: 'devops',
    items: ['Vercel', 'GitHub Actions', 'Docker', 'CI/CD'],
  },
]

const values = [
  { icon: '🎯', key: 'deadline' },
  { icon: '💎', key: 'quality' },
  { icon: '🤝', key: 'partnership' },
  { icon: '📖', key: 'transparency' },
]
</script>

<template>
  <section
    id="o-mnie"
    class="py-24 relative overflow-hidden"
    aria-labelledby="about-heading"
  >
    <!-- Glow orb -->
    <div
      class="glow-orb w-[500px] h-[500px] bg-brand-primary/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      aria-hidden="true"
    />

    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-16 items-start">
        <!-- Left: Personal story -->
        <div class="reveal">
          <span class="badge mb-4 inline-block">{{ t('about.badge') }}</span>

          <h2 id="about-heading" class="section-title mb-6">
            {{ t('about.title') }}<br />
            <span class="text-gradient">{{ t('about.titleHighlight') }}</span>
          </h2>

          <div class="space-y-4 text-brand-muted leading-relaxed">
            <p>
              {{ t('about.paragraph1', { brand: 'Producktive' }).split('Producktive')[0] }}<strong class="text-white">Producktive</strong>{{ t('about.paragraph1', { brand: 'Producktive' }).split('Producktive').slice(1).join('Producktive') }}
            </p>
            <p>
              {{ t('about.paragraph2', { highlight: t('about.paragraph2Highlight') }).split(t('about.paragraph2Highlight'))[0] }}<strong class="text-white">{{ t('about.paragraph2Highlight') }}</strong>{{ t('about.paragraph2', { highlight: t('about.paragraph2Highlight') }).split(t('about.paragraph2Highlight')).slice(1).join(t('about.paragraph2Highlight')) }}
            </p>
            <p>
              {{ t('about.paragraph3', { highlight: t('about.paragraph3Highlight') }).split(t('about.paragraph3Highlight'))[0] }}<strong class="text-white">{{ t('about.paragraph3Highlight') }}</strong>{{ t('about.paragraph3', { highlight: t('about.paragraph3Highlight') }).split(t('about.paragraph3Highlight')).slice(1).join(t('about.paragraph3Highlight')) }}
            </p>
            <p>{{ t('about.paragraph4') }}</p>
          </div>

          <!-- Location badge -->
          <div class="mt-6 card p-4 inline-flex flex-col gap-1">
            <span class="text-white font-semibold text-sm">{{ t('about.location') }}</span>
            <span class="text-brand-muted text-xs">{{ t('about.locationDesc') }}</span>
          </div>

          <!-- CTA -->
          <div class="mt-8 flex flex-wrap gap-3">
            <a
              href="#kontakt"
              class="btn-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {{ t('about.ctaPrimary') }}
            </a>
            <a
              href="https://linkedin.com/in/producktive"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              {{ t('about.ctaLinkedIn') }}
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
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              <span class="sr-only">({{ t('a11y.externalLink') }})</span>
            </a>
          </div>
        </div>

        <!-- Right: Skills + values -->
        <div class="space-y-8 reveal" style="transition-delay: 150ms">
          <!-- Tech stack -->
          <div>
            <h3 class="text-white font-semibold mb-4 flex items-center gap-2">
              <span class="badge">{{ t('about.stackTitle') }}</span>
            </h3>
            <div class="space-y-3">
              <div
                v-for="group in skills"
                :key="group.categoryKey"
                class="flex flex-wrap items-center gap-2"
              >
                <span class="text-brand-muted text-xs font-mono w-16 shrink-0">
                  {{ t(`about.skills.${group.categoryKey}`) }}
                </span>
                <span v-for="skill in group.items" :key="skill" class="badge text-xs">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>

          <div class="divider-gradient" aria-hidden="true" />

          <!-- Values -->
          <div>
            <h3 class="text-white font-semibold mb-4">{{ t('about.howIWork') }}</h3>
            <div class="grid grid-cols-2 gap-3">
              <div v-for="v in values" :key="v.key" class="card p-4 flex flex-col gap-2">
                <div class="text-2xl" aria-hidden="true">{{ v.icon }}</div>
                <div class="font-semibold text-white text-sm">
                  {{ t(`about.values.${v.key}.title`) }}
                </div>
                <div class="text-brand-muted text-xs leading-relaxed">
                  {{ t(`about.values.${v.key}.desc`) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
