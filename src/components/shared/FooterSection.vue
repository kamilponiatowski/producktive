<script setup lang="ts">
const year = new Date().getFullYear()

const links = [
  { label: 'Usługi',    href: '#uslugi' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'O mnie',   href: '#o-mnie' },
  { label: 'Kontakt',  href: '#kontakt' },
]
const legal = [
  { label: 'Polityka prywatności', href: '/privacy' },
  { label: 'Regulamin',            href: '/terms' },
]
</script>

<template>
  <footer class="border-t border-white/5 bg-brand-card/30">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid sm:grid-cols-3 gap-8 mb-8">

        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center font-bold text-white text-sm font-mono">P</div>
            <span class="font-display font-bold text-white">Producktive</span>
          </div>
          <p class="text-brand-muted text-sm leading-relaxed">
            Tworzę strony i produkty cyfrowe, które pracują na Twój biznes.
            Korporacyjna jakość, ludzkie podejście.
          </p>
        </div>

        <!-- Navigation -->
        <div>
          <div class="text-white/50 text-xs font-mono uppercase tracking-wider mb-3">Nawigacja</div>
          <div class="space-y-2">
            <a v-for="link in links" :key="link.href"
               :href="link.href"
               class="block text-brand-muted hover:text-white transition-colors text-sm">
              {{ link.label }}
            </a>
          </div>
        </div>

        <!-- Contact -->
        <div>
          <div class="text-white/50 text-xs font-mono uppercase tracking-wider mb-3">Kontakt</div>
          <div class="space-y-2 text-sm text-brand-muted">
            <a href="mailto:kontakt@producktive.pl" class="block hover:text-white transition-colors">
              kontakt@producktive.pl
            </a>
            <a href="https://linkedin.com/in/producktive" target="_blank" class="block hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com/producktive" target="_blank" class="block hover:text-white transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div class="divider-gradient" />

      <div class="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-brand-muted">
        <span>© {{ year }} Producktive. Wszelkie prawa zastrzeżone.</span>
        <div class="flex gap-4">
          <a v-for="l in legal" :key="l.href" :href="l.href"
             class="hover:text-white transition-colors">{{ l.label }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>
