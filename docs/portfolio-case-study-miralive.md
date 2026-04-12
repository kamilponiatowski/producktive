# Miralive — Case Study dla Portfolio Webdevelopera

> Dokument roboczy: jak opisać ten projekt klientom, jakie technologie zastosowano
> i jak zbudować sekcję portfolio/case-study na własnej stronie.

---

## 1. Stack technologiczny — co kryje się pod maską

| Warstwa | Technologia | Wersja |
|---|---|---|
| Framework | **Nuxt 4** (Vue 3) | ^4.4 |
| Stylowanie | **TailwindCSS v4** | ^4.2 |
| Typing | **TypeScript** | full coverage |
| SEO moduł | **@nuxtjs/seo** | ^5.1 |
| OG Images | **nuxt-og-image** + Satori | ^6.3 |
| Optymalizacja obrazów | **@nuxt/image** (WebP/AVIF) | ^2.0 |
| Fonty | **@nuxt/fonts** via Bunny | ^0.14 |
| Dark mode | **@nuxtjs/color-mode** | ^4.0 |
| Email transakcyjny | **Resend** API | ^6.10 |
| Analytics | Google Analytics GA4 | — |
| Ikony | Lucide via **@nuxt/icon** | ^2.2 |
| Dane strukturalne | Schema.org JSON-LD (LocalBusiness) | — |
| Architektura | Nuxt Layers (core + seo) | — |
| Deployment | Static Generation (`nuxt generate`) | — |

### Czego NIE ma (i dlaczego to zaleta)

- Brak bazy danych → zero kosztów serwera, zero ryzyka SQL injection
- Brak WordPressa → zero wtyczek do aktualizowania co miesiąc
- Brak płatnych page-builderów → pełna kontrola nad każdym pikselem

---

## 2. Co dostał klient — lista konkretnych funkcji

```
✅ Strona główna z hero + animowanym marquee partnerów
✅ Siatka usług z rozwijalnymi detalami (6 kategorii)
✅ Status otwarcia firmy w czasie rzeczywistym (live badge)
✅ Formularz kontaktowy → email na skrzynkę klienta (Resend)
✅ Dark mode / Light mode (automatycznie dopasowany do OS)
✅ Glassmorphism nav (sticky, z blur)
✅ OG Images generowane automatycznie (social media gotowe)
✅ Sitemap XML + robots.txt (SEO)
✅ Schema.org LocalBusiness (wbite w kod, nie wymaga pluginów)
✅ Cookie Consent Banner (RODO/GDPR)
✅ llms.txt (widoczność w asystentach AI)
✅ Responsywność mobile-first
✅ Fonty z Bunny (prywatność — bez Google Fonts)
✅ Dostępność: skip-to-content, WCAG AA kontrast
✅ Inline SVG logo (skalowalne, brak żądań HTTP)
✅ Szybkość: pre-rendered HTML, obrazy WebP/AVIF
```

---

## 3. Język marketingowy — jak to opowiedzieć klientowi

### Nagłówek (hero projektu w portfolio)

> **Miralive — Nowoczesna strona agencji ubezpieczeniowej**
> Błyskawiczna, widoczna w Google, gotowa na AI.

### Krótki opis (2–3 zdania, styl "what & why")

> Zbudowałem od zera stronę wizytówkową dla agencji ubezpieczeniowej ze Włocławka.
> Priorytetem było SEO i wiarygodność — klient chciał, żeby klienci znajdowali go
> sami, bez płatnych reklam. Efekt: w pełni statyczna strona, która ładuje się
> w ułamku sekundy i jest już zindeksowana przez Google.

### Benefity — język sprzedażowy (dla Twoich ofert)

