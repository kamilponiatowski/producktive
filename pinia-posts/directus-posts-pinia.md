# 📦 Pinia – Posty blogowe do Directus CMS

> Ten plik zawiera serię postów blogowych o Pinii, podzielonych na mniejsze artykuły.
> Struktura każdego posta odpowiada kolekcji `posts` w Directus CMS.
> Importuj dane do Directus lub użyj ich jako szablon do ręcznego dodawania treści.

---

## 🗄️ Struktura kolekcji `posts` w Directus

Przed importem upewnij się, że Twoja kolekcja `posts` ma te pola:

```
Kolekcja: posts
├── id              (integer, auto-increment, PK)
├── status          (string: draft | published | archived)
├── title           (string, required)
├── slug            (string, unique, required)
├── excerpt         (text)
├── content         (text – Markdown)
├── cover_image     (file – relacja do directus_files)
├── category        (string)
├── tags            (json – tablica stringów)
├── series_name     (string – grupuje posty w serię)
├── sort_order      (integer – kolejność w serii)
├── reading_time    (integer – minuty)
├── date_created    (datetime, auto)
├── date_updated    (datetime, auto)
```

### API – jak pobrać posty z serii:

```bash
GET /items/posts?filter[series_name][_eq]=Pinia od A do Z&filter[status][_eq]=published&sort=sort_order
```

### Nuxt composable:

```javascript
const { data: posts } = await useFetch(`${directusUrl}/items/posts`, {
  params: {
    'filter[series_name][_eq]': 'Pinia od A do Z',
    'filter[status][_eq]': 'published',
    'sort': 'sort_order',
    'fields': 'id,title,slug,excerpt,category,tags,reading_time,sort_order,date_created'
  }
})
```

---

## 📄 POST 1: Czym jest Pinia i jak zacząć?

```json
{
  "status": "published",
  "title": "🍍 Czym jest Pinia i jak zacząć?",
  "slug": "pinia-czym-jest-i-jak-zaczac",
  "excerpt": "Pinia to biblioteka do zarządzania stanem w Vue. Dowiedz się, dlaczego warto ją wybrać i jak zainstalować ją w swoim projekcie – krok po kroku!",
  "category": "vue",
  "tags": ["pinia", "vue", "state-management", "instalacja", "podstawy"],
  "series_name": "Pinia od A do Z",
  "sort_order": 1,
  "reading_time": 5
}
```

### Content (Markdown):

```markdown
# 🍍 Czym jest Pinia i jak zacząć?

## 🧐 Czym jest Pinia?

**Pinia** to biblioteka do zarządzania stanem w ekosystemie Vue, która pozwala dzielić stan pomiędzy komponentami i stronami bez bólu głowy.

### Dawno, dawno temu...

Kiedyś próbowaliśmy dzielić stan za pomocą zwykłej reaktywności:
`export const state = reactive({})`.

W świecie SPA to jeszcze jakoś przechodziło, ale wystawialiśmy naszą aplikację na luki w zabezpieczeniach. Przy renderowaniu po stronie serwera (**SSR**), w naszych żądaniach niepotrzebnie ujawnialiśmy dane, narażając je na wyciek. 😱

Na szczęście prosto z palmy spadł nam ananas – **Pinia**! 🍍

### Dlaczego Pinia?

- **Bezpieczeństwo** – bezpieczne zarządzanie stanem, szczególnie w SSR
- **Devtools** – pełna integracja z Vue DevTools
- **TypeScript** – first-class support
- **Modularność** – każdy store to osobny plik
- **Prostota** – zero boilerplate'u w porównaniu z Vuex

## 🛠️ Instalacja

### 1. Dodaj Pinię do projektu

```bash
npm install pinia
```

### 2. Podłącz w `main.js`

```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia) // Przed mount!
app.mount('#app')
```

**Kolejność ma znaczenie!** `app.use(pinia)` musi być **przed** `app.mount('#app')`.

I to tyle! Pinia jest gotowa do akcji. W następnym poście stworzymy nasz pierwszy store! 🚀
```

---

## 📄 POST 2: Option Store vs Setup Store

