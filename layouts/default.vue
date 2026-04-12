<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

const { t } = useI18n()

// Custom cursor
const cursorDot = ref<HTMLElement | null>(null)
const cursorRing = ref<HTMLElement | null>(null)
const isHovering = ref(false)
const cursorReady = ref(false)

onMounted(async () => {
  await nextTick()

  // ── Scroll reveal (respects prefers-reduced-motion) ──────
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

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

  // ── Custom cursor (desktop only, no reduced motion) ──────
  if (window.innerWidth < 1024 || prefersReducedMotion) return

  document.body.style.cursor = 'none'

  let mouseX = 0
  let mouseY = 0
  let ringX = 0
  let ringY = 0

  window.addEventListener('mousemove', (e: MouseEvent) => {
    mouseX = e.clientX
    mouseY = e.clientY
    if (!cursorReady.value) cursorReady.value = true
    if (cursorDot.value) {
      cursorDot.value.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
    }
  })

  const animateRing = () => {
    ringX += (mouseX - ringX) * 0.18
    ringY += (mouseY - ringY) * 0.18
    if (cursorRing.value) {
      cursorRing.value.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`
    }
    requestAnimationFrame(animateRing)
  }
  animateRing()

  const updateHoverTargets = () => {
    document
      .querySelectorAll('a, button, [data-hover], input, select, textarea')
      .forEach((el) => {
        el.addEventListener('mouseenter', () => {
          isHovering.value = true
        })
        el.addEventListener('mouseleave', () => {
          isHovering.value = false
        })
      })
  }
  updateHoverTargets()
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

  <!-- Custom cursor -->
  <div
    ref="cursorDot"
    class="cursor-dot hidden lg:block"
    :style="{ opacity: cursorReady ? '1' : '0' }"
    aria-hidden="true"
  />
  <div
    ref="cursorRing"
    class="cursor-ring hidden lg:block"
    :class="{ hover: isHovering }"
    :style="{ opacity: cursorReady ? '1' : '0' }"
    aria-hidden="true"
  />

  <div class="min-h-screen bg-brand-dark overflow-x-hidden relative z-10">
    <LayoutNavBar />
    <main id="main-content" role="main">
      <slot />
    </main>
    <LayoutFooterSection />
    <UiCookieConsent />
  </div>
</template>
