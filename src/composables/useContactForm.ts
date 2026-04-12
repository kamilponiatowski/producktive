import { ref, reactive } from 'vue'
import { z } from 'zod'
import { supabase } from '@/services/supabase'

// ─── Schemat walidacji ───────────────────────────────────────────────────────
const ContactSchema = z.object({
  name:        z.string().min(2, 'Podaj imię i nazwisko').max(100),
  email:       z.string().email('Nieprawidłowy adres email'),
  service:     z.string().min(1, 'Wybierz rodzaj usługi'),
  budget:      z.string().min(1, 'Wybierz przedział budżetu'),
  message:     z.string().min(20, 'Opisz projekt w co najmniej 20 znakach').max(2000),
  honeypot:    z.string().max(0, 'Bot detected'), // Anti-spam
})

export type ContactForm = z.infer<typeof ContactSchema>

// ─── Composable ─────────────────────────────────────────────────────────────
export function useContactForm() {
  const form = reactive<ContactForm>({
    name:     '',
    email:    '',
    service:  '',
    budget:   '',
    message:  '',
    honeypot: '', // ukryte pole — bot wypełni, człowiek nie
  })

  const errors  = reactive<Partial<Record<keyof ContactForm, string>>>({})
  const loading = ref(false)
  const success = ref(false)
  const serverError = ref('')

  // ─── Walidacja live ───────────────────────────────────────────────────────
  const validateField = (field: keyof ContactForm) => {
    const partial = ContactSchema.shape[field]
    const result  = partial.safeParse(form[field])
    errors[field] = result.success ? undefined : result.error.errors[0].message
  }

  // ─── Submit ───────────────────────────────────────────────────────────────
  const submit = async () => {
    serverError.value = ''

    // Full validation
    const result = ContactSchema.safeParse(form)
    if (!result.success) {
      result.error.errors.forEach(e => {
        const field = e.path[0] as keyof ContactForm
        errors[field] = e.message
      })
      return
    }

    loading.value = true
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name:    form.name,
          email:   form.email,
          service: form.service,
          budget:  form.budget,
          message: form.message,
        })

      if (error) throw error

      success.value = true
      // Reset formularza
      Object.assign(form, { name: '', email: '', service: '', budget: '', message: '' })
    } catch (e) {
      serverError.value = 'Coś poszło nie tak. Napisz bezpośrednio na kontakt@producktive.pl'
    } finally {
      loading.value = false
    }
  }

  return { form, errors, loading, success, serverError, submit, validateField }
}
