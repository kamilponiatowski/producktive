<script setup lang="ts">
const { t } = useI18n()
const config = useRuntimeConfig()

const { form, errors, loading, success, serverError, submit, validateField, reset } = useContactForm()

const calUrl = config.public.calUrl as string

const serviceKeys = ['website', 'landing', 'blog', 'design', 'other', 'shop', 'saas'] as const
const disabledServices = new Set(['shop', 'saas'])
const budgetKeys = ['3k5k', '5k9k', '9k15k', 'over15k', 'unknown'] as const

// ── File attachment ───────────────────────────────────────
const attachmentFile = ref<File | null>(null)
const attachmentUrl = ref('')
const uploadLoading = ref(false)
const uploadError = ref('')
const fileInputRef = ref<HTMLInputElement | null>(null)

const ALLOWED_TYPES = [
  'application/pdf',
  'image/jpeg', 'image/png', 'image/webp',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
const MAX_FILE_SIZE = 5 * 1024 * 1024

const handleFileChange = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  uploadError.value = ''
  if (file.size > MAX_FILE_SIZE) {
    uploadError.value = t('contact.form.fileTooLarge')
    return
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    uploadError.value = t('contact.form.fileTypeError')
    return
  }

  attachmentFile.value = file
  uploadLoading.value = true
  try {
    const fd = new FormData()
    fd.append('file', file)
    const result = await $fetch<{ url: string }>('/api/upload', { method: 'POST', body: fd })
    attachmentUrl.value = result.url
  } catch {
    uploadError.value = t('contact.form.fileUploadError')
    attachmentFile.value = null
  } finally {
    uploadLoading.value = false
  }
}

const removeAttachment = () => {
  attachmentFile.value = null
  attachmentUrl.value = ''
  uploadError.value = ''
  if (fileInputRef.value) fileInputRef.value.value = ''
}

const toggleService = (key: string) => {
  const idx = form.services.indexOf(key)
  if (idx === -1) {
    form.services.push(key)
  } else {
    form.services.splice(idx, 1)
  }
  validateField('services')
}

const handleSubmit = () => submit(attachmentUrl.value || undefined)
</script>

