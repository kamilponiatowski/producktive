<script setup lang="ts">
const { t } = useI18n()

const items = [
  {
    label: 'Vue 3 + Nuxt',
    tooltip: 'Framework frontendowy i meta-framework SSR/SSG',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4l9 15L21 4M9 4l3 5 3-5"/></svg>`,
  },
  {
    label: 'TailwindCSS',
    tooltip: 'Utility-first framework CSS do stylowania',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16M4 10h12M4 14h8M4 18h4"/></svg>`,
  },
  {
    label: 'Supabase',
    tooltip: 'Open-source platforma backend: baza danych, auth, API',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="12" cy="7" rx="9" ry="4"/><path d="M3 7v5a9 4 0 0018 0V7"/><path d="M3 12v5a9 4 0 0018 0v-5"/></svg>`,
  },
  {
    label: 'Vercel Edge',
    tooltip: 'Platforma deploymentu z globalną siecią CDN',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3L22 20H2L12 3z"/></svg>`,
  },
  {
    label: 'TypeScript',
    tooltip: 'Silnie typowany nadzbiór JavaScript',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  },
  {
    label: 'Figma',
    tooltip: 'Narzędzie do projektowania UI/UX i prototypowania',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2" width="6" height="6" rx="2"/><rect x="13" y="2" width="6" height="6" rx="2"/><rect x="5" y="10" width="6" height="6" rx="2"/><rect x="5" y="18" width="6" height="6" rx="2"/><circle cx="16" cy="16" r="3"/></svg>`,
  },
  {
    label: 'Node.js',
    tooltip: 'Środowisko uruchomieniowe JavaScript po stronie serwera',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
  },
  {
    label: 'SSR / SSG',
    tooltip: 'Server-Side Rendering / Static Site Generation — strony generowane po stronie serwera lub statycznie',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"/></svg>`,
  },
]
</script>

<template>
  <div
    class="relative border-y border-brand-primary/10 bg-brand-card/30 overflow-hidden py-4"
    role="complementary"
    :aria-label="t('trustBar.label')"
  >
    <div class="flex items-center gap-4 text-xs text-brand-muted mb-3 max-w-6xl mx-auto px-4">
      <div class="divider-gradient flex-1 my-0" aria-hidden="true" />
      <span class="shrink-0">{{ t('trustBar.label') }}</span>
      <div class="divider-gradient flex-1 my-0" aria-hidden="true" />
    </div>

    <!-- Infinite marquee: single inner div with duplicated content, translateX(-50%) loop -->
    <div class="overflow-hidden" aria-hidden="true">
      <div class="marquee-inner flex gap-10">
        <!-- Original set -->
        <div
          v-for="(item, i) in items"
          :key="`a-${i}`"
          class="flex items-center gap-2 text-brand-muted whitespace-nowrap text-sm shrink-0 group relative"
        >
          <span class="w-4 h-4 text-brand-primary shrink-0" v-html="item.svg" />
          <span class="font-mono">{{ item.label }}</span>
          <!-- Tooltip -->
          <span
            class="absolute -top-10 left-1/2 -translate-x-1/2 bg-brand-card border border-brand-primary/20 text-brand-text text-xs rounded-lg px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20 shadow-card"
          >
            {{ item.tooltip }}
          </span>
        </div>
        <!-- Duplicate set — for seamless loop back to start -->
        <div
          v-for="(item, i) in items"
          :key="`b-${i}`"
          class="flex items-center gap-2 text-brand-muted whitespace-nowrap text-sm shrink-0"
          aria-hidden="true"
        >
          <span class="w-4 h-4 text-brand-primary shrink-0" v-html="item.svg" />
          <span class="font-mono">{{ item.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.marquee-inner {
  display: flex;
  width: max-content;
  animation: marquee 45s linear infinite;
}
@media (prefers-reduced-motion: reduce) {
  .marquee-inner {
    animation: none;
  }
}
</style>
