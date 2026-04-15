<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('meta.title'),
  meta: [
    { name: 'description', content: t('meta.description') },
    { property: 'og:title', content: t('meta.ogTitle') },
    { property: 'og:description', content: t('meta.ogDescription') },
    { property: 'og:type', content: 'website' },
  ],
})

defineOgImage({
  title: t('meta.ogTitle'),
  description: t('meta.ogDescription'),
})

const sectionIds = ['kontakt', 'siec', 'portfolio', 'proces', 'uslugi', 'o-mnie', 'hero']

// Shared flag: NavBar sets this when scrolling to top so observer won't re-add a hash
const scrollingToTop = useState('scrollingToTop', () => false)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (scrollingToTop.value) return
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.id
          if (id === 'hero') {
            // Hero is top section — clear hash
            if (window.location.hash) {
              history.replaceState(null, '', window.location.pathname)
            }
          } else {
            const hash = `#${id}`
            if (window.location.hash !== hash) {
              history.replaceState(null, '', hash)
            }
          }
          break
        }
      }
    },
    { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
  )

  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  }

  onUnmounted(() => observer.disconnect())
})
</script>

<template>
  <div>
    <SectionsHero />
    <SectionsTrustBar />
    <SectionsAbout />
    <SectionsServices />
    <SectionsProcess />
    <SectionsPortfolio />
    <SectionsCommunity />
    <SectionsContact />
  </div>
</template>
