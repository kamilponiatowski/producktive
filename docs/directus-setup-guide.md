# 🏗️ Directus CMS – Przewodnik konfiguracji dla Producktive Blog

## 📖 Co to jest Directus?

**Directus** to open-source headless CMS, który daje Ci:
- Panel administracyjny (piękny UI do zarządzania treścią)
- REST API + GraphQL API (automatycznie generowane)
- Pełna kontrola nad danymi
- Self-hosted lub Directus Cloud

Blog na Producktive jest zbudowany tak, że:
1. **Bez Directus** → działa z wbudowanymi statycznymi danymi (`data/pinia-series.ts`)
2. **Z Directus** → pobiera posty z API (wystarczy ustawić `NUXT_PUBLIC_DIRECTUS_URL`)

---

## 🚀 Krok 1: Instalacja Directus

### Opcja A: Docker (Zalecane)

```bash
mkdir producktive-cms && cd producktive-cms
```

Stwórz plik `docker-compose.yml`:

```yaml
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
      SECRET: 'zmien-mnie-na-losowy-string-min-32-znaki'
      ADMIN_EMAIL: 'admin@producktive.pl'
      ADMIN_PASSWORD: 'TwojeHasloDoZmiany123!'
      DB_CLIENT: 'sqlite3'
      DB_FILENAME: '/directus/database/data.db'
      WEBSOCKETS_ENABLED: 'true'
```

```bash
docker compose up -d
```

Otwórz `http://localhost:8055` — panel admina gotowy! 🎉

> ⚠️ Na produkcji zamień SQLite na PostgreSQL.

### Opcja B: Directus Cloud (Zero konfiguracji)

