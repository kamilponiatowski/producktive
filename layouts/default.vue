<script setup lang="ts">
import { onMounted, nextTick } from 'vue'

const { t } = useI18n()

onMounted(async () => {
  await nextTick()

  // ── Scroll reveal (respects prefers-reduced-motion) ──────
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      }),
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  )
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>

<template>
  <!-- Skip to content (WCAG) -->
  <a
    href="#main-content"
    class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-primary focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
  >
    {{ t('nav.skipToContent') }}
  </a>

  <div class="min-h-screen bg-brand-dark overflow-x-hidden relative z-10">
    <LayoutNavBar />
    <main id="main-content" role="main">
      <slot />
    </main>
    <LayoutFooterSection />
    <UiCookieConsent />
    <UiLofiPlayer />
    <UiContactPopup />
    <UiScrollButtons />
  </div>
</template>