```json
{
  "status": "published",
  "title": "📜 vs ⚡ Option Store vs Setup Store – który wybrać?",
  "slug": "pinia-option-store-vs-setup-store",
  "excerpt": "Pinia oferuje dwa style tworzenia store'ów: klasyczny Option Store i nowoczesny Setup Store. Poznaj różnice, zalety i wady obu podejść na przykładach z AniList API.",
  "category": "vue",
  "tags": ["pinia", "vue", "option-store", "setup-store", "composition-api", "anilist"],
  "series_name": "Pinia od A do Z",
  "sort_order": 2,
  "reading_time": 8
}
```

### Content (Markdown):

```markdown
# 📜 vs ⚡ Option Store vs Setup Store

## Dwa style, jeden cel

W Pinii mamy dwa sposoby na tworzenie store'ów:

| Cecha | **Option Store** 📜 | **Setup Store** ⚡ |
| :--- | :--- | :--- |
| Styl | Obiektowy (jak Options API) | Funkcyjny (jak Composition API) |
| State | `state: () => ({})` | `ref()` lub `reactive()` |
| Getters | `getters: {}` | `computed()` |
| Actions | `actions: {}` | Zwykłe funkcje |

## Konwencja nazw

Zawsze stosuj wzorzec: `use` + Nazwa + `Store`

```javascript
import { defineStore } from 'pinia'

export const useAnimeStore = defineStore('anime', {
  // ...
})
```

## Option Store – klasyczny, przejrzysty

```javascript
export const useAnimeStore = defineStore('anime', {
  state: () => ({
    animeList: [],
    loading: false,
    currentAnime: null
  }),
  getters: {
    totalAnime: (state) => state.animeList.length,
    onlyOnePiece: (state) => state.animeList.filter(a => a.title.romaji === 'ONE PIECE')
  },
  actions: {
    async fetchAnime(search) {
      this.loading = true
      const query = `
        query ($search: String) {
          Page(perPage: 10) {
            media(search: $search, type: ANIME) {
              id
              title { romaji english native }
              episodes
              averageScore
              coverImage { large }
            }
          }
        }
      `
      const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { search } })
      })
      const { data } = await response.json()
      this.animeList = data.Page.media
      this.loading = false
    }
  }
})
```

**Uwaga:** W getterach przekazujemy `state` jako parametr. W akcjach używamy `this`.

## Setup Store – nowoczesny, elastyczny

```javascript
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAnimeStore = defineStore('anime', () => {
  const animeList = ref([])
  const loading = ref(false)

  const totalAnime = computed(() => animeList.value.length)

  async function fetchAnime(search) {
    loading.value = true
    // ... ten sam fetch co wyżej ...
    const { data } = await response.json()
    animeList.value = data.Page.media
    loading.value = false
  }

  return { animeList, loading, totalAnime, fetchAnime }
})
```

**Zapamiętaj:** Na końcu musisz zwrócić obiekt ze wszystkim, co chcesz udostępnić!

## Który wybrać?

- **Option Store** – jeśli wolisz jasną strukturę i dopiero zaczynasz
- **Setup Store** – jeśli znasz Composition API i chcesz używać composables (np. VueUse)

Oba robią to samo – wybierz ten, który lepiej pasuje do Twojego stylu! 🍍
```

---

## 📄 POST 3: Modułowe Store'y i Nested Stores

```json
{
  "status": "published",
  "title": "🏰 Modułowe Store'y i Nested Stores – organizacja w praktyce",
  "slug": "pinia-modulowe-stores-i-nested-stores",
  "excerpt": "Jak rozdzielać store'y, kiedy tworzyć nowe, i jak łączyć dane między nimi? Praktyczny przewodnik na przykładzie Anime Explorer z AniList API.",
  "category": "vue",
  "tags": ["pinia", "vue", "modular-stores", "nested-stores", "architektura", "anilist"],
  "series_name": "Pinia od A do Z",
  "sort_order": 3,
  "reading_time": 7
}
```

### Content (Markdown):

