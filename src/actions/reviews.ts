'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { getEffectiveUser } from '@/lib/userAuth'
import { revalidatePath } from 'next/cache'

export type ActionResult = {
  error?: string
  success?: boolean
}

export async function submitReview(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    const user = await getEffectiveUser()
    if (!user) {
      return { error: 'You must be logged in to submit a review.' }
    }

    const productId = formData.get('product_id') as string
    const rating = parseInt(formData.get('rating') as string)
    const reviewText = formData.get('review_text') as string

    if (!productId) {
      return { error: 'Product ID is required.' }
    }
    
    if (isNaN(rating) || rating < 1 || rating > 5) {
      return { error: 'Please select a valid rating between 1 and 5.' }
    }

    const adminClient = createAdminClient()

    // 1. Insert Review into database
    const { error: insertError } = await adminClient
      .from('reviews')
      .insert({
        product_id: productId,
        user_id: user.id,
        rating,
        review_text: reviewText ? reviewText.trim() : null,
        is_approved: true, // Visible immediately on product page
      })

    if (insertError) {
      console.error('Error submitting review:', insertError)
      return { error: 'Failed to submit review. Please try again later.' }
    }

    // 2. Automatically update product average_rating & review_count
    try {
      const { data: allReviews } = await adminClient
        .from('reviews')
        .select('rating')
        .eq('product_id', productId)
        .eq('is_approved', true)

      if (allReviews && allReviews.length > 0) {
        const sum = allReviews.reduce((acc, curr) => acc + (Number(curr.rating) || 0), 0)
        const avg = sum / allReviews.length

        await adminClient
          .from('products')
          .update({
            average_rating: parseFloat(avg.toFixed(1)),
            review_count: allReviews.length,
          })
          .eq('id', productId)
      }
    } catch (aggErr) {
      console.warn('Could not update product ratings aggregate:', aggErr)
    }

    revalidatePath('/', 'layout')
    revalidatePath(`/product/[slug]`)
    revalidatePath('/admin/reviews')
    return { success: true }
  } catch (err: any) {
    console.error('Unexpected error submitting review:', err)
    return { error: 'An unexpected error occurred.' }
  }
}
