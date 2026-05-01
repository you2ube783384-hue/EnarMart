import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/products - Get all products with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')

    const where: Record<string, unknown> = {}

    if (category) {
      where.category = category
    }

    if (featured === 'true') {
      where.featured = true
    }

    if (search) {
      where.title = {
        contains: search,
      }
    }

    const products = await db.product.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, price, category, imageUrl, viewUrl, featured } =
      body

    // Validate required fields
    if (!title || !description || !price || !category || !imageUrl) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, price, category, imageUrl' },
        { status: 400 }
      )
    }

    const product = await db.product.create({
      data: {
        title,
        description,
        price,
        category,
        imageUrl,
        viewUrl: viewUrl || '',
        featured: featured || false,
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
