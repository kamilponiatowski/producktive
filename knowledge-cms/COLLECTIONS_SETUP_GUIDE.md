# 🎓 Przewodnik: Knowledge Base w Directus — krok po kroku

## 📐 Twoja architektura (i dlaczego jest dobra)

```
knowledge_categories          ← drzewo kategorii (self-referencing)
  knowledge → technical → vue

knowledge_series              ← serie/kursy przypisane do kategorii
  "Pinia od A do Z" → category: vue

knowledge_posts               ← posty należące do serii
  Post 1, Post 2... → series: "Pinia od A do Z"
```

**Dlaczego 3 kolekcje, a nie 1?**
- Kategorie to **drzewo** (parent/child) — mogą istnieć bez serii
- Seria to **kontener** na posty — ma swój opis, kolor okładki, kolejność
- Post to **treść** — ma swoje tagi, czas czytania, markdown

Gdybyś wrzucił wszystko do jednej kolekcji, miałbyś powielone dane
(np. opis serii kopiowany w każdym poście).

---

## 🌳 KOLEKCJA 1: `knowledge_categories` (drzewo kategorii)

### Co masz (ze screena):
✅ id, status, sort, slug, parent, emoji, translations, children

### Jak działa `parent` (self-referencing relation)?

Pole `parent` to relacja **M2O (Many-to-One) do samej siebie**.
To znaczy: każda kategoria może mieć jednego rodzica.

```
knowledge  (parent: null)        ← korzeń, brak rodzica
  └── technical  (parent: knowledge)
        └── vue  (parent: technical)
        └── react  (parent: technical)
  └── soft-skills  (parent: knowledge)
```

**Pole `children`** to **odwrotność** relacji `parent` — Directus tworzy je
automatycznie jako O2M (One-to-Many). Dzięki niemu widzisz w panelu
"jakie podkategorie ma ta kategoria".

### ⚙️ Jak ustawić `parent` w Directus:

1. **Settings → Data Model → knowledge_categories**
2. **Create Field** → typ: **Many to One (M2O)**
3. **Related Collection:** `knowledge_categories` ← ta sama kolekcja!
4. Nazwa pola: `parent`
5. Directus zapyta czy stworzyć pole odwrotne → **Tak**, nazwij je `children`
6. Save

### ❓ Czy potrzebujesz pole `label`?

**Nie.** Masz `translations` — tam trzymasz nazwy per język:
- PL: "Wiedza", "Programowanie", "Vue"
- EN: "Knowledge", "Programming", "Vue"

`slug` to identyfikator URL: `knowledge`, `technical`, `vue`
`emoji` to wizualna etykieta: 📚, 💻, 💚

Pole `label` byłoby duplikatem `translations.name`. Nie dodawaj go.

### 📝 Translations — co powinno być w środku:

Kiedy dodajesz pole typu **Translations**, Directus tworzy tabelę
`knowledge_categories_translations` z polami:

| Pole | Typ | Po co |
|------|-----|-------|
| `name` | String | "Wiedza" / "Knowledge" |
| `description` | Text (opcjonalnie) | Krótki opis kategorii |

**Jak dodać translations:**
1. Create Field → typ: **Translations**
2. Directus pokaże kreator — dodaj pod-pola: `name` (String, Required)
3. Opcjonalnie: `description` (Text)
4. Save

> ⚠️ Żeby translations działały, musisz mieć ustawione języki!
> Settings → Project Settings → sekcja Translation Strings (lub Languages).
> Dodaj: `pl-PL` i `en-US`.

---

## 📚 KOLEKCJA 2: `knowledge_series` (serie/kursy)

### Co masz (ze screena):
✅ id, status, sort, slug, emoji, cover_color, category, translations

**To wygląda kompletnie!** Wszystkie pola które potrzebujesz, są na miejscu.

### Jak ustawić `category` (relacja do knowledge_categories):

1. Create Field → typ: **Many to One (M2O)**
2. Related Collection: `knowledge_categories`
3. Nazwa: `category`
4. W "Display Template" możesz ustawić `{{ slug }}` lub `{{ translations.name }}`
   żeby w panelu widzieć nazwę kategorii zamiast UUID

**Co to daje:** Seria "Pinia od A do Z" ma `category → vue`,
a `vue` ma `parent → technical`, `technical` ma `parent → knowledge`.
Cały breadcrumb buduje się automatycznie z drzewa kategorii.

### Translations dla serii:

| Pole | Typ | Po co |
|------|-----|-------|
| `name` | String | "Pinia od A do Z" / "Pinia from A to Z" |
| `description` | Text | Opis kursu per język |

### ❓ Czy potrzebujesz `total_posts`?

**Nie jako pole!** Lepiej obliczyć to w Nuxt zapytaniem:
```
Policz posty WHERE series = ta_seria AND status = published
```
Ręczne pole `total_posts` szybko się rozjedzie z rzeczywistością.

---

## 📝 KOLEKCJA 3: `knowledge_posts` (posty)

### Co masz (ze screena):
✅ id, status, sort, date_created, date_updated, slug, emoji, reading_time, tags, series, translations

**Też kompletne!** Masz wszystko co trzeba.

