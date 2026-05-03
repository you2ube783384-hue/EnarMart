import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { writeFile, mkdir } from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads')
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

// Check if Vercel Blob is configured (has a real token, not placeholder)
function isVercelBlobConfigured(): boolean {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  return !!token && !token.startsWith('vercel_blob_rw_placeholder')
}

// POST /api/upload - Upload a new image
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP, SVG' },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large. Maximum size is 10MB' }, { status: 400 })
    }

    const ext = file.name.split('.').pop()?.toLowerCase() || 'png'
    const safeName = `${uuidv4()}.${ext}`

    if (isVercelBlobConfigured()) {
      // Upload to Vercel Blob
      const blob = await put(`uploads/${safeName}`, file, {
        access: 'public',
      })

      return NextResponse.json({
        success: true,
        url: blob.url,
        filename: safeName,
        size: file.size,
      })
    } else {
      // Local filesystem fallback for development
      try {
        await mkdir(UPLOADS_DIR, { recursive: true })
      } catch {
        // Directory might already exist
      }

      const filePath = path.join(UPLOADS_DIR, safeName)
      const buffer = Buffer.from(await file.arrayBuffer())
      await writeFile(filePath, buffer)

      return NextResponse.json({
        success: true,
        url: `/uploads/${safeName}`,
        filename: safeName,
        size: file.size,
      })
    }
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}
