<script setup lang="ts">
import { marked } from 'marked'
import hljs from 'highlight.js'

const props = defineProps<{
  content: string
}>()

// Configure marked with highlight.js for syntax highlighting (marked v9+ API)
marked.use({
  renderer: {
    code({ text, lang }: any): string {
      const validLang = lang && hljs.getLanguage(lang) ? lang : null
      const highlighted = validLang
        ? hljs.highlight(text, { language: validLang }).value
        : hljs.highlightAuto(text).value
      return `<pre><code class="hljs${validLang ? ` language-${validLang}` : ''}">${highlighted}</code></pre>\n`
    },
  },
})

const renderedHtml = computed(() => {
  if (!props.content) return ''
  // Strip the first h1 from content (it's already shown in the page header)
  const contentWithoutH1 = props.content.replace(/^#\s+.+\n*/m, '')
  return marked.parse(contentWithoutH1, { async: false }) as string
})
</script>

<template>
  <div
    class="prose prose-invert prose-lg max-w-none
           prose-headings:font-display prose-headings:text-white
           prose-h1:text-3xl prose-h1:md:text-4xl
           prose-h2:text-2xl prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-2
           prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline
           prose-code:text-brand-primary prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
           prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-0
           prose-blockquote:border-brand-primary/50 prose-blockquote:bg-brand-primary/5 prose-blockquote:rounded-r-lg prose-blockquote:py-1
           prose-strong:text-white
           prose-table:text-sm prose-th:text-brand-primary prose-td:border-white/10 prose-th:border-white/10"
    v-html="renderedHtml"
  />
</template>

<style>
/* Override highlight.js theme to match brand */
.hljs {
  display: block;
  overflow-x: auto;
  padding: 1.25rem 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #161B22;
  font-family: 'DM Mono', 'Fira Code', monospace;
  font-size: 0.875rem;
  line-height: 1.7;
}

/* Base text */
.hljs { color: #abb2bf; }

/* Keywords: const, let, var, function, return, if, for, import, export, from, etc. */
.hljs-keyword,
.hljs-built_in,
.hljs-type { color: #c678dd; }

/* Strings */
.hljs-string,
.hljs-template-string,
.hljs-template-tag { color: #98c379; }

/* Numbers and booleans */
.hljs-number,
.hljs-literal { color: #d19a66; }

/* Function / method names */
.hljs-title,
.hljs-title.function_,
.hljs-title.class_ { color: #61afef; }

/* Variables and params */
.hljs-variable,
.hljs-variable.language_,
.hljs-params { color: #e06c75; }

/* Properties: .someProperty */
.hljs-property { color: #e06c75; }

/* Comments */
.hljs-comment,
.hljs-doctag { color: #5c6370; font-style: italic; }

/* Punctuation & operators */
.hljs-punctuation,
.hljs-operator { color: #56b6c2; }

/* Attributes (HTML/JSX) */
.hljs-attr,
.hljs-attribute { color: #d19a66; }

/* Tags (HTML/JSX) */
.hljs-tag,
.hljs-name { color: #e06c75; }

/* Module/import names */
.hljs-module-access .hljs-built_in { color: #e5c07b; }

/* Bash commands */
.hljs-meta { color: #56b6c2; }

/* Inline code in prose should not use hljs background */
.prose :not(pre) > code {
  background: rgba(255, 255, 255, 0.05) !important;
  color: #00E5FF !important;
  padding: 0.125rem 0.375rem !important;
  border-radius: 0.25rem !important;
}

/* Override prose pre styles since hljs handles the block */
.prose pre {
  background: transparent !important;
  padding: 0 !important;
  border: none !important;
  border-radius: 0 !important;
  margin: 1.5rem 0 !important;
}

.prose pre code.hljs {
  font-size: 0.875rem !important;
}
</style>
