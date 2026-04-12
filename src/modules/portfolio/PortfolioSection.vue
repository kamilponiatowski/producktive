<script setup lang="ts">
import { ref } from 'vue'

// 🎯 PORTFOLIO STRATEGY dla kogoś bez klientów:
// 1. CONCEPT PROJECTS — realne projekty zbudowane "dla wyobrażonego klienta" z prawdziwym kodem
// 2. CORPORATE ANONYMIZED — "Dla firmy z branży finansowej..."
// 3. PERSONAL / OPEN SOURCE — własne narzędzia
// TYP jest jawnie oznaczony — to buduje zaufanie, nie go odbiera!

type ProjectType = 'concept' | 'corporate' | 'personal' | 'all'

const activeFilter = ref<ProjectType>('all')

const filters: { key: ProjectType, label: string }[] = [
  { key: 'all',       label: 'Wszystkie' },
  { key: 'concept',   label: '🎨 Projekty koncepcyjne' },
  { key: 'corporate', label: '🏢 Praca korporacyjna' },
  { key: 'personal',  label: '⚡ Własne projekty' },
]

const projects = [
  {
    type: 'concept' as ProjectType,
    title: 'ZenBarber — Strona dla salonu fryzjerskiego',
    desc: 'Projekt koncepcyjny dla lokalnego salonu. Rezerwacja online, galeria prac, recenzje Google, system powiadomień SMS.',
    image: '/portfolio/zenbarber.jpg',
    tags: ['Vue 3', 'Supabase', 'TailwindCSS'],
    results: ['⚡ Lighthouse 98/100', '📱 Mobile-first', '🔗 Demo dostępne'],
    demoUrl: 'https://zenbarber-demo.vercel.app',
    label: 'Projekt koncepcyjny',
    labelColor: 'badge',
  },
  {
    type: 'concept' as ProjectType,
    title: 'LegalPro — Landing page dla kancelarii',
    desc: 'Landing page budujący autorytet i generujący leady. Formularz kwalifikacyjny, kalkulator kosztów, sekcja FAQ.',
    image: '/portfolio/legalpro.jpg',
    tags: ['Vue 3', 'Vite', 'Zod'],
    results: ['📋 Formularz + walidacja', '🎯 Optymalizacja konwersji', '🔍 SEO strukturalne'],
    demoUrl: '#',
    label: 'Projekt koncepcyjny',
    labelColor: 'badge',
  },
  {
    type: 'corporate' as ProjectType,
    title: 'System raportowania dla firmy finansowej',
    desc: 'Dashboard analityczny do wizualizacji danych finansowych w czasie rzeczywistym. Obsługa 50k+ użytkowników jednocześnie.',
    image: '/portfolio/finance-dashboard.jpg',
    tags: ['Vue 3', 'TypeScript', 'REST API'],
    results: ['👥 50k+ użytkowników', '⚡ Czas ładowania -60%', '🔐 SOC2 compliant'],
    demoUrl: null,
    label: 'Projekt korporacyjny (anonimizowany)',
    labelColor: 'badge-accent',
  },
  {
    type: 'corporate' as ProjectType,
    title: 'Portal B2B dla dystrybutora',
    desc: 'System zamówień B2B z panelem klienta, zarządzaniem katalogiem produktów i integracją z ERP.',
    image: '/portfolio/b2b-portal.jpg',
    tags: ['Vue 3', 'Vuex', 'REST API'],
    results: ['📦 10k+ SKU', '🔄 Integracja ERP', '💼 Panel klienta'],
    demoUrl: null,
    label: 'Projekt korporacyjny (anonimizowany)',
    labelColor: 'badge-accent',
  },
  {
    type: 'personal' as ProjectType,
    title: 'Producktive.pl — Ta strona',
    desc: 'Moja strona wizytówka — jednocześnie demo moich możliwości. Vue 3, TailwindCSS, Supabase, Vercel.',
    image: '/portfolio/producktive.jpg',
    tags: ['Vue 3', 'TailwindCSS', 'Supabase', 'Vercel'],
    results: ['⚡ Lighthouse 98', '🚀 Zbudowana w 14 dni', '📖 Open source'],
    demoUrl: 'https://github.com/twoj-nick/producktive',
    label: 'Własny projekt',
    labelColor: 'badge',
  },
  {
    type: 'personal' as ProjectType,
    title: 'DevNotes — Aplikacja do notatek dla devów',
    desc: 'SaaS MVP: notatki z syntaxhighlighing, organizacja tagami, synchronizacja między urządzeniami.',
    image: '/portfolio/devnotes.jpg',
    tags: ['Vue 3', 'Pinia', 'Supabase', 'CodeMirror'],
    results: ['✏️ Markdown + code', '🔐 Auth + sync', '🌙 Dark mode'],
    demoUrl: '#',
    label: 'Własny projekt',
    labelColor: 'badge',
  },
]

