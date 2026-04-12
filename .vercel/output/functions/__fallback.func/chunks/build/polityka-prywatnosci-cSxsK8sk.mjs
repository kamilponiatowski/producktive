import { _ as __nuxt_component_0 } from './nuxt-link-C4G3L7lA.mjs';
import { defineComponent, mergeProps, withCtx, openBlock, createBlock, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { a as useI18n, u as useHead } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'consola';
import 'vue-router';
import 'node:fs';
import 'node:path';
import 'nuxtseo-shared/utils';
import 'fast-xml-parser';
import 'node:url';
import 'ipx';
import 'node:crypto';
import '@unhead/addons';
import 'unhead/plugins';
import '@unhead/schema-org/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "polityka-prywatnosci",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useHead({
      title: "Polityka prywatno\u015Bci \u2014 Producktive",
      meta: [
        { name: "description", content: "Polityka prywatno\u015Bci serwisu Producktive.pl. Dowiedz si\u0119 jak przetwarzamy Twoje dane osobowe." },
        { name: "robots", content: "noindex" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-brand-dark pt-24 pb-16" }, _attrs))} data-v-86b3200c><div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8" data-v-86b3200c>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "inline-flex items-center gap-2 text-brand-muted hover:text-white transition-colors text-sm mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-86b3200c${_scopeId}><path d="M19 12H5M12 5l-7 7 7 7" data-v-86b3200c${_scopeId}></path></svg> Powr\xF3t na stron\u0119 g\u0142\xF3wn\u0105 `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "aria-hidden": "true"
              }, [
                createVNode("path", { d: "M19 12H5M12 5l-7 7 7 7" })
              ])),
              createTextVNode(" Powr\xF3t na stron\u0119 g\u0142\xF3wn\u0105 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mb-12" data-v-86b3200c><span class="badge mb-4 inline-block" data-v-86b3200c>Dokument prawny</span><h1 class="text-4xl font-display font-bold text-white mb-3" data-v-86b3200c>Polityka prywatno\u015Bci</h1><p class="text-brand-muted text-sm" data-v-86b3200c>Ostatnia aktualizacja: kwiecie\u0144 2026</p></div><div class="prose-policy space-y-10" data-v-86b3200c><section data-v-86b3200c><h2 class="text-xl font-display font-bold text-white mb-3" data-v-86b3200c>1. Administrator danych</h2><p class="text-brand-muted leading-relaxed" data-v-86b3200c> Administratorem Twoich danych osobowych jest <strong class="text-white" data-v-86b3200c>Kamil Poniatowski</strong>, prowadz\u0105cy dzia\u0142alno\u015B\u0107 pod mark\u0105 <strong class="text-white" data-v-86b3200c>Producktive</strong>, z siedzib\u0105 w Gda\u0144sku. Kontakt: <a href="mailto:kontakt@producktive.pl" class="text-brand-primary hover:underline" data-v-86b3200c>kontakt@producktive.pl</a>, tel. <a href="tel:+48886127854" class="text-brand-primary hover:underline" data-v-86b3200c>+48 886 127 854</a>. </p></section><section data-v-86b3200c><h2 class="text-xl font-display font-bold text-white mb-3" data-v-86b3200c>2. Jakie dane zbieramy</h2><ul class="text-brand-muted leading-relaxed space-y-2 list-none" data-v-86b3200c><li class="flex gap-2 items-start" data-v-86b3200c><span class="text-brand-primary mt-1 shrink-0" data-v-86b3200c><svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-86b3200c><polyline points="20 6 9 17 4 12" data-v-86b3200c></polyline></svg></span><span data-v-86b3200c><strong class="text-white" data-v-86b3200c>Formularz kontaktowy:</strong> imi\u0119 i nazwisko, adres e-mail, numer telefonu (je\u015Bli podasz), opis projektu.</span></li><li class="flex gap-2 items-start" data-v-86b3200c><span class="text-brand-primary mt-1 shrink-0" data-v-86b3200c><svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-86b3200c><polyline points="20 6 9 17 4 12" data-v-86b3200c></polyline></svg></span><span data-v-86b3200c><strong class="text-white" data-v-86b3200c>Dane techniczne:</strong> adres IP, typ przegl\u0105darki, strony referuj\u0105ce \u2014 na potrzeby bezpiecze\u0144stwa i diagnostyki technicznej.</span></li><li class="flex gap-2 items-start" data-v-86b3200c><span class="text-brand-primary mt-1 shrink-0" data-v-86b3200c><svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-86b3200c><polyline points="20 6 9 17 4 12" data-v-86b3200c></polyline></svg></span><span data-v-86b3200c><strong class="text-white" data-v-86b3200c>Pliki cookies:</strong> niezb\u0119dne pliki do poprawnego dzia\u0142ania serwisu (patrz sekcja 6).</span></li></ul></section><section data-v-86b3200c><h2 class="text-xl font-display font-bold text-white mb-3" data-v-86b3200c>3. Cel i podstawa przetwarzania</h2><div class="overflow-x-auto" data-v-86b3200c><table class="w-full text-sm text-brand-muted border-collapse" data-v-86b3200c><thead data-v-86b3200c><tr class="border-b border-white/10" data-v-86b3200c><th class="text-left py-2 pr-4 text-white font-semibold" data-v-86b3200c>Cel</th><th class="text-left py-2 text-white font-semibold" data-v-86b3200c>Podstawa prawna</th></tr></thead><tbody class="divide-y divide-white/5" data-v-86b3200c><tr data-v-86b3200c><td class="py-2 pr-4" data-v-86b3200c>Odpowied\u017A na wiadomo\u015B\u0107 z formularza</td><td class="py-2" data-v-86b3200c>Art. 6 ust. 1 lit. b RODO (umowa/dzia\u0142ania przed)</td></tr><tr data-v-86b3200c><td class="py-2 pr-4" data-v-86b3200c>Kontakt telefoniczny (za zgod\u0105)</td><td class="py-2" data-v-86b3200c>Art. 6 ust. 1 lit. a RODO (zgoda)</td></tr><tr data-v-86b3200c><td class="py-2 pr-4" data-v-86b3200c>Realizacja umowy o us\u0142ugi</td><td class="py-2" data-v-86b3200c>Art. 6 ust. 1 lit. b RODO</td></tr><tr data-v-86b3200c><td class="py-2 pr-4" data-v-86b3200c>Bezpiecze\u0144stwo witryny</td><td class="py-2" data-v-86b3200c>Art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes)</td></tr></tbody></table></div></section><section data-v-86b3200c><h2 class="text-xl font-display font-bold text-white mb-3" data-v-86b3200c>4. Przechowywanie danych</h2><p class="text-brand-muted leading-relaxed" data-v-86b3200c> Dane z formularza kontaktowego przechowuj\u0119 przez okres niezb\u0119dny do udzielenia odpowiedzi i ewentualnej realizacji wsp\xF3\u0142pracy, a nast\u0119pnie przez 2 lata dla cel\xF3w rachunkowych i prawnych. Dane przetwarzane na podstawie zgody \u2014 do czasu wycofania zgody. </p></section><section data-v-86b3200c><h2 class="text-xl font-display font-bold text-white mb-3" data-v-86b3200c>5. Twoje prawa</h2><p class="text-brand-muted leading-relaxed mb-3" data-v-86b3200c>Masz prawo do:</p><ul class="text-brand-muted leading-relaxed space-y-1 list-none" data-v-86b3200c><li class="flex gap-2" data-v-86b3200c><span class="text-brand-primary mt-1" data-v-86b3200c>\u203A</span> dost\u0119pu do swoich danych,</li><li class="flex gap-2" data-v-86b3200c><span class="text-brand-primary mt-1" data-v-86b3200c>\u203A</span> sprostowania danych,</li><li class="flex gap-2" data-v-86b3200c><span class="text-brand-primary mt-1" data-v-86b3200c>\u203A</span> usuni\u0119cia danych (&quot;prawo do bycia zapomnianym&quot;),</li><li class="flex gap-2" data-v-86b3200c><span class="text-brand-primary mt-1" data-v-86b3200c>\u203A</span> ograniczenia przetwarzania,</li><li class="flex gap-2" data-v-86b3200c><span class="text-brand-primary mt-1" data-v-86b3200c>\u203A</span> przenoszenia danych,</li><li class="flex gap-2" data-v-86b3200c><span class="text-brand-primary mt-1" data-v-86b3200c>\u203A</span> wniesienia sprzeciwu,</li><li class="flex gap-2" data-v-86b3200c><span class="text-brand-primary mt-1" data-v-86b3200c>\u203A</span> wycofania zgody (je\u015Bli przetwarzanie odbywa si\u0119 na jej podstawie),</li><li class="flex gap-2" data-v-86b3200c><span class="text-brand-primary mt-1" data-v-86b3200c>\u203A</span> skargi do Prezesa Urz\u0119du Ochrony Danych Osobowych (uodo.gov.pl).</li></ul><p class="text-brand-muted leading-relaxed mt-3" data-v-86b3200c> Aby skorzysta\u0107 z tych praw, napisz na: <a href="mailto:kontakt@producktive.pl" class="text-brand-primary hover:underline" data-v-86b3200c>kontakt@producktive.pl</a>. </p></section><section data-v-86b3200c><h2 class="text-xl font-display font-bold text-white mb-3" data-v-86b3200c>6. Pliki cookies</h2><p class="text-brand-muted leading-relaxed mb-4" data-v-86b3200c> Serwis Producktive.pl u\u017Cywa wy\u0142\u0105cznie <strong class="text-white" data-v-86b3200c>niezb\u0119dnych plik\xF3w cookies</strong> do poprawnego dzia\u0142ania. Nie stosujemy plik\xF3w cookies \u015Bledz\u0105cych ani marketingowych bez Twojej zgody. </p><div class="card p-4 space-y-3" data-v-86b3200c><div class="text-sm" data-v-86b3200c><div class="text-white font-semibold mb-1" data-v-86b3200c>Niezb\u0119dne (zawsze aktywne)</div><div class="grid gap-2" data-v-86b3200c><div class="flex justify-between text-brand-muted" data-v-86b3200c><code class="text-brand-primary text-xs" data-v-86b3200c>cookie_consent</code><span class="text-xs" data-v-86b3200c>Zapami\u0119tuje Tw\xF3j wyb\xF3r dotycz\u0105cy cookies (12 miesi\u0119cy)</span></div><div class="flex justify-between text-brand-muted" data-v-86b3200c><code class="text-brand-primary text-xs" data-v-86b3200c>popup-last-shown</code><span class="text-xs" data-v-86b3200c>Zapobiega wielokrotnemu wy\u015Bwietlaniu popupu (localStorage)</span></div><div class="flex justify-between text-brand-muted" data-v-86b3200c><code class="text-brand-primary text-xs" data-v-86b3200c>lofi-dismissed</code><span class="text-xs" data-v-86b3200c>Zapami\u0119tuje zamkni\u0119cie odtwarzacza muzyki (localStorage)</span></div></div></div></div><p class="text-brand-muted text-sm leading-relaxed mt-3" data-v-86b3200c> Mo\u017Cesz zarz\u0105dza\u0107 plikami cookies w ustawieniach swojej przegl\u0105darki. Wy\u0142\u0105czenie cookies niezb\u0119dnych mo\u017Ce wp\u0142yn\u0105\u0107 na dzia\u0142anie serwisu. </p></section><section data-v-86b3200c><h2 class="text-xl font-display font-bold text-white mb-3" data-v-86b3200c>7. Bezpiecze\u0144stwo</h2><p class="text-brand-muted leading-relaxed" data-v-86b3200c> Formularz kontaktowy jest zabezpieczony mechanizmem <strong class="text-white" data-v-86b3200c>honeypot</strong> (niewidoczne pole wychwytuj\u0105ce boty) oraz walidacj\u0105 serwerow\u0105. Komunikacja odbywa si\u0119 przez szyfrowane po\u0142\u0105czenie <strong class="text-white" data-v-86b3200c>HTTPS/TLS</strong>. Dane formularza trafiaj\u0105 bezpo\u015Brednio do szyfrowanej bazy danych Supabase na terenie UE. </p></section><section data-v-86b3200c><h2 class="text-xl font-display font-bold text-white mb-3" data-v-86b3200c>8. Odbiorcy danych</h2><p class="text-brand-muted leading-relaxed" data-v-86b3200c> Nie sprzedaj\u0119 ani nie udost\u0119pniam Twoich danych osobom trzecim. Dane mog\u0105 by\u0107 przekazywane wy\u0142\u0105cznie: </p><ul class="text-brand-muted mt-2 space-y-1 list-none" data-v-86b3200c><li class="flex gap-2" data-v-86b3200c><span class="text-brand-primary mt-1" data-v-86b3200c>\u203A</span> <strong class="text-white" data-v-86b3200c>Supabase Inc.</strong> (USA) \u2014 baza danych (umowa DPA, SCC zgodnie z RODO)</li><li class="flex gap-2" data-v-86b3200c><span class="text-brand-primary mt-1" data-v-86b3200c>\u203A</span> <strong class="text-white" data-v-86b3200c>Vercel Inc.</strong> (USA) \u2014 hosting i CDN (umowa DPA)</li></ul></section><section data-v-86b3200c><h2 class="text-xl font-display font-bold text-white mb-3" data-v-86b3200c>9. Zmiany polityki</h2><p class="text-brand-muted leading-relaxed" data-v-86b3200c> Niniejsza polityka prywatno\u015Bci mo\u017Ce by\u0107 aktualizowana. O istotnych zmianach poinformuj\u0119 na stronie g\u0142\xF3wnej. Data ostatniej aktualizacji widnieje na pocz\u0105tku dokumentu. </p></section></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/polityka-prywatnosci.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const politykaPrywatnosci = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-86b3200c"]]);

export { politykaPrywatnosci as default };
//# sourceMappingURL=polityka-prywatnosci-cSxsK8sk.mjs.map
