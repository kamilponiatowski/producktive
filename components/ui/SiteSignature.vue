<template>
  <!--
    SiteSignature — umieść w stopce klientów.
    Przykład użycia: <SiteSignature />
  -->
  <div class="flex items-center justify-center gap-1.5 text-xs text-gray-400/60 py-2">
    <span>Wykonane przez</span>
    <a
      href="https://producktive.pl"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-1 text-[#00E5FF]/70 hover:text-[#00E5FF] transition-colors font-mono font-semibold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00E5FF] rounded"
    >
      <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
      Producktive.pl
      <span class="sr-only">(otwiera się w nowym oknie)</span>
    </a>
  </div>
</template>