const filtered = () =>
  activeFilter.value === 'all'
    ? projects
    : projects.filter(p => p.type === activeFilter.value)
</script>

<template>
  <section id="portfolio" class="py-24 bg-brand-card/20">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="text-center mb-12 reveal">
        <span class="badge mb-4">Realizacje</span>
        <h2 class="section-title mb-4">
          Co potrafię <span class="text-gradient">zbudować</span>
        </h2>
        <p class="section-subtitle mx-auto">
          Dopiero startuję jako freelancer, ale moje umiejętności są realnie sprawdzone
          w środowiskach korporacyjnych i własnych projektach.
          <strong class="text-white"> Każdy projekt jest szczerze opisany.</strong>
        </p>
      </div>

      <!-- Filtry -->
      <div class="flex flex-wrap justify-center gap-2 mb-10 reveal">
        <button
          v-for="f in filters"
          :key="f.key"
          @click="activeFilter = f.key"
          class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
          :class="activeFilter === f.key
            ? 'bg-gradient-brand text-white shadow-brand'
            : 'bg-brand-card text-brand-muted hover:text-white border border-white/10'"
        >
          {{ f.label }}
        </button>
      </div>

      <!-- Grid projektów -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="project in filtered()"
          :key="project.title"
          class="card overflow-hidden flex flex-col reveal group"
        >
          <!-- Placeholder obrazka z gradientem -->
          <div class="h-44 bg-gradient-brand relative overflow-hidden">
            <div class="absolute inset-0 flex items-center justify-center text-white/20 text-6xl font-bold">
              {{ project.title.charAt(0) }}
            </div>
            <!-- Label typu -->
            <div class="absolute top-3 left-3">
              <span :class="project.labelColor" class="text-xs">{{ project.label }}</span>
            </div>
            <!-- Overlay na hover -->
            <div class="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                        flex items-center justify-center gap-3">
              <a v-if="project.demoUrl"
                 :href="project.demoUrl" target="_blank"
                 class="btn-primary text-sm py-2 px-4">
                Zobacz demo →
              </a>
              <span v-else class="text-white/70 text-sm bg-black/50 px-3 py-1.5 rounded-lg">
                🔒 NDA — brak demo
              </span>
            </div>
          </div>

          <!-- Treść -->
          <div class="p-5 flex flex-col gap-3 flex-1">
            <h3 class="font-display font-bold text-white leading-tight">{{ project.title }}</h3>
            <p class="text-brand-muted text-sm leading-relaxed">{{ project.desc }}</p>

            <!-- Results -->
            <div class="space-y-1">
              <span v-for="r in project.results" :key="r" class="block text-xs text-brand-muted/80">{{ r }}</span>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-white/5">
              <span v-for="tag in project.tags" :key="tag" class="badge text-xs">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA: "Twój projekt mógłby tu być" -->
      <div class="mt-12 text-center reveal">
        <div class="card-gradient p-8 rounded-2xl">
          <div class="text-4xl mb-3">🤝</div>
          <h3 class="font-display text-xl font-bold text-white mb-2">
            Twój projekt mógłby być następny
          </h3>
          <p class="text-brand-muted text-sm mb-5">
            Szukam pierwszych klientów, którzy chcą dostać korporacyjną jakość w przystępnej cenie.
            W zamian — pełne zaangażowanie i realna obniżka ceny dla pionierów.
          </p>
          <a href="#kontakt" class="btn-primary inline-flex">
            Zostań pierwszym klientem →
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