```markdown
# 🏰 Modułowe Store'y i Nested Stores

## Jeden store = jedno zagadnienie

Nie wrzucaj WSZYSTKIEGO do jednego pliku! Pinia jest z natury modularna – każdy store to osobny plik z jasno określoną odpowiedzialnością.

### Jak rozdzielić store'y?

Zadaj sobie pytanie: **czego dotyczą dane, które śledzisz?**

Przykład – apka **Anime Explorer** 🎬:

- Dane o **filtrach** (gatunek, sezon, rok) → `filters.js`
- Dane o **anime** (lista wyników, szczegóły) → `anime.js`
- Dane o **watchliście** (ulubione anime usera) → `watchlist.js`
- Dane o **użytkowniku** (login, token) → `auth.js`

```
src/
  stores/
    auth.js          // 👤 Użytkownik
    filters.js       // 🔍 Filtry wyszukiwania
    anime.js         // 🎬 Dane anime
    watchlist.js     // ❤️ Watchlista
```

**Pro tip:** Nie twórz store'a wokół narzędzia (np. „anilistStore"). Twórz go wokół tego, co dane reprezentują!

## Nested Stores – kiedy store'y muszą ze sobą gadać

Co jeśli store anime potrzebuje danych z filtrów? Używamy **Nested Stores**!

### W Setup Store

Importujemy i wywołujemy `useStore()` **na górze** funkcji setup:

```javascript
// src/stores/anime.js
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useFiltersStore } from './filters'

export const useAnimeStore = defineStore('anime', () => {
  const filtersStore = useFiltersStore() // Na górze, raz!
  const animeList = ref([])

  async function searchAnime() {
    const genre = filtersStore.selectedGenre // Dane z innego store!
    const season = filtersStore.selectedSeason
    // ... reszta logiki
  }

  return { animeList, searchAnime }
})
```

### W Option Store

Musimy wywołać `useStore()` **wewnątrz** konkretnej akcji:

```javascript
// src/stores/watchlist.js
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export const useWatchlistStore = defineStore('watchlist', {
  state: () => ({ userWatchlist: [] }),
  actions: {
    async getWatchlist() {
      const authStore = useAuthStore() // Wewnątrz akcji!
      // ... filtrowanie po zalogowanym userze
    }
  }
})
```

**Setup Store wygrywa** na wygodzie – raz importujesz na górze i masz dostęp wszędzie! 🏆
```

---

## 📄 POST 4: Dostęp do stanu i mutowanie danych

```json
{
  "status": "published",
  "title": "🔓 Dostęp do stanu i mutowanie danych w Pinii",
  "slug": "pinia-dostep-do-stanu-i-mutowanie",
  "excerpt": "Jak czytać dane ze store'ów? Jak je bezpiecznie zmieniać? Poznaj storeToRefs, v-model, $patch, $reset i unikaj pułapki destrukturyzacji!",
  "category": "vue",
  "tags": ["pinia", "vue", "storeToRefs", "v-model", "patch", "reset", "reaktywność"],
  "series_name": "Pinia od A do Z",
  "sort_order": 4,
  "reading_time": 10
}
```

### Content (Markdown):

```markdown
# 🔓 Dostęp do stanu i mutowanie danych

## Czytanie stanu w komponencie

Importujesz store, wywołujesz hook i masz dostęp:

```vue
<script setup>
import { useAnimeStore } from '../stores/anime'

const animeStore = useAnimeStore()

animeStore.animeList     // state
animeStore.topRated      // getter
animeStore.fetchAnimeById(21) // akcja – ONE PIECE ma ID 21!
</script>
```

## ⚠️ Pułapka destrukturyzacji!

```javascript
const { animeList } = animeStore // ❌ Straciłeś reaktywność!
```

Rozwiązanie – **`storeToRefs`**:

```javascript
import { storeToRefs } from 'pinia'

const { animeList, topRated } = storeToRefs(animeStore)      // stan i gettery
const { fetchAnime, fetchAnimeById } = animeStore             // akcje – normalnie!
```

`storeToRefs` używamy **tylko** do stanu i getterów. Akcje destrukturyzujemy normalnie!

## v-model ze stanem

```vue
<script setup>
import { storeToRefs } from 'pinia'
import { useFiltersStore } from '../stores/filters'

