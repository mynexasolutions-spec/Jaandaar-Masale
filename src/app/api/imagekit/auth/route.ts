import { imagekit } from '@/lib/imagekit'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  // Check admin session cookie or Supabase admin profile
  const cookieStore = await cookies()
  const hasAdminSession = cookieStore.get('admin_session')?.value === 'authenticated'

  if (!hasAdminSession) {
    try {
      const supabase = await createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (!profile || profile.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  try {
    const authenticationParameters = imagekit.getAuthenticationParameters()
    return NextResponse.json(authenticationParameters)
  } catch (error) {
    console.error('Error generating ImageKit auth parameters:', error)
    return NextResponse.json(
      { error: 'Failed to generate ImageKit authentication parameters' },
      { status: 500 }
    )
  }
}
