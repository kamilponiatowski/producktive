
# 📑 Spis treści

- [🍍 Pinia: Twój soczysty ananas w świecie Vue!](#-pinia-twój-soczysty-ananas-w-świecie-vue)
- [🧐 Czym jest Pinia?](#-czym-jest-pinia)
- [🛠️ Jak? Przejdźmy do mięsa! 🍖](#️-jak-przejdźmy-do-mięsa-)
- [🧙‍♂️ Tworzenie Store: Czas na Twoje pierwsze zaklęcia!](#️-tworzenie-store-czas-na-twoje-pierwsze-zaklęcia)
- [🏗️ Opcja nr 1: Option Store (Ten poukładany)](#️-opcja-nr-1-option-store-ten-poukładany)
- [⚡ Opcja nr 2: Setup Store (Ten nowoczesny)](#️-opcja-nr-2-setup-store-ten-nowoczesny)
- [🏰 Modułowe Store: Każdy ananas ma swoją palmę!](#️-modułowe-store-każdy-ananas-ma-swoją-palmę)
- [🤝 Nested Stores: Kiedy ananasy muszą ze sobą gadać](#-nested-stores-kiedy-ananasy-muszą-ze-sobą-gadać)
- [🔓 Dostęp do stanu: Jak czytać nasze skarby?](#-dostęp-do-stanu-jak-czytać-nasze-skarby)
- [⚔️ Mutowanie stanu: Sposoby na zmianę danych](#️-mutowanie-stanu-sposoby-na-zmianę-danych)
- [🕵️ $onAction – Szpieg wśród akcji](#️-onaction--szpieg-wśród-akcji)
- [🔌 Pluginy: Doładuj swojego ananasa!](#-pluginy-doładuj-swojego-ananasa)
- [🌍 Plugin z open source: pinia-plugin-persistedstate](#-plugin-z-open-source-pinia-plugin-persistedstate)
- [🗺️ Composables + Setup Store = Dream Team](#️-composables--setup-store--dream-team)
- [💡 Dobre praktyki: Kod jak z mangi senseia!](#️-dobre-praktyki-kod-jak-z-mangi-senseia)
- [🏛️ Architektura: Jak zaprojektować store'y w dużej aplikacji?](#️-architektura-jak-zaprojektować-storey-w-dużej-aplikacji)
- [🚀 Zaawansowane: Techniki, które robią różnicę!](#-zaawansowane-techniki-które-robią-różnicę)
- [🏁 Podsumowanie: Twój ananasowy cheat sheet!](#️-podsumowanie-twój-ananasowy-cheat-sheet)
- [🍍 Słowo na koniec](#-słowo-na-koniec)

# 🍍 Pinia: Twój soczysty ananas w świecie Vue!

## 🧐 Czym jest Pinia?

**Pinia** is a state management library for the Vue ecosystem that lets you share state between components and pages—without the headache.

### 🏝️ Once upon a time... (well, not that long ago!)
We used to share state using plain reactivity:  
`export const state = reactive({})`.

In the world of SPAs (Single Page Applications), this kind of worked, but it exposed our app to security holes. With server-side rendering (**SSR**), we were leaking data in requests—putting our secrets at risk. Not cool, right? 😱

Luckily, a pineapple fell straight from the palm tree—**Pinia**! 🍍  
Since then, we’ve had a much safer way to share state. It’s simple, elegant, and packed with “spells” so intuitive that using them is pure joy.

---

## 🛠️ How? Let’s get to the meat! 🍖

That’s what Luffy and developers love most. To start the pineapple fun, we first need to toss it into our basket (read: `package.json`):

```bash
npm install pinia
```

### 🍍 Planting the pineapple in main.js
Now we need to hook it up where we create our app and mount the root element.

1. **Create an instance::** Call createPinia() (import it straight from 'pinia').
2. **Join forces:** Once we have our app const app = createApp(App), we need to mount Pinia to it.
3. **Order matters:** Do app.use(pinia) before you run app.mount('#app'). We want our pineapple ready for action before the rest of the app jumps on stage!

```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia() // 🍍 Create the pineapple instance
const app = createApp(App)

app.use(pinia) // 🪄Pinia enters the game!
app.mount('#app') // ⚓Grab the id from index.html and mount
```

**WoW!!! Is it really that simple?** You bet! First step done. Congrats! 👏👏👏

Now that Pinia is installed, it’s time to create our first **Store**. WuuuHuuuu!!!

In the world of Pinia, there are two ways to write “spells”:
1. **Option Store** – the classic way, like Options API (data, methods, etc.), an object with keys and values.
2. **Setup Store** – the modern way, using the power of the Composition API (refs, computed, functions), where you quickly write what you want to do—just remember to return an object with what you used ;)

---

## 🧙‍♂️ Tworzenie Store: Czas na Twoje pierwsze zaklęcia!

Skoro nasz ananas 🍍 już rośnie w `main.js`, czas zbudować magazyn, w którym będziemy trzymać nasze skarby (dane). W Pinii mamy dwa główne style pisania "zaklęć":

| Cecha | **Option Store** (Klasyk) 📜 | **Setup Store** (Szybki i wściekły) 🏎️ |
| :--- | :--- | :--- |
| **Styl** | Obiektowy (jak Options API) | Funkcyjny (jak Composition API) |
| **State** | Funkcja `state: () => ({})` | Po prostu `ref()` lub `reactive()` |
| **Getters** | Obiekt `getters: {}` | Po prostu `computed()` |
| **Actions** | Obiekt `actions: {}` | Zwykłe funkcje `function action() {}` |

---

### 🆔 Dowód osobisty Store: Konwencja i ID

Zanim zaczniemy czarować, musimy nadać naszemu magazynowi nazwę. Tutaj konwencja jest **idiotoodporna** 🛡️:
1. Zaczynamy od `use`.
2. Dodajemy nazwę tego, czym zarządzamy (np. `Anime`).
3. Kończymy słowem `Store`.

Do stworzenia wszystkiego używamy funkcji `defineStore` importowanej prosto z Pinii.

```javascript
import { defineStore } from 'pinia'

// Pierwszy argument to unikalne ID (imię) naszego ananasa w DevToolsach
export const useAnimeStore = defineStore('anime', {
  // Tu dzieje się magia...
})
```

---

### 🏗️ Opcja nr 1: Option Store (Ten poukładany)

To podejście jest przejrzyste jak instrukcja klocków LEGO. Każdy ma swoje miejsce.

#### 💎 1. State (Dane)
To serce naszego magazynu. Zauważ, że `state` to funkcja strzałkowa, która zwraca obiekt. Dlaczego? Żeby Pinia mogła go bezpiecznie zainicjalizować przy każdym użyciu.

#### 🔍 2. Getters (Twoje lupy)
To takie `computed` z Vue. Służą do przeliczania danych ze stanu na poczekaniu. 
> **Ważne:** Musimy przekazać `state` jako parametr do gettera, bo te funkcje siedzą wewnątrz obiektu i Pinia musi im ten stan "wstrzyknąć", żeby wiedziały, na czym operują!

#### ⚔️ 3. Actions (Wojownicy od roboty)
Tu wrzucamy logikę, zapytania do API i zmiany danych. W Option Store wojownicy używają słowa `this`, żeby dobrać się do stanu.

```javascript
export const useAnimeStore = defineStore('anime', {
  state: () => ({
    animeList: [],
    loading: false,
    currentAnime: null
  }),
  getters: {
    // Przekazujemy state jako parametr!
    totalAnime: (state) => state.animeList.length,
    onlyOnePiece: (state) => state.animeList.filter(a => a.title.romaji === 'ONE PIECE')
  },
  actions: {
    async fetchAnime(search) {
      // Tu używamy 'this', żeby zapisać dane do stanu
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

Widzisz? Szukamy anime przez **AniList GraphQL API** (`https://graphql.anilist.co`). Wpisujemy „One Piece" i dostajemy listę wyników – z tytułami, liczbą odcinków i oceną. Luffy by się ucieszył! 🏴‍☠️

---

### ⚡ Opcja nr 2: Setup Store (Ten nowoczesny)

Tutaj nie bawimy się w sztywne ramki. Piszesz kod tak, jakbyś był wewnątrz `setup()` w komponencie. Używasz `ref()`, `computed()` i zwykłych funkcji. 

**Jedyna zasada:** Na końcu musisz zwrócić obiekt ze wszystkim, czego chcesz używać "na zewnątrz". To tak, jakbyś pakował plecak przed wyprawą – co do niego nie włożysz (nie zwrócisz), to zostanie w domu! 🏠

```javascript
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAnimeStore = defineStore('anime', () => {
  const animeList = ref([])         // To nasz state
  const loading = ref(false)
  const currentAnime = ref(null)

  const totalAnime = computed(() => animeList.value.length) // To nasz getter

  async function fetchAnime(search) {
    loading.value = true
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
    animeList.value = data.Page.media
    loading.value = false
  }

  // ZWRACAMY SKARBY! 📦
  return { animeList, loading, currentAnime, totalAnime, fetchAnime }
})
```

**WoW!!!** Mamy to. Wybraliśmy styl, nadaliśmy nazwę i zdefiniowaliśmy naszych wojowników. Pamiętaj: cokolwiek wybierzesz, efekt w aplikacji będzie ten sam – jeden, wspólny, bezpieczny stan! 🍍🔥

---

## 🏰 Modułowe Store: Każdy ananas ma swoją palmę!

Okej, mamy nasz pierwszy store. Pięknie. Ale co, jeśli masz apkę, która zarządza użytkownikami, anime, filtrami wyszukiwania i watchlistą? Czy wrzucimy to WSZYSTKO do jednego pliku? 

**Nie, błagam, nie rób tego!** 🙈

Pinia jest z natury **modularna** – i to jest jedna z jej najfajniejszych cech. Tworzymy osobny store dla każdej logicznej części naszej aplikacji. Każdy store = osobny plik. Porządek, czystość, harmonia. Jak dobrze zrobione bento box 🍱

### 🤔 Ale jak rozdzielić store'y?

Czasem to oczywiste. Masz logowanie, rejestrację, wylogowanie? To wszystko kręci się wokół **użytkownika**:

```javascript
// 📄 src/stores/auth.js
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {},
    message: ''
  }),
  actions: {
    async login(username, password) { /* ... */ },
    async register(name, username, password) { /* ... */ },
    logout() { /* ... */ }
  }
})
```

Jeden store, jedno zagadnienie. Proste jak drut! 👌

### 🧩 A kiedy nie jest tak oczywiste?

Wyobraź sobie apkę do szukania anime – **Anime Explorer** 🎬. Masz dwa inputy:
- **Szukaj** – szuka anime po tytule (np. „Dragon Ball") 
- **Gatunek** – filtruje po gatunku (Action, Adventure, Comedy...)

Oba korzystają z AniList GraphQL API. To znaczy, że powinny być w jednym store? **Hmm, nie tak szybko!** 🛑

Zadaj sobie pytanie: **czego dotyczą dane, które śledzisz?**

- Dane o **filtrach** (gatunek, sezon, rok, typ sortowania) → `filters.js`
- Dane o **anime** (lista wyników, szczegóły, odcinki, oceny) → `anime.js`

Mimo że oba korzystają z tego samego API, dotyczą **różnych logicznych zagadnień**. Nie twórz store'a wokół narzędzia (np. „anilistStore") – twórz go wokół **tego, co dane reprezentują**.

> 💡 **Pro tip:** Zastanów się: „Jakie dane śledzę? Do czego są używane? Czy mogę je logicznie pogrupować?" – i masz swoją odpowiedź! Goku nie dzieli kamehameha z Vegetą, bo każdy wojownik ma własny arsenał technik! 💥

### 📁 Struktura folderów

```
src/
  stores/
    auth.js          // 👤 Użytkownik: login, register, logout
    filters.js       // 🔍 Filtry: gatunek, sezon, rok, sortowanie
    anime.js         // 🎬 Anime: lista, szczegóły, wyszukiwanie
    watchlist.js     // ❤️ Watchlista: dodawanie, usuwanie, lista
```

Każdy plik to osobny store, każdy z unikalnym ID, każdy widoczny w devtoolsach. Piękna rzecz. 🤩

---

## 🤝 Nested Stores: Kiedy ananasy muszą ze sobą gadać

Oddzieliliśmy nasze store'y – super. Ale co, jeśli store anime potrzebuje danych z filtrów? Nie chcemy duplikować stanu! Potrzebujemy, żeby nasze store'y mogły ze sobą rozmawiać. To właśnie **Nested Stores** (zagnieżdżone store'y).

### ⚡ Nested Store w Setup Store

W Setup Store importujemy i wywołujemy `useStore()` na **górze** funkcji setup. I gotowe – mamy dostęp wszędzie wewnątrz!

```javascript
// 📄 src/stores/anime.js
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useFiltersStore } from './filters'

export const useAnimeStore = defineStore('anime', () => {
  // 🔌 Podpinamy się do store filtrów – na górze, raz!
  const filtersStore = useFiltersStore()

  const animeList = ref([])
  const loading = ref(false)

  async function searchAnime() {
    loading.value = true
    // Korzystamy z danych filtrów – zero problemów! 🌍
    const genre = filtersStore.selectedGenre
    const season = filtersStore.selectedSeason
    const year = filtersStore.selectedYear

    const query = `
      query ($genre: String, $season: MediaSeason, $seasonYear: Int) {
        Page(perPage: 20) {
          media(type: ANIME, genre: $genre, season: $season, seasonYear: $seasonYear, sort: POPULARITY_DESC) {
            id
            title { romaji english }
            episodes
            averageScore
            coverImage { large }
            genres
          }
        }
      }
    `
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables: { genre, season, seasonYear: year }
      })
    })
    const { data } = await response.json()
    animeList.value = data.Page.media
    loading.value = false
  }

  return { animeList, loading, searchAnime }
})
```

### 📜 Nested Store w Option Store

W Option Store sprawa jest trochę mniej wygodna. Musimy wywołać `useStore()` **wewnątrz** konkretnej akcji lub gettera, gdzie go potrzebujemy:

```javascript
// 📄 src/stores/watchlist.js
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export const useWatchlistStore = defineStore('watchlist', {
  state: () => ({
    userWatchlist: []
  }),
  actions: {
    async getWatchlist() {
      // Musimy wywołać tutaj, wewnątrz akcji!
      const authStore = useAuthStore()
      
      // Filtrujemy watchlistę po zalogowanym userze
      const allItems = await fetchWatchlist()
      this.userWatchlist = allItems.filter(
        item => item.userId === authStore.user.id
      )
    }
  }
})
```

> 🏆 **Setup Store wygrywa** tu na wygodzie – raz importujesz na górze i masz dostęp we wszystkich akcjach i getterach. W Option Store musisz importować w każdym miejscu osobno. Jak Luffy – raz zje Owoc Diabelski i ma moc na zawsze, a nie za każdym razem od nowa! 🍇

---

## 🔓 Dostęp do stanu: Jak czytać nasze skarby?

Mamy store, mamy dane – ale jak się do nich dobrać? Spokojnie, Pinia daje nam kilka sposobów i każdy jest intuicyjny. Rozłóżmy to na czynniki pierwsze! 🔬

### 🏠 Wewnątrz Store

#### Option Store
W akcjach używamy `this`, a w getterach przekazujemy `state` jako parametr:

```javascript
export const useAnimeStore = defineStore('anime', {
  state: () => ({
    animeList: [],
    currentAnime: null
  }),
  getters: {
    // getter dostaje state jako parametr ↓
    topRated: (state) => {
      return [...state.animeList]
        .sort((a, b) => b.averageScore - a.averageScore)
        .slice(0, 5)
    },
    currentTitle: (state) => {
      if (state.currentAnime) {
        return state.currentAnime.title.romaji || state.currentAnime.title.english
      }
      return 'Brak wybranego anime'
    }
  },
  actions: {
    async fetchAnimeById(id) {
      const query = `
        query ($id: Int) {
          Media(id: $id, type: ANIME) {
            id
            title { romaji english native }
            description
            episodes
            averageScore
            genres
            coverImage { large }
          }
        }
      `
      const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { id } })
      })
      const { data } = await response.json()
      this.currentAnime = data.Media // ← 'this' wskazuje na store
    }
  }
})
```

#### Setup Store
Zero `this`, zero `state` jako parametr. Po prostu łapiesz zmienne bezpośrednio – jak w `<script setup>` w komponencie:

```javascript
export const useFiltersStore = defineStore('filters', () => {
  const searchQuery = ref('')
  const selectedGenre = ref('')

  // getter – bezpośredni dostęp do searchQuery
  const hasActiveFilters = computed(() => {
    return searchQuery.value !== '' || selectedGenre.value !== ''
  })

  // akcja – bezpośredni dostęp do searchQuery
  function clearFilters() {
    searchQuery.value = ''
    selectedGenre.value = ''
  }

  return { searchQuery, selectedGenre, hasActiveFilters, clearFilters }
})
```

Widzisz tę różnicę? Setup Store jest jak rozmowa z kumplem – bezpośrednio, bez formalności. Option Store wymaga trochę więcej „protokołu". 😄

### 🖥️ W komponencie

To najczęstszy scenariusz. Importujesz store, wywołujesz hook i jazda:

```vue
<script setup>
import { useAnimeStore } from '../stores/anime'

const animeStore = useAnimeStore()

// Teraz masz dostęp do wszystkiego! 🎉
console.log(animeStore.animeList)     // state
console.log(animeStore.topRated)      // getter
animeStore.fetchAnimeById(21)         // akcja – ONE PIECE ma ID 21 na AniList!
</script>
```

### 🧨 Destrukturyzacja? Uważaj na pułapkę!

Pewnie od razu chcesz zrobić:

```javascript
const { animeList } = animeStore // ❌ NOPE! Straciłeś reaktywność!
```

**STOP!** ✋ Jeśli tak zrobisz, `animeList` straci reaktywność i Twój komponent nie będzie się aktualizował. To jak odebrać Goku jego Super Saiyan – zostaje zwykłym gościem 🦸‍♂️➡️🧑

Rozwiązanie? Pinia daje nam magiczny helper **`storeToRefs`**:

```javascript
import { storeToRefs } from 'pinia'

const animeStore = useAnimeStore()
const { animeList, currentAnime } = storeToRefs(animeStore) // ✅ Reaktywność zachowana!
```

> ⚠️ **Zapamiętaj:** `storeToRefs` używamy **tylko** do stanu i getterów. Akcji (metod) NIE owijamy w `storeToRefs` – je destrukturyzujemy normalnie, bo to zwykłe funkcje, które nie potrzebują reaktywności.

```javascript
const { animeList, topRated } = storeToRefs(animeStore)       // stan i gettery
const { fetchAnime, fetchAnimeById } = animeStore              // akcje – normalnie!
```

### 🔗 v-model: Dwukierunkowe wiązanie ze stanem

Pinia gra pięknie z `v-model`! Możesz bindować inputy bezpośrednio do stanu w store:

```vue
<script setup>
import { storeToRefs } from 'pinia'
import { useFiltersStore } from '../stores/filters'

const filtersStore = useFiltersStore()
const { searchQuery } = storeToRefs(filtersStore)
</script>

<template>
  <div>
    <label for="search">Szukaj anime:</label>
    <!-- v-model binduje input bezpośrednio do stanu store! 🔥 -->
    <input v-model="searchQuery" placeholder="np. One Piece, Dragon Ball..." />
  </div>
</template>
```

Gdy user wpisze „Dragon Ball" w input – stan w store zmieni się automatycznie. A jeśli w store mamy watchera na `searchQuery`, odpali się natychmiast i pobierze wyniki z AniList API. Magia? Nie – Pinia! 🍍✨

---

## ⚔️ Mutowanie stanu: Sposoby na zmianę danych

Okej, teraz zagadnienie, które budzi emocje! Jak zmieniać stan w Pinii? Otóż... Pinia jest tu dość **liberalna**. Jeśli znasz Vuex-a, pewnie pamiętasz, że tam jedyną drogą do zmiany stanu było: `dispatch` → `commit` → `mutation`. Taki biurokratyczny łańcuszek. 📋

Pinia mówi: **„Hej, jesteś dorosły. Sam zdecyduj, jak chcesz zmieniać stan."** I daje nam kilka opcji:

### 1️⃣ Przez akcje (Klasyka)

Najczęstszy i najbardziej przewidywalny sposób. Wywołujesz akcję w store, a ona zmienia stan:

```vue
<template>
  <button @click="watchlistStore.addToWatchlist(anime)">
    Dodaj do watchlisty ❤️
  </button>
</template>
```

```javascript
// 📄 src/stores/watchlist.js
actions: {
  async addToWatchlist(anime) {
    const authStore = useAuthStore()
    const body = {
      userId: authStore.user.id,
      animeId: anime.id,
      title: anime.title.romaji,
      coverImage: anime.coverImage.large
    }
    await fetch('/api/watchlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    this.userWatchlist.push(body) // Dodajemy lokalnie!
  }
}
```

Plusy? Każda akcja jest **śledzona przez devtoolsy** i łatwa do odnalezienia w kodzie. Masz pełną kontrolę! 🎯

### 2️⃣ Bezpośrednio (Yolo mode 🤠)

Tak, Pinia pozwala po prostu przypisać nową wartość:

```javascript
const { searchQuery, animeList } = storeToRefs(animeStore)

watch(searchQuery, (newVal) => {
  if (!newVal) {
    animeList.value = []  // Bezpośrednio czyścimy wyniki!
  }
})
```

Czy to zło? Niekoniecznie. W prostych przypadkach (resetowanie listy) jest to szybkie i czytelne. Ale pamiętaj – im więcej ludzi pracuje nad projektem, tym więcej chaosu to może wprowadzić. Sam zdecyduj, co pasuje do Twojego case'u. Nawet Vegeta miewa chwile, gdy idzie na skróty! 😏

### 3️⃣ `$patch` – Hurtowa zmiana stanu 📦

A co, jeśli chcesz zmienić **kilka** właściwości stanu naraz? Zamiast pisać pięć osobnych przypisań, użyj `$patch`:

#### Obiekt:
```javascript
animeStore.$patch({
  animeList: [],
  currentAnime: null,
  loading: false
})
```

#### Funkcja (dla bardziej złożonej logiki):
```javascript
animeStore.$patch((state) => {
  state.animeList.splice(0, state.animeList.length)
  state.currentAnime = null
  state.loading = false
})
```

> 💡 **Kiedy używać `$patch` z funkcją?** Gdy musisz korzystać z metod tablicowych takich jak `splice`, `push`, `filter` itd. Funkcja daje Ci pełną kontrolę nad logiką zmiany stanu.

**Fajny bonus:** `$patch` jest śledzony przez devtoolsy! Więc zawsze będziesz wiedział, że zmiana przyszła z jednej operacji patchowej, a nie pięciu osobnych mutacji.

### 4️⃣ `$reset` – Wielki Reset 🔄

Chcesz cofnąć cały store do wartości początkowych? Pinia daje Ci **`$reset`** i jest to tak proste, jak kliknięcie „Nowa gra" na konsolce:

```javascript
// 📄 W akcji store
actions: {
  logout() {
    this.$reset() // 💥 Cały stan wraca do wartości początkowych!
    router.push('/')
  }
}

// 📄 W komponencie
animeStore.$reset()

// 📄 W routerze (!)
router.beforeEach((to) => {
  const animeStore = useAnimeStore()
  if (to.name === 'home') animeStore.$reset()
})
```

Tak, dobrze widzisz – możesz użyć `$reset` nawet w **routerze**! Np. czyścisz wyniki wyszukiwania, gdy user wraca na stronę główną. Jak Shenron resetuje świat po życzeniu! 🐉

#### ⚠️ Uwaga: `$reset` działa tylko z Option Store!

Dlaczego? Bo `$reset` polega na funkcji `state()`, żeby wiedzieć, jakie były oryginalne wartości:

```javascript
// Option Store ma jawną funkcję state ↓
state: () => ({
  animeList: []  // Pinia wie, że to jest "wartość zero"
})
```

W Setup Store takiej funkcji nie ma, więc Pinia nie wie, do czego resetować. Ale spokojnie – możesz napisać własną akcję resetującą:

```javascript
// 📄 Setup Store – własny reset
function resetAnimeStore() {
  animeList.value = []
  currentAnime.value = null
  loading.value = false
}
```

Albo... możesz napisać do tego plugin! Ale o tym zaraz 😏

---

## 🕵️ `$onAction` – Szpieg wśród akcji

Zanim przejdziemy do pluginów, poznajmy jeszcze jednego bohatera. `$onAction` to metoda, która pozwala Ci „podsłuchiwać" każdą akcję, jaka jest wywołana na store. To jak zainstalowanie kamery w magazynie – widzisz kto wchodzi, co robi i kiedy wychodzi 📹

```javascript
animeStore.$onAction(({ name, store, args, after, onError }) => {
  console.log(`Akcja "${name}" wystartowała z parametrami: [${args.join(', ')}]`)

  after((result) => {
    console.log(`Akcja "${name}" zakończyła się pomyślnie!`)
  })

  onError((error) => {
    console.error(`Akcja "${name}" się wysypała 💥:`, error)
  })
})
```

Co tu mamy?
- **`name`** – nazwa akcji (np. `'fetchAnime'`, `'fetchAnimeById'`)
- **`args`** – argumenty, z jakimi została wywołana
- **`after`** – hook, który odpala się **po** zakończeniu akcji
- **`onError`** – hook, który odpala się, gdy coś pojdzie nie tak

To jest mega przydatne do debuggowania. Ale, prawdę mówiąc, devtools i tak pokazują Ci to wszystko. Gdzie więc `$onAction` naprawdę błyszczy? W **pluginach**! A o nich zaraz pogadamy dokładnie. 🎯

---

## 🔌 Pluginy: Doładuj swojego ananasa!

No i dotarliśmy do crème de la crème Pinii – **pluginów**! 🎉

Plugin to sposób na rozszerzenie Pinii o funkcjonalności, których nie ma „z pudełka". Bo serio – twórcy Pinii nie są w stanie przewidzieć KAŻDEJ potrzeby developera. Ale dali nam narzędzia, żebyśmy sami sobie dobudowali to, czego potrzebujemy. Jak klocki LEGO – bazowy zestaw jest cool, ale te niestandardowe elementy? 🤌 *chef's kiss!*

### 🏗️ Anatomia plugina

Plugin to po prostu **funkcja**. Tak, zwykła funkcja JavaScript. Nic więcej. A Pinia automatycznie wstrzykuje do niej **`context`** – obiekt z informacjami o Twojej instancji:

```javascript
export function myPiniaPlugin(context) {
  context.pinia   // instancja Pinii (ta z createPinia())
  context.app     // instancja aplikacji Vue (ta z createApp())
  context.store   // store, do którego plugin jest dodawany
  context.options // opcje przekazane do defineStore()
}
```

Czyli dostajesz **totalny wgląd** w to, co się dzieje w Twojej aplikacji. Czujesz tę moc? To jak dostać mapę do skarbu! 🗺️

### 📌 Rejestracja plugina

Tworzymy plugin, a potem mówimy Pinii, żeby go użyła. Gdzie? W `main.js`, oczywiście:

```javascript
// 📄 main.js
import { createPinia } from 'pinia'
import { myPiniaPlugin } from './stores/plugins/myPlugin'

const pinia = createPinia()
pinia.use(myPiniaPlugin) // 🔌 Plugin podpięty!
```

I to tyle! Teraz za każdym razem, gdy **jakikolwiek** store zostanie utworzony, Pinia oddzwoni do Twojego plugina i pozwoli mu zrobić swoje. Fajna umowa, prawda?

Teraz zobaczmy trzy główne wzorce tworzenia pluginów! 🎯

---

### 🧸 Wzorzec 1: Dodaj właściwość lub metodę do store

Chcesz, żeby każdy store miał jakąś dodatkową właściwość albo funkcję? Zwróć obiekt z plugina, a Pinia doda go do wszystkich store'ów:

#### Dodajemy właściwość:

```javascript
// 📄 main.js
function pluginProperty() {
  return {
    appName: 'Anime Explorer 🎬 – Powered by AniList API'
  }
}

pinia.use(pluginProperty)
```

Teraz **każdy** store w Twojej aplikacji będzie miał właściwość `appName`. Możesz ją użyć np. tak:

```javascript
// W dowolnym komponencie
const animeStore = useAnimeStore()
console.log(animeStore.appName) // "Anime Explorer 🎬 – Powered by AniList API"
```

#### Dodajemy metodę:

```javascript
// 📄 src/stores/plugins/pluginMethod.js
export function pluginMethod(context) {
  return {
    logContext() {
      console.log('Oto mój context:', context)
    }
  }
}
```

```javascript
// 📄 main.js
import { pluginMethod } from './stores/plugins/pluginMethod'
pinia.use(pluginMethod)
```

Teraz w store możesz wywołać `this.logContext()` (w Option Store) i podejrzeć cały context w konsoli. Idealny helper do debuggowania! 🐛

> 💡 **Fun fact:** Właściwości i metody dodane przez pluginy trafiają do sekcji `customProperties` w devtoolsach. Więc nie zginą Ci w morzu danych!

---

### 👀 Wzorzec 2: Plugin reagujący na mutacje lub akcje

Tu zaczyna się prawdziwa zabawa. Pamiętasz `$onAction`? A co powiesz na **`$subscribe`**? To metoda podobna do `watch` z Vue – pozwala „nasłuchiwać" na mutacje w store i odpalać efekty uboczne.

#### `$subscribe` – obserwuj mutacje

Wyobraź sobie, że chcesz wiedzieć, kiedy Luffy (admin) się loguje. Plugin z `$subscribe` załatwia to w trzech linijkach:

```javascript
// 📄 src/stores/plugins/greetCaptainPlugin.js
export function greetCaptainPlugin(context) {
  context.store.$subscribe((mutation, state) => {
    if (mutation.storeId === 'auth') {
      if (state.user && state.user.username === 'luffy') {
        alert('🏴‍☠️ Kapitan jest na pokładzie! Witamy króla piratów!')
      }
    }
  })
}
```

```javascript
// 📄 main.js
pinia.use(greetCaptainPlugin)
```

Jak to działa? Plugin uruchamia się przy tworzeniu **każdego** store, ale `$subscribe` daje nam dostęp do `mutation.storeId`, więc możemy filtrować i reagować **tylko** na zmiany w tym store, który nas interesuje. Sprytne! 🧠

#### `$onAction` w pluginie – reaguj na konkretne akcje

A teraz coś bardziej wyrafinowanego. Chcemy powitać usera inaczej, w zależności od tego, czy się loguje, rejestruje, czy wylogowuje:

```javascript
// 📄 src/stores/plugins/greetUserPlugin.js
export function greetUserPlugin({ store }) {
  store.$onAction(({ name, after }) => {
    if (store.$id === 'auth') {
      switch (name) {
        case 'login':
          after(() => alert('Witaj ponownie, Nakama! 🏴‍☠️'))
          break
        case 'logout':
          after(() => alert('Sayonara! Do następnej przygody! 👋'))
          break
        case 'register':
          after(() => alert('Nowy członek załogi! Youkoso! 🌟'))
          break
      }
    }
  })
}
```

Zwróć uwagę na **`after()`** – dzięki niemu alert pokazuje się **dopiero po** zakończeniu akcji. Nie chcemy witać usera, zanim system potwierdzi, że logowanie się udało, prawda? 😅

#### 🔥 Elegancki use-case: łapanie błędów

Twórca Pinii, Eduardo San Martin Morote, pokazał pewien sprytny wzorzec. Możesz użyć `$onAction` z hookiem `onError`, żeby przechwytywać błędy z akcji i wysyłać je do serwisu monitoringowego (np. Sentry):

```javascript
// 📄 Plugin do łapania błędów w akcjach
export function errorTrackingPlugin({ store }) {
  store.$onAction(({ name, args, onError }) => {
    onError((error) => {
      // Wysyłamy do serwisu monitoringowego
      sendToErrorService({
        storeName: store.$id,
        actionName: name,
        args: args,
        error: error
      })
    })
  })
}
```

To jest **niewiarygodnie przydatne** na produkcji. Błędy, które normalnie byłyby ciche i trudne do namierzenia, teraz grzecznie zgłaszają się do Ciebie. Jak dobrze wytrenowany pirat do swojego kapitana! 🏴‍☠️

---

### 🎛️ Wzorzec 3: Własna opcja w store

To mój ulubiony wzorzec, bo daje Ci coś naprawdę elastycznego: możliwość **wysyłania danych z konkretnego store bezpośrednio do plugina**.

Wiemy, że Option Store ma opcje: `state`, `getters`, `actions`. Ale co, jeśli dodamy **własną opcję**? Pinia na to pozwala!

```javascript
// 📄 src/stores/auth.js – dodajemy własną opcję 'greeting'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {}
  }),
  actions: {
    login(username, password) { /* ... */ },
    logout() { /* ... */ },
    register(name, user, pass) { /* ... */ }
  },
  // 🆕 Nasza własna opcja!
  greeting: {
    enabled: true
  }
})
```

A teraz w pluginie sprawdzamy, czy ta opcja istnieje i czy jest włączona:

```javascript
// 📄 src/stores/plugins/greetUserPlugin.js
export function greetUserPlugin({ store, options }) {
  // Sprawdzamy, czy dany store ma opcję 'greeting' i czy jest włączona
  if (options.greeting && options.greeting.enabled) {
    store.$onAction(({ name, after }) => {
      switch (name) {
        case 'login':
          after(() => alert('Witaj ponownie, Nakama! 🏴‍☠️'))
          break
        case 'logout':
          after(() => alert('Sayonara! Do następnej przygody! 👋'))
          break
        case 'register':
          after(() => alert('Nowy członek załogi! Youkoso! 🌟'))
          break
      }
    })
  }
}
```

Czemu to jest takie cool? Bo teraz możesz **włączać i wyłączać plugin per store**! Masz 10 store'ów, a chcesz greeting tylko w `auth`? Ustawiasz `greeting: { enabled: true }` tylko tam. Reszta store'ów? Spokój, nikt ich nie rusza.

#### Setup Store też może mieć własne opcje!

W Setup Store dodajemy opcję jako **trzeci argument** `defineStore`:

```javascript
// 📄 src/stores/auth.js (Setup Store z opcją)
export const useAuthStore = defineStore('auth', () => {
  const user = ref({})

  async function login(username, password) { /* ... */ }
  function logout() { /* ... */ }

  return { user, login, logout }
}, {
  // Trzeci argument – opcje plugina! 🧩
  greeting: {
    enabled: true
  }
})
```

> 🤯 **Mind = blown?** Tak, ten trzeci argument to mało znana, ale potężna cecha. Daje Setup Store'om te same możliwości co Option Store'om w kontekście pluginów!

---

## 🌍 Plugin z open source: `pinia-plugin-persistedstate`

Tworzenie własnych pluginów to potęga, ale nie musisz wymyślać koła na nowo! Społeczność Vue stworzyła już wiele gotowych pluginów. Jednym z najpopularniejszych jest **`pinia-plugin-persistedstate`** – utrwala stan w przeglądarce, żeby przetrwał odświeżenie strony.

Bo wyobraź sobie: user loguje się, dodaje „One Piece" i „Dragon Ball Z" do watchlisty, odświeża stronę i... pusta watchlista. Frustrujące! 😤 Ten plugin to naprawia.

### Instalacja i konfiguracja

```bash
npm install pinia-plugin-persistedstate
```

```javascript
// 📄 main.js
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) // 💾 Persistencja włączona!
```

### Użycie w store

```javascript
// 📄 src/stores/auth.js
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {},
    token: ''
  }),
  // Dodaj tę jedną linijkę i gotowe! 🎯
  persist: true
})
```

I to tyle! Teraz `user` i `token` przetrwają odświeżenie przeglądarki. Stan jest zapisywany w `localStorage` domyślnie, ale możesz to skonfigurować (np. na `sessionStorage` albo cookie).

> 💡 **Pro tip:** Nie utrwalaj WSZYSTKICH store'ów. Utrwalaj **tylko** te, które tego potrzebują (np. auth, watchlista). Dane z wyszukiwania anime? Niech sobie lecą jak odcinki fillera! 🍃

---

## 🗺️ Composables + Setup Store = Dream Team

Pamiętasz, jak mówiliśmy o zaletach Setup Store? Oto jedna z najfajniejszych: możesz używać **composables** (w tym tych z biblioteki VueUse) bezpośrednio wewnątrz store! 🤯

Przykład z prawdziwego życia: chcemy automatycznie śledzić preferencje dark mode usera i zapamiętywać ostatnio wyszukiwane anime. Używamy `useLocalStorage` z biblioteki VueUse:

```javascript
// 📄 src/stores/filters.js
import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useFiltersStore = defineStore('filters', () => {
  // 🛰️ Composable prosto w store! Automatycznie syncuje z localStorage
  const recentSearches = useLocalStorage('recent-anime-searches', [])
  const selectedGenre = ref('')
  const searchQuery = ref('')

  // Watcher dodaje wyszukiwanie do historii
  watch(searchQuery, (newQuery) => {
    if (newQuery && !recentSearches.value.includes(newQuery)) {
      recentSearches.value.unshift(newQuery)
      // Trzymamy max 10 ostatnich wyszukiwań
      if (recentSearches.value.length > 10) {
        recentSearches.value.pop()
      }
    }
  })

  function clearRecentSearches() {
    recentSearches.value = []
  }

  return { recentSearches, selectedGenre, searchQuery, clearRecentSearches }
})
```

Dlaczego to działa? Bo `useLocalStorage` musi być wywołane wewnątrz reaktywnego kontekstu Vue (np. w `setup()`), a nasza funkcja w Setup Store jest właśnie takim kontekstem! 

Watcher jest tu kluczowy – automatycznie dodaje nowe wyszukiwania do historii i trzyma ją w `localStorage`. User wraca po tygodniu i widzi: „Aha, ostatnio szukałem Dragon Ball Super i Jujutsu Kaisen!" ✨

> ⚡ **Option Store nie daje Ci tego komfortu.** Mógłbyś użyć composable w komponencie i stamtąd wywołać akcję w store, ale to rozbija logikę w kilka miejsc. Setup Store trzyma wszystko razem – jak załoga Słomkowego Kapelusza na Thousand Sunny! 🚢

---

## 💡 Dobre praktyki: Kod jak z mangi senseia!

Skoro znamy już wszystkie zaklęcia Pinii, pora na mądrości, które odróżniają genina od kage (tak, mały crossover z Naruto 😅). Te praktyki sprawią, że Twój kod będzie czytelny, wydajny i łatwy w utrzymaniu. 

### 1️⃣ Jedno zagadnienie = jeden store

Już o tym mówiliśmy, ale powtórzę, bo to **fundamentalna zasada**. Nie twórz monolitycznego store, który zarządza wszystkim. Każdy store powinien mieć jasno określoną odpowiedzialność:

```
✅ useAuthStore       → logowanie, rejestracja, token
✅ useAnimeStore      → lista anime, szczegóły, wyszukiwanie
✅ useWatchlistStore  → ulubione anime usera
✅ useFiltersStore    → filtry, sortowanie, gatunek

❌ useEverythingStore → WSZYSTKO (katastrofa!)
```

### 2️⃣ Akcje do mutacji, nie bezpośrednia zmiana stanu

W małym projekcie solo? Bezpośrednia zmiana stanu ujdzie. W teamie? **Zawsze używaj akcji.** Dlaczego?

- Akcje są **śledzone przez devtoolsy** 🔍
- Akcje mają **opisowe nazwy** – wiesz co robi `addToWatchlist()` vs tajemnicze `watchlist.value.push(x)`
- Akcje mogą zawierać **walidację i logikę biznesową**

```javascript
// ❌ Kiepsko – w komponencie bezpośrednio
animeStore.animeList.push(newAnime)

// ✅ Dobrze – przez akcję
animeStore.addAnime(newAnime)
```

### 3️⃣ Gettery do obliczonych danych, nie computed w komponentach

Jeśli obliczenie dotyczy danych z store – przenieś je do **gettera**. Dzięki temu:
- Logika jest w **jednym miejscu** (DRY)
- Każdy komponent korzysta z **tego samego wyniku**
- Getter jest **cache'owany** – nie liczy się od nowa, jeśli dane się nie zmieniły

```javascript
// ❌ Kiepsko – computed w każdym komponencie osobno
const topAnime = computed(() => 
  animeStore.animeList.filter(a => a.averageScore > 80)
)

// ✅ Dobrze – getter w store (raz, dla wszystkich!)
getters: {
  topAnime: (state) => state.animeList.filter(a => a.averageScore > 80)
}
```

### 4️⃣ Obsługa błędów w akcjach

Każda akcja, która robi `fetch`, powinna mieć **try/catch**. Nie pozwól, żeby ciche błędy zabiły UX:

```javascript
async function fetchAnime(search) {
  loading.value = true
  error.value = null
  try {
    const query = `
      query ($search: String) {
        Page(perPage: 10) {
          media(search: $search, type: ANIME) {
            id
            title { romaji english }
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
    const { data, errors } = await response.json()

    if (errors) {
      throw new Error(errors[0].message)
    }
    animeList.value = data.Page.media
  } catch (err) {
    error.value = err.message
    console.error('Błąd pobierania anime:', err)
  } finally {
    loading.value = false
  }
}
```

### 5️⃣ Wydziel zapytania GraphQL do osobnych plików

Gdy Twoja apka rośnie, a zapytania do AniList robią się rozbudowane, warto je wydzielić:

```
src/
  graphql/
    queries/
      searchAnime.js
      getAnimeById.js
      getTrending.js
    mutations/
      toggleFavorite.js
```

```javascript
// 📄 src/graphql/queries/searchAnime.js
export const SEARCH_ANIME_QUERY = `
  query ($search: String, $page: Int = 1) {
    Page(page: $page, perPage: 20) {
      pageInfo { hasNextPage }
      media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
        id
        title { romaji english native }
        episodes
        averageScore
        coverImage { large }
        genres
      }
    }
  }
`
```

```javascript
// 📄 src/stores/anime.js
import { SEARCH_ANIME_QUERY } from '../graphql/queries/searchAnime'

async function fetchAnime(search) {
  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: SEARCH_ANIME_QUERY, variables: { search } })
  })
  // ...
}
```

### 6️⃣ Helper do fetch – DRY jak Sahara 🏜️

Zamiast powtarzać `fetch('https://graphql.anilist.co', ...)` w każdym store, stwórz helper:

```javascript
// 📄 src/helpers/anilistFetch.js
const ANILIST_URL = 'https://graphql.anilist.co'

export async function anilistFetch(query, variables = {}) {
  const response = await fetch(ANILIST_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables })
  })

  const { data, errors } = await response.json()

  if (errors) {
    throw new Error(errors[0].message)
  }

  return data
}
```

Teraz w store:

```javascript
import { anilistFetch } from '../helpers/anilistFetch'
import { SEARCH_ANIME_QUERY } from '../graphql/queries/searchAnime'

async function fetchAnime(search) {
  loading.value = true
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

Czysto, krótko, z klasą! Goku approves! 👍

---

## 🏛️ Architektura: Jak zaprojektować store'y w dużej aplikacji?

Okej, pora porozmawiać jak dorośli. Masz małą apkę z jednym store? Nie potrzebujesz architektury. Ale gdy Twoja aplikacja rośnie jak seria Dragon Ball (Z, Super, Daima...), potrzebujesz **planu**. Oto sprawdzone wzorce architektoniczne.

### 📐 Wzorzec 1: Feature-based structure (Struktura wg funkcjonalności)

Zamiast wrzucać wszystkie store'y do jednego folderu `stores/`, możesz grupować pliki **po funkcjonalności**:

```
src/
  features/
    anime/
      components/
        AnimeCard.vue
        AnimeList.vue
        AnimeDetails.vue
      stores/
        anime.js
      graphql/
        searchAnime.js
        getAnimeById.js
    watchlist/
      components/
        WatchlistItem.vue
        WatchlistView.vue
      stores/
        watchlist.js
    auth/
      components/
        LoginForm.vue
        RegisterForm.vue
      stores/
        auth.js
```

**Plusy:** Każda feature to samowystarczalny moduł. Łatwo usunąć, przenieść lub refaktorować. Idealny do dużych teamów – każdy team bierze swoją feature.

### 📐 Wzorzec 2: Warstwa serwisowa (Service Layer)

Store zarządza stanem. Ale kto zarządza komunikacją z API? Twórcy Pinii zalecają oddzielenie logiki API od store'a:

```javascript
// 📄 src/services/anilistService.js
import { anilistFetch } from '../helpers/anilistFetch'

export const anilistService = {
  async searchAnime(search, page = 1) {
    const query = `
      query ($search: String, $page: Int) {
        Page(page: $page, perPage: 20) {
          pageInfo { hasNextPage currentPage }
          media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
            id
            title { romaji english }
            episodes
            averageScore
            coverImage { large }
            genres
          }
        }
      }
    `
    return anilistFetch(query, { search, page })
  },

  async getAnimeById(id) {
    const query = `
      query ($id: Int) {
        Media(id: $id, type: ANIME) {
          id
          title { romaji english native }
          description
          episodes
          averageScore
          genres
          characters(page: 1, perPage: 10) {
            nodes { id name { full } image { medium } }
          }
          coverImage { large extraLarge }
        }
      }
    `
    return anilistFetch(query, { id })
  }
}
```

```javascript
// 📄 src/stores/anime.js – store korzysta z serwisu
import { anilistService } from '../services/anilistService'

export const useAnimeStore = defineStore('anime', () => {
  const animeList = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchAnime(search) {
    loading.value = true
    error.value = null
    try {
      const data = await anilistService.searchAnime(search)
      animeList.value = data.Page.media
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { animeList, loading, error, fetchAnime }
})
```

**Plusy:** Store jest czysty i skupiony na stanie. Serwis jest testowalny osobno. Możesz podmienić serwis (np. na mock w testach) bez dotykania store'a.

### 📐 Wzorzec 3: Composable jako adapter store'a

Zamiast importować store bezpośrednio w komponentach, stwórz **composable**, który „owija" store i dodaje logikę specyficzną dla widoku:

```javascript
// 📄 src/composables/useAnimeSearch.js
import { storeToRefs } from 'pinia'
import { useAnimeStore } from '../stores/anime'
import { useFiltersStore } from '../stores/filters'
import { watch, onMounted } from 'vue'

export function useAnimeSearch() {
  const animeStore = useAnimeStore()
  const filtersStore = useFiltersStore()

  const { animeList, loading, error } = storeToRefs(animeStore)
  const { searchQuery, selectedGenre } = storeToRefs(filtersStore)
  const { fetchAnime } = animeStore

  // Automatyczny search z debounce
  let timeout
  watch(searchQuery, (newVal) => {
    clearTimeout(timeout)
    if (newVal.length >= 3) {
      timeout = setTimeout(() => fetchAnime(newVal), 500)
    }
  })

  onMounted(() => {
    if (animeList.value.length === 0) {
      fetchAnime('One Piece') // Domyślne wyszukiwanie
    }
  })

  return { animeList, loading, error, searchQuery, selectedGenre }
}
```

**Plusy:** Komponenty stają się ultra-cienkie. Logika widoku jest w composable, logika stanu w store, logika API w serwisie. Każda warstwa robi jedno. **Separation of Concerns** jak z podręcznika! 📖

---

## 🚀 Zaawansowane: Techniki, które robią różnicę!

Pora na sekcję dla prawdziwych Super Saiyanów kodowania! Te techniki nie są wymagane na co dzień, ale gdy ich potrzebujesz – zrobią ogromną różnicę. 💎

### 🔥 1. Hot Module Replacement (HMR) dla store'ów

Gdy pracujesz z Vite, Twoje komponenty mają HMR out-of-the-box. Ale store'y? Wymagają małej konfiguracji, żeby nie tracić stanu przy hot reload:

```javascript
// 📄 src/stores/anime.js
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useAnimeStore = defineStore('anime', () => {
  // ... cała logika store
})

// 🔥 HMR – zachowuj stan przy hot reload!
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAnimeStore, import.meta.hot))
}
```

Bez tego przy każdej edycji store'a tracisz cały stan i musisz odtwarzać scenariusz. Z HMR? Edytujesz, zapisujesz, stan zostaje. Czysta radość! 😍

### 🧪 2. Testowanie store'ów

Testowanie store'ów Pinii to pestka – ale musisz pamiętać o jednym: **utworzyć instancję Pinii w test suite**:

```javascript
// 📄 tests/stores/anime.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAnimeStore } from '@/stores/anime'

describe('Anime Store', () => {
  beforeEach(() => {
    // Tworzymy świeżą Pinię dla każdego testu!
    setActivePinia(createPinia())
  })

  it('should start with empty anime list', () => {
    const store = useAnimeStore()
    expect(store.animeList).toEqual([])
    expect(store.loading).toBe(false)
  })

  it('should fetch anime from AniList', async () => {
    // Mockujemy fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          data: {
            Page: {
              media: [
                { id: 21, title: { romaji: 'ONE PIECE' }, averageScore: 88 },
                { id: 20, title: { romaji: 'NARUTO' }, averageScore: 79 }
              ]
            }
          }
        })
      })
    )

    const store = useAnimeStore()
    await store.fetchAnime('One Piece')

    expect(store.animeList).toHaveLength(2)
    expect(store.animeList[0].title.romaji).toBe('ONE PIECE')
    expect(store.loading).toBe(false)
  })

  it('should calculate topRated getter correctly', () => {
    const store = useAnimeStore()
    store.animeList = [
      { id: 1, averageScore: 90, title: { romaji: 'One Piece' } },
      { id: 2, averageScore: 60, title: { romaji: 'Filler Anime' } },
      { id: 3, averageScore: 95, title: { romaji: 'Dragon Ball Z' } }
    ]
    expect(store.topRated[0].title.romaji).toBe('Dragon Ball Z')
  })
})
```

> 💡 **Pro tip:** `setActivePinia(createPinia())` w `beforeEach` gwarantuje, że każdy test startuje z czystym stanem. Zero konfliktów między testami!

### 🦺 3. TypeScript: Typowane store'y

Pinia ma **first-class TypeScript support**. W Setup Store typy inferują się automatycznie. W Option Store możesz je dookreślić:

```typescript
// 📄 src/stores/anime.ts
import { defineStore } from 'pinia'

interface AnimeTitle {
  romaji: string
  english: string | null
  native: string
}

interface Anime {
  id: number
  title: AnimeTitle
  episodes: number | null
  averageScore: number
  coverImage: { large: string }
  genres: string[]
}

interface AnimeState {
  animeList: Anime[]
  currentAnime: Anime | null
  loading: boolean
  error: string | null
}

export const useAnimeStore = defineStore('anime', {
  state: (): AnimeState => ({
    animeList: [],
    currentAnime: null,
    loading: false,
    error: null
  }),
  getters: {
    topRated: (state): Anime[] => {
      return [...state.animeList]
        .sort((a, b) => b.averageScore - a.averageScore)
        .slice(0, 5)
    }
  },
  actions: {
    async fetchAnime(search: string): Promise<void> {
      // TypeScript pilnuje typów za Ciebie! 🛡️
      this.loading = true
      // ...
    }
  }
})
```

### 🌐 4. SSR: Pinia z Nuxt 3

Nuxt 3 ma **wbudowane wsparcie dla Pinii**! Wystarczy zainstalować moduł:

```bash
npx nuxi module add pinia
```

Nuxt automatycznie rejestruje Pinię i dba o hydration stanu na kliencie! Store'y działają identycznie – jedyna różnica to `useAsyncData` / `useFetch` z Nuxt zamiast zwykłego `fetch`:

```javascript
// 📄 stores/anime.js (Nuxt 3)
export const useAnimeStore = defineStore('anime', () => {
  const animeList = ref([])

  // W Nuxt warto użyć $fetch, który jest zoptymalizowany pod SSR
  async function fetchAnime(search) {
    const { data } = await useFetch('https://graphql.anilist.co', {
      method: 'POST',
      body: {
        query: SEARCH_ANIME_QUERY,
        variables: { search }
      }
    })
    if (data.value) {
      animeList.value = data.value.data.Page.media
    }
  }

  return { animeList, fetchAnime }
})
```

> ⚠️ W Nuxt 3 **nie** musisz robić `app.use(pinia)` w `main.js` – moduł robi to za Ciebie. Mniej kodu, więcej magii!

### 🎭 5. Wzorzec „Optimistic Updates"

Chcesz, żeby UI reagował natychmiast, zanim serwer odpowie? To **Optimistic Update** – zakładamy, że operacja się uda, i cofamy się tylko jeśli coś pójdzie nie tak:

```javascript
async function addToWatchlist(anime) {
  // 1. Optymistycznie dodajemy od razu!
  const optimisticItem = { ...anime, addedAt: Date.now() }
  userWatchlist.value.push(optimisticItem)

  try {
    // 2. Faktycznie zapisujemy na serwerze
    await fetch('/api/watchlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ animeId: anime.id })
    })
  } catch (err) {
    // 3. Coś poszło nie tak? Cofamy! 🔙
    const index = userWatchlist.value.findIndex(item => item.id === anime.id)
    if (index > -1) {
      userWatchlist.value.splice(index, 1)
    }
    error.value = 'Nie udało się dodać do watchlisty. Spróbuj ponownie!'
  }
}
```

User klika „Dodaj" → serce zapala się od razu → jeśli serwer odmówi, serce gaśnie. Smooth UX jak kameha Goku – pewna i szybka! ⚡

### 📡 6. Debounce w wyszukiwaniu

Nie odpytuj AniList API przy każdym wciśnięciu klawisza! Użyj debounce:

```javascript
import { watchDebounced } from '@vueuse/core'

export const useAnimeStore = defineStore('anime', () => {
  const searchQuery = ref('')
  const animeList = ref([])

  // Odpytuj API dopiero po 500ms od ostatniego wciśnięcia
  watchDebounced(
    searchQuery,
    async (newQuery) => {
      if (newQuery.length >= 3) {
        await fetchAnime(newQuery)
      }
    },
    { debounce: 500 }
  )

  // ...
  return { searchQuery, animeList }
})
```

> 🎯 AniList ma **rate limiting** (90 req/min). Debounce chroni Cię przed osiągnięciem limitu przy szybkim pisaniu. Szanuj API, jak szanujesz swoich nakama!

---

## 🏁 Podsumowanie: Twój ananasowy cheat sheet!

Przeszliśmy długą drogę! Od instalacji po zaawansowane wzorce – oto co wiesz o Pinii:

| Temat | Co zapamiętać |
| :--- | :--- |
| **Instalacja** | `npm install pinia` → `createPinia()` → `app.use(pinia)` → **przed** `app.mount()` |
| **Option vs Setup Store** | Options = obiektowy styl z `state/getters/actions`. Setup = funkcyjny z `ref/computed/function` |
| **Konwencja nazw** | `use` + Nazwa + `Store` (np. `useAnimeStore`) |
| **Modułowe store'y** | Jeden store = jedna logiczna odpowiedzialność. Osobny plik! |
| **Nested Stores** | Importuj store w store. Setup: na górze. Options: wewnątrz akcji/gettera |
| **Dostęp do stanu** | Komponent: `useStore()` + `storeToRefs()` dla reaktywnej destrukturyzacji |
| **v-model** | Binduj bezpośrednio do stanu w store – działa! |
| **Mutowanie stanu** | Akcje, bezpośrednio, `$patch` (obiekt lub funkcja) |
| **`$reset`** | Resetuje cały stan do wartości początkowych (tylko Option Store!) |
| **`$onAction`** | Nasłuchuj na akcje: `name`, `args`, `after`, `onError` |
| **`$subscribe`** | Nasłuchuj na mutacje stanu (jak `watch`) |
| **Pluginy** | Funkcja z `context` → `pinia.use(plugin)`. Trzy wzorce: właściwość/metoda, nasłuchiwanie, własna opcja |
| **Composables** | Tylko w Setup Store – `useLocalStorage`, watchers, cały Vue reactivity API! |
| **Persistencja** | `pinia-plugin-persistedstate` → `persist: true` w store |
| **Dobre praktyki** | Akcje > bezpośrednia zmiana, gettery > computed w komponentach, wydziel serwisy |
| **Architektura** | Feature-based, Service Layer, Composable adaptery |
| **HMR** | `acceptHMRUpdate` – zachowaj stan przy hot reload |
| **Testowanie** | `setActivePinia(createPinia())` w `beforeEach` |
| **TypeScript** | First-class support, inferowane typy w Setup Store |
| **SSR / Nuxt** | `npx nuxi module add pinia` – zero konfiguracji |

---

## 🍍 Słowo na koniec

Pinia to biblioteka, która nie udaje, że jest czymś, czym nie jest. Jest prosta, elastyczna i daje Ci wolność wyboru. Nie narzuca Ci jednego sposobu robienia rzeczy – zamiast tego mówi: **„Oto narzędzia. Ty decydujesz, jak ich użyjesz."**

Czy potrzebujesz Pinii w małym projekcie? Pewnie nie. Ale w momencie, gdy Twoja aplikacja zaczyna rosnąć jak seria One Piece (1000+ odcinków i nie zwalnia!), gdy dochodzą nowi developerzy, gdy stan zaczyna latać między dziesiątkami komponentów – Pinia staje się Twoim najlepszym przyjacielem. Tym ananasem, który trzyma Twój kod w ryzach! 🍍💪

Wszystkie przykłady w tym wpisie korzystają z **AniList GraphQL API** (`https://graphql.anilist.co`) – darmowego, publicznego API z bazą danych anime i mangi. Możesz zacząć z nim eksperymentować już teraz: [docs.anilist.co](https://docs.anilist.co/)

A teraz? **Otwórz edytor i zacznij bawić się Pinią!** Stwórz store, dodaj plugin, podłącz composable – i zobacz, jak fajne to jest w praktyce. Luffy by powiedział: „Kaizoku ou ni, ore wa naru!" (Zostanę królem piratów... ekhm, królem state managementu!) 🏴‍☠️👑

Do zobaczenia w następnym wpisie! 🚀🔥
