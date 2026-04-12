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

defineOgImageComponent('NuxtSeo', {
  title: t('meta.ogTitle'),
  description: t('meta.ogDescription'),
})
</script>

<template>
  <div>
    <SectionsHero />
    <SectionsTrustBar />
    <SectionsServices />
    <SectionsPortfolio />
    <SectionsAbout />
    <SectionsProcess />
    <SectionsContact />
  </div>
</template>
