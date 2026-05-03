import { db } from '@/lib/db'

// Seed script: Add Canva template categories and subcategories
async function seed() {
  console.log('🌱 Seeding Canva template categories and subcategories...')

  // First, delete all existing subcategories and categories
  console.log('🗑️  Clearing existing data...')
  await db.subcategory.deleteMany()
  await db.category.deleteMany()
  console.log('✅ Existing data cleared')

  // Define Canva template categories with subcategories
  const categoryData = [
    {
      name: 'Most Purchased',
      icon: 'faFire',
      showInNav: true,
      showInHero: true,
      subcategories: [
        'Resume Templates',
        'Social Media Posts',
        'YouTube Thumbnails',
        'Presentation Slides',
        'Instagram Stories',
        'Business Cards',
      ],
    },
    {
      name: 'Resume & CV',
      icon: 'faBriefcase',
      showInNav: true,
      showInHero: true,
      subcategories: [
        'Software Engineer Resume',
        'Creative Resume',
        'Executive Resume',
        'Entry Level Resume',
        'Academic CV',
        'Modern Resume',
        'Minimalist Resume',
        'Infographic Resume',
      ],
    },
    {
      name: 'Social Media',
      icon: 'faBullhorn',
      showInNav: true,
      showInHero: true,
      subcategories: [
        'Instagram Posts',
        'Instagram Stories',
        'Facebook Covers',
        'Twitter Headers',
        'LinkedIn Banners',
        'Pinterest Pins',
        'TikTok Covers',
        'Social Media Kits',
      ],
    },
    {
      name: 'YouTube',
      icon: 'faVideo',
      showInNav: true,
      showInHero: true,
      subcategories: [
        'YouTube Thumbnails',
        'YouTube Banners',
        'YouTube Outros',
        'YouTube Intros',
        'Video Thumbnails',
        'Gaming Thumbnails',
        'Vlog Thumbnails',
        'Tutorial Thumbnails',
      ],
    },
    {
      name: 'Presentations',
      icon: 'faLayerGroup',
      showInNav: true,
      showInHero: true,
      subcategories: [
        'Business Pitch Deck',
        'Startup Pitch Deck',
        'Marketing Presentation',
        'Education Slides',
        'Portfolio Presentation',
        'Keynote Templates',
        'Webinar Slides',
        'Company Overview',
      ],
    },
    {
      name: 'Education',
      icon: 'faGraduationCap',
      showInNav: true,
      showInHero: false,
      subcategories: [
        'Lesson Plans',
        'Worksheets',
        'Flashcards',
        'Certificate Templates',
        'Report Cards',
        'Classroom Posters',
        'School Newsletters',
      ],
    },
    {
      name: 'Marketing',
      icon: 'faChartLine',
      showInNav: true,
      showInHero: false,
      subcategories: [
        'Email Headers',
        'Flyers & Posters',
        'Brochures',
        'Newsletters',
        'Infographics',
        'White Papers',
        'Case Studies',
        'Ebooks',
      ],
    },
    {
      name: 'Invitations',
      icon: 'faHeart',
      showInNav: false,
      showInHero: true,
      subcategories: [
        'Wedding Invitations',
        'Birthday Invitations',
        'Party Invitations',
        'Baby Shower',
        'Engagement Party',
        'Graduation Announcements',
        'Save the Date',
      ],
    },
  ]

  for (const catData of categoryData) {
    console.log(`📂 Creating category: ${catData.name}`)
    const category = await db.category.create({
      data: {
        name: catData.name,
        icon: catData.icon,
        showInNav: catData.showInNav,
        showInHero: catData.showInHero,
      },
    })

    for (const subName of catData.subcategories) {
      await db.subcategory.create({
        data: {
          name: subName,
          categoryId: category.id,
        },
      })
    }
    console.log(`  ✅ Added ${catData.subcategories.length} subcategories`)
  }

  console.log('\n🎉 Seeding complete!')
  console.log(`   Created ${categoryData.length} categories`)
  console.log(`   Created ${categoryData.reduce((sum, c) => sum + c.subcategories.length, 0)} subcategories`)
}

seed()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
