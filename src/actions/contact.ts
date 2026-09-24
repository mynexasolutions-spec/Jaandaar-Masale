'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function submitInquiry(formData: FormData) {
  const adminSupabase = createAdminClient()

  const firstName = ((formData.get('first-name') || formData.get('firstName') || formData.get('first_name') || '') as string).trim()
  const lastName = ((formData.get('last-name') || formData.get('lastName') || formData.get('last_name') || '') as string).trim()
  const directName = ((formData.get('name') || '') as string).trim()
  const fullName = directName || `${firstName} ${lastName}`.trim()

  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const phone = (formData.get('phone') as string)?.trim() || null
  const message = (formData.get('message') as string)?.trim()

  if (!fullName || !email || !message) {
    return { success: false, error: 'Full name, email address, and message are required.' }
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Please provide a valid email address.' }
  }

  const { error } = await adminSupabase
    .from('inquiries')
    .insert([{
      name: fullName,
      email,
      phone,
      message,
      is_resolved: false,
    }])

  if (error) {
    console.error('Failed to submit inquiry:', error)
    return { success: false, error: 'Something went wrong while submitting your inquiry. Please try again.' }
  }

  revalidatePath('/admin/inquiries')
  return { success: true }
}
