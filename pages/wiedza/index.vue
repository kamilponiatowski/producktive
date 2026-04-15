<script setup lang="ts">
const { t } = useI18n()
const { fetchSeries } = useDirectus()
const { getSeriesProgress, getReadCount } = useReadProgress()

const series = await fetchSeries()

const { piniaPostsData } = await import('~/data/pinia-series')
const piniaSlugs = piniaPostsData.map((p) => p.slug)

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

      <div class="grid gap-6 md:grid-cols-2">
        <BlogSeriesCard
          v-for="s in series"
          :key="s.slug"
          :series="s"
          :progress="getSeriesProgress(piniaSlugs)"
          :read-count="getReadCount(piniaSlugs)"
        />
      </div>
    </div>
  </div>
</template>
