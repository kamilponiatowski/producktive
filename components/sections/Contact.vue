<script setup lang="ts">
const { t } = useI18n()
const config = useRuntimeConfig()

const { form, errors, loading, success, serverError, submit, validateField } = useContactForm()

const calendlyUrl = config.public.calendlyUrl as string

const serviceKeys = ['website', 'landing', 'shop', 'blog', 'saas', 'design', 'other'] as const
const budgetKeys = ['under2k', '2k5k', '5k15k', 'over15k', 'unknown'] as const
</script>

<template>
  <section
    id="kontakt"
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
              <div class="text-5xl mb-4" aria-hidden="true">🎉</div>
              <h3 class="font-display text-xl font-bold text-white mb-2">
                {{ t('contact.success.title') }}
              </h3>
              <p class="text-brand-muted">
                {{ t('contact.success.desc') }}
              </p>
            </div>
          </Transition>

          <form
            v-if="!success"
            class="space-y-5 card p-6"
            novalidate
            @submit.prevent="submit"
          >
            <!-- Honeypot -->
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
              <p
                v-if="errors.name"
                id="name-error"
                class="text-red-400 text-xs mt-1"
                role="alert"
              >
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
              <p
                v-if="errors.email"
                id="email-error"
                class="text-red-400 text-xs mt-1"
                role="alert"
              >
                {{ errors.email }}
              </p>
            </div>

            <!-- Service + Budget side by side -->
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label for="contact-service" class="block text-sm text-white/70 mb-1.5">
                  {{ t('contact.form.service') }} {{ t('contact.form.required') }}
                </label>
                <select
                  id="contact-service"
                  v-model="form.service"
                  class="w-full bg-brand-dark border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary transition-colors appearance-none"
                  :class="errors.service ? 'border-red-500/50' : 'border-white/10'"
                  :aria-invalid="!!errors.service"
                  :aria-describedby="errors.service ? 'service-error' : undefined"
                  @change="validateField('service')"
                >
                  <option value="" disabled>{{ t('contact.form.servicePlaceholder') }}</option>
                  <option v-for="key in serviceKeys" :key="key" :value="key">
                    {{ t(`contact.services.${key}`) }}
                  </option>
                </select>
                <p
                  v-if="errors.service"
                  id="service-error"
                  class="text-red-400 text-xs mt-1"
                  role="alert"
                >
                  {{ errors.service }}
                </p>
              </div>

              <div>
                <label for="contact-budget" class="block text-sm text-white/70 mb-1.5">
                  {{ t('contact.form.budget') }} {{ t('contact.form.required') }}
                </label>
                <select
                  id="contact-budget"
                  v-model="form.budget"
                  class="w-full bg-brand-dark border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary transition-colors appearance-none"
                  :class="errors.budget ? 'border-red-500/50' : 'border-white/10'"
                  :aria-invalid="!!errors.budget"
                  :aria-describedby="errors.budget ? 'budget-error' : undefined"
                  @change="validateField('budget')"
                >
                  <option value="" disabled>{{ t('contact.form.budgetPlaceholder') }}</option>
                  <option v-for="key in budgetKeys" :key="key" :value="key">
                    {{ t(`contact.budgets.${key}`) }}
                  </option>
                </select>
                <p
                  v-if="errors.budget"
                  id="budget-error"
                  class="text-red-400 text-xs mt-1"
                  role="alert"
                >
                  {{ errors.budget }}
                </p>
              </div>
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
                <p
                  v-if="errors.message"
                  id="message-error"
                  class="text-red-400 text-xs"
                  role="alert"
                >
                  {{ errors.message }}
                </p>
                <p id="message-counter" class="text-brand-muted text-xs ml-auto">
                  {{ form.message.length }}/2000
                </p>
              </div>
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
              <svg
                v-if="loading"
                class="w-5 h-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span>{{ loading ? t('contact.form.submitting') : t('contact.form.submit') }}</span>
            </button>

            <p class="text-brand-muted text-xs text-center">
              {{ t('contact.form.privacy') }}
            </p>
          </form>
        </div>

        <!-- Right: Additional info (2 col) -->
        <div class="lg:col-span-2 space-y-6 reveal" style="transition-delay: 150ms">
          <!-- Calendar CTA -->
          <div class="card-gradient p-6 text-center">
            <div class="text-4xl mb-3" aria-hidden="true">📅</div>
            <h3 class="font-display font-bold text-white text-lg mb-2">
              {{ t('contact.calendar.title') }}
            </h3>
            <p class="text-brand-muted text-sm leading-relaxed mb-5">
              {{ t('contact.calendar.desc') }}
            </p>
            <a
              :href="calendlyUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary w-full justify-center py-3.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
              <div
                class="w-9 h-9 rounded-xl bg-brand-primary/15 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary/25 shrink-0"
                aria-hidden="true"
              >
                📧
              </div>
              kontakt@producktive.pl
            </a>
          </div>

          <!-- Guarantee -->
          <div class="card-gradient p-5">
            <div class="text-2xl mb-3" aria-hidden="true">🛡️</div>
            <h3 class="font-semibold text-white mb-2">{{ t('contact.guarantee.title') }}</h3>
            <p class="text-brand-muted text-sm leading-relaxed">
              {{ t('contact.guarantee.desc', { highlight: t('contact.guarantee.highlight') }).split(t('contact.guarantee.highlight'))[0] }}<strong class="text-white">{{ t('contact.guarantee.highlight') }}</strong>{{ t('contact.guarantee.desc', { highlight: t('contact.guarantee.highlight') }).split(t('contact.guarantee.highlight')).slice(1).join(t('contact.guarantee.highlight')) }}
            </p>
          </div>

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
