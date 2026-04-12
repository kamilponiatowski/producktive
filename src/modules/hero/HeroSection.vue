<script setup lang="ts">
// 🎯 HERO STRATEGY:
// Brak klientów → NIE ukrywaj, ZAMIEŃ W ATUT
// "Korporacyjna jakość dla małego biznesu — bez korporacyjnych cen i anonimowości"
// CTA niskie ryzyko: "Bezpłatna konsultacja" zamiast "Kup teraz"
</script>

<template>
  <section id="hero" class="relative min-h-screen flex items-center pt-16 overflow-hidden">

    <!-- Tło: orby glowowe -->
    <div class="glow-orb w-[600px] h-[600px] bg-brand-primary top-[-200px] left-[-200px]" />
    <div class="glow-orb w-[400px] h-[400px] bg-brand-accent bottom-[-100px] right-[-100px]" />

    <!-- Siatka tła -->
    <div class="absolute inset-0 opacity-[0.04]"
         style="background-image: linear-gradient(rgba(108,99,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,1) 1px, transparent 1px); background-size: 48px 48px;" />

    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
      <div class="grid lg:grid-cols-2 gap-16 items-center">

        <!-- Left: Treść -->
        <div class="flex flex-col gap-6">

          <!-- Badge: "nowy, ale doświadczony" -->
          <div
            v-motion
            :initial="{ opacity: 0, y: -16 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
            class="inline-flex items-center gap-2 w-fit"
          >
            <span class="badge">
              <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow" />
              Dostępny na projekty · Marzec 2026
            </span>
          </div>

          <!-- Headline -->
          <h1
            v-motion
            :initial="{ opacity: 0, y: 24 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
            class="text-4xl md:text-6xl font-display font-extrabold leading-[1.1] tracking-tight"
          >
            Tworzę strony i produkty,<br>
            <span class="text-gradient-animate">które pracują<br>na Twój biznes.</span>
          </h1>

          <!-- Subheadline: uczciwe pozycjonowanie -->
          <p
            v-motion
            :initial="{ opacity: 0, y: 24 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
            class="text-brand-muted text-lg leading-relaxed max-w-lg"
          >
            Przez lata budowałem systemy dla dużych korporacji. Teraz
            pomagam <strong class="text-white">małym firmom i freelancerom</strong>
            — tę samą jakość, procesy i podejście dostarczam bez korporacyjnych cen
            i bez anonimowości.
          </p>

          <!-- CTAs -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 24 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
            class="flex flex-wrap gap-3"
          >
            <a href="#kontakt" class="btn-primary text-base px-8 py-4">
              Bezpłatna konsultacja 30 min
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
            <a href="#portfolio" class="btn-secondary text-base px-8 py-4">
              Moje realizacje
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </a>
          </div>

          <!-- Micro social proof: gwarancja zamiast opinii -->
          <div
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { delay: 550 } }"
            class="flex flex-wrap items-center gap-4 text-sm text-brand-muted"
          >
            <span class="flex items-center gap-1.5">
              <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              Odpowiedź w 24h
            </span>
            <span class="flex items-center gap-1.5">
              <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              Umowa przed startem
            </span>
            <span class="flex items-center gap-1.5">
              <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              100% zadowolenia lub zwrot
            </span>
          </div>
        </div>

        <!-- Right: Floating mockup card -->
        <div
          v-motion
          :initial="{ opacity: 0, x: 48 }"
          :enter="{ opacity: 1, x: 0, transition: { delay: 350 } }"
          class="hidden lg:flex justify-center items-center"
        >
          <div class="relative animate-float">
            <!-- Główna karta mockup -->
            <div class="card p-6 w-80 space-y-4 shadow-brand">
              <!-- Browser chrome -->
              <div class="flex items-center gap-2 pb-3 border-b border-white/10">
                <div class="flex gap-1.5">
                  <div class="w-3 h-3 rounded-full bg-red-500/70" />
                  <div class="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div class="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <div class="flex-1 bg-white/5 rounded-md px-3 py-1 text-xs text-brand-muted font-mono">
                  twojafirma.pl
                </div>
              </div>
              <!-- Mockup content -->
              <div class="space-y-3">
                <div class="h-2 bg-gradient-brand rounded-full w-3/4" />
                <div class="h-2 bg-white/10 rounded-full w-full" />
                <div class="h-2 bg-white/10 rounded-full w-5/6" />
                <div class="h-8 bg-gradient-brand rounded-xl w-1/2 mt-4 flex items-center justify-center">
                  <div class="h-2 bg-white/60 rounded w-1/2" />
                </div>
              </div>
              <!-- Lighthouse score -->
              <div class="flex items-center justify-between pt-3 border-t border-white/10">
                <span class="text-xs text-brand-muted">Lighthouse</span>
                <div class="flex gap-2">
                  <span class="badge text-xs">⚡ 98</span>
                  <span class="badge text-xs">♿ 100</span>
                  <span class="badge text-xs">🔍 99</span>
                </div>
              </div>
            </div>

            <!-- Floating badges dookoła -->
            <div class="absolute -top-4 -right-6 badge-accent text-xs px-3 py-1.5 animate-pulse-slow">
              ✅ Gotowe w 14 dni
            </div>
            <div class="absolute -bottom-4 -left-6 badge text-xs px-3 py-1.5">
              🚀 Vue 3 + Vite
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-muted text-xs animate-bounce">
      <span>scroll</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>
  </section>
</template>
