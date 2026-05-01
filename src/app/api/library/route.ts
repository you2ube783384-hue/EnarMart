import { NextRequest, NextResponse } from 'next/server'
import { readdir, stat, unlink, writeFile } from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads')
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']

// GET /api/library - List all images in uploads folder
export async function GET() {
  try {
    const files = await readdir(UPLOADS_DIR)
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase()
      return ALLOWED_EXTENSIONS.includes(ext)
    })

    const images = await Promise.all(
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
        }
      })
    )

    // Sort by modified date, newest first
    images.sort((a, b) => new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime())

    return NextResponse.json({ images, total: images.length })
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

    const filePath = path.join(UPLOADS_DIR, safeName)

    // Check file exists
    try {
      await stat(filePath)
    } catch {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      )
    }

    await unlink(filePath)
    return NextResponse.json({ success: true, deleted: safeName })
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
    })
  } catch (error) {
    console.error('Error replacing image:', error)
    return NextResponse.json(
      { error: 'Failed to replace image' },
      { status: 500 }
    )
  }
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}
