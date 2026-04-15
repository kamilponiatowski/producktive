<script setup lang="ts">
const { t, locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const seriesSlug = route.params.series as string

const { fetchPostsBySeries } = useDirectus()
const { isRead, toggleRead, getSeriesProgress } = useReadProgress()

const posts = await fetchPostsBySeries(seriesSlug)

if (!posts.length) {
  throw createError({ statusCode: 404, message: 'Series not found' })
}

const seriesName = computed(() => {
  if (locale.value === 'en' && posts[0]?.seriesNameEn) return posts[0].seriesNameEn
  return posts[0]?.seriesName || seriesSlug
})
const postSlugs = posts.map((p) => p.slug)
const progress = computed(() => getSeriesProgress(postSlugs))

useHead({
  title: `${seriesName.value} | ${t('nav.knowledge')} | Producktive`,
  meta: [
    { name: 'description', content: `${seriesName.value} – ${t('knowledge.metaDescription')}` },
  ],
})

useSchemaOrg([
  defineWebPage({ name: seriesName.value }),
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: '/' },
      { name: t('nav.knowledge'), item: '/wiedza' },
      { name: seriesName.value },
    ],
  }),
])
</script>

<template>
  <div class="min-h-[80vh] px-4 py-20 md:px-8">
    <div class="mx-auto max-w-5xl">
      <NuxtLink
        :to="localePath('/wiedza')"
        class="mb-8 inline-flex items-center gap-2 text-sm text-brand-muted transition-colors hover:text-brand-primary"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        {{ t('knowledge.backToKnowledge') }}
      </NuxtLink>

      <header class="mb-10">
        <div class="mb-4 flex items-center gap-3">
          <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-3xl text-brand-primary" aria-hidden="true">���</span>
          <div>
            <h1 class="text-3xl font-display font-bold text-white md:text-4xl">
              {{ seriesName }}
            </h1>
            <p class="mt-1 text-sm text-brand-muted">
              {{ posts.length }} {{ t('knowledge.posts') }}
            </p>
          </div>
        </div>

        <div class="mt-4">
          <div class="mb-1.5 flex items-center justify-between text-xs">
            <span class="text-brand-muted">{{ t('knowledge.progress') }}</span>
            <span class="font-mono text-brand-primary">{{ progress }}%</span>
          </div>
          <div
            class="h-2 w-full overflow-hidden rounded-full bg-white/10"
            role="progressbar"
            :aria-valuenow="progress"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-label="t('knowledge.progress')"
          >
            <div
              class="h-full rounded-full bg-gradient-brand transition-all duration-500"
              :style="{ width: `${progress}%` }"
            />
          </div>
        </div>
      </header>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <BlogPostCard
          v-for="post in posts"
          :key="post.slug"
          :post="post"
          :series-slug="seriesSlug"
          :is-read="isRead(post.slug)"
          @toggle-read="toggleRead"
        />
      </div>
    </div>
  </div>
</template>
