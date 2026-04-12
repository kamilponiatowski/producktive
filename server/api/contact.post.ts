import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  message: z.string().min(10).max(5000),
  honeypot: z.string().max(0).optional(),
})

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  // Honeypot anti-spam check
  if (body?.honeypot) {
    // Silently accept to not reveal the trap
    return { success: true }
  }

  const result = contactSchema.safeParse(body)
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation failed',
      data: result.error.flatten().fieldErrors,
    })
  }

  const supabase = createClient(
    config.supabaseUrl,
    config.supabaseAnonKey,
  )

  const { error } = await supabase
    .from('contact_submissions')
    .insert({
      name: result.data.name,
      email: result.data.email,
      message: result.data.message,
    })

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to submit. Please try again.',
    })
  }

  return { success: true }
})
