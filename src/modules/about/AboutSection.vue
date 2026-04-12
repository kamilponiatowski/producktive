<script setup lang="ts">
// 🎯 ABOUT STRATEGY:
// "Corporate alumni" — to jest SUPERMOCY, nie słabość
// Pokaż: doświadczenie + procesy + osobowość + wartości
// Krótka historia, szczera, ludzka

const skills = [
  { category: 'Frontend', items: ['Vue 3', 'TypeScript', 'TailwindCSS', 'Vite', 'GSAP'] },
  { category: 'Backend', items: ['Node.js', 'Supabase', 'PostgreSQL', 'REST API', 'Edge Functions'] },
  { category: 'Design', items: ['Figma', 'Design Systems', 'UX Research', 'Prototyping'] },
  { category: 'DevOps', items: ['Vercel', 'GitHub Actions', 'Docker', 'CI/CD'] },
]

const values = [
  { icon: '🎯', title: 'Terminowość', desc: 'Deadline to kontrakt. Pracuję z buforami — dostarczam na czas.' },
  { icon: '💎', title: 'Jakość kodu', desc: 'Koд, który napiszę, musisz być w stanie rozwinąć za 2 lata.' },
  { icon: '🤝', title: 'Partnerstwo', desc: 'Nie jestem tylko wykonawcą. Mówię, gdy coś nie ma sensu.' },
  { icon: '📖', title: 'Transparentność', desc: 'Wiesz, co robię i ile czasu to zajmuje. Bez zaskoczeń.' },
]
</script>

<template>
  <section id="o-mnie" class="py-24 relative overflow-hidden">

    <!-- Glow orb -->
    <div class="glow-orb w-[500px] h-[500px] bg-brand-primary/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="grid lg:grid-cols-2 gap-16 items-start">

        <!-- Left: Historia osobista — kluczowy element zaufania -->
        <div class="reveal">
          <span class="badge mb-4 inline-block">O mnie</span>

          <h2 class="section-title mb-6">
            Korporacyjny deweloper,<br>
            <span class="text-gradient">który wybrał wolność.</span>
          </h2>

          <div class="space-y-4 text-brand-muted leading-relaxed">
            <p>
              Cześć, jestem twórcą <strong class="text-white">Producktive</strong>.
              Przez kilka lat budowałem systemy webowe w dużych korporacjach —
              dashboardy dla dziesiątek tysięcy użytkowników, portale B2B,
              aplikacje używane codziennie przez setki pracowników.
            </p>
            <p>
              Nauczyłem się tam jednej ważnej rzeczy:
              <strong class="text-white">małe firmy potrzebują tej samej jakości
              co korporacje, ale nie mają dostępu do takich zasobów.</strong>
              Postanowiłem to zmienić.
            </p>
            <p>
              Producktive to nie agencja. To <strong class="text-white">ja — jedna osoba</strong>,
              która osobiście zajmuje się Twoim projektem od pierwszej rozmowy
              do wdrożenia. Żadnego przepychania zadań między juniorami.
              Żadnego zapominania ustaleń. Żaden inny projekt nie wchodzi
              w kolizję z Twoim terminem.
            </p>
            <p>
              Dopiero startuję jako freelancer — i właśnie dlatego <strong class="text-white">
              dostajesz moją pełną uwagę</strong> i
              <span class="text-brand-accent font-semibold">ceny niższe niż rynkowe</span>
              w zamian za pierwsze referencje.
            </p>
          </div>

          <!-- CTA osobisty -->
          <div class="mt-8 flex flex-wrap gap-3">
            <a href="#kontakt" class="btn-primary">Porozmawiaj ze mną →</a>
            <a href="https://linkedin.com/in/twoj-profil" target="_blank" class="btn-secondary">
              LinkedIn
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Right: Skills + wartości -->
        <div class="space-y-8 reveal" style="transition-delay: 150ms">

          <!-- Stack technologiczny -->
          <div>
            <h3 class="text-white font-semibold mb-4 flex items-center gap-2">
              <span class="badge">Stack technologiczny</span>
            </h3>
            <div class="space-y-3">
              <div v-for="group in skills" :key="group.category" class="flex flex-wrap items-center gap-2">
                <span class="text-brand-muted text-xs font-mono w-16 shrink-0">{{ group.category }}</span>
                <span v-for="skill in group.items" :key="skill" class="badge text-xs">{{ skill }}</span>
              </div>
            </div>
          </div>

          <div class="divider-gradient" />

          <!-- Wartości -->
          <div>
            <h3 class="text-white font-semibold mb-4">Jak pracuję</h3>
            <div class="grid grid-cols-2 gap-3">
              <div v-for="v in values" :key="v.title"
                   class="card p-4 flex flex-col gap-2">
                <div class="text-2xl">{{ v.icon }}</div>
                <div class="font-semibold text-white text-sm">{{ v.title }}</div>
                <div class="text-brand-muted text-xs leading-relaxed">{{ v.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
