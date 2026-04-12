<script setup lang="ts">
const { t } = useI18n()

const steps = [
  { number: '01', icon: '🎯', key: 'consultation' },
  { number: '02', icon: '📋', key: 'proposal' },
  { number: '03', icon: '🎨', key: 'design' },
  { number: '04', icon: '⚙️', key: 'development' },
  { number: '05', icon: '🚀', key: 'launch' },
]
</script>

<template>
  <section
    id="proces"
    class="py-24 bg-brand-card/20"
    aria-labelledby="process-heading"
  >
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16 reveal">
        <span class="badge mb-4">{{ t('process.badge') }}</span>
        <h2 id="process-heading" class="section-title mb-4">
          {{ t('process.title') }}
          <span class="text-gradient">{{ t('process.titleHighlight') }}</span>
        </h2>
        <p class="section-subtitle mx-auto">
          {{ t('process.subtitle') }}
        </p>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Desktop vertical line -->
        <div
          class="hidden lg:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-brand-primary/60 via-brand-accent/30 to-transparent"
          aria-hidden="true"
        />
        <!-- Mobile vertical line -->
        <div
          class="lg:hidden absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-brand-primary/60 via-brand-accent/30 to-transparent"
          aria-hidden="true"
        />

        <ol class="flex flex-col gap-6 lg:gap-0 list-none p-0">
          <li
            v-for="(step, i) in steps"
            :key="step.key"
            class="relative reveal lg:flex lg:items-center lg:min-h-[140px] lg:py-8"
            :class="i % 2 !== 0 ? 'lg:-mt-24' : ''"
            :style="{ transitionDelay: `${i * 100}ms` }"
          >
            <!-- Number dot -->
            <div
              class="absolute z-10 flex items-center justify-center rounded-full font-mono font-bold text-brand-primary bg-brand-card border-2 border-brand-primary shadow-brand left-0 top-4 w-7 h-7 text-xs lg:left-1/2 lg:-translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:w-12 lg:h-12 lg:text-sm"
              aria-hidden="true"
            >
              {{ step.number }}
            </div>

            <!-- Card -->
            <div
              class="pl-10 lg:pl-0 lg:w-[45%]"
              :class="i % 2 === 0 ? 'lg:mr-auto lg:pr-16' : 'lg:ml-auto lg:pl-16'"
            >
              <div
                class="card p-5 lg:p-6 hover:border-brand-primary/40 transition-colors duration-300"
              >
                <div class="flex items-start gap-3 mb-2">
                  <span class="text-2xl" aria-hidden="true">{{ step.icon }}</span>
                  <h3 class="text-base lg:text-lg font-semibold text-white leading-snug">
                    {{ t(`process.steps.${step.key}.title`) }}
                  </h3>
                </div>
                <p class="text-brand-muted text-sm leading-relaxed mb-3">
                  {{ t(`process.steps.${step.key}.desc`) }}
                </p>
                <ul class="space-y-1">
                  <li
                    v-for="bulletNum in [1, 2, 3]"
                    :key="bulletNum"
                    class="flex items-start gap-2 text-xs text-brand-muted"
                  >
                    <span class="mt-0.5 text-brand-success shrink-0" aria-hidden="true">✓</span>
                    <span>{{ t(`process.steps.${step.key}.bullet${bulletNum}`) }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
