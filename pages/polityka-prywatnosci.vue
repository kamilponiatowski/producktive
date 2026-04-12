<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: 'Polityka prywatności — Producktive',
  meta: [
    { name: 'description', content: 'Polityka prywatności serwisu Producktive.pl. Dowiedz się jak przetwarzamy Twoje dane osobowe.' },
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
        <h1 class="text-4xl font-display font-bold text-white mb-3">Polityka prywatności</h1>
        <p class="text-brand-muted text-sm">Ostatnia aktualizacja: kwiecień 2026</p>
      </div>

      <!-- Content -->
      <div class="prose-policy space-y-10">

        <section>
          <h2 class="text-xl font-display font-bold text-white mb-3">1. Administrator danych</h2>
          <p class="text-brand-muted leading-relaxed">
            Administratorem Twoich danych osobowych jest <strong class="text-white">Kamil Poniatowski</strong>, prowadzący działalność pod marką <strong class="text-white">Producktive</strong>,
            z siedzibą w Gdańsku. Kontakt: <a href="mailto:kontakt@producktive.pl" class="text-brand-primary hover:underline">kontakt@producktive.pl</a>,
            tel. <a href="tel:+48886127854" class="text-brand-primary hover:underline">+48 886 127 854</a>.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-display font-bold text-white mb-3">2. Jakie dane zbieramy</h2>
          <ul class="text-brand-muted leading-relaxed space-y-2 list-none">
            <li class="flex gap-2 items-start">
              <span class="text-brand-primary mt-1 shrink-0">
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <span><strong class="text-white">Formularz kontaktowy:</strong> imię i nazwisko, adres e-mail, numer telefonu (jeśli podasz), opis projektu.</span>
            </li>
            <li class="flex gap-2 items-start">
              <span class="text-brand-primary mt-1 shrink-0">
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <span><strong class="text-white">Dane techniczne:</strong> adres IP, typ przeglądarki, strony referujące — na potrzeby bezpieczeństwa i diagnostyki technicznej.</span>
            </li>
            <li class="flex gap-2 items-start">
              <span class="text-brand-primary mt-1 shrink-0">
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <span><strong class="text-white">Pliki cookies:</strong> niezbędne pliki do poprawnego działania serwisu (patrz sekcja 6).</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-display font-bold text-white mb-3">3. Cel i podstawa przetwarzania</h2>
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-brand-muted border-collapse">
              <thead>
                <tr class="border-b border-white/10">
                  <th class="text-left py-2 pr-4 text-white font-semibold">Cel</th>
                  <th class="text-left py-2 text-white font-semibold">Podstawa prawna</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5">
                <tr>
                  <td class="py-2 pr-4">Odpowiedź na wiadomość z formularza</td>
                  <td class="py-2">Art. 6 ust. 1 lit. b RODO (umowa/działania przed)</td>
                </tr>
                <tr>
                  <td class="py-2 pr-4">Kontakt telefoniczny (za zgodą)</td>
                  <td class="py-2">Art. 6 ust. 1 lit. a RODO (zgoda)</td>
                </tr>
                <tr>
                  <td class="py-2 pr-4">Realizacja umowy o usługi</td>
                  <td class="py-2">Art. 6 ust. 1 lit. b RODO</td>
                </tr>
                <tr>
                  <td class="py-2 pr-4">Bezpieczeństwo witryny</td>
                  <td class="py-2">Art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 class="text-xl font-display font-bold text-white mb-3">4. Przechowywanie danych</h2>
          <p class="text-brand-muted leading-relaxed">
            Dane z formularza kontaktowego przechowuję przez okres niezbędny do udzielenia odpowiedzi i ewentualnej realizacji współpracy, a następnie przez 2 lata dla celów rachunkowych i prawnych.
            Dane przetwarzane na podstawie zgody — do czasu wycofania zgody.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-display font-bold text-white mb-3">5. Twoje prawa</h2>
          <p class="text-brand-muted leading-relaxed mb-3">Masz prawo do:</p>
          <ul class="text-brand-muted leading-relaxed space-y-1 list-none">
            <li class="flex gap-2"><span class="text-brand-primary mt-1">›</span> dostępu do swoich danych,</li>
            <li class="flex gap-2"><span class="text-brand-primary mt-1">›</span> sprostowania danych,</li>
            <li class="flex gap-2"><span class="text-brand-primary mt-1">›</span> usunięcia danych ("prawo do bycia zapomnianym"),</li>
            <li class="flex gap-2"><span class="text-brand-primary mt-1">›</span> ograniczenia przetwarzania,</li>
            <li class="flex gap-2"><span class="text-brand-primary mt-1">›</span> przenoszenia danych,</li>
            <li class="flex gap-2"><span class="text-brand-primary mt-1">›</span> wniesienia sprzeciwu,</li>
            <li class="flex gap-2"><span class="text-brand-primary mt-1">›</span> wycofania zgody (jeśli przetwarzanie odbywa się na jej podstawie),</li>
            <li class="flex gap-2"><span class="text-brand-primary mt-1">›</span> skargi do Prezesa Urzędu Ochrony Danych Osobowych (uodo.gov.pl).</li>
          </ul>
          <p class="text-brand-muted leading-relaxed mt-3">
            Aby skorzystać z tych praw, napisz na: <a href="mailto:kontakt@producktive.pl" class="text-brand-primary hover:underline">kontakt@producktive.pl</a>.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-display font-bold text-white mb-3">6. Pliki cookies</h2>
          <p class="text-brand-muted leading-relaxed mb-4">
            Serwis Producktive.pl używa wyłącznie <strong class="text-white">niezbędnych plików cookies</strong> do poprawnego działania. Nie stosujemy plików cookies śledzących ani marketingowych bez Twojej zgody.
          </p>
          <div class="card p-4 space-y-3">
            <div class="text-sm">
              <div class="text-white font-semibold mb-1">Niezbędne (zawsze aktywne)</div>
              <div class="grid gap-2">
                <div class="flex justify-between text-brand-muted">
                  <code class="text-brand-primary text-xs">cookie_consent</code>
                  <span class="text-xs">Zapamiętuje Twój wybór dotyczący cookies (12 miesięcy)</span>
                </div>
                <div class="flex justify-between text-brand-muted">
                  <code class="text-brand-primary text-xs">popup-last-shown</code>
                  <span class="text-xs">Zapobiega wielokrotnemu wyświetlaniu popupu (localStorage)</span>
                </div>
                <div class="flex justify-between text-brand-muted">
                  <code class="text-brand-primary text-xs">lofi-dismissed</code>
                  <span class="text-xs">Zapamiętuje zamknięcie odtwarzacza muzyki (localStorage)</span>
                </div>
              </div>
            </div>
          </div>
          <p class="text-brand-muted text-sm leading-relaxed mt-3">
            Możesz zarządzać plikami cookies w ustawieniach swojej przeglądarki. Wyłączenie cookies niezbędnych może wpłynąć na działanie serwisu.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-display font-bold text-white mb-3">7. Bezpieczeństwo</h2>
          <p class="text-brand-muted leading-relaxed">
            Formularz kontaktowy jest zabezpieczony mechanizmem <strong class="text-white">honeypot</strong> (niewidoczne pole wychwytujące boty) oraz walidacją serwerową.
            Komunikacja odbywa się przez szyfrowane połączenie <strong class="text-white">HTTPS/TLS</strong>. Dane formularza trafiają bezpośrednio do szyfrowanej bazy danych Supabase na terenie UE.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-display font-bold text-white mb-3">8. Odbiorcy danych</h2>
          <p class="text-brand-muted leading-relaxed">
            Nie sprzedaję ani nie udostępniam Twoich danych osobom trzecim. Dane mogą być przekazywane wyłącznie:
          </p>
          <ul class="text-brand-muted mt-2 space-y-1 list-none">
            <li class="flex gap-2"><span class="text-brand-primary mt-1">›</span> <strong class="text-white">Supabase Inc.</strong> (USA) — baza danych (umowa DPA, SCC zgodnie z RODO)</li>
            <li class="flex gap-2"><span class="text-brand-primary mt-1">›</span> <strong class="text-white">Vercel Inc.</strong> (USA) — hosting i CDN (umowa DPA)</li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-display font-bold text-white mb-3">9. Zmiany polityki</h2>
          <p class="text-brand-muted leading-relaxed">
            Niniejsza polityka prywatności może być aktualizowana. O istotnych zmianach poinformuję na stronie głównej. Data ostatniej aktualizacji widnieje na początku dokumentu.
          </p>
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
