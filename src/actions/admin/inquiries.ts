'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function getInquiries() {
  const adminClient = createAdminClient()
  const { data, error } = await adminClient
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch inquiries:', error)
    return []
  }

  return data || []
}

export async function markInquiryAsRead(id: string) {
  const adminClient = createAdminClient()
  const { error } = await adminClient
    .from('inquiries')
    .update({ is_resolved: true })
    .eq('id', id)

  if (error) return { success: false, error: error.message }

  revalidatePath('/admin/inquiries')
  return { success: true }
}

export async function deleteInquiry(id: string) {
  const adminClient = createAdminClient()
  const { error } = await adminClient
    .from('inquiries')
    .delete()
    .eq('id', id)

  if (error) return { success: false, error: error.message }

  revalidatePath('/admin/inquiries')
  return { success: true }
}
