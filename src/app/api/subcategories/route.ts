import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/subcategories - List subcategories (optional ?categoryId= filter)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')

    const where: Record<string, unknown> = {}
    if (categoryId) {
      where.categoryId = categoryId
    }

    const subcategories = await db.subcategory.findMany({
      where,
      include: {
        category: {
          select: { name: true },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json(subcategories)
  } catch (error) {
    console.error('Error fetching subcategories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subcategories' },
      { status: 500 }
    )
  }
}

// POST /api/subcategories - Create a subcategory
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, categoryId } = body

    if (!name || !categoryId) {
      return NextResponse.json(
        { error: 'Missing required fields: name, categoryId' },
        { status: 400 }
      )
    }

    const category = await db.category.findUnique({ where: { id: categoryId } })
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    const subcategory = await db.subcategory.create({
      data: {
        name,
        categoryId,
      },
    })

    return NextResponse.json(subcategory, { status: 201 })
  } catch (error: unknown) {
    console.error('Error creating subcategory:', error)
    const prismaError = error as { code?: string }
    if (prismaError.code === 'P2002') {
      return NextResponse.json(
        { error: 'A subcategory with this name already exists in this category' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create subcategory' },
      { status: 500 }
    )
  }
}
