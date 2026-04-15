import type { BlogPost, BlogSeries } from '~/types/blog'
import { piniaSeries, piniaPostsData } from '~/data/pinia-series'

export function useDirectus() {
  const config = useRuntimeConfig()
  const directusUrl = config.public.directusUrl as string | undefined

  const isDirectusConfigured = computed(() => Boolean(directusUrl))

  async function fetchSeries(): Promise<BlogSeries[]> {
    if (directusUrl) {
      try {
        const response = await $fetch<{ data: any[] }>(
          `${directusUrl}/items/posts`,
          {
            params: {
              'filter[status][_eq]': 'published',
              'fields': 'series_name,category,tags',
              'groupBy[]': 'series_name',
              'aggregate[count]': 'id',
            },
          },
        )
        if (response?.data) {
          return response.data.map((item: any) => ({
            slug: slugify(item.series_name),
            name: item.series_name,
            description: '',
            descriptionEn: '',
            emoji: '📚',
            category: item.category || 'vue',
            totalPosts: item.count?.id || 0,
            coverColor: 'from-cyan-500/20 to-blue-500/20',
          }))
        }
      } catch {
        // Directus not reachable – fall back to static data
      }
    }
    return [piniaSeries]
  }

  async function fetchPostsBySeries(seriesSlug: string): Promise<BlogPost[]> {
    if (directusUrl) {
      try {
        const seriesName = deslugify(seriesSlug)
        const response = await $fetch<{ data: any[] }>(
          `${directusUrl}/items/posts`,
          {
            params: {
              'filter[series_name][_eq]': seriesName,
              'filter[status][_eq]': 'published',
              'sort': 'sort_order',
              'fields': 'id,title,slug,excerpt,category,tags,series_name,sort_order,reading_time,date_created,date_updated',
            },
          },
        )
        if (response?.data) {
          return mapDirectusPosts(response.data, seriesSlug)
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

  async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
    if (directusUrl) {
      try {
        const response = await $fetch<{ data: any[] }>(
          `${directusUrl}/items/posts`,
          {
            params: {
              'filter[slug][_eq]': slug,
              'filter[status][_eq]': 'published',
              'fields': '*',
              'limit': 1,
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

  function getImageUrl(imageId: string): string {
    if (!directusUrl) return ''
    return `${directusUrl}/assets/${imageId}`
  }

  return {
    isDirectusConfigured,
    fetchSeries,
    fetchPostsBySeries,
    fetchPostBySlug,
    getImageUrl,
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .trim()
}

function deslugify(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function mapDirectusPosts(items: any[], seriesSlug: string): BlogPost[] {
  return items.map((item) => mapDirectusPost(item, seriesSlug))
}

function mapDirectusPost(item: any, seriesSlug?: string): BlogPost {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    titleEn: item.title_en || '',
    excerpt: item.excerpt || '',
    excerptEn: item.excerpt_en || '',
    content: item.content || '',
    contentEn: item.content_en || '',
    category: item.category || '',
    tags: Array.isArray(item.tags) ? item.tags : [],
    seriesName: item.series_name || '',
    seriesNameEn: item.series_name_en || '',
    seriesSlug: seriesSlug || slugify(item.series_name || ''),
    sortOrder: item.sort_order || 0,
    readingTime: item.reading_time || 5,
    emoji: item.emoji || '📄',
    status: item.status || 'published',
    dateCreated: item.date_created || new Date().toISOString(),
    dateUpdated: item.date_updated || new Date().toISOString(),
  }
}
