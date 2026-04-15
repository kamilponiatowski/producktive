import type { RouterConfig } from '@nuxt/schema'

// Scroll to top on every page navigation (fixes SPA navigation where scroll position was preserved)
export default <RouterConfig>{
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  },
}
