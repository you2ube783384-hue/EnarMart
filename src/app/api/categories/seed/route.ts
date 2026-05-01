import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

// POST /api/categories/seed - Seed default categories
export async function POST() {
  try {
    const categories = [
      { name: 'Photos', icon: 'faCamera' },
      { name: 'Graphics', icon: 'faPalette' },
      { name: 'Templates', icon: 'faFileAlt' },
      { name: 'Fonts', icon: 'faFont' },
      { name: '3D', icon: 'faCube' },
      { name: 'Icons', icon: 'faIcons' },
    ]

    const results = []
    for (const cat of categories) {
      const result = await db.category.upsert({
        where: { name: cat.name },
        update: { icon: cat.icon },
        create: { name: cat.name, icon: cat.icon },
      })
      results.push(result)
    }

    return NextResponse.json({
      message: 'Categories seeded successfully',
      count: results.length,
      categories: results,
    })
  } catch (error) {
    console.error('Error seeding categories:', error)
    return NextResponse.json(
      { error: 'Failed to seed categories' },
      { status: 500 }
    )
  }
}
