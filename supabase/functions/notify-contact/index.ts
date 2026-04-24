import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const NOTIFY_EMAIL   = Deno.env.get('NOTIFY_EMAIL')!    // Twój email
const CALENDLY_URL   = Deno.env.get('CAL_URL')!         // secret name: CAL_URL

const budgetLabels: Record<string, string> = {
  '3k5k':    '3 000 – 5 000 zł',
  '5k9k':    '5 000 – 9 000 zł',
  '9k15k':   '9 000 – 15 000 zł',
  'over15k': 'ponad 15 000 zł',
  'unknown': 'Nie określony',
}

// Brand design tokens (matching tailwind.config.ts)
const C = {
  dark:    '#0a0e14',
  card:    '#161B22',
  cardAlt: '#0d1117',
  primary: '#00E5FF',
  accent:  '#D4AF37',
  muted:   '#8B8BA7',
  text:    '#f0f6fc',
  border:  'rgba(255,255,255,0.06)',
}

const gradient = `linear-gradient(135deg, ${C.primary}, ${C.accent})`

// Inline SVG logo (base64) served from producktive.pl
const LOGO_URL = 'https://producktive.pl/logo.svg'

serve(async (req) => {
  try {
    const payload = await req.json()
    const msg     = payload.record
    const budgetLabel = budgetLabels[msg.budget] ?? msg.budget
    const firstName   = msg.name.split(' ')[0]
    const date        = new Date(msg.created_at).toLocaleString('pl-PL', { dateStyle: 'full', timeStyle: 'short' })
    const hasAttachment = !!msg.attachment_url

    // Detect phone number in message (e.g. from popup)
    const phoneMatch = msg.message.match(/(?:\+?\d[\s\-()]{0,2}){9,15}\d/)
    const phoneRaw   = phoneMatch ? phoneMatch[0].replace(/[\s\-()]/g, '') : null
    const phoneTel   = phoneRaw ? (phoneRaw.startsWith('+') ? phoneRaw : `+48${phoneRaw}`) : null

    // Render message with phone number as clickable tel: link
    const renderMessage = (text: string) => {
      if (!phoneMatch || !phoneTel) return text.replace(/\n/g, '<br>')
      return text
        .replace(/\n/g, '<br>')
        .replace(
          phoneMatch[0],
          `<a href="tel:${phoneTel}" style="color:${C.primary};text-decoration:none;font-weight:700;font-size:17px;">${phoneMatch[0]}</a>`,
        )
    }

    // ─────────────────────────────────────────────────────────
    // EMAIL 1 — DO CIEBIE: powiadomienie o nowym kliencie
    // ─────────────────────────────────────────────────────────
    const ownerEmail = `<!DOCTYPE html>
<html lang="pl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Nowe zapytanie — Producktive</title>
</head>
<body style="margin:0;padding:0;background:${C.dark};font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${C.dark};padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- HEADER -->
        <tr><td style="background:${gradient};padding:32px 36px;border-radius:16px 16px 0 0;">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-right:16px;" valign="middle">
                <img src="${LOGO_URL}" width="44" height="44" alt="Producktive" style="display:block;border-radius:10px;background:rgba(0,0,0,0.2);" />
              </td>
              <td valign="middle">
                <div style="color:white;font-size:11px;text-transform:uppercase;letter-spacing:2px;opacity:0.75;margin-bottom:4px;">Producktive</div>
                <h1 style="color:white;margin:0;font-size:22px;font-weight:700;letter-spacing:-0.5px;">
                  Nowe zapytanie od klienta
                </h1>
                <p style="color:rgba(255,255,255,0.75);margin:5px 0 0;font-size:13px;">${date}</p>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- BODY -->
        <tr><td style="background:${C.card};padding:32px 36px;">

          <!-- Dane klienta -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid ${C.border};">
                <span style="color:${C.muted};font-size:11px;text-transform:uppercase;letter-spacing:1px;">Imię i nazwisko</span><br>
                <span style="color:${C.text};font-size:16px;font-weight:600;margin-top:4px;display:block;">${msg.name}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid ${C.border};">
                <span style="color:${C.muted};font-size:11px;text-transform:uppercase;letter-spacing:1px;">Email</span><br>
                <a href="mailto:${msg.email}" style="color:${C.primary};font-size:15px;margin-top:4px;display:block;text-decoration:none;">${msg.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid ${C.border};">
                <span style="color:${C.muted};font-size:11px;text-transform:uppercase;letter-spacing:1px;">Usługa</span><br>
                <span style="color:${C.text};font-size:15px;margin-top:4px;display:block;">${msg.service}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 0;${hasAttachment ? `border-bottom:1px solid ${C.border};` : ''}">
                <span style="color:${C.muted};font-size:11px;text-transform:uppercase;letter-spacing:1px;">Budżet</span><br>
                <span style="color:${C.accent};font-size:16px;font-weight:700;margin-top:4px;display:block;">${budgetLabel}</span>
              </td>
            </tr>
            ${hasAttachment ? `
            <tr>
              <td style="padding:12px 0;">
                <span style="color:${C.muted};font-size:11px;text-transform:uppercase;letter-spacing:1px;">Załącznik</span><br>
                <a href="${msg.attachment_url}" target="_blank"
                   style="display:inline-flex;align-items:center;gap:6px;margin-top:6px;
                          color:${C.primary};font-size:14px;text-decoration:none;
                          background:rgba(0,229,255,0.08);border:1px solid rgba(0,229,255,0.25);
                          padding:8px 14px;border-radius:8px;font-weight:500;">
                  &#128206; Pobierz załącznik
                </a>
              </td>
            </tr>` : ''}
          </table>

          <!-- Wiadomość / telefon -->
          <div style="background:${C.cardAlt};border-left:3px solid ${C.primary};border-radius:0 8px 8px 0;padding:20px;margin-bottom:${phoneTel ? '16px' : '28px'};">
            <div style="color:${C.muted};font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">Wiadomość od klienta</div>
            <div style="color:#d8e4f0;font-size:15px;line-height:1.75;">${renderMessage(msg.message)}</div>
          </div>

          ${phoneTel ? `
          <!-- CTA zadzwoń -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr><td align="center">
              <a href="tel:${phoneTel}"
                 style="display:inline-block;background:${gradient};color:${C.dark};
                        padding:14px 28px;border-radius:10px;text-decoration:none;
                        font-weight:800;font-size:16px;letter-spacing:0.3px;">
                &#128222; Zadzwoń: ${phoneMatch![0]}
              </a>
            </td></tr>
          </table>` : ''}

          <!-- CTA Buttons -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" style="padding:0 6px 0 0;" width="50%">
                <a href="mailto:${msg.email}?subject=Re: Twoje zapytanie — Producktive&body=Cze%C5%9B%C4%87 ${encodeURIComponent(firstName)},%0A%0ADzi%C4%99kuj%C4%99 za wiadomo%C5%9B%C4%87!"
                   style="display:block;background:${gradient};color:${C.dark};
                          padding:14px 20px;border-radius:10px;text-decoration:none;font-weight:700;
                          font-size:14px;text-align:center;">
                  &#9993; Odpowiedz klientowi
                </a>
              </td>
              <td align="center" style="padding:0 0 0 6px;" width="50%">
                <a href="${CALENDLY_URL}"
                   style="display:block;background:${C.card};color:${C.primary};
                          border:1px solid rgba(0,229,255,0.3);
                          padding:14px 20px;border-radius:10px;text-decoration:none;font-weight:600;
                          font-size:14px;text-align:center;">
                  &#128197; Twój kalendarz
                </a>
              </td>
            </tr>
          </table>

        </td></tr>

        <!-- FOOTER -->
        <tr><td style="background:${C.dark};padding:20px 36px;border-radius:0 0 16px 16px;text-align:center;border-top:1px solid ${C.border};">
          <span style="color:${C.muted};font-size:12px;">Producktive · Powiadomienie automatyczne · <a href="https://producktive.pl" style="color:${C.primary};text-decoration:none;">producktive.pl</a></span>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

    // ─────────────────────────────────────────────────────────
    // EMAIL 2 — DO KLIENTA: podziękowanie + zaproszenie na call
    // ─────────────────────────────────────────────────────────
    const clientEmail = `<!DOCTYPE html>
<html lang="pl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Dziękuję za wiadomość — Producktive</title>
</head>
<body style="margin:0;padding:0;background:${C.dark};font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${C.dark};padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- HEADER -->
        <tr><td style="background:${gradient};padding:44px 36px 40px;border-radius:16px 16px 0 0;text-align:center;">
          <img src="${LOGO_URL}" width="56" height="56" alt="Producktive" style="display:block;margin:0 auto 20px;border-radius:14px;background:rgba(0,0,0,0.15);" />
          <h1 style="color:${C.dark};margin:0 0 10px;font-size:28px;font-weight:800;letter-spacing:-0.5px;">
            Dziękuję, ${firstName}!
          </h1>
          <p style="color:rgba(10,14,20,0.75);margin:0;font-size:16px;line-height:1.5;font-weight:500;">
            Twoja wiadomość dotarła — odezwę się w ciągu 24 godzin.
          </p>
        </td></tr>

        <!-- BODY -->
        <tr><td style="background:${C.card};padding:36px 36px 28px;">

          <p style="color:#c8d8e8;font-size:16px;line-height:1.75;margin:0 0 20px;">
            Cześć ${firstName},<br><br>
            Cieszę się, że trafiłeś/-aś na <strong style="color:${C.text};">Producktive</strong>.
            Dostałem Twoje zapytanie dotyczące <strong style="color:${C.primary};">${msg.service}</strong>
            i już wiem, że mamy co robić razem.
          </p>

          <p style="color:#c8d8e8;font-size:16px;line-height:1.75;margin:0 0 32px;">
            Przejrzę dokładnie to, co napisałeś/-aś i wrócę do Ciebie
            z konkretnymi pytaniami lub wstępną wyceną.
            Jeśli wolisz porozmawiać <strong style="color:${C.text};">od razu</strong> —
            możesz sam/-a wybrać wygodny termin:
          </p>

          <!-- CTA Główny -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
            <tr><td align="center">
              <a href="${CALENDLY_URL}"
                 style="display:inline-block;background:${gradient};
                        color:${C.dark};padding:18px 44px;border-radius:12px;text-decoration:none;
                        font-weight:800;font-size:16px;letter-spacing:0.3px;">
                &#128197; Zarezerwuj bezpłatną rozmowę 15 min
              </a>
              <div style="color:${C.muted};font-size:12px;margin-top:10px;">
                Wybierz datę i godzinę — potwierdzenie przyjdzie automatycznie
              </div>
            </td></tr>
          </table>

          <!-- Co dalej — 3 kroki -->
          <div style="background:${C.cardAlt};border-radius:12px;padding:24px;margin-bottom:28px;">
            <div style="color:${C.muted};font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:18px;">Co dzieje się dalej?</div>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="36" valign="top" style="padding-bottom:18px;">
                  <div style="width:30px;height:30px;background:rgba(0,229,255,0.15);border-radius:50%;
                              text-align:center;line-height:30px;font-size:13px;font-weight:800;color:${C.primary};">1</div>
                </td>
                <td style="padding-bottom:18px;padding-left:12px;">
                  <div style="color:${C.text};font-size:14px;font-weight:700;">Odpowiadam w ciągu 24h</div>
                  <div style="color:${C.muted};font-size:13px;margin-top:3px;line-height:1.5;">Przeglądam Twoje zapytanie i piszę z konkretnymi pytaniami lub wyceną</div>
                </td>
              </tr>
              <tr>
                <td width="36" valign="top" style="padding-bottom:18px;">
                  <div style="width:30px;height:30px;background:rgba(0,229,255,0.15);border-radius:50%;
                              text-align:center;line-height:30px;font-size:13px;font-weight:800;color:${C.primary};">2</div>
                </td>
                <td style="padding-bottom:18px;padding-left:12px;">
                  <div style="color:${C.text};font-size:14px;font-weight:700;">Rozmowa 15 min (opcjonalnie)</div>
                  <div style="color:${C.muted};font-size:13px;margin-top:3px;line-height:1.5;">Poznajemy się, doprecyzowujemy projekt — zero zobowiązań</div>
                </td>
              </tr>
              <tr>
                <td width="36" valign="top">
                  <div style="width:30px;height:30px;background:rgba(212,175,55,0.15);border-radius:50%;
                              text-align:center;line-height:30px;font-size:13px;font-weight:800;color:${C.accent};">3</div>
                </td>
                <td style="padding-left:12px;">
                  <div style="color:${C.text};font-size:14px;font-weight:700;">Wycena i umowa</div>
                  <div style="color:${C.muted};font-size:13px;margin-top:3px;line-height:1.5;">Dostajesz szczegółową wycenę i harmonogram — podpisujemy umowę</div>
                </td>
              </tr>
            </table>
          </div>

          <p style="color:${C.muted};font-size:14px;line-height:1.65;margin:0;border-top:1px solid ${C.border};padding-top:20px;">
            Masz dodatkowe pytania? Pisz śmiało na
            <a href="mailto:kontakt@producktive.pl" style="color:${C.primary};text-decoration:none;">kontakt@producktive.pl</a>
            — jestem jedną osobą, więc czytam każdą wiadomość osobiście.
          </p>

        </td></tr>

        <!-- SIGNATURE -->
        <tr><td style="background:#0d1117;padding:24px 36px;border-top:1px solid ${C.border};">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-right:16px;" valign="middle">
                <img src="${LOGO_URL}" width="44" height="44" alt="Producktive" style="display:block;border-radius:10px;background:rgba(0,229,255,0.1);" />
              </td>
              <td valign="middle">
                <div style="color:${C.text};font-weight:700;font-size:15px;">Producktive</div>
                <div style="color:${C.muted};font-size:13px;margin-top:2px;">Cyfrowe rozwiązania dla Twojego biznesu</div>
                <a href="https://producktive.pl" style="color:${C.primary};font-size:12px;text-decoration:none;margin-top:3px;display:block;">producktive.pl</a>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- FOOTER -->
        <tr><td style="background:${C.dark};padding:16px 36px;border-radius:0 0 16px 16px;text-align:center;">
          <span style="color:#3a4a5a;font-size:11px;">
            Otrzymałeś/-aś tę wiadomość, ponieważ wypełniłeś/-aś formularz kontaktowy na producktive.pl
          </span>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

    // ─────────────────────────────────────────────────────────
    // WYSYŁKA obu emaili równolegle
    // ─────────────────────────────────────────────────────────
    const [r1, r2] = await Promise.all([
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from:    'Producktive <onboarding@resend.dev>',
          to:      [NOTIFY_EMAIL],
          subject: `[Producktive] Nowe zapytanie — ${msg.service} · ${msg.name}`,
          html:    ownerEmail,
        }),
      }),
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from:     'Producktive <onboarding@resend.dev>',
          to:       [msg.email],
          reply_to: NOTIFY_EMAIL,
          subject:  `Dziękuję za wiadomość, ${firstName}!`,
          html:     clientEmail,
        }),
      }),
    ])

    if (!r1.ok) throw new Error(`Email do właściciela: ${await r1.text()}`)
    if (!r2.ok) throw new Error(`Email do klienta: ${await r2.text()}`)

    return new Response(JSON.stringify({ ok: true, owner: r1.status, client: r2.status }), {
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})