1. Wejdź na [directus.cloud](https://directus.cloud/)
2. Załóż konto i stwórz projekt
3. Dostajesz URL API gotowy do użycia

---

## 🗄️ Krok 2: Tworzenie kolekcji `posts`

Po zalogowaniu do panelu Directus:

1. Idź do **Settings → Data Model**
2. Kliknij **"Create Collection"**
3. Nazwa: `posts`
4. Dodaj pola:

| Pole | Typ | Konfiguracja |
| :--- | :--- | :--- |
| `id` | Integer (Auto) | Primary Key |
| `status` | String | Dropdown: `draft`, `published`, `archived` |
| `title` | String | Required |
| `slug` | String | Required, Unique |
| `excerpt` | Text | Krótki opis |
| `content` | Text (Markdown) | Interface: Markdown |
| `category` | String | np. `vue`, `pinia` |
| `tags` | JSON | Interface: Tags |
| `emoji` | String | np. `🍍` |
| `series_name` | String | np. `Pinia od A do Z` |
| `sort_order` | Integer | Kolejność w serii |
| `reading_time` | Integer | Czas czytania (min) |
| `date_created` | Datetime | Auto |
| `date_updated` | Datetime | Auto |

### Konfiguracja pól:

1. **status** → Interface: Dropdown → Opcje: `draft, published, archived`
2. **slug** → Zaznacz jako **Unique**
3. **content** → Interface: **Markdown** (polecam dla devów!)
4. **tags** → Interface: **Tags**
5. **emoji** → Interface: Input (String) z limitem 4 znaków

---

## 🔑 Krok 3: Uprawnienia API (Public Read)

1. Idź do **Settings → Access Policies → Public**
2. Kliknij **"Add Collection"** → wybierz `posts`
3. Ustaw:
   - **Read** ✅ (dodaj filtr: `status equals published`)
   - **Create** ❌
   - **Update** ❌
   - **Delete** ❌

> 🔒 Filtr `status = published` gwarantuje, że publiczne API zwróci **tylko** opublikowane posty.

---

## 📝 Krok 4: Dodawanie postów

### Ręcznie w panelu:

1. Idź do **Content → Posts**
2. Kliknij **"Create Item"**
3. Wypełnij pola (status: `published`, slug, tytuł, content w Markdown...)
4. Zapisz

### Import z pliku JSON:

Możesz użyć Directus API do masowego importu. Poniżej przykład z jednym postem:

```bash
curl -X POST http://localhost:8055/items/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TWOJ_TOKEN_ADMINA" \
  -d '{
    "status": "published",
    "title": "🍍 Czym jest Pinia?",
    "slug": "czym-jest-pinia",
    "excerpt": "Poznaj bibliotekę do zarządzania stanem w Vue.",
    "content": "# 🍍 Czym jest Pinia?\n\n**Pinia** to biblioteka...",
    "category": "vue",
    "tags": ["pinia", "vue", "state-management"],
    "emoji": "🍍",
    "series_name": "Pinia od A do Z",
    "sort_order": 1,
    "reading_time": 3
  }'
```

> 💡 Token admina znajdziesz w **Settings → Access Policies** lub stwórz **static token** dla swojego użytkownika.

### Treść postów:

Wszystkie posty z serii "Pinia od A do Z" są dostępne jako dane statyczne w pliku:
`data/pinia-series.ts`

Skopiuj `content` z każdego obiektu i wklej do Directus.

---

## 🔌 Krok 5: Podłączenie do Producktive

1. Dodaj zmienną środowiskową do `.env`:

```bash
NUXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
```

2. Zrestartuj serwer deweloperski:

```bash
pnpm dev
```

3. Blog automatycznie przełączy się z danych statycznych na Directus API! 🎉

### Jak to działa?

Composable `useDirectus.ts` sprawdza, czy `NUXT_PUBLIC_DIRECTUS_URL` jest ustawiony:
- **Tak** → pobiera dane z Directus REST API
- **Nie** → używa danych statycznych z `data/pinia-series.ts`

---

## 🛠️ Krok 6: Zarządzanie treścią — codzienne operacje

### Dodawanie nowego posta:
1. Panel → Content → Posts → Create Item
2. Wypełnij pola, ustaw `status: published`
3. Post pojawi się na blogu automatycznie

### Edycja posta:
1. Panel → Content → Posts → kliknij na post
2. Edytuj treść → Zapisz
3. Zmiany widoczne natychmiast

### Tworzenie nowej serii:
1. Dodaj posty z nową wartością `series_name`
2. Composable automatycznie zgrupuje je jako nową serię

### Podgląd draftów:
Drafty (`status: draft`) nie są widoczne publicznie. Aby je podejrzeć:
1. Stwórz token w Directus (Settings → Access Policies → Twój user → Static Token)
2. Użyj go w zapytaniach API do podglądu

---

## 🧪 Testowanie API

### Pobierz opublikowane posty:
```bash
curl "http://localhost:8055/items/posts?filter[status][_eq]=published&sort=sort_order"
```

### Pobierz post po slugu:
```bash
curl "http://localhost:8055/items/posts?filter[slug][_eq]=czym-jest-pinia"
```

### Pobierz posty z serii:
```bash
curl "http://localhost:8055/items/posts?filter[series_name][_eq]=Pinia%20od%20A%20do%20Z&sort=sort_order"
```

---

## 🚢 Krok 7: Deploy na produkcję

### Directus:
| Platforma | Zalety |
| :--- | :--- |
| **Railway** | Szybki deploy, darmowy tier, PostgreSQL |
| **Render** | Docker support, auto-deploy z GitHub |
| **Directus Cloud** | Zero konfiguracji |

### Producktive (Nuxt):
Zmień zmienną w Vercel/Netlify:
```
NUXT_PUBLIC_DIRECTUS_URL=https://twoja-instancja.directus.app
```

---

## 📋 Checklist

- [ ] Directus zainstalowany i uruchomiony
- [ ] Kolekcja `posts` utworzona z polami (PL + EN)
- [ ] Public read access skonfigurowany (tylko published!)
- [ ] Pierwszy post dodany w panelu
- [ ] `NUXT_PUBLIC_DIRECTUS_URL` ustawiony w `.env`
- [ ] Wiedza działa z danymi z Directus
- [ ] Posty zaimportowane ze statycznych danych
- [ ] Pola `_en` dodane i wypełnione
- [ ] Deploy Directus na produkcję
- [ ] Deploy Nuxt z nowym URL Directus

---

## 🌍 Krok 8: Obsługa PL/EN (wielojęzyczność)

### Strategia: Pola z sufiksem `_en`

Producktive używa prostej strategii — duplikacja pól z sufiksem `_en`:

| Pole PL | Pole EN | Opis |
| :--- | :--- | :--- |
| `title` | `title_en` | Tytuł posta |
| `excerpt` | `excerpt_en` | Krótki opis |
| `content` | `content_en` | Treść (Markdown) |
| `series_name` | `series_name_en` | Nazwa serii |

### Dodaj pola EN do kolekcji `posts`:

1. **Settings → Data Model → posts**
2. Dodaj pola:
   - `title_en` — String (opcjonalne)
   - `excerpt_en` — Text (opcjonalne)
   - `content_en` — Text/Markdown (opcjonalne)
   - `series_name_en` — String (opcjonalne)

### Jak to działa w kodzie:

Composable `useDirectus.ts` mapuje pola Directus na `BlogPost`:

```ts
// mapDirectusPost — dodaj pola EN
return {
  // ... pola PL
  titleEn: item.title_en || '',
  excerptEn: item.excerpt_en || '',
  contentEn: item.content_en || '',
  seriesNameEn: item.series_name_en || '',
}
```

Strony automatycznie wybierają wersję na podstawie `locale`:

```ts
const postTitle = computed(() =>
  locale.value === 'en' && post.titleEn ? post.titleEn : post.title
)
```

### Best practices dla PL/EN:

1. **PL jest zawsze primary** — pola EN są opcjonalne
2. **Fallback do PL** — jeśli EN jest puste, pokazuje wersję PL
3. **Slug jest wspólny** — ten sam slug dla obu języków (routing nie zmienia się per język)
4. **Tłumacz w panelu** — w Directus możesz dodać layout z zakładkami PL/EN (Interfaces → Tabs)
5. **Nie duplikuj contentu** — jeśli post nie ma wersji EN, po prostu zostaw pola `_en` puste
6. **SEO** — `useHead()` automatycznie użyje odpowiedniego tytułu i opisu na podstawie aktywnego locale

### Alternatywa: Directus Translations (zaawansowane)

Directus ma wbudowany system translations (M2M). Jeśli potrzebujesz więcej niż 2 języki:

1. Stwórz kolekcję `languages` z kodami: `pl`, `en`, `de`...
2. Włącz **Content Translations** na kolekcji `posts`
3. Directus automatycznie stworzy `posts_translations` z relacją
4. W API: `?fields=*,translations.*&deep[translations][_filter][languages_code][_eq]=en`

> Dla 2 języków (PL/EN) strategia z sufiksem `_en` jest prostsza i wystarczająca.

---

## 🔄 Krok 9: Migracja postów ze statycznych danych do Directus

### Automatyczny import:

Stwórz skrypt `scripts/import-posts.ts`:

```ts
import { piniaPostsData } from '../data/pinia-series'

const DIRECTUS_URL = 'http://localhost:8055'
const ADMIN_TOKEN = 'TWÓJ_STATIC_TOKEN'

for (const post of piniaPostsData) {
  const response = await fetch(`${DIRECTUS_URL}/items/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ADMIN_TOKEN}`,
    },
    body: JSON.stringify({
      status: 'published',
      title: post.title,
      title_en: post.titleEn || null,
      slug: post.slug,
      excerpt: post.excerpt,
      excerpt_en: post.excerptEn || null,
      content: post.content,
      content_en: post.contentEn || null,
      category: post.category,
      tags: post.tags,
      emoji: post.emoji,
      series_name: post.seriesName,
      series_name_en: post.seriesNameEn || null,
      sort_order: post.sortOrder,
      reading_time: post.readingTime,
    }),
  })

  const result = await response.json()
  console.log(`✅ Imported: ${post.title} (${response.status})`)
}
```

Uruchom:
```bash
npx tsx scripts/import-posts.ts
```

### Weryfikacja:
```bash
curl "http://localhost:8055/items/posts?filter[status][_eq]=published&sort=sort_order" | jq '.data | length'
```

---

## 💡 Przydatne tipy

1. **Directus SDK** — alternatywa dla ręcznych fetch: `npm install @directus/sdk`
2. **Webhooks** — ustaw webhook w Directus, żeby triggerować rebuild Nuxt po publikacji posta
3. **Flows** — automatyzacja w Directus (np. auto-generowanie slug z tytułu)
4. **Live Preview** — skonfiguruj podgląd posta w Nuxt z panelu Directus
5. **Backup** — regularnie rób backup bazy danych!
6. **PL/EN Tabs** — w Directus możesz stworzyć interface z zakładkami, żeby wygodnie edytować obie wersje obok siebie
7. **ISR** — po przejściu na Directus, rozważ włączenie ISR (`routeRules: { '/wiedza/**': { isr: 600 } }`) — strony będą cache'owane 10 min i odświeżane w tle
