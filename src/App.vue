<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import NavBar from '@/components/shared/NavBar.vue'
import HeroSection from '@/modules/hero/HeroSection.vue'
import TrustBar from '@/modules/hero/TrustBar.vue'
import ServicesSection from '@/modules/services/ServicesSection.vue'
import PortfolioSection from '@/modules/portfolio/PortfolioSection.vue'
import AboutSection from '@/modules/about/AboutSection.vue'
import ProcessSection from '@/modules/process/ProcessSection.vue'
import ContactSection from '@/modules/contact/ContactSection.vue'
import FooterSection from '@/components/shared/FooterSection.vue'

// Custom cursor
const cursorDot   = ref<HTMLElement | null>(null)
const cursorRing  = ref<HTMLElement | null>(null)
const isHovering  = ref(false)
const cursorReady = ref(false)

onMounted(async () => {
  // Czekaj aż Vue wyrenderuje WSZYSTKIE komponenty potomne
  await nextTick()

  // ── Scroll reveal ────────────────────────────────────────
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        observer.unobserve(e.target)
      }
    }),
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  )
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

  // ── Custom cursor (tylko desktop) ────────────────────────
  if (window.innerWidth < 1024) return

  document.body.style.cursor = 'none'

  let mouseX = 0, mouseY = 0
  let ringX = 0,  ringY = 0

  window.addEventListener('mousemove', (e: MouseEvent) => {
    mouseX = e.clientX
    mouseY = e.clientY
    if (!cursorReady.value) cursorReady.value = true
    // Dot śledzi natychmiastowo
    if (cursorDot.value) {
      cursorDot.value.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
    }
  })

  // Ring z płynną interpolacją (lerp) przez RAF
  const animateRing = () => {
    ringX += (mouseX - ringX) * 0.18
    ringY += (mouseY - ringY) * 0.18
    if (cursorRing.value) {
      cursorRing.value.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`
    }
    requestAnimationFrame(animateRing)
  }
  animateRing()

  // Hover state na interaktywnych elementach
  const updateHoverTargets = () => {
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', () => { isHovering.value = true })
      el.addEventListener('mouseleave', () => { isHovering.value = false })
    })
  }
  updateHoverTargets()
})
</script>

<template>
  <!-- Custom cursor — pojawia się dopiero po pierwszym ruchu myszy -->
  <div
    ref="cursorDot"
    class="cursor-dot hidden lg:block"
    :style="{ opacity: cursorReady ? '1' : '0' }"
  />
  <div
    ref="cursorRing"
    class="cursor-ring hidden lg:block"
    :class="{ hover: isHovering }"
    :style="{ opacity: cursorReady ? '1' : '0' }"
  />

  <div class="min-h-screen bg-brand-dark overflow-x-hidden relative z-10">
    <NavBar />
    <main>
      <HeroSection />
      <TrustBar />
      <ServicesSection />
      <PortfolioSection />
      <AboutSection />
      <ProcessSection />
      <ContactSection />
    </main>
    <FooterSection />
  </div>
</template>
