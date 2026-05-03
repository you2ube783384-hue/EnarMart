import { NextRequest, NextResponse } from 'next/server'
import { readdir, stat, unlink, writeFile } from 'fs/promises'
import { list } from '@vercel/blob'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads')
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']

// Check if Vercel Blob is configured
function isVercelBlobConfigured(): boolean {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  return !!token && !token.startsWith('vercel_blob_rw_placeholder')
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

// GET /api/library - List all images from both local filesystem and Vercel Blob
export async function GET() {
  try {
    const allImages: Array<{
      filename: string
      url: string
      size: number
      sizeFormatted: string
      modifiedAt: string
      extension: string
      source: 'local' | 'blob'
    }> = []

    // 1. Fetch local filesystem images
    try {
      const files = await readdir(UPLOADS_DIR)
      const imageFiles = files.filter((file) => {
        const ext = path.extname(file).toLowerCase()
        return ALLOWED_EXTENSIONS.includes(ext)
      })

      const localImages = await Promise.all(
        imageFiles.map(async (file) => {
          const filePath = path.join(UPLOADS_DIR, file)
          const fileStat = await stat(filePath)
          return {
            filename: file,
            url: `/uploads/${file}`,
            size: fileStat.size,
            sizeFormatted: formatFileSize(fileStat.size),
            modifiedAt: fileStat.mtime.toISOString(),
            extension: path.extname(file).toLowerCase().replace('.', ''),
            source: 'local' as const,
          }
        })
      )
      allImages.push(...localImages)
    } catch {
      // Local uploads directory might not exist yet
    }

    // 2. Fetch Vercel Blob images
    if (isVercelBlobConfigured()) {
      try {
        const blobs = await list({ prefix: 'uploads/' })
        for (const blob of blobs.blobs) {
          const filename = blob.pathname.replace('uploads/', '')
          if (!filename) continue
          const ext = path.extname(filename).toLowerCase().replace('.', '')
          if (!ALLOWED_EXTENSIONS.includes(`.${ext}`)) continue

          allImages.push({
            filename,
            url: blob.url,
            size: blob.size,
            sizeFormatted: formatFileSize(blob.size),
            modifiedAt: blob.uploadedAt,
            extension: ext || 'png',
            source: 'blob',
          })
        }
      } catch (error) {
        console.error('Error fetching Vercel Blob images:', error)
        // Don't fail the whole request if Blob fails
      }
    }

    // Sort by modified date, newest first
    allImages.sort((a, b) => new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime())

    return NextResponse.json({ images: allImages, total: allImages.length })
  } catch (error) {
    console.error('Error listing images:', error)
    return NextResponse.json(
      { error: 'Failed to list images' },
      { status: 500 }
    )
  }
}

// DELETE /api/library - Delete an image
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('filename')
    const source = searchParams.get('source') || 'local'

    if (!filename) {
      return NextResponse.json(
        { error: 'Filename is required' },
        { status: 400 }
      )
    }

    // Security: prevent directory traversal
    const safeName = path.basename(filename)
    if (safeName !== filename) {
      return NextResponse.json(
        { error: 'Invalid filename' },
        { status: 400 }
      )
    }

    if (source === 'blob') {
      // Delete from Vercel Blob - need to find the full URL first
      if (isVercelBlobConfigured()) {
        const blobs = await list({ prefix: `uploads/${safeName}` })
        if (blobs.blobs.length > 0) {
          const { del } = await import('@vercel/blob')
          await del(blobs.blobs[0].url)
          return NextResponse.json({ success: true, deleted: safeName, source: 'blob' })
        }
      }
      return NextResponse.json(
        { error: 'File not found in Vercel Blob' },
        { status: 404 }
      )
    } else {
      // Delete from local filesystem
      const filePath = path.join(UPLOADS_DIR, safeName)

      try {
        await stat(filePath)
      } catch {
        return NextResponse.json(
          { error: 'File not found' },
          { status: 404 }
        )
      }

      await unlink(filePath)
      return NextResponse.json({ success: true, deleted: safeName, source: 'local' })
    }
  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}

// PUT /api/library - Replace an image (upload new file keeping the same filename)
export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const originalFilename = formData.get('filename') as string | null

    if (!file || !originalFilename) {
      return NextResponse.json(
        { error: 'File and original filename are required' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP, SVG' },
        { status: 400 }
      )
    }

    // Security: prevent directory traversal
    const safeName = path.basename(originalFilename)
    if (safeName !== originalFilename) {
      return NextResponse.json(
        { error: 'Invalid filename' },
        { status: 400 }
      )
    }

    // Upload to Vercel Blob if configured, otherwise local
    if (isVercelBlobConfigured()) {
      const { put } = await import('@vercel/blob')
      const blob = await put(`uploads/${safeName}`, file, {
        access: 'public',
      })
      return NextResponse.json({
        success: true,
        replaced: safeName,
        url: blob.url,
        source: 'blob',
      })
    } else {
      const filePath = path.join(UPLOADS_DIR, safeName)

      // Check original file exists
      try {
        await stat(filePath)
      } catch {
        return NextResponse.json(
          { error: 'Original file not found' },
          { status: 404 }
        )
      }

      // Overwrite the file
      const buffer = Buffer.from(await file.arrayBuffer())
      await writeFile(filePath, buffer)

      return NextResponse.json({
        success: true,
        replaced: safeName,
        url: `/uploads/${safeName}`,
        source: 'local',
      })
    }
  } catch (error) {
    console.error('Error replacing image:', error)
    return NextResponse.json(
      { error: 'Failed to replace image' },
      { status: 500 }
    )
  }
}
