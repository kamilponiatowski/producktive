# 🏗️ Directus + Nuxt 3: Przewodnik konfiguracji headless CMS dla Twojego bloga

## 📖 Czym jest Directus?

**Directus** to open-source'owy headless CMS (Content Management System), który daje Ci:
- **Panel administracyjny** – piękny UI do zarządzania treścią (jak WordPress, ale bez frontendu)
- **REST API + GraphQL API** – automatycznie generowane na podstawie Twoich kolekcji
- **Pełna kontrola nad danymi** – Twoje dane, Twoja baza, Twoje zasady
- **Self-hosted lub Cloud** – hostuj na własnym serwerze lub korzystaj z Directus Cloud

Dlaczego Directus + Nuxt? Bo Directus zarządza **treścią** (posty, kategorie, media), a Nuxt renderuje **frontend** (SSR, SSG, ISR). Idealne combo dla blogów, portfolio i stron contentowych! 🎯

---

## 🚀 Krok 1: Instalacja Directus

### Opcja A: Docker (Zalecane na produkcji)

```bash
# Utwórz folder projektu
mkdir my-blog-cms && cd my-blog-cms

# Stwórz docker-compose.yml
```

```yaml
# 📄 docker-compose.yml
version: '3'
services:
  directus:
    image: directus/directus:latest
    ports:
      - 8055:8055
    volumes:
      - ./database:/directus/database
      - ./uploads:/directus/uploads
      - ./extensions:/directus/extensions
    environment:
      SECRET: 'twoj-super-tajny-klucz-zmien-mnie'
      ADMIN_EMAIL: 'admin@example.com'
      ADMIN_PASSWORD: 'twoje-haslo-admina'
      DB_CLIENT: 'sqlite3'
      DB_FILENAME: '/directus/database/data.db'
      WEBSOCKETS_ENABLED: 'true'
```

```bash
# Odpal Directus!
docker compose up -d
```

Teraz otwórz `http://localhost:8055` – voilà, masz panel admina! 🎉

> 💡 **Na produkcji** zamień SQLite na PostgreSQL lub MySQL. SQLite jest super do developmentu, ale nie do produkcji.

### Opcja B: npx (Szybki start do developmentu)

```bash
npx create-directus-project my-blog-cms
```

Wizard przeprowadzi Cię przez konfigurację DB i konta admina. Po zakończeniu:

```bash
cd my-blog-cms
npx directus start
```

### Opcja C: Directus Cloud (Zero konfiguracji)

