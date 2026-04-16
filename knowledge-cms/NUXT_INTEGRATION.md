# 🚀 Nuxt + Directus: Pobieranie Danych

Masz już CMS, teraz pora na frontend. Oto jak podmienić hardkodowane dane na dynamiczne.

## 1. Instalacja SDK (jeśli nie masz)
W głównym folderze projektu (nie w knowledge-cms):
```bash
npm install @directus/sdk
```

## 2. Composable do pobierania (Przykładowy kod)

Stwórz plik `composables/useKnowledge.ts`:

```typescript
import { createDirectus, rest, readItems } from '@directus/sdk'

export const useKnowledge = () => {
  const config = useRuntimeConfig()
  const { locale } = useI18n() // Jeśli używasz @nuxtjs/i18n

  // Inicjalizacja klienta
  const directus = createDirectus('http://localhost:8055').with(rest())

  const getSeries = async (slug: string) => {
    // Mapowanie locale Nuxta na kod w Directusie
    const langCode = locale.value === 'pl' ? 'pl-PL' : 'en-US'

    return await directus.request(
      readItems('knowledge_series', {
        filter: { slug: { _eq: slug } },
        fields: [
          '*',
          { translations: ['*'] }
        ],
        deep: {
          translations: {
            _filter: { languages_code: { _eq: langCode } }
          }
        }
      })
    )
  }

  const getPostsBySeries = async (seriesSlug: string) => {
    const langCode = locale.value === 'pl' ? 'pl-PL' : 'en-US'
    
    return await directus.request(
      readItems('knowledge_posts', {
        filter: { 
          series: { slug: { _eq: seriesSlug } },
          status: { _eq: 'published' }
        },
        sort: ['sort'],
        fields: [
          'slug', 'emoji', 'reading_time', 'date_created',
          { translations: ['title', 'excerpt'] }
        ],
        deep: {
          translations: {
            _filter: { languages_code: { _eq: langCode } }
          }
        }
      })
    )
  }

  return {
    getSeries,
    getPostsBySeries
  }
}
```

## 3. Wykorzystanie w komponencie Vue

```vue
<script setup>
const { getPostsBySeries } = useKnowledge()
const { data: posts } = await useAsyncData('pinia-posts', () => 
  getPostsBySeries('pinia-od-a-do-z')
)
</script>

<template>
  <div v-for="post in posts" :key="post.slug">
    <h1>{{ post.translations[0]?.title }}</h1>
    <p>{{ post.translations[0]?.excerpt }}</p>
    <div v-html="post.translations[0]?.content"></div>
  </div>
</template>
```

---

## 🛠️ Ostatni krok: Automatyczna Migracja (Opcjonalnie)

Jeśli nie chcesz ręcznie przepisywać 12 postów o Pinii, mogę napisać dla Ciebie skrypt w Node.js, który:
1. Przeczyta Twój plik `data/pinia-series.ts`.
2. Zaloguje się do Directusa.
3. Wyśle tam wszystkie dane jednym kliknięciem.

**Czy chcesz, żebym przygotował taki skrypt migracyjny?**
