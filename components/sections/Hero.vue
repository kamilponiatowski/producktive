<script setup lang="ts">
import producktiveGlass from '~/assets/producktive-glass.png'
const { t } = useI18n()

const scrollToAbout = () => {
  const el = document.getElementById('o-mnie')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    history.replaceState(null, '', '#o-mnie')
  }
}
</script>

<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center pt-16 overflow-hidden"
    aria-labelledby="hero-heading"
  >
    <!-- Glow orbs -->
    <div
      class="glow-orb w-[600px] h-[600px] bg-brand-primary top-[-200px] left-[-200px]"
      aria-hidden="true"
    />
    <div
      class="glow-orb w-[400px] h-[400px] bg-brand-accent bottom-[-100px] right-[-100px]"
      aria-hidden="true"
    />

    <!-- Grid background -->
    <div
      class="absolute inset-0 opacity-[0.04]"
      style="
        background-image: linear-gradient(rgba(0, 229, 255, 1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 229, 255, 1) 1px, transparent 1px);
        background-size: 48px 48px;
      "
      aria-hidden="true"
    />

    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left: Content -->
        <div class="flex flex-col gap-6">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 w-fit reveal">
            <span class="badge">
              <span
                class="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow"
                aria-hidden="true"
              />
              {{ t('hero.badge') }}
            </span>
          </div>

          <!-- Headline -->
          <h1
            id="hero-heading"
            class="text-4xl md:text-6xl font-display font-extrabold leading-[1.1] tracking-tight reveal"
          >
            {{ t('hero.titleLine1') }}<br />
            <span class="text-gradient-animate">
              {{ t('hero.titleLine2') }}<br />{{ t('hero.titleLine3') }}
            </span>
          </h1>

          <!-- Subheadline -->
          <p class="text-brand-muted text-lg leading-relaxed max-w-lg reveal">
            {{ t('hero.subtitle', { highlight: t('hero.subtitleHighlight') }).split(t('hero.subtitleHighlight'))[0] }}<strong class="text-white">{{ t('hero.subtitleHighlight') }}</strong>{{ t('hero.subtitle', { highlight: t('hero.subtitleHighlight') }).split(t('hero.subtitleHighlight')).slice(1).join(t('hero.subtitleHighlight')) }}
          </p>

          <!-- CTAs -->
          <div class="flex flex-wrap gap-3 reveal">
            <a
              href="#kontakt"
              class="btn-primary text-base px-8 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              {{ t('hero.ctaPrimary') }}
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <a
              href="#portfolio"
              class="btn-secondary text-base px-8 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              {{ t('hero.ctaSecondary') }}
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </div>

          <!-- Micro social proof -->
          <div class="flex flex-wrap items-center gap-4 text-sm text-brand-muted reveal">
            <span class="flex items-center gap-1.5">
              <svg
                class="w-4 h-4 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ t('hero.proof1') }}
            </span>
            <span class="flex items-center gap-1.5">
              <svg
                class="w-4 h-4 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ t('hero.proof2') }}
            </span>
            <span class="flex items-center gap-1.5">
              <svg
                class="w-4 h-4 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ t('hero.proof3') }}
            </span>
          </div>
        </div>

        <!-- Right: Glassmorphism image card — full on desktop, compact floating on mobile -->
        <div class="flex justify-center items-center reveal">
          <div class="relative motion-safe:animate-float">
            <!-- Glassmorphism frame -->
            <div
              class="rounded-3xl overflow-hidden shadow-brand backdrop-blur-md
                     bg-white/5 border border-brand-primary/25 p-1.5"
            >
              <img
                :src="producktiveGlass"
                alt="Producktive — dynamika i charakter strony"
                class="w-48 lg:w-96 rounded-2xl object-cover"
                width="384"
                loading="eager"
              />
            </div>

            <!-- Floating badges (kept from original) -->
            <div
              class="absolute -top-4 -right-6 badge-accent text-xs px-3 py-1.5 motion-safe:animate-pulse-slow"
              aria-hidden="true"
            >
              {{ t('hero.mockupBadge1') }}
            </div>
            <div class="absolute -bottom-4 -left-6 badge text-xs px-3 py-1.5" aria-hidden="true">
              {{ t('hero.mockupBadge2') }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <button
      class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-muted text-xs motion-safe:animate-bounce cursor-pointer hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg p-1"
      :aria-label="t('a11y.scrollDown')"
      @click="scrollToAbout"
    >
      <span>{{ t('hero.scroll') }}</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  </section>
</template>
