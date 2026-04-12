import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        // Code splitting per sekcja — mniejszy initial bundle
        // (tymczasowo uproszczone)
        manualChunks: {
          'vendor-vue': ['vue', '@vueuse/core', '@vueuse/motion'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-swiper': ['swiper']
        }
      }
    }
  }
})
