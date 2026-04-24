# Producktive — Podpis / Site Signature

Gotowy snippet do osadzenia na innych stronach lub w stopce e-maila.  
Wyświetla logo Producktive + link do strony w spójnym stylu marki.

---

## Użycie w stopce Vue / Nuxt (już dodane)

Podpis jest wbudowany w `components/layout/FooterSection.vue` i renderuje się automatycznie na dole każdej strony.

---

## Snippet HTML — e-mail / zewnętrzna strona

Wklej poniższy kod w stopce e-maila lub na dowolnej stronie HTML.  
Działa bez zewnętrznych zależności — czyste HTML + inline CSS.

```html
<!-- Producktive Site Signature -->
<table cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;">
  <tr>
    <td>
      <a
        href="https://producktive.pl"
        target="_blank"
        rel="noopener noreferrer"
        style="
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          text-decoration: none;
          font-family: 'Segoe UI', Arial, sans-serif;
          font-size: 12px;
          color: #8B8BA7;
        "
      >
        Stworzone z
        <span style="color: #D4AF37;">🧡</span>
        przez
        <img
          src="https://producktive.pl/logo.svg"
          alt="Producktive"
          width="16"
          height="16"
          style="display:inline-block;vertical-align:middle;border-radius:4px;"
        />
        <span style="color: #00E5FF; font-weight: 600;">Producktive</span>
      </a>
    </td>
  </tr>
</table>
```

---

## Wersja jasna (na białym tle)

Np. do użycia w systemach, które mają jasne tło.

```html
<!-- Producktive Signature — light background -->
<table cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;">
  <tr>
    <td>
      <a
        href="https://producktive.pl"
        target="_blank"
        rel="noopener noreferrer"
        style="
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 999px;
          border: 1px solid rgba(0,0,0,0.1);
          background: rgba(0,0,0,0.03);
          text-decoration: none;
          font-family: 'Segoe UI', Arial, sans-serif;
          font-size: 12px;
          color: #555;
        "
      >
        Made with
        <span style="color: #D4AF37;">🧡</span>
        by
        <img
          src="https://producktive.pl/logo.svg"
          alt="Producktive"
          width="16"
          height="16"
          style="display:inline-block;vertical-align:middle;border-radius:4px;"
        />
        <span style="color: #0a0e14; font-weight: 600;">Producktive</span>
      </a>
    </td>
  </tr>
</table>
```

---

## Kolory marki

| Token       | HEX       | Opis                   |
|-------------|-----------|------------------------|
| primary     | `#00E5FF` | neonowy cyan — akcent  |
| accent      | `#D4AF37` | złoto — premium        |
| dark        | `#0a0e14` | tło ciemne             |
| card        | `#161B22` | tło paneli             |
| muted       | `#8B8BA7` | tekst drugorzędny      |
| text        | `#f0f6fc` | główny jasny tekst     |

Logo dostępne publicznie: `https://producktive.pl/logo.svg`
