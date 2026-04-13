import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  services: z.array(z.string().max(100)).min(1).max(10),
  budget: z.string().min(1).max(50),
  message: z.string().min(20).max(5000),
  attachment_url: z.string().url().optional().nullable(),
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
    config.supabaseServiceKey,
  )

  const { error } = await supabase
    .from('contact_messages')
    .insert({
      name: result.data.name,
      email: result.data.email,
      service: result.data.services.join(', '),
      budget: result.data.budget,
      message: result.data.message,
      attachment_url: result.data.attachment_url ?? null,
    })

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to submit. Please try again.',
    })
  }

  return { success: true }
})
