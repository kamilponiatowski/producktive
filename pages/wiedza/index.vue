<script setup lang="ts">
const { t, locale } = useI18n()
const { fetchSeries, fetchSeriesPostSlugs, fetchCategories } = useDirectus()
const { getSeriesProgress, getReadCount } = useReadProgress()

const [series, postSlugsBySeries, categories] = await Promise.all([
  fetchSeries(),
  fetchSeriesPostSlugs(),
  fetchCategories(),
])

// Categories that have at least one matching series
const categoriesWithSeries = computed(() =>
  categories
    .map(cat => ({
      ...cat,
      displayName: locale.value === 'en' ? cat.nameEn : cat.name,
      seriesList: series.filter(s => s.category === cat.slug),
    }))
    .filter(cat => cat.seriesList.length > 0),
)

// Series whose category doesn't match any Directus category (e.g. hardcoded with category:'vue')
const knownCategorySlugs = computed(() => new Set(categories.map(c => c.slug)))
const standaloneSeries = computed(() =>
  series.filter(s => !knownCategorySlugs.value.has(s.category)),
)

useHead({
  title: `${t('nav.knowledge')} | Producktive`,
  meta: [
    { name: 'description', content: t('knowledge.metaDescription') },
  ],
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

      <!-- Categorized series (from Directus) -->
      <template v-for="cat in categoriesWithSeries" :key="cat.slug">
        <section class="mb-12">
          <div class="mb-6 flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-2xl" aria-hidden="true">{{ cat.emoji }}</span>
            <h2 class="text-xl font-display font-bold text-white">{{ cat.displayName }}</h2>
          </div>
          <div class="grid gap-6 md:grid-cols-2">
            <BlogSeriesCard
              v-for="s in cat.seriesList"
              :key="s.slug"
              :series="s"
              :progress="getSeriesProgress(postSlugsBySeries[s.slug] || [])"
              :read-count="getReadCount(postSlugsBySeries[s.slug] || [])"
            />
          </div>
        </section>
      </template>

      <!-- Standalone series (no matching Directus category) -->
      <div v-if="standaloneSeries.length" :class="categoriesWithSeries.length ? 'mt-4 pt-8 border-t border-white/10' : ''">
        <div class="grid gap-6 md:grid-cols-2">
          <BlogSeriesCard
            v-for="s in standaloneSeries"
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
