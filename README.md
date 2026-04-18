# Producktive

Business website and knowledge base for a digital services freelancer. Built with **Nuxt 3**, **Vue 3 Composition API**, **TypeScript**, and **Tailwind CSS**.

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | [Nuxt 3](https://nuxt.com) | SSR/SSG, file-based routing, auto-imports |
| UI | [Tailwind CSS](https://tailwindcss.com) + `@tailwindcss/typography` | Utility-first styling, prose for markdown |
| CMS | [Directus](https://directus.io) (headless) | Knowledge base content (series, posts, categories) |
| Database | [Supabase](https://supabase.com) (PostgreSQL) | Contact form submissions, file storage |
| i18n | `@nuxtjs/i18n` | Polish (default) + English, lazy-loaded JSON |
| SEO | `@nuxtjs/seo` + Schema.org | Meta tags, structured data, breadcrumbs |
| Fonts | `@nuxt/fonts` via Bunny CDN | Plus Jakarta Sans, Inter, DM Mono (self-hosted) |
| PWA | `@vite-pwa/nuxt` | Offline support, manifest, service worker |
| Markdown | `marked` + `highlight.js` | Post content rendering with syntax highlighting |
| Validation | `zod` | Server + client-side form validation |
| Utilities | `@vueuse/core` | localStorage, intersection observer helpers |
| Hosting | [Vercel](https://vercel.com) | Serverless deployment with Nitro preset |

## Project Structure

```
producktive/
├── app.vue                  # Root component (locale, PWA manifest)
├── nuxt.config.ts           # Nuxt configuration
├── tailwind.config.ts       # Brand design tokens (colors, fonts, shadows)
├── vercel.json              # Security headers + deployment config
│
├── app/
│   └── router.options.ts    # Scroll behavior (smooth scroll to top)
│
├── assets/css/
│   └── main.css             # Global styles, reveal animations, utilities
│
├── components/
│   ├── blog/                # Knowledge base components
│   │   ├── MarkdownContent.vue   # Renders markdown with syntax highlighting
│   │   ├── PostCard.vue          # Individual post card with read tracking
│   │   └── SeriesCard.vue        # Series card with progress bar
│   ├── layout/
│   │   ├── NavBar.vue            # Route-aware navigation
│   │   └── FooterSection.vue     # Footer with section links
│   ├── sections/            # Landing page sections
│   │   ├── Hero.vue         # Hero banner
│   │   ├── TrustBar.vue     # Social proof
│   │   ├── About.vue        # About section
│   │   ├── Services.vue     # Service offerings
│   │   ├── Process.vue      # Work process
│   │   ├── Portfolio.vue    # Project showcases
│   │   ├── Community.vue    # Community links
│   │   └── Contact.vue      # Contact form
│   └── ui/                  # Reusable UI widgets
│       ├── ContactPopup.vue # Quick contact modal
│       ├── CookieConsent.vue# GDPR cookie banner
│       ├── LofiPlayer.vue   # Background music player
│       └── ScrollButtons.vue# Scroll-to-top/bottom buttons
│
├── composables/
│   ├── useContactForm.ts    # Form state, zod validation, API submission
│   ├── useDirectus.ts       # Directus CMS data layer (with static fallback)
│   └── useReadProgress.ts   # localStorage read tracking per post
│
├── data/
│   └── pinia-series.ts      # Static fallback data (series + posts + categories)
│
├── i18n/locales/
│   ├── pl.json              # Polish translations (default)
│   └── en.json              # English translations
│
├── layouts/
│   └── default.vue          # Shell: NavBar, main, Footer, UI overlays
│
├── pages/
│   ├── index.vue            # Landing page (all sections)
│   ├── polityka-cookies.vue # Cookie policy
│   ├── polityka-prywatnosci.vue # Privacy policy
│   └── wiedza/              # Knowledge base
│       ├── index.vue        # Category → subcategory → series listing
│       └── [series]/
│           ├── index.vue    # Series detail (post list + progress)
│           └── [slug].vue   # Single post (markdown content)
│
├── server/api/
│   ├── contact.post.ts      # Contact form endpoint (Supabase insert)
│   └── upload.post.ts       # File upload endpoint (Supabase Storage)
│
├── types/
│   └── blog.ts              # BlogPost, BlogSeries, BlogCategory interfaces
│
└── public/
    └── llms.txt             # LLM-readable site description
```

## Architecture

### Data Flow

```
Directus CMS ──→ useDirectus.ts ──→ Pages (SSR) ──→ Components (presentational)
                       ↕
              Static fallback data
              (data/pinia-series.ts)
```

**`useDirectus`** is the single data access layer. It fetches from Directus when `NUXT_PUBLIC_DIRECTUS_URL` is set, otherwise returns static fallback data. All Directus requests go through a shared `fetchFromDirectus()` helper that returns `null` on failure.

### Knowledge Base Hierarchy

```
Category (knowledge_categories)    e.g. "Techniczne"
  └── Subcategory (series.subcategory)  e.g. "vue"
        └── Series (knowledge_series)        e.g. "Pinia od A do Z"
              └── Post (knowledge_posts)          e.g. "Czym jest Pinia?"
```

- **Categories** define top-level sections on `/wiedza` (fetched from Directus or static fallback)
- **Series** belong to a category and optionally have a `subcategory` tag for visual grouping
- **Posts** belong to a series, ordered by `sort`, with per-post read tracking via localStorage

### Component Pattern

- **Pages** = smart containers (data fetching, SEO, layout)
- **Components** = presentational (props in, events out)
- **Composables** = shared logic (single responsibility)

### Contact Form Flow

```
ContactPopup / Contact section
  → useContactForm (zod validation)
    → POST /api/contact (server-side zod re-validation)
      → Supabase (contact_messages table)
```

Honeypot field for anti-spam. Server silently accepts honeypot submissions without storing.

## Pages & Routing

| Route | Description |
|---|---|
| `/` | Landing page with all sections |
| `/wiedza` | Knowledge base — categories and series |
| `/wiedza/:series` | Series detail — post list with progress |
| `/wiedza/:series/:slug` | Single post — markdown content |
| `/polityka-prywatnosci` | Privacy policy |
| `/polityka-cookies` | Cookie policy |
| `/en/...` | English locale (prefix strategy) |

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NUXT_PUBLIC_DIRECTUS_URL` | No | Directus API URL. When empty, static fallback data is used |
| `SUPABASE_URL` | Yes* | Supabase project URL (server-side only) |
| `SUPABASE_SERVICE_KEY` | Yes* | Supabase service role key (server-side only) |
| `NUXT_PUBLIC_SUPABASE_URL` | No | Supabase URL (client-side, for future use) |
| `NUXT_PUBLIC_SUPABASE_ANON_KEY` | No | Supabase anon key (client-side, for future use) |
| `NUXT_PUBLIC_CAL_URL` | No | Cal.com booking link |
| `NUXT_PUBLIC_SITE_URL` | No | Canonical site URL (defaults to `https://producktive.pl`) |
| `RESEND_API_KEY` | No | Resend API key (email notifications) |

\* Required only when contact form is active.

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type checking
pnpm typecheck
```

## Design Tokens

Defined in `tailwind.config.ts`:

- **Colors**: `brand-primary` (neon cyan `#00E5FF`), `brand-accent` (gold `#D4AF37`), `brand-dark` (deep `#0a0e14`), `brand-card` (`#161B22`)
- **Fonts**: Plus Jakarta Sans (headings), Inter (body), DM Mono (code)
- **Shadows**: `shadow-brand`, `shadow-card`, `shadow-card-hover`

## Security

- Server-side validation with `zod` on all API endpoints
- Honeypot anti-spam on contact form
- File upload: MIME type allowlist, 5 MB limit, filename sanitization
- Supabase service key used only server-side (`runtimeConfig`, not `public`)
- Security headers via `vercel.json`: HSTS, X-Frame-Options DENY, CSP-adjacent protections
- No sensitive data in client bundle or Git history

## Deployment

Deployed on **Vercel** with the `vercel` Nitro preset.

- SSR enabled for `/wiedza/**` routes (dynamic content)
- All other routes are prerendered at build time
- PWA service worker with runtime caching for fonts

## 🎯 Portfolio Strategy 

Sekcja portfolio używa 3 typów projektów — **jawnie oznaczonych**:
- 🎨 **Projekty koncepcyjne** — realne buildy dla klientów
- 🏢 **Praca korporacyjna** — anonimizowane case studies
- ⚡ **Własne projekty** — ta strona + własne narzędzia

Transparentność = zaufanie. Nie ukrywaj braku klientów, zamień to w atut.