| Co dostaje klient | Jak to powiedzieć |
|---|---|
| SSG (pre-rendered HTML) | „Twoja strona ładuje się szybciej niż konkurencja — Google nagradza to wyższą pozycją." |
| Schema.org + @nuxtjs/seo | „SEO wbudowane w kod — nie musisz płacić za żadne wtyczki ani comiesięczne audyty." |
| Automatyczne OG Images | „Każdy post udostępniony na Facebooku czy LinkedIn wygląda profesjonalnie — bez ręcznej pracy." |
| Resend email API | „Formularz kontaktowy trafia prosto do Twojej skrzynki — bez spamu, bez gubienia zapytań oferowanych przez hosting." |
| Dark mode | „Strona dostosowuje się do preferencji odwiedzającego — to standard, który buduje pierwsze wrażenie." |
| Brak bazy danych | „Zero utrzymania serwera, zero hacków WordPressa — prostszy stack = mniej awarii i niższy rachune hostingowy." |
| Cookie banner + llms.txt | „Spełniasz RODO i jesteś widoczny nawet w odpowiedziach ChatGPT czy Gemini." |
| Nuxt Layers (core/seo) | „Gdy będziesz chciał zmienić markę lub dodać język — zmiana w jednym miejscu rozchodzi się po całej stronie." |

### Pytania które musisz zadać, zanim je zadadzą

- *„Ile kosztuje utrzymanie?"* → Hosting statyczny: od 0 zł (Vercel/Netlify free tier) do kilkudziesięciu zł/mies.
- *„Czy sam mogę edytować treści?"* → Tak, po krótkim onboardingu. Możliwa integracja CMS (np. Nuxt Content).
- *„Czy Google to znajdzie?"* → Jest sitemap XML, robots.txt, pełne meta tagi i structured data — tak.
- *„Czy zadziała na telefonie?"* → Mobile-first, responsywny na każdym urządzeniu.

---

## 4. UX Thinking — jak zbudować sekcję portfolio / realizacje

Są dwa dominujące wzorce:

---

### Wzorzec A: Hover Tile (Kafelek z efektem hover)

**Kiedy stosować:** gdy masz dużo projektów (5+) i chcesz pokazać przegląd.

**Schemat karty:**
```
┌───────────────────────────────────────┐
│                                       │
│     [Podgląd strony — screenshot]     │  ← aspect-ratio: 16/9
│                                       │
│  ----------------------------------------  ← hover: lekki scale + shadow
│  🏷 [Tag: Branża / Typ]               │
│  Nazwa projektu                       │
│  Krótki opis jednolinijkowy           │
└───────────────────────────────────────┘
```

**Interakcja (hover):**
- `transform: scale(1.02)` na karcie
- screenshot pod-slide: obok zjawiają się ikony tech stack (np. Nuxt, TailwindCSS)
- `box-shadow` rośnie (efekt unoszenia)
- Overlay z przyciskiem „Zobacz projekt" przykrywający część obrazu

**Układ siatki:**
```css
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
gap-6
```

---

### Wzorzec B: Karta Realizacji (Header z podglądem + ciało z opisem)

**Kiedy stosować:** gdy chcesz pokazać 1–4 najlepsze projekty z pełnym storytellingiem.

**Schemat:**
```
┌─────────────────────────────────────────────────┐
│                                                 │
│   ┌─────────────────────────────────────────┐  │  ← bg: brand-subtle
│   │                                         │  │
│   │     [Screenshot / mockup strony]        │  │  ← rounded-t-2xl
│   │     (np. MacBook frame lub plain img)   │  │
│   │                                         │  │
│   └─────────────────────────────────────────┘  │
│                                                 │
│  ── ── ── ── ── ── ── ── ── ── ── ── ── ── ──  │
│                                                 │
│  Branża: Ubezpieczenia ·  Rok: 2026             │  ← muted tag line
│                                                 │
│  ## Miralive — nowoczesna agencja               │  ← tytuł h3
│  ubezpieczeniowa                                │
│                                                 │
│  Krótki opis projektu, problem klienta          │  ← 2–3 zdania
│  i rozwiązanie.                                 │
│                                                 │
│  ─────────────────────────────────────          │
│  ✅ Szybkość ładowania < 1s                     │  ← lista benefitów
│  ✅ SEO: meta, sitemap, Schema.org              │     (nie: "użyłem Nuxt")
│  ✅ Dark mode + responsywność                   │     (tak: co to daje)
│  ✅ Formularz → email bez serwera               │
│  ─────────────────────────────────────          │
│                                                 │
│  [Lucide icons: Nuxt | Tailwind | TypeScript]   │  ← tech stack jako ikony
│                                                 │
│  [  Zobacz stronę  →  ]  [  GitHub  ]           │  ← CTA przyciski
│                                                 │
└─────────────────────────────────────────────────┘
```

---

### Zasady UX dla obu wzorców

#### Treść: mów językiem wyników, nie narzędzi

