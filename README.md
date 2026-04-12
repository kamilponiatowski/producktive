# Producktive — Strona Wizytówka

> Profesjonalne rozwiązania cyfrowe dla małych firm i freelancerów.

## 🚀 Quick Start

```bash
# 1. Zainstaluj zależności
npm install

# 2. Skonfiguruj zmienne środowiskowe
cp .env.development .env.local
# Uzupełnij VITE_SUPABASE_URL i VITE_SUPABASE_ANON_KEY

# 3. Uruchom bazę danych (Supabase Dashboard → SQL Editor)
# Wklej zawartość: supabase/schema.sql

# 4. Uruchom dev server
npm run dev

# 5. Build produkcyjny
npm run build
```

## 📁 Struktura

```
src/
├── assets/          # CSS (Tailwind) + fonty
├── components/
│   └── shared/      # NavBar, FooterSection
├── composables/     # useContactForm (Zod + Supabase)
├── modules/
│   ├── hero/        # HeroSection + TrustBar
│   ├── services/    # ServicesSection
│   ├── portfolio/   # PortfolioSection (Concept / Corporate / Personal)
│   ├── about/       # AboutSection
│   ├── process/     # ProcessSection (timeline)
│   └── contact/     # ContactSection (formularz)
├── services/        # supabase.ts
└── App.vue
```

## 🎯 Portfolio Strategy (bez klientów)

Sekcja portfolio używa 3 typów projektów — **jawnie oznaczonych**:
- 🎨 **Projekty koncepcyjne** — realne buildy dla wyobrażonych klientów
- 🏢 **Praca korporacyjna** — anonimizowane case studies
- ⚡ **Własne projekty** — ta strona + własne narzędzia

Transparentność = zaufanie. Nie ukrywaj braku klientów, zamień to w atut.

## 🔐 Zmienne środowiskowe

| Zmienna | Opis |
|---|---|
| `VITE_SUPABASE_URL` | URL projektu Supabase |
| `VITE_SUPABASE_ANON_KEY` | Klucz publiczny Supabase (anon) |

## 🚢 Deploy (Vercel)

```bash
npx vercel --prod
```

Security headers skonfigurowane w `vercel.json`.

## 📧 Formularz kontaktowy

Dane trafiają do tabeli `contact_messages` w Supabase z RLS:
- **Anonimowi** mogą tylko INSERT
- **Właściciel** czyta wszystkie wiadomości z Dashboard
- **Honeypot field** blokuje boty
- **Zod validation** — client + server side
