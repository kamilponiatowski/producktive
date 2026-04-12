<script setup lang="ts">
const { t } = useI18n()

const items = [
  { icon: '⚡', label: 'Vue 3 + Nuxt' },
  { icon: '🎨', label: 'TailwindCSS' },
  { icon: '🔐', label: 'Supabase' },
  { icon: '🚢', label: 'Vercel Edge' },
  { icon: '🔷', label: 'TypeScript' },
  { icon: '🧪', label: 'Figma Design' },
  { icon: '📦', label: 'Node.js' },
  { icon: '🌍', label: 'SSR / SSG' },
]
</script>

<template>
  <div
    class="relative border-y border-white/5 bg-brand-card/30 overflow-hidden py-4"
    role="complementary"
    :aria-label="t('trustBar.label')"
  >
    <div class="flex items-center gap-2 text-xs text-brand-muted mb-3 max-w-6xl mx-auto px-4">
      <span class="shrink-0">{{ t('trustBar.label') }}</span>
      <div class="divider-gradient flex-1 my-0" aria-hidden="true" />
    </div>
    <!-- Marquee -->
    <div class="flex overflow-hidden" aria-hidden="true">
      <div class="flex gap-8 animate-marquee shrink-0">
        <div
          v-for="(item, i) in [...items, ...items]"
          :key="`${item.label}-${i}`"
          class="flex items-center gap-2 text-brand-muted whitespace-nowrap text-sm shrink-0"
        >
          <span>{{ item.icon }}</span>
          <span class="font-mono">{{ item.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
.animate-marquee {
  animation: marquee 20s linear infinite;
}
@media (prefers-reduced-motion: reduce) {
  .animate-marquee {
    animation: none;
  }
}
</style>
