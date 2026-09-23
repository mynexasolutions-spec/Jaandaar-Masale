'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { getEffectiveUser } from '@/lib/userAuth'
import { revalidatePath } from 'next/cache'

export async function addAddress(formData: FormData) {
  const user = await getEffectiveUser()
  if (!user) return { success: false, error: 'Unauthorized. Please sign in.' }

  const fullName = formData.get('full_name')?.toString()
  const phone = formData.get('phone')?.toString()
  const addressLine1 = formData.get('address_line_1')?.toString()
  const addressLine2 = formData.get('address_line_2')?.toString() || null
  const city = formData.get('city')?.toString()
  const state = formData.get('state')?.toString()
  const postalCode = formData.get('postal_code')?.toString()
  const isDefault = formData.get('is_default') === 'on'

  if (!fullName || !phone || !addressLine1 || !city || !state || !postalCode) {
    return { success: false, error: 'All required fields must be filled.' }
  }

  // 1. Full name validation
  if (!/^[a-zA-Z\s.']{2,60}$/.test(fullName.trim())) {
    return { 
      success: false, 
      error: 'Please enter a valid full name.' 
    }
  }

  // 2. Indian mobile number: 10 digits starting with 6, 7, 8, or 9
  const cleanPhone = phone.trim().replace(/\D/g, '')
  if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
    return { 
      success: false, 
      error: 'Please enter a valid 10-digit Indian mobile number.' 
    }
  }

  // 3. Street Address: Minimum 4 characters
  if (addressLine1.trim().length < 4) {
    return { 
      success: false, 
      error: 'Please enter a complete street address.' 
    }
  }

  if (!/^\d{6}$/.test(postalCode.trim())) {
    return { success: false, error: 'Please enter a valid 6-digit Indian PIN code.' }
  }

  const adminClient = createAdminClient()

  // If this address is set as default, unset any other default
  if (isDefault) {
    await adminClient.from('addresses').update({ is_default: false }).eq('user_id', user.id)
  }

  const { count } = await adminClient
    .from('addresses')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  const finalIsDefault = isDefault || count === 0

  const { error } = await adminClient
    .from('addresses')
    .insert([{
      user_id: user.id,
      full_name: fullName,
      phone: cleanPhone,
      address_line_1: addressLine1,
      address_line_2: addressLine2,
      city,
      state,
      postal_code: postalCode,
      country: 'India',
      is_default: finalIsDefault
    }])

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/account/addresses')
  revalidatePath('/account')
  revalidatePath('/checkout')
  return { success: true }
}

export async function updateAddress(id: string, formData: FormData) {
  const user = await getEffectiveUser()
  if (!user) return { success: false, error: 'Unauthorized. Please sign in.' }

  const fullName = formData.get('full_name')?.toString()
  const phone = formData.get('phone')?.toString()
  const addressLine1 = formData.get('address_line_1')?.toString()
  const addressLine2 = formData.get('address_line_2')?.toString() || null
  const city = formData.get('city')?.toString()
  const state = formData.get('state')?.toString()
  const postalCode = formData.get('postal_code')?.toString()
  const isDefault = formData.get('is_default') === 'on'

  if (!fullName || !phone || !addressLine1 || !city || !state || !postalCode) {
    return { success: false, error: 'All required fields must be filled.' }
  }

  const cleanPhone = phone.trim().replace(/\D/g, '')
  if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
    return { 
      success: false, 
      error: 'Please enter a valid 10-digit Indian mobile number.' 
    }
  }

  if (!/^\d{6}$/.test(postalCode.trim())) {
    return { success: false, error: 'Please enter a valid 6-digit Indian PIN code.' }
  }

  const adminClient = createAdminClient()

  if (isDefault) {
    await adminClient.from('addresses').update({ is_default: false }).eq('user_id', user.id)
  }

  const { error } = await adminClient
    .from('addresses')
    .update({
      full_name: fullName,
      phone: cleanPhone,
      address_line_1: addressLine1,
      address_line_2: addressLine2,
      city,
      state,
      postal_code: postalCode,
      is_default: isDefault
    })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/account/addresses')
  revalidatePath('/account')
  revalidatePath('/checkout')
  return { success: true }
}

export async function deleteAddress(id: string) {
  const user = await getEffectiveUser()
  if (!user) return { success: false, error: 'Unauthorized. Please sign in.' }

  const adminClient = createAdminClient()
  const { error } = await adminClient
    .from('addresses')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/account/addresses')
  revalidatePath('/account')
  return { success: true }
}

export async function setDefaultAddress(id: string) {
  const user = await getEffectiveUser()
  if (!user) return { success: false, error: 'Unauthorized. Please sign in.' }

  const adminClient = createAdminClient()

  // Unset all others
  await adminClient.from('addresses').update({ is_default: false }).eq('user_id', user.id)

  // Set the target
  const { error } = await adminClient
    .from('addresses')
    .update({ is_default: true })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/account/addresses')
  revalidatePath('/account')
  return { success: true }
}
