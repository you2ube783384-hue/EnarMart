import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/categories - List all categories with subcategories count
export async function GET() {
  try {
    const categories = await db.category.findMany({
      include: {
        _count: {
          select: { subcategories: true },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    const result = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      icon: cat.icon,
      showInNav: cat.showInNav,
      showInHero: cat.showInHero,
      subcategoriesCount: cat._count.subcategories,
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt,
    }))

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

// POST /api/categories - Create a new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, icon, showInNav, showInHero } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Missing required field: name' },
        { status: 400 }
      )
    }

    const category = await db.category.create({
      data: {
        name,
        icon: icon || 'faFolder',
        ...(showInNav !== undefined && { showInNav }),
        ...(showInHero !== undefined && { showInHero }),
      },
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error: unknown) {
    console.error('Error creating category:', error)
    const prismaError = error as { code?: string }
    if (prismaError.code === 'P2002') {
      return NextResponse.json(
        { error: 'A category with this name already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}
