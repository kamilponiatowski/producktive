<script setup lang="ts">
const { t } = useI18n()

const accepted = useCookie('cookie_consent', { maxAge: 60 * 60 * 24 * 365, default: () => '' })
const show = ref(false)

onMounted(() => {
  if (!accepted.value) {
    show.value = true
  }
})

const accept = () => {
  accepted.value = 'accepted'
  show.value = false
}

const reject = () => {
  accepted.value = 'rejected'
  show.value = false
}
</script>

<template>
  <Transition name="slide-up">
    <div
      v-if="show"
      class="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      role="dialog"
      :aria-label="t('cookie.title')"
    >
      <div
        class="max-w-2xl mx-auto bg-brand-card/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-card flex flex-col sm:flex-row items-start sm:items-center gap-4"
      >
        <div class="flex-1">
          <p class="text-white text-sm font-semibold mb-1">{{ t('cookie.title') }}</p>
          <p class="text-brand-muted text-xs leading-relaxed">
            {{ t('cookie.desc') }}
          </p>
        </div>
        <div class="flex gap-2 shrink-0">
          <button
            class="btn-ghost text-xs border border-white/10 rounded-lg px-3 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            @click="reject"
          >
            {{ t('cookie.reject') }}
          </button>
          <button
            class="btn-primary text-xs px-4 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            @click="accept"
          >
            {{ t('cookie.accept') }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
