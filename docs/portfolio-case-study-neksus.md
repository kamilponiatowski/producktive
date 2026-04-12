# Case Study: neksus.pl — materiały do portfolio i sekcji realizacji

## 1. Stack technologiczny

| Warstwa | Technologia | Wersja |
|---|---|---|
| Framework | **Nuxt 4** (Vue 3) | 4.4+ |
| Język | **TypeScript** | strict |
| Styling | **Tailwind CSS v4** (Vite plugin) | 4.2 |
| CMS / Content | **@nuxt/content v3** (Markdown + SQLite) | 3.12 |
| SEO | **@nuxtjs/seo** (sitemap, robots, schema.org, OG) | 5.1 |
| Obrazy | **@nuxt/image** (WebP/AVIF, lazy, responsive) | 2.0 |
| Fonty | **@nuxt/fonts** (self-hosted, zero CLS) | 0.14 |
| Ikony | **@nuxt/icon** + Lucide + Simple Icons | 1.12 |
| Dark mode | **@nuxtjs/color-mode** (system preference) | 4.0 |
| Architektura | **Nuxt Layers** (core, seo — separacja logiki) | — |
| Formularz | **FormSubmit.co** (AJAX, bez backendu) | — |
| Deploy | **SSG (Static Site Generation)** — pełny prerender | — |
| Package manager | **pnpm** + workspace | — |

### Architektura warstw (Nuxt Layers)

```
layers/
  core/   → composables: useBusinessData, useOpenStatus (centralne dane firmy)
  seo/    → composables: useNeksusSchema (Schema.org LocalBusiness)
```

---

## 2. Co stara strona miała vs co dostał klient

### Stara strona (Joomla, ~2012)
- HTML generowany przez Joomla CMS
- jQuery 1.6.4 + MooTools (dwa frameworki JS jednocześnie!)
- Nivo Slider (ciężki plugin do slidera)
- Brak responsywności (fixed 940px)
- Brak HTTPS
- Brak dark mode
- Brak Schema.org / structured data
- Brak optymalizacji obrazów
- Prymitywny cookie banner (document.cookie inline)
- Meta keywords (ignorowane przez Google od 2009)
- Przestarzały design, brak mobile-first

### Nowa strona (Nuxt 4 SSG)
- ✅ W pełni statyczna (SSG) — zero serwera, hostowanie na dowolnym CDN
- ✅ Responsywna (mobile-first, Tailwind CSS v4)
- ✅ Dark mode z wykrywaniem preferencji systemowych
- ✅ Schema.org LocalBusiness (lepsze wyniki w Google)
- ✅ Pliki `llms.txt` i `llms-full.txt` (gotowość na AI search)
- ✅ Optymalizacja obrazów (WebP/AVIF, lazy loading)
- ✅ Self-hosted fonty (zero CLS, brak zapytań do Google Fonts)
- ✅ Blog/porady z Markdown (CMS bez panelu — pliki w repo)
- ✅ Status "Otwarte/Zamknięte" w czasie rzeczywistym
- ✅ Popup kontaktowy z walidacją + formularz na stronie kontaktowej
- ✅ Pasek zaufanych marek (animowany marquee)
- ✅ Glassmorphism + micro-animacje (pulsujące CTA, glow)
- ✅ Centralny composable z danymi firmy (single source of truth)
- ✅ Cookie banner RODO-compliant z opcją odrzucenia
- ✅ Bento grid layout z kartami usług

---

## 3. Język korzyści dla klienta (gotowe do użycia)

### Nagłówek sekcji portfolio

> **Transformacja cyfrowa lokalnego biznesu**
> Od przestarzałej strony z 2012 roku do nowoczesnej wizytówki, która pracuje na klienta 24/7.

### Bullet points — korzyści biznesowe

- **Strona ładuje się błyskawicznie** — statyczny HTML serwowany z CDN, zero czekania na serwer. Klient nie traci odwiedzających przez wolne ładowanie.
- **Google widzi więcej** — Schema.org, sitemap, robots.txt, meta OG. Firma pojawia się w wynikach z adresem, godzinami otwarcia i oceną.
- **Gotowa na przyszłość AI** — pliki `llms.txt` sprawiają, że ChatGPT i inne AI poprawnie odpowiadają na pytania o firmę.
- **Działa na każdym urządzeniu** — responsywny design mobile-first. 60%+ ruchu to telefony — strona jest na to gotowa.
- **Tryb ciemny automatycznie** — respektuje ustawienia systemu użytkownika. Profesjonalny detal, który buduje zaufanie.
- **Klient widzi czy sklep jest otwarty** — status "Otwarte/Zamknięte" aktualizowany w czasie rzeczywistym z godzin pracy.
- **Blog buduje pozycję w Google** — artykuły poradnikowe (jak przyspieszyć komputer, czyszczenie laptopa) przyciągają ruch organiczny.
- **Formularz kontaktowy bez serwera** — wiadomości lecą prosto na e-mail firmy, zero kosztów utrzymania backendu.
- **Zero kosztów hostingu** — strona statyczna = hosting za darmo lub za grosze (Netlify, Vercel, GitHub Pages).
- **Łatwa aktualizacja treści** — nowy post na blogu = nowy plik Markdown, zero panelu CMS do nauki.

### Krótka wersja (pitch 1-zdaniowy)

> Przebudowałem stronę lokalnego serwisu komputerowego z przestarzałej Joomla na nowoczesny Nuxt 4 SSG — szybsza, widoczna w Google, gotowa na AI, z dark mode i blogiem. Zero kosztów serwera.

### Wersja rozszerzona (paragraf)

