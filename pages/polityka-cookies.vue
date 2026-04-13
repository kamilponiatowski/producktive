<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: 'Polityka cookies — Producktive',
  meta: [
    { name: 'description', content: 'Polityka cookies serwisu Producktive.pl. Dowiedz się jakich plików cookies i mechanizmów przechowywania używamy.' },
    { name: 'robots', content: 'noindex' },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-brand-dark pt-24 pb-16">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Back link -->
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-brand-muted hover:text-white transition-colors text-sm mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        Powrót na stronę główną
      </NuxtLink>

      <!-- Header -->
      <div class="mb-12">
        <span class="badge mb-4 inline-block">Dokument prawny</span>
        <h1 class="text-4xl font-display font-bold text-white mb-3">Polityka cookies</h1>
        <p class="text-brand-muted text-sm">Ostatnia aktualizacja: kwiecień 2026</p>
      </div>

      <!-- Content -->
      <div class="prose-policy space-y-10">

        <section>
          <h2 class="text-xl font-display font-bold text-white mb-3">1. Czym są pliki cookies?</h2>
          <p class="text-brand-muted leading-relaxed">
            Pliki cookies (tzw. „ciasteczka") to małe pliki tekstowe zapisywane na Twoim urządzeniu przez przeglądarkę internetową
            podczas odwiedzania stron www. Służą do zapamiętywania Twoich preferencji i ustawień, dzięki czemu strona może
            działać prawidłowo i wygodnie. Obok cookies, strona może korzystać z mechanizmu <strong class="text-white">localStorage</strong>,
            który działa podobnie, ale dane przechowywane są lokalnie w przeglądarce bez daty wygaśnięcia — do momentu ich ręcznego usunięcia.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-display font-bold text-white mb-3">2. Administrator cookies</h2>
          <p class="text-brand-muted leading-relaxed">
            Administratorem plików cookies jest <strong class="text-white">Kamil Poniatowski</strong>, prowadzący działalność pod marką
            <strong class="text-white">Producktive</strong>, z siedzibą w Gdańsku.
            Kontakt: <a href="mailto:kontakt@producktive.pl" class="text-brand-primary hover:underline">kontakt@producktive.pl</a>,
            tel. <a href="tel:+48886127854" class="text-brand-primary hover:underline">+48 886 127 854</a>.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-display font-bold text-white mb-3">3. Jakich cookies i localStorage używamy?</h2>
          <p class="text-brand-muted leading-relaxed mb-4">
            Serwis Producktive.pl używa wyłącznie <strong class="text-white">niezbędnych i funkcjonalnych</strong> mechanizmów przechowywania.
            Nie używamy cookies śledzących, analitycznych ani reklamowych.
          </p>

          <!-- Cookies table -->
          <div class="card p-4 space-y-5">
            <div>
              <div class="text-white font-semibold mb-3 text-sm">Niezbędne (zawsze aktywne)</div>
              <div class="overflow-x-auto">
                <table class="w-full text-sm text-brand-muted border-collapse">
                  <thead>
                    <tr class="border-b border-white/10">
                      <th class="text-left py-2 pr-3 text-white font-semibold">Nazwa</th>
                      <th class="text-left py-2 pr-3 text-white font-semibold">Typ</th>
                      <th class="text-left py-2 pr-3 text-white font-semibold">Cel</th>
                      <th class="text-left py-2 text-white font-semibold">Czas życia</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/5">
                    <tr>
                      <td class="py-2 pr-3"><code class="text-brand-primary text-xs">cookie_consent</code></td>
                      <td class="py-2 pr-3">Cookie</td>
                      <td class="py-2 pr-3">Zapamiętuje Twój wybór dotyczący zgody na cookies</td>
                      <td class="py-2">12 miesięcy</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <div class="text-white font-semibold mb-3 text-sm">Funkcjonalne</div>
              <div class="overflow-x-auto">
                <table class="w-full text-sm text-brand-muted border-collapse">
                  <thead>
                    <tr class="border-b border-white/10">
                      <th class="text-left py-2 pr-3 text-white font-semibold">Nazwa</th>
                      <th class="text-left py-2 pr-3 text-white font-semibold">Typ</th>
                      <th class="text-left py-2 pr-3 text-white font-semibold">Cel</th>
                      <th class="text-left py-2 text-white font-semibold">Czas życia</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/5">
                    <tr>
                      <td class="py-2 pr-3"><code class="text-brand-primary text-xs">i18n_lang</code></td>
                      <td class="py-2 pr-3">Cookie</td>
                      <td class="py-2 pr-3">Zapamiętuje wybrany język strony (PL/EN)</td>
                      <td class="py-2">12 miesięcy</td>
                    </tr>
                    <tr>
                      <td class="py-2 pr-3"><code class="text-brand-primary text-xs">popup-last-shown</code></td>
                      <td class="py-2 pr-3">localStorage</td>
                      <td class="py-2 pr-3">Zapobiega wielokrotnemu wyświetlaniu okna kontaktowego</td>
                      <td class="py-2">Do usunięcia</td>
                    </tr>
                    <tr>
                      <td class="py-2 pr-3"><code class="text-brand-primary text-xs">lofi-dismissed</code></td>
                      <td class="py-2 pr-3">localStorage</td>
                      <td class="py-2 pr-3">Zapamiętuje zamknięcie odtwarzacza muzyki lofi</td>
                      <td class="py-2">Do usunięcia</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-xl font-display font-bold text-white mb-3">4. Cookies stron trzecich</h2>
          <p class="text-brand-muted leading-relaxed">
            Serwis Producktive.pl <strong class="text-white">nie korzysta</strong> z plików cookies stron trzecich w celach śledzenia,
            analityki ani reklamy. Nie stosujemy Google Analytics, Facebook Pixel, ani podobnych narzędzi śledzących.
          </p>
          <p class="text-brand-muted leading-relaxed mt-3">
            Strona jest hostowana na platformie <strong class="text-white">Vercel</strong> i korzysta z bazy danych
            <strong class="text-white">Supabase</strong>. Oba te serwisy mogą przetwarzać dane techniczne (adres IP)
            w ramach świadczenia usług hostingowych — szczegóły znajdziesz w ich politykach prywatności:
          </p>
          <ul class="text-brand-muted mt-2 space-y-1 list-none">
            <li class="flex gap-2">
              <span class="text-brand-primary mt-1">›</span>
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" class="text-brand-primary hover:underline">
                Vercel — Privacy Policy
              </a>
            </li>
            <li class="flex gap-2">
              <span class="text-brand-primary mt-1">›</span>
              <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" class="text-brand-primary hover:underline">
                Supabase — Privacy Policy
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-display font-bold text-white mb-3">5. Jak zarządzać cookies?</h2>
          <p class="text-brand-muted leading-relaxed mb-4">
            Możesz w każdej chwili zmienić ustawienia dotyczące cookies w swojej przeglądarce — w tym zablokować lub usunąć pliki cookies.
            Wyłączenie cookies niezbędnych może wpłynąć na poprawne działanie strony.
          </p>
          <div class="card p-4 space-y-2 text-sm text-brand-muted">
            <div class="text-white font-semibold mb-2">Instrukcje dla popularnych przeglądarek:</div>
            <ul class="space-y-1 list-none">
              <li class="flex gap-2">
                <span class="text-brand-primary mt-1">›</span>
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" class="text-brand-primary hover:underline">
                  Google Chrome
                </a>
              </li>
              <li class="flex gap-2">
                <span class="text-brand-primary mt-1">›</span>
                <a href="https://support.mozilla.org/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" class="text-brand-primary hover:underline">
                  Mozilla Firefox
                </a>
              </li>
              <li class="flex gap-2">
                <span class="text-brand-primary mt-1">›</span>
                <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471" target="_blank" rel="noopener noreferrer" class="text-brand-primary hover:underline">
                  Safari
                </a>
              </li>
              <li class="flex gap-2">
                <span class="text-brand-primary mt-1">›</span>
                <a href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" class="text-brand-primary hover:underline">
                  Microsoft Edge
                </a>
              </li>
            </ul>
          </div>
          <p class="text-brand-muted leading-relaxed mt-3">
            Aby usunąć dane z <strong class="text-white">localStorage</strong>, otwórz narzędzia deweloperskie przeglądarki
            (klawisz F12), przejdź do zakładki Application → Local Storage i usuń odpowiednie wpisy.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-display font-bold text-white mb-3">6. Podstawa prawna</h2>
          <p class="text-brand-muted leading-relaxed">
            Korzystanie z plików cookies odbywa się na podstawie:
          </p>
          <ul class="text-brand-muted mt-2 space-y-1 list-none">
            <li class="flex gap-2"><span class="text-brand-primary mt-1">›</span> <strong class="text-white">Art. 173 Prawa telekomunikacyjnego</strong> — zgoda na przechowywanie informacji na urządzeniu końcowym użytkownika</li>
            <li class="flex gap-2"><span class="text-brand-primary mt-1">›</span> <strong class="text-white">Art. 6 ust. 1 lit. a RODO</strong> — zgoda (dla cookies funkcjonalnych)</li>
            <li class="flex gap-2"><span class="text-brand-primary mt-1">›</span> <strong class="text-white">Art. 6 ust. 1 lit. f RODO</strong> — prawnie uzasadniony interes administratora (dla cookies niezbędnych do funkcjonowania serwisu)</li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-display font-bold text-white mb-3">7. Zmiany polityki cookies</h2>
          <p class="text-brand-muted leading-relaxed">
            Niniejsza polityka cookies może być aktualizowana, m.in. w przypadku wprowadzenia nowych funkcjonalności wymagających
            stosowania dodatkowych cookies. Data ostatniej aktualizacji widnieje na początku dokumentu.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-display font-bold text-white mb-3">8. Kontakt</h2>
          <p class="text-brand-muted leading-relaxed">
            W przypadku pytań dotyczących polityki cookies, skontaktuj się:
          </p>
          <ul class="text-brand-muted mt-2 space-y-1 list-none">
            <li class="flex gap-2">
              <span class="text-brand-primary mt-1">›</span>
              Email: <a href="mailto:kontakt@producktive.pl" class="text-brand-primary hover:underline">kontakt@producktive.pl</a>
            </li>
            <li class="flex gap-2">
              <span class="text-brand-primary mt-1">›</span>
              Telefon: <a href="tel:+48886127854" class="text-brand-primary hover:underline">+48 886 127 854</a>
            </li>
          </ul>
        </section>

      </div>
    </div>
  </div>
</template>

<style scoped>
table td,
table th {
  vertical-align: top;
}
</style>
