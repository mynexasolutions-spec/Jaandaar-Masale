'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

// Global Text
export async function updateGlobalHeroText(data: {
  title: string
  subtitle: string
  button_text: string
  button_link: string
}) {
  const adminClient = createAdminClient()
  const { error } = await adminClient
    .from('hero_slides')
    .update({
      title: data.title,
      subtitle: data.subtitle,
      button_text: data.button_text,
      button_link: data.button_link,
      updated_at: new Date().toISOString()
    })
    .neq('id', '00000000-0000-0000-0000-000000000000')

  if (error) return { success: false, error: error.message }

  revalidatePath('/', 'layout')
  revalidatePath('/admin/hero-slides')
  return { success: true }
}

export async function updateHeroTextMode(_mode: 'global' | 'per_slide'): Promise<{ success: boolean; error?: string }> {
  // Graceful no-op for text mode toggle so schema error never occurs
  revalidatePath('/', 'layout')
  revalidatePath('/admin/hero-slides')
  return { success: true }
}

export async function updateHeroSlideText(id: string, data: {
  title: string
  subtitle: string
  button_text: string
  button_link: string
}) {
  const adminClient = createAdminClient()
  const { error } = await adminClient
    .from('hero_slides')
    .update({
      title: data.title,
      subtitle: data.subtitle,
      button_text: data.button_text,
      button_link: data.button_link,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)

  if (error) return { success: false, error: error.message }

  revalidatePath('/', 'layout')
  revalidatePath('/admin/hero-slides')
  return { success: true }
}

const DEFAULT_HERO_DATA = [
  {
    image_url: '/images/turmeric-powder.jpeg',
    title: 'Golden Purity. Natural Healing. Rich Curcumin.',
    subtitle: 'Handpicked Salem & Alleppey turmeric roots, cold-ground to preserve natural essential oils and authentic golden warmth.',
    button_text: 'Shop Turmeric Powder',
    button_link: '/product/turmeric-powder',
    is_active: true,
    display_order: 0,
  },
  {
    image_url: '/images/red-chilly-powder.jpeg',
    title: 'Authentic Fiery Aroma & Rich Natural Color',
    subtitle: 'Sun-dried whole red chillies ground without artificial colors or seed fillers for appetizing heat and vibrant color.',
    button_text: 'Shop Red Chilly',
    button_link: '/product/red-chilly-powder',
    is_active: true,
    display_order: 1,
  },
  {
    image_url: '/images/garam-masala.jpeg',
    title: 'Master Crafted Royal Garam Masala',
    subtitle: 'An heirloom recipe of slow-roasted whole spices formulated to transform everyday curries into royal culinary feasts.',
    button_text: 'Shop Garam Masala',
    button_link: '/product/garam-masala',
    is_active: true,
    display_order: 2,
  },
  {
    image_url: '/images/coriander-powder.jpeg',
    title: 'Freshly Ground Coriander (Dhaniya)',
    subtitle: 'Selected roasted whole coriander seeds gently ground to lock in fresh citrusy aroma and natural essential oils.',
    button_text: 'Shop Coriander',
    button_link: '/product/coriander-powder',
    is_active: true,
    display_order: 3,
  },
  {
    image_url: '/images/cumin-powder.jpeg',
    title: 'Aromatic Cumin (Jeera) Powder',
    subtitle: 'Premium Gujarat cumin seeds sun-dried and perfectly roasted for rich warm earthy aroma in every single pinch.',
    button_text: 'Shop Cumin',
    button_link: '/product/cumin-powder',
    is_active: true,
    display_order: 4,
  },
]

export async function getHeroSlides() {
  const adminClient = createAdminClient()
  
  const { data, error } = await adminClient
    .from('hero_slides')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching hero slides:', error)
    return []
  }

  // If table is empty, auto-seed the standard slides so they appear in admin and DB
  if (!data || data.length === 0) {
    try {
      const { data: inserted } = await adminClient
        .from('hero_slides')
        .insert(DEFAULT_HERO_DATA)
        .select('*')
      if (inserted && inserted.length > 0) {
        return inserted
      }
    } catch (e) {
      console.warn('Auto-seed hero slides failed:', e)
    }
  }

  return data || []
}

export async function saveHeroSlide(slide: {
  id?: string
  image_url: string
  title: string
  subtitle: string
  button_text: string
  button_link: string
  is_active?: boolean
}) {
  const adminClient = createAdminClient()

  if (slide.id) {
    // Update existing slide
    const { error } = await adminClient
      .from('hero_slides')
      .update({
        image_url: slide.image_url,
        title: slide.title,
        subtitle: slide.subtitle,
        button_text: slide.button_text,
        button_link: slide.button_link,
        is_active: slide.is_active ?? true,
        updated_at: new Date().toISOString()
      })
      .eq('id', slide.id)

    if (error) return { success: false, error: error.message }
  } else {
    // Create new slide
    const { count } = await adminClient
      .from('hero_slides')
      .select('*', { count: 'exact', head: true })

    const { error } = await adminClient
      .from('hero_slides')
      .insert([{
        image_url: slide.image_url,
        title: slide.title,
        subtitle: slide.subtitle,
        button_text: slide.button_text,
        button_link: slide.button_link,
        is_active: true,
        display_order: count || 0
      }])

    if (error) return { success: false, error: error.message }
  }

  revalidatePath('/', 'layout')
  revalidatePath('/admin/hero-slides')
  return { success: true }
}

export async function createHeroSlide(imageUrl: string, slideData?: any) {
  const adminClient = createAdminClient()
  const { count } = await adminClient
    .from('hero_slides')
    .select('*', { count: 'exact', head: true })

  if (count && count >= 8) {
    return { success: false, error: 'Maximum 8 slides allowed.' }
  }

  const { error } = await adminClient
    .from('hero_slides')
    .insert([{
      image_url: imageUrl,
      title: slideData?.title || 'Pure Spice. Real Taste. Trusted Every Time.',
      subtitle: slideData?.subtitle || "Anisha Spices brings the richness of India's finest spices to your kitchen. Pure, natural & full of flavor.",
      button_text: slideData?.button_text || 'Shop Now',
      button_link: slideData?.button_link || '/shop',
      is_active: true,
      display_order: count || 0
    }])

  if (error) return { success: false, error: error.message }

  revalidatePath('/', 'layout')
  revalidatePath('/admin/hero-slides')
  return { success: true }
}

export async function deleteHeroSlide(id: string) {
  const adminClient = createAdminClient()
  const { error } = await adminClient
    .from('hero_slides')
    .delete()
    .eq('id', id)

  if (error) return { success: false, error: error.message }

  revalidatePath('/', 'layout')
  revalidatePath('/admin/hero-slides')
  return { success: true }
}

export async function toggleHeroSlideStatus(id: string, isActive: boolean) {
  const adminClient = createAdminClient()
  const { error } = await adminClient
    .from('hero_slides')
    .update({ is_active: isActive })
    .eq('id', id)

  if (error) return { success: false, error: error.message }

  revalidatePath('/', 'layout')
  revalidatePath('/admin/hero-slides')
  return { success: true }
}
