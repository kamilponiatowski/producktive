<script setup lang="ts">
import type { BlogSeries } from '~/types/blog'

defineProps<{
  series: BlogSeries
  progress: number
  readCount: number
}>()

const { t, locale } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <NuxtLink
    :to="localePath(`/wiedza/${series.slug}`)"
    class="card-gradient group flex flex-col p-6 md:p-8"
    :aria-label="series.name"
  >
    <!-- Header -->
    <div class="mb-4 flex items-start justify-between">
      <span class="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-primary/10 text-4xl text-brand-primary" aria-hidden="true">{{ series.emoji }}</span>
      <span class="badge-accent">{{ series.category }}</span>
    </div>

    <!-- Title -->
    <h3 class="mb-2 text-2xl font-display font-bold text-white transition-colors group-hover:text-brand-primary">
      {{ locale === 'pl' ? series.name : series.nameEn }}
    </h3>

    <!-- Description -->
    <p class="mb-6 flex-1 text-sm leading-relaxed text-brand-muted">
      {{ locale === 'pl' ? series.description : series.descriptionEn }}
    </p>

    <!-- Progress bar -->
    <div class="mb-3">
      <div class="mb-1.5 flex items-center justify-between text-xs">
        <span class="text-brand-muted">
          {{ readCount }}/{{ series.totalPosts }} {{ t('knowledge.posts') }}
        </span>
        <span class="font-mono text-brand-primary">{{ progress }}%</span>
      </div>
      <div
        class="h-1.5 w-full overflow-hidden rounded-full bg-white/10"
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

    <!-- CTA -->
    <span class="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary transition-transform group-hover:translate-x-1">
      {{ progress > 0 ? t('knowledge.continueLearning') : t('knowledge.startLearning') }}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </span>
  </NuxtLink>
</template>
