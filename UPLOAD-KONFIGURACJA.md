# Konfiguracja przesyłania plików (upload) — Producktive

Przewodnik krok po kroku jak uruchomić formularz kontaktowy z możliwością załączania plików.

---

## Dlaczego to nie działa?

Formularz wysyła plik do endpointu `/api/upload`, który zapisuje go w **Supabase Storage** (bucket `contact-attachments`). Błędy jakie mogą wystąpić:

| Błąd | Przyczyna |
|---|---|
| `500 — supabaseUrl is required.` | Brak zmiennych środowiskowych `.env` lokalnie |
| `503 — Storage service not configured.` | Brak zmiennych środowiskowych na Vercel |
| `404 — The page could not be found` | Bucket `contact-attachments` nie istnieje w Supabase Storage |

---

## Krok 1 — Utwórz bucket w Supabase Storage

1. Zaloguj się na [supabase.com](https://supabase.com) → otwórz swój projekt
2. W lewym menu kliknij **Storage**
3. Kliknij **New bucket**
4. Wypełnij:
   - **Name**: `contact-attachments` ← **dokładnie taka nazwa, bez zmian**
   - **Public bucket**: ✅ włącz (żeby linki do plików działały w emailach)
5. Kliknij **Create bucket**

---

## Krok 2 — Ustaw politykę dostępu (RLS) dla bucketu

Po stworzeniu bucketu musisz pozwolić serwerowi na zapis plików.

1. Kliknij na bucket `contact-attachments`
2. Przejdź do zakładki **Policies**
3. Kliknij **New policy** → **For full customization**
4. Ustaw:
   - **Policy name**: `service_role_upload`
   - **Allowed operation**: `INSERT`
   - **Target roles**: `service_role`
   - **USING expression**: `true`
   - **WITH CHECK expression**: `true`
5. Kliknij **Review** → **Save policy**

> **Alternatywa (szybciej)**: W SQL Editorze wklej i uruchom:
> ```sql
> CREATE POLICY "service_role_upload"
> ON storage.objects FOR INSERT
> TO service_role
> WITH CHECK (bucket_id = 'contact-attachments');
> ```

---

## Krok 3 — Pobierz klucze API z Supabase

1. W panelu Supabase przejdź do **Settings → API**
2. Skopiuj i zapisz:

| Zmienna | Skąd wziąć | Przykład wartości |
|---|---|---|
| `SUPABASE_URL` | `Settings → API → Project URL` | `https://abcdefgh.supabase.co` |
| `SUPABASE_SERVICE_KEY` | `Settings → API → Project API keys → service_role` | `eyJhbGci...` (długi token) |

> ⚠️ `service_role` key to klucz administracyjny — **nigdy nie wklejaj go do kodu frontendu, nie commituj do gita**.

---

## Krok 4 — Konfiguracja lokalna (plik `.env`)

Utwórz plik `.env` w katalogu głównym projektu (obok `nuxt.config.ts`):

```env
# Supabase — serwer (prywatne)
SUPABASE_URL=https://twoj-projekt.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Supabase — publiczne (opcjonalne, jeśli używane w kliencie)
NUXT_PUBLIC_SUPABASE_URL=https://twoj-projekt.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Resend (do emaili)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx

# Inne
NUXT_PUBLIC_CAL_URL=https://cal.eu/producktive/15min
NUXT_PUBLIC_SITE_URL=https://producktive.pl
```

Plik `.env` jest już w `.gitignore` — nie trafi do repozytorium.

Po zapisaniu pliku zrestartuj serwer deweloperski:
```bash
pnpm dev
```

---

## Krok 5 — Konfiguracja Vercel (produkcja)

1. Otwórz [vercel.com](https://vercel.com) → wybierz projekt `producktive`
2. Przejdź do **Settings → Environment Variables**
3. Dodaj każdą zmienną osobno, klikając **Add**:

| Name | Value | Environment |
|---|---|---|
| `SUPABASE_URL` | `https://twoj-projekt.supabase.co` | Production, Preview, Development |
| `SUPABASE_SERVICE_KEY` | `eyJhbG...` (service_role) | Production, Preview, Development |
| `NUXT_PUBLIC_SUPABASE_URL` | `https://twoj-projekt.supabase.co` | Production, Preview, Development |
| `NUXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbG...` (anon) | Production, Preview, Development |
| `RESEND_API_KEY` | `re_xxxxxx` | Production, Preview, Development |
| `NUXT_PUBLIC_CAL_URL` | `https://cal.eu/producktive/15min` | Production, Preview, Development |
| `NUXT_PUBLIC_SITE_URL` | `https://producktive.pl` | Production |

4. Po dodaniu wszystkich zmiennych kliknij **Redeploy** (w zakładce **Deployments** → trzy kropki → **Redeploy**)

> ⚠️ Zmienne środowiskowe na Vercel działają dopiero po **nowym deploymencie** — redeploy jest konieczny!

---

## Weryfikacja — jak sprawdzić czy działa?

### Lokalnie
1. Uruchom `pnpm dev`
2. Otwórz formularz kontaktowy
3. Kliknij "Dodaj plik" i wybierz PDF lub JPG
4. Plik powinien się wgrać (spinner → nazwa pliku z checkmarkiem)
5. Wyślij formularz — w tabeli `contact_messages` w Supabase powinna pojawić się nowa wiadomość z `attachment_url`

### Na produkcji
1. Po redeploy otwórz stronę `https://producktive.pl`
2. Sprawdź formularz tak samo jak lokalnie
3. W Supabase Storage → `contact-attachments` powinieneś widzieć wgrany plik

---

## Struktura pliku upload API

```
/api/upload  (POST, multipart/form-data)
    ↓ walidacja: typ pliku, rozmiar (max 5 MB)
    ↓ createClient(supabaseUrl, serviceKey)
    ↓ supabase.storage.from('contact-attachments').upload(...)
    ↓ zwraca { url: 'https://...' }
```

Plik: `server/api/upload.post.ts`

Dozwolone typy: PDF, JPEG, PNG, WebP, DOC, DOCX  
Maksymalny rozmiar: 5 MB
