import { ref, reactive } from 'vue'
import { z } from 'zod'

const ContactSchema = z.object({
  name: z.string().min(2, 'nameRequired').max(100),
  email: z.string().email('emailInvalid'),
  services: z.array(z.string()).min(1, 'serviceRequired'),
  budget: z.string().min(1, 'budgetRequired'),
  message: z.string().min(20, 'messageMin').max(5000, 'messageMax'),
  honeypot: z.string().max(0, 'Bot detected'),
})

export type ContactForm = z.infer<typeof ContactSchema>

export function useContactForm() {
  const { t } = useI18n()

  const form = reactive<ContactForm>({
    name: '',
    email: '',
    services: [],
    budget: '',
    message: '',
    honeypot: '',
  })

  const errors = reactive<Partial<Record<keyof ContactForm, string>>>({})
  const loading = ref(false)
  const success = ref(false)
  const serverError = ref('')

  const getErrorMessage = (key: string): string => {
    const validationKeys: Record<string, string> = {
      nameRequired: t('contact.validation.nameRequired'),
      emailInvalid: t('contact.validation.emailInvalid'),
      serviceRequired: t('contact.validation.serviceRequired'),
      budgetRequired: t('contact.validation.budgetRequired'),
      messageMin: t('contact.validation.messageMin'),
      messageMax: t('contact.validation.messageMax'),
    }
    return validationKeys[key] || key
  }

  const validateField = (field: keyof ContactForm) => {
    const partial = ContactSchema.shape[field]
    const result = partial.safeParse(form[field])
    if (result.success) {
      errors[field] = undefined
    } else {
      errors[field] = getErrorMessage(result.error.errors[0].message)
    }
  }

  const submit = async (attachmentUrl?: string) => {
    serverError.value = ''

    const result = ContactSchema.safeParse(form)
    if (!result.success) {
      result.error.errors.forEach((e) => {
        const field = e.path[0] as keyof ContactForm
        errors[field] = getErrorMessage(e.message)
      })
      return
    }

    loading.value = true
    try {
      await $fetch('/api/contact', {
        method: 'POST',
        body: {
          name: form.name,
          email: form.email,
          services: form.services,
          budget: form.budget,
          message: form.message,
          honeypot: form.honeypot,
          ...(attachmentUrl ? { attachment_url: attachmentUrl } : {}),
        },
      })

      success.value = true
      Object.assign(form, {
        name: '',
        email: '',
        services: [],
        budget: '',
        message: '',
      })
    } catch {
      serverError.value = t('contact.serverError')
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    success.value = false
    serverError.value = ''
    Object.assign(errors, { name: undefined, email: undefined, services: undefined, budget: undefined, message: undefined })
  }

  return { form, errors, loading, success, serverError, submit, validateField, reset }
}
