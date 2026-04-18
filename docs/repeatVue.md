# Spis treści

## 🔵 Podstawy Vue 3
1. [Cykl życia komponentu w Vue 3](#cykl-życia-komponentu-w-vue-3)
   - [Tworzenie, aktualizacja, usuwanie](#tworzenie-komponentu-creation) · [Hooki – kiedy co używać](#kiedy-i-jak-używać-poszczególnych-hooków)
2. [Funkcje reaktywne w Vue 3](#funkcje-reaktywne-w-vue-3)
   - [ref](#1-ref) · [reactive](#2-reactive) · [computed](#3-computed) · [watch + flush](#4-watch) · [watchEffect](#5-watcheffect)
   - [toRefs / toRef](#6-torefs) · [customRef](#10-customref) · [shallowRef / shallowReactive](#11-shallowref-i-shallowreactive)
   - [markRaw](#12-markraw) · [isRef / isReactive / isReadonly](#13-isref-isreactive-isreadonly)
3. [Co robi flush w watch?](#co-robi-flush-w-watch)

## 🟡 Composition API i nowości Vue 3
4. [Nowości Vue 3 – defineModel, defineOptions, defineExpose, v-bind shorthand](#nowości-vue-3--definemodel-defineoptions-defineexpose-v-bind-shorthand)
5. [Zaawansowane Composables](#zaawansowane-composables)
   - [useForm](#useform--własny-composable-do-formularzy) · [useLocalStorage](#uselocalstorage--persystentny-stan) · [useDebounce](#usedebounce--opóźnienie-wyszukiwania) · [useIntersectionObserver](#useintersectionobserver--lazy-loading--infinite-scroll)

## 🟠 Architektura i wzorce
6. [Zaawansowane funkcje Vue.js](#zaawansowane-funkcje-vuejs)
   - [Sloty podstawowe](#podstawowe-sloty) · [Sloty nazwane](#sloty-nazwane) · [Scoped slots](#sloty-z-danymi-scoped-slots)
   - [Dynamiczne komponenty](#dynamiczne-komponenty) · [Teleport](#teleport) · [Własne dyrektywy](#własne-dyrektywy)
7. [Wzorce architektoniczne](#wzorce-architektoniczne)
   - [Atomic Design](#atomic-design-w-vue) · [Smart/Dumb Components](#smart--dumb-components-container--presentational) · [Feature-based struktura](#feature-based-struktura-duże-projekty) · [Repository Pattern](#repository-pattern-separacja-logiki-api)
8. [Komunikacja między komponentami](#komunikacja-między-komponentami)
   - [Props i emit](#props-i-emit) · [Provide / Inject](#provide--inject) · [Event Bus (mitt)](#event-bus-mitt)

## 🟢 Stan i routing
9. [Zarządzanie stanem – Pinia](#zarządzanie-stanem---pinia)
   - [Options API](#tworzenie-store---options-api) · [Composition API](#tworzenie-store---composition-api) · [storeToRefs](#storetorefs-i-torefs-w-pinia) · [Globalna reaktywność](#globalna-reaktywność)
10. [Routing – Vue Router](#routing---vue-router)
    - [Konfiguracja tras](#konfiguracja-tras) · [Dynamiczne trasy](#dynamiczne-trasy-i-parametry) · [Nawigacja programowa](#nawigacja-programowa) · [Navigation guards](#navigation-guards)

## 🔵 Dane i formularze
11. [Formularze i walidacja](#formularze-i-walidacja)
    - [v-model](#v-model--dwukierunkowe-wiązanie) · [Zdarzenia formularzy](#obsługa-zdarzeń-formularzy) · [VeeValidate + Yup](#walidacja-z-veevalidate--yup)
12. [Zarządzanie danymi i SSR](#zarządzanie-danymi-i-ssr)
    - [Pobieranie danych (fetch / Axios)](#pobieranie-danych-z-api) · [Stany ładowania](#obsługa-błędów-i-stanu-ładowania) · [SSR i Nuxt.js](#ssr-i-nuxtjs)

## 🟣 TypeScript
13. [TypeScript w Vue](#typescript-w-vue)
    - [Konfiguracja](#konfiguracja-typescript) · [Typowanie propsów i emitów](#typowanie-propsów-i-emitów)

## 🔴 Jakość i testowanie
14. [Testowanie](#testowanie)
    - [Testy jednostkowe (Vitest)](#testy-jednostkowe) · [Testy integracyjne](#testy-integracyjne) · [Testy E2E (Cypress)](#testy-e2e)
15. [Testowanie – Zaawansowane (MSW, composables, Pinia)](#testowanie--zaawansowane)

## ⚡ Wydajność i optymalizacja
16. [Optymalizacja](#optymalizacja)
    - [Lazy loading](#lazy-loading) · [Code splitting](#code-splitting) · [v-once / v-memo / keep-alive](#v-once-v-memo-keep-alive)
17. [Vue Devtools i debugowanie](#vue-devtools-i-debugowanie)

## 🎨 UI i dostępność
18. [Stylowanie](#stylowanie)
    - [Scoped styles / CSS Modules](#scoped-styles--css-modules) · [Dynamiczne klasy i style](#dynamiczne-klasy-i-style) · [Tailwind CSS](#tailwind-css-w-vue)
19. [Animacje i przejścia](#animacje-i-przejścia)
20. [Dostępność (a11y)](#dostępność-a11y)

## 🔧 Ekosystem
21. [Praca z bibliotekami i pluginy](#praca-z-bibliotekami-i-pluginy)
22. [Integracje i ekosystem (CI/CD, Sentry, GraphQL)](#integracje-i-ekosystem)
23. [Monorepo i Mikrofrontendy](#monorepo-i-mikrofrontendy)

## 🔒 Bezpieczeństwo
24. [Bezpieczeństwo w Vue](#bezpieczeństwo-w-vue)

## 🚀 Produkcja
25. [Tworzenie aplikacji produkcyjnych](#tworzenie-aplikacji-produkcyjnych)
    - [Zmienne środowiskowe (.env)](#zmienne-środowiskowe-env) · [Budowanie aplikacji](#budowanie-aplikacji) · [Globalne przechwytywanie błędów](#globalne-przechwytywanie-błędów)

## 🎯 Przygotowanie do rozmowy rekrutacyjnej
26. [Rozmowa rekrutacyjna – Pytania i odpowiedzi](#rozmowa-rekrutacyjna--pytania-i-odpowiedzi)
27. [Ćwiczenia praktyczne](#ćwiczenia-praktyczne)
28. [Ściągawki – Szybka powtórka](#ściągawki--szybka-powtórka)

---

# Co robi flush w watch?

Opcja `flush` w `watch` kontroluje, **kiedy** wywoływana jest funkcja obserwatora w cyklu życia komponentu. Ma trzy możliwe wartości:

### **a) `pre` (domyślna wartość)**
- **Kiedy?** Przed aktualizacją DOM (przed "commit phase").
- **Co widzisz?** Wartości stanu są już zaktualizowane, ale DOM jeszcze nie został zaktualizowany.
- **Przykład użycia:** Gdy chcesz zareagować na zmianę danych, zanim zmiany zostaną odzwierciedlone w DOM.

```javascript
watch(
  () => someReactiveValue,
  (newValue, oldValue) => {
    console.log('New value:', newValue) // Zaktualizowana wartość
    console.log('Old value:', oldValue) // Stara wartość
    console.log('DOM jeszcze nie został zaktualizowany')
  },
  { flush: 'pre' } // Domyślna wartość
)
```

### **b) `post`**
- **Kiedy?** Po aktualizacji DOM (po "commit phase").
- **Co widzisz?** Wartości stanu są zaktualizowane, a DOM również został już zaktualizowany.
- **Przykład użycia:** Gdy chcesz wykonać akcję po tym, jak zmiany zostały już wyrenderowane w DOM (np. zmierzyć rozmiar elementu po jego aktualizacji).

### **c) `sync`**
- **Kiedy?** Natychmiast po zmianie wartości stanu, w tej samej "mikrokolejce" (synchronous).
- **Co widzisz?** Wartości stanu są zaktualizowane, ale DOM jeszcze nie został zaktualizowany.
- **Przykład użycia:** Gdy musisz natychmiast zareagować na zmianę stanu, np. w przypadku obliczeń lub logiki, która nie zależy od DOM.

---

# Cykl życia komponentu w Vue 3

W Vue 3 cykl życia komponentu to zestaw zdarzeń, które mają miejsce od momentu utworzenia komponentu, przez jego montowanie, aktualizację, aż po usunięcie. Każdy etap cyklu życia ma swoje dedykowane hooki, które pozwalają na wykonanie kodu w odpowiednich momentach.

## **Etapy cyklu życia**

### **Tworzenie komponentu (Creation)**
Komponent jest tworzony, ale jeszcze nie zamontowany w DOM.

- **Hooki:**
  - `setup()`
  - `onBeforeMount()`
  - `onMounted()`

### **Aktualizacja komponentu (Update)**
Komponent jest aktualizowany, gdy zmieniają się jego dane lub właściwości (props).

- **Hooki:**
  - `onBeforeUpdate()`
  - `onUpdated()`

### **Usuwanie komponentu (Unmount)**
Komponent jest usuwany z DOM.

- **Hooki:**
  - `onBeforeUnmount()`
  - `onUnmounted()`

---

## **Jak używać hooków cyklu życia?**

W Vue 3, hooki cyklu życia są dostępne w **Composition API** za pomocą funkcji importowanych z `vue`. Oto jak ich używać:

### **Przykład: Wszystkie hooki cyklu życia**

```vue
<script setup>
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

// Przykładowe hooki cyklu życia
onBeforeMount(() => {
  console.log('Komponent zaraz zostanie zamontowany (beforeMount)')
})

onMounted(() => {
  console.log('Komponent został zamontowany (mounted)')
})

onBeforeUpdate(() => {
  console.log('Komponent zaraz zostanie zaktualizowany (beforeUpdate)')
})

onUpdated(() => {
  console.log('Komponent został zaktualizowany (updated)')
})

onBeforeUnmount(() => {
  console.log('Komponent zaraz zostanie usunięty (beforeUnmount)')
})

onUnmounted(() => {
  console.log('Komponent został usunięty (unmounted)')
})
</script>

<template>
  <div>
    <h1>Cykl życia komponentu</h1>
  </div>
</template>
```

---

## **Kiedy i jak używać poszczególnych hooków?**

### **a) onBeforeMount**
- **Kiedy?** Wywoływany tuż przed zamontowaniem komponentu w DOM.
- **Użycie:** Przygotowanie danych lub wykonanie operacji, które muszą być gotowe przed renderowaniem.

### **b) onMounted**
- **Kiedy?** Wywoływany po zamontowaniu komponentu w DOM.
- **Użycie:** Idealny do inicjalizacji, np. pobierania danych z API, ustawiania timerów, manipulacji DOM.

### **c) onBeforeUpdate**
- **Kiedy?** Wywoływany tuż przed aktualizacją DOM w wyniku zmiany stanu lub propsów.
- **Użycie:** Przygotowanie na zmiany w DOM, np. zapisanie stanu przed aktualizacją.

### **d) onUpdated**
- **Kiedy?** Wywoływany po zaktualizowaniu DOM.
- **Użycie:** Wykonywanie operacji po zakończeniu aktualizacji, np. synchronizacja z zewnętrznymi bibliotekami.

### **e) onBeforeUnmount**
- **Kiedy?** Wywoływany tuż przed usunięciem komponentu z DOM.
- **Użycie:** Czyszczenie zasobów, np. usuwanie timerów, nasłuchiwaczy zdarzeń.

### **f) onUnmounted**
- **Kiedy?** Wywoływany po usunięciu komponentu z DOM.
- **Użycie:** Ostateczne czyszczenie, np. zamykanie połączeń sieciowych.

---

## **Podsumowanie**
- **`pre`:** Przed aktualizacją DOM (domyślnie).
- **`post`:** Po aktualizacji DOM.
- **`sync`:** Natychmiast po zmianie stanu, w tej samej mikrokolejce.

Wszystkie hooki cyklu życia w Vue 3 **nie przyjmują argumentów**. Są to funkcje, które wykonują się automatycznie w odpowiednich momentach cyklu życia komponentu.

---

# Funkcje reaktywne w Vue 3

Vue 3 oferuje wiele funkcji reaktywnych, które pozwalają na zarządzanie stanem, reagowanie na zmiany i wykonywanie efektów. Oto najważniejsze z nich:

## **1. `ref`**
- Tworzy pojedynczą reaktywną wartość.
- **Przykład:**
  ```javascript
  import { ref } from 'vue'

  const count = ref(0)
  count.value++ // Zwiększenie wartości
  console.log(count.value) // 1
  ```

---

## **2. `reactive`**
- Tworzy reaktywny obiekt.
- **Przykład:**
  ```javascript
  import { reactive } from 'vue'

  const state = reactive({
    count: 0,
    message: 'Hello Vue!',
  })

  state.count++
  console.log(state.count) // 1
  ```

---

## **3. `computed`**
- Tworzy właściwość obliczeniową, która automatycznie aktualizuje się, gdy zależne dane się zmienią.
- **Przykład:**
  ```javascript
  import { ref, computed } from 'vue'

  const count = ref(2)
  const doubleCount = computed(() => count.value * 2)

  console.log(doubleCount.value) // 4
  count.value++
  console.log(doubleCount.value) // 6
  ```

---

## **4. `watch`**
- Obserwuje zmiany w reaktywnych danych lub właściwościach i wykonuje funkcję, gdy te dane się zmieniają.
- **Przykład:**
  ```javascript
  import { ref, watch } from 'vue'

  const count = ref(0)

  watch(count, (newValue, oldValue) => {
    console.log(`Count zmienił się z ${oldValue} na ${newValue}`)
  })

  count.value++ // Wywoła funkcję watch
  ```

---

## **5. `watchEffect`**
- Automatycznie uruchamia funkcję i ponownie ją wykonuje, gdy jakiekolwiek użyte w niej dane się zmienią.
- **Przykład:**
  ```javascript
  import { ref, watchEffect } from 'vue'

  const count = ref(0)

  watchEffect(() => {
    console.log(`Aktualna wartość count: ${count.value}`)
  })

  count.value++ // Wywoła funkcję watchEffect
  ```

---

## **6. `toRefs`**
- Konwertuje właściwości obiektu reaktywnego na `ref`, aby można było je destrukturyzować bez utraty reaktywności.
- **Przykład:**
  ```javascript
  import { reactive, toRefs } from 'vue'

  const state = reactive({
    count: 0,
    message: 'Hello Vue!',
  })

  const { count, message } = toRefs(state)

  count.value++
  console.log(state.count) // 1
  ```

---

## **7. `toRef`**
- Tworzy `ref` dla jednej właściwości obiektu reaktywnego.
- **Przykład:**
  ```javascript
  import { reactive, toRef } from 'vue'

  const state = reactive({
    count: 0,
  })

  const countRef = toRef(state, 'count')

  countRef.value++
  console.log(state.count) // 1
  ```

---

## **8. `provide` i `inject`**
- Umożliwiają przekazywanie danych między komponentami bez konieczności używania propsów.
- **Przykład:**
  ```javascript
  // W komponencie nadrzędnym
  import { provide } from 'vue'

  provide('message', 'Hello from parent!')

  // W komponencie potomnym
  import { inject } from 'vue'

  const message = inject('message')
  console.log(message) // 'Hello from parent!'
  ```

---

## **9. `onMounted`, `onUnmounted`, i inne hooki cyklu życia**
- Funkcje te pozwalają na wykonanie kodu w określonych momentach cyklu życia komponentu.
- **Przykład:**
  ```javascript
  import { onMounted, onUnmounted } from 'vue'

  onMounted(() => {
    console.log('Komponent został zamontowany')
  })

  onUnmounted(() => {
    console.log('Komponent został usunięty')
  })
  ```

---

## **10. `customRef`**
- Tworzy niestandardowy `ref` z własną logiką reaktywności.
- **Przykład:**
  ```javascript
  import { customRef } from 'vue'

  function useDebouncedRef(value, delay = 300) {
    let timeout
    return customRef((track, trigger) => {
      return {
        get() {
          track()
          return value
        },
        set(newValue) {
          clearTimeout(timeout)
          timeout = setTimeout(() => {
            value = newValue
            trigger()
          }, delay)
        },
      }
    })
  }

  const debouncedValue = useDebouncedRef(0, 500)
  ```

---

## **11. `shallowRef` i `shallowReactive`**
- Tworzą płytkie wersje reaktywnych obiektów lub wartości, które nie śledzą głębokich zmian.
- **Przykład:**
  ```javascript
  import { shallowRef, shallowReactive } from 'vue'

  const shallowState = shallowReactive({ nested: { count: 0 } })
  shallowState.nested.count++ // Nie wywoła reakcji

  const shallowValue = shallowRef({ count: 0 })
  shallowValue.value.count++ // Nie wywoła reakcji
  ```

---

## **12. `markRaw`**
- Wyklucza obiekt z reaktywności.
- **Przykład:**
  ```javascript
  import { reactive, markRaw } from 'vue'

  const rawObject = markRaw({ count: 0 })
  const state = reactive({
    raw: rawObject,
  })

  state.raw.count++ // Nie wywoła reakcji
  ```

---

## **13. `isRef`, `isReactive`, `isReadonly`**
- Funkcje pomocnicze do sprawdzania, czy obiekt jest `ref`, `reactive` lub `readonly`.
- **Przykład:**
  ```javascript
  import { ref, reactive, isRef, isReactive } from 'vue'

  const count = ref(0)
  const state = reactive({ count: 0 })

  console.log(isRef(count)) // true
  console.log(isReactive(state)) // true
  ```

---

### **Podsumowanie**
Vue 3 oferuje wiele funkcji reaktywnych, które pozwalają na elastyczne zarządzanie stanem i reagowanie na zmiany. Każda z tych funkcji ma swoje specyficzne zastosowanie, które można dostosować do potrzeb projektu.

---

# Co jeszcze warto wiedzieć o Vue 3?

Vue 3 to potężny framework, który oferuje wiele funkcji i narzędzi do budowy nowoczesnych aplikacji. Oto lista kluczowych zagadnień, które warto opanować, aby w pełni wykorzystać możliwości Vue 3.

---

## **1. Tworzenie reaktywnych danych**

### **`ref`**
- **Co to jest?**
  `ref` pozwala na stworzenie pojedynczej reaktywnej wartości. Jest to idealne rozwiązanie, gdy chcesz pracować z prostymi typami danych, takimi jak liczby, ciągi znaków czy wartości logiczne.

- **Przykład:**
  ```javascript
  import { ref } from 'vue'

  const count = ref(0)
  count.value++ // Zwiększenie wartości
  console.log(count.value) // 1
  ```

- **Dobre praktyki:**
  - Używaj `ref` dla prostych wartości.
  - Pamiętaj, aby odwoływać się do wartości za pomocą `.value`.

### **`reactive`**
- **Co to jest?**
  `reactive` pozwala na stworzenie reaktywnego obiektu. Jest to przydatne, gdy chcesz pracować z bardziej złożonymi strukturami danych, takimi jak obiekty lub tablice.

- **Przykład:**
  ```javascript
  import { reactive } from 'vue'

  const state = reactive({
    count: 0,
    message: 'Hello Vue!',
  })

  state.count++
  console.log(state.count) // 1
  ```

- **Dobre praktyki:**
  - Używaj `reactive` dla obiektów i tablic.
  - Nie destrukturyzuj właściwości obiektu reaktywnego, aby nie stracić reaktywności.

---

## **2. Właściwości obliczeniowe i obserwacja**

### **`computed`**
- **Co to jest?**
  `computed` pozwala na tworzenie właściwości obliczeniowych, które automatycznie aktualizują się, gdy zależne dane się zmieniają.

- **Przykład:**
  ```javascript
  import { ref, computed } from 'vue'

  const count = ref(2)
  const doubleCount = computed(() => count.value * 2)

  console.log(doubleCount.value) // 4
  count.value++
  console.log(doubleCount.value) // 6
  ```

- **Dobre praktyki:**
  - Używaj `computed` do obliczania wartości na podstawie innych reaktywnych danych.
  - Unikaj modyfikowania wartości w funkcji `computed`.

### **`watch`**
- **Co to jest?**
  `watch` pozwala na obserwowanie zmian w reaktywnych danych i wykonywanie funkcji, gdy te dane się zmieniają.

- **Przykład:**
  ```javascript
  import { ref, watch } from 'vue'

  const count = ref(0)

  watch(count, (newValue, oldValue) => {
    console.log(`Count zmienił się z ${oldValue} na ${newValue}`)
  })

  count.value++ // Wywoła funkcję watch
  ```

- **Dobre praktyki:**
  - Używaj `watch`, gdy musisz reagować na zmiany w danych, np. do wywołania funkcji API.
  - Unikaj nadmiernego używania `watch`, jeśli możesz osiągnąć to samo za pomocą `computed`.

### **`watchEffect`**
- **Co to jest?**
  `watchEffect` automatycznie uruchamia funkcję i ponownie ją wykonuje, gdy jakiekolwiek użyte w niej dane się zmienią.

- **Przykład:**
  ```javascript
  import { ref, watchEffect } from 'vue'

  const count = ref(0)

  watchEffect(() => {
    console.log(`Aktualna wartość count: ${count.value}`)
  })

  count.value++ // Wywoła funkcję watchEffect
  ```

- **Dobre praktyki:**
  - Używaj `watchEffect` do prostych reakcji na zmiany danych.
  - Unikaj skomplikowanej logiki w `watchEffect`, aby uniknąć trudnych do debugowania błędów.

---

## **3. Praca z komponentami**

### **`provide` i `inject`**
- **Co to jest?**
  `provide` i `inject` pozwalają na przekazywanie danych między komponentami bez konieczności używania propsów.

- **Przykład:**
  ```javascript
  // W komponencie nadrzędnym
  import { provide } from 'vue'

  provide('message', 'Hello from parent!')

  // W komponencie potomnym
  import { inject } from 'vue'

  const message = inject('message')
  console.log(message) // 'Hello from parent!'
  ```

- **Dobre praktyki:**
  - Używaj `provide` i `inject` do przekazywania danych globalnych, takich jak konfiguracje lub instancje usług.
  - Unikaj nadmiernego używania `inject`, jeśli dane mogą być przekazane przez propsy.

---

## **4. Zaawansowane funkcje reaktywności**

### **`customRef`**
- **Co to jest?**
  `customRef` pozwala na stworzenie niestandardowego `ref` z własną logiką reaktywności.

- **Przykład:**
  ```javascript
  import { customRef } from 'vue'

  function useDebouncedRef(value, delay = 300) {
    let timeout
    return customRef((track, trigger) => {
      return {
        get() {
          track()
          return value
        },
        set(newValue) {
          clearTimeout(timeout)
          timeout = setTimeout(() => {
            value = newValue
            trigger()
          }, delay)
        },
      }
    })
  }

  const debouncedValue = useDebouncedRef(0, 500)
  ```

- **Dobre praktyki:**
  - Używaj `customRef`, gdy potrzebujesz niestandardowej logiki reaktywności, np. opóźnień (debouncing).

---

## **5. Dobre praktyki w Vue 3**

1. **Używaj Composition API w nowych projektach**:
   - Jest bardziej elastyczne i lepiej wspiera TypeScript.

2. **Unikaj nadmiernego używania `watch`**:
   - Jeśli możesz, używaj `computed` zamiast `watch`.

3. **Zawsze czyść zasoby**:
   - Używaj `onUnmounted` lub `onBeforeUnmount` do usuwania timerów, nasłuchiwaczy zdarzeń itp.

4. **Używaj `provide` i `inject` z umiarem**:
   - Nie zastępuj nimi propsów, jeśli nie jest to konieczne.

5. **Optymalizuj wydajność**:
   - Używaj `v-once`, `v-memo` i `keep-alive`, aby zmniejszyć liczbę renderów.

6. **Testuj aplikację**:
   - Korzystaj z narzędzi takich jak `Vue Test Utils` i `Jest` do testów jednostkowych.

---

# Zaawansowane funkcje Vue.js

## Podstawowe sloty
- **Co to?** Slot to "otwór" w szablonie komponentu dziecka, który rodzic może wypełnić dowolną treścią.
- **Kiedy?** Zawsze gdy budujesz wielokrotnego użytku komponenty jak karty, modale, layouty.

```vue
<!-- MyCard.vue -->
<template>
  <div class="card">
    <slot>Domyślna treść, gdy nic nie przekazano</slot>
  </div>
</template>

<!-- Użycie w rodzicu -->
<MyCard>
  <p>Ta treść zastąpi domyślną!</p>
</MyCard>
```

**Dobre praktyki:**
- ✅ Zawsze dodaj domyślną treść slotu dla lepszego UX.
- ✅ Sloty pomagają budować elastyczne, reusable komponenty.

---

## Sloty nazwane
- **Co to?** Pozwalają na przekazywanie treści do konkretnych, nazwanych miejsc w komponencie dziecka.
- **Kiedy?** Gdy komponent ma kilka osobnych sekcji: header, body, footer.

```vue
<!-- MyCard.vue -->
<template>
  <div class="card">
    <header><slot name="header" /></header>
    <main><slot /></main>  <!-- domyślny slot -->
    <footer><slot name="footer" /></footer>
  </div>
</template>

<!-- Użycie w rodzicu -->
<MyCard>
  <template #header>
    <h2>Tytuł karty</h2>
  </template>

  <p>Treść główna karty</p>

  <template #footer>
    <button>OK</button>
  </template>
</MyCard>
```

**Dobre praktyki:**
- ✅ Używaj `#nazwa` zamiast `v-slot:nazwa` – krótszy zapis.
- ✅ Dokumentuj dostępne sloty w komponentach bibliotecznych.

---

## Sloty z danymi (scoped slots)
- **Co to?** Slot przekazuje dane z komponentu dziecka z powrotem do rodzica, który może ich użyć do renderowania.
- **Kiedy?** Gdy dziecko posiada dane (np. elementy listy), ale rodzic ma decydować jak je wyrenderować.

```vue
<!-- DataList.vue -->
<template>
  <ul>
    <slot
      v-for="(item, index) in items"
      :key="index"
      :item="item"
      :index="index"
      :isLast="index === items.length - 1"
    />
  </ul>
</template>

<script setup>
defineProps({ items: Array })
</script>

<!-- Użycie w rodzicu -->
<DataList :items="['Vue', 'React', 'Angular']">
  <template #default="{ item, index, isLast }">
    <li :class="{ 'font-bold': isLast }">
      {{ index + 1 }}. {{ item }}
    </li>
  </template>
</DataList>
```

**Dobre praktyki:**
- ✅ Używaj destructuringu w `#default="{ item, index }"` dla czytelności.
- ✅ Idealne dla generycznych tabel, list z konfigurowalnymi kolumnami.
- ❌ Nie przekazuj zbyt wielu danych przez slot.

---

## Dynamiczne komponenty
- **Co to?** Renderowanie różnych komponentów w tym samym miejscu DOM, w zależności od stanu.
- **Kiedy?** Zakładki (tabs), kroki formularza (wizard), kondycyjne widoki.

```vue
<script setup>
import { ref } from 'vue'
import TabHome from './TabHome.vue'
import TabAbout from './TabAbout.vue'
import TabContact from './TabContact.vue'

const tabs = { home: TabHome, about: TabAbout, contact: TabContact }
const activeTab = ref('home')
</script>

<template>
  <div>
    <button v-for="(_, name) in tabs" :key="name" @click="activeTab = name">
      {{ name }}
    </button>

    <!-- keep-alive zachowuje stan komponentu po przełączeniu -->
    <keep-alive>
      <component :is="tabs[activeTab]" />
    </keep-alive>
  </div>
</template>
```

**Dobre praktyki:**
- ✅ `keep-alive` – zachowuje stan gdy przełączasz między zakładkami z formularzami.
- ✅ `:is` może przyjąć zarówno zaimportowany komponent jak i string z nazwą.

---

## Teleport
- **Co to?** Renderuje szablon komponentu w innym miejscu DOM (np. `<body>`) niż jego logiczne miejsce w hierarchii.
- **Kiedy?** Modale, tooltips, notyfikacje — elementy, które muszą być poza głównym drzewem, aby uniknąć problemów z `z-index` czy `overflow: hidden`.

```vue
<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>

<template>
  <button @click="isOpen = true">Otwórz modal</button>

  <!-- Teleport renderuje treść bezpośrednio w <body> -->
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay">
      <div class="modal">
        <p>Jestem modalem teleportowanym do body!</p>
        <button @click="isOpen = false">Zamknij</button>
      </div>
    </div>
  </Teleport>
</template>
```

**Dobre praktyki:**
- ✅ Używaj `to="body"` dla modali i dialogów.
- ✅ Stan i logika pozostają tam gdzie są – tylko DOM jest teleportowany.
- ❌ Nie używaj Teleport dla zwykłych elementów UI.

---

## Własne dyrektywy
- **Co to?** Atrybuty `v-...` dające niskopoziomowy dostęp do DOM elementu.
- **Kiedy?** Focus, tooltip, klawiszowe skróty – gdy potrzebujesz bezpośredniej manipulacji DOM.

```vue
<script setup>
// Lokalna dyrektywa – tylko w tym komponencie (musi zaczynać się od v)
const vFocus = {
  mounted: (el) => el.focus(),
}

// Dyrektywa z wartością i bindingiem
const vTooltip = {
  mounted(el, binding) {
    // binding.value = wartość przekazana do dyrektywy
    el.title = binding.value
  },
  updated(el, binding) {
    el.title = binding.value
  },
}
</script>

<template>
  <input v-focus />
  <button v-tooltip="'Kliknij mnie!'">Hover me</button>
</template>
```

**Globalna rejestracja (main.js):**
```javascript
app.directive('highlight', {
  mounted(el, binding) {
    el.style.backgroundColor = binding.value || 'yellow'
  }
})
// Użycie: <p v-highlight="'lightblue'">Tekst</p>
```

**Hooki dyrektyw:**
| Hook | Kiedy? |
|------|--------|
| `mounted` | Po zamontowaniu elementu w DOM |
| `updated` | Po każdej aktualizacji komponentu |
| `unmounted` | Po odmontowaniu elementu |

**Dobre praktyki:**
- ✅ Preferuj reaktywność Vue nad dyrektywami.
- ✅ Czyść event listenery i timery w `unmounted`.
- ❌ Nie umieszczaj logiki biznesowej w dyrektywach.

---

# Zarządzanie stanem - Pinia

## Tworzenie store - Options API

```javascript
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    name: 'Kamil',
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    greeting: (state) => `Cześć, ${state.name}!`,
  },
  actions: {
    increment() {
      this.count++  // this odnosi się do całego store'a, nie state
    },
    async fetchData() {
      const data = await fetch('/api/data').then(r => r.json())
      this.count = data.count
    },
  },
})
```

---

## Tworzenie store - Composition API

```javascript
// stores/counter.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // state = ref/reactive
  const count = ref(0)
  const name = ref('Kamil')

  // getters = computed
  const doubleCount = computed(() => count.value * 2)
  const greeting = computed(() => `Cześć, ${name.value}!`)

  // actions = functions
  function increment() {
    count.value++
  }

  async function fetchData() {
    const data = await fetch('/api/data').then(r => r.json())
    count.value = data.count
  }

  return { count, name, doubleCount, greeting, increment, fetchData }
})
```

**Różnice Options vs Composition API w Pinia:**
| | Options API | Composition API |
|--|--|--|
| Stan | `state: () => ({})` | `ref()` / `reactive()` |
| Gettery | `getters: {}` | `computed()` |
| Akcje | `actions: {}` | zwykłe funkcje |
| `this` | dostępne w akcjach | niedostępne |
| Elastyczność | mniejsza | większa |

**Dobre praktyki:**
- ✅ Używaj Composition API w nowych projektach.
- ✅ Jeden store = jeden plik.
- ✅ Używaj PascalCase dla interfejsów, camelCase dla store'ów.
- ❌ Nie mutuj stanu bezpośrednio poza store'em.

---

## storeToRefs i toRefs w Pinia

```vue
<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()

// ✅ storeToRefs – wyciąga reaktywny stan i gettery
const { count, doubleCount, name } = storeToRefs(counterStore)

// ✅ Akcje wyciągaj bezpośrednio – nie są reaktywne
const { increment, fetchData } = counterStore
</script>

<template>
  <p>{{ count }} (x2: {{ doubleCount }})</p>
  <button @click="increment">+</button>
</template>
```

**Dlaczego nie można destrukturyzować bezpośrednio?**
```javascript
// ❌ ZŁE – traci reaktywność!
const { count } = counterStore

// ✅ DOBRE – zachowuje reaktywność
const { count } = storeToRefs(counterStore)
```

---

## Globalna reaktywność

Pinia jest zalecanym sposobem zarządzania stanem globalnym. Alternatywnie, możesz użyć `reactive` poza komponentem:

```javascript
// composables/useGlobalState.js
import { reactive, readonly } from 'vue'

const state = reactive({
  user: null,
  theme: 'light',
})

export function useGlobalState() {
  function setUser(user) {
    state.user = user
  }

  // readonly – zapobiega mutacjom spoza composable
  return { state: readonly(state), setUser }
}
```

**Dobre praktyki:**
- ✅ Dla małych projektów: composable z `reactive`.
- ✅ Dla większych projektów: Pinia.
- ❌ Nie używaj prostego `window.store` – brak reaktywności.

---

# Routing - Vue Router

## Konfiguracja tras

```bash
npm install vue-router
```

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // Lazy loading – ładuje komponent dopiero gdy trasa jest odwiedzona
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: '/:pathMatch(.*)*', // 404
    name: 'not-found',
    component: () => import('@/views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
```

```javascript
// main.js
import router from './router'
app.use(router)
```

```vue
<!-- App.vue -->
<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink :to="{ name: 'about' }">About</RouterLink>
  </nav>
  <RouterView />
</template>
```

---

## Dynamiczne trasy i parametry

```javascript
// routes
{ path: '/user/:id', name: 'user', component: UserView }
{ path: '/post/:id/comment/:commentId', component: PostView }
```

```vue
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

// Parametry z URL: /user/42
console.log(route.params.id)       // '42'

// Query params: /search?q=vue&page=2
console.log(route.query.q)         // 'vue'

// Hash: /about#team
console.log(route.hash)            // '#team'
</script>
```

**Reagowanie na zmianę parametrów (ten sam komponent, inny id):**
```javascript
watch(() => route.params.id, (newId) => {
  fetchUser(newId)
})
```

---

## Nawigacja programowa

```javascript
import { useRouter } from 'vue-router'

const router = useRouter()

// Push – dodaje do historii
router.push('/about')
router.push({ name: 'user', params: { id: 42 } })
router.push({ path: '/search', query: { q: 'vue' } })

// Replace – nie dodaje do historii (podmienia)
router.replace('/login')

// Nawigacja w historii
router.go(-1)  // cofnij
router.go(1)   // naprzód
router.back()
router.forward()
```

---

## Navigation guards

Guardy pozwalają kontrolować dostęp do tras.

```javascript
// Guard globalny (router/index.js)
router.beforeEach((to, from) => {
  const isAuthenticated = useAuthStore().isLoggedIn

  // Blokuj jeśli trasa wymaga autoryzacji i użytkownik nie jest zalogowany
  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'login' }
  }
})
```

```javascript
// Guard per-route
const routes = [
  {
    path: '/admin',
    component: AdminView,
    meta: { requiresAuth: true },
    beforeEnter: (to, from) => {
      if (!isAdmin()) return { name: 'home' }
    },
  },
]
```

```vue
<!-- Guard w komponencie -->
<script setup>
import { onBeforeRouteLeave } from 'vue-router'

onBeforeRouteLeave((to, from) => {
  const confirmed = confirm('Masz niezapisane zmiany. Opuścić stronę?')
  if (!confirmed) return false  // Blokuj navigację
})
</script>
```

**Dobre praktyki:**
- ✅ Używaj `meta` do przechowywania informacji o autoryzacji.
- ✅ Lazy loading via `() => import()` dla optymalizacji.
- ✅ `createWebHistory` dla "czystych" URL-i (wymaga konfiguracji serwera).

---

# Formularze i walidacja

## v-model – dwukierunkowe wiązanie

```vue
<script setup>
import { ref, reactive } from 'vue'

// Proste wartości
const text = ref('')
const checked = ref(false)
const selected = ref('a')

// Obiekt formularza
const form = reactive({
  name: '',
  email: '',
  role: 'user',
  agree: false,
})
</script>

<template>
  <!-- v-model.trim usuwa białe znaki, .lazy aktualizuje przy blur -->
  <input v-model.trim="form.name" placeholder="Imię" />
  <input v-model.lazy="form.email" type="email" />

  <select v-model="form.role">
    <option value="user">Użytkownik</option>
    <option value="admin">Admin</option>
  </select>

  <input type="checkbox" v-model="form.agree" />

  <!-- v-model na własnym komponencie -->
  <MyInput v-model="text" />
</template>
```

**v-model na własnym komponencie:**
```vue
<!-- MyInput.vue -->
<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

---

## Obsługa zdarzeń formularzy

```vue
<script setup>
import { reactive, ref } from 'vue'

const form = reactive({ name: '', email: '' })
const loading = ref(false)
const error = ref(null)

async function handleSubmit() {
  loading.value = true
  error.value = null
  try {
    await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <!-- @submit.prevent blokuje domyślne zachowanie formularza -->
  <form @submit.prevent="handleSubmit">
    <input v-model="form.name" @input="clearError" />
    <input v-model="form.email" type="email" />
    <p v-if="error">{{ error }}</p>
    <button type="submit" :disabled="loading">
      {{ loading ? 'Ładowanie...' : 'Wyślij' }}
    </button>
  </form>
</template>
```

---

## Walidacja z VeeValidate + Yup

```bash
npm install vee-validate yup
```

```vue
<script setup>
import { useForm, useField } from 'vee-validate'
import * as Yup from 'yup'

const schema = Yup.object({
  name: Yup.string().required('Imię jest wymagane').min(2, 'Min. 2 znaki'),
  email: Yup.string().required('Email jest wymagany').email('Niepoprawny email'),
})

const { handleSubmit, errors } = useForm({ validationSchema: schema })
const { value: name } = useField('name')
const { value: email } = useField('email')

const onSubmit = handleSubmit((values) => {
  console.log('Dane formularza:', values)
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div>
      <input v-model="name" placeholder="Imię" />
      <span>{{ errors.name }}</span>
    </div>
    <div>
      <input v-model="email" type="email" placeholder="Email" />
      <span>{{ errors.email }}</span>
    </div>
    <button type="submit">Wyślij</button>
  </form>
</template>
```

**Dobre praktyki:**
- ✅ Waliduj zarówno po stronie klienta jak i serwera.
- ✅ Pokazuj błędy walidacji przy polu, nie tylko na górze formularza.
- ✅ Użyj `@submit.prevent` zawsze.

---

# Komunikacja między komponentami

## Props i emit

```vue
<!-- Komponent dziecka: UserCard.vue -->
<script setup>
// defineProps – typowanie i domyślne wartości
const props = defineProps({
  name: { type: String, required: true },
  age: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
})

// defineEmits – deklaracja emitowanych zdarzeń
const emit = defineEmits(['delete', 'update:name'])

function handleDelete() {
  emit('delete', props.name)
}
</script>

<template>
  <div>
    <p>{{ props.name }} ({{ props.age }})</p>
    <button @click="handleDelete">Usuń</button>
  </div>
</template>
```

```vue
<!-- Komponent rodzica -->
<UserCard
  name="Kamil"
  :age="25"
  :is-admin="true"
  @delete="handleUserDelete"
/>
```

**Dobre praktyki:**
- ✅ Zawsze deklaruj typy propsów.
- ✅ Props są readonly w komponencie dziecka – nie mutuj ich bezpośrednio.
- ✅ Dla dwukierunkowego wiązania używaj `v-model` (emit `update:propName`).

---

## Provide / Inject

```vue
<!-- Komponent nadrzędny (dowolny poziom wyżej) -->
<script setup>
import { provide, ref } from 'vue'

const theme = ref('dark')
const setTheme = (t) => { theme.value = t }

// provide(klucz, wartość)
provide('theme', theme)          // reaktywna wartość
provide('setTheme', setTheme)    // funkcja do mutacji
</script>
```

```vue
<!-- Dowolny komponent potomny (na dowolnym poziomie głębokości) -->
<script setup>
import { inject } from 'vue'

// inject(klucz, wartośćDomyślna)
const theme = inject('theme', 'light')
const setTheme = inject('setTheme')
</script>

<template>
  <div :class="`theme-${theme}`">
    <button @click="setTheme('light')">Light</button>
    <button @click="setTheme('dark')">Dark</button>
  </div>
</template>
```

**Dobre praktyki:**
- ✅ Używaj Symbol jako klucz, aby uniknąć konfliktów nazw.
- ✅ Przekazuj reaktywne wartości (`ref`, `computed`), nie surowe wartości.
- ✅ Dostarczaj funkcje mutujące z `provide` – nie pozwalaj dzieciom mutować bezpośrednio.

---

## Event Bus (mitt)

Event bus pozwala na komunikację między komponentami niezwiązanymi hierarchicznie.

```bash
npm install mitt
```

```javascript
// utils/eventBus.js
import mitt from 'mitt'
export const emitter = mitt()
```

```vue
<!-- Komponent A – nadawca -->
<script setup>
import { emitter } from '@/utils/eventBus'

function sendMessage() {
  emitter.emit('notification', { text: 'Coś się stało!', type: 'success' })
}
</script>
```

```vue
<!-- Komponent B – odbiornik -->
<script setup>
import { onMounted, onUnmounted } from 'vue'
import { emitter } from '@/utils/eventBus'

function handleNotification(payload) {
  console.log(payload.text)
}

onMounted(() => emitter.on('notification', handleNotification))
// ✅ Zawsze odsubskrybuj w onUnmounted!
onUnmounted(() => emitter.off('notification', handleNotification))
</script>
```

**Dobre praktyki:**
- ✅ Zawsze odsubskrybuj (`off`) w `onUnmounted` – zapobiega wyciekom pamięci.
- ✅ Dla bardziej złożonej komunikacji użyj Pinia.
- ❌ Unikaj nadmiernego używania event bus – utrudnia debugowanie.

---

# Zarządzanie danymi i SSR

## Pobieranie danych z API

**Z `fetch`:**
```vue
<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])
const loading = ref(false)
const error = ref(null)

async function fetchUsers() {
  loading.value = true
  error.value = null
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
    users.value = await response.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

onMounted(fetchUsers)
</script>

<template>
  <div v-if="loading">Ładowanie...</div>
  <div v-else-if="error">Błąd: {{ error }}</div>
  <ul v-else>
    <li v-for="user in users" :key="user.id">{{ user.name }}</li>
  </ul>
</template>
```

**Z Axios:**
```bash
npm install axios
```

```javascript
// utils/api.js – centralna konfiguracja
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
})

// Interceptor – np. dodawanie tokena do każdego requestu
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Interceptor odpowiedzi – obsługa błędów globalnie
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Wyloguj użytkownika
    }
    return Promise.reject(error)
  }
)
```

```vue
<script setup>
import { api } from '@/utils/api'

const { data: users } = await api.get('/users')
</script>
```

**Dobre praktyki:**
- ✅ Centralizuj konfigurację API (baseURL, tokeny) w jednym pliku.
- ✅ Zawsze obsługuj stany: `loading`, `error`, `data`.
- ✅ Używaj `AbortController` do anulowania requestów przy odmontowaniu.

---

## Obsługa błędów i stanu ładowania

```javascript
// composables/useFetch.js – reusable composable do fetching danych
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const loading = ref(true)
  const error = ref(null)

  fetch(url)
    .then((r) => r.json())
    .then((json) => { data.value = json })
    .catch((e) => { error.value = e.message })
    .finally(() => { loading.value = false })

  return { data, loading, error }
}

// Użycie w komponencie:
// const { data, loading, error } = useFetch('/api/users')
```

---

## SSR i Nuxt.js

**Nuxt.js** to framework zbudowany na Vue 3, który oferuje SSR, SSG i wiele więcej.

```bash
npx nuxi@latest init my-app
```

```vue
<!-- pages/index.vue – automatyczny routing na podstawie pliku -->
<script setup>
// useFetch – automatycznie działa po stronie serwera i klienta
const { data: posts } = await useFetch('/api/posts')
</script>

<template>
  <div>
    <h1>Blog</h1>
    <article v-for="post in posts" :key="post.id">
      <h2>{{ post.title }}</h2>
    </article>
  </div>
</template>
```

**Dobre praktyki:**
- ✅ Używaj Nuxt gdy potrzebujesz SEO lub szybkiego pierwszego renderowania.
- ✅ `useFetch` i `useAsyncData` w Nuxt obsługują hydration automatycznie.

---

# Testowanie

## Testy jednostkowe

```bash
npm install -D vitest @vue/test-utils
```

```javascript
// components/__tests__/Counter.spec.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Counter from '../Counter.vue'

describe('Counter', () => {
  it('renderuje poprawnie', () => {
    const wrapper = mount(Counter)
    expect(wrapper.text()).toContain('Count: 0')
  })

  it('inkrementuje count po kliknięciu', async () => {
    const wrapper = mount(Counter)
    await wrapper.find('button').trigger('click')
    expect(wrapper.text()).toContain('Count: 1')
  })

  it('przyjmuje propa initialCount', () => {
    const wrapper = mount(Counter, { props: { initialCount: 5 } })
    expect(wrapper.text()).toContain('Count: 5')
  })
})
```

---

## Testy integracyjne

Testowanie interakcji między komponentami i store'ami:

```javascript
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, it, expect } from 'vitest'
import UserList from '../UserList.vue'
import { useUserStore } from '@/stores/user'

describe('UserList', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('wyświetla użytkowników ze store', async () => {
    const store = useUserStore()
    store.users = [{ id: 1, name: 'Kamil' }, { id: 2, name: 'Ola' }]

    const wrapper = mount(UserList)
    expect(wrapper.findAll('li')).toHaveLength(2)
    expect(wrapper.text()).toContain('Kamil')
  })
})
```

---

## Testy E2E

```bash
npm install -D cypress
npx cypress open
```

```javascript
// cypress/e2e/counter.cy.js
describe('Counter', () => {
  it('inkrementuje licznik', () => {
    cy.visit('/')
    cy.contains('Count: 0')
    cy.contains('Increment').click()
    cy.contains('Count: 1')
  })

  it('nawiguje do strony about', () => {
    cy.visit('/')
    cy.get('a[href="/about"]').click()
    cy.url().should('include', '/about')
  })
})
```

**Dobre praktyki:**
- ✅ Pisz testy jednostkowe dla logiki biznesowej (store, composables).
- ✅ Testy integracyjne dla kluczowych przepływów danych.
- ✅ Testy E2E dla krytycznych ścieżek użytkownika (login, checkout).
- ❌ Nie testuj szczegółów implementacyjnych, testuj zachowanie.

---

# Optymalizacja

## Lazy loading

```javascript
// router – komponent ładowany dopiero gdy trasa jest odwiedzona
const routes = [
  {
    path: '/dashboard',
    component: () => import('@/views/DashboardView.vue'),
  },
]
```

```vue
<!-- Lazy loading komponentu w szablonie z Suspense -->
<script setup>
import { defineAsyncComponent } from 'vue'

const HeavyChart = defineAsyncComponent({
  loader: () => import('./HeavyChart.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorMessage,
  delay: 200,
  timeout: 5000,
})
</script>

<template>
  <Suspense>
    <HeavyChart />
    <template #fallback>Ładowanie wykresu...</template>
  </Suspense>
</template>
```

---

## Code splitting

Vite automatycznie dzieli kod na chunki. Możesz to kontrolować:

```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router', 'pinia'],
          'charts': ['chart.js'],
        },
      },
    },
  },
}
```

---

## v-once, v-memo, keep-alive

```vue
<template>
  <!-- v-once – renderuje tylko raz, nigdy nie aktualizuje -->
  <h1 v-once>Tytuł strony (statyczny)</h1>

  <!-- v-memo – ponownie renderuje TYLKO gdy zmienna lista się zmieni -->
  <div v-for="item in list" :key="item.id" v-memo="[item.id, item.selected]">
    {{ item.name }}
  </div>

  <!-- keep-alive – zachowuje stan przy przełączaniu komponentów -->
  <keep-alive :include="['TabA', 'TabB']" :max="5">
    <component :is="activeComponent" />
  </keep-alive>
</template>
```

**Dobre praktyki:**
- ✅ `v-once` dla statycznej treści (logi, nagłówki).
- ✅ `keep-alive` dla zakładek z formularzami.
- ✅ `v-memo` dla dużych list z rzadkimi aktualizacjami.
- ❌ Nie nadużywaj `keep-alive` – może prowadzić do nieoczekiwanych stanów.

---

# Stylowanie

## Scoped styles / CSS Modules

```vue
<!-- Scoped styles – klasy działają tylko w tym komponencie -->
<style scoped>
.button {
  background: blue;
}
/* :deep() – dotknij elementu dziecka z scoped styles */
:deep(.child-class) {
  color: red;
}
</style>

<!-- CSS Modules – automatycznie unikalne klasy -->
<script setup>
import { useCssModule } from 'vue'
const $style = useCssModule()
</script>

<style module>
.button {
  background: blue;  /* klasa staje się $style.button */
}
</style>

<template>
  <button :class="$style.button">Kliknij</button>
</template>
```

---

## Dynamiczne klasy i style

```vue
<script setup>
import { ref } from 'vue'
const isActive = ref(true)
const hasError = ref(false)
const size = ref('large')
</script>

<template>
  <!-- Obiekt klas -->
  <div :class="{ active: isActive, 'text-red': hasError }">...</div>

  <!-- Tablica klas -->
  <div :class="['base-class', isActive ? 'active' : '', `size-${size}`]">...</div>

  <!-- Inline style jako obiekt -->
  <div :style="{ color: 'red', fontSize: '16px' }">...</div>

  <!-- Inline style jako tablica obiektów -->
  <div :style="[baseStyles, { color: isActive ? 'blue' : 'gray' }]">...</div>
</template>
```

---

## Tailwind CSS w Vue

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: { extend: {} },
  plugins: [],
}
```

```css
/* src/assets/main.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```vue
<template>
  <!-- Utility classes bezpośrednio w szablonie -->
  <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
    Kliknij mnie
  </button>

  <!-- Dynamiczne klasy z Tailwind -->
  <div :class="['p-4 rounded', isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
    {{ message }}
  </div>
</template>
```

---

# Praca z bibliotekami i pluginy

## Integracja z zewnętrznymi bibliotekami

```vue
<!-- Chart.js -->
<script setup>
import { onMounted, ref } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)
const canvasRef = ref(null)

onMounted(() => {
  new Chart(canvasRef.value, {
    type: 'bar',
    data: {
      labels: ['Styczeń', 'Luty', 'Marzec'],
      datasets: [{ label: 'Sprzedaż', data: [30, 50, 45] }],
    },
  })
})
</script>

<template>
  <canvas ref="canvasRef"></canvas>
</template>
```

---

## Tworzenie własnych pluginów

```javascript
// plugins/myPlugin.js
export const myPlugin = {
  install(app, options) {
    // Dodaj globalną właściwość
    app.config.globalProperties.$greet = (name) => `Cześć, ${name}!`

    // Dodaj globalny komponent
    app.component('MyGlobalButton', MyGlobalButton)

    // Dodaj dyrektywę
    app.directive('focus', { mounted: (el) => el.focus() })

    // Provide wartości globalne
    app.provide('pluginOptions', options)
  },
}

// main.js
app.use(myPlugin, { theme: 'dark' })

// Użycie w komponencie:
// const instance = getCurrentInstance()
// instance.appContext.config.globalProperties.$greet('Kamil')
```

**Dobre praktyki:**
- ✅ Używaj pluginów do globalnej rejestracji komponentów i dyrektyw.
- ✅ Przekazuj opcje przez drugi argument `app.use(plugin, options)`.

---

# Animacje i przejścia

## Vue Transition

`<Transition>` obsługuje CSS przejścia/animacje wchodzenia i wychodzenia elementów.

```vue
<template>
  <button @click="show = !show">Toggle</button>

  <Transition name="fade">
    <p v-if="show">Pojawiający się tekst</p>
  </Transition>
</template>

<style scoped>
/* .fade-enter-active – podczas wchodzenia */
/* .fade-leave-active – podczas wychodzenia */
/* .fade-enter-from, .fade-leave-to – stan początkowy/końcowy */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```

---

## transition-group

`<TransitionGroup>` obsługuje animacje listy elementów.

```vue
<template>
  <TransitionGroup name="list" tag="ul">
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
    </li>
  </TransitionGroup>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
/* Animacja przesuwania pozostałych elementów */
.list-move {
  transition: transform 0.3s ease;
}
</style>
```

---

## GSAP w Vue

```bash
npm install gsap
```

```vue
<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const box = ref(null)

onMounted(() => {
  gsap.to(box.value, {
    x: 200,
    rotation: 360,
    duration: 1,
    ease: 'power2.out',
  })
})

// GSAP z Transition hooks
function onEnter(el, done) {
  gsap.from(el, { opacity: 0, y: -20, duration: 0.5, onComplete: done })
}

function onLeave(el, done) {
  gsap.to(el, { opacity: 0, y: 20, duration: 0.5, onComplete: done })
}
</script>

<template>
  <div ref="box" class="box">Animowany box</div>

  <Transition @enter="onEnter" @leave="onLeave" :css="false">
    <p v-if="show">Animowany z GSAP</p>
  </Transition>
</template>
```

---

# TypeScript w Vue

## Konfiguracja TypeScript

```bash
npm create vite@latest my-app --template vue-ts
```

```json
// tsconfig.json (kluczowe opcje)
{
  "compilerOptions": {
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "bundler",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

---

## Typowanie propsów i emitów

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

// Typowanie propsów
interface Props {
  name: string
  age?: number
  role: 'admin' | 'user'
}

const props = withDefaults(defineProps<Props>(), {
  age: 0,
})

// Typowanie emitów
const emit = defineEmits<{
  delete: [id: number]
  'update:name': [name: string]
}>()

// Ref z typem
const count = ref<number>(0)
const user = ref<{ name: string; id: number } | null>(null)

// Computed z typem
const label = computed<string>(() => `Użytkownik: ${props.name}`)
</script>
```

**Dobre praktyki:**
- ✅ Używaj `interface` do typowania propsów, nie inline type.
- ✅ `withDefaults` dla domyślnych wartości przy typowaniu generycznym.
- ✅ Zawsze typuj `ref` gdy wartość może być `null`.
- ❌ Nie używaj `any` – utracisz korzyści z TypeScript.

---

# Tworzenie aplikacji produkcyjnych

## Zmienne środowiskowe (.env)

```bash
# .env – dostępne w każdym środowisku
VITE_APP_TITLE=MojaAplikacja

# .env.development – tylko w trybie dev
VITE_API_URL=http://localhost:3000

# .env.production – tylko w produkcji
VITE_API_URL=https://api.mojadomena.pl
```

```javascript
// Dostęp w kodzie (tylko zmienne z prefiksem VITE_)
const apiUrl = import.meta.env.VITE_API_URL
const title = import.meta.env.VITE_APP_TITLE

// Sprawdzanie trybu
if (import.meta.env.DEV) {
  console.log('Tryb developerski')
}
```

**Dobre praktyki:**
- ✅ Dodaj `.env.local` do `.gitignore` – dla sekretów lokalnych.
- ✅ Tylko zmienne z prefiksem `VITE_` są dostępne w przeglądarce.
- ❌ Nigdy nie przechowuj sekretów (klucze API, hasła) w zmiennych `VITE_`.

---

## Budowanie aplikacji

```bash
# Build produkcyjny
npm run build

# Podgląd zbudowanej aplikacji
npm run preview
```

```javascript
// vite.config.js – konfiguracja builda
export default {
  build: {
    outDir: 'dist',
    sourcemap: false,      // wyłącz sourcemapy w produkcji
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
        },
      },
    },
  },
}
```

---

## Globalne przechwytywanie błędów

```javascript
// main.js
const app = createApp(App)

// Globalny handler błędów Vue
app.config.errorHandler = (err, instance, info) => {
  console.error('Globalny błąd Vue:', err)
  console.error('Komponent:', instance)
  console.error('Informacja:', info)  // np. 'v-on handler'

  // Wyślij błąd do serwisu monitoringu (np. Sentry)
  // Sentry.captureException(err)
}

// Handler dla niezłapanych Promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Niezłapany błąd Promise:', event.reason)
})
```

**Error Boundary z `onErrorCaptured`:**
```vue
<!-- ErrorBoundary.vue -->
<script setup>
import { ref, onErrorCaptured } from 'vue'

const error = ref(null)

onErrorCaptured((err) => {
  error.value = err.message
  return false  // false = zatrzymaj propagację błędu w górę
})
</script>

<template>
  <div v-if="error" class="error-fallback">
    <p>Coś poszło nie tak: {{ error }}</p>
    <button @click="error = null">Spróbuj ponownie</button>
  </div>
  <slot v-else />
</template>

<!-- Użycie -->
<ErrorBoundary>
  <RiskyComponent />
</ErrorBoundary>
```

**Dobre praktyki:**
- ✅ Zawsze ustaw `app.config.errorHandler` w produkcji.
- ✅ Używaj Error Boundary dla komponentów z zewnętrznym API.
- ✅ Integruj z Sentry lub podobnym serwisem do monitorowania błędów.
- ❌ Nie łap wszystkich błędów – tylko te, które chcesz obsłużyć gracefully.

---

# Nowości Vue 3 – defineModel, defineOptions, defineExpose, v-bind shorthand

## defineModel (stabilne od Vue 3.4)

`defineModel` to makro w `<script setup>` upraszczające implementację `v-model` w komponentach. Eksperymentalne w Vue 3.3, stabilne w **Vue 3.4**.

```vue
<!-- PRZED (stary sposób) -->
<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
</template>

<!-- PO – z defineModel (Vue 3.4+) -->
<script setup>
const model = defineModel()
</script>

<template>
  <input v-model="model" />
</template>
```

**Z typowaniem TypeScript i opcjami:**
```vue
<script setup lang="ts">
// Prosty typ
const model = defineModel<string>()

// Z opcjami (required, default)
const count = defineModel<number>('count', { default: 0 })

// Wiele v-model na jednym komponencie
const firstName = defineModel<string>('firstName')
const lastName = defineModel<string>('lastName')
</script>
```

**Użycie w rodzicu:**
```vue
<MyInput v-model="text" />
<MyCounter v-model:count="value" />
<MyName v-model:firstName="first" v-model:lastName="last" />
```

**Dobre praktyki:**
- ✅ Używaj `defineModel` w nowych projektach – to oficjalny zalecany sposób.
- ✅ Dla modyfikatorów (`.trim`, `.number`) – `defineModel` automatycznie je obsługuje.
- ❌ Nie mix-uj starego `defineProps/defineEmits` podejścia z `defineModel`.

---

## defineOptions (Vue 3.3+)

Pozwala ustawiać opcje komponentu (`name`, `inheritAttrs` itp.) bezpośrednio w `<script setup>` bez osobnego bloku `<script>`.

```vue
<script setup>
// Przed Vue 3.3 trzeba było dodać osobny <script> blok dla tych opcji
defineOptions({
  name: 'BaseButton',       // własna nazwa w Vue Devtools
  inheritAttrs: false,      // wyłącz automatyczne dziedziczenie atrybutów
})
</script>

<template>
  <!-- $attrs dostępne ręcznie gdy inheritAttrs: false -->
  <button v-bind="$attrs" class="btn">
    <slot />
  </button>
</template>
```

---

## defineExpose

Domyślnie komponenty `<script setup>` są "zamknięte" – rodzic nie może dostać się do ich właściwości przez `ref`. `defineExpose` pozwala to kontrolować.

```vue
<!-- ChildComponent.vue -->
<script setup>
import { ref } from 'vue'

const count = ref(0)
const inputRef = ref(null)

function reset() {
  count.value = 0
}

// Expose – udostępnij wybrane elementy rodzicowi
defineExpose({
  count,
  reset,
  focus: () => inputRef.value?.focus(),
})
</script>
```

```vue
<!-- Rodzic -->
<script setup>
import { ref, onMounted } from 'vue'

const childRef = ref(null)

onMounted(() => {
  childRef.value.reset()    // ✅ OK – przez defineExpose
  childRef.value.focus()    // ✅ OK – przez defineExpose
  // childRef.value.inputRef  // ❌ undefined – nie exposed
})
</script>

<template>
  <ChildComponent ref="childRef" />
</template>
```

**Dobre praktyki:**
- ✅ Używaj `defineExpose` dla bibliotek UI (focus management, animacje).
- ✅ Preferuj `emit` do komunikacji zamiast bezpośredniego dostępu przez `ref`.
- ❌ Nie expose całego stanu – narusza enkapsulację.

---

## v-bind Same-name Shorthand (Vue 3.4+)

Gdy nazwa zmiennej i atrybutu są takie same, można pominąć powtórzenie:

```vue
<script setup>
const id = 'username'
const src = '/img/avatar.png'
const alt = 'Avatar użytkownika'
</script>

<template>
  <!-- Przed Vue 3.4 -->
  <img :id="id" :src="src" :alt="alt" />

  <!-- Vue 3.4+ – shorthand gdy nazwa = wartość -->
  <img :id :src :alt />
</template>
```

---

## defineSlots – typowanie slotów (Vue 3.3+)

```vue
<script setup lang="ts">
defineSlots<{
  default?: (props: { msg: string }) => any
  header?: (props: { title: string }) => any
  item?: (props: { id: number; name: string }) => any
}>()
</script>
```

---

## Generyczne komponenty (Vue 3.3+)

```vue
<script setup lang="ts" generic="T">
defineProps<{
  items: T[]
  selected: T
}>()

defineEmits<{
  'update:selected': [value: T]
}>()
</script>

<template>
  <ul>
    <li
      v-for="item in items"
      :key="String(item)"
      :class="{ active: item === selected }"
      @click="$emit('update:selected', item)"
    >
      <slot :item="item" />
    </li>
  </ul>
</template>
```

```vue
<!-- Użycie – TypeScript inferuje typ T jako User -->
<GenericList
  :items="users"
  v-model:selected="selectedUser"
>
  <template #default="{ item }">{{ item.name }}</template>
</GenericList>
```

---

## Vue 3.4 – wydajność reaktywności

Vue 3.4 zoptymalizował system reaktywności: `computed` nie triggeruje subskrybentów gdy wynik się nie zmienił.

```javascript
const count = ref(0)
const isEven = computed(() => count.value % 2 === 0)

watchEffect(() => console.log(isEven.value)) // true

count.value = 2  // isEven nadal true → watchEffect NIE odpali (Vue 3.4+)
count.value = 3  // isEven zmienione na false → watchEffect odpali
```

---

# Zaawansowane Composables

Composable to funkcja (z prefiksem `use`) enkapsulująca reaktywną logikę wielokrotnego użytku. Zastępują mixiny z Vue 2.

## useForm – własny composable do formularzy

```typescript
// composables/useForm.ts
import { reactive, ref } from 'vue'

type ValidationRules<T> = {
  [K in keyof T]?: (value: T[K]) => string | undefined
}

export function useForm<T extends Record<string, unknown>>(
  initialValues: T,
  rules?: ValidationRules<T>
) {
  const form = reactive({ ...initialValues }) as T
  const errors = reactive<Record<string, string>>({})
  const loading = ref(false)

  function validate(): boolean {
    Object.keys(errors).forEach(k => delete errors[k])
    if (!rules) return true
    let valid = true
    for (const [field, rule] of Object.entries(rules)) {
      const error = rule?.(form[field as keyof T])
      if (error) {
        errors[field] = error
        valid = false
      }
    }
    return valid
  }

  function reset() {
    Object.assign(form, initialValues)
    Object.keys(errors).forEach(k => delete errors[k])
  }

  async function submit(handler: (values: T) => Promise<void>) {
    if (!validate()) return
    loading.value = true
    try {
      await handler(form)
    } finally {
      loading.value = false
    }
  }

  return { form, errors, loading, validate, reset, submit }
}
```

```vue
<script setup>
import { useForm } from '@/composables/useForm'

const { form, errors, loading, submit } = useForm(
  { name: '', email: '' },
  {
    name: (v) => !v ? 'Imię wymagane' : undefined,
    email: (v) => !v?.includes('@') ? 'Niepoprawny email' : undefined,
  }
)

const onSubmit = () => submit(async (values) => {
  await api.post('/users', values)
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input v-model="form.name" />
    <p v-if="errors.name" class="error">{{ errors.name }}</p>
    <input v-model="form.email" type="email" />
    <p v-if="errors.email" class="error">{{ errors.email }}</p>
    <button type="submit" :disabled="loading">Wyślij</button>
  </form>
</template>
```

---

## useLocalStorage – persystentny stan

```typescript
// composables/useLocalStorage.ts
import { ref, watch } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const stored = localStorage.getItem(key)
  const data = ref<T>(stored ? JSON.parse(stored) : defaultValue)

  watch(
    data,
    (newValue) => {
      if (newValue === null || newValue === undefined) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(newValue))
      }
    },
    { deep: true }
  )

  return data
}

// Użycie:
// const theme = useLocalStorage<'light' | 'dark'>('theme', 'light')
// const cart = useLocalStorage<CartItem[]>('cart', [])
```

---

## useDebounce – opóźnienie wyszukiwania

```typescript
// composables/useDebounce.ts
import { ref, watch, type Ref } from 'vue'

export function useDebounce<T>(value: Ref<T>, delay = 300): Ref<T> {
  const debouncedValue = ref<T>(value.value) as Ref<T>
  let timeout: ReturnType<typeof setTimeout>

  watch(value, (newVal) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      debouncedValue.value = newVal
    }, delay)
  })

  return debouncedValue
}

// Użycie:
// const search = ref('')
// const debouncedSearch = useDebounce(search, 500)
// watch(debouncedSearch, (q) => fetchResults(q))
```

---

## useIntersectionObserver – lazy loading / infinite scroll

```typescript
// composables/useIntersectionObserver.ts
import { ref, onMounted, onUnmounted } from 'vue'

export function useIntersectionObserver(
  callback: () => void,
  threshold = 0.1
) {
  const target = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver

  onMounted(() => {
    observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) callback() },
      { threshold }
    )
    if (target.value) observer.observe(target.value)
  })

  onUnmounted(() => observer?.disconnect())

  return { target }
}
```

```vue
<!-- Infinite scroll -->
<script setup>
const items = ref([])
const page = ref(1)

async function loadMore() {
  const newItems = await fetchItems(page.value++)
  items.value.push(...newItems)
}

const { target } = useIntersectionObserver(loadMore)
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </ul>
  <!-- Sentinel – gdy widoczny, ładuje więcej -->
  <div ref="target" class="h-4" />
</template>
```

---

## useEventListener – bezpieczne event listeners

```typescript
// composables/useEventListener.ts
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(
  target: EventTarget,
  event: string,
  callback: EventListener
) {
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}

// Użycie – brak wycieku pamięci!
// useEventListener(window, 'resize', handleResize)
// useEventListener(document, 'keydown', handleKeydown)
```

---

## Zasady dobrego composable

```
✅ Nazwa zaczyna się od "use" (useXxx)
✅ Zwraca ref/reactive – zachowuje reaktywność
✅ Czyści efekty uboczne w onUnmounted (lub automatycznie przez composable)
✅ Może być używany w wielu komponentach
✅ Przyjmuje Ref lub getter jako argumenty (elastyczność)
❌ Nie importuj komponentów Vue w composable – tylko logika
❌ Nie mutuj danych przekazanych z zewnątrz bezpośrednio
```

---

# Wzorce architektoniczne

## Atomic Design w Vue

Organizacja komponentów na 5 poziomach (od najmniejszego):

```
src/
  components/
    atoms/        # Najmniejsze, nie podzielne: Button, Input, Badge, Icon, Spinner
    molecules/    # Atom + atom: SearchField, FormField, MenuItem
    organisms/    # Złożone sekcje: NavBar, ProductCard, LoginForm, DataTable
    templates/    # Layouty bez danych: PageLayout, DashboardLayout, AuthLayout
  pages/          # Templates z danymi: HomePage, ProductPage, DashboardPage
```

```vue
<!-- atoms/BaseButton.vue -->
<script setup>
defineProps({
  variant: { type: String, default: 'primary' },  // 'primary' | 'secondary' | 'danger'
  size: { type: String, default: 'md' },           // 'sm' | 'md' | 'lg'
  disabled: Boolean,
  loading: Boolean,
})
defineEmits(['click'])
</script>

<!-- molecules/SearchField.vue – BaseInput + BaseButton -->
<!-- organisms/UserTable.vue – DataTable + Pagination + Filters -->
```

---

## Smart / Dumb Components (Container / Presentational)

```
Smart (Container):               Dumb (Presentational):
─────────────────────────────    ─────────────────────────────
Zawiera logikę biznesową         Tylko UI – brak logiki
Korzysta ze store (Pinia)        Czyste propsy + emity
Fetchuje dane z API              Łatwe do testowania
Obsługuje błędy i loading        Łatwe do reuse
Nazywany: UserListContainer      Nazywany: UserList, UserCard
```

```vue
<!-- Smart: UserListContainer.vue -->
<script setup>
const userStore = useUserStore()
const { users, loading, error } = storeToRefs(userStore)

onMounted(() => userStore.fetchUsers())
</script>

<template>
  <UserList
    :users="users"
    :loading="loading"
    :error="error"
    @delete="userStore.deleteUser"
  />
</template>

<!-- Dumb: UserList.vue – tylko propsy i emity -->
<script setup>
defineProps({ users: Array, loading: Boolean, error: String })
defineEmits(['delete'])
</script>
```

---

## Feature-based struktura (duże projekty)

```
src/
  features/
    auth/
      components/
        LoginForm.vue
        RegisterForm.vue
      composables/
        useAuth.ts
      stores/
        auth.ts
      types/
        index.ts
    products/
      components/
        ProductCard.vue
        ProductList.vue
      composables/
        useProducts.ts
      stores/
        products.ts
  shared/
    components/    # Globalne: BaseButton, BaseModal, BaseToast
    composables/   # Globalne: useDebounce, useLocalStorage
    utils/         # Helpers: formatDate, cn (classnames)
    types/         # Globalne typy
```

---

## Repository Pattern (separacja logiki API)

```typescript
// repositories/userRepository.ts
import { api } from '@/utils/api'
import type { User } from '@/types'

export const userRepository = {
  async getAll(): Promise<User[]> {
    const { data } = await api.get('/users')
    return data
  },
  async getById(id: number): Promise<User> {
    const { data } = await api.get(`/users/${id}`)
    return data
  },
  async create(user: Omit<User, 'id'>): Promise<User> {
    const { data } = await api.post('/users', user)
    return data
  },
  async update(id: number, user: Partial<User>): Promise<User> {
    const { data } = await api.put(`/users/${id}`, user)
    return data
  },
  async delete(id: number): Promise<void> {
    await api.delete(`/users/${id}`)
  },
}

// Użycie w store:
// actions: { async fetch() { this.users = await userRepository.getAll() } }
```

---

# Testowanie – Zaawansowane

## Mock Service Worker (MSW)

MSW przechwytuje requesty HTTP na poziomie Service Worker – idealne do testów i dev mode. Działa bez mockowania modułów.

```bash
npm install -D msw
npx msw init public/ --save
```

```typescript
// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'Kamil', email: 'kamil@test.com' },
      { id: 2, name: 'Ola', email: 'ola@test.com' },
    ])
  }),
  http.post('/api/users', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json({ id: 3, ...body }, { status: 201 })
  }),
  http.get('/api/users/:id', ({ params }) => {
    if (params.id === '999') {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    }
    return HttpResponse.json({ id: params.id, name: 'Test User' })
  }),
]
```

```typescript
// src/mocks/server.ts (Node – dla testów)
import { setupServer } from 'msw/node'
import { handlers } from './handlers'
export const server = setupServer(...handlers)
```

```typescript
// vitest.setup.ts
import { server } from '@/mocks/server'
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())  // reset po każdym teście!
afterAll(() => server.close())
```

```typescript
// Test – nadpisanie handlera dla konkretnego scenariusza
import { server } from '@/mocks/server'
import { http, HttpResponse } from 'msw'

test('wyświetla błąd przy błędzie serwera', async () => {
  server.use(
    http.get('/api/users', () =>
      HttpResponse.json({ message: 'Internal Error' }, { status: 500 })
    )
  )
  const wrapper = mount(UserList)
  await flushPromises()
  expect(wrapper.text()).toContain('Błąd ładowania')
})
```

---

## Testowanie Composables

```typescript
// composables/__tests__/useCounter.spec.ts
import { describe, it, expect } from 'vitest'
import { useCounter } from '../useCounter'

describe('useCounter', () => {
  it('inicjalizuje z wartością 0', () => {
    const { count } = useCounter()
    expect(count.value).toBe(0)
  })

  it('inkrementuje', () => {
    const { count, increment } = useCounter()
    increment()
    expect(count.value).toBe(1)
  })
})
```

**Composable z lifecycle hooks – potrzebuje wrappera komponentu:**

```typescript
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { useWindowSize } from '../useWindowSize'

// Helper do testowania composable z lifecycle
function withSetup<T>(composable: () => T): T {
  let result: T
  const TestComponent = defineComponent({
    setup() { result = composable() },
    render: () => null,
  })
  mount(TestComponent)
  return result!
}

test('useWindowSize zwraca wymiary okna', () => {
  const { width, height } = withSetup(() => useWindowSize())
  expect(width.value).toBe(window.innerWidth)
})
```

---

## Testowanie Pinia Store

```typescript
// stores/__tests__/auth.spec.ts
import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, it, expect, vi } from 'vitest'
import { useAuthStore } from '@/stores/auth'

describe('useAuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('inicjalizuje z brakiem użytkownika', () => {
    const store = useAuthStore()
    expect(store.user).toBeNull()
    expect(store.isLoggedIn).toBe(false)
  })

  it('ustawia użytkownika po zalogowaniu', async () => {
    const store = useAuthStore()
    // Jeśli akcja robi fetch – mock przez vi.spyOn lub MSW
    vi.spyOn(store, '$patch')
    await store.setUser({ id: 1, name: 'Kamil', email: 'kamil@test.com' })
    expect(store.isLoggedIn).toBe(true)
    expect(store.user?.name).toBe('Kamil')
  })
})
```

---

## Testowanie edge cases

```typescript
// Testowanie error boundary (onErrorCaptured)
it('wyświetla fallback przy błędzie dziecka', async () => {
  const ErrorComponent = defineComponent({
    setup() { throw new Error('Test error') },
    render: () => null,
  })
  const wrapper = mount(ErrorBoundary, {
    slots: { default: ErrorComponent }
  })
  expect(wrapper.text()).toContain('Coś poszło nie tak')
})

// Testowanie async komponentów
it('wyświetla spinner podczas ładowania', async () => {
  const wrapper = mount(AsyncPage)
  expect(wrapper.findComponent(LoadingSpinner).exists()).toBe(true)
  await flushPromises()
  expect(wrapper.findComponent(LoadingSpinner).exists()).toBe(false)
})
```

---

# Vue Devtools i debugowanie

## Vue Devtools – instalacja

```bash
# Rozszerzenie przeglądarki: "Vue.js devtools" (Chrome/Firefox Web Store)

# Vite plugin (in-browser devtools – zalecane dla Vite)
npm install -D vite-plugin-vue-devtools
```

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [vue(), VueDevTools()],
})
```

## Co oferuje Vue Devtools

```
Panel Components:
├── Kliknij na element w przeglądarce → podświetla komponent w drzewie
├── State – live edit wartości ref/reactive bezpośrednio
├── Props – podgląd i edycja propsów
└── Render count – ile razy komponent się przerenderował

Panel Pinia:
├── Live state wszystkich store'ów
├── Timeline mutacji – historia zmian
├── Time travel – cofanie do poprzedniego stanu
└── Import/export stanu

Panel Router:
├── Aktywna trasa i jej parametry
├── Historia nawigacji
└── Route meta

Timeline:
├── Performance – czas renderowania komponentów
├── Events – emitowane zdarzenia
└── Mutations – mutacje Pinia
```

---

## Debugowanie reaktywności

```javascript
// watchEffect do "śledzenia" co się zmienia
watchEffect(() => {
  console.log('[debug] user:', user.value)
  console.log('[debug] count:', count.value)
  // automatycznie listuje wszystkie zależności przy init
})

// Trigger manualne re-renderu (dev only)
import { triggerRef } from 'vue'
triggerRef(someShallowRef)

// Sprawdź czy coś jest reaktywne
import { isRef, isReactive, isProxy } from 'vue'
console.log(isRef(count))       // true
console.log(isReactive(state))  // true
```

---

## Memory leaks – jak wykrywać i unikać

```typescript
// ❌ Klasyczny wyciek – event listener bez cleanup
onMounted(() => {
  window.addEventListener('resize', handleResize)
  // Brak onUnmounted → handler żyje po odmontowaniu komponentu!
})

// ✅ Zawsze cleanup
onMounted(() => window.addEventListener('resize', handleResize))
onUnmounted(() => window.removeEventListener('resize', handleResize))

// ✅ Lepiej: useEventListener composable (samo zarządza cleanup)
useEventListener(window, 'resize', handleResize)

// ❌ Timer bez cleanup
const timer = setInterval(updateData, 5000)
// ✅
onUnmounted(() => clearInterval(timer))

// ❌ keep-alive z za dużym max lub bez include
<keep-alive>  <!-- ← cache'uje WSZYSTKO – memory leak -->
// ✅
<keep-alive :include="['TabA']" :max="5">

// Wykrywanie w Chrome DevTools:
// Memory tab → Take Heap Snapshot → wykonaj akcję → Take Snapshot → Compare
```

---

## SSR Hydration Mismatch (Vue 3.4 – ulepszone błędy)

```
Hydration mismatch = serwer wygenerował inne HTML niż klient spodziewa się zobaczyć

Najczęstsze przyczyny:
- Date.now() lub Math.random() w renderze (inne wartości SS vs klient)
- Dane zależne od użytkownika renderowane bez sprawdzenia isHydrating
- Różne locale/timezone serwer vs klient
- Komponenty browser-only (window, document) renderowane na serwerze
```

```vue
<!-- Nuxt: <ClientOnly> dla komponentów browser-only -->
<ClientOnly>
  <GoogleAnalytics />
  <template #fallback><div class="h-4" /></template>
</ClientOnly>

<!-- Vue 3.4: lepsze komunikaty błędów hydration w konsoli -->
<!-- Pokazuje dokładnie który węzeł DOM nie pasuje -->
```

---

# Dostępność (a11y)

## Kluczowe zasady WCAG dla Vue

```vue
<!-- ✅ Semantyczny HTML zamiast div'ów -->
<button @click="submit">Wyślij</button>          <!-- ✅ -->
<div @click="submit" role="button" tabindex="0">Wyślij</div>  <!-- ⚠️ konieczne dodatkowe atrybuty -->
<div @click="submit">Wyślij</div>                <!-- ❌ nieczytelne dla screen readerów -->

<!-- ✅ Labele dla inputów -->
<label for="email">Adres email</label>
<input id="email" v-model="email" type="email" />

<!-- lub aria-label gdy label nie jest widoczny -->
<input v-model="search" type="search" aria-label="Szukaj produktów" />

<!-- ✅ ARIA dla dynamicznych treści -->
<div role="alert" aria-live="assertive" v-if="errorMessage">
  {{ errorMessage }}
</div>

<!-- ✅ Alt tekst dla obrazków -->
<img :src="user.avatar" :alt="`Avatar użytkownika ${user.name}`" />
<img src="decoration.png" alt="" />  <!-- Dekoracyjne: pusty alt -->
```

---

## Focus Management przy modalu

```vue
<script setup>
import { ref, nextTick } from 'vue'

const isOpen = ref(false)
const triggerButton = ref<HTMLButtonElement | null>(null)
const firstFocusable = ref<HTMLElement | null>(null)

async function openDialog() {
  isOpen.value = true
  await nextTick()  // Poczekaj na DOM
  firstFocusable.value?.focus()
}

function closeDialog() {
  isOpen.value = false
  triggerButton.value?.focus()  // Wróć focus do triggera
}
</script>

<template>
  <button ref="triggerButton" @click="openDialog">Otwórz dialog</button>

  <Teleport to="body">
    <div
      v-if="isOpen"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      @keydown.esc="closeDialog"
    >
      <h2 id="dialog-title">Tytuł dialogu</h2>
      <button ref="firstFocusable" @click="closeDialog">Zamknij</button>
      <!-- zawartość -->
    </div>
  </Teleport>
</template>
```

---

## Keyboard Navigation – listy i menu

```vue
<template>
  <!-- Nawigacja strzałkami w liście/combo -->
  <ul role="listbox" :aria-activedescendant="`option-${selectedIndex}`">
    <li
      v-for="(item, index) in items"
      :id="`option-${index}`"
      :key="item.id"
      role="option"
      :aria-selected="selectedIndex === index"
      :tabindex="selectedIndex === index ? 0 : -1"
      @click="selectedIndex = index"
      @keydown.arrow-down.prevent="selectedIndex = Math.min(index + 1, items.length - 1)"
      @keydown.arrow-up.prevent="selectedIndex = Math.max(index - 1, 0)"
      @keydown.enter="selectItem(item)"
      @keydown.home.prevent="selectedIndex = 0"
      @keydown.end.prevent="selectedIndex = items.length - 1"
    >
      {{ item.name }}
    </li>
  </ul>
</template>
```

---

## Skip Link (przejdź do treści)

```vue
<!-- App.vue – pierwszy element na stronie dla keyboardowych użytkowników -->
<template>
  <a
    href="#main-content"
    class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:p-4 focus:rounded"
  >
    Przejdź do głównej treści
  </a>

  <NavBar />
  <main id="main-content" tabindex="-1">
    <RouterView />
  </main>
</template>
```

---

## ARIA Live Regions – ogłoszenia dla screen readerów

```vue
<script setup>
const { data, loading, error } = useFetch('/api/results')
</script>

<template>
  <!-- Screen reader ogłosi zmiany stanu ładowania (niewidoczne wizualnie) -->
  <div aria-live="polite" aria-atomic="true" class="sr-only">
    <span v-if="loading">Ładowanie wyników, proszę czekać...</span>
    <span v-else-if="error">Błąd ładowania wyników</span>
    <span v-else>Znaleziono {{ data?.length }} wyników</span>
  </div>

  <!-- Wizualna wersja -->
  <div v-if="loading">Spinner...</div>
  <ul v-else>
    <li v-for="item in data" :key="item.id">{{ item.name }}</li>
  </ul>
</template>
```

**Wartości `aria-live`:**
| Wartość | Kiedy? |
|---------|--------|
| `polite` | Ogłosi po zakończeniu bieżącej czynności użytkownika |
| `assertive` | Ogłosi natychmiast, przerywa mówienie (alerty błędów) |
| `off` | Wyłączone (domyślnie) |

---

# Integracje i ekosystem

## GitHub Actions – CI/CD dla Vue

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test-and-build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npm run type-check

      - name: Unit tests
        run: npm run test:unit -- --run

      - name: Build
        run: npm run build

  deploy:
    needs: test-and-build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v4

      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Sentry – monitorowanie błędów

```bash
npm install @sentry/vue
```

```javascript
// main.js
import * as Sentry from '@sentry/vue'

const app = createApp(App)

Sentry.init({
  app,
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration({ router }),
    Sentry.replayIntegration({ maskAllText: false }),
  ],
  tracesSampleRate: 0.1,         // 10% requestów do tracingu
  replaysSessionSampleRate: 0.1, // 10% sesji z replay
  environment: import.meta.env.MODE,
  release: import.meta.env.VITE_APP_VERSION,
})

app.use(router).mount('#app')
```

```javascript
// Manualne logowanie z kontekstem
try {
  await processPayment(order)
} catch (error) {
  Sentry.captureException(error, {
    tags: { feature: 'checkout', step: 'payment' },
    extra: { orderId: order.id, userId: auth.user?.id },
    level: 'error',
  })
}
```

---

## GraphQL z Apollo Client

```bash
npm install @apollo/client graphql @vue/apollo-composable
```

```javascript
// plugins/apollo.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: import.meta.env.VITE_GRAPHQL_URL,
  }),
  cache: new InMemoryCache(),
})

// main.ts
app.provide(DefaultApolloClient, apolloClient)
```

```vue
<script setup>
import { useQuery, useMutation } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'

// Query
const GET_USERS = gql`
  query GetUsers {
    users { id name email }
  }
`
const { result, loading, error } = useQuery(GET_USERS)

// Mutation
const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) { id name }
  }
`
const { mutate: createUser, loading: creating } = useMutation(CREATE_USER)

async function addUser() {
  await createUser({ name: 'Kamil', email: 'kamil@test.com' })
}
</script>

<template>
  <div v-if="loading">Ładowanie...</div>
  <ul v-else>
    <li v-for="user in result?.users" :key="user.id">{{ user.name }}</li>
  </ul>
  <button :disabled="creating" @click="addUser">Dodaj użytkownika</button>
</template>
```

---

# Monorepo i Mikrofrontendy

## pnpm Workspaces – Monorepo

```
monorepo/
  pnpm-workspace.yaml
  package.json
  packages/
    ui/               # Współdzielona biblioteka komponentów
      package.json    # name: "@my-org/ui"
      src/
        components/
          BaseButton.vue
    utils/            # Wspólne narzędzia
      package.json    # name: "@my-org/utils"
    app-main/         # Vue SPA
      package.json
    app-admin/        # Vue Admin Panel
      package.json
```

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
```

```json
// packages/app-main/package.json – używa lokalnych pakietów
{
  "dependencies": {
    "@my-org/ui": "workspace:*",
    "@my-org/utils": "workspace:*"
  }
}
```

```bash
# Instalacja wszystkich zależności
pnpm install

# Dev w konkretnym pakiecie
pnpm --filter app-main dev

# Build wszystkich pakietów
pnpm -r build

# Test we wszystkich pakietach
pnpm -r test
```

---

## Turborepo – optymalizacja CI/CD w monorepo

```bash
npx create-turbo@latest
```

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],      // buduj po zależnościach
      "outputs": ["dist/**"]         // cache output
    },
    "test": {
      "dependsOn": ["^build"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

---

## Module Federation – Mikrofrontendy z Vite

```bash
npm install @originjs/vite-plugin-federation
```

```javascript
// vite.config.js – Remote App (udostępnia komponenty)
import federation from '@originjs/vite-plugin-federation'

export default {
  plugins: [
    federation({
      name: 'remote-app',
      filename: 'remoteEntry.js',
      exposes: {
        './UserWidget': './src/components/UserWidget.vue',
        './AuthStore': './src/stores/auth.ts',
      },
      shared: ['vue', 'pinia'],
    }),
  ],
  build: { target: 'esnext' },
}
```

```javascript
// vite.config.js – Host App (konsumuje komponenty)
import federation from '@originjs/vite-plugin-federation'

export default {
  plugins: [
    federation({
      name: 'host-app',
      remotes: {
        'remote-app': 'http://localhost:5001/assets/remoteEntry.js',
      },
      shared: ['vue', 'pinia'],
    }),
  ],
}
```

```vue
<!-- Host App – używanie zdalnego komponentu -->
<script setup>
import { defineAsyncComponent } from 'vue'

const UserWidget = defineAsyncComponent(
  () => import('remote-app/UserWidget')
)
</script>

<template>
  <Suspense>
    <UserWidget :userId="123" />
    <template #fallback>Ładowanie widgetu...</template>
  </Suspense>
</template>
```

---

# Bezpieczeństwo w Vue

## XSS i v-html

```vue
<!-- ❌ KRYTYCZNE – XSS – nigdy nie rób tego! -->
<div v-html="userInput" />
<div v-html="route.query.content" />

<!-- ✅ Sanityzacja z DOMPurify przed v-html -->
<script setup>
import DOMPurify from 'dompurify'
const sanitized = computed(() => DOMPurify.sanitize(userContent.value))
</script>

<template>
  <div v-html="sanitized" />
</template>
```

```bash
npm install dompurify
npm install -D @types/dompurify
```

**Kiedy `v-html` jest bezpieczne:**
- ✅ Treść z Twojego własnego CMS (już sanityzowana po stronie serwera)
- ✅ Statyczny HTML zakodowany przez Ciebie
- ❌ Nigdy: URL params, localStorage, user input, zewnętrzne API

---

## Bezpieczne przechowywanie tokenów JWT

```
⚠️ DYLEMAT: localStorage vs httpOnly cookie

localStorage:
  ✅ Łatwe w użyciu
  ❌ PODATNE NA XSS – każdy skrypt może je odczytać
  ❌ Nie używaj dla wrażliwych tokenów

httpOnly Cookie (ZALECANE dla JWT):
  ✅ Niedostępne z JavaScript – odporne na XSS
  ✅ Automatycznie wysyłane z każdym requestem
  ❌ Wymaga konfiguracji serwera: Set-Cookie: httpOnly; Secure; SameSite=Strict
  ❌ Wymaga CSRF protection (SameSite=Strict chroni w większości przypadków)
```

```javascript
// ❌ Niezalecane – podatne na XSS
localStorage.setItem('accessToken', token)

// ✅ Zalecane – backend ustawia httpOnly cookie
// Backend: Set-Cookie: token=xyz; HttpOnly; Secure; SameSite=Strict; Path=/

// W Vue – sprawdzaj auth przez endpoint, nie przez odczyt tokenu
const auth = useAuthStore()
await auth.checkSession()  // GET /api/auth/me – cookie wysyłane automatycznie
```

---

## Route Guards + Autoryzacja (RBAC)

```javascript
// router/index.js – guard globalny
router.beforeEach(async (to) => {
  const auth = useAuthStore()

  // Trasy publiczne – przepuść
  if (!to.meta.requiresAuth) return true

  // Niezalogowany – przekieruj do logowania
  if (!auth.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  // Brak wymaganej roli – 403
  if (to.meta.requiredRole && !auth.hasRole(to.meta.requiredRole)) {
    return { name: 'forbidden' }
  }

  return true
})
```

```javascript
// Konfiguracja tras z metadanymi auth
const routes = [
  {
    path: '/admin',
    component: AdminPanel,
    meta: { requiresAuth: true, requiredRole: 'admin' },
  },
  {
    path: '/profile',
    component: UserProfile,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    component: LoginPage,
    meta: { requiresAuth: false, redirectIfAuth: true },  // zalogowani → home
  },
]
```

```javascript
// Po zalogowaniu – przekieruj do zamierzonej strony
async function handleLogin(credentials) {
  await authStore.login(credentials)
  const redirect = route.query.redirect as string
  router.push(redirect ?? { name: 'home' })
}
```

---

## Content Security Policy (CSP)

```html
<!-- index.html – ogranicza źródła skryptów, styli, itp. -->
<meta
  http-equiv="Content-Security-Policy"
  content="
    default-src 'self';
    script-src 'self';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    connect-src 'self' https://api.mojadomena.pl;
    font-src 'self' https://fonts.gstatic.com;
  "
/>
```

---

## Bezpieczeństwo – checklist

```
☐ Brak v-html z niezaufanym inputem (DOMPurify gdy konieczne)
☐ JWT w httpOnly cookie (nie localStorage dla dostępu z JS)
☐ Route guards na wszystkich chronionych trasach
☐ HTTPS w każdym środowisku produkcyjnym
☐ CSP headers skonfigurowane
☐ Brak sekretnych kluczy w zmiennych VITE_ (ekspozycja w bundlu)
☐ Input sanitization po stronie serwera (nigdy ufaj klientowi)
☐ CSRF protection dla mutujących requestów
☐ Rate limiting po stronie API (zapobiega brute force)
☐ Walidacja parametrów trasy (route params injection)
```

---

# Rozmowa rekrutacyjna – Pytania i odpowiedzi

## 🟢 Podstawowe

### P: Co to jest Composition API i czym różni się od Options API?

**O:** Composition API to sposób organizacji kodu Vue 3 przez importowane funkcje (`ref`, `computed`, `watch`) zamiast specjalnych kluczy obiektu. Kluczowe różnice:

| | Options API | Composition API |
|--|--|--|
| Organizacja kodu | wg opcji (data, methods...) | wg funkcjonalności |
| Reuse logiki | mixiny (problemy z kolizjami) | composables (czyste) |
| TypeScript | słabe wsparcie | doskonałe wsparcie |
| Czytelność w dużych komp. | gorsza | lepsza |

```vue
<!-- Options API -->
<script>
export default {
  data() { return { count: 0 } },
  computed: { double() { return this.count * 2 } },
  methods: { increment() { this.count++ } },
}
</script>

<!-- Composition API -->
<script setup>
const count = ref(0)
const double = computed(() => count.value * 2)
const increment = () => count.value++
</script>
```

---

### P: Czym różni się `ref` od `reactive`?

**O:** `ref` opakowuje dowolną wartość (primitive lub obiekt) w `.value`. `reactive` tworzy reaktywny Proxy dla **obiektów** – bez `.value`.

```javascript
const count = ref(0)       // count.value = 0
count.value++

const state = reactive({ count: 0 })
state.count++              // bez .value

// ❌ reactive nie działa dla prymitywów
// const n = reactive(0)  → ostrzeżenie
```

**Kiedy używać:**
- `ref`: prymitywy, nullable, `template ref`, wartości wymieniane w całości
- `reactive`: złożone obiekty gdzie nie chcesz `.value`, formularz state

---

### P: Czym różni się `computed` od `watch`?

**O:**
- `computed`: **pochodna wartość** – przelicza gdy zależności się zmienią, **cachuje** wynik, zwraca wartość
- `watch`: **efekt uboczny** – reaguje na zmianę i wykonuje akcję (fetch API, localStorage, nawigacja)

```javascript
// computed – pochodna, cachowana
const fullName = computed(() => `${first.value} ${last.value}`)

// watch – efekt uboczny (nie zwraca wartości)
watch(userId, async (newId) => {
  userData.value = await fetchUser(newId)
})
```

**Zasada:** jeśli potrzebujesz wartości → `computed`; jeśli potrzebujesz akcji → `watch`.

---

### P: Jak działa reaktywność w Vue 3?

**O:** Vue 3 używa **JavaScript Proxy** do przechwytywania odczytu i zapisu właściwości.

```
reactive(obj) → tworzy Proxy
  ↓ get trap → track() – rejestruje bieżący "effect" jako subscriber
  ↓ set trap → trigger() – powiadamia wszystkich subscribers o zmianie
```

Gdy `computed` lub `watchEffect` odczytuje wartość, jest ona "śledzona". Gdy wartość się zmieni, Vue planuje ponowne wykonanie wszystkich zależnych efektów (batched, asynchronicznie dla wydajności).

---

### P: Co to jest `v-model` i jak działa na własnych komponentach?

**O:** `v-model` to syntactic sugar. Na elemencie HTML: `:value` + `@input`. Na komponencie: `:modelValue` + `@update:modelValue`.

```vue
<!-- <MyInput v-model="text" /> to to samo co: -->
<!-- <MyInput :modelValue="text" @update:modelValue="text = $event" /> -->

<!-- Implementacja z defineModel (Vue 3.4+) – zalecane: -->
<script setup>
const model = defineModel<string>()
</script>
<template>
  <input v-model="model" />
</template>
```

---

### P: Co robi `key` w `v-for` i dlaczego jest ważny?

**O:** Vue używa Virtual DOM diffing. `:key` pomaga Vue zidentyfikować który element listy się zmienił, co pozwala na minimalne aktualizacje DOM. Bez `key` Vue reużywa elementów DOM "in-place" – może to prowadzić do błędów stanu przy przesortowanych/filtrowanych listach.

```vue
<!-- ❌ Bez key – błędy stanu (np. formularze, komponenty ze stanem) -->
<li v-for="item in items">...</li>

<!-- ✅ Z unikalnym key -->
<li v-for="item in items" :key="item.id">...</li>

<!-- ❌ Używanie index jako key przy reorder/filter -->
<li v-for="(item, i) in items" :key="i">...</li>
```

---

## 🟡 Średniozaawansowane

### P: Jak chronić trasy w Vue Router?

**O:** Navigation guards – `router.beforeEach` globalnie lub `beforeEnter` per-route:

```javascript
router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})
```

Po zalogowaniu: `router.push(route.query.redirect ?? '/')`.

---

### P: Czym są composables i kiedy ich używać?

**O:** Composables to funkcje (prefiks `use`) enkapsulujące reaktywną logikę wielokrotnego użytku. Zastępują mixiny Vue 2.

```javascript
// useWindowSize.ts
export function useWindowSize() {
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)
  useEventListener(window, 'resize', () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  })
  return { width, height }
}

// Reuse w 10 komponentach – zero duplikacji
const { width } = useWindowSize()
```

Używaj gdy: ta sama logika w ≥2 komponentach, lub logika jest zbyt złożona jak na komponent.

---

### P: Jaka jest różnica między `provide/inject` a Pinia?

**O:**
- `provide/inject`: lokalne zależności w drzewie komponentów, konfiguracje, pluginy (np. theme, locale, i18n)
- `Pinia`: globalny stan gdy niezwiązane komponenty potrzebują tych samych danych z persystencją i devtools

---

### P: `keep-alive` – do czego służy i jakie są pułapki?

**O:** Zachowuje stan odmontowanych komponentów w pamięci. Idealne dla zakładek z formularzami.

```vue
<keep-alive :include="['FormA', 'FormB']" :max="5">
  <component :is="activeTab" />
</keep-alive>
```

Pułapki: `onMounted` nie odpali ponownie (użyj `onActivated`), za duże `:max` = wyciek pamięci, może trzymać stale dane.

---

### P: Co to jest SSR i kiedy używać Nuxt.js?

**O:** SSR (Server-Side Rendering) – HTML generowany na serwerze, szybszy First Contentful Paint i lepsze SEO.

- **Nuxt.js**: SEO-krytyczne aplikacje (blogi, e-commerce, landing pages), potrzebujesz SSG lub ISR
- **Vue SPA**: dashboardy, aplikacje po logowaniu, brak potrzeby SEO

---

### P: Czym jest `defineExpose`?

**O:** `<script setup>` domyślnie nie ujawnia niczego rodzicowi przez `ref`. `defineExpose` pozwala wybrać co jest dostępne:

```vue
<script setup>
const count = ref(0)
defineExpose({ count, reset: () => count.value = 0 })
// childRef.value.count  → dostępne
// childRef.value.reset() → dostępne
</script>
```

---

### P: Czym jest `Teleport` i kiedy go używać?

**O:** `<Teleport to="body">` renderuje zawartość DOM poza hierarchią komponentu – ale logika/reaktywność pozostaje tam gdzie jest. Używaj dla modali, tooltipów, notyfikacji – gdzie `z-index` lub `overflow: hidden` przodka byłby problemem.

---

## 🔴 Zaawansowane

### P: Jak zoptymalizować wydajność dużej listy (1000+ elementów)?

**O:**
1. **Virtual scrolling** – renderuj tylko widoczne elementy (`@tanstack/vue-virtual`)
2. `v-memo` – pomija re-render gdy lista zależności się nie zmieniła
3. `shallowRef`/`shallowReactive` – płytka reaktywność dla dużych obiektów
4. Paginacja po stronie serwera
5. `keep-alive` dla zakładek

```vue
<!-- v-memo – re-render TYLKO gdy item.id lub item.selected się zmieni -->
<div v-for="item in bigList" :key="item.id" v-memo="[item.id, item.selected]">
  {{ item.name }}
</div>
```

---

### P: Jak działają `watchEffect` vs `watch`?

**O:**
- `watchEffect`: uruchamia się **natychmiast**, **automatycznie** śledzi zależności przez odczyt w ciele funkcji
- `watch`: musisz **jawnie** podać źródło, nie uruchamia się przy init (chyba że `{ immediate: true }`), dostęp do `newValue` i `oldValue`

```javascript
// watchEffect – automatyczne śledzenie, od razu
watchEffect(() => {
  console.log(count.value, name.value)  // obserwuje obu automatycznie
})

// watch – explicit, pełna kontrola, oldValue
watch([count, name], ([newCount, newName], [oldCount, oldName]) => {
  console.log('Zmiana:', oldCount, '→', newCount)
})
```

---

### P: Jakie są najczęstsze przyczyny memory leaks w Vue?

**O:**
1. Event listeners bez cleanup (`window.addEventListener` w `onMounted` bez `removeEventListener` w `onUnmounted`)
2. Timery bez cleanup (`setInterval`/`setTimeout`)
3. `keep-alive` bez `include` i `max`
4. Store accumulating data (fetch przy każdej nawigacji bez czyszczenia)
5. WebSocket / EventSource bez zamknięcia

**Rozwiązanie:** zawsze cleanup w `onUnmounted`, używaj composables które zarządzają cleanup automatycznie.

---

### P: Jak bezpiecznie renderować HTML w Vue?

**O:** Nigdy bezpośrednio przez `v-html` z user input. Zawsze sanityzuj przez DOMPurify:

```javascript
import DOMPurify from 'dompurify'
const safe = computed(() => DOMPurify.sanitize(userContent.value, {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
  ALLOWED_ATTR: ['href'],
}))
// <div v-html="safe" />
```

---

### P: Co to jest hydration mismatch w SSR?

**O:** Hydration to "ożywianie" statycznego SSR HTML przez Vue na kliencie. Mismatch = serwer i klient wygenerowały różne HTML. Przyczyny:
- `Date.now()`, `Math.random()` w renderze
- Różne dane serwer vs klient (np. locale, user-specific data)
- Komponenty browser-only (`window`, `document`) bez `ClientOnly`

Vue 3.4 ulepszyło komunikaty błędów – wskazują dokładnie który node jest problemem.

---

### P: defineModel vs stary sposób v-model – na czym polega różnica?

**O:** Stary sposób wymagał ręcznego `defineProps(['modelValue'])` + `defineEmits(['update:modelValue'])` + używania `:value` i `@input/$emit` oddzielnie. `defineModel` (Vue 3.4 stable) kapsułkuje to w jeden reaktywny `ref`, który można używać z `v-model` bezpośrednio.

---

### P: Czym jest Atomic Design?

**O:** Metodologia organizacji komponentów na 5 poziomach: atoms (Button, Input) → molecules (SearchField) → organisms (NavBar, ProductCard) → templates (PageLayout) → pages (HomePage). Ułatwia utrzymanie i reuse.

---

## 🎨 Pytania o pracę zespołową

### P: Jak zapewniasz jakość kodu w projekcie Vue?

**O:**
1. **Lint**: ESLint + `@vue/eslint-config-typescript`
2. **Testy**: Vitest (unit/integration) + Cypress/Playwright (E2E)
3. **TypeScript**: strict mode w tsconfig
4. **Code review**: PR templates, branch protection
5. **CI/CD**: GitHub Actions – lint + test + build przy każdym PR
6. **Konwencje**: feature-based struktura, naming conventions, composables dla reuse

---

### P: Jak podchodzisz do refactoringu starego kodu Vue 2 do Vue 3?

**O:**
1. Zainstaluj `@vue/compat` (migration build) – Vue 3 z flagami kompatybilności
2. Uruchom, napraw ostrzeżenia jedno po drugim
3. Migruj `data/methods/computed` → `<script setup>` + Composition API
4. Zamień Vuex na Pinia (stopniowo, store po store)
5. Zaktualizuj Vue Router do v4
6. Usuń `@vue/compat` gdy gotowe

---

# Ćwiczenia praktyczne

## 🟢 Podstawowe

### 1. Reaktywny licznik z limitem
Zaimplementuj komponent licznika z:
- Przyciskami + i –
- Propsami `min` (default: 0) i `max` (default: 10)
- Disabled na przyciskach gdy granica osiągnięta
- Emitem `out-of-range` gdy próba przekroczenia

```vue
<!-- Starter -->
<script setup>
const props = defineProps({ min: { type: Number, default: 0 }, max: { type: Number, default: 10 } })
defineEmits(['out-of-range'])
const count = ref(props.min)
// Twoja implementacja...
</script>
```

### 2. useFetch composable
Zaimplementuj `useFetch(url)` z:
- Zwracaniem `{ data, loading, error }`
- Anulowaniem requestu przy odmontowaniu (`AbortController`)
- Automatycznym re-fetchem gdy URL się zmienia

### 3. Formularz z walidacją
Formularz rejestracji (name, email, password, confirmPassword):
- Walidacja real-time (`watch`)
- Disabled submit gdy błędy
- Komunikaty przy polach
- Reset po udanym submit

---

## 🟡 Średniozaawansowane

### 4. Infinite Scroll z useIntersectionObserver
Lista produktów:
- Fetch kolejnych stron gdy sentinel element staje się widoczny
- Loading spinner na dole
- "Brak więcej wyników" gdy wszystkie załadowane
- Error handling z retry

### 5. Multi-step form z Pinia
Formularz zamówienia w 3 krokach (trasy: `/order/step-1`, `/step-2`, `/step-3`):
- Pinia store jako "koszyk" między krokami
- Walidacja przed przejściem dalej
- Możliwość cofnięcia bez utraty danych
- Persist store w localStorage

### 6. DataTable
Tabela użytkowników:
- Sortowanie po kolumnach (toggle asc/desc)
- Filtrowanie (debounced input)
- Paginacja (poprzednia/następna/numery)
- Checkbox do zaznaczenia wierszy
- "Zaznacz wszystko"

---

## 🔴 Zaawansowane

### 7. Dostępny Modal (WCAG AA)
Modal spełniający standardy:
- Focus trap (Tab/Shift+Tab tylko wewnątrz)
- Escape do zamknięcia
- Blokada scrollowania body gdy otwarty
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- Zwrócenie focusu po zamknięciu
- Teleport do body

### 8. Autoryzacja – pełny flow
- Login/Register z walidacją
- Pinia `authStore` (user, token, isLoggedIn)
- Navigation guards (public/private routes, role-based)
- Automatyczne wylogowanie po 401
- Redirect po zalogowaniu do zamierzonej strony

### 9. Komponent generyczny `<DataList<T>>`
- Przyjmuje `items: T[]` i sloty: `#item="{ item }"`, `#empty`, `#loading`
- Wewnętrzny stan: paginacja + sortowanie
- TypeScript generic `<T extends { id: number }>`

---

# Ściągawki – Szybka powtórka

## 🃏 Reaktywność – kiedy co używać

```
Potrzebuję reaktywnej wartości:
  ├── Prymityw (string, number, boolean)?    → ref()
  ├── Obiekt/Tablica?                         → reactive() lub ref()
  ├── Wartość obliczona z innych?             → computed()
  └── Wartość z lazy init / async?            → ref(null) + onMounted

Chcę reagować na zmianę:
  ├── Efekt uboczny (fetch, localStorage)?    → watch()
  ├── Automatyczne śledzenie zależności?      → watchEffect()
  ├── Jednorazowo przy init?                  → watch(x, fn, { immediate: true })
  └── Po aktualizacji DOM?                    → watch(x, fn, { flush: 'post' })

Store vs composable:
  ├── Stan współdzielony przez WIELE komponentów?  → Pinia store
  └── Logika reusable w komponencie?               → composable (useXxx)
```

---

## 🃏 Komunikacja komponentów

```
Rodzic → Dziecko:           Props (:propName="value")
Dziecko → Rodzic:           Emit ($emit('event', data))
Dwukierunkowe:              v-model / defineModel
Dziadek → Wnuk (N poziomów): provide / inject
Niezwiązane komponenty:     Pinia (zalecane) | mitt (event bus)
Imperatywne API:            defineExpose + template ref
```

---

## 🃏 Lifecycle hooks – kiedy co

```
onBeforeMount    ← ostatni moment przed DOM (rzadko potrzebny)
onMounted        ← ✅ fetch danych, inicjalizacja bibliotek, DOM ready
onBeforeUpdate   ← przed aktualizacją DOM
onUpdated        ← ⚠️ po aktualizacji DOM (unikaj tutaj zmian stanu → pętla!)
onBeforeUnmount  ← ✅ cleanup przed usunięciem
onUnmounted      ← ✅ clearInterval, removeEventListener, disconnect

Nuxt/keep-alive:
onActivated      ← komponent "wznowiony" z keep-alive cache
onDeactivated    ← komponent "uśpiony" w keep-alive cache

Błędy:
onErrorCaptured  ← error boundary w komponencie
```

---

## 🃏 Vue Router – szybko

```javascript
// Nawigacja
router.push('/path')
router.push({ name: 'user', params: { id: 1 } })
router.push({ path: '/search', query: { q: 'vue' } })
router.replace('/path')   // bez historii
router.back() / router.forward() / router.go(-1)

// Odczyt bieżącej trasy
route.params.id           // /user/:id
route.query.page          // ?page=2
route.hash                // #section
route.name                // nazwa trasy
route.meta.requiresAuth   // metadane

// Guards
router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !isLoggedIn) return '/login'
  // return true / undefined = przepuść
  // return false = anuluj
  // return '/path' lub { name: '...' } = redirect
})
```

---

## 🃏 Pinia – szybko

```javascript
// Definicja store (Composition API)
export const useStore = defineStore('id', () => {
  const state = ref(0)              // STATE
  const double = computed(() => state.value * 2)  // GETTER
  function action() { state.value++ }              // ACTION
  return { state, double, action }
})

// Użycie w komponencie
const store = useStore()
const { state, double } = storeToRefs(store)  // reaktywne props
const { action } = store                       // akcje bezpośrednio

// Bezpośrednia mutacja (gdy dozwolona)
store.$patch({ state: 5 })
store.$patch((s) => { s.state++ })

// Reset do stanu początkowego
store.$reset()  // tylko Options API store
```

---

## 🃏 v-model na komponencie

```vue
<!-- Vue 3.4+ – zalecane (defineModel) -->
<script setup lang="ts">
const model = defineModel<string>()          // ← automatyczny prop + emit
const count = defineModel<number>('count', { default: 0 })  // named v-model
</script>
<template>
  <input v-model="model" />
</template>

<!-- Użycie: -->
<MyInput v-model="text" />
<MyCounter v-model:count="num" />

<!-- STARY sposób (pre-3.4) -->
<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>
<template>
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
</template>
```

---

## 🃏 TypeScript w Vue – szybko

```typescript
// Props z withDefaults
interface Props { name: string; age?: number; role: 'admin' | 'user' }
const props = withDefaults(defineProps<Props>(), { age: 0, role: 'user' })

// Emits (Vue 3.3+ składnia)
const emit = defineEmits<{
  change: [value: string]
  'update:modelValue': [value: string]
}>()

// Ref
const count = ref<number>(0)
const user = ref<User | null>(null)
const inputEl = ref<HTMLInputElement | null>(null)

// Computed
const label = computed<string>(() => props.name.toUpperCase())

// defineModel
const model = defineModel<string>()
const count2 = defineModel<number>('count', { required: true })
```

---

## 🃏 Testy – cheat sheet

```javascript
// Mount
const wrapper = mount(MyComponent, {
  props: { name: 'Kamil', items: [1, 2, 3] },
  global: {
    plugins: [createTestingPinia()],
    stubs: { RouterLink: true, MyHeavyComponent: true },
    provide: { theme: 'dark' },
  },
})

// Queries
wrapper.find('button')              // pierwszy pasujący
wrapper.findAll('li')               // wszystkie pasujące
wrapper.findComponent(ChildComp)   // komponent
wrapper.text()                      // tekst tekstowy
wrapper.html()                      // HTML string

// Interakcje
await wrapper.find('button').trigger('click')
await wrapper.find('input').setValue('hello')
await wrapper.find('select').setValue('option-value')
await flushPromises()               // czekaj na wszystkie Promises

// Assertions
expect(wrapper.text()).toContain('Hello')
expect(wrapper.find('.error').exists()).toBe(true)
expect(wrapper.emitted('update')).toBeTruthy()
expect(wrapper.emitted('update')?.[0]).toEqual(['new-value'])
expect(wrapper.props('disabled')).toBe(true)
```

---

## 🃏 Najczęstsze błędy i ich fix

```
❌ Destrukturyzacja reactive/store bez storeToRefs
   const { count } = store         ← traci reaktywność
   const { count } = storeToRefs(store)  ✅

❌ Mutowanie props bezpośrednio
   props.name = 'new'              ← Vue warning, anti-pattern
   emit('update:name', 'new')      ✅

❌ v-for bez :key
   <li v-for="item in items">
   <li v-for="item in items" :key="item.id">  ✅

❌ Event listener bez cleanup (memory leak)
   onMounted(() => window.addEventListener('scroll', fn))
   // dodaj:
   onUnmounted(() => window.removeEventListener('scroll', fn))  ✅

❌ v-html z user input (XSS)
   <div v-html="userComment" />
   <div v-html="DOMPurify.sanitize(userComment)" />  ✅

❌ index jako :key przy sortowanej/filtrowanej liście
   <li v-for="(item, i) in items" :key="i">   ← bug przy reorder
   <li v-for="item in items" :key="item.id">  ✅

❌ Async w computed
   const data = computed(async () => await fetch(...))  ← nie działa
   // Użyj watch lub composable useFetch            ✅
```

---

## 🃏 Bezpieczeństwo – checklist

```
☐ Brak v-html z niezaufanym inputem (DOMPurify gdy niezbędne)
☐ JWT w httpOnly cookie (nie localStorage)
☐ Route guards na wszystkich chronionych trasach
☐ HTTPS wszędzie w produkcji
☐ CSP headers skonfigurowane
☐ Brak sekretnych kluczy w zmiennych VITE_*
☐ Input validation po stronie serwera (nigdy nie ufaj klientowi)
☐ CSRF protection dla POST/PUT/DELETE
```

---

## 🃏 Performance – checklist

```
☐ Lazy loading tras: component: () => import('./View.vue')
☐ defineAsyncComponent dla ciężkich komponentów
☐ v-memo dla dużych list z rzadkimi zmianami
☐ keep-alive (z :include i :max) dla zakładek ze stanem
☐ shallowRef/shallowReactive dla dużych niezmiennych obiektów
☐ Virtual scrolling dla list 500+ elementów (@tanstack/vue-virtual)
☐ Obrazki: loading="lazy", WebP, odpowiednie srcset
☐ manualChunks w Vite dla vendor libraries
☐ Source maps: false w produkcji
☐ Sentry tracesSampleRate: 0.1 (nie 1.0!)
```

Jeśli chcesz, mogę rozwinąć któryś z tematów lub dodać więcej przykładów. 😊