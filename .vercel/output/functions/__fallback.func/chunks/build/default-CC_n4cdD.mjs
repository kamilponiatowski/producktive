import { defineComponent, ref, unref, computed, mergeProps, useSSRContext, withCtx, createTextVNode, toDisplayString } from 'vue';
import { ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import { a as useI18n, c as useCookie } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-C4G3L7lA.mjs';
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

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "NavBar",
  __ssrInlineRender: true,
  setup(__props) {
    const { t, locale, setLocale, locales } = useI18n();
    const isScrolled = ref(false);
    const isMobileOpen = ref(false);
    const navLinks = computed(() => [
      { href: "#uslugi", label: t("nav.services") },
      { href: "#portfolio", label: t("nav.portfolio") },
      { href: "#o-mnie", label: t("nav.about") },
      { href: "#proces", label: t("nav.process") }
    ]);
    const availableLocales = computed(
      () => locales.value.filter(
        (l) => l.code !== locale.value
      )
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: [
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          unref(isScrolled) ? "bg-brand-dark/80 backdrop-blur-xl border-b border-white/5 shadow-card" : "bg-transparent"
        ],
        role: "banner"
      }, _attrs))} data-v-eae203cf><nav class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"${ssrRenderAttr("aria-label", unref(t)("nav.services"))} data-v-eae203cf><a href="#" class="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark rounded-lg"${ssrRenderAttr("aria-label", unref(t)("a11y.logo"))} data-v-eae203cf><div class="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center font-bold text-white text-sm font-mono" aria-hidden="true" data-v-eae203cf> P </div><span class="font-display font-bold text-lg text-white group-hover:text-gradient transition-all" data-v-eae203cf> Producktive </span></a><div class="hidden md:flex items-center gap-1" role="navigation" data-v-eae203cf><!--[-->`);
      ssrRenderList(unref(navLinks), (link) => {
        _push(`<button class="btn-ghost focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark rounded-lg" data-v-eae203cf>${ssrInterpolate(link.label)}</button>`);
      });
      _push(`<!--]--></div><div class="hidden md:flex items-center gap-3" data-v-eae203cf><!--[-->`);
      ssrRenderList(unref(availableLocales), (loc) => {
        _push(`<button class="text-xs font-mono text-brand-muted hover:text-white transition-colors px-2 py-1 rounded border border-white/10 hover:border-brand-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"${ssrRenderAttr("aria-label", `${unref(t)("a11y.languageSwitch")}: ${loc.name}`)} data-v-eae203cf>${ssrInterpolate(loc.code.toUpperCase())}</button>`);
      });
      _push(`<!--]--><button class="btn-primary text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark" data-v-eae203cf>${ssrInterpolate(unref(t)("nav.cta"))} <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" data-v-eae203cf><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" data-v-eae203cf></path></svg></button></div><div class="md:hidden flex items-center gap-2" data-v-eae203cf><!--[-->`);
      ssrRenderList(unref(availableLocales), (loc) => {
        _push(`<button class="text-xs font-mono text-brand-muted hover:text-white px-2 py-1 rounded border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"${ssrRenderAttr("aria-label", `${unref(t)("a11y.languageSwitch")}: ${loc.name}`)} data-v-eae203cf>${ssrInterpolate(loc.code.toUpperCase())}</button>`);
      });
      _push(`<!--]--><button class="p-2 text-brand-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg"${ssrRenderAttr("aria-label", unref(isMobileOpen) ? unref(t)("nav.closeMenu") : unref(t)("nav.openMenu"))}${ssrRenderAttr("aria-expanded", unref(isMobileOpen))} data-v-eae203cf><div class="w-5 h-4 flex flex-col justify-between" data-v-eae203cf><span class="${ssrRenderClass([unref(isMobileOpen) ? "rotate-45 translate-y-1.5" : "", "block h-0.5 bg-current transition-all duration-300"])}" data-v-eae203cf></span><span class="${ssrRenderClass([unref(isMobileOpen) ? "opacity-0" : "", "block h-0.5 bg-current transition-all duration-300"])}" data-v-eae203cf></span><span class="${ssrRenderClass([unref(isMobileOpen) ? "-rotate-45 -translate-y-1.5" : "", "block h-0.5 bg-current transition-all duration-300"])}" data-v-eae203cf></span></div></button></div></nav>`);
      if (unref(isMobileOpen)) {
        _push(`<div class="md:hidden bg-brand-card/95 backdrop-blur-xl border-b border-white/5" role="navigation" data-v-eae203cf><div class="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-2" data-v-eae203cf><!--[-->`);
        ssrRenderList(unref(navLinks), (link) => {
          _push(`<button class="text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary" data-v-eae203cf>${ssrInterpolate(link.label)}</button>`);
        });
        _push(`<!--]--><button class="btn-primary mt-2 justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" data-v-eae203cf>${ssrInterpolate(unref(t)("nav.cta"))} \u2192 </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/NavBar.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-eae203cf"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "FooterSection",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    const links = computed(() => [
      { label: t("nav.services"), href: "#uslugi" },
      { label: t("nav.portfolio"), href: "#portfolio" },
      { label: t("nav.about"), href: "#o-mnie" },
      { label: t("contact.badge"), href: "#kontakt" }
    ]);
    const legal = computed(() => [
      { label: t("footer.privacy"), href: "/polityka-prywatnosci" },
      { label: t("footer.terms"), href: "/terms" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({
        class: "border-t border-white/5 bg-brand-card/30",
        role: "contentinfo"
      }, _attrs))}><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><div class="grid sm:grid-cols-3 gap-8 mb-8"><div><div class="flex items-center gap-2 mb-3"><div class="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center font-bold text-white text-sm font-mono" aria-hidden="true"> P </div><span class="font-display font-bold text-white">Producktive</span></div><p class="text-brand-muted text-sm leading-relaxed">${ssrInterpolate(unref(t)("footer.desc"))}</p><p class="text-brand-muted/60 text-xs mt-3 flex items-center gap-1"> \u{1F4CD} ${ssrInterpolate(unref(t)("footer.location"))}</p></div><div><div class="text-white/50 text-xs font-mono uppercase tracking-wider mb-3">${ssrInterpolate(unref(t)("footer.navTitle"))}</div><div class="space-y-2"><!--[-->`);
      ssrRenderList(unref(links), (link) => {
        _push(`<a${ssrRenderAttr("href", link.href)} class="block text-brand-muted hover:text-white transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded">${ssrInterpolate(link.label)}</a>`);
      });
      _push(`<!--]--></div></div><div><div class="text-white/50 text-xs font-mono uppercase tracking-wider mb-3">${ssrInterpolate(unref(t)("footer.contactTitle"))}</div><div class="space-y-2 text-sm text-brand-muted"><a href="mailto:kontakt@producktive.pl" class="block hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"> kontakt@producktive.pl </a><a href="tel:+48886127854" class="block hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"> +48 886 127 854 </a><a href="https://www.linkedin.com/in/kamil-poniatowski-rev/" target="_blank" rel="noopener noreferrer" class="block hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"> LinkedIn <span class="sr-only">(${ssrInterpolate(unref(t)("a11y.externalLink"))})</span></a></div></div></div><div class="divider-gradient"></div><div class="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-brand-muted"><span>${ssrInterpolate(unref(t)("footer.copyright", { year: unref(year) }))}</span><div class="flex gap-4"><!--[-->`);
      ssrRenderList(unref(legal), (l) => {
        _push(`<a${ssrRenderAttr("href", l.href)} class="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded">${ssrInterpolate(l.label)}</a>`);
      });
      _push(`<!--]--></div></div></div></footer>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/FooterSection.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "CookieConsent",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useCookie("cookie_consent", { maxAge: 60 * 60 * 24 * 365, default: () => "" });
    const show = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      if (unref(show)) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6",
          role: "dialog",
          "aria-live": "polite",
          "aria-label": unref(t)("cookie.title")
        }, _attrs))} data-v-c6cd9975><div class="max-w-2xl mx-auto bg-brand-card/95 backdrop-blur-xl border border-brand-primary/15 rounded-2xl p-5 shadow-brand flex flex-col sm:flex-row items-start sm:items-center gap-4" data-v-c6cd9975><div class="shrink-0 text-brand-primary hidden sm:flex" aria-hidden="true" data-v-c6cd9975><svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-c6cd9975><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-v-c6cd9975></path></svg></div><div class="flex-1" data-v-c6cd9975><p class="text-white text-sm font-semibold mb-1" data-v-c6cd9975>${ssrInterpolate(unref(t)("cookie.title"))}</p><p class="text-brand-muted text-xs leading-relaxed" data-v-c6cd9975>${ssrInterpolate(unref(t)("cookie.desc"))} `);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/polityka-prywatnosci",
          class: "text-brand-primary hover:underline ml-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary rounded"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(t)("cookie.learnMore"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(t)("cookie.learnMore")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p></div><div class="flex gap-2 shrink-0" data-v-c6cd9975><button class="btn-ghost text-xs border border-white/10 rounded-lg px-3 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary" data-v-c6cd9975>${ssrInterpolate(unref(t)("cookie.reject"))}</button><button class="btn-primary text-xs px-4 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" data-v-c6cd9975>${ssrInterpolate(unref(t)("cookie.accept"))}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/CookieConsent.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-c6cd9975"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "LofiPlayer",
  __ssrInlineRender: true,
  setup(__props) {
    const playing = ref(false);
    const visible = ref(true);
    ref(null);
    const loading = ref(false);
    const error = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(visible)) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "fixed bottom-32 right-4 z-40 flex items-center gap-2",
          role: "complementary",
          "aria-label": "Odtwarzacz muzyki lofi"
        }, _attrs))} data-v-294a9cb8><audio preload="none" aria-hidden="true" data-v-294a9cb8></audio><button class="w-7 h-7 rounded-full bg-brand-card/80 border border-white/10 flex items-center justify-center text-brand-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary backdrop-blur-sm"${ssrRenderAttr("aria-label", "Zamknij odtwarzacz")} data-v-294a9cb8><svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-294a9cb8><line x1="18" y1="6" x2="6" y2="18" data-v-294a9cb8></line><line x1="6" y1="6" x2="18" y2="18" data-v-294a9cb8></line></svg></button><button class="flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-card/90 border border-brand-primary/30 text-brand-primary hover:bg-brand-primary/10 transition-all duration-200 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary text-xs font-mono shadow-card"${ssrRenderAttr("aria-label", unref(playing) ? "Zatrzymaj muzyk\u0119 lofi" : "Odtw\xF3rz muzyk\u0119 lofi")}${ssrRenderAttr("aria-pressed", unref(playing))} data-v-294a9cb8>`);
        if (unref(loading)) {
          _push(`<svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true" data-v-294a9cb8><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" data-v-294a9cb8></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" data-v-294a9cb8></path></svg>`);
        } else if (!unref(playing)) {
          _push(`<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-294a9cb8><circle cx="12" cy="12" r="10" data-v-294a9cb8></circle><polygon points="10 8 16 12 10 16 10 8" data-v-294a9cb8></polygon></svg>`);
        } else {
          _push(`<span class="flex items-end gap-0.5 h-4" aria-hidden="true" data-v-294a9cb8><span class="w-0.5 bg-brand-primary rounded-full animate-lofi-bar1" style="${ssrRenderStyle({ "height": "60%" })}" data-v-294a9cb8></span><span class="w-0.5 bg-brand-primary rounded-full animate-lofi-bar2" style="${ssrRenderStyle({ "height": "100%" })}" data-v-294a9cb8></span><span class="w-0.5 bg-brand-primary rounded-full animate-lofi-bar3" style="${ssrRenderStyle({ "height": "40%" })}" data-v-294a9cb8></span><span class="w-0.5 bg-brand-primary rounded-full animate-lofi-bar2" style="${ssrRenderStyle({ "height": "80%" })}" data-v-294a9cb8></span></span>`);
        }
        if (unref(error)) {
          _push(`<span class="text-red-400" data-v-294a9cb8>Brak po\u0142\u0105czenia</span>`);
        } else {
          _push(`<span data-v-294a9cb8>lofi</span>`);
        }
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/LofiPlayer.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-294a9cb8"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ContactPopup",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const show = ref(false);
    const phone = ref("");
    const consent = ref(false);
    const submitting = ref(false);
    const submitted = ref(false);
    const phoneError = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      if (unref(show)) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4",
          role: "dialog",
          "aria-modal": "true",
          "aria-label": unref(t)("popup.title")
        }, _attrs))} data-v-bb5083f3><div class="absolute inset-0 bg-brand-dark/70 backdrop-blur-sm" aria-hidden="true" data-v-bb5083f3></div><div class="relative w-full max-w-sm bg-brand-card border border-brand-primary/20 rounded-2xl p-6 shadow-brand z-10" data-v-bb5083f3><button class="absolute top-4 right-4 w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-brand-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"${ssrRenderAttr("aria-label", unref(t)("popup.close"))} data-v-bb5083f3><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-bb5083f3><line x1="18" y1="6" x2="6" y2="18" data-v-bb5083f3></line><line x1="6" y1="6" x2="18" y2="18" data-v-bb5083f3></line></svg></button>`);
        if (unref(submitted)) {
          _push(`<div class="text-center py-4" data-v-bb5083f3><div class="flex justify-center mb-3" aria-hidden="true" data-v-bb5083f3><svg class="w-12 h-12 text-brand-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-bb5083f3><path d="M22 11.08V12a10 10 0 11-5.93-9.14" data-v-bb5083f3></path><polyline points="22 4 12 14.01 9 11.01" data-v-bb5083f3></polyline></svg></div><p class="text-white font-semibold" data-v-bb5083f3>${ssrInterpolate(unref(t)("popup.success"))}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if (!unref(submitted)) {
          _push(`<div data-v-bb5083f3><div class="flex justify-center mb-4" aria-hidden="true" data-v-bb5083f3><div class="w-12 h-12 rounded-xl bg-brand-primary/15 flex items-center justify-center text-brand-primary" data-v-bb5083f3><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-bb5083f3><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81A2 2 0 017 6.1l-1.27 1.27a16 16 0 006.29 6.29L13.3 12a2 2 0 012.37-.44A12.84 12.84 0 0018.5 12a2 2 0 011.72 2v.92z" data-v-bb5083f3></path></svg></div></div><h2 class="text-white font-display font-bold text-xl text-center mb-1" data-v-bb5083f3>${ssrInterpolate(unref(t)("popup.title"))}</h2><p class="text-brand-muted text-sm text-center mb-5 leading-relaxed" data-v-bb5083f3>${ssrInterpolate(unref(t)("popup.desc"))}</p><form novalidate class="space-y-4" data-v-bb5083f3><input type="text" name="website_popup" autocomplete="off" tabindex="-1" class="hidden" aria-hidden="true" data-v-bb5083f3><div data-v-bb5083f3><label for="popup-phone" class="block text-sm text-white/70 mb-1.5" data-v-bb5083f3> Numer telefonu <span aria-hidden="true" data-v-bb5083f3>*</span></label><input id="popup-phone"${ssrRenderAttr("value", unref(phone))} type="tel"${ssrRenderAttr("placeholder", unref(t)("popup.phonePlaceholder"))} autocomplete="tel" class="${ssrRenderClass([unref(phoneError) ? "border-red-500/50" : "border-white/10", "w-full bg-brand-dark border rounded-xl px-4 py-3 text-white placeholder-brand-muted/50 focus:outline-none focus:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary transition-colors"])}"${ssrRenderAttr("aria-invalid", !!unref(phoneError))}${ssrRenderAttr("aria-describedby", unref(phoneError) ? "popup-phone-error" : void 0)} data-v-bb5083f3>`);
          if (unref(phoneError)) {
            _push(`<p id="popup-phone-error" class="text-red-400 text-xs mt-1" role="alert" data-v-bb5083f3>${ssrInterpolate(unref(phoneError))}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><label class="flex items-start gap-3 cursor-pointer group" data-v-bb5083f3><div class="relative mt-0.5 shrink-0" data-v-bb5083f3><input${ssrIncludeBooleanAttr(Array.isArray(unref(consent)) ? ssrLooseContain(unref(consent), null) : unref(consent)) ? " checked" : ""} type="checkbox" class="sr-only" required aria-required="true" data-v-bb5083f3><div class="${ssrRenderClass([unref(consent) ? "bg-brand-primary border-brand-primary" : "border-white/30 bg-transparent group-hover:border-brand-primary/50", "w-4 h-4 rounded border-2 transition-all duration-150 flex items-center justify-center"])}" aria-hidden="true" data-v-bb5083f3>`);
          if (unref(consent)) {
            _push(`<svg class="w-2.5 h-2.5 text-brand-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true" data-v-bb5083f3><polyline points="20 6 9 17 4 12" data-v-bb5083f3></polyline></svg>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><span class="text-brand-muted text-xs leading-relaxed" data-v-bb5083f3>${ssrInterpolate(unref(t)("popup.consent"))} `);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/polityka-prywatnosci",
            class: "text-brand-primary underline",
            onClick: () => {
            }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Polityka prywatno\u015Bci`);
              } else {
                return [
                  createTextVNode("Polityka prywatno\u015Bci")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`. </span></label><button type="submit"${ssrIncludeBooleanAttr(unref(submitting) || !unref(consent)) ? " disabled" : ""} class="${ssrRenderClass([unref(submitting) || !unref(consent) ? "opacity-60 cursor-not-allowed" : "", "btn-primary w-full justify-center py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"])}" data-v-bb5083f3>`);
          if (unref(submitting)) {
            _push(`<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true" data-v-bb5083f3><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-bb5083f3></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" data-v-bb5083f3></path></svg>`);
          } else {
            _push(`<!---->`);
          }
          _push(` ${ssrInterpolate(unref(submitting) ? unref(t)("popup.submitting") : unref(t)("popup.submit"))}</button><p class="text-brand-muted/50 text-xs text-center flex items-center justify-center gap-1.5" data-v-bb5083f3><svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-bb5083f3><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-v-bb5083f3></path></svg> ${ssrInterpolate(unref(t)("popup.privacy"))}</p></form></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/ContactPopup.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-bb5083f3"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ScrollButtons",
  __ssrInlineRender: true,
  setup(__props) {
    const showTop = ref(false);
    const showBottom = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "fixed bottom-4 right-4 z-40 flex flex-col gap-2",
        "aria-label": "Nawigacja przewijania",
        role: "navigation"
      }, _attrs))} data-v-6bcfd3bc>`);
      if (unref(showTop)) {
        _push(`<button class="w-10 h-10 rounded-xl bg-brand-card/90 border border-brand-primary/30 text-brand-primary hover:bg-brand-primary/15 hover:border-brand-primary transition-all duration-200 backdrop-blur-sm flex items-center justify-center shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary" aria-label="Przewi\u0144 do g\xF3ry" data-v-6bcfd3bc><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-6bcfd3bc><polyline points="18 15 12 9 6 15" data-v-6bcfd3bc></polyline></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showBottom)) {
        _push(`<button class="w-10 h-10 rounded-xl bg-brand-card/90 border border-white/10 text-brand-muted hover:bg-white/5 hover:text-white hover:border-brand-primary/30 transition-all duration-200 backdrop-blur-sm flex items-center justify-center shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary" aria-label="Przewi\u0144 do do\u0142u" data-v-6bcfd3bc><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-6bcfd3bc><polyline points="6 9 12 15 18 9" data-v-6bcfd3bc></polyline></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/ScrollButtons.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-6bcfd3bc"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    ref(null);
    ref(null);
    const isHovering = ref(false);
    const cursorReady = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutNavBar = __nuxt_component_0;
      const _component_LayoutFooterSection = _sfc_main$5;
      const _component_UiCookieConsent = __nuxt_component_2;
      const _component_UiLofiPlayer = __nuxt_component_3;
      const _component_UiContactPopup = __nuxt_component_4;
      const _component_UiScrollButtons = __nuxt_component_5;
      _push(`<!--[--><a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-primary focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-white">${ssrInterpolate(unref(t)("nav.skipToContent"))}</a><div class="cursor-dot hidden lg:block" style="${ssrRenderStyle({ opacity: cursorReady.value ? "1" : "0" })}" aria-hidden="true"></div><div class="${ssrRenderClass([{ hover: isHovering.value }, "cursor-ring hidden lg:block"])}" style="${ssrRenderStyle({ opacity: cursorReady.value ? "1" : "0" })}" aria-hidden="true"></div><div class="min-h-screen bg-brand-dark overflow-x-hidden relative z-10">`);
      _push(ssrRenderComponent(_component_LayoutNavBar, null, null, _parent));
      _push(`<main id="main-content" role="main">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(_component_LayoutFooterSection, null, null, _parent));
      _push(ssrRenderComponent(_component_UiCookieConsent, null, null, _parent));
      _push(ssrRenderComponent(_component_UiLofiPlayer, null, null, _parent));
      _push(ssrRenderComponent(_component_UiContactPopup, null, null, _parent));
      _push(ssrRenderComponent(_component_UiScrollButtons, null, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-CC_n4cdD.mjs.map
