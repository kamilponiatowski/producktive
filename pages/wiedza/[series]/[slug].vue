<script setup lang="ts">
const { t, locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const seriesSlug = route.params.series as string
const postSlug = route.params.slug as string

const { fetchPostBySlug, fetchPostsBySeries } = useDirectus()
const { isRead, markAsRead, toggleRead } = useReadProgress()

const [post, allPosts] = await Promise.all([
  fetchPostBySlug(postSlug),
  fetchPostsBySeries(seriesSlug),
])

if (!post) {
  throw createError({ statusCode: 404, message: 'Post not found' })
}

const currentIndex = allPosts.findIndex((p) => p.slug === postSlug)
const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

const postIsRead = computed(() => isRead(postSlug))

const postTitle = computed(() => locale.value === 'en' && post.titleEn ? post.titleEn : post.title)
const postExcerpt = computed(() => locale.value === 'en' && post.excerptEn ? post.excerptEn : post.excerpt)
const postSeriesName = computed(() => locale.value === 'en' && post.seriesNameEn ? post.seriesNameEn : post.seriesName)
const postContent = computed(() => locale.value === 'en' && post.contentEn ? post.contentEn : post.content)

function handleMarkAsRead() {
  markAsRead(postSlug)
  if (nextPost) {
    navigateTo(localePath(`/wiedza/${seriesSlug}/${nextPost.slug}`))
  }
}

useHead({
  title: `${postTitle.value} | Producktive`,
  meta: [
    { name: 'description', content: postExcerpt.value },
    { property: 'og:title', content: postTitle.value },
    { property: 'og:description', content: postExcerpt.value },
    { property: 'og:type', content: 'article' },
    { name: 'article:published_time', content: post.dateCreated },
  ],
})

useSchemaOrg([
  defineArticle({
    headline: post.title,
    description: post.excerpt,
    datePublished: post.dateCreated,
    dateModified: post.dateUpdated,
    author: { name: 'Kamil Poniatowski', url: 'https://producktive.pl' },
    publisher: { name: 'Producktive', url: 'https://producktive.pl' },
  }),
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: '/' },
      { name: t('nav.knowledge'), item: '/wiedza' },
      { name: post.seriesName, item: `/wiedza/${seriesSlug}` },
      { name: post.title },
    ],
  }),
])
</script>

<template>
  <div class="min-h-[80vh] px-4 py-20 md:px-8">
    <div class="mx-auto max-w-3xl">
      <nav class="mb-8 flex items-center gap-2 text-xs text-brand-muted" aria-label="Breadcrumb">
        <NuxtLink :to="localePath('/wiedza')" class="transition-colors hover:text-brand-primary">
          {{ t('nav.knowledge') }}
        </NuxtLink>
        <span aria-hidden="true">/</span>
        <NuxtLink :to="localePath(`/wiedza/${seriesSlug}`)" class="transition-colors hover:text-brand-primary">
          {{ postSeriesName }}
        </NuxtLink>
        <span aria-hidden="true">/</span>
        <span class="text-white">{{ post.sortOrder }}/{{ allPosts.length }}</span>
      </nav>

      <header class="mb-10">
        <div class="mb-4 flex items-center gap-3">
          <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-3xl text-brand-primary" aria-hidden="true">{{ post.emoji }}</span>
          <div class="flex flex-wrap items-center gap-2">
            <span class="badge">{{ post.category }}</span>
            <span class="text-xs text-brand-muted">{{ post.readingTime }} min</span>
          </div>
        </div>
        <h1 class="text-3xl font-display font-bold leading-tight text-white md:text-4xl">
          {{ postTitle }}
        </h1>
        <p class="mt-3 text-lg text-brand-muted">{{ postExcerpt }}</p>
      </header>

      <BlogMarkdownContent :content="postContent" />

      <div class="mt-12 border-t border-white/10 pt-8">
        <div class="flex flex-col items-center gap-4 rounded-2xl bg-brand-card p-6 text-center">
          <p class="text-lg font-display font-semibold text-white">
            {{ postIsRead ? t('knowledge.alreadyRead') : t('knowledge.readyToContinue') }}
          </p>

          <button
            v-if="!postIsRead"
            class="btn-primary text-base"
            @click="handleMarkAsRead"
          >
            {{ t('knowledge.markAsReadCta') }}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>

          <button
            v-else
            class="btn-secondary text-sm"
            @click="toggleRead(postSlug)"
          >
            {{ t('knowledge.markAsUnread') }}
          </button>
        </div>
      </div>

      <nav class="mt-8 grid grid-cols-2 gap-4" :aria-label="t('knowledge.postNavigation')">
        <NuxtLink
          v-if="prevPost"
          :to="localePath(`/wiedza/${seriesSlug}/${prevPost.slug}`)"
          class="card group flex flex-col p-4 text-left"
        >
          <span class="mb-1 text-xs text-brand-muted">{{ t('knowledge.prevPost') }}</span>
          <span class="text-sm font-semibold text-white transition-colors group-hover:text-brand-primary">
            {{ locale === 'en' && prevPost.titleEn ? prevPost.titleEn : prevPost.title }}
          </span>
        </NuxtLink>
        <div v-else />

        <NuxtLink
          v-if="nextPost"
          :to="localePath(`/wiedza/${seriesSlug}/${nextPost.slug}`)"
          class="card group flex flex-col p-4 text-right"
        >
          <span class="mb-1 text-xs text-brand-muted">{{ t('knowledge.nextPost') }}</span>
          <span class="text-sm font-semibold text-white transition-colors group-hover:text-brand-primary">
            {{ locale === 'en' && nextPost.titleEn ? nextPost.titleEn : nextPost.title }}
          </span>
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>
