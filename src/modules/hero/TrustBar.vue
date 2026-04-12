<script setup lang="ts">
// TrustBar zamiast "logotypów klientów" — pokazuje stack i certyfikaty
const items = [
  { icon: '⚡', label: 'Vue 3 + Vite' },
  { icon: '🎨', label: 'TailwindCSS' },
  { icon: '🔐', label: 'Supabase' },
  { icon: '🚢', label: 'Vercel Edge' },
  { icon: '🔷', label: 'TypeScript' },
  { icon: '🧪', label: 'Figma Design' },
  { icon: '📦', label: 'Node.js' },
  { icon: '🛒', label: 'WooCommerce' },
]
</script>

<template>
  <div class="relative border-y border-white/5 bg-brand-card/30 overflow-hidden py-4">
    <div class="flex items-center gap-2 text-xs text-brand-muted mb-3 max-w-6xl mx-auto px-4">
      <span class="shrink-0">Technologie, których używam:</span>
      <div class="divider-gradient flex-1 my-0" />
    </div>
    <!-- Marquee -->
    <div class="flex overflow-hidden">
      <div class="flex gap-8 animate-[marquee_20s_linear_infinite] shrink-0">
        <div v-for="item in [...items, ...items]" :key="item.label + Math.random()"
             class="flex items-center gap-2 text-brand-muted whitespace-nowrap text-sm shrink-0">
          <span>{{ item.icon }}</span>
          <span class="font-mono">{{ item.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
