
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { BlogSeries } from '~/types/blog'

const { t, locale } = useI18n()
const { fetchSeries, fetchSeriesPostSlugs, fetchCategories } = useDirectus()
const { getSeriesProgress, getReadCount } = useReadProgress()

const [allSeries, postSlugsBySeries, categories] = await Promise.all([
  fetchSeries(),
  fetchSeriesPostSlugs(),
  fetchCategories(),
])

// ---------------------------------------------------------------------------
// Category → subcategory → series hierarchy
// ---------------------------------------------------------------------------

interface SubcategoryGroup {
  label: string
  seriesList: BlogSeries[]
}

interface CategorySection {
  slug: string
  displayName: string
  emoji: string
  subcategories: SubcategoryGroup[]
}

const categorySections = computed<CategorySection[]>(() => {
  return categories
    .map(cat => {
      const matchingSeries = allSeries.filter(s => s.category === cat.slug)
      if (!matchingSeries.length) return null

      // Group series by subcategory (e.g. "vue", "nuxt")
      const grouped = new Map<string, BlogSeries[]>()
      for (const s of matchingSeries) {
        const key = s.subcategory || ''
        const list = grouped.get(key) ?? []
        list.push(s)
        grouped.set(key, list)
      }

      const subcategories: SubcategoryGroup[] = [...grouped.entries()].map(([label, seriesList]) => ({
        label,
        seriesList,
      }))

      return {
        slug: cat.slug,
        displayName: locale.value === 'en' ? cat.nameEn : cat.name,
        emoji: cat.emoji,
        subcategories,
      } satisfies CategorySection
    })
    .filter((cat): cat is CategorySection => cat !== null)
})

// Series that don't belong to any known category (safety net)
const uncategorizedSeries = computed(() => {
  const knownSlugs = new Set(categories.map(c => c.slug))
  return allSeries.filter(s => !knownSlugs.has(s.category))
})

useHead({
  title: `${t('nav.knowledge')} | Producktive`,
  meta: [{ name: 'description', content: t('knowledge.metaDescription') }],
})

useSchemaOrg([
  defineWebPage({ name: `${t('nav.knowledge')} – Producktive` }),
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: '/' },
      { name: t('nav.knowledge') },
    ],
  }),
])
</script>

<template>
  <div class="min-h-[80vh] px-4 py-20 md:px-8">
    <div class="mx-auto max-w-5xl">
      <!-- Page header -->
      <header class="mb-12 text-center">
        <span class="badge mb-4">{{ t('knowledge.badge') }}</span>
        <h1 class="section-title mb-4">
          {{ t('knowledge.title') }}
          <span class="text-gradient">{{ t('knowledge.titleHighlight') }}</span>
        </h1>
        <p class="section-subtitle mx-auto max-w-2xl">
          {{ t('knowledge.subtitle') }}
        </p>
      </header>

      <!-- Category sections -->
      <section v-for="cat in categorySections" :key="cat.slug" class="mb-12">
        <!-- Category heading -->
        <div class="mb-6 flex items-center gap-3">
          <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-2xl" aria-hidden="true">{{ cat.emoji }}</span>
          <h2 class="text-xl font-display font-bold text-white">{{ cat.displayName }}</h2>
        </div>

        <!-- Subcategory groups within category -->
        <div v-for="sub in cat.subcategories" :key="sub.label" class="mb-8 last:mb-0">
          <h3 v-if="sub.label" class="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-muted">
            <span class="h-px flex-1 bg-white/10" />
            <span>{{ sub.label }}</span>
            <span class="h-px flex-1 bg-white/10" />
          </h3>

          <div class="grid gap-6 md:grid-cols-2">
            <BlogSeriesCard
              v-for="s in sub.seriesList"
              :key="s.slug"
              :series="s"
              :progress="getSeriesProgress(postSlugsBySeries[s.slug] || [])"
              :read-count="getReadCount(postSlugsBySeries[s.slug] || [])"
            />
          </div>
        </div>
      </section>

      <!-- Uncategorized series (fallback) -->
      <div v-if="uncategorizedSeries.length" class="mt-4 border-t border-white/10 pt-8">
        <div class="grid gap-6 md:grid-cols-2">
          <BlogSeriesCard
            v-for="s in uncategorizedSeries"
            :key="s.slug"
            :series="s"
            :progress="getSeriesProgress(postSlugsBySeries[s.slug] || [])"
            :read-count="getReadCount(postSlugsBySeries[s.slug] || [])"
          />
        </div>
      </div>
    </div>
  </div>
</template>
