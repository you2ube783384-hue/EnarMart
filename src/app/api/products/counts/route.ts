import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

// GET /api/products/counts - Get product counts per category
export async function GET() {
  try {
    const categories = ['Photos', 'Graphics', 'Templates', 'Fonts', '3D', 'Icons']

    const counts = await Promise.all(
      categories.map(async (category) => {
        const count = await db.product.count({
          where: { category },
        })
        return { category, count }
      })
    )

    const total = await db.product.count()

    return NextResponse.json({ counts, total })
  } catch (error) {
    console.error('Error fetching category counts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch category counts' },
      { status: 500 }
    )
  }
}