const { searchQuery } = storeToRefs(useFiltersStore())
</script>

<template>
  <input v-model="searchQuery" placeholder="np. One Piece, Dragon Ball..." />
</template>
```

## Sposoby na zmianę stanu

### 1. Przez akcje (zalecane)
```javascript
animeStore.addToWatchlist(anime)
```

### 2. Bezpośrednio
```javascript
animeList.value = []
```

### 3. `$patch` – hurtowa zmiana
```javascript
// Obiekt:
animeStore.$patch({ animeList: [], loading: false })

// Funkcja (dla złożonej logiki):
animeStore.$patch((state) => {
  state.animeList.splice(0, state.animeList.length)
  state.loading = false
})
```

### 4. `$reset` – wielki reset
```javascript
animeStore.$reset() // Stan wraca do wartości początkowych!
```

⚠️ `$reset` działa **tylko z Option Store**! W Setup Store napisz własną funkcję resetującą.

```javascript
function resetAnimeStore() {
  animeList.value = []
  currentAnime.value = null
  loading.value = false
}
```
```

---

## 📄 POST 5: Pluginy – doładuj swojego ananasa!

```json
{
  "status": "published",
  "title": "🔌 Pluginy Pinii – rozszerz możliwości store'ów!",
  "slug": "pinia-pluginy",
  "excerpt": "Pluginy pozwalają rozszerzać Pinię o własne funkcjonalności: dodawanie właściwości, nasłuchiwanie na akcje, łapanie błędów i wiele więcej. Poznaj trzy wzorce!",
  "category": "vue",
  "tags": ["pinia", "vue", "pluginy", "subscribe", "onAction", "persistedstate"],
  "series_name": "Pinia od A do Z",
  "sort_order": 5,
  "reading_time": 10
}
```

### Content (Markdown):

```markdown
# 🔌 Pluginy Pinii

Plugin to zwykła **funkcja JavaScript**, która rozszerza Pinię o nowe możliwości.

## Anatomia plugina

```javascript
export function myPlugin(context) {
  context.pinia   // instancja Pinii
  context.app     // instancja Vue
  context.store   // store, do którego plugin jest dodawany
  context.options // opcje z defineStore()
}
```

## Rejestracja

```javascript
// main.js
const pinia = createPinia()
pinia.use(myPlugin)
```

## Wzorzec 1: Dodaj właściwość

```javascript
function pluginProperty() {
  return {
    appName: 'Anime Explorer 🎬'
  }
}
pinia.use(pluginProperty)

// Teraz każdy store ma: store.appName
```

## Wzorzec 2: Nasłuchuj na mutacje i akcje

### `$subscribe` – obserwuj mutacje

```javascript
export function greetCaptainPlugin(context) {
  context.store.$subscribe((mutation, state) => {
    if (mutation.storeId === 'auth' && state.user?.username === 'luffy') {
      alert('🏴‍☠️ Kapitan jest na pokładzie!')
    }
  })
}
```

### `$onAction` w pluginie

```javascript
export function greetUserPlugin({ store }) {
  store.$onAction(({ name, after }) => {
    if (store.$id === 'auth') {
      switch (name) {
        case 'login':
          after(() => alert('Witaj ponownie, Nakama! 🏴‍☠️'))
          break
        case 'logout':
          after(() => alert('Sayonara! 👋'))
          break
      }
    }
  })
}
```

### Łapanie błędów

```javascript
export function errorTrackingPlugin({ store }) {
  store.$onAction(({ name, args, onError }) => {
    onError((error) => {
      sendToErrorService({
        storeName: store.$id,
        actionName: name,
        args, error
      })
    })
  })
}
```

## Wzorzec 3: Własna opcja w store

```javascript
// Store z własną opcją:
export const useAuthStore = defineStore('auth', {
  state: () => ({ user: {} }),
  greeting: { enabled: true }  // 🆕 Własna opcja!
})

