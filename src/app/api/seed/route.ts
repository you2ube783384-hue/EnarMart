import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

// POST /api/seed - Seed sample products
export async function POST() {
  try {
    // Clear existing products
    await db.product.deleteMany()

    const sampleProducts = [
      {
        title: 'Stunning Nature Photography Pack',
        description: 'A stunning collection of mountain landscape photographs captured at golden hour. Perfect for nature-themed projects and editorial use.',
        price: '49.99',
        category: 'Photos',
        imageUrl: '/products/photo-1.jpg',
        viewUrl: '',
        featured: true,
      },
      {
        title: 'Urban Street Photography Collection',
        description: 'Authentic urban street scenes and city life captured in black and white. Ideal for editorial and documentary projects.',
        price: '39.99',
        category: 'Photos',
        imageUrl: '/products/photo-2.jpg',
        viewUrl: '',
        featured: false,
      },
      {
        title: 'Abstract Geometric Patterns',
        description: 'Modern abstract geometric patterns with vibrant colors. Great for backgrounds, posters, and digital art projects.',
        price: '29.99',
        category: 'Graphics',
        imageUrl: '/products/graphic-1.jpg',
        viewUrl: '',
        featured: true,
      },
      {
        title: 'Watercolor Floral Elements',
        description: 'Hand-painted watercolor textures and backgrounds. Perfect for invitation designs, branding, and artistic projects.',
        price: '34.99',
        category: 'Graphics',
        imageUrl: '/products/graphic-2.jpg',
        viewUrl: '',
        featured: false,
      },
      {
        title: 'Professional Resume Templates',
        description: 'Clean and professional business portfolio template with 24 pages. Fully customizable with smart objects.',
        price: '59.99',
        category: 'Templates',
        imageUrl: '/products/template-1.jpg',
        viewUrl: '',
        featured: true,
      },
      {
        title: 'Social Media Story Templates',
        description: 'Complete e-commerce dashboard UI kit with 50+ components. Built with modern design principles and auto-layout.',
        price: '79.99',
        category: 'Templates',
        imageUrl: '/products/template-2.jpg',
        viewUrl: '',
        featured: false,
      },
      {
        title: 'Modern Sans Serif Font Family',
        description: 'A versatile serif font family with 8 weights. Perfect for editorial design, branding, and luxury projects.',
        price: '44.99',
        category: 'Fonts',
        imageUrl: '/products/font-1.jpg',
        viewUrl: '',
        featured: true,
      },
      {
        title: 'Elegant Script Font Collection',
        description: 'Clean and modern sans-serif typeface with extensive language support. Ideal for web and mobile applications.',
        price: '54.99',
        category: 'Fonts',
        imageUrl: '/products/font-2.jpg',
        viewUrl: '',
        featured: false,
      },
      {
        title: '3D Icon Pack',
        description: 'A collection of 12 low-poly 3D characters with animations. Ready for game development and AR/VR projects.',
        price: '89.99',
        category: '3D',
        imageUrl: '/products/3d-1.jpg',
        viewUrl: '',
        featured: true,
      },
      {
        title: '3D Character Collection',
        description: 'Photorealistic 3D product mockup scenes for packaging and branding presentations. 8 fully customizable scenes.',
        price: '69.99',
        category: '3D',
        imageUrl: '/products/3d-2.jpg',
        viewUrl: '',
        featured: false,
      },
      {
        title: 'Minimal Line Icon Set',
        description: 'A comprehensive set of 500+ essential UI icons in multiple formats. Consistent line weight and pixel-perfect design.',
        price: '24.99',
        category: 'Icons',
        imageUrl: '/products/icon-1.jpg',
        viewUrl: '',
        featured: true,
      },
      {
        title: 'Flat Color Icon Pack',
        description: 'Complete social media icon pack with 200+ icons in flat, line, and gradient styles. SVG and PNG included.',
        price: '19.99',
        category: 'Icons',
        imageUrl: '/products/icon-2.jpg',
        viewUrl: '',
        featured: false,
      },
    ]

    const products = await db.product.createMany({
      data: sampleProducts,
    })

    return NextResponse.json({
      message: 'Database seeded successfully',
      count: products.count,
    })
  } catch (error) {
    console.error('Error seeding database:', error)
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    )
  }
}