| ❌ Źle (dla dewelopera) | ✅ Dobrze (dla klienta) |
|---|---|
| „Użyłem Nuxt 4 z SSG" | „Strona ładuje się w < 1 sekundę" |
| „Schema.org JSON-LD" | „Google widzi dane firmy: adres, godziny, usługi" |
| „Resend API" | „Zapytania od klientów trafiają od razu do skrzynki" |
| „@nuxtjs/color-mode" | „Dark mode — wygodny dla oczu, nowoczesny" |

#### Hierarchia wizualna karty

1. **Wzrok trafia najpierw na screenshot** — to jedyny element, który klient "czuje" zanim przeczyta
2. **Tytuł** — nazwa projektu + czym jest
3. **Lista benefitów** — konkretne, skrótowe (max 4–5 punktów, emoji lub checkbox)
4. **Tech stack** — ikony technologii (na końcu, nie na początku)
5. **CTA** — jeden główny link do strony

#### Screenshot / podgląd strony

- Użyj pełnego screenshotka desktop (1440px szerokość) — narzędzie: np. `puppeteer`, Screely, Shots.so
- Alternatywa: mockup w ramce MacBooka/iPhone'a (np. Figma Community frames)
- Nie używaj placeholdera — pusta karta zabija wiarygodność
- Proporcje: `aspect-[16/10]` lub `aspect-[4/3]`, `object-cover`, `object-top`

#### Animacje: celowo, nie dla ozdoby

```css
/* Karta */
.project-card {
  transition: transform 300ms ease, box-shadow 300ms ease;
}
.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.12);
}

/* Screenshot - zoom przy hoverze */
.project-card:hover .project-img {
  transform: scale(1.03);
  transition: transform 600ms ease;
}
```

#### Responsywność sekcji portfolio

```
Mobile:  1 kolumna, karty jedna pod drugą
Tablet:  2 kolumny (md:grid-cols-2)
Desktop: 2 lub 3 kolumny zależnie od liczby projektów
         При 1 projekcie prominentnym: asymetryczny layout (col-span-2)
```

#### Micro-interactions do rozważenia

- **Badge technologii** przy hover ujawnia tooltip z nazwą technologii
- **Screenshot overlay** przy hover: rozmycie + przycisk "Zobacz stronę"
- **Tech stack ikony** wjeżdżają z opacity 0 → 1 po 150ms delay (staggered)
- **Progress bar** pod kartą (np. "Mobile performance: 98/100") — buduje wiarygodność liczbami

---

## 5. Copywriting — fragmenty gotowe do wklejenia

### Section header (nagłówek sekcji portfolio)

```
Realizacje

Strony, które działają — nie tylko wyglądają
Każdy projekt to rozwiązanie konkretnego problemu klienta.
Nie szablony. Kod pisany od zera.
```

### Opis projektu Miralive (gotowy do wklejenia)

```
Miralive — Agencja Ubezpieczeniowa
Ubezpieczenia • 2026 • miralive.pl

Mirosława Poniatowska prowadziła agencję ubezpieczeniową od lat,
ale jej strona nie oddawała jakości usług, które oferuje.
Potrzebowała witryny, która buduje zaufanie zanim klient odebrze telefon.

Zbudowałem w pełni statyczną stronę z kompletnym SEO,
formularzem kontaktowym przekazującym zapytania na email
i systemem aktualizacji danych firmy w jednym pliku.
Klientka sama może zmienić godziny otwarcia, usługi czy partnerów —
bez edytora, bez logowania.

✅ Google widzi firmę: adres, godziny, usługi (Schema.org)
✅ Formularz → email bez serwera i bez filtrów antyspamowych
✅ Dark mode i responsywność — na każdym urządzeniu
✅ Ładuje się w ułamku sekundy (pre-rendered HTML)
✅ RODO: baner cookies + polityka prywatności
```

---

## 6. Metryki do pokazania (jeśli masz dane)

- Lighthouse Performance score (cel: 95+)
- Lighthouse SEO score (cel: 100)
- Czas First Contentful Paint (cel: < 1s)
- Google PageSpeed Insights screenshot

> Wskazówka: zrób screena PageSpeed zaraz po deploymencie — to jeden z najsilniejszych
> dowodów społecznych jakie możesz pokazać klientowi.
