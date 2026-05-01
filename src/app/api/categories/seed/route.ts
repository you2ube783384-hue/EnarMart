import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

// POST /api/categories/seed - Seed default categories
export async function POST() {
  try {
    const categories = [
      { name: 'Photos', icon: 'faCamera', showInNav: true, showInHero: true },
      { name: 'Graphics', icon: 'faPalette', showInNav: true, showInHero: true },
      { name: 'Templates', icon: 'faFileAlt', showInNav: true, showInHero: true },
      { name: 'Fonts', icon: 'faFont', showInNav: true, showInHero: true },
      { name: '3D', icon: 'faCube', showInNav: true, showInHero: true },
      { name: 'Icons', icon: 'faIcons', showInNav: true, showInHero: true },
    ]

    const results = []
    for (const cat of categories) {
      const result = await db.category.upsert({
        where: { name: cat.name },
        update: { icon: cat.icon, showInNav: cat.showInNav, showInHero: cat.showInHero },
        create: { name: cat.name, icon: cat.icon, showInNav: cat.showInNav, showInHero: cat.showInHero },
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
