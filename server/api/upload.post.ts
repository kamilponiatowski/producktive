import { createClient } from '@supabase/supabase-js'

const ALLOWED_MIME = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

const MAX_SIZE = 5 * 1024 * 1024 // 5 MB

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const parts = await readMultipartFormData(event)
  if (!parts || parts.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No file provided.' })
  }

  const file = parts.find(p => p.name === 'file')
  if (!file || !file.filename || !file.data) {
    throw createError({ statusCode: 400, statusMessage: 'Missing file field.' })
  }

  if (file.data.length > MAX_SIZE) {
    throw createError({ statusCode: 413, statusMessage: 'File too large. Max 5 MB.' })
  }

  const mime = file.type || 'application/octet-stream'
  if (!ALLOWED_MIME.has(mime)) {
    throw createError({ statusCode: 415, statusMessage: 'Unsupported file type.' })
  }

  const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey)

  const safeName = file.filename.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 200)
  const storagePath = `${Date.now()}-${safeName}`

  const { error } = await supabase.storage
    .from('contact-attachments')
    .upload(storagePath, file.data, { contentType: mime, upsert: false })

  if (error) {
    throw createError({ statusCode: 500, statusMessage: 'Storage upload failed.' })
  }

  const { data: { publicUrl } } = supabase.storage
    .from('contact-attachments')
    .getPublicUrl(storagePath)

  return { url: publicUrl }
})
