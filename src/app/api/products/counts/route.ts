import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

// GET /api/products/counts - Get product counts per category (dynamic from DB)
export async function GET() {
  try {
    // Get all categories from the database
    const categories = await db.category.findMany({
      select: { name: true },
    })

    const counts = await Promise.all(
      categories.map(async (cat) => {
        const count = await db.product.count({
          where: { category: cat.name },
        })
        return { category: cat.name, count }
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
