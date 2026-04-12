# Portfolio Case Study — Producktive

> Dokument pomocniczy: jak opisać ten projekt klientom i jak zbudować sekcję portfolio.

---

## 1. Stack technologiczny (technicznie)

| Warstwa | Technologia | Rola |
|---|---|---|
| **Frontend** | Vue 3 + TypeScript | Interfejs użytkownika |
| **Bundler** | Vite | Szybki build i HMR w dev |
| **Styling** | TailwindCSS | Utility-first CSS, responsive |
| **Animacje** | @vueuse/motion | Płynne animacje przy wejściu elementów |
| **Walidacja** | Zod | Walidacja formularzy po stronie klienta |
| **Backend** | Supabase (PostgreSQL + Edge Functions) | Baza danych + serverless API |
| **Hosting** | Vercel | CDN, auto-deploy z gita |
| **Formularz** | Własna composable + Supabase Function | Wysyłka i powiadomienia e-mail |

---

## 2. Język marketingowy — co powiedzieć klientowi

### Nagłówek karty projektu
> **Producktive** — moja własna strona usługowa, zbudowana od zera jako pokaz możliwości i testbed najlepszych praktyk.

### Opis benefitów — zamiast mówić o technologii, mów o efektach

| Zamiast powiedzieć... | Powiedz klientowi... |
|---|---|
| „Użyłem Vue 3 i Vite" | „Strona ładuje się w mniej niż 1 sekundę — użytkownik nie ucieka przed załadowaniem." |
| „Tailwind CSS, mobile-first" | „Wygląda perfekcyjnie na każdym urządzeniu — telefonie, tablecie, komputerze — bez dodatkowych kosztów." |
| „Zod walidacja formularzy" | „Formularz kontaktowy nie przepuści błędnych danych — mniej spamu, więcej prawdziwych leadów." |
| „Supabase Edge Functions" | „Powiadomienia e-mail po wypełnieniu formularza docierają natychmiastowo — nie tracisz żadnego zapytania." |
| „Deploy na Vercel z CDN" | „Strona dostępna globalnie, z automatycznymi aktualizacjami — zero przestojów, zero ręcznego uploadowania." |
| „TypeScript + code splitting" | „Kod jest odporny na błędy i gotowy na rozbudowę — za rok dodajesz nową sekcję bez przepisywania wszystkiego od nowa." |
| „Scroll reveal + animacje" | „Strona żyje i prowadzi wzrok użytkownika — to nie jest statyczny dokument, to doświadczenie." |
| „Custom cursor + micro-interactions" | „Szczegóły, które budują prestiż marki — klienci zapamiętują tę stronę." |

### Gotowy opis do sekcji portfolio

> **Producktive — strona usługowa**
>
> Projekt własny stworzony jako wzorzec dla klientów — strona, którą sam chciałbym dostać jako efekt końcowy. Zbudowana z myślą o szybkości, konwersji i imponowaniu. Ładuje się błyskawicznie dzięki optymalizacji kodu, wygląda idealnie na każdym urządzeniu, a formularz kontaktowy działa 24/7 — każde zapytanie trafia do skrzynki e-mail w sekundy. Kod pisany w TypeScript gwarantuje łatwą rozbudowę w przyszłości.
>
> **Efekty:** Lighthouse 95+, mobile-first, formularz z natychmiastowymi powiadomieniami, animacje zwiększające czas spędzony na stronie.
>
> **Stack:** Vue 3, TailwindCSS, Supabase, Vercel

---

## 3. Wyniki / metryki do pokazania (wypełnij po audycie Lighthouse)

```
Wydajność:     __ / 100
Dostępność:    __ / 100
SEO:           __ / 100
Best Practices: __ / 100
```

Możesz uruchomić audyt: `npx lighthouse https://twojadomena.pl --view`

---

## 4. UX projektu karty portfolio — jak to zbudować dobrze

### Wariant A — Karta z hover (kafelek)

**Kiedy używać:** gdy masz dużo projektów, chcesz zwartego gridu.