<template>
  <section
    :id="t('nav.anchors.contact')"
    class="py-24 relative overflow-hidden"
    aria-labelledby="contact-heading"
  >
    <div
      class="glow-orb w-[600px] h-[600px] bg-brand-accent/10 bottom-[-200px] right-[-200px]"
      aria-hidden="true"
    />

    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16 reveal">
        <span class="badge mb-4">{{ t('contact.badge') }}</span>
        <h2 id="contact-heading" class="section-title mb-4">
          {{ t('contact.title') }}
          <span class="text-gradient">{{ t('contact.titleHighlight') }}</span>
        </h2>
        <p class="section-subtitle mx-auto">
          {{ t('contact.subtitle') }}
        </p>
      </div>

      <div class="grid lg:grid-cols-5 gap-12">
        <!-- Left: Form (3 col) -->
        <div class="lg:col-span-3 reveal">
          <!-- SUCCESS STATE -->
          <Transition name="fade">
            <div v-if="success" class="card p-8 text-center" role="alert">
              <div class="flex justify-center mb-4" aria-hidden="true">
                <svg class="w-12 h-12 text-brand-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3 class="font-display text-xl font-bold text-white mb-2">
                {{ t('contact.success.title') }}
              </h3>
              <p class="text-brand-muted mb-6">
                {{ t('contact.success.desc') }}
              </p>
              <button
                type="button"
                class="btn-ghost text-sm"
                @click="reset()"
              >
                {{ t('contact.success.reset') }}
              </button>
            </div>
          </Transition>

          <form
            v-if="!success"
            class="space-y-5 card p-6"
            novalidate
            @submit.prevent="handleSubmit"
          >
            <!-- Honeypot (anti-bot) -->
            <input
              v-model="form.honeypot"
              type="text"
              name="website"
              autocomplete="off"
              tabindex="-1"
              class="hidden"
              aria-hidden="true"
            />

            <!-- Name -->
            <div>
              <label for="contact-name" class="block text-sm text-white/70 mb-1.5">
                {{ t('contact.form.name') }} {{ t('contact.form.required') }}
              </label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                :placeholder="t('contact.form.namePlaceholder')"
                class="w-full bg-brand-dark border rounded-xl px-4 py-3 text-white placeholder-brand-muted/50 focus:outline-none focus:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary transition-colors"
                :class="errors.name ? 'border-red-500/50' : 'border-white/10'"
                :aria-invalid="!!errors.name"
                :aria-describedby="errors.name ? 'name-error' : undefined"
                @blur="validateField('name')"
              />
              <p v-if="errors.name" id="name-error" class="text-red-400 text-xs mt-1" role="alert">
                {{ errors.name }}
              </p>
            </div>

            <!-- Email -->
            <div>
              <label for="contact-email" class="block text-sm text-white/70 mb-1.5">
                {{ t('contact.form.email') }} {{ t('contact.form.required') }}
              </label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                :placeholder="t('contact.form.emailPlaceholder')"
                class="w-full bg-brand-dark border rounded-xl px-4 py-3 text-white placeholder-brand-muted/50 focus:outline-none focus:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary transition-colors"
                :class="errors.email ? 'border-red-500/50' : 'border-white/10'"
                :aria-invalid="!!errors.email"
                :aria-describedby="errors.email ? 'email-error' : undefined"
                @blur="validateField('email')"
              />
              <p v-if="errors.email" id="email-error" class="text-red-400 text-xs mt-1" role="alert">
                {{ errors.email }}
              </p>
            </div>

            <!-- Service — tile selector -->
            <div>
              <div class="block text-sm text-white/70 mb-2" id="service-label">
                {{ t('contact.form.service') }} {{ t('contact.form.required') }}
                <span class="text-xs text-brand-muted/60 font-normal ml-1">{{ t('contact.form.serviceHint') }}</span>
              </div>
              <div
                class="flex flex-wrap gap-2"
                role="group"
                aria-labelledby="service-label"
                :aria-describedby="errors.services ? 'service-error' : undefined"
              >
                <div class="relative group/service" v-for="key in serviceKeys" :key="key">
                  <button
                    type="button"
                    class="px-3 py-1.5 rounded-xl text-xs font-medium border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                    :class="[
                      disabledServices.has(key)
                        ? 'bg-brand-dark border-white/5 text-brand-muted/40 cursor-not-allowed'
                        : form.services.includes(key)
                          ? 'bg-brand-primary/20 border-brand-primary text-brand-primary'
                          : 'bg-brand-dark border-white/10 text-brand-muted hover:border-brand-primary/50 hover:text-white',
                    ]"
                    :aria-pressed="form.services.includes(key)"
                    :disabled="disabledServices.has(key)"
                    @click="toggleService(key)"
                  >
                    {{ t(`contact.services.${key}`) }}
                  </button>
                  <span
                    v-if="disabledServices.has(key)"
                    class="absolute -top-9 left-1/2 -translate-x-1/2 bg-brand-card border border-brand-primary/20 text-brand-muted text-xs rounded-lg px-2 py-1 whitespace-nowrap opacity-0 group-hover/service:opacity-100 transition-opacity duration-200 pointer-events-none z-20 shadow-card"
                  >
                    {{ t('contact.form.comingSoonTooltip') }}
                  </span>
                </div>
              </div>
              <p v-if="errors.services" id="service-error" class="text-red-400 text-xs mt-1" role="alert">
                {{ errors.services }}
              </p>
            </div>

            <!-- Budget — tile selector -->
            <div>
              <div class="block text-sm text-white/70 mb-2" id="budget-label">
                {{ t('contact.form.budget') }} {{ t('contact.form.required') }}
              </div>
              <div
                class="flex flex-wrap gap-2"
                role="group"
                aria-labelledby="budget-label"
                :aria-describedby="errors.budget ? 'budget-error' : undefined"
              >
                <button
                  v-for="key in budgetKeys"
                  :key="key"
                  type="button"
                  class="px-3 py-1.5 rounded-xl text-xs font-medium border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                  :class="
                    form.budget === key
                      ? 'bg-brand-accent/20 border-brand-accent text-brand-accent'
                      : 'bg-brand-dark border-white/10 text-brand-muted hover:border-brand-accent/50 hover:text-white'
                  "
                  :aria-pressed="form.budget === key"
                  @click="form.budget = key; validateField('budget')"
                >
                  {{ t(`contact.budgets.${key}`) }}
                </button>
              </div>
              <p v-if="errors.budget" id="budget-error" class="text-red-400 text-xs mt-1" role="alert">
                {{ errors.budget }}
              </p>
            </div>

            <!-- Message -->
            <div>
              <label for="contact-message" class="block text-sm text-white/70 mb-1.5">
                {{ t('contact.form.message') }} {{ t('contact.form.required') }}
              </label>
              <textarea
                id="contact-message"
                v-model="form.message"
                rows="5"
                :placeholder="t('contact.form.messagePlaceholder')"
                class="w-full bg-brand-dark border rounded-xl px-4 py-3 text-white placeholder-brand-muted/50 focus:outline-none focus:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary transition-colors resize-none"
                :class="errors.message ? 'border-red-500/50' : 'border-white/10'"
                :aria-invalid="!!errors.message"
                :aria-describedby="errors.message ? 'message-error' : 'message-counter'"
                @blur="validateField('message')"
              />
              <div class="flex justify-between mt-1">
                <p v-if="errors.message" id="message-error" class="text-red-400 text-xs" role="alert">
                  {{ errors.message }}
                </p>
                <p id="message-counter" class="text-brand-muted text-xs ml-auto" :class="{ 'text-yellow-400': form.message.length > 4500 }">
                  {{ form.message.length }}/5000
                </p>
              </div>
            </div>

            <!-- Attachment -->
            <div>
              <label for="contact-attachment" class="block text-sm text-white/70 mb-1.5">
                {{ t('contact.form.attachment') }}
                <span class="text-xs text-brand-muted/60 font-normal ml-1">{{ t('contact.form.attachmentHint') }}</span>
              </label>

              <!-- Empty state: dashed drop zone -->
              <div v-if="!attachmentFile">
                <input
                  id="contact-attachment"
                  ref="fileInputRef"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
                  class="sr-only"
                  @change="handleFileChange"
                />
                <label
                  for="contact-attachment"
                  class="flex items-center gap-3 w-full bg-brand-dark border border-dashed border-white/10 rounded-xl px-4 py-3 text-brand-muted text-sm hover:border-brand-primary/50 hover:text-white transition-colors"
                >
                  <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
                  </svg>
                  {{ t('contact.form.attachFile') }}
                </label>
              </div>

              <!-- File selected -->
              <div
                v-else
                class="flex items-center gap-3 bg-brand-dark border rounded-xl px-4 py-3"
                :class="uploadLoading ? 'border-white/10' : attachmentUrl ? 'border-brand-primary/30' : 'border-white/10'"
              >
                <svg v-if="uploadLoading" class="w-4 h-4 animate-spin text-brand-primary shrink-0" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                <svg v-else class="w-4 h-4 text-brand-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span class="text-sm text-white/80 flex-1 truncate">{{ attachmentFile.name }}</span>
                <button
                  type="button"
                  class="text-brand-muted hover:text-red-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
                  :aria-label="t('contact.form.removeFile')"
                  @click="removeAttachment"
                >
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              <p v-if="uploadError" class="text-red-400 text-xs mt-1" role="alert">{{ uploadError }}</p>
              <p v-else-if="attachmentUrl && !uploadLoading" class="text-brand-primary/80 text-xs mt-1">{{ t('contact.form.fileUploaded') }}</p>
            </div>

            <!-- Server error -->
            <p
              v-if="serverError"
              class="text-red-400 text-sm p-3 bg-red-500/10 rounded-xl"
              role="alert"
            >
              {{ serverError }}
            </p>

            <!-- Submit -->
            <button
              type="submit"
              :disabled="loading"
              class="btn-primary w-full justify-center py-4 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
              :class="loading ? 'opacity-70 cursor-not-allowed' : ''"
            >
              <svg v-if="loading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              <span>{{ loading ? t('contact.form.submitting') : t('contact.form.submit') }}</span>
            </button>

            <!-- Security badge -->
            <div class="flex items-center justify-center gap-2 text-brand-muted/60 text-xs">
              <svg class="w-3.5 h-3.5 text-brand-primary/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>Formularz zabezpieczony honeypot + walidacja serwerowa</span>
            </div>

            <p class="text-brand-muted text-xs text-center flex items-center justify-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-brand-primary/60 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              {{ t('contact.form.privacy') }}
            </p>
          </form>
        </div>

        <!-- Right: Additional info (2 col) -->
        <div class="lg:col-span-2 space-y-6 reveal" style="transition-delay: 150ms">
          <!-- Calendar CTA -->
          <div class="card-gradient p-6 text-center">
            <div class="flex justify-center mb-3" aria-hidden="true">
              <svg class="w-10 h-10 text-brand-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <h3 class="font-display font-bold text-white text-lg mb-2">
              {{ t('contact.calendar.title') }}
            </h3>
            <p class="text-brand-muted text-sm leading-relaxed mb-5">
              {{ t('contact.calendar.desc') }}
            </p>
            <a
              :href="calUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary w-full justify-center py-3.5 text-sm animate-pulse-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>{{ t('contact.calendar.cta') }}</span>
            </a>
            <p class="text-brand-muted/60 text-xs mt-3">
              {{ t('contact.calendar.note') }}
            </p>
          </div>

          <!-- Direct contact -->
          <div class="card p-5 space-y-3">
            <h3 class="font-semibold text-white text-sm">{{ t('contact.direct.title') }}</h3>
            <a
              href="mailto:kontakt@producktive.pl"
              class="flex items-center gap-3 text-brand-muted hover:text-white transition-colors text-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
            >
              <div class="w-9 h-9 rounded-xl bg-brand-primary/15 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary/25 shrink-0" aria-hidden="true">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              kontakt@producktive.pl
            </a>
            <a
              href="tel:+48886127854"
              class="flex items-center gap-3 text-brand-muted hover:text-white transition-colors text-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
            >
              <div class="w-9 h-9 rounded-xl bg-brand-primary/15 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary/25 shrink-0" aria-hidden="true">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81A2 2 0 017 6.1l-1.27 1.27a16 16 0 006.29 6.29L13.3 12a2 2 0 012.37-.44A12.84 12.84 0 0018.5 12a2 2 0 011.72 2v.92z"/>
                </svg>
              </div>
              +48 886 127 854
            </a>
          </div>

          <!-- TODO Guarantee — temporarily hidden -->
          <!-- <div class="card-gradient p-5">
            <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-primary/15 mb-3" aria-hidden="true">
              <svg class="w-5 h-5 text-brand-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-white mb-2">{{ t('contact.guarantee.title') }}</h3>
            <p class="text-brand-muted text-sm leading-relaxed">
              {{ t('contact.guarantee.desc', { highlight: t('contact.guarantee.highlight') }).split(t('contact.guarantee.highlight'))[0] }}<strong class="text-white">{{ t('contact.guarantee.highlight') }}</strong>{{ t('contact.guarantee.desc', { highlight: t('contact.guarantee.highlight') }).split(t('contact.guarantee.highlight')).slice(1).join(t('contact.guarantee.highlight')) }}
            </p>
          </div> -->

          <!-- FAQ -->
          <div class="card p-5 space-y-3">
            <h3 class="font-semibold text-white mb-1">{{ t('contact.faq.title') }}</h3>
            <div class="text-sm space-y-3">
              <div v-for="n in 3" :key="n">
                <div class="text-white/80 font-medium">{{ t(`contact.faq.q${n}`) }}</div>
                <div class="text-brand-muted">{{ t(`contact.faq.a${n}`) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>