Wejdź na [directus.cloud](https://directus.cloud/), załóż konto i stwórz projekt. Dostajesz gotowy URL API i panel admina. Idealny na start! ☁️

---

## 🗄️ Krok 2: Tworzenie kolekcji (Data Model)

Po zalogowaniu się do panelu Directus (`http://localhost:8055`), przechodzimy do **Settings → Data Model** i tworzymy kolekcje dla naszego bloga.

### 📝 Kolekcja: `posts` (Wpisy blogowe)

Kliknij **"Create Collection"** i dodaj:

| Pole | Typ | Opis |
| :--- | :--- | :--- |
| `id` | Auto (UUID lub Integer) | Generowane automatycznie |
| `status` | String (Dropdown) | `draft`, `published`, `archived` |
| `title` | String | Tytuł posta |
| `slug` | String | URL-friendly identyfikator (np. `pinia-podstawy`) |
| `excerpt` | Text | Krótki opis / zajawka |
| `content` | WYSIWYG / Markdown | Treść posta (Markdown!) |
| `cover_image` | Image (File) | Obrazek tytułowy |
| `category` | String | Kategoria (np. `vue`, `pinia`, `nuxt`) |
| `tags` | JSON | Tagi jako tablica stringów |
| `series_name` | String | Nazwa serii (np. `Pinia od A do Z`) |
| `sort_order` | Integer | Kolejność w serii |
| `reading_time` | Integer | Czas czytania w minutach |
| `date_created` | Datetime | Auto – data utworzenia |
| `date_updated` | Datetime | Auto – data aktualizacji |

### Konfiguracja pól w Directus UI:

1. **Status** – Kliknij pole → Interface: Dropdown → Opcje: `draft, published, archived`
2. **Slug** – Ustaw jako **unique**. Możesz też dodać custom hook, który generuje slug z tytułu
3. **Content** – Interface: **WYSIWYG** (jeśli wolisz rich text) lub **Markdown** (polecam dla devów!)
4. **Tags** – Interface: **Tags** (Directus ma wbudowany interfejs do tagów!)
5. **Cover Image** – Interface: **Image** → Directus automatycznie zarządza uploadami

### 📂 Kolekcja: `categories` (Opcjonalnie – jeśli potrzebujesz relacji)

Jeśli chcesz bardziej rozbudowane kategorie:

| Pole | Typ |
| :--- | :--- |
| `id` | Auto |
| `name` | String |
| `slug` | String |
| `description` | Text |
| `color` | String (Color picker) |

Potem w kolekcji `posts` zamień pole `category` na **Many-to-One** relację do `categories`.

---

## 🔑 Krok 3: Role i uprawnienia API

Directus domyślnie blokuje dostęp do API. Musimy skonfigurować publiczny dostęp do odczytu postów.

### Dostęp publiczny (dla frontendu):

1. Idź do **Settings → Access Policies → Public**
2. Kliknij **"Add Collection"** i dodaj `posts`
3. Ustaw uprawnienia:
   - **Read** ✅ (z filtrem: `status equals published`) 
   - **Create** ❌
   - **Update** ❌
   - **Delete** ❌

> ⚠️ **Ważne:** Filtr `status = published` sprawia, że publiczne API zwróci **tylko** opublikowane posty. Drafty i archiwalne zostaną ukryte. Bezpieczeństwo! 🔒

### Token do panelu admina (opcjonalnie):

Jeśli potrzebujesz uwierzytelnionych zapytań (np. preview draftów):

1. Idź do **Settings → Access Policies**
2. Stwórz nowy token statyczny lub użyj tokenu odpowiadającego podłączonemu userowi
3. Użyj go w nagłówku: `Authorization: Bearer <twoj-token>`

---

## 🌐 Krok 4: API Directus – jak pobierać dane?

Directus automatycznie generuje REST API na bazie Twoich kolekcji. Oto endpointy:

### REST API

```bash
# Pobierz wszystkie opublikowane posty
GET http://localhost:8055/items/posts?filter[status][_eq]=published&sort=-date_created

# Pobierz post po slugu
GET http://localhost:8055/items/posts?filter[slug][_eq]=pinia-podstawy

# Pobierz posty z serii
GET http://localhost:8055/items/posts?filter[series_name][_eq]=Pinia od A do Z&sort=sort_order

# Pobierz posty z paginacją
GET http://localhost:8055/items/posts?limit=10&offset=0&meta=filter_count

# Pobierz posty z wybranymi polami
GET http://localhost:8055/items/posts?fields=id,title,slug,excerpt,cover_image,category,date_created
```

### GraphQL API

Directus ma też GraphQL! Endpoint: `http://localhost:8055/graphql`

```graphql
query {
  posts(filter: { status: { _eq: "published" } }, sort: ["-date_created"]) {
    id
    title
    slug
    excerpt
    content
    cover_image {
      id
      filename_download
    }
    category
    tags
    date_created
  }
}
```

---

## 🟢 Krok 5: Konfiguracja Nuxt 3

### Instalacja Nuxt

```bash
npx nuxi@latest init my-blog-frontend
cd my-blog-frontend
npm install
```

### Konfiguracja zmiennych środowiskowych

```bash
# 📄 .env
DIRECTUS_URL=http://localhost:8055
```

```typescript
// 📄 nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      directusUrl: process.env.DIRECTUS_URL || 'http://localhost:8055'
    }
  }
})
```

### Composable do Directus API

```typescript
// 📄 composables/useDirectus.ts
export function useDirectus() {
  const config = useRuntimeConfig()
  const baseURL = config.public.directusUrl

  async function fetchPosts(params = {}) {
    const query = new URLSearchParams({
      'filter[status][_eq]': 'published',
      'sort': '-date_created',
      'fields': 'id,title,slug,excerpt,cover_image,category,tags,reading_time,date_created',
      ...params
    })

    const { data } = await useFetch(`${baseURL}/items/posts?${query}`)
    return data
  }

  async function fetchPostBySlug(slug: string) {
    const { data } = await useFetch(
      `${baseURL}/items/posts`, {
        params: {
          'filter[slug][_eq]': slug,
          'filter[status][_eq]': 'published',
          'fields': '*',
          'limit': 1
        }
      }
    )
    return data
  }

  async function fetchPostsBySeries(seriesName: string) {
    const { data } = await useFetch(
      `${baseURL}/items/posts`, {
        params: {
          'filter[series_name][_eq]': seriesName,
          'filter[status][_eq]': 'published',
          'sort': 'sort_order',
          'fields': 'id,title,slug,excerpt,sort_order,reading_time'
        }
      }
    )
    return data
  }

  function getImageUrl(imageId: string) {
    return `${baseURL}/assets/${imageId}`
  }

  return { fetchPosts, fetchPostBySlug, fetchPostsBySeries, getImageUrl }
}
```

### Strona z listą postów

```vue
<!-- 📄 pages/blog/index.vue -->
<script setup>
const { fetchPosts, getImageUrl } = useDirectus()
const posts = await fetchPosts()
</script>

<template>
  <div class="blog-list">
    <h1>Blog</h1>
    <article v-for="post in posts?.data" :key="post.id" class="post-card">
      <NuxtLink :to="`/blog/${post.slug}`">
        <img 
          v-if="post.cover_image" 
          :src="getImageUrl(post.cover_image)" 
          :alt="post.title" 
        />
        <h2>{{ post.title }}</h2>
        <p>{{ post.excerpt }}</p>
        <div class="meta">
          <span>{{ post.category }}</span>
          <span>{{ post.reading_time }} min czytania</span>
          <time>{{ new Date(post.date_created).toLocaleDateString('pl-PL') }}</time>
        </div>
      </NuxtLink>
    </article>
  </div>
</template>
```

### Strona pojedynczego posta

```vue
<!-- 📄 pages/blog/[slug].vue -->
<script setup>
const route = useRoute()
const { fetchPostBySlug, getImageUrl } = useDirectus()

const postData = await fetchPostBySlug(route.params.slug as string)
const post = computed(() => postData.value?.data?.[0])

if (!post.value) {
  throw createError({ statusCode: 404, message: 'Post nie znaleziony' })
}

// SEO
useHead({
  title: post.value.title,
  meta: [
    { name: 'description', content: post.value.excerpt }
  ]
})
</script>

<template>
  <article v-if="post" class="post-detail">
    <img 
      v-if="post.cover_image" 
      :src="getImageUrl(post.cover_image)" 
      :alt="post.title"
      class="cover"
    />
    <h1>{{ post.title }}</h1>
    <div class="meta">
      <span>{{ post.category }}</span>
      <time>{{ new Date(post.date_created).toLocaleDateString('pl-PL') }}</time>
    </div>
    <!-- Jeśli content to Markdown – użyj renderera -->
    <div class="content" v-html="post.content" />
  </article>
</template>
```

### Renderowanie Markdown (opcjonalnie)

Jeśli treść postów jest w Markdown, dodaj parser:

```bash
npm install marked
```

```vue
<script setup>
import { marked } from 'marked'

// ...
const renderedContent = computed(() => {
  if (post.value?.content) {
    return marked(post.value.content)
  }
  return ''
})
</script>

<template>
  <div class="content" v-html="renderedContent" />
</template>
```

> ⚠️ **Bezpieczeństwo:** Jeśli content pochodzi od użytkowników (nie tylko admina), użyj sanitizera jak `DOMPurify` przed `v-html`, żeby uniknąć XSS! W naszym przypadku content pisał admin w Directus, więc jest bezpiecznie.

---

## 🔄 Krok 6: Integracja z Pinią (opcjonalnie)

Jeśli potrzebujesz cache'ować posty lub zarządzać bardziej złożonym stanem bloga:

```bash
npx nuxi module add pinia
```

```javascript
// 📄 stores/blog.js
import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', () => {
  const posts = ref([])
  const currentPost = ref(null)
  const loading = ref(false)
  const config = useRuntimeConfig()

  async function fetchPosts() {
    if (posts.value.length > 0) return // Cache! Nie pobieraj ponownie

    loading.value = true
    const { data } = await useFetch(
      `${config.public.directusUrl}/items/posts`, {
        params: {
          'filter[status][_eq]': 'published',
          'sort': '-date_created',
          'fields': 'id,title,slug,excerpt,cover_image,category,tags,date_created'
        }
      }
    )
    if (data.value) {
      posts.value = data.value.data
    }
    loading.value = false
  }

  return { posts, currentPost, loading, fetchPosts }
})
```

---

## 🚢 Krok 7: Deploy

### Directus (Backend/CMS)

| Platforma | Zalety |
| :--- | :--- |
| **Railway** | Szybki deploy, darmowy tier, PostgreSQL w zestawie |
| **Render** | Docker support, auto-deploy z GitHub |
| **DigitalOcean App Platform** | Stabilne, skalowalne |
| **Directus Cloud** | Zero konfiguracji, managed hosting |
| **VPS (Hetzner, OVH)** | Najtańsze na dłuższą metę, pełna kontrola |

### Nuxt 3 (Frontend)

| Platforma | Tryb |
| :--- | :--- |
| **Vercel** | SSR z Edge Functions, darmowy tier |
| **Netlify** | SSR/SSG, auto-deploy z Git |
| **Cloudflare Pages** | SSR z Workers, ultra szybkie |

### Zmienne środowiskowe na produkcji

```bash
# Na platformie hostingowej ustaw:
DIRECTUS_URL=https://twoja-instancja.directus.app
```

---

## 📋 Checklist: Gotowy do startu?

- [ ] Directus zainstalowany i uruchomiony
- [ ] Kolekcja `posts` utworzona z odpowiednimi polami
- [ ] Publiczny dostęp do odczytu skonfigurowany (tylko published!)
- [ ] Nuxt 3 projekt stworzony
- [ ] Composable `useDirectus` napisany
- [ ] Strony `/blog` i `/blog/[slug]` gotowe
- [ ] Zmienne środowiskowe skonfigurowane
- [ ] Pierwszy post dodany w Directus!
- [ ] Deploy na produkcję 🚀

---

## 💡 Dodatkowe tipy

1. **Directus SDK** – Zamiast ręcznych fetch'ów, możesz użyć oficjalnego SDK: `npm install @directus/sdk`
2. **Webhooks** – Ustaw webhook w Directus, żeby triggerować rebuild Nuxt po publikacji nowego posta (ISR/SSG)
3. **Live Preview** – Directus ma wbudowany Live Preview – skonfiguruj go, żeby admini widzieli podgląd posta na froncie
4. **Tłumaczenia** – Directus wspiera i18n out-of-the-box. Dodaj pole `translations` do kolekcji
5. **Flows** – Directus ma system automatyzacji (coś jak Zapier). Możesz np. automatycznie generować slug z tytułu

Gotowy? Otwórz terminal i zacznij tworzyć! 🍍🚀
