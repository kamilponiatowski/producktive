export interface BlogPost {
  id: number
  slug: string
  title: string
  titleEn?: string
  excerpt: string
  excerptEn?: string
  content: string
  contentEn?: string
  category: string
  tags: string[]
  seriesName: string
  seriesNameEn?: string
  seriesSlug: string
  sortOrder: number
  readingTime: number
  emoji: string
  status: 'draft' | 'published' | 'archived'
  dateCreated: string
  dateUpdated: string
}

export interface BlogSeries {
  slug: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  emoji: string
  category: string
  totalPosts: number
  coverColor: string
}
