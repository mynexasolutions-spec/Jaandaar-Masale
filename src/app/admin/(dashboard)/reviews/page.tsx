import { createAdminClient } from '@/lib/supabase/admin'
import { ReviewList } from './_components/ReviewList'

export const metadata = {
  title: 'Reviews Management | Admin',
}

export const dynamic = 'force-dynamic'

export default async function AdminReviewsPage() {
  const adminClient = createAdminClient()

  // 1. Fetch all reviews
  const { data: rawReviews } = await adminClient
    .from('reviews')
    .select(`
      *,
      products ( name )
    `)
    .order('created_at', { ascending: false })

  let reviews: any[] = []

  if (rawReviews && rawReviews.length > 0) {
    const userIds = [...new Set(rawReviews.map((r: any) => r.user_id).filter(Boolean))]
    const profilesMap: Record<string, { full_name: string; email: string }> = {}

    if (userIds.length > 0) {
      const { data: profiles } = await adminClient
        .from('profiles')
        .select('id, full_name, email')
        .in('id', userIds)

      if (profiles) {
        profiles.forEach((p: any) => {
          if (p.id) profilesMap[p.id] = { full_name: p.full_name, email: p.email }
        })
      }

      const { data: users } = await adminClient
        .from('users')
        .select('id, full_name, email')
        .in('id', userIds)

      if (users) {
        users.forEach((u: any) => {
          if (u.id && !profilesMap[u.id]) profilesMap[u.id] = { full_name: u.full_name, email: u.email }
        })
      }
    }

    reviews = rawReviews.map((r: any) => ({
      ...r,
      profiles: profilesMap[r.user_id] || { full_name: 'Customer', email: '' }
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Product Reviews</h1>
          <p className="text-stone-500 text-sm mt-1">Manage and moderate customer reviews across all spice products.</p>
        </div>
      </div>

      <ReviewList initialReviews={reviews} />
    </div>
  )
}
