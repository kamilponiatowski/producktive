# Directus — Kolekcje dla Bloga (i18n)

## Twoja aktualna struktura danych

Masz dwa typy: `BlogPost` i `BlogSeries` z polami `_en` (np. `titleEn`, `contentEn`).
Poniższy guide migruje to do Directus z systemem tłumaczeń.

---

## KROK 1 — Dodaj języki w Directus

1. Otwórz **http://localhost:8055**
2. Lewy panel → ⚙️ **Settings** → **Project Settings**
3. Sekcja **Default Language** → dodaj języki:
   - `pl-PL` (Polskie kody)
   - `en-US`
4. Kliknij **Save**

> Jeśli nie widzisz opcji Languages — idź do **Settings → Data Model** i sprawdź czy kolekcja `directus_languages` istnieje.

---

## KROK 2 — Stwórz kolekcję `blog_categories`

Panel → **Settings → Data Model → Create Collection**

**Nazwa:** `blog_categories`

### Pola (Fields):

| Nazwa pola | Typ | Ustawienia |
|---|---|---|
| `id` | UUID | Primary key (auto) |
| `slug` | String | Required, Unique |
| `label` | String | np. `vue`, `nuxt`, `js` |
| `emoji` | String | |

> To zastąpi Twoje `category: 'vue'` — slug jako referencja.

---

## KROK 3 — Stwórz kolekcję `blog_series`

Panel → **Settings → Data Model → Create Collection**

**Nazwa:** `blog_series`

### Pola:

| Nazwa pola | Typ | Ustawienia |
|---|---|---|
| `id` | UUID | Primary key (auto) |
| `slug` | String | Required, Unique |
| `emoji` | String | |
| `cover_color` | String | np. `from-emerald-500/20 to-cyan-500/20` |
| `total_posts` | Integer | |
| `category` | String (lub M2O do `blog_categories`) | |
| `status` | String | `published` / `draft` |
| `translations` | **Translations** | → patrz niżej |

### Pole `translations` (M2M z językami):

Kliknij **Add Field** → typ: **Translations**

W kreatorze pola translations dodaj pod-pola:

| Pod-pole | Typ |
|---|---|
| `name` | String |
| `description` | Text |

Directus automatycznie stworzy kolekcję `blog_series_translations`.

---

## KROK 4 — Stwórz kolekcję `blog_posts`

Panel → **Settings → Data Model → Create Collection**

**Nazwa:** `blog_posts`

**Opcje kolekcji:**
- ✅ Created By / Updated By (auto)
- ✅ Created On / Updated On (auto)
- ✅ Status (draft/published/archived)
- ✅ Sort

### Pola:

| Nazwa pola | Typ | Uwagi |
|---|---|---|
| `id` | UUID | Primary key (auto) |
| `slug` | String | Required, Unique |
| `emoji` | String | np. `🍍` |
| `sort_order` | Integer | Kolejność w serii |
| `reading_time` | Integer | Minuty |
| `tags` | JSON / CSV | np. `['pinia', 'vue']` |
| `status` | String | `published/draft/archived` |
| `series` | **M2O** → `blog_series` | Relacja do serii |
| `category` | String | lub M2O → `blog_categories` |
| `translations` | **Translations** | → patrz niżej |

### Pole `translations`:

Dodaj typ **Translations** i w kreatorze dodaj pod-pola:

| Pod-pole | Typ | Uwagi |
|---|---|---|
| `title` | String | Required |
| `excerpt` | Text | Krótki opis |
| `content` | **Markdown** | Treść posta |

Directus stworzy kolekcję `blog_posts_translations`.

---

## KROK 5 — Ustaw uprawnienia (Public Read)

Panel → **Settings → Access Policies → Public**

Dodaj uprawnienie **Read** dla:
- `blog_posts`
- `blog_posts_translations`
- `blog_series`
- `blog_series_translations`
- `blog_categories`

---

## KROK 6 — Struktura bazy po konfiguracji

```
blog_categories
  id, slug, label, emoji

blog_series
  id, slug, emoji, cover_color, total_posts, category, status

blog_series_translations
  id, blog_series_id, languages_code, name, description

blog_posts
  id, slug, emoji, sort_order, reading_time, tags, status, series (FK), category, date_created, date_updated

blog_posts_translations
  id, blog_posts_id, languages_code, title, excerpt, content
```

---

## KROK 7 — Jak odpytać w Nuxt (SDK)

```typescript
// composables/useBlogPosts.ts
import { createDirectus, rest, readItems } from '@directus/sdk'

const directus = createDirectus('http://localhost:8055').with(rest())

export async function getBlogPosts(lang: 'pl-PL' | 'en-US' = 'pl-PL') {
  return directus.request(
    readItems('blog_posts', {
      filter: { status: { _eq: 'published' } },
      fields: [
        'id',
        'slug',
        'emoji',
        'sort_order',
        'reading_time',
        'tags',
        'date_created',
        { series: ['slug', { translations: ['name', 'description'] }] },
        { translations: ['title', 'excerpt', 'content', 'languages_code'] },
      ],
      deep: {
        translations: {
          _filter: { languages_code: { _eq: lang } }
        },
        series: {
          translations: {
            _filter: { languages_code: { _eq: lang } }
          }
        }
      },
      sort: ['sort_order']
    })
  )
}

export async function getBlogPost(slug: string, lang: 'pl-PL' | 'en-US' = 'pl-PL') {
  const posts = await directus.request(
    readItems('blog_posts', {
      filter: {
        slug: { _eq: slug },
        status: { _eq: 'published' }
      },
      fields: [
        '*',
        { series: ['*', { translations: ['*'] }] },
        { translations: ['*'] },
      ],
      deep: {
        translations: { _filter: { languages_code: { _eq: lang } } }
      },
      limit: 1
    })
  )
  return posts[0] ?? null
}
```

---

## KROK 8 — Migracja danych z pliku TS

Masz dane w `/data/pinia-series.ts`. Możesz je zaimportować przez:

### Opcja A — Panel Directus (ręcznie)
Idź do kolekcji `blog_posts` w panelu → **Create Item** i wklejaj.

### Opcja B — Skrypt migracyjny (automatycznie)

```typescript
// knowledge-cms/migrate.mjs
import { createDirectus, rest, createItem } from '@directus/sdk'
import { piniaPostsData, piniaSeries } from '../data/pinia-series.ts' // adjust path

const directus = createDirectus('http://localhost:8055')
  .with(rest({ credentials: 'include' }))

// Najpierw zaloguj się jako admin i pobierz token...
// Pełny skrypt migracyjny — omówić osobno
```

> Skrypt migracyjny zrobimy razem w kolejnym kroku.

---

## Typowe błędy przy kolekcjach

| Problem | Rozwiązanie |
|---|---|
| Nie widzę kolekcji w menu | Settings → Data Model → kliknij ikonę oka |
| Pole Translations nie działa | Sprawdź czy masz dodane języki w Settings → Project Settings |
| API zwraca puste translations | Sprawdź `deep` filter w zapytaniu — kod języka musi pasować |
| Brak uprawnień 403 | Settings → Access Policies → Public → dodaj Read |
