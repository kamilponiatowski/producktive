<script setup lang="ts">
const { t } = useI18n()

const steps = [
  {
    number: '01',
    key: 'consultation',
    svgPath: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6" aria-hidden="true"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
  },
  {
    number: '02',
    key: 'proposal',
    svgPath: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  },
  {
    number: '03',
    key: 'design',
    svgPath: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
  },
  {
    number: '04',
    key: 'development',
    svgPath: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  },
  {
    number: '05',
    key: 'launch',
    svgPath: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>`,
  },
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
            class="relative reveal lg:flex lg:items-center lg:min-h-[100px] lg:py-3"
            :class="i % 2 !== 0 ? 'lg:-mt-16' : ''"
            :style="{ transitionDelay: `${i * 100}ms` }"
          >
            <!-- Number dot -->
            <div
              class="absolute z-10 flex items-center justify-center rounded-full font-mono font-bold text-brand-primary bg-brand-card border-2 border-brand-primary shadow-brand left-0 top-4 w-7 h-7 text-xs lg:left-1/2 lg:-translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:w-12 lg:h-12 lg:text-sm"
              aria-hidden="true"
            >
              {{ step.number }}
            </div>

            <!-- Horizontal dashed connector (desktop only) -->
            <div
              class="absolute hidden lg:block top-1/2"
              :class="i % 2 === 0 ? 'left-[45%] right-[50%]' : 'left-[50%] right-[45%]'"
              style="height: 1px; border-top: 1px dashed rgba(0, 229, 255, 0.22); transform: translateY(-0.5px);"
              aria-hidden="true"
            />

            <!-- Card -->
            <div
              class="pl-10 lg:pl-0 lg:w-[45%]"
              :class="i % 2 === 0 ? 'lg:mr-auto lg:pr-16' : 'lg:ml-auto lg:pl-16'"
            >
              <div
                class="card p-5 lg:p-6 hover:border-brand-primary/40 transition-colors duration-300"
              >
                <div class="flex items-start gap-3 mb-2">
                  <span class="text-brand-primary shrink-0 mt-0.5" v-html="step.svgPath" />
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