**Struktura karty:**
```
┌─────────────────────────────────┐
│  [Miniatura / screenshot]       │  ← aspect-ratio: 16/9, object-fit: cover
│  [Overlay z nazwą + tagami]     │  ← fade-in on hover, bg: gradient dark
├─────────────────────────────────┤
│  Tytuł projektu          [tag]  │
│  Krótki opis (2 zdania max)     │
│  [Vue3] [Supabase] [Vercel]     │  ← pill badges
│  ─────────────────────────────  │
│  [🔗 Demo]         [📋 Case]   │  ← 2 CTA obok siebie
└─────────────────────────────────┘
```

**Dobre praktyki:**
- Hover: obraz lekko skaluje się (`scale-105`) + pojawia overlay z krótkim CTA "Zobacz projekt"
- Nie chowaj treści wyłącznie za hover — mobile nie ma hover, użyj go jako wzmocnienie
- Dodaj `group` w Tailwind + `group-hover:` dla efektów potomnych elementów
- `transition: all 300ms ease` — nie szybciej (irytuje), nie wolniej (nudzi)
- Label (np. "Projekt koncepcyjny") — zawsze widoczny, nie chowany

---

### Wariant B — Duża karta z headerem (podgląd + opis pod spodem) ✅ Rekomendowany

**Kiedy używać:** gdy chcesz pokazać 3–5 wyróżnionych projektów z detalami.

**Struktura karty:**
```
┌─────────────────────────────────────────────┐
│                                             │
│         [Screenshot/preview strony]         │  ← górna połowa
│         Mocked browser chrome (opcja)       │
│                                             │
├─────────────────────────────────────────────┤
│  [Badge: Projekt koncepcyjny / Live]        │
│  Tytuł projektu                             │  ← font-bold, duży
│  Opis — 2–3 zdania, co robi, dla kogo      │
│                                             │
│  Rezultaty:                                 │
│  ⚡ Lighthouse 95+   📱 Mobile-first        │
│  🔗 Demo dostępne                           │
│                                             │
│  [Vue3] [Supabase] [TailwindCSS]           │  ← tech stack pills
│  ─────────────────────────────────────────  │
│  [Zobacz demo →]          [Case study →]   │
└─────────────────────────────────────────────┘
```

**Dobre praktyki UX:**

#### Header (obraz)
- Użyj screenshota w "browser chrome" (ramka laptopa lub przeglądarki) — +20% zaufania
- Jeśli nie masz screenshota: możesz użyć gradient placeholder z logo/nazwą projektu
- Dodaj `overflow: hidden` + `border-radius` na kontenerze obrazu
- Lightbox na kliknięcie w obraz (do powiększenia podglądu)

#### Etykiety / labele
- Zawsze widoczny badge z typem projektu (koncepcyjny / korporacyjny / live)
- Kolor badge informuje: zielony = live, niebieski = koncepcja, szary = korporacyjny
- To buduje zaufanie — klient nie czuje się oszukany

#### Rezultaty / metryki
- Konkretne liczby > ogólne słowa: "Lighthouse 95/100" > "szybka strona"
- Max 3 bullet points — więcej = przytłoczenie
- Użyj ikon emoji lub svg icons dla szybkiego skanowania

#### Tech stack pills
- Małe, subtelne — klient nie musi tego rozumieć
- Możesz dodać tooltip z wyjaśnieniem: `Vue 3 = nowoczesny framework JS`
- Nie więcej niż 4–5 tagów

#### CTA (call to action)
- Dwa przyciski: primary (demo) + secondary (case study / opis)
- Primary: `btn-primary` z strzałką → lub ikoną zewnętrznego linka
- Secondary: `btn-ghost` lub `text-link`
- Jeśli nie ma demo: jeden przycisk "Porozmawiaj o podobnym projekcie →" jako CTA do kontaktu

---

### Dostępność (WCAG AA)
- `alt` na każdym screenshocie: `alt="Strona producktive.pl — projekt koncepcyjny agencji webowej"`
- Kontrast tekstu na overlay min. 4.5:1
- Cały kafelek / karta ma `role="article"` lub jest w `<article>`
- Focus visible na CTA (outline: 2px solid brandColor)
- Linki mają sensowny `aria-label`: `aria-label="Zobacz demo projektu ZenBarber"` (nie samo "Kliknij tu")
- Animacje: respektuj `prefers-reduced-motion` — brak scale i slide dla osób wrażliwych

