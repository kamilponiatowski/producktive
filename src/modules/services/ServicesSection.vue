<script setup lang="ts">
const services = [
  {
    icon: '🌐',
    title: 'Strona wizytówka',
    desc: 'Pierwsze wrażenie w sieci, które buduje zaufanie i zachęca do kontaktu. Szybka, mobilna, optymalna pod SEO.',
    tags: ['Vue 3', 'TailwindCSS', 'Vercel'],
    price: 'od 2 000 zł',
    days: '7–10 dni',
    highlight: false,
  },
  {
    icon: '🚀',
    title: 'Landing Page',
    desc: 'Jedna strona, jeden cel — maksymalna konwersja. Idealna do kampanii reklamowych, premier produktów.',
    tags: ['A/B testing', 'Analytics', 'Fast'],
    price: 'od 1 500 zł',
    days: '5–7 dni',
    highlight: false,
  },
  {
    icon: '🛒',
    title: 'Sklep online',
    desc: 'Sprzedawaj 24/7 bez ograniczeń geograficznych. Płatności, zarządzanie produktami, panel admina.',
    tags: ['WooCommerce', 'Stripe', 'Panel'],
    price: 'od 4 000 zł',
    days: '14–21 dni',
    highlight: true, // Wyróżniona oferta
  },
  {
    icon: '📝',
    title: 'Blog & Content',
    desc: 'Twórz treści, które pozycjonują Twoją firmę jako eksperta. CMS dostosowany do nietech-użytkowników.',
    tags: ['SEO', 'CMS', 'Markdown'],
    price: 'od 2 500 zł',
    days: '10–14 dni',
    highlight: false,
  },
  {
    icon: '📱',
    title: 'Produkt cyfrowy / SaaS',
    desc: 'MVP Twojego pomysłu w rekordowym czasie. Autoryzacja, baza danych, panel użytkownika — gotowe.',
    tags: ['Vue 3', 'Supabase', 'Auth'],
    price: 'od 6 000 zł',
    days: '21–30 dni',
    highlight: false,
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    desc: 'Projekt graficzny przed wdrożeniem. Makiety, system designu, prototyp do testów z użytkownikami.',
    tags: ['Figma', 'Prototyp', 'Design System'],
    price: 'od 1 200 zł',
    days: '5–7 dni',
    highlight: false,
  },
]
</script>

<template>
  <section id="uslugi" class="py-24 relative">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="text-center mb-16 reveal">
        <span class="badge mb-4">Czym mogę Ci pomóc</span>
        <h2 class="section-title mb-4">
          Kompleksowe <span class="text-gradient">rozwiązania cyfrowe</span>
        </h2>
        <p class="section-subtitle mx-auto">
          Od prostej strony wizytówki po zaawansowany produkt SaaS —
          każdy projekt traktuję jak własny biznes.
        </p>
      </div>

      <!-- Grid usług -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(service, i) in services"
          :key="service.title"
          class="card p-6 flex flex-col gap-4 reveal relative group"
          :class="service.highlight ? 'border-brand-primary/50 shadow-brand' : ''"
          :style="{ transitionDelay: `${i * 80}ms` }"
        >
          <!-- Popular badge -->
          <div v-if="service.highlight"
               class="absolute -top-3 left-6 badge-accent text-xs px-3 py-1">
            ⭐ Najczęściej wybierany
          </div>

          <!-- Icon + title -->
          <div class="flex items-start gap-3">
            <div class="text-3xl">{{ service.icon }}</div>
            <div>
              <h3 class="font-display font-bold text-lg text-white">{{ service.title }}</h3>
              <div class="flex items-center gap-2 mt-1 text-xs text-brand-muted">
                <span>🕐 {{ service.days }}</span>
                <span>·</span>
                <span class="text-brand-accent font-semibold">{{ service.price }}</span>
              </div>
            </div>
          </div>

          <!-- Opis -->
          <p class="text-brand-muted text-sm leading-relaxed">{{ service.desc }}</p>

          <!-- Tagi -->
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in service.tags" :key="tag" class="badge text-xs">{{ tag }}</span>
          </div>

          <!-- CTA hover -->
          <a href="#kontakt"
             class="mt-auto flex items-center gap-2 text-sm font-medium text-brand-primary
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Zapytaj o projekt
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Indywidualny projekt -->
      <div class="mt-8 card-gradient p-6 text-center reveal">
        <p class="text-white font-semibold mb-2">Nie widzisz tego, czego szukasz?</p>
        <p class="text-brand-muted text-sm mb-4">Każdy projekt jest inny. Opisz mi swój pomysł, a wycenię indywidualnie.</p>
        <a href="#kontakt" class="btn-primary inline-flex">Opisz mi swój pomysł →</a>
      </div>
    </div>
  </section>
</template>
