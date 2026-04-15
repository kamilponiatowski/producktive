<script setup lang="ts">
const { t } = useI18n()

const show = ref(false)
const phone = ref('')
const consent = ref(false)
const submitting = ref(false)
const submitted = ref(false)
const submitError = ref(false)
const phoneError = ref('')

const POPUP_STORAGE_KEY = 'popup-last-shown'
const ONE_DAY_MS = 86_400_000

onMounted(() => {
  if (typeof localStorage === 'undefined') return
  const lastShown = Number(localStorage.getItem(POPUP_STORAGE_KEY) || 0)
  if (Date.now() - lastShown > ONE_DAY_MS) {
    // UX best practice: 35s lets the user read content before being interrupted
    setTimeout(() => {
      show.value = true
      localStorage.setItem(POPUP_STORAGE_KEY, String(Date.now()))
    }, 35_000)
  }
})

const close = () => {
  show.value = false
}

// Basic phone validation
const validatePhone = () => {
  const cleaned = phone.value.replace(/[\s\-()]/g, '')
  if (!cleaned) {
    phoneError.value = 'Podaj numer telefonu'
    return false
  }
  if (!/^\+?[0-9]{9,15}$/.test(cleaned)) {
    phoneError.value = 'Nieprawidłowy numer telefonu'
    return false
  }
  phoneError.value = ''
  return true
}

const handleSubmit = async () => {
  if (!validatePhone()) return
  if (!consent.value) return

  submitting.value = true
  submitError.value = false
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: 'Popup',
        email: 'popup@popup.pl',
        services: ['other'],
        budget: 'unknown',
        message: `Numer telefonu z popupu: ${phone.value}`,
        honeypot: '',
      },
    })
    submitted.value = true
  } catch {
    submitError.value = true
  } finally {
    submitting.value = false
  }
}

// Close on Escape key
onMounted(() => {
  const handler = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && show.value) close()
  }
  window.addEventListener('keydown', handler)
  onUnmounted(() => window.removeEventListener('keydown', handler))
})
</script>

<template>
  <Transition name="popup">
    <div
      v-if="show"
      class="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      :aria-label="t('popup.title')"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-brand-dark/70 backdrop-blur-sm"
        aria-hidden="true"
        @click="close"
      />

      <!-- Modal -->
      <div class="relative w-full max-w-sm bg-brand-card border border-brand-primary/20 rounded-2xl p-6 shadow-brand z-10">
        <!-- Close -->
        <button
          class="absolute top-4 right-4 w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-brand-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          :aria-label="t('popup.close')"
          @click="close"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <!-- Success state -->
        <Transition name="fade">
          <div v-if="submitted" class="text-center py-4">
            <div class="flex justify-center mb-3" aria-hidden="true">
              <svg class="w-12 h-12 text-brand-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <p class="text-white font-semibold">{{ t('popup.success') }}</p>
          </div>
        </Transition>

        <!-- Form -->
        <div v-if="!submitted">
          <!-- Icon -->
          <div class="flex justify-center mb-4" aria-hidden="true">
            <div class="w-12 h-12 rounded-xl bg-brand-primary/15 flex items-center justify-center text-brand-primary">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81A2 2 0 017 6.1l-1.27 1.27a16 16 0 006.29 6.29L13.3 12a2 2 0 012.37-.44A12.84 12.84 0 0018.5 12a2 2 0 011.72 2v.92z"/>
              </svg>
            </div>
          </div>

          <h2 class="text-white font-display font-bold text-xl text-center mb-1">
            {{ t('popup.title') }}
          </h2>
          <p class="text-brand-muted text-sm text-center mb-5 leading-relaxed">
            {{ t('popup.desc') }}
          </p>

          <form novalidate @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Honeypot -->
            <input type="text" name="website_popup" autocomplete="off" tabindex="-1" class="hidden" aria-hidden="true" />

            <!-- Phone -->
            <div>
              <label for="popup-phone" class="block text-sm text-white/70 mb-1.5">
                Numer telefonu <span aria-hidden="true">*</span>
              </label>
              <input
                id="popup-phone"
                v-model="phone"
                type="tel"
                :placeholder="t('popup.phonePlaceholder')"
                autocomplete="tel"
                class="w-full bg-brand-dark border rounded-xl px-4 py-3 text-white placeholder-brand-muted/50 focus:outline-none focus:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary transition-colors"
                :class="phoneError ? 'border-red-500/50' : 'border-white/10'"
                :aria-invalid="!!phoneError"
                :aria-describedby="phoneError ? 'popup-phone-error' : undefined"
                @blur="validatePhone"
              />
              <p v-if="phoneError" id="popup-phone-error" class="text-red-400 text-xs mt-1" role="alert">
                {{ phoneError }}
              </p>
            </div>

            <!-- Consent -->
            <label class="flex items-start gap-3 cursor-pointer group">
              <div class="relative mt-0.5 shrink-0">
                <input
                  v-model="consent"
                  type="checkbox"
                  class="sr-only"
                  required
                  aria-required="true"
                />
                <div
                  class="w-4 h-4 rounded border-2 transition-all duration-150 flex items-center justify-center"
                  :class="consent
                    ? 'bg-brand-primary border-brand-primary'
                    : 'border-white/30 bg-transparent group-hover:border-brand-primary/50'"
                  aria-hidden="true"
                >
                  <svg v-if="consent" class="w-2.5 h-2.5 text-brand-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
              </div>
              <span class="text-brand-muted text-xs leading-relaxed">
                {{ t('popup.consent') }}
                <NuxtLink to="/polityka-prywatnosci" class="text-brand-primary underline" @click.stop>Polityka prywatności</NuxtLink>.
              </span>
            </label>

            <button
              type="submit"
              :disabled="submitting || !consent"
              class="btn-primary w-full justify-center py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              :class="(submitting || !consent) ? 'opacity-60 cursor-not-allowed' : ''"
            >
              <svg v-if="submitting" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              {{ submitting ? t('popup.submitting') : t('popup.submit') }}
            </button>

            <!-- Error state -->
            <Transition name="fade">
              <div
                v-if="submitError"
                class="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20"
                role="alert"
              >
                <svg class="w-4 h-4 text-red-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p class="text-red-400 text-xs leading-relaxed">
                  Coś poszło nie tak. Napisz bezpośrednio na
                  <a href="mailto:kontakt@producktive.pl" class="underline hover:text-red-300 transition-colors">kontakt@producktive.pl</a>
                </p>
              </div>
            </Transition>

            <p class="text-brand-muted/50 text-xs text-center flex items-center justify-center gap-1.5">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              {{ t('popup.privacy') }}
            </p>
          </form>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.popup-enter-active {
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.popup-leave-active {
  transition: all 0.2s ease;
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: scale(0.92) translateY(16px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
