<template>
  <section id="proces" class="py-24 bg-brand-card/20">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="text-center mb-16 reveal">
        <span class="badge mb-4">Jak działam</span>
        <h2 class="section-title mb-4">
          Przejrzysty proces od pomysłu
          <span class="text-gradient"> do wdrożenia</span>
        </h2>
        <p class="section-subtitle mx-auto">
          Wiem, że oddanie projektu komuś wymaga zaufania. Dlatego każdy krok jest zaplanowany,
          jasny i pod Twoją kontrolą.
        </p>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Desktop vertical line -->
        <div class="hidden lg:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-brand-primary/60 via-brand-accent/30 to-transparent" />
        <!-- Mobile vertical line -->
        <div class="lg:hidden absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-brand-primary/60 via-brand-accent/30 to-transparent" />

        <div class="flex flex-col gap-6 lg:gap-0">
          <div
            v-for="(step, i) in steps"
            :key="step.number"
            class="relative reveal lg:flex lg:items-center lg:min-h-[140px] lg:py-8"
            :style="{ transitionDelay: `${i * 100}ms` }"
          >
            <!-- Number dot -->
            <div
              class="absolute z-10 flex items-center justify-center rounded-full font-mono font-bold text-brand-primary bg-brand-card border-2 border-brand-primary shadow-brand
                     left-0 top-4 w-7 h-7 text-xs
                     lg:left-1/2 lg:-translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:w-12 lg:h-12 lg:text-sm"
            >
              {{ step.number }}
            </div>

            <!-- Card - mobile: indent right of dot; desktop: alternate sides -->
            <div
              class="pl-10 lg:pl-0 lg:w-[45%]"
              :class="i % 2 === 0 ? 'lg:mr-auto lg:pr-16' : 'lg:ml-auto lg:pl-16'"
            >
              <div class="card p-5 lg:p-6 hover:border-brand-primary/40 transition-colors duration-300">
                <div class="flex items-start gap-3 mb-2">
                  <span class="text-2xl">{{ step.icon }}</span>
                  <h3 class="text-base lg:text-lg font-semibold text-brand-text leading-snug">
                    {{ step.title }}
                  </h3>
                </div>
                <p class="text-brand-muted text-sm leading-relaxed mb-3">{{ step.desc }}</p>
                <ul v-if="step.bullets" class="space-y-1">
                  <li
                    v-for="bullet in step.bullets"
                    :key="bullet"
                    class="flex items-start gap-2 text-xs text-brand-muted"
                  >
                    <span class="mt-0.5 text-brand-success shrink-0">✓</span>
                    <span>{{ bullet }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    number: '01',
    icon: '🎯',
    title: 'Bezpłatna konsultacja (30 min)',
    desc: 'Opowiedz mi o swoim projekcie. Poznam Twoje cele, grupę docelową i oczekiwania. Zero zobowiązań — tylko konkretna rozmowa.',
    bullets: [
      'Analiza potrzeb i celów biznesowych',
      'Weryfikacja techniczna pomysłu',
      'Wstępny zarys zakresu projektu',
    ],
  },
  {
    number: '02',
    icon: '📋',
    title: 'Propozycja i wycena',
    desc: 'W ciągu 48h otrzymujesz szczegółową ofertę: zakres prac, harmonogram, koszt. Bez ukrytych opłat.',
    bullets: [
      'Szczegółowy zakres funkcjonalności',
      'Realistyczny harmonogram etapami',
      'Transparentna wycena — żadnych niespodzianek',
    ],
  },
  {
    number: '03',
    icon: '🎨',
    title: 'Projekt i akceptacja',
    desc: 'Pokazuję wizualizacje i makiety zanim cokolwiek zakoduję. Twoja akceptacja = pełna kontrola nad wynikiem.',
    bullets: [
      'Makiety (wireframes) kluczowych widoków',
      'Projekt wizualny zgodny z Twoją marką',
      'Min. 2 rundy poprawek w cenie',
    ],
  },
  {
    number: '04',
    icon: '⚙️',
    title: 'Realizacja i testy',
    desc: 'Koduję, testuję na różnych urządzeniach i przeglądarkach. Regularnie informuję o postępach.',
    bullets: [
      'Kod zgodny z najlepszymi praktykami',
      'Testy cross-browser i mobile',
      'Regularne raporty postępu prac',
    ],
  },
  {
    number: '05',
    icon: '🚀',
    title: 'Wdrożenie i wsparcie',
    desc: 'Uruchamiam projekt na Twojej domenie. Przez 30 dni po wdrożeniu jestem dostępny na poprawki i pytania.',
    bullets: [
      'Konfiguracja domeny i hostingu',
      'Szkolenie z obsługi systemu',
      '30 dni bezpłatnego wsparcia po starcie',
    ],
  },
]
</script>
