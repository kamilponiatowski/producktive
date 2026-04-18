import type { BlogPost, BlogSeries, BlogCategory } from '~/types/blog'
import { piniaSeries, piniaPostsData, FALLBACK_CATEGORIES } from '~/data/pinia-series'

export function useDirectus() {
  const config = useRuntimeConfig()
  const directusUrl = config.public.directusUrl as string | undefined

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  function getTranslation(translations: any[] | undefined, lang: string): Record<string, string> {
    if (!translations?.length) return {}
    return translations.find((t: any) => t.languages_code === lang) || translations[0] || {}
  }

  function resolveRelationSlug(field: unknown): string {
    return typeof field === 'object' && field !== null ? (field as any)?.slug ?? '' : String(field || '')
  }

  // ---------------------------------------------------------------------------
  // Directus API fetch wrapper (returns null on failure)
  // ---------------------------------------------------------------------------

  async function fetchFromDirectus<T>(path: string, params: Record<string, any>): Promise<T | null> {
    if (!directusUrl) return null
    try {
      const result = await $fetch(`${directusUrl}${path}`, { params })
      return result as T
    } catch {
      return null
    }
  }

  // ---------------------------------------------------------------------------
  // Fetch series (knowledge_series)
  // ---------------------------------------------------------------------------

  async function fetchSeries(): Promise<BlogSeries[]> {
    const staticSeries: BlogSeries[] = [piniaSeries]

    const [seriesRes, postsRes] = await Promise.all([
      fetchFromDirectus<{ data: any[] }>('/items/knowledge_series', {
        'filter[status][_eq]': 'published',
        'fields': 'id,slug,emoji,cover_color,subcategory,category.slug,translations.name,translations.description,translations.languages_code',
        'sort': 'sort',
      }),
      fetchFromDirectus<{ data: any[] }>('/items/knowledge_posts', {
        'filter[status][_eq]': 'published',
        'fields': 'series',
      }),
    ])

    if (!seriesRes?.data?.length) return staticSeries

    const postCounts = countPostsBySeries(postsRes?.data)
    const directusSeries = seriesRes.data
      .filter((item: any) => item.slug !== piniaSeries.slug)
      .map((item: any) => mapDirectusSeries(item, postCounts))

    return [...staticSeries, ...directusSeries]
  }

  // ---------------------------------------------------------------------------
  // Fetch post slugs grouped by series slug (for progress tracking)
  // ---------------------------------------------------------------------------

  async function fetchSeriesPostSlugs(): Promise<Record<string, string[]>> {
    const grouped: Record<string, string[]> = {
      [piniaSeries.slug]: piniaPostsData.map((p) => p.slug),
    }

    const response = await fetchFromDirectus<{ data: any[] }>('/items/knowledge_posts', {
      'filter[status][_eq]': 'published',
      'fields': 'slug,series.slug',
      'sort': 'sort',
    })

    response?.data?.forEach((item: any) => {
      const seriesSlug = resolveRelationSlug(item.series)
      if (seriesSlug) {
        grouped[seriesSlug] ??= []
        grouped[seriesSlug].push(item.slug)
      }
    })

    return grouped
  }

  // ---------------------------------------------------------------------------
  // Fetch posts by series slug (without content)
  // ---------------------------------------------------------------------------

  const POST_LIST_FIELDS = [
    'id', 'slug', 'emoji', 'sort', 'reading_time', 'tags', 'status',
    'date_created', 'date_updated',
    'series.slug', 'series.category.slug',
    'series.translations.name', 'series.translations.languages_code',
    'translations.title', 'translations.excerpt', 'translations.languages_code',
  ].join(',')

  async function fetchPostsBySeries(seriesSlug: string): Promise<BlogPost[]> {
    const response = await fetchFromDirectus<{ data: any[] }>('/items/knowledge_posts', {
      'filter[series][slug][_eq]': seriesSlug,
      'filter[status][_eq]': 'published',
      'sort': 'sort',
      'fields': POST_LIST_FIELDS,
    })

    if (response?.data?.length) {
      return response.data.map((item: any) => mapDirectusPost(item, seriesSlug))
    }

    if (seriesSlug === piniaSeries.slug) return piniaPostsData
    return []
  }

  // ---------------------------------------------------------------------------
  // Fetch single post by slug (with content)
  // ---------------------------------------------------------------------------

  const POST_DETAIL_FIELDS = [
    'id', 'slug', 'emoji', 'sort', 'reading_time', 'tags', 'status',
    'date_created', 'date_updated',
    'series.slug', 'series.category.slug',
    'series.translations.name', 'series.translations.languages_code',
    'translations.title', 'translations.excerpt', 'translations.content', 'translations.languages_code',
  ].join(',')

  async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
    const response = await fetchFromDirectus<{ data: any[] }>('/items/knowledge_posts', {
      'filter[slug][_eq]': slug,
      'filter[status][_eq]': 'published',
      'limit': 1,
      'fields': POST_DETAIL_FIELDS,
    })

    if (response?.data?.[0]) {
      return mapDirectusPost(response.data[0])
    }

    return piniaPostsData.find((p) => p.slug === slug) ?? null
  }

  // ---------------------------------------------------------------------------
  // Fetch categories (knowledge_categories) — falls back to static categories
  // ---------------------------------------------------------------------------

  async function fetchCategories(): Promise<BlogCategory[]> {
    const response = await fetchFromDirectus<{ data: any[] }>('/items/knowledge_categories', {
      'filter[status][_eq]': 'published',
      'fields': 'id,slug,emoji,translations.name,translations.languages_code',
      'sort': 'sort',
    })

    if (response?.data?.length) {
      return response.data.map((item: any) => {
        const pl = getTranslation(item.translations, 'pl-PL')
        const en = getTranslation(item.translations, 'en-US')
        return {
          id: String(item.id),
          slug: item.slug,
          name: pl.name || en.name || item.slug,
          nameEn: en.name || pl.name || item.slug,
          emoji: item.emoji || '📁',
        } satisfies BlogCategory
      })
    }

    return FALLBACK_CATEGORIES
  }

  // ---------------------------------------------------------------------------
  // Internal mappers
  // ---------------------------------------------------------------------------

  function countPostsBySeries(posts: any[] | undefined): Record<string, number> {
    const counts: Record<string, number> = {}
    posts?.forEach((p: any) => {
      const sid = typeof p.series === 'object' ? p.series?.id : p.series
      if (sid) counts[sid] = (counts[sid] || 0) + 1
    })
    return counts
  }

  function mapDirectusSeries(item: any, postCounts: Record<string, number>): BlogSeries {
    const pl = getTranslation(item.translations, 'pl-PL')
    const en = getTranslation(item.translations, 'en-US')
    return {
      slug: item.slug,
      name: pl.name || en.name || item.slug,
      nameEn: en.name || pl.name || item.slug,
      description: pl.description || en.description || '',
      descriptionEn: en.description || pl.description || '',
      emoji: item.emoji || '📚',
      category: resolveRelationSlug(item.category),
      subcategory: item.subcategory || undefined,
      totalPosts: postCounts[item.id] || 0,
      coverColor: item.cover_color || 'from-cyan-500/20 to-blue-500/20',
    }
  }

  function mapDirectusPost(item: any, seriesSlugOverride?: string): BlogPost {
    const pl = getTranslation(item.translations, 'pl-PL')
    const en = getTranslation(item.translations, 'en-US')

    const series = item.series || {}
    const seriesPl = getTranslation(series.translations, 'pl-PL')
    const seriesEn = getTranslation(series.translations, 'en-US')

    return {
      id: item.id,
      slug: item.slug,
      title: pl.title || en.title || '',
      titleEn: en.title || '',
      excerpt: pl.excerpt || en.excerpt || '',
      excerptEn: en.excerpt || '',
      content: pl.content || en.content || '',
      contentEn: en.content || '',
      category: resolveRelationSlug(series.category),
      tags: Array.isArray(item.tags) ? item.tags : [],
      seriesName: seriesPl.name || seriesEn.name || '',
      seriesNameEn: seriesEn.name || '',
      seriesSlug: seriesSlugOverride || series.slug || '',
      sortOrder: item.sort || 0,
      readingTime: item.reading_time || 5,
      emoji: item.emoji || '📄',
      status: item.status || 'published',
      dateCreated: item.date_created || new Date().toISOString(),
      dateUpdated: item.date_updated || new Date().toISOString(),
    }
  }

  return {
    fetchSeries,
    fetchSeriesPostSlugs,
    fetchCategories,
    fetchPostsBySeries,
    fetchPostBySlug,
  }
}
