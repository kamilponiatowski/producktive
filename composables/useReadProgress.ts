import { useLocalStorage } from '@vueuse/core'

const STORAGE_KEY = 'producktive-read-progress'

export function useReadProgress() {
  const readPosts = useLocalStorage<string[]>(STORAGE_KEY, [])

  function isRead(slug: string): boolean {
    return readPosts.value.includes(slug)
  }

  function toggleRead(slug: string) {
    if (isRead(slug)) {
      readPosts.value = readPosts.value.filter((s) => s !== slug)
    } else {
      readPosts.value = [...readPosts.value, slug]
    }
  }

  function markAsRead(slug: string) {
    if (!isRead(slug)) {
      readPosts.value = [...readPosts.value, slug]
    }
  }

  function getSeriesProgress(postSlugs: string[]): number {
    if (postSlugs.length === 0) return 0
    const readCount = postSlugs.filter((s) => readPosts.value.includes(s)).length
    return Math.round((readCount / postSlugs.length) * 100)
  }

  function getReadCount(postSlugs: string[]): number {
    return postSlugs.filter((s) => readPosts.value.includes(s)).length
  }

  return {
    readPosts,
    isRead,
    toggleRead,
    markAsRead,
    getSeriesProgress,
    getReadCount,
  }
}