// Plugin sprawdza opcję:
export function greetPlugin({ store, options }) {
  if (options.greeting?.enabled) {
    store.$onAction(({ name, after }) => {
      // Reaguj tylko w store'ach z greeting.enabled!
    })
  }
}
```

W Setup Store dodajemy opcję jako **trzeci argument** `defineStore`:

```javascript
export const useAuthStore = defineStore('auth', () => {
  // ... logika
}, {
  greeting: { enabled: true }  // Trzeci argument!
})
```

## Plugin z open source: persistedstate

```bash
npm install pinia-plugin-persistedstate
```

```javascript
// main.js
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
pinia.use(piniaPluginPersistedstate)

// W store:
export const useAuthStore = defineStore('auth', {
  state: () => ({ user: {}, token: '' }),
  persist: true  // Stan przetrwa odświeżenie! 💾
})
```

Pro tip: Utrwalaj **tylko** store'y, które tego potrzebują (auth, preferencje). Dane wyszukiwania? Niech lecą!
```

---

## 📄 POST 6: Composables + Setup Store – Dream Team

```json
{
  "status": "published",
  "title": "🗺️ Composables + Setup Store = Dream Team",
  "slug": "pinia-composables-i-setup-store",
  "excerpt": "Jak używać composables z VueUse bezpośrednio wewnątrz store'ów Pinii? Praktyczny przykład z useLocalStorage, watcherami i automatyczną historią wyszukiwania.",
  "category": "vue",
  "tags": ["pinia", "vue", "composables", "vueuse", "setup-store", "localStorage"],
  "series_name": "Pinia od A do Z",
  "sort_order": 6,
  "reading_time": 6
}
```

### Content (Markdown):

```markdown
# 🗺️ Composables + Setup Store

Setup Store pozwala używać **composables** (np. z VueUse) bezpośrednio wewnątrz store'a!

## Przykład: Historia wyszukiwań z useLocalStorage

```javascript
// src/stores/filters.js
import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useFiltersStore = defineStore('filters', () => {
  const recentSearches = useLocalStorage('recent-anime-searches', [])
  const searchQuery = ref('')

  watch(searchQuery, (newQuery) => {
    if (newQuery && !recentSearches.value.includes(newQuery)) {
      recentSearches.value.unshift(newQuery)
      if (recentSearches.value.length > 10) {
        recentSearches.value.pop()
      }
    }
  })

  function clearRecentSearches() {
    recentSearches.value = []
  }

  return { recentSearches, searchQuery, clearRecentSearches }
})
```

## Dlaczego to działa?

`useLocalStorage` musi być wywołane wewnątrz reaktywnego kontekstu Vue. Nasza funkcja w Setup Store jest dokładnie takim kontekstem!

## Kiedy to się nie sprawdzi?

**Option Store** nie daje tego komfortu. Mógłbyś użyć composable w komponencie i stamtąd wywołać akcję w store, ale rozbija to logikę w kilka miejsc.

Setup Store trzyma wszystko razem – jak załoga Słomkowego Kapelusza na Thousand Sunny! 🚢
```

---

## 📄 POST 7: Dobre praktyki i architektura

```json
{
  "status": "published",
  "title": "💡 Pinia – dobre praktyki i wzorce architektoniczne",
  "slug": "pinia-dobre-praktyki-i-architektura",
  "excerpt": "Sprawdzone wzorce: kiedy używać akcji vs bezpośredniej mutacji, jak wydzielić serwisy, feature-based structure i composable jako adapter store'a.",
  "category": "vue",
  "tags": ["pinia", "vue", "dobre-praktyki", "architektura", "service-layer", "clean-code"],
  "series_name": "Pinia od A do Z",
  "sort_order": 7,
  "reading_time": 12
}
```

### Content (Markdown):

```markdown
# 💡 Dobre praktyki i architektura

## Zasady

### 1. Akcje do mutacji, nie bezpośrednia zmiana stanu

```javascript
// ❌ W komponencie bezpośrednio
animeStore.animeList.push(newAnime)

// ✅ Przez akcję
animeStore.addAnime(newAnime)
```

Akcje są śledzone przez devtoolsy, mają opisowe nazwy i mogą zawierać walidację.

### 2. Gettery do obliczonych danych

```javascript
// ❌ computed w każdym komponencie
const topAnime = computed(() => animeStore.animeList.filter(a => a.averageScore > 80))