serve(async (req) => {
  try {
    const payload = await req.json()
    const msg = payload.record
    const budgetLabel = budgetLabels[msg.budget] ?? msg.budget

    // ─────────────────────────────────────────────────────────
    // EMAIL 1 — DO CIEBIE: powiadomienie o nowym kliencie
    // ─────────────────────────────────────────────────────────
    const ownerEmail = `<!DOCTYPE html>
<html lang="pl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0F0F1A;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0F0F1A;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- HEADER -->
        <tr><td style="background:linear-gradient(135deg,#6C63FF,#FF6584);padding:32px 36px;border-radius:16px 16px 0 0;">
          <div style="font-size:28px;margin-bottom:8px;">📬</div>
          <h1 style="color:white;margin:0;font-size:22px;font-weight:700;letter-spacing:-0.5px;">
            Nowe zapytanie od klienta
          </h1>
          <p style="color:rgba(255,255,255,0.75);margin:6px 0 0;font-size:14px;">
            ${new Date(msg.created_at).toLocaleString('pl-PL', { dateStyle: 'full', timeStyle: 'short' })}
          </p>
        </td></tr>

        <!-- BODY -->
        <tr><td style="background:#1A1A2E;padding:32px 36px;">

          <!-- Dane klienta -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                <span style="color:#8B8BA7;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Imię i nazwisko</span><br>
                <span style="color:#fff;font-size:16px;font-weight:600;margin-top:4px;display:block;">${msg.name}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                <span style="color:#8B8BA7;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Email</span><br>
                <a href="mailto:${msg.email}" style="color:#6C63FF;font-size:15px;margin-top:4px;display:block;text-decoration:none;">${msg.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                <span style="color:#8B8BA7;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Usługa</span><br>
                <span style="color:#fff;font-size:15px;margin-top:4px;display:block;">${msg.service}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;">
                <span style="color:#8B8BA7;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Budżet</span><br>
                <span style="color:#FF6584;font-size:16px;font-weight:700;margin-top:4px;display:block;">${budgetLabel}</span>
              </td>
            </tr>
          </table>

          <!-- Wiadomość -->
          <div style="background:#0F0F1A;border-left:3px solid #6C63FF;border-radius:0 8px 8px 0;padding:20px;margin-bottom:28px;">
            <div style="color:#8B8BA7;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">Wiadomość od klienta</div>
            <div style="color:#e0e0f0;font-size:15px;line-height:1.7;">${msg.message.replace(/\n/g, '<br>')}</div>
          </div>

          <!-- CTA Buttons -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" style="padding:0 8px 0 0;" width="50%">
                <a href="mailto:${msg.email}?subject=Re: Twoje zapytanie — Producktive&body=Cześć ${msg.name.split(' ')[0]},%0A%0ADziękuję za wiadomość!"
                   style="display:block;background:linear-gradient(135deg,#6C63FF,#FF6584);color:white;
                          padding:14px 20px;border-radius:10px;text-decoration:none;font-weight:600;
                          font-size:14px;text-align:center;">
                  ✉️ Odpowiedz do klienta
                </a>
              </td>
              <td align="center" style="padding:0 0 0 8px;" width="50%">
                <a href="${CALENDLY_URL}"
                   style="display:block;background:#1A1A2E;color:#6C63FF;border:1px solid #6C63FF;
                          padding:14px 20px;border-radius:10px;text-decoration:none;font-weight:600;
                          font-size:14px;text-align:center;">
                  📅 Twój kalendarz
                </a>
              </td>
            </tr>
          </table>

        </td></tr>

        <!-- FOOTER -->
        <tr><td style="background:#0F0F1A;padding:20px 36px;border-radius:0 0 16px 16px;text-align:center;">
          <span style="color:#8B8BA7;font-size:12px;">Producktive · Powiadomienie automatyczne · <a href="https://producktive.pl" style="color:#6C63FF;text-decoration:none;">producktive.pl</a></span>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

    // ─────────────────────────────────────────────────────────
    // EMAIL 2 — DO KLIENTA: podziękowanie + zaproszenie na call
    // ─────────────────────────────────────────────────────────
    const firstName = msg.name.split(' ')[0]
    const clientEmail = `<!DOCTYPE html>
<html lang="pl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0F0F1A;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0F0F1A;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- HEADER -->
        <tr><td style="background:linear-gradient(135deg,#6C63FF,#FF6584);padding:40px 36px;border-radius:16px 16px 0 0;text-align:center;">
          <div style="font-size:40px;margin-bottom:12px;">🙌</div>
          <h1 style="color:white;margin:0 0 8px;font-size:26px;font-weight:800;letter-spacing:-0.5px;">
            Dziękuję, ${firstName}!
          </h1>
          <p style="color:rgba(255,255,255,0.85);margin:0;font-size:16px;line-height:1.5;">
            Twoja wiadomość dotarła — odezwę się w ciągu 24 godzin.
          </p>
        </td></tr>

        <!-- BODY -->
        <tr><td style="background:#1A1A2E;padding:36px 36px 28px;">

          <p style="color:#d0d0e8;font-size:16px;line-height:1.7;margin:0 0 20px;">
            Cześć ${firstName},<br><br>
            Cieszę się, że trafiłeś/-aś na <strong style="color:white;">Producktive</strong>.
            Dostałem Twoje zapytanie dotyczące <strong style="color:#6C63FF;">${msg.service}</strong>
            i już wiem, że mamy co robić razem. 😊
          </p>

          <p style="color:#d0d0e8;font-size:16px;line-height:1.7;margin:0 0 28px;">
            Przejrzę dokładnie to, co napisałeś/-aś i wrócę do Ciebie
            z konkretnymi pytaniami lub wstępną wyceną.
            Jeśli wolisz porozmawiać <strong style="color:white;">od razu</strong> —
            możesz sam/-a wybrać wygodny dla siebie termin:
          </p>

          <!-- CTA Główny -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
            <tr><td align="center">
              <a href="${CALENDLY_URL}"
                 style="display:inline-block;background:linear-gradient(135deg,#6C63FF,#FF6584);
                        color:white;padding:18px 40px;border-radius:12px;text-decoration:none;
                        font-weight:700;font-size:16px;letter-spacing:0.3px;">
                📅 Zarezerwuj bezpłatną rozmowę 15 min
              </a>
              <div style="color:#8B8BA7;font-size:12px;margin-top:10px;">
                Wybierz datę i godzinę która Ci odpowiada — potwierdzenie przyjdzie automatycznie
              </div>
            </td></tr>
          </table>

          <!-- Co dalej — 3 kroki -->
          <div style="background:#0F0F1A;border-radius:12px;padding:24px;margin-bottom:28px;">
            <div style="color:#8B8BA7;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px;">Co dzieje się dalej?</div>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="36" valign="top" style="padding-bottom:16px;">
                  <div style="width:28px;height:28px;background:rgba(108,99,255,0.2);border-radius:50%;
                              text-align:center;line-height:28px;font-size:13px;font-weight:700;color:#6C63FF;">1</div>
                </td>
                <td style="padding-bottom:16px;padding-left:12px;">
                  <div style="color:white;font-size:14px;font-weight:600;">Odpowiadam w ciągu 24h</div>
                  <div style="color:#8B8BA7;font-size:13px;margin-top:2px;">Przeglądam Twoje zapytanie i piszę z konkretnymi pytaniami lub wyceną</div>
                </td>
              </tr>
              <tr>
                <td width="36" valign="top" style="padding-bottom:16px;">
                  <div style="width:28px;height:28px;background:rgba(108,99,255,0.2);border-radius:50%;
                              text-align:center;line-height:28px;font-size:13px;font-weight:700;color:#6C63FF;">2</div>
                </td>
                <td style="padding-bottom:16px;padding-left:12px;">
                  <div style="color:white;font-size:14px;font-weight:600;">Rozmowa 15 min (opcjonalnie)</div>
                  <div style="color:#8B8BA7;font-size:13px;margin-top:2px;">Poznajemy się, doprecyzowujemy projekt — zero zobowiązań</div>
                </td>
              </tr>
              <tr>
                <td width="36" valign="top">
                  <div style="width:28px;height:28px;background:rgba(255,101,132,0.2);border-radius:50%;
                              text-align:center;line-height:28px;font-size:13px;font-weight:700;color:#FF6584;">3</div>
                </td>
                <td style="padding-left:12px;">
                  <div style="color:white;font-size:14px;font-weight:600;">Wycena i umowa</div>
                  <div style="color:#8B8BA7;font-size:13px;margin-top:2px;">Dostajesz szczegółową wycenę i harmonogram — podpisujemy umowę</div>
                </td>
              </tr>
            </table>
          </div>

          <p style="color:#8B8BA7;font-size:14px;line-height:1.6;margin:0;border-top:1px solid rgba(255,255,255,0.06);padding-top:20px;">
            Masz dodatkowe pytania? Pisz śmiało na
            <a href="mailto:kontakt@producktive.pl" style="color:#6C63FF;text-decoration:none;">kontakt@producktive.pl</a>
            — jestem jedną osobą, więc czytam każdą wiadomość osobiście. 👋
          </p>

        </td></tr>

        <!-- SIGNATURE -->
        <tr><td style="background:#161625;padding:24px 36px;border-top:1px solid rgba(255,255,255,0.06);">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-right:16px;">
                <div style="width:48px;height:48px;background:linear-gradient(135deg,#6C63FF,#FF6584);
                            border-radius:12px;display:flex;align-items:center;justify-content:center;
                            font-size:22px;font-weight:800;color:white;text-align:center;line-height:48px;">P</div>
              </td>
              <td>
                <div style="color:white;font-weight:700;font-size:15px;">Producktive</div>
                <div style="color:#8B8BA7;font-size:13px;">Cyfrowe rozwiązania dla Twojego biznesu</div>
                <div style="margin-top:4px;">
                  <a href="https://producktive.pl" style="color:#6C63FF;font-size:12px;text-decoration:none;">producktive.pl</a>
                </div>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- FOOTER -->
        <tr><td style="background:#0F0F1A;padding:16px 36px;border-radius:0 0 16px 16px;text-align:center;">
          <span style="color:#4a4a6a;font-size:11px;">
            Otrzymałeś/-aś tę wiadomość bo wypełniłeś/-aś formularz kontaktowy na producktive.pl
          </span>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

    // ─────────────────────────────────────────────────────────
    // WYSYŁKA obu emaili równolegle
    // ─────────────────────────────────────────────────────────
    const [r1, r2] = await Promise.all([
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from:    'Producktive <onboarding@resend.dev>',
          to:      [NOTIFY_EMAIL],
          subject: `📬 [Producktive] Nowe zapytanie — ${msg.service} · ${msg.name}`,
          html:    ownerEmail,
        }),
      }),
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from:    'Producktive <onboarding@resend.dev>',
          to:      [msg.email],
          reply_to: NOTIFY_EMAIL,
          subject: `Dziękuję za wiadomość, ${firstName}! 🙌`,
          html:    clientEmail,
        }),
      }),
    ])

    if (!r1.ok) throw new Error(`Email do właściciela: ${await r1.text()}`)
    if (!r2.ok) throw new Error(`Email do klienta: ${await r2.text()}`)

    return new Response(JSON.stringify({ ok: true, owner: r1.status, client: r2.status }), {
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
