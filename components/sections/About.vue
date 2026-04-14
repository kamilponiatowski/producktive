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
  {
    categoryKey: 'standards',
    items: ['WCAG 2.1', 'SEO', 'Schema.org', 'Core Web Vitals', 'PWA'],
  },
]

const values = [
  {
    svgPath: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>`,
    key: 'deadline',
  },
  {
    svgPath: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    key: 'quality',
  },
  {
    svgPath: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
    key: 'partnership',
  },
  {
    svgPath: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    key: 'transparency',
  },
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

          <!-- Avatar + signature -->
          <div class="flex items-center gap-5 mb-6">
            <img
              src="~/assets/avatar.jpg"
              :alt="t('about.avatarAlt')"
              class="w-20 h-20 rounded-full object-cover border-2 border-brand-primary/40 shadow-brand shrink-0"
              loading="lazy"
            />
            <div>
              <p class="font-display font-bold text-lg text-brand-accent">
                Kamil Poniatowski
              </p>
              <p class="text-brand-muted text-sm">
                {{ t('about.titleHighlightAvatar') }}
              </p>
            </div>
          </div>

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
            <span class="text-white font-semibold text-sm flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-brand-primary shrink-0" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {{ t('about.location') }}
            </span>
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
              href="https://www.linkedin.com/in/kamil-poniatowski-rev/"
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
                <div class="text-brand-primary" v-html="v.svgPath" />
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