### Jak ustawić `series` (relacja do knowledge_series):

1. Create Field → typ: **Many to One (M2O)**
2. Related Collection: `knowledge_series`
3. Nazwa: `series`
4. Opcjonalnie stwórz pole odwrotne `posts` w knowledge_series (O2M)
   — dzięki temu w panelu serii zobaczysz listę postów

### Translations dla postów:

| Pole | Typ | Po co |
|------|-----|-------|
| `title` | String, Required | Tytuł posta |
| `excerpt` | Text | Krótki opis/zajawka |
| `content` | Text (Interface: **Markdown**) | Treść posta |

**Ważne:** Przy tworzeniu pola `content` w translations:
1. Typ: Text
2. **Interface: Markdown** ← to zmień w ustawieniach pola!
   (domyślnie Directus da Ci zwykły textarea)

### `tags` — jaki typ?

Najlepiej: **JSON** z interface **Tags**.
1. Create Field → typ: JSON
2. Interface: **Tags**
3. W panelu będziesz mógł wpisywać tagi jak: `pinia`, `vue`, `state-management`

### `sort` vs `sort_order`

Masz `sort` (systemowe pole Directusa) — to wystarczy!
Directus automatycznie doda drag & drop sortowanie w panelu.
Nie potrzebujesz osobnego `sort_order`.

---

## 🔐 KROK: Uprawnienia (Public Read)

Bez tego Nuxt nie odczyta danych z API!

1. **Settings → Access Policies → Public**
2. Dodaj uprawnienie **Read** dla KAŻDEJ z tych kolekcji:

| Kolekcja | Read |
|----------|------|
| `knowledge_categories` | ✅ |
| `knowledge_categories_translations` | ✅ |
| `knowledge_series` | ✅ |
| `knowledge_series_translations` | ✅ |
| `knowledge_posts` | ✅ |
| `knowledge_posts_translations` | ✅ |

> 💡 Dla `knowledge_posts` dodaj **filtr Read**: `status equals published`
> Dzięki temu drafty nie wyciekną przez API.

---

## 🧪 Jak przetestować czy działa?

### Test 1: API w przeglądarce

Po ustawieniu uprawnień, otwórz:
```
http://localhost:8055/items/knowledge_categories?fields=*,translations.*
```
Powinieneś zobaczyć JSON z kategoriami i tłumaczeniami.

### Test 2: Kategorie z drzewem (parent/children)
```
http://localhost:8055/items/knowledge_categories?fields=*,translations.*,children.*,children.translations.*&filter[parent][_null]=true
```
To zwróci tylko korzenie (bez parenta) z ich dziećmi.

### Test 3: Seria z postami
```
http://localhost:8055/items/knowledge_series?fields=*,translations.*,category.slug,category.translations.*
```

### Test 4: Posty z serii
```
http://localhost:8055/items/knowledge_posts?fields=*,translations.*,series.slug,series.translations.*&filter[series][slug][_eq]=pinia-od-a-do-z&sort=sort
```

---

## 📋 Checklist — co masz vs co potrzebujesz

### knowledge_categories
| Pole | Masz? | Status |
|------|-------|--------|
| id | ✅ | OK |
| status | ✅ | OK |
| sort | ✅ | OK |
| slug | ✅ | OK, Required + Unique |
| parent | ✅ | OK, M2O → self |
| emoji | ✅ | OK |
| translations (name) | ✅ | OK |
| children | ✅ | OK, O2M odwrotność parent |
| ~~label~~ | ❌ | Nie dodawaj — masz translations.name |

### knowledge_series
| Pole | Masz? | Status |
|------|-------|--------|
| id | ✅ | OK |
| status | ✅ | OK |
| sort | ✅ | OK |
| slug | ✅ | OK |
| emoji | ✅ | OK |
| cover_color | ✅ | OK |
| category | ✅ | OK, M2O → knowledge_categories |
| translations (name, description) | ✅ | OK |

### knowledge_posts
| Pole | Masz? | Status |
|------|-------|--------|
| id | ✅ | OK |
| status | ✅ | OK |
| sort | ✅ | OK |
| date_created | ✅ | OK |
| date_updated | ✅ | OK |
| slug | ✅ | OK |
| emoji | ✅ | OK |
| reading_time | ✅ | OK |
| tags | ✅ | OK, JSON + interface Tags |
| series | ✅ | OK, M2O → knowledge_series |
| translations (title, excerpt, content) | ✅ | Sprawdź czy content ma interface Markdown |

---

## 🎯 Podsumowanie: Twoja struktura jest DOBRA

Ze screenów wynika, że masz wszystkie potrzebne pola.
Jedyne co musisz zweryfikować:

1. **`parent` w categories** — czy to M2O do `knowledge_categories` (self)?
2. **Translations** — czy w środku masz odpowiednie pod-pola (name/title/content)?
3. **Uprawnienia** — czy Public ma Read na wszystkich 6 kolekcjach (3 główne + 3 translations)?
4. **Języki** — czy masz dodane `pl-PL` i `en-US` w Project Settings?
5. **Content w translations postów** — czy interface to Markdown (nie textarea)?

Jak to sprawdzisz, możesz zacząć wrzucać dane! 🚀
