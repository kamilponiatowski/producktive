<script setup lang="ts">
const { t } = useI18n()

import miraliveSrc from '~/assets/site-miralive.png'
import neksusScr from '~/assets/site-neksuspng.png'
import producktiveSrc from '~/assets/site-producktive.png'

const projectImages: Record<string, string> = {
  miralive: miraliveSrc,
  neksus: neksusScr,
  producktive: producktiveSrc,
}

type ProjectType = 'client' | 'concept' | 'personal' | 'all'

const activeFilter = ref<ProjectType>('all')

const filters = computed<{ key: ProjectType; label: string }[]>(() => [
  { key: 'all', label: t('portfolio.filterAll') },
  { key: 'client', label: t('portfolio.filterClient') },
  { key: 'concept', label: t('portfolio.filterConcept') },
  { key: 'personal', label: t('portfolio.filterPersonal') },
])

const projects = computed(() => [
  {
    type: 'client' as ProjectType,
    key: 'miralive',
    tags: ['Nuxt 4', 'TailwindCSS', 'Resend', 'Schema.org'],
    demoUrl: 'https://miralive.pl',
    labelType: 'badge-accent',
    initial: 'M',
  },
  {
    type: 'client' as ProjectType,
    key: 'neksus',
    tags: ['Nuxt 4', 'TailwindCSS', 'SSG', 'SEO'],
    demoUrl: 'https://neksus-phi.vercel.app',
    labelType: 'badge-accent',
    initial: 'N',
  },
  {
    type: 'personal' as ProjectType,
    key: 'producktive',
    tags: ['Nuxt 3', 'TailwindCSS', 'Supabase', 'PWA', 'i18n'],
    demoUrl: 'https://producktive.pl',
    labelType: 'badge',
    initial: 'P',
  },
])

const filtered = computed(() =>
  activeFilter.value === 'all'
    ? projects.value
    : projects.value.filter((p) => p.type === activeFilter.value)
)
</script>

