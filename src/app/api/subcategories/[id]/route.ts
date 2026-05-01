import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// PUT /api/subcategories/[id] - Update a subcategory
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const existing = await db.subcategory.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Subcategory not found' },
        { status: 404 }
      )
    }

    const subcategory = await db.subcategory.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.categoryId !== undefined && { categoryId: body.categoryId }),
      },
    })

    return NextResponse.json(subcategory)
  } catch (error: unknown) {
    console.error('Error updating subcategory:', error)
    const prismaError = error as { code?: string }
    if (prismaError.code === 'P2002') {
      return NextResponse.json(
        { error: 'A subcategory with this name already exists in this category' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to update subcategory' },
      { status: 500 }
    )
  }
}

// DELETE /api/subcategories/[id] - Delete a subcategory
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const existing = await db.subcategory.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Subcategory not found' },
        { status: 404 }
      )
    }

    await db.subcategory.delete({ where: { id } })

    return NextResponse.json({ message: 'Subcategory deleted successfully' })
  } catch (error) {
    console.error('Error deleting subcategory:', error)
    return NextResponse.json(
      { error: 'Failed to delete subcategory' },
      { status: 500 }
    )
  }
}