> Klient prowadził serwis komputerowy od 1996 roku, ale jego strona wyglądała jak z 2012. Przestarzały Joomla, jQuery + MooTools, brak responsywności, brak SSL. Zaprojektowałem i zbudowałem od zera nowoczesną stronę w Nuxt 4 z pełnym SSG — strona generuje się jako statyczny HTML i może być hostowana za darmo. Dodałem Schema.org dla lepszych wyników w Google, pliki llms.txt dla wyszukiwarek AI, blog z poradami technicznymi, formularz kontaktowy, tryb ciemny i status otwarcia sklepu w czasie rzeczywistym. Architektura oparta na Nuxt Layers zapewnia czysty, skalowalny kod.

---

## 4. Wskazówki UX — jak zbudować sekcję realizacji / portfolio

### Rekomendowany layout: Karta z podglądem

```
┌──────────────────────────────────────────┐
│  ┌────────────────────────────────────┐  │  ← header: screenshot strony
│  │     Screenshot / podgląd strony    │  │    (np. mockup w ramce laptopa
│  │     (hover → subtle zoom/parallax) │  │     lub telefonu)
│  └────────────────────────────────────┘  │
│                                          │
│  🏷️ Nuxt · SSG · Tailwind · SEO         │  ← tagi technologii (Badge)
│                                          │
│  Neksus — Serwis komputerowy             │  ← tytuł projektu
│  Gdańsk                                  │
│                                          │
│  Transformacja starej strony Joomla      │  ← krótki opis (2-3 zdania)
│  na nowoczesny SSG z SEO i dark mode.    │
│                                          │
│  ✅ 100% statyczna    ✅ Schema.org      │  ← 3-4 kluczowe korzyści
│  ✅ Dark mode         ✅ AI-ready        │    (ikona + krótka fraza)
│                                          │
│  [ Zobacz case study → ]                 │  ← CTA link
│                                          │
└──────────────────────────────────────────┘
```

### Interakcje (hover / focus)

| Element | Stan domyślny | Hover/Focus |
|---|---|---|
| **Cała karta** | `border-card-border`, `shadow-sm` | `translateY(-4px)`, `shadow-xl`, `border-brand` (subtelne podniesienie) |
| **Screenshot** | Statyczny obraz | `scale(1.03)` + `transition 300ms` (delikatny zoom) |
| **Tagi technologii** | `bg-brand-subtle`, `text-brand` | Lekki `brightness(1.1)` |
| **CTA link** | `text-brand` | `underline` + `translateX(4px)` strzałki (→) |
| **Focus (klawiatura)** | — | `ring-2 ring-brand ring-offset-2` (widoczny focus ring) |

### Zasady UX

1. **Hierarchia wizualna**: Screenshot zajmuje ~60% karty — to pierwsze co przyciąga wzrok. Tagi i tytuł pod spodem, korzyści w gridzie 2×2.

2. **Skanowanie wzrokiem (F-pattern)**: Nagłówek na górze, korzyści jako bullet/chip list, CTA na dole — naturalny flow czytania.

3. **Progressive disclosure**: Karta pokazuje minimum (screenshot + 3 zdania). Pełny case study dostępny po kliknięciu — nie przytłaczaj na liście.

4. **Social proof**: Dodaj element "klient od 1996" / "firma z 28+ letnim doświadczeniem" — buduje wiarygodność też dla Ciebie jako wykonawcy.

5. **Porównanie before/after**: Rozważ sekcję w case study ze screenshotem starej vs nowej strony obok siebie — wizualna siła transformacji.

6. **Responsywność karty**:
   - Desktop: grid 2-3 kolumny, karty obok siebie
   - Tablet: grid 2 kolumny
   - Mobile: jedna kolumna, full-width karty, screenshot proportional

7. **Lazy loading screenshotów**: Użyj `loading="lazy"` + `NuxtImg` z placeholderem blur — sekcja portfolio często jest poniżej fold.

8. **Animacja wejścia**: Karty wchodzą z `opacity: 0` + `translateY(20px)` przy scrollu (IntersectionObserver) — dodaje życia bez przesady.

### Przykładowa struktura danych (TypeScript)

```typescript
interface PortfolioProject {
  slug: string
  title: string
  client: string
  location: string
  screenshot: string           // ścieżka do screenshota
  screenshotAlt: string
  tags: string[]               // ['Nuxt', 'SSG', 'Tailwind', 'SEO']
  shortDescription: string     // 2-3 zdania na kartę
  benefits: {
    icon: string               // lucide icon name
    label: string              // np. "100% statyczna"
  }[]
  liveUrl?: string             // link do żywej strony
  caseStudyUrl?: string        // link do pełnego opisu
}
```

---

## 5. Metryki do pokazania (jeśli masz dane)

Rozważ dodanie tych metryk na karcie lub w case study — liczby przekonują:

- ⚡ **Lighthouse Performance**: 95-100 (SSG gwarantuje to)
- 📱 **Mobile-friendly**: 100% responsive
- 🔍 **SEO Score**: 90+ (schema.org, meta, sitemap, robots)
- 💰 **Koszt hostingu**: 0 zł/mies. (static hosting)
- 📦 **Bundle size**: zmierzony KB JavaScript-u
- 🕐 **TTFB**: <100ms (CDN + static HTML)
- 🤖 **AI-ready**: llms.txt zaimplementowany

---

## 6. Checklist — co warto jeszcze zrobić

- [ ] Zrób screenshot strony (desktop + mobile) do portfolio
- [ ] Zmierz Lighthouse score i zapisz wynik
- [ ] Porównaj PageSpeed starej vs nowej strony (before/after)
- [ ] Zbierz feedback od klienta (cytat/testimonial)
- [ ] Przygotuj mockup karty portfolio w Figma lub bezpośrednio w kodzie
