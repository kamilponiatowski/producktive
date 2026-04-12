<script setup lang="ts">
import { useContactForm } from '@/composables/useContactForm'

const { form, errors, loading, success, serverError, submit, validateField } = useContactForm()

const calendlyUrl = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com'

const services = [
  'Strona wizytówka',
  'Landing Page',
  'Sklep online',
  'Blog / Content',
  'Produkt cyfrowy / SaaS',
  'UI/UX Design',
  'Inne',
]
const budgets = [
  { value: 'under-2k',  label: 'do 2 000 zł' },
  { value: '2k-5k',     label: '2 000 – 5 000 zł' },
  { value: '5k-15k',    label: '5 000 – 15 000 zł' },
  { value: 'over-15k',  label: 'ponad 15 000 zł' },
  { value: 'unknown',   label: 'Nie wiem jeszcze' },
]
</script>

<template>
  <section id="kontakt" class="py-24 relative overflow-hidden">

    <div class="glow-orb w-[600px] h-[600px] bg-brand-accent/10 bottom-[-200px] right-[-200px]" />

    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="text-center mb-16 reveal">
        <span class="badge mb-4">Kontakt</span>
        <h2 class="section-title mb-4">
          Masz projekt? <span class="text-gradient">Porozmawiajmy.</span>
        </h2>
        <p class="section-subtitle mx-auto">
          Pierwsza konsultacja 30 min jest bezpłatna i niezobowiązująca.
          Odpowiadam w ciągu 24 godzin.
        </p>
      </div>

      <div class="grid lg:grid-cols-5 gap-12">

        <!-- Left: Formularz (3 col) -->
        <div class="lg:col-span-3 reveal">

          <!-- SUCCESS STATE -->
          <Transition name="fade">
            <div v-if="success" class="card p-8 text-center">
              <div class="text-5xl mb-4">🎉</div>
              <h3 class="font-display text-xl font-bold text-white mb-2">Wiadomość wysłana!</h3>
              <p class="text-brand-muted">
                Odezwę się w ciągu 24 godzin. Sprawdź też folder spam — niekiedy tam ląduje.
              </p>
            </div>
          </Transition>

          <form v-if="!success" @submit.prevent="submit" class="space-y-5 card p-6">

            <!-- Honeypot — ukryte przed użytkownikiem, boty to wypełnią -->
            <input
              v-model="form.honeypot"
              type="text"
              name="website"
              autocomplete="off"
              tabindex="-1"
              class="hidden"
            />

            <!-- Imię -->
            <div>
              <label class="block text-sm text-white/70 mb-1.5">Imię i nazwisko *</label>
              <input
                v-model="form.name"
                @blur="validateField('name')"
                type="text"
                placeholder="Jan Kowalski"
                class="w-full bg-brand-dark border rounded-xl px-4 py-3 text-white placeholder-brand-muted/50
                       focus:outline-none focus:border-brand-primary transition-colors"
                :class="errors.name ? 'border-red-500/50' : 'border-white/10'"
              />
              <p v-if="errors.name" class="text-red-400 text-xs mt-1">{{ errors.name }}</p>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm text-white/70 mb-1.5">Email *</label>
              <input
                v-model="form.email"
                @blur="validateField('email')"
                type="email"
                placeholder="jan@firma.pl"
                class="w-full bg-brand-dark border rounded-xl px-4 py-3 text-white placeholder-brand-muted/50
                       focus:outline-none focus:border-brand-primary transition-colors"
                :class="errors.email ? 'border-red-500/50' : 'border-white/10'"
              />
              <p v-if="errors.email" class="text-red-400 text-xs mt-1">{{ errors.email }}</p>
            </div>

            <!-- Usługa + Budżet obok siebie -->
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-white/70 mb-1.5">Czego potrzebujesz? *</label>
                <select
                  v-model="form.service"
                  @change="validateField('service')"
                  class="w-full bg-brand-dark border rounded-xl px-4 py-3 text-white
                         focus:outline-none focus:border-brand-primary transition-colors appearance-none"
                  :class="errors.service ? 'border-red-500/50' : 'border-white/10'"
                >
                  <option value="" disabled>Wybierz usługę</option>
                  <option v-for="s in services" :key="s" :value="s">{{ s }}</option>
                </select>
                <p v-if="errors.service" class="text-red-400 text-xs mt-1">{{ errors.service }}</p>
              </div>

              <div>
                <label class="block text-sm text-white/70 mb-1.5">Budżet *</label>
                <select
                  v-model="form.budget"
                  @change="validateField('budget')"
                  class="w-full bg-brand-dark border rounded-xl px-4 py-3 text-white
                         focus:outline-none focus:border-brand-primary transition-colors appearance-none"
                  :class="errors.budget ? 'border-red-500/50' : 'border-white/10'"
                >
                  <option value="" disabled>Wybierz przedział</option>
                  <option v-for="b in budgets" :key="b.value" :value="b.value">{{ b.label }}</option>
                </select>
                <p v-if="errors.budget" class="text-red-400 text-xs mt-1">{{ errors.budget }}</p>
              </div>
            </div>

            <!-- Wiadomość -->
            <div>
              <label class="block text-sm text-white/70 mb-1.5">Opis projektu *</label>
              <textarea
                v-model="form.message"
                @blur="validateField('message')"
                rows="5"
                placeholder="Opisz czym zajmuje się Twoja firma i czego potrzebujesz. Im więcej szczegółów, tym precyzyjniejsza wycena."
                class="w-full bg-brand-dark border rounded-xl px-4 py-3 text-white placeholder-brand-muted/50
                       focus:outline-none focus:border-brand-primary transition-colors resize-none"
                :class="errors.message ? 'border-red-500/50' : 'border-white/10'"
              />
              <div class="flex justify-between mt-1">
                <p v-if="errors.message" class="text-red-400 text-xs">{{ errors.message }}</p>
                <p class="text-brand-muted text-xs ml-auto">{{ form.message.length }}/2000</p>
              </div>
            </div>

            <!-- Server error -->
            <p v-if="serverError" class="text-red-400 text-sm p-3 bg-red-500/10 rounded-xl">
              {{ serverError }}
            </p>

            <!-- Submit -->
            <button
              type="submit"
              :disabled="loading"
              class="btn-primary w-full justify-center py-4 text-base"
              :class="loading ? 'opacity-70 cursor-not-allowed' : ''"
            >
              <svg v-if="loading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              <span>{{ loading ? 'Wysyłanie...' : 'Wyślij wiadomość →' }}</span>
            </button>

            <p class="text-brand-muted text-xs text-center">
              🔒 Twoje dane są bezpieczne. Nie udostępniam ich osobom trzecim.
            </p>
          </form>
        </div>

        <!-- Right: Dodatkowe info (2 col) -->
        <div class="lg:col-span-2 space-y-6 reveal" style="transition-delay:150ms">

          <!-- === CTA: Bezpośrednia rezerwacja === -->
          <div class="card-gradient p-6 text-center">
            <div class="text-4xl mb-3">📅</div>
            <h3 class="font-display font-bold text-white text-lg mb-2">
              Wolisz od razu umówić rozmowę?
            </h3>
            <p class="text-brand-muted text-sm leading-relaxed mb-5">
              Wybierz wolny termin w kalendarzu — bezpłatna konsultacja 30 min.
              Zero zobowiązań.
            </p>
            <a
              :href="calendlyUrl"
              target="_blank"
              rel="noopener"
              class="btn-primary w-full justify-center py-3.5 text-sm"
            >
              <span>Zarezerwuj termin →</span>
            </a>
            <p class="text-brand-muted/60 text-xs mt-3">
              Potwierdzenie i przypomnienie przyjdą automatycznie na email
            </p>
          </div>

          <!-- === Kontakt bezpośredni === -->
          <div class="card p-5 space-y-3">
            <h3 class="font-semibold text-white text-sm">Wolisz pisać bezpośrednio?</h3>
            <a href="mailto:kontakt@producktive.pl"
               class="flex items-center gap-3 text-brand-muted hover:text-white transition-colors text-sm group">
              <div class="w-9 h-9 rounded-xl bg-brand-primary/15 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary/25 shrink-0">
                📧
              </div>
              kontakt@producktive.pl
            </a>
          </div>

          <!-- Gwarancja → klucz dla braku referencji -->
          <div class="card-gradient p-5">
            <div class="text-2xl mb-3">🛡️</div>
            <h3 class="font-semibold text-white mb-2">Gwarancja satysfakcji</h3>
            <p class="text-brand-muted text-sm leading-relaxed">
              Jeśli nie będziesz zadowolony z projektu na etapie designu,
              <strong class="text-white">zwracam 100% zaliczki.</strong>
              Chcę, żebyś polecił mnie swoim znajomym, nie żałował.
            </p>
          </div>

          <!-- FAQ mini -->
          <div class="card p-5 space-y-3">
            <h3 class="font-semibold text-white mb-1">FAQ</h3>
            <div class="text-sm space-y-3">
              <div>
                <div class="text-white/80 font-medium">Ile trwa realizacja?</div>
                <div class="text-brand-muted">Strona wizytówka: 7–14 dni. Sklep: 14–21 dni.</div>
              </div>
              <div>
                <div class="text-white/80 font-medium">Co potrzebuję przygotować?</div>
                <div class="text-brand-muted">Tekst + logo (opcjonalnie). Resztą się zajmę.</div>
              </div>
              <div>
                <div class="text-white/80 font-medium">Czy mogę potem samodzielnie edytować?</div>
                <div class="text-brand-muted">Tak. Dostajesz szkolenie z CMS i dostęp do kodu.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
