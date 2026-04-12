<script setup lang="ts">
const { t } = useI18n()

const services = computed(() => [
  {
    icon: '🌐',
    key: 'website',
    tags: ['Vue 3', 'TailwindCSS', 'Vercel'],
    highlight: false,
    comingSoon: false,
  },
  {
    icon: '🚀',
    key: 'landing',
    tags: ['A/B testing', 'Analytics', 'Fast'],
    highlight: true,
    comingSoon: false,
  },
  {
    icon: '📝',
    key: 'blog',
    tags: ['SEO', 'CMS', 'Markdown'],
    highlight: false,
    comingSoon: false,
  },
  {
    icon: '🛒',
    key: 'shop',
    tags: ['WooCommerce', 'Stripe', 'Panel'],
    highlight: false,
    comingSoon: true,
  },
  {
    icon: '📱',
    key: 'saas',
    tags: ['Vue 3', 'Supabase', 'Auth'],
    highlight: false,
    comingSoon: true,
  },
  {
    icon: '🎨',
    key: 'design',
    tags: ['Figma', 'Prototyp', 'Design System'],
    highlight: false,
    comingSoon: false,
  },
])
</script>

<template>
  <section id="uslugi" class="py-24 relative" aria-labelledby="services-heading">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16 reveal">
        <span class="badge mb-4">{{ t('services.badge') }}</span>
        <h2 id="services-heading" class="section-title mb-4">
          {{ t('services.title') }}
          <span class="text-gradient">{{ t('services.titleHighlight') }}</span>
        </h2>
        <p class="section-subtitle mx-auto">
          {{ t('services.subtitle') }}
        </p>
      </div>

      <!-- Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="(service, i) in services"
          :key="service.key"
          class="card p-6 flex flex-col gap-4 reveal relative group"
          :class="[
            service.highlight ? 'border-brand-primary/50 shadow-brand' : '',
            service.comingSoon ? 'opacity-70' : '',
          ]"
          :style="{ transitionDelay: `${i * 80}ms` }"
        >
          <!-- Popular / Coming soon badge -->
          <div
            v-if="service.highlight"
            class="absolute -top-3 left-6 badge-accent text-xs px-3 py-1"
          >
            {{ t('services.popular') }}
          </div>
          <div
            v-if="service.comingSoon"
            class="absolute -top-3 left-6 badge text-xs px-3 py-1 bg-brand-muted/20 text-brand-muted"
          >
            {{ t('services.comingSoon') }}
          </div>

          <!-- Icon + title -->
          <div class="flex items-start gap-3">
            <div class="text-3xl" aria-hidden="true">{{ service.icon }}</div>
            <div>
              <h3 class="font-display font-bold text-lg text-white">
                {{ t(`services.items.${service.key}.title`) }}
              </h3>
              <div class="flex items-center gap-2 mt-1 text-xs text-brand-muted">
                <span>🕐 {{ t(`services.items.${service.key}.days`) }}</span>
                <span aria-hidden="true">·</span>
                <span class="text-brand-accent font-semibold">
                  {{ t(`services.items.${service.key}.price`) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Description -->
          <p class="text-brand-muted text-sm leading-relaxed">
            {{ t(`services.items.${service.key}.desc`) }}
          </p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in service.tags" :key="tag" class="badge text-xs">{{ tag }}</span>
          </div>

          <!-- CTA hover (visible on mobile without hover) -->
          <a
            v-if="!service.comingSoon"
            href="#kontakt"
            class="mt-auto flex items-center gap-2 text-sm font-medium text-brand-primary md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
          >
            {{ t('services.askAbout') }}
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </article>
      </div>

      <!-- Custom project CTA -->
      <div class="mt-8 card-gradient p-6 text-center reveal">
        <p class="text-white font-semibold mb-2">{{ t('services.customTitle') }}</p>
        <p class="text-brand-muted text-sm mb-4">{{ t('services.customDesc') }}</p>
        <a
          href="#kontakt"
          class="btn-primary inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {{ t('services.customCta') }}
        </a>
      </div>
    </div>
  </section>
</template>