// ✅ Getter w store (raz, cache'owany!)
getters: {
  topAnime: (state) => state.animeList.filter(a => a.averageScore > 80)
}
```

### 3. Obsługa błędów w akcjach

Każda akcja z `fetch` powinna mieć `try/catch`:

```javascript
async function fetchAnime(search) {
  loading.value = true
  error.value = null
  try {
    const data = await anilistFetch(SEARCH_ANIME_QUERY, { search })
    animeList.value = data.Page.media
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
```

### 4. Helper do API

```javascript
// src/helpers/anilistFetch.js
const ANILIST_URL = 'https://graphql.anilist.co'

export async function anilistFetch(query, variables = {}) {
  const response = await fetch(ANILIST_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables })
  })
  const { data, errors } = await response.json()
  if (errors) throw new Error(errors[0].message)
  return data
}
```

### 5. Wydziel zapytania GraphQL

```
src/graphql/queries/
  searchAnime.js
  getAnimeById.js
  getTrending.js
```

## Wzorce architektoniczne

### Feature-based structure

```
src/features/
  anime/
    components/
    stores/anime.js
    graphql/
  watchlist/
    components/
    stores/watchlist.js
  auth/
    components/
    stores/auth.js
```

### Service Layer

Store zarządza stanem. Serwis zarządza komunikacją z API:

```javascript
// src/services/anilistService.js
export const anilistService = {
  async searchAnime(search) { /* ... */ },
  async getAnimeById(id) { /* ... */ }
}

// src/stores/anime.js
import { anilistService } from '../services/anilistService'

async function fetchAnime(search) {
  const data = await anilistService.searchAnime(search)
  animeList.value = data.Page.media
}
```

### Composable jako adapter store'a

```javascript
// src/composables/useAnimeSearch.js
export function useAnimeSearch() {
  const animeStore = useAnimeStore()
  const filtersStore = useFiltersStore()

  const { animeList, loading } = storeToRefs(animeStore)
  const { searchQuery } = storeToRefs(filtersStore)

  // Debounce wyszukiwania
  let timeout
  watch(searchQuery, (newVal) => {
    clearTimeout(timeout)
    if (newVal.length >= 3) {
      timeout = setTimeout(() => animeStore.fetchAnime(newVal), 500)
    }
  })

  return { animeList, loading, searchQuery }
}
```

Store = stan. Serwis = API. Composable = logika widoku. **Separation of Concerns!** 📖
```

---

## 📄 POST 8: Zaawansowane techniki Pinii

```json
{
  "status": "published",
  "title": "🚀 Zaawansowane techniki Pinii – HMR, testy, TypeScript, SSR",
  "slug": "pinia-zaawansowane-techniki",
  "excerpt": "Hot Module Replacement dla store'ów, testowanie z Vitest, typowanie z TypeScript, Pinia w Nuxt 3 SSR, optimistic updates i debounce – techniki dla zaawansowanych!",
  "category": "vue",
  "tags": ["pinia", "vue", "hmr", "vitest", "typescript", "nuxt", "ssr", "zaawansowane"],
  "series_name": "Pinia od A do Z",
  "sort_order": 8,
  "reading_time": 12
}
```

### Content (Markdown):

```markdown
# 🚀 Zaawansowane techniki Pinii

## 1. HMR – Hot Module Replacement

```javascript
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useAnimeStore = defineStore('anime', () => {
  // ... logika
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAnimeStore, import.meta.hot))
}
```

Edytujesz store, zapisujesz, stan zostaje. Bez HMR tracisz cały stan przy hot reload!

## 2. Testowanie z Vitest

```javascript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAnimeStore } from '@/stores/anime'

describe('Anime Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia()) // Świeża Pinia na każdy test!
  })

  it('should start with empty list', () => {
    const store = useAnimeStore()
    expect(store.animeList).toEqual([])
  })

  it('should fetch anime', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          data: {
            Page: {
              media: [{ id: 21, title: { romaji: 'ONE PIECE' } }]
            }
          }
        })
      })
    )

    const store = useAnimeStore()
    await store.fetchAnime('One Piece')
    expect(store.animeList).toHaveLength(1)
  })
})
```

## 3. TypeScript

```typescript
interface Anime {
  id: number
  title: { romaji: string; english: string | null }
  episodes: number | null
  averageScore: number
  coverImage: { large: string }
  genres: string[]
}

