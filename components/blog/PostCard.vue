<script setup lang="ts">
import type { BlogPost } from '~/types/blog'

const props = defineProps<{
  post: BlogPost
  seriesSlug: string
  isRead: boolean
}>()

const emit = defineEmits<{
  toggleRead: [slug: string]
}>()

const { t, locale } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <article
    class="card group relative flex flex-col p-5 transition-all duration-300"
    :class="{ 'opacity-50 grayscale': isRead }"
    :aria-label="post.title"
  >
    <!-- Read indicator / checkbox -->
    <button
      class="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-primary"
      :class="
        isRead
          ? 'border-brand-success bg-brand-success/20 text-brand-success'
          : 'border-white/20 text-transparent hover:border-brand-primary/50'
      "
      :title="isRead ? t('knowledge.markAsUnread') : t('knowledge.markAsRead')"
      :aria-label="isRead ? t('knowledge.markAsUnread') : t('knowledge.markAsRead')"
      @click.prevent.stop="emit('toggleRead', post.slug)"
    >
      <svg
        v-if="isRead"
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <NuxtLink
      :to="localePath(`/wiedza/${seriesSlug}/${post.slug}`)"
      class="flex flex-1 flex-col"
    >
      <!-- Emoji + sort order -->
      <div class="mb-1 flex items-center gap-3">
        <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-2xl text-brand-primary" aria-hidden="true">{{ post.emoji }}</span>
        <span class="badge text-[10px]">{{ post.sortOrder }}/12</span>
      </div>

      <!-- Reading time -->
      <div class="mb-3 text-xs text-brand-muted">
        {{ post.readingTime }} min
      </div>

      <!-- Title -->
      <h3
        class="mb-2 text-lg font-display font-bold leading-snug text-white transition-colors group-hover:text-brand-primary"
      >
        {{ locale === 'en' && post.titleEn ? post.titleEn : post.title }}
      </h3>

      <!-- Excerpt -->
      <p class="mb-4 flex-1 text-sm leading-relaxed text-brand-muted">
        {{ locale === 'en' && post.excerptEn ? post.excerptEn : post.excerpt }}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="tag in post.tags.slice(0, 3)"
          :key="tag"
          class="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-mono text-brand-muted"
        >
          {{ tag }}
        </span>
      </div>
    </NuxtLink>
  </article>
</template>
