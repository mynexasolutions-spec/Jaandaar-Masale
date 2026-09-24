import { imagekit } from '@/lib/imagekit'
import { createClient } from '@/lib/supabase/server'
import { getAuthUser } from '@/lib/userAuth'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  // Check admin session cookie or direct userAuth session or Supabase admin profile
  const cookieStore = await cookies()
  const hasAdminSession = cookieStore.get('admin_session')?.value === 'authenticated'

  let isAuthorized = hasAdminSession

  if (!isAuthorized) {
    try {
      const authUser = await getAuthUser()
      if (authUser?.role === 'admin') {
        isAuthorized = true
      }
    } catch {}
  }

  if (!isAuthorized) {
    try {
      const supabase = await createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()

        if (profile?.role === 'admin') {
          isAuthorized = true
        }
      }
    } catch {}
  }

  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized: Admin privileges required to upload' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const folder = (formData.get('folder') as string) || '/uploads'
    const fileNameCustom = formData.get('fileName') as string | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const cleanFileName = (fileNameCustom || file.name || `file_${Date.now()}`)
      .replace(/[^a-zA-Z0-9._-]/g, '_')

    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName: cleanFileName,
      folder: folder.startsWith('/') ? folder : `/${folder}`,
      useUniqueFileName: true,
    })

    return NextResponse.json({
      success: true,
      url: uploadResponse.url,
      fileId: uploadResponse.fileId,
      name: uploadResponse.name,
      thumbnailUrl: uploadResponse.thumbnailUrl,
      height: uploadResponse.height,
      width: uploadResponse.width,
    })
  } catch (error: any) {
    console.error('ImageKit upload error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to upload image to ImageKit' },
      { status: 500 }
    )
  }
}