export const useAnimeStore = defineStore('anime', {
  state: (): { animeList: Anime[]; loading: boolean } => ({
    animeList: [],
    loading: false
  }),
  getters: {
    topRated: (state): Anime[] => {
      return [...state.animeList].sort((a, b) => b.averageScore - a.averageScore).slice(0, 5)
    }
  }
})
```

## 4. SSR z Nuxt 3

```bash
npx nuxi module add pinia
```

W Nuxt 3 nie musisz robić `app.use(pinia)` – moduł robi to automatycznie!

## 5. Optimistic Updates

```javascript
async function addToWatchlist(anime) {
  const optimisticItem = { ...anime, addedAt: Date.now() }
  userWatchlist.value.push(optimisticItem) // Dodaj od razu!

  try {
    await fetch('/api/watchlist', {
      method: 'POST',
      body: JSON.stringify({ animeId: anime.id })
    })
  } catch (err) {
    // Cofnij jeśli serwer odmówił!
    const index = userWatchlist.value.findIndex(item => item.id === anime.id)
    if (index > -1) userWatchlist.value.splice(index, 1)
    error.value = 'Nie udało się dodać. Spróbuj ponownie!'
  }
}
```

## 6. Debounce w wyszukiwaniu

```javascript
import { watchDebounced } from '@vueuse/core'

watchDebounced(searchQuery, async (newQuery) => {
  if (newQuery.length >= 3) {
    await fetchAnime(newQuery)
  }
}, { debounce: 500 })
```

AniList ma rate limiting (90 req/min). Debounce chroni Cię przed osiągnięciem limitu!
```

---

## 🔧 Import do Directus – jak to zrobić?

### Opcja 1: Ręczne dodawanie

1. Otwórz panel Directus (`http://localhost:8055`)
2. Idź do kolekcji `posts`
3. Kliknij **"Create Item"**
4. Skopiuj dane z JSON (metadata) i Content (Markdown) dla każdego posta
5. Powtórz dla wszystkich 8 postów

### Opcja 2: Import przez API

```bash
# Użyj curl lub fetch do POST /items/posts
curl -X POST http://localhost:8055/items/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TWOJ_TOKEN" \
  -d '{
    "status": "published",
    "title": "🍍 Czym jest Pinia i jak zacząć?",
    "slug": "pinia-czym-jest-i-jak-zaczac",
    "excerpt": "Pinia to biblioteka do zarządzania stanem...",
    "content": "# 🍍 Czym jest Pinia...",
    "category": "vue",
    "tags": ["pinia", "vue"],
    "series_name": "Pinia od A do Z",
    "sort_order": 1,
    "reading_time": 5
  }'
```

### Opcja 3: Import z pliku JSON

Stwórz plik `posts-import.json` z tablicą obiektów i użyj Directus CLI lub API batch:

```bash
# POST wielu elementów naraz
curl -X POST http://localhost:8055/items/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TWOJ_TOKEN" \
  -d @posts-import.json
```

---

## 📊 Pobranie serii na froncie (Nuxt)

```vue
<!-- pages/seria/[name].vue -->
<script setup>
const route = useRoute()
const config = useRuntimeConfig()

const { data: posts } = await useFetch(`${config.public.directusUrl}/items/posts`, {
  params: {
    'filter[series_name][_eq]': route.params.name,
    'filter[status][_eq]': 'published',
    'sort': 'sort_order',
    'fields': 'id,title,slug,excerpt,sort_order,reading_time,tags,date_created'
  }
})
</script>

<template>
  <div>
    <h1>Seria: {{ route.params.name }}</h1>
    <ol>
      <li v-for="post in posts?.data" :key="post.id">
        <NuxtLink :to="`/blog/${post.slug}`">
          <strong>{{ post.title }}</strong>
          <span>{{ post.reading_time }} min</span>
        </NuxtLink>
        <p>{{ post.excerpt }}</p>
      </li>
    </ol>
  </div>
</template>
```
