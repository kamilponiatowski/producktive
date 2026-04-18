import type { BlogPost, BlogSeries, BlogCategory } from '~/types/blog'

// ---------------------------------------------------------------------------
// Static fallback categories (used when Directus is not available)
// ---------------------------------------------------------------------------

export const FALLBACK_CATEGORIES: BlogCategory[] = [
  {
    id: 'technical',
    slug: 'technical',
    name: 'Techniczne',
    nameEn: 'Technical',
    emoji: '⚙️',
  },
]

// ---------------------------------------------------------------------------
// Static fallback series
// ---------------------------------------------------------------------------

export const piniaSeries: BlogSeries = {
  slug: 'pinia-od-a-do-z',
  name: 'Pinia od A do Z',
  nameEn: 'Pinia from A to Z',
  description: 'Kompletny kurs zarządzania stanem w Vue z Pinią – od instalacji po zaawansowane wzorce. Uczy się lepiej krok po kroku!',
  descriptionEn: 'Complete Vue state management course with Pinia – from installation to advanced patterns. Learning step by step!',
  emoji: '🍍',
  category: 'technical',
  subcategory: 'vue',
  totalPosts: 12,
  coverColor: 'from-emerald-500/20 to-cyan-500/20',
}

export const piniaPostsData: BlogPost[] = [
  {
    id: 1,
    slug: 'czym-jest-pinia',
    title: '🍍 Czym jest Pinia?',
    titleEn: '🍍 What is Pinia?',
    excerpt: 'Poznaj bibliotekę do zarządzania stanem w Vue, która spadła prosto z palmy. Dlaczego Pinia? Bezpieczeństwo, DevTools, TypeScript i zero boilerplate\'u.',
    excerptEn: 'Meet the Vue state management library that fell straight from the palm tree. Why Pinia? Security, DevTools, TypeScript and zero boilerplate.',
    content: `# 🍍 Czym jest Pinia?

**Pinia** to biblioteka do zarządzania stanem w ekosystemie Vue, która pozwala dzielić stan pomiędzy komponentami i stronami bez bólu głowy.

## 🏝️ Dawno, dawno temu...

Kiedyś próbowaliśmy dzielić stan za pomocą zwykłej reaktywności:
\`export const state = reactive({})\`.

W świecie SPA (Single Page Applications) to jeszcze jakoś przechodziło, ale wystawialiśmy naszą aplikację na luki w zabezpieczeniach. Przy renderowaniu po stronie serwera (**SSR** - Server Side Rendering), w naszych żądaniach niepotrzebnie ujawnialiśmy dane, narażając je na wyciek. Słabo, prawda? 😱

Na szczęście prosto z palmy spadł nam ananas – **Pinia**! 🍍
Od tamtej pory mamy dużo bezpieczniejszy sposób dzielenia stanu. Jest prosto, elegancko i z masą „zaklęć", które są tak intuicyjne, że ich używanie to czysta przyjemność.

## Dlaczego Pinia?

- **Bezpieczeństwo** – bezpieczne zarządzanie stanem, szczególnie w SSR
- **Devtools** – pełna integracja z Vue DevTools
- **TypeScript** – first-class support
- **Modularność** – każdy store to osobny plik
- **Prostota** – zero boilerplate'u w porównaniu z Vuex

> 💡 Pinia to oficjalny następca Vuex. Jeśli zaczynasz nowy projekt Vue – Pinia jest **jedynym** słusznym wyborem!

W następnym poście pokażemy jak zainstalować i skonfigurować Pinię. Zaczynamy przygodę! 🚀`,
    category: 'vue',
    tags: ['pinia', 'vue', 'state-management', 'podstawy'],
    seriesName: 'Pinia od A do Z',
    seriesNameEn: 'Pinia from A to Z',
    seriesSlug: 'pinia-od-a-do-z',
    sortOrder: 1,
    readingTime: 3,
    emoji: '🍍',
    status: 'published',
    dateCreated: '2025-06-01T10:00:00Z',
    dateUpdated: '2025-06-01T10:00:00Z',
  },
  {
    id: 2,
    slug: 'instalacja-pinia',
    title: '🛠️ Instalacja Pinii',
    titleEn: '🛠️ Installing Pinia',
    excerpt: 'Przejdźmy do mięsa! Instalacja, konfiguracja main.js i pierwszy setup – wszystko co potrzebne, żeby ananas zaczął rosnąć.',
    excerptEn: 'Let\'s get to the meat! Installation, main.js config and first setup – everything you need to start growing the pineapple.',
    content: `# 🛠️ Instalacja Pinii – Przejdźmy do mięsa! 🍖

Czyli to, co Luffy i deweloperzy kochają najbardziej. Żeby zacząć zabawę z ananasem, musimy go najpierw dorzucić do naszego koszyka:

\`\`\`bash
npm install pinia
\`\`\`

## 🍍 Sadzenie ananasa w main.js

Teraz musimy go podpiąć tam, gdzie tworzymy naszą aplikację:

1. **Tworzymy instancję:** Wywołujemy \`createPinia()\` (importujemy z \`'pinia'\`).
2. **Łączymy siły:** Montujemy Pinię w aplikacji.
3. **Kolejność ma znaczenie:** \`app.use(pinia)\` **przed** \`app.mount('#app')\`.

\`\`\`javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia() // 🍍 Tworzymy instancję ananasa
const app = createApp(App)

app.use(pinia) // 🪄 Pinia wchodzi do gry!
app.mount('#app') // ⚓ Montujemy aplikację
\`\`\`

**WoW!!! Czy to takie proste?** Otóż to! Pierwszy etap za nami. 👏

> ⚠️ W **Nuxt 3** nie musisz robić \`app.use(pinia)\` – wystarczy \`npx nuxi module add pinia\` i moduł robi to za Ciebie. Mniej kodu, więcej magii!

Skoro mamy już Pinię zainstalowaną, czas stworzyć nasz pierwszy **Store**! 🚀`,
    category: 'vue',
    tags: ['pinia', 'instalacja', 'setup', 'konfiguracja'],
    seriesName: 'Pinia od A do Z',
    seriesNameEn: 'Pinia from A to Z',
    seriesSlug: 'pinia-od-a-do-z',
    sortOrder: 2,
    readingTime: 3,
    emoji: '🛠️',
    status: 'published',
    dateCreated: '2025-06-02T10:00:00Z',
    dateUpdated: '2025-06-02T10:00:00Z',
  },
  {
    id: 3,
    slug: 'option-store-vs-setup-store',
    title: '📜 Option Store vs Setup Store',
    titleEn: '📜 Option Store vs Setup Store',
    excerpt: 'Dwa style, jeden cel. Porównanie klasycznego Option Store z nowoczesnym Setup Store – wybierz swoją ścieżkę ninja!',
    excerptEn: 'Two styles, one goal. Comparing the classic Option Store with the modern Setup Store – choose your ninja path!',
    content: `# 📜 vs ⚡ Option Store vs Setup Store

## Dwa style, jeden cel

W Pinii mamy dwa sposoby na tworzenie store'ów:

| Cecha | **Option Store** 📜 | **Setup Store** ⚡ |
| :--- | :--- | :--- |
| Styl | Obiektowy (jak Options API) | Funkcyjny (jak Composition API) |
| State | \`state: () => ({})\` | \`ref()\` lub \`reactive()\` |
| Getters | \`getters: {}\` | \`computed()\` |
| Actions | \`actions: {}\` | Zwykłe funkcje |

## 🆔 Konwencja nazw

Zawsze stosuj wzorzec: \`use\` + Nazwa + \`Store\`

\`\`\`javascript
import { defineStore } from 'pinia'
export const useAnimeStore = defineStore('anime', { /* ... */ })
\`\`\`

## 🏗️ Option Store – klasyczny, przejrzysty

Jak instrukcja klocków LEGO. Każdy element ma swoje miejsce:

\`\`\`javascript
export const useAnimeStore = defineStore('anime', {
  state: () => ({
    animeList: [],
    loading: false,
    currentAnime: null
  }),
  getters: {
    totalAnime: (state) => state.animeList.length,
    topRated: (state) =>
      [...state.animeList].sort((a, b) => b.averageScore - a.averageScore).slice(0, 5)
  },
  actions: {
    async fetchAnime(search) {
      this.loading = true
      const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: SEARCH_QUERY, variables: { search } })
      })
      const { data } = await response.json()
      this.animeList = data.Page.media
      this.loading = false
    }
  }
})
\`\`\`

> **Ważne:** W getterach przekazujemy \`state\` jako parametr. W akcjach używamy \`this\`.

## ⚡ Setup Store – nowoczesny, elastyczny

Piszesz kod jak w \`<script setup>\`. Używasz \`ref()\`, \`computed()\` i zwykłych funkcji:

\`\`\`javascript
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAnimeStore = defineStore('anime', () => {
  const animeList = ref([])
  const loading = ref(false)

  const totalAnime = computed(() => animeList.value.length)

  async function fetchAnime(search) {
    loading.value = true
    // ... fetch logic
    loading.value = false
  }

  // ZWRACAMY SKARBY! 📦
  return { animeList, loading, totalAnime, fetchAnime }
})
\`\`\`

> **Zapamiętaj:** Na końcu musisz zwrócić obiekt ze wszystkim, co chcesz udostępnić! Co nie zwrócisz – zostaje w domu 🏠

## Który wybrać?

- **Option Store** – jasna struktura, idealny na start
- **Setup Store** – elastyczny, świetny z composables (np. VueUse)

Oba robią to samo – wybierz ten, który pasuje do Twojego stylu! 🍍`,
    category: 'vue',
    tags: ['pinia', 'option-store', 'setup-store', 'defineStore'],
    seriesName: 'Pinia od A do Z',
    seriesNameEn: 'Pinia from A to Z',
    seriesSlug: 'pinia-od-a-do-z',
    sortOrder: 3,
    readingTime: 7,
    emoji: '⚡',
    status: 'published',
    dateCreated: '2025-06-03T10:00:00Z',
    dateUpdated: '2025-06-03T10:00:00Z',
  },
  {
    id: 4,
    slug: 'modulowe-store',
    title: '🏰 Modułowe Store\'y',
    titleEn: '🏰 Modular Stores',
    excerpt: 'Każdy ananas ma swoją palmę! Jak rozdzielić store\'y na logiczne moduły i utrzymać porządek w projekcie.',
    excerptEn: 'Every pineapple has its own palm tree! How to split stores into logical modules and keep your project organized.',
    content: `# 🏰 Modułowe Store'y: Każdy ananas ma swoją palmę!

Masz apkę z użytkownikami, anime, filtrami i watchlistą? Nie wrzucaj tego WSZYSTKO do jednego pliku! 🙈

Pinia jest z natury **modularna** – każdy store to osobny plik z jasno określoną odpowiedzialnością.

## 🤔 Jak rozdzielić store'y?

Zadaj sobie pytanie: **czego dotyczą dane, które śledzisz?**

Przykład – **Anime Explorer** 🎬:
- Filtry (gatunek, sezon, rok) → \`filters.js\`
- Anime (lista wyników, szczegóły) → \`anime.js\`
- Watchlista (ulubione usera) → \`watchlist.js\`
- Użytkownik (login, token) → \`auth.js\`

\`\`\`
src/
  stores/
    auth.js        // 👤 login, register, logout
    filters.js     // 🔍 gatunek, sezon, sortowanie
    anime.js       // 🎬 lista, szczegóły, wyszukiwanie
    watchlist.js   // ❤️ dodawanie, usuwanie, lista
\`\`\`

> 💡 **Pro tip:** Nie twórz store'a wokół narzędzia (np. "anilistStore"). Twórz go wokół **tego, co dane reprezentują**!

Goku nie dzieli kamehameha z Vegetą – każdy wojownik ma własny arsenał technik! 💥`,
    category: 'vue',
    tags: ['pinia', 'modularne', 'architektura', 'organizacja'],
    seriesName: 'Pinia od A do Z',
    seriesNameEn: 'Pinia from A to Z',
    seriesSlug: 'pinia-od-a-do-z',
    sortOrder: 4,
    readingTime: 4,
    emoji: '🏰',
    status: 'published',
    dateCreated: '2025-06-04T10:00:00Z',
    dateUpdated: '2025-06-04T10:00:00Z',
  },
  {
    id: 5,
    slug: 'nested-stores',
    title: '🤝 Nested Stores',
    titleEn: '🤝 Nested Stores',
    excerpt: 'Kiedy ananasy muszą ze sobą gadać – jak łączyć store\'y bez duplikowania stanu.',
    excerptEn: 'When pineapples need to talk to each other – how to combine stores without duplicating state.',
    content: `# 🤝 Nested Stores: Kiedy ananasy muszą ze sobą gadać

Co, jeśli store anime potrzebuje danych z filtrów? Nie chcemy duplikować stanu!

## ⚡ W Setup Store

Importujemy \`useStore()\` na **górze** funkcji setup – i gotowe:

\`\`\`javascript
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useFiltersStore } from './filters'

export const useAnimeStore = defineStore('anime', () => {
  const filtersStore = useFiltersStore() // Na górze, raz!
  const animeList = ref([])

  async function searchAnime() {
    const genre = filtersStore.selectedGenre
    const season = filtersStore.selectedSeason
    // ... fetch z tymi parametrami
  }

  return { animeList, searchAnime }
})
\`\`\`

## 📜 W Option Store

Musimy wywołać \`useStore()\` **wewnątrz** konkretnej akcji:

\`\`\`javascript
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export const useWatchlistStore = defineStore('watchlist', {
  state: () => ({ userWatchlist: [] }),
  actions: {
    async getWatchlist() {
      const authStore = useAuthStore() // Wewnątrz akcji!
      this.userWatchlist = allItems.filter(
        item => item.userId === authStore.user.id
      )
    }
  }
})
\`\`\`

> 🏆 **Setup Store wygrywa** – raz importujesz na górze i masz dostęp wszędzie. Jak Luffy – raz zje Owoc Diabelski i ma moc na zawsze! 🍇`,
    category: 'vue',
    tags: ['pinia', 'nested-stores', 'kompozycja', 'import'],
    seriesName: 'Pinia od A do Z',
    seriesNameEn: 'Pinia from A to Z',
    seriesSlug: 'pinia-od-a-do-z',
    sortOrder: 5,
    readingTime: 5,
    emoji: '🤝',
    status: 'published',
    dateCreated: '2025-06-05T10:00:00Z',
    dateUpdated: '2025-06-05T10:00:00Z',
  },
  {
    id: 6,
    slug: 'dostep-do-stanu',
    title: '🔓 Dostęp do stanu',
    titleEn: '🔓 Accessing State',
    excerpt: 'Jak czytać nasze skarby? storeToRefs, destrukturyzacja, v-model – wszystko o odczycie stanu.',
    excerptEn: 'How to read your treasures? storeToRefs, destructuring, v-model – everything about reading state.',
    content: `# 🔓 Dostęp do stanu: Jak czytać nasze skarby?

## 🖥️ W komponencie

Importujesz store, wywołujesz hook i jazda:

\`\`\`vue
<script setup>
import { useAnimeStore } from '../stores/anime'

const animeStore = useAnimeStore()
animeStore.animeList     // state
animeStore.topRated      // getter
animeStore.fetchAnimeById(21) // akcja – ONE PIECE!
</script>
\`\`\`

## ⚠️ Pułapka destrukturyzacji!

\`\`\`javascript
const { animeList } = animeStore // ❌ Straciłeś reaktywność!
\`\`\`

Rozwiązanie – **storeToRefs**:

\`\`\`javascript
import { storeToRefs } from 'pinia'

const { animeList, topRated } = storeToRefs(animeStore)  // stan i gettery ✅
const { fetchAnime } = animeStore                         // akcje – normalnie!
\`\`\`

> ⚠️ \`storeToRefs\` używamy **tylko** do stanu i getterów. Akcje destrukturyzujemy normalnie – to zwykłe funkcje!

## 🔗 v-model ze stanem

\`\`\`vue
<script setup>
import { storeToRefs } from 'pinia'
import { useFiltersStore } from '../stores/filters'

const { searchQuery } = storeToRefs(useFiltersStore())
</script>

<template>
  <input v-model="searchQuery" placeholder="np. One Piece..." />
</template>
\`\`\`

Magia? Nie – Pinia! 🍍✨`,
    category: 'vue',
    tags: ['pinia', 'storeToRefs', 'destrukturyzacja', 'v-model'],
    seriesName: 'Pinia od A do Z',
    seriesNameEn: 'Pinia from A to Z',
    seriesSlug: 'pinia-od-a-do-z',
    sortOrder: 6,
    readingTime: 6,
    emoji: '🔓',
    status: 'published',
    dateCreated: '2025-06-06T10:00:00Z',
    dateUpdated: '2025-06-06T10:00:00Z',
  },
  {
    id: 7,
    slug: 'mutowanie-stanu',
    title: '⚔️ Mutowanie stanu',
    titleEn: '⚔️ Mutating State',
    excerpt: 'Sposoby na zmianę danych – akcje, bezpośrednio, $patch i $reset. Pinia jest liberalna!',
    excerptEn: 'Ways to change data – actions, directly, $patch and $reset. Pinia is liberal!',
    content: `# ⚔️ Mutowanie stanu: Sposoby na zmianę danych

Pinia mówi: **"Hej, jesteś dorosły. Sam zdecyduj."** I daje nam kilka opcji:

## 1️⃣ Przez akcje (Klasyka)
\`\`\`javascript
animeStore.addToWatchlist(anime)
\`\`\`
Każda akcja jest **śledzona przez devtoolsy**! 🎯

## 2️⃣ Bezpośrednio (Yolo mode 🤠)
\`\`\`javascript
animeList.value = []
\`\`\`

## 3️⃣ \`$patch\` – Hurtowa zmiana 📦

**Obiekt:**
\`\`\`javascript
animeStore.$patch({
  animeList: [],
  loading: false
})
\`\`\`

**Funkcja (dla złożonej logiki):**
\`\`\`javascript
animeStore.$patch((state) => {
  state.animeList.splice(0, state.animeList.length)
  state.loading = false
})
\`\`\`

> 💡 \`$patch\` jest śledzony przez devtoolsy – jedna operacja patchowa!

## 4️⃣ \`$reset\` – Wielki Reset 🔄

\`\`\`javascript
animeStore.$reset() // Stan wraca do wartości początkowych!
\`\`\`

⚠️ **\`$reset\` działa tylko z Option Store!** W Setup Store napisz własną funkcję:

\`\`\`javascript
function resetStore() {
  animeList.value = []
  currentAnime.value = null
  loading.value = false
}
\`\`\``,
    category: 'vue',
    tags: ['pinia', 'mutacje', '$patch', '$reset', 'stan'],
    seriesName: 'Pinia od A do Z',
    seriesNameEn: 'Pinia from A to Z',
    seriesSlug: 'pinia-od-a-do-z',
    sortOrder: 7,
    readingTime: 6,
    emoji: '⚔️',
    status: 'published',
    dateCreated: '2025-06-07T10:00:00Z',
    dateUpdated: '2025-06-07T10:00:00Z',
  },
  {
    id: 8,
    slug: 'on-action',
    title: '🕵️ $onAction – Szpieg wśród akcji',
    titleEn: '🕵️ $onAction – Spy Among Actions',
    excerpt: 'Jak podsłuchiwać akcje w store? Poznaj $onAction – Twojego tajnego agenta do debuggowania i monitoringu.',
    excerptEn: 'How to eavesdrop on store actions? Meet $onAction – your secret agent for debugging and monitoring.',
    content: `# 🕵️ $onAction – Szpieg wśród akcji

\`$onAction\` to metoda, która pozwala „podsłuchiwać" każdą akcję na store. Jak kamera w magazynie – widzisz kto wchodzi, co robi i kiedy wychodzi 📹

\`\`\`javascript
animeStore.$onAction(({ name, args, after, onError }) => {
  console.log(\`Akcja "\${name}" wystartowała z: [\${args.join(', ')}]\`)

  after((result) => {
    console.log(\`Akcja "\${name}" zakończyła się pomyślnie!\`)
  })

  onError((error) => {
    console.error(\`Akcja "\${name}" się wysypała 💥:\`, error)
  })
})
\`\`\`

## Co mamy w callbacku?

- **\`name\`** – nazwa akcji (np. \`'fetchAnime'\`)
- **\`args\`** – argumenty wywołania
- **\`after\`** – hook po zakończeniu akcji
- **\`onError\`** – hook gdy coś pójdzie nie tak

> 🎯 Gdzie \`$onAction\` naprawdę błyszczy? W **pluginach**! O nich w następnym poście.`,
    category: 'vue',
    tags: ['pinia', '$onAction', 'debugowanie', 'monitoring'],
    seriesName: 'Pinia od A do Z',
    seriesNameEn: 'Pinia from A to Z',
    seriesSlug: 'pinia-od-a-do-z',
    sortOrder: 8,
    readingTime: 4,
    emoji: '🕵️',
    status: 'published',
    dateCreated: '2025-06-08T10:00:00Z',
    dateUpdated: '2025-06-08T10:00:00Z',
  },
  {
    id: 9,
    slug: 'pluginy-pinia',
    title: '🔌 Pluginy Pinii',
    titleEn: '🔌 Pinia Plugins',
    excerpt: 'Doładuj swojego ananasa! Trzy wzorce tworzenia pluginów – dodaj właściwość, nasłuchuj na mutacje, własna opcja.',
    excerptEn: 'Power up your pineapple! Three plugin patterns – add a property, listen for mutations, custom option.',
    content: `# 🔌 Pluginy: Doładuj swojego ananasa!

Plugin to po prostu **funkcja JavaScript**, która rozszerza Pinię. Dostajesz \`context\` z pełnym wglądem:

\`\`\`javascript
export function myPlugin(context) {
  context.pinia   // instancja Pinii
  context.app     // instancja Vue
  context.store   // aktualny store
  context.options // opcje z defineStore()
}
\`\`\`

## 📌 Rejestracja

\`\`\`javascript
const pinia = createPinia()
pinia.use(myPlugin) // 🔌 Podpięty!
\`\`\`

## 🧸 Wzorzec 1: Dodaj właściwość

\`\`\`javascript
function pluginProperty() {
  return { appName: 'Anime Explorer 🎬' }
}
pinia.use(pluginProperty)
// Teraz każdy store ma: store.appName
\`\`\`

## 👀 Wzorzec 2: Nasłuchuj na mutacje (\`$subscribe\`)

\`\`\`javascript
export function greetCaptainPlugin(context) {
  context.store.$subscribe((mutation, state) => {
    if (mutation.storeId === 'auth' && state.user?.username === 'luffy') {
      alert('🏴‍☠️ Kapitan jest na pokładzie!')
    }
  })
}
\`\`\`

## 🎛️ Wzorzec 3: Własna opcja w store

\`\`\`javascript
// Store z własną opcją:
export const useAuthStore = defineStore('auth', {
  state: () => ({ user: {} }),
  greeting: { enabled: true }  // 🆕 Własna opcja!
})

// Plugin sprawdza opcję:
export function greetPlugin({ store, options }) {
  if (options.greeting?.enabled) {
    store.$onAction(({ name, after }) => {
      if (name === 'login') after(() => alert('Witaj, Nakama! 🏴‍☠️'))
    })
  }
}
\`\`\`

> 🤯 W Setup Store własna opcja to **trzeci argument** \`defineStore\`!`,
    category: 'vue',
    tags: ['pinia', 'pluginy', '$subscribe', 'rozszerzenia'],
    seriesName: 'Pinia od A do Z',
    seriesNameEn: 'Pinia from A to Z',
    seriesSlug: 'pinia-od-a-do-z',
    sortOrder: 9,
    readingTime: 8,
    emoji: '🔌',
    status: 'published',
    dateCreated: '2025-06-09T10:00:00Z',
    dateUpdated: '2025-06-09T10:00:00Z',
  },
  {
    id: 10,
    slug: 'persistedstate-composables',
    title: '🌍 Persistedstate & Composables',
    titleEn: '🌍 Persistedstate & Composables',
    excerpt: 'Plugin z open source + composables w Setup Store. Utrwalaj stan i korzystaj z VueUse jak prawdziwy sensei!',
    excerptEn: 'Open source plugin + composables in Setup Store. Persist state and use VueUse like a true sensei!',
    content: `# 🌍 Persistedstate & Composables

## 💾 pinia-plugin-persistedstate

User loguje się, dodaje anime do watchlisty, odświeża stronę i... pusta watchlista? 😤 Nie z tym pluginem!

\`\`\`bash
npm install pinia-plugin-persistedstate
\`\`\`

\`\`\`javascript
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
\`\`\`

\`\`\`javascript
export const useAuthStore = defineStore('auth', {
  state: () => ({ user: {}, token: '' }),
  persist: true  // Stan przetrwa odświeżenie! 💾
})
\`\`\`

> 💡 Utrwalaj **tylko** store'y, które tego potrzebują. Dane wyszukiwania? Niech lecą jak odcinki fillera! 🍃

## 🗺️ Composables + Setup Store = Dream Team

Setup Store pozwala używać composables bezpośrednio wewnątrz store'a!

\`\`\`javascript
import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useFiltersStore = defineStore('filters', () => {
  const recentSearches = useLocalStorage('recent-searches', [])
  const searchQuery = ref('')

  watch(searchQuery, (newQuery) => {
    if (newQuery && !recentSearches.value.includes(newQuery)) {
      recentSearches.value.unshift(newQuery)
      if (recentSearches.value.length > 10) recentSearches.value.pop()
    }
  })

  return { recentSearches, searchQuery }
})
\`\`\`

> ⚡ Option Store nie daje tego komfortu. Setup Store trzyma wszystko razem – jak załoga na Thousand Sunny! 🚢`,
    category: 'vue',
    tags: ['pinia', 'persistedstate', 'composables', 'vueuse', 'localStorage'],
    seriesName: 'Pinia od A do Z',
    seriesNameEn: 'Pinia from A to Z',
    seriesSlug: 'pinia-od-a-do-z',
    sortOrder: 10,
    readingTime: 6,
    emoji: '🌍',
    status: 'published',
    dateCreated: '2025-06-10T10:00:00Z',
    dateUpdated: '2025-06-10T10:00:00Z',
  },
  {
    id: 11,
    slug: 'dobre-praktyki-architektura',
    title: '💡 Dobre praktyki i architektura',
    titleEn: '💡 Best Practices & Architecture',
    excerpt: 'Kod jak z mangi senseia! Modularne store\'y, service layer, feature-based structure i composable adaptery.',
    excerptEn: 'Code like from a sensei\'s manga! Modular stores, service layer, feature-based structure and composable adapters.',
    content: `# 💡 Dobre praktyki i architektura

## Zasady senseia 🥋

### 1️⃣ Jedno zagadnienie = jeden store
\`\`\`
✅ useAuthStore       → logowanie, token
✅ useAnimeStore      → lista, szczegóły
✅ useFiltersStore    → filtry, sortowanie
❌ useEverythingStore → WSZYSTKO (katastrofa!)
\`\`\`

### 2️⃣ Akcje do mutacji
\`\`\`javascript
// ❌ W komponencie bezpośrednio
animeStore.animeList.push(newAnime)
// ✅ Przez akcję
animeStore.addAnime(newAnime)
\`\`\`

### 3️⃣ Gettery > computed w komponentach (DRY!)

### 4️⃣ Try/catch w akcjach z fetch

### 5️⃣ Wydziel zapytania API do osobnych plików

### 6️⃣ Helper do fetch – DRY jak Sahara 🏜️

## 🏛️ Architektura

### Feature-based structure
\`\`\`
src/features/
  anime/
    components/
    stores/anime.js
    graphql/
  watchlist/
    components/
    stores/watchlist.js
\`\`\`

### Service Layer
Store zarządza **stanem**. Serwis zarządza **API**.

### Composable jako adapter
\`\`\`javascript
export function useAnimeSearch() {
  const animeStore = useAnimeStore()
  const { animeList, loading } = storeToRefs(animeStore)
  // Auto-search z debounce, onMounted logic...
  return { animeList, loading }
}
\`\`\`

Separation of Concerns jak z podręcznika! 📖`,
    category: 'vue',
    tags: ['pinia', 'dobre-praktyki', 'architektura', 'wzorce'],
    seriesName: 'Pinia od A do Z',
    seriesNameEn: 'Pinia from A to Z',
    seriesSlug: 'pinia-od-a-do-z',
    sortOrder: 11,
    readingTime: 9,
    emoji: '💡',
    status: 'published',
    dateCreated: '2025-06-11T10:00:00Z',
    dateUpdated: '2025-06-11T10:00:00Z',
  },
  {
    id: 12,
    slug: 'zaawansowane-podsumowanie',
    title: '🚀 Zaawansowane techniki & Cheat Sheet',
    titleEn: '🚀 Advanced Techniques & Cheat Sheet',
    excerpt: 'HMR, testowanie, TypeScript, SSR z Nuxt 3, optimistic updates i debounce. Na koniec – Twój ananasowy cheat sheet!',
    excerptEn: 'HMR, testing, TypeScript, SSR with Nuxt 3, optimistic updates and debounce. Finally – your pineapple cheat sheet!',
    content: `# 🚀 Zaawansowane techniki & Cheat Sheet

## 🔥 Hot Module Replacement (HMR)
\`\`\`javascript
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useAnimeStore = defineStore('anime', () => { /* ... */ })

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAnimeStore, import.meta.hot))
}
\`\`\`

## 🧪 Testowanie
\`\`\`javascript
import { setActivePinia, createPinia } from 'pinia'

beforeEach(() => {
  setActivePinia(createPinia()) // Świeża Pinia dla każdego testu!
})
\`\`\`

## 🦺 TypeScript – first-class support!
Setup Store inferuje typy automatycznie. Option Store – dookreśl interfejsem.

## 🌐 SSR / Nuxt 3
\`npx nuxi module add pinia\` – zero konfiguracji, automatyczna hydration!

## 🎭 Optimistic Updates
Zakładamy sukces → cofamy przy błędzie. Smooth UX! ⚡

## 📡 Debounce (z VueUse)
\`\`\`javascript
import { watchDebounced } from '@vueuse/core'
watchDebounced(searchQuery, async (q) => {
  if (q.length >= 3) await fetchAnime(q)
}, { debounce: 500 })
\`\`\`

---

## 🏁 Cheat Sheet

| Temat | Zapamiętaj |
| :--- | :--- |
| **Instalacja** | \`npm install pinia\` → \`createPinia()\` → \`app.use(pinia)\` |
| **Dwa style** | Options = obiektowy. Setup = funkcyjny |
| **Konwencja** | \`use\` + Nazwa + \`Store\` |
| **Modularność** | Jeden store = jedna odpowiedzialność |
| **Nested** | Import store w store |
| **Reaktywność** | \`storeToRefs()\` do destrukturyzacji |
| **Mutowanie** | Akcje, \`$patch\`, \`$reset\` |
| **Pluginy** | Funkcja + \`pinia.use()\` |
| **Composables** | Tylko w Setup Store |
| **Persistencja** | \`pinia-plugin-persistedstate\` |

## 🍍 Słowo na koniec

Pinia jest prosta, elastyczna i daje Ci wolność. Otwórz edytor i zacznij się bawić!

Luffy by powiedział: *"Kaizoku ou ni, ore wa naru!"* 🏴‍☠️👑`,
    category: 'vue',
    tags: ['pinia', 'zaawansowane', 'hmr', 'typescript', 'ssr', 'podsumowanie'],
    seriesName: 'Pinia od A do Z',
    seriesNameEn: 'Pinia from A to Z',
    seriesSlug: 'pinia-od-a-do-z',
    sortOrder: 12,
    readingTime: 8,
    emoji: '🚀',
    status: 'published',
    dateCreated: '2025-06-12T10:00:00Z',
    dateUpdated: '2025-06-12T10:00:00Z',
  },
]
