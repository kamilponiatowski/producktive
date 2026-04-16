# Directus + Supabase — Boilerplate Setup Guide

## Stack

```
Nuxt 3 (frontend) → Directus (CMS + API) → Supabase PostgreSQL (baza danych)
```

---

## 1. Wymagania

- Node.js 18+
- Konto na [supabase.com](https://supabase.com)
- (opcjonalnie) Docker Desktop do uruchamiania przez `docker compose`

---

## 2. Setup od zera

### 2a. Supabase

1. Utwórz projekt na [supabase.com](https://supabase.com) → wybierz region **EU (Frankfurt)**
2. Idź w **Settings → Database** → zapisz:
   - Host: `db.<project-ref>.supabase.co`
   - Port: `5432`
   - User: `postgres`
   - Hasło: to które ustawiłeś (możesz zresetować w Settings → Database)

### 2b. Directus lokalnie

```bash
mkdir my-cms && cd my-cms
npm init -y
npm install directus pg
```

### 2c. Wygeneruj SECRET

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2d. Plik `.env`

Skopiuj `.env.example` → `.env` i uzupełnij:

```env
SECRET="<wygenerowany-klucz>"

# Supabase
DB_CLIENT="pg"
DB_HOST="db.<project-ref>.supabase.co"
DB_PORT="5432"
DB_DATABASE="postgres"
DB_USER="postgres"
DB_PASSWORD="<twoje-haslo>"
DB_SSL="true"
DB_SSL__REJECT_UNAUTHORIZED="false"

# Admin (pierwsze logowanie)
ADMIN_EMAIL="admin@twojadomena.pl"
ADMIN_PASSWORD="<silne-haslo>"

# Server
HOST="0.0.0.0"
PORT="8055"
PUBLIC_URL="http://localhost:8055"

# CORS — URL Twojego Nuxt frontend
CORS_ENABLED="true"
CORS_ORIGIN="http://localhost:3000"
WEBSOCKETS_ENABLED="true"

# Storage
STORAGE_LOCATIONS="local"
STORAGE_LOCAL_ROOT="./uploads"
```

### 2e. Pierwsze uruchomienie

```bash
# KROK 1 — tylko raz! Tworzy tabele systemowe i konto admina
npx directus bootstrap

# KROK 2 — każde kolejne uruchomienie
npx directus start
```

Panel admina: **http://localhost:8055**

---

## 3. Kolekcje (Data Model)

### Tworzenie kolekcji

Panel → **Settings → Data Model → Create Collection**

### Pola które zawsze warto dodać

| Pole | Typ | Uwagi |
|------|-----|-------|
| `id` | UUID | Primary key (auto) |
| `status` | String | `published` / `draft` / `archived` |
| `date_created` | Timestamp | Auto-fill |
| `date_updated` | Timestamp | Auto-fill |
| `user_created` | UUID → relation | Auto-fill |

### Ustawienie uprawnień (Public API)

Aby Nuxt mógł czytać dane **bez logowania**:

Panel → **Settings → Access Policies → Public → Add collection → Read**

---

## 4. Wielojęzyczność (i18n) — WAŻNE

### ✅ Rekomendowane: Directus Translations (osobna tabela tłumaczeń)

Directus ma wbudowany system tłumaczeń — **jedno pole `translations`** trzyma wszystkie języki.

**Jak to ustawić:**
1. Stwórz kolekcję np. `articles`
2. Dodaj pole → typ **Translations**
3. Directus automatycznie stworzy kolekcję `articles_translations` z polami per język

**Wynik w bazie:**
```
articles            → id, status, date_created ...
articles_translations → id, articles_id, languages_code, title, content, slug
```

**Zapytanie z Nuxt:**
```typescript
directus.request(readItems('articles', {
  fields: ['id', 'status', { translations: ['title', 'content', 'slug', 'languages_code'] }],
  deep: { translations: { _filter: { languages_code: { _eq: 'pl-PL' } } } }
}))
```

### ❌ NIE rób tak: pola z sufiksami języka

```
title_pl, title_en, content_pl, content_en  ← zły pomysł
```

**Dlaczego?** Przy każdym nowym języku musisz dodawać nowe pola do tabeli. Nie skaluje się.

### ❌ NIE rób tak: dwie osobne kolekcje

```
articles_pl, articles_en  ← zły pomysł
```

**Dlaczego?** Duplikacja logiki, podwójna praca, brak synchronizacji statusów.

---

## 5. Eksport / Import schematu (do gita!)

```bash
# Eksportuj schemat bazy (rób to po każdej zmianie kolekcji)
npm run snapshot
# → zapisuje do ./snapshots/latest.yaml

# Importuj schemat na nowym środowisku
npm run seed
```

> Commituj `snapshots/latest.yaml` do gita — to Twój "migration history".

---

## 6. Podłączenie Nuxt

```bash
# W projekcie Nuxt:
npm install @directus/sdk
```

```typescript
// plugins/directus.ts
import { createDirectus, rest, readItems } from '@directus/sdk'

const directus = createDirectus(process.env.DIRECTUS_URL || 'http://localhost:8055')
  .with(rest())

export default defineNuxtPlugin(() => {
  return { provide: { directus } }
})
```

```typescript
// nuxt.config.ts — dodaj zmienną środowiskową
runtimeConfig: {
  public: {
    directusUrl: process.env.DIRECTUS_URL || 'http://localhost:8055'
  }
}
```

---

## 7. Checklist — nowy projekt

- [ ] Utwórz projekt Supabase (region EU Frankfurt)
- [ ] `npm init -y && npm install directus pg`
- [ ] Skopiuj `.env.example` → `.env` i uzupełnij dane
- [ ] Wygeneruj SECRET (`node -e ...`)
- [ ] `npx directus bootstrap`
- [ ] `npx directus start` → otwórz http://localhost:8055
- [ ] Dodaj języki: Settings → Project Settings → Languages (`pl-PL`, `en-US`)
- [ ] Stwórz kolekcje w Data Model
- [ ] Ustaw uprawnienia Public → Read
- [ ] `npm run snapshot` → zapisz schemat do gita
- [ ] Podłącz Nuxt z `@directus/sdk`
- [ ] Zmień `CORS_ORIGIN` na URL produkcyjny przed deploy

---

## 8. Skrypty (package.json)

```bash
npm run bootstrap   # TYLKO RAZ — pierwsze uruchomienie
npm run dev         # Codzienne dev
npm run snapshot    # Eksport schematu → git
npm run seed        # Import schematu na nowym środowisku
```

---

## 9. Częste błędy

| Błąd | Przyczyna | Rozwiązanie |
|------|-----------|-------------|
| `SELF_SIGNED_CERT_IN_CHAIN` | SSL Supabase | Dodaj `DB_SSL__REJECT_UNAUTHORIZED="false"` |
| `password authentication failed` | Złe hasło w DB_PASSWORD | Zresetuj w Supabase → Settings → Database |
| `Ta witryna jest nieosiągalna` | Zły adres | Wejdź na `http://localhost:8055` (nie `0.0.0.0`) |
| `relation directus_collections does not exist` | Nie uruchomiłeś bootstrap | Uruchom `npx directus bootstrap` |