---

### Responsywność
```
Mobile  (< 640px): 1 kolumna, obraz pełna szerokość, opis pod
Tablet  (640–1024px): 2 kolumny
Desktop (> 1024px): 3 kolumny lub 2 duże karty
```
- Na mobile: obraz max 200px height, reszta to treść
- Nie ukrywaj opisu na mobile — jest tam najważniejszy

---

## 5. Przykładowy kod Tailwind (karta — wariant B)

```html
<article class="group bg-brand-card rounded-2xl overflow-hidden border border-white/5
                hover:border-brand-primary/30 transition-all duration-300
                hover:shadow-xl hover:shadow-brand-primary/10">

  <!-- Header: screenshot -->
  <div class="relative overflow-hidden aspect-video bg-brand-surface">
    <img
      src="/portfolio/producktive.jpg"
      alt="Strona producktive — projekt własny agencji webowej"
      class="w-full h-full object-cover object-top
             group-hover:scale-105 transition-transform duration-500"
    />
    <!-- Browser chrome overlay (opcjonalny) -->
    <div class="absolute top-0 left-0 right-0 h-6 bg-white/10 backdrop-blur-sm
                flex items-center gap-1.5 px-3">
      <span class="w-2.5 h-2.5 rounded-full bg-red-400/70" />
      <span class="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
      <span class="w-2.5 h-2.5 rounded-full bg-green-400/70" />
    </div>
  </div>

  <!-- Body -->
  <div class="p-6 flex flex-col gap-4">

    <!-- Badge -->
    <span class="badge w-fit">Projekt własny · Live</span>

    <!-- Tytuł + opis -->
    <div>
      <h3 class="font-display font-bold text-white text-xl mb-2">
        Producktive — strona agencji webowej
      </h3>
      <p class="text-brand-muted text-sm leading-relaxed">
        Strona usługowa zbudowana jako wzorzec jakości.
        Formularz z automatycznymi powiadomieniami, animacje i wyniki Lighthouse 95+.
      </p>
    </div>

    <!-- Rezultaty -->
    <ul class="flex flex-wrap gap-2 text-sm text-brand-muted">
      <li>⚡ Lighthouse 95+</li>
      <li>📱 Mobile-first</li>
      <li>📩 Formularz live</li>
    </ul>

    <!-- Stack tags -->
    <div class="flex flex-wrap gap-2">
      <span class="px-2 py-1 text-xs rounded-md bg-brand-surface text-brand-muted
                   border border-white/5">Vue 3</span>
      <span class="px-2 py-1 text-xs rounded-md bg-brand-surface text-brand-muted
                   border border-white/5">Supabase</span>
      <span class="px-2 py-1 text-xs rounded-md bg-brand-surface text-brand-muted
                   border border-white/5">Vercel</span>
    </div>

    <!-- CTA -->
    <div class="flex gap-3 pt-2 border-t border-white/5 mt-auto">
      <a href="https://producktive.pl" target="_blank" rel="noopener"
         aria-label="Zobacz demo strony Producktive"
         class="btn-primary text-sm flex-1 text-center">
        Zobacz demo →
      </a>
      <button class="btn-ghost text-sm px-4"
              aria-label="Zamów podobny projekt">
        Podobny projekt
      </button>
    </div>

  </div>
</article>
```

---

## 6. Checklist przed opublikowaniem karty portfolio

- [ ] Screenshot aktualny i wysokiej jakości (min. 1280×720)
- [ ] Badge z typem projektu widoczny
- [ ] Opis napisany językiem korzyści, nie technologii
- [ ] Konkretne metryki (Lighthouse, czas ładowania, liczba użytkowników)
- [ ] Demo działa (sprawdź link przed wdrożeniem)
- [ ] alt tekst na obrazie
- [ ] Focus state na CTA (tab przez klawiaturę)
- [ ] Karta prezentuje się dobrze na mobile (sprawdź w DevTools)
- [ ] `prefers-reduced-motion` obsłużony dla animacji
