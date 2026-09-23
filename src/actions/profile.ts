'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { getEffectiveUser, setUserSession } from '@/lib/userAuth'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const user = await getEffectiveUser()
  if (!user) {
    return { success: false, error: 'Unauthorized. Please sign in.' }
  }

  const fullName = formData.get('full_name')?.toString()?.trim()
  const phone = formData.get('phone')?.toString()?.trim()

  if (!fullName) {
    return { success: false, error: 'Full Name is required' }
  }

  const adminClient = createAdminClient()

  await adminClient
    .from('users')
    .update({ 
      full_name: fullName,
      phone: phone || '',
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)

  await adminClient
    .from('profiles')
    .update({ 
      full_name: fullName,
      phone: phone || '',
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)

  // Update session cookie with new name
  await setUserSession({
    ...user,
    full_name: fullName,
    phone: phone || '',
  })

  revalidatePath('/account')
  revalidatePath('/account/addresses')
  revalidatePath('/', 'layout')
  
  return { success: true }
}
