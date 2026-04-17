import type { BlogPost, BlogSeries, BlogCategory } from '~/types/blog'
import { piniaSeries, piniaPostsData } from '~/data/pinia-series'

export function useDirectus() {
  const config = useRuntimeConfig()
  const directusUrl = config.public.directusUrl as string | undefined

  const isDirectusConfigured = computed(() => Boolean(directusUrl))

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  function getTr(translations: any[] | undefined, lang: string): Record<string, string> {
    if (!translations?.length) return {}
    return translations.find((t: any) => t.languages_code === lang) || translations[0] || {}
  }

  // ---------------------------------------------------------------------------
  // Fetch series (knowledge_series)
  // ---------------------------------------------------------------------------

  async function fetchSeries(): Promise<BlogSeries[]> {
    const allSeries: BlogSeries[] = [piniaSeries]

    if (directusUrl) {
      try {
        const [seriesRes, postsRes] = await Promise.all([
          $fetch<{ data: any[] }>(`${directusUrl}/items/knowledge_series`, {
            params: {
              'filter[status][_eq]': 'published',
              'fields': 'id,slug,emoji,cover_color,category.slug,translations.name,translations.description,translations.languages_code',
              'sort': 'sort',
            },
          }),
          $fetch<{ data: any[] }>(`${directusUrl}/items/knowledge_posts`, {
            params: {
              'filter[status][_eq]': 'published',
              'fields': 'series',
            },
          }),
        ])

        if (seriesRes?.data?.length) {
          // Count posts per series id
          const postCounts: Record<string, number> = {}
          postsRes?.data?.forEach((p: any) => {
            const sid = typeof p.series === 'object' ? p.series?.id : p.series
            if (sid) postCounts[sid] = (postCounts[sid] || 0) + 1
          })

          const directusSeries = seriesRes.data
            .filter((item: any) => item.slug !== 'pinia-od-a-do-z') // avoid duplicating hardcoded
            .map((item: any) => {
              const pl = getTr(item.translations, 'pl-PL')
              const en = getTr(item.translations, 'en-US')
              return {
                slug: item.slug,
                name: pl.name || en.name || item.slug,
                nameEn: en.name || pl.name || item.slug,
                description: pl.description || en.description || '',
                descriptionEn: en.description || pl.description || '',
                emoji: item.emoji || '📚',
                category: typeof item.category === 'object' ? item.category?.slug : item.category || '',
                totalPosts: postCounts[item.id] || 0,
                coverColor: item.cover_color || 'from-cyan-500/20 to-blue-500/20',
              } satisfies BlogSeries
            })

          allSeries.push(...directusSeries)
        }
      } catch {
        // Directus not reachable – keep static data only
      }
    }
    return allSeries
  }

  // ---------------------------------------------------------------------------
  // Fetch post slugs grouped by series slug (for progress tracking)
  // ---------------------------------------------------------------------------

  async function fetchSeriesPostSlugs(): Promise<Record<string, string[]>> {
    const grouped: Record<string, string[]> = {
      'pinia-od-a-do-z': piniaPostsData.map((p) => p.slug),
    }

    if (directusUrl) {
      try {
        const response = await $fetch<{ data: any[] }>(
          `${directusUrl}/items/knowledge_posts`,
          {
            params: {
              'filter[status][_eq]': 'published',
              'fields': 'slug,series.slug',
              'sort': 'sort',
            },
          },
        )
        if (response?.data) {
          response.data.forEach((item: any) => {
            const seriesSlug = typeof item.series === 'object' ? item.series?.slug : ''
            if (seriesSlug) {
              if (!grouped[seriesSlug]) grouped[seriesSlug] = []
              grouped[seriesSlug].push(item.slug)
            }
          })
        }
      } catch {
        // Fall back to static data only
      }
    }
    return grouped
  }

  // ---------------------------------------------------------------------------
  // Fetch posts by series slug (knowledge_posts – without content)
  // ---------------------------------------------------------------------------

  async function fetchPostsBySeries(seriesSlug: string): Promise<BlogPost[]> {
    if (directusUrl) {
      try {
        const response = await $fetch<{ data: any[] }>(
          `${directusUrl}/items/knowledge_posts`,
          {
            params: {
              'filter[series][slug][_eq]': seriesSlug,
              'filter[status][_eq]': 'published',
              'sort': 'sort',
              'fields': [
                'id', 'slug', 'emoji', 'sort', 'reading_time', 'tags', 'status',
                'date_created', 'date_updated',
                'series.slug', 'series.category.slug',
                'series.translations.name', 'series.translations.languages_code',
                'translations.title', 'translations.excerpt', 'translations.languages_code',
              ].join(','),
            },
          },
        )
        if (response?.data) {
          return response.data.map((item: any) => mapDirectusPost(item, seriesSlug))
        }
      } catch {
        // Fall back to static data
      }
    }

    if (seriesSlug === 'pinia-od-a-do-z') {
      return piniaPostsData
    }
    return []
  }

  // ---------------------------------------------------------------------------
  // Fetch single post by slug (knowledge_posts – with content)
  // ---------------------------------------------------------------------------

  async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
    if (directusUrl) {
      try {
        const response = await $fetch<{ data: any[] }>(
          `${directusUrl}/items/knowledge_posts`,
          {
            params: {
              'filter[slug][_eq]': slug,
              'filter[status][_eq]': 'published',
              'limit': 1,
              'fields': [
                'id', 'slug', 'emoji', 'sort', 'reading_time', 'tags', 'status',
                'date_created', 'date_updated',
                'series.slug', 'series.category.slug',
                'series.translations.name', 'series.translations.languages_code',
                'translations.title', 'translations.excerpt', 'translations.content', 'translations.languages_code',
              ].join(','),
            },
          },
        )
        if (response?.data?.[0]) {
          return mapDirectusPost(response.data[0])
        }
      } catch {
        // Fall back to static data
      }
    }

    return piniaPostsData.find((p) => p.slug === slug) ?? null
  }

  // ---------------------------------------------------------------------------
  // Fetch categories (knowledge_categories)
  // ---------------------------------------------------------------------------

  async function fetchCategories(): Promise<BlogCategory[]> {
    if (!directusUrl) return []
    try {
      const response = await $fetch<{ data: any[] }>(
        `${directusUrl}/items/knowledge_categories`,
        {
          params: {
            'filter[status][_eq]': 'published',
            'fields': 'id,slug,emoji,translations.name,translations.languages_code',
            'sort': 'sort',
          },
        },
      )
      if (response?.data) {
        return response.data.map((item: any) => {
          const pl = getTr(item.translations, 'pl-PL')
          const en = getTr(item.translations, 'en-US')
          return {
            id: String(item.id),
            slug: item.slug,
            name: pl.name || en.name || item.slug,
            nameEn: en.name || pl.name || item.slug,
            emoji: item.emoji || '📁',
          } satisfies BlogCategory
        })
      }
    } catch {
      // Directus not reachable
    }
    return []
  }

  // ---------------------------------------------------------------------------
  // Image helper
  // ---------------------------------------------------------------------------

  function getImageUrl(imageId: string): string {
    if (!directusUrl) return ''
    return `${directusUrl}/assets/${imageId}`
  }

  // ---------------------------------------------------------------------------
  // Map Directus knowledge_post → BlogPost
  // ---------------------------------------------------------------------------

  function mapDirectusPost(item: any, seriesSlugOverride?: string): BlogPost {
    const pl = getTr(item.translations, 'pl-PL')
    const en = getTr(item.translations, 'en-US')

    const series = item.series || {}
    const seriesPl = getTr(series.translations, 'pl-PL')
    const seriesEn = getTr(series.translations, 'en-US')

    return {
      id: item.id,
      slug: item.slug,
      title: pl.title || en.title || '',
      titleEn: en.title || '',
      excerpt: pl.excerpt || en.excerpt || '',
      excerptEn: en.excerpt || '',
      content: pl.content || en.content || '',
      contentEn: en.content || '',
      category: typeof series.category === 'object' ? series.category?.slug : series.category || '',
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
    isDirectusConfigured,
    fetchSeries,
    fetchSeriesPostSlugs,
    fetchCategories,
    fetchPostsBySeries,
    fetchPostBySlug,
    getImageUrl,
  }
}