<template>
  <section
    id="portfolio"
    class="py-24 bg-brand-card/20"
    aria-labelledby="portfolio-heading"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12 reveal">
        <span class="badge mb-4">{{ t('portfolio.badge') }}</span>
        <h2 id="portfolio-heading" class="section-title mb-4">
          {{ t('portfolio.title') }}
          <span class="text-gradient">{{ t('portfolio.titleHighlight') }}</span>
        </h2>
        <p class="section-subtitle mx-auto">
          {{ t('portfolio.subtitle') }}
        </p>
      </div>

      <!-- Filters -->
      <div
        class="flex flex-wrap justify-center gap-2 mb-10 reveal"
        role="tablist"
        :aria-label="t('portfolio.badge')"
      >
        <button
          v-for="f in filters"
          :key="f.key"
          role="tab"
          :aria-selected="activeFilter === f.key"
          class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          :class="
            activeFilter === f.key
              ? 'bg-gradient-brand text-white shadow-brand'
              : 'bg-brand-card text-brand-muted hover:text-white border border-white/10'
          "
          @click="activeFilter = f.key"
        >
          {{ f.label }}
        </button>
      </div>

      <!-- Projects grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-6" role="tabpanel">
        <article
          v-for="project in filtered"
          :key="project.key"
          class="card overflow-hidden flex flex-col reveal group"
        >
          <!-- Image placeholder with gradient -->
          <div class="h-48 bg-gradient-brand relative overflow-hidden">
            <!-- Etykieta typu projektu w prawym dolnym rogu -->
            <span
              v-if="project.demoUrl && project.demoUrl !== '#'"
              :class="[
                'absolute bottom-2 right-2 z-20 px-3 py-1 rounded-full text-xs font-mono shadow-lg backdrop-blur-md border border-white/20',
                project.type === 'client' ? 'bg-green-500/80 text-white' : '',
                project.type === 'personal' ? 'bg-brand-primary/80 text-brand-dark' : '',
                project.type === 'concept' ? 'bg-yellow-400/80 text-brand-dark' : ''
              ]"
              style="letter-spacing:0.03em;"
            >
              {{ t(`portfolio.projects.${project.key}.label`) }}
            </span>
            <!-- Browser chrome overlay -->
            <div
              class="absolute top-0 left-0 right-0 h-6 bg-white/10 backdrop-blur-sm flex items-center gap-1.5 px-3 z-10"
              aria-hidden="true"
            >
              <span class="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <span class="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <span class="w-2.5 h-2.5 rounded-full bg-green-400/70" />
            </div>
            <div
              class="absolute inset-0 flex items-center justify-center text-white/20 text-7xl font-bold"
              aria-hidden="true"
            >
              {{ project.initial }}
            </div>
            <!-- Type label -->
            <div class="absolute top-8 left-3 z-10">
              <!-- Usunięto etykietę z lewego górnego rogu -->
            </div>
            <!-- Hover overlay -->
            <div
              class="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-10"
            >
              <a
                v-if="project.demoUrl && project.demoUrl !== '#'"
                :href="project.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary text-sm py-2 px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                :aria-label="t('a11y.viewProject', { name: t(`portfolio.projects.${project.key}.title`) })"
              >
                {{ t('portfolio.viewDemo') }}
              </a>
              <span
                v-else
                class="text-white/70 text-sm bg-black/50 px-3 py-1.5 rounded-lg"
              >
                {{ t('portfolio.nda') }}
              </span>
            </div>
            <!-- Project screenshot (scales on hover) -->
            <img
              :src="projectImages[project.key]"
              :alt="t(`portfolio.projects.${project.key}.title`)"
              class="absolute inset-0 w-full h-full object-cover object-center motion-safe:group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>

          <!-- Content -->
          <div class="p-5 flex flex-col gap-3 flex-1">
            <h3 class="font-display font-bold text-white leading-tight text-lg">
              {{ t(`portfolio.projects.${project.key}.title`) }}
            </h3>
            <p class="text-brand-muted text-sm leading-relaxed">
              {{ t(`portfolio.projects.${project.key}.desc`) }}
            </p>

            <!-- Results -->
            <ul class="space-y-1" :aria-label="t('portfolio.badge')">
              <li class="text-xs text-brand-muted/80">
                {{ t(`portfolio.projects.${project.key}.result1`) }}
              </li>
              <li class="text-xs text-brand-muted/80">
                {{ t(`portfolio.projects.${project.key}.result2`) }}
              </li>
              <li class="text-xs text-brand-muted/80">
                {{ t(`portfolio.projects.${project.key}.result3`) }}
              </li>
            </ul>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-white/5">
              <span v-for="tag in project.tags" :key="tag" class="badge text-xs">{{ tag }}</span>
            </div>

            <!-- CTA links -->
            <div class="flex gap-3 pt-2">
              <a
                v-if="project.demoUrl && project.demoUrl !== '#'"
                :href="project.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-brand-primary hover:text-white transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
                :aria-label="t('a11y.viewProject', { name: t(`portfolio.projects.${project.key}.title`) })"
              >
                {{ t('portfolio.viewDemo') }}
                <span class="sr-only">({{ t('a11y.externalLink') }})</span>
              </a>
            </div>
          </div>
        </article>
      </div>

      <!-- CTA -->
      <div class="mt-12 text-center reveal">
        <div class="card-gradient p-8 rounded-2xl">
          <div class="text-4xl mb-3" aria-hidden="true">🤝</div>
          <h3 class="font-display text-xl font-bold text-white mb-2">
            {{ t('portfolio.ctaTitle') }}
          </h3>
          <p class="text-brand-muted text-sm mb-5">
            {{ t('portfolio.ctaDesc') }}
          </p>
          <a
            href="#kontakt"
            class="btn-primary inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {{ t('portfolio.ctaButton') }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
