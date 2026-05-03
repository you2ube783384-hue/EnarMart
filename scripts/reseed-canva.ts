import { createClient } from '@libsql/client'

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})

async function reseed() {
  console.log('Clearing old data...')
  await client.execute('DELETE FROM Subcategory')
  await client.execute('DELETE FROM Product')
  await client.execute('DELETE FROM Category')
  console.log('✓ Old data cleared')

  const categories = [
    { name: 'Most Purchased', icon: 'faFire', showInNav: true, showInHero: true },
    { name: 'Resume & CV', icon: 'faBriefcase', showInNav: true, showInHero: true },
    { name: 'Social Media', icon: 'faBullhorn', showInNav: true, showInHero: true },
    { name: 'YouTube', icon: 'faVideo', showInNav: true, showInHero: true },
    { name: 'Presentations', icon: 'faLayerGroup', showInNav: true, showInHero: true },
    { name: 'Blog & Article', icon: 'faNewspaper', showInNav: false, showInHero: true },
    { name: 'Education', icon: 'faGraduationCap', showInNav: true, showInHero: true },
    { name: 'Lifestyle', icon: 'faHeart', showInNav: false, showInHero: true },
    { name: 'Business', icon: 'faChartLine', showInNav: true, showInHero: false },
    { name: 'Premium', icon: 'faCrown', showInNav: true, showInHero: true },
  ]

  console.log('Creating categories...')
  const categoryIds: Record<string, string> = {}
  for (const cat of categories) {
    const id = `cat_${cat.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`
    categoryIds[cat.name] = id
    await client.execute({
      sql: `INSERT INTO Category (id, name, icon, showInNav, showInHero, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      args: [id, cat.name, cat.icon, cat.showInNav ? 1 : 0, cat.showInHero ? 1 : 0],
    })
  }
  console.log(`✓ ${categories.length} categories created`)

  const subcategories = [
    { name: 'Software Engineer Resume', category: 'Resume & CV' },
    { name: 'Designer Resume', category: 'Resume & CV' },
    { name: 'Executive Resume', category: 'Resume & CV' },
    { name: 'Entry Level Resume', category: 'Resume & CV' },
    { name: 'Instagram Posts', category: 'Social Media' },
    { name: 'Instagram Stories', category: 'Social Media' },
    { name: 'Facebook Covers', category: 'Social Media' },
    { name: 'LinkedIn Banners', category: 'Social Media' },
    { name: 'Pinterest Pins', category: 'Social Media' },
    { name: 'YouTube Thumbnails', category: 'YouTube' },
    { name: 'YouTube Banners', category: 'YouTube' },
    { name: 'YouTube Outros', category: 'YouTube' },
    { name: 'Pitch Decks', category: 'Presentations' },
    { name: 'Keynote Templates', category: 'Presentations' },
    { name: 'Webinar Slides', category: 'Presentations' },
    { name: 'Blog Headers', category: 'Blog & Article' },
    { name: 'Newsletter Templates', category: 'Blog & Article' },
    { name: 'E-book Templates', category: 'Blog & Article' },
    { name: 'Lesson Plans', category: 'Education' },
    { name: 'Certificates', category: 'Education' },
    { name: 'Flashcards', category: 'Education' },
    { name: 'Wedding Invitations', category: 'Lifestyle' },
    { name: 'Birthday Cards', category: 'Lifestyle' },
    { name: 'Travel Planners', category: 'Lifestyle' },
    { name: 'Invoices', category: 'Business' },
    { name: 'Business Cards', category: 'Business' },
    { name: 'Meeting Agendas', category: 'Business' },
    { name: 'Proposal Templates', category: 'Business' },
  ]

  console.log('Creating subcategories...')
  for (const sub of subcategories) {
    const id = `sub_${sub.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`
    await client.execute({
      sql: `INSERT INTO Subcategory (id, name, categoryId, createdAt, updatedAt) VALUES (?, ?, ?, datetime('now'), datetime('now'))`,
      args: [id, sub.name, categoryIds[sub.category]],
    })
  }
  console.log(`✓ ${subcategories.length} subcategories created`)

  const products = [
    { title: 'Modern Software Engineer Resume', description: 'Clean, ATS-friendly resume template designed for software engineers. Fully editable in Canva with matching cover letter.', price: '4.99', category: 'Resume & CV', featured: true },
    { title: 'Minimal Developer Resume Pack', description: 'Set of 3 minimalist resume templates for developers. Includes CV, cover letter, and portfolio page.', price: '7.99', category: 'Resume & CV', featured: true },
    { title: 'Executive Leadership Resume', description: 'Premium executive resume template with modern layout. Perfect for C-suite and senior management roles.', price: '9.99', category: 'Resume & CV', featured: false },
    { title: 'Creative Designer Resume', description: 'Visually stunning resume template for designers and creatives. Stand out with unique layout and color scheme.', price: '5.99', category: 'Resume & CV', featured: true },
    { title: 'Entry Level Resume Bundle', description: '3 resume templates perfect for fresh graduates and entry-level positions. Simple, clean, and professional.', price: '3.99', category: 'Resume & CV', featured: false },
    { title: 'Instagram Post Templates - Wellness', description: '50 beautiful Instagram post templates for wellness and lifestyle brands. Fully editable in Canva.', price: '12.99', category: 'Social Media', featured: true },
    { title: 'Instagram Story Bundle - Business', description: '30 animated Instagram story templates for business and entrepreneurship. Boost your engagement!', price: '8.99', category: 'Social Media', featured: true },
    { title: 'Pinterest Pin Templates - Food Blog', description: '40 Pinterest pin templates designed for food bloggers and recipe creators. Drive more traffic to your blog.', price: '9.99', category: 'Social Media', featured: false },
    { title: 'LinkedIn Banner Pack', description: '10 professional LinkedIn banner templates. Make your profile stand out to recruiters and connections.', price: '4.99', category: 'Social Media', featured: true },
    { title: 'Facebook Cover Templates', description: '15 Facebook cover templates for small businesses. Promote your brand with professional designs.', price: '5.99', category: 'Social Media', featured: false },
    { title: 'YouTube Thumbnail Pack - Gaming', description: '25 eye-catching YouTube thumbnail templates for gaming channels. Increase your CTR dramatically.', price: '8.99', category: 'YouTube', featured: true },
    { title: 'YouTube Thumbnail Pack - Vlogs', description: '20 vibrant YouTube thumbnail templates for vloggers and lifestyle creators. Stand out in search results!', price: '7.99', category: 'YouTube', featured: true },
    { title: 'YouTube Banner Templates', description: '10 professional YouTube banner/channel art templates. Perfect for branding your channel.', price: '4.99', category: 'YouTube', featured: false },
    { title: 'YouTube Outro Templates', description: '15 YouTube outro screen templates with subscribe animations. Keep viewers engaged!', price: '6.99', category: 'YouTube', featured: false },
    { title: 'Startup Pitch Deck Template', description: 'Complete pitch deck template with 30+ slides. Impress investors with professional design and layout.', price: '14.99', category: 'Presentations', featured: true },
    { title: 'Webinar Slide Templates', description: '25 webinar presentation templates. Engage your audience with professional slides and visual elements.', price: '9.99', category: 'Presentations', featured: true },
    { title: 'Keynote Business Template', description: '40+ Keynote slides for business presentations. Clean, modern, and fully customizable.', price: '11.99', category: 'Presentations', featured: false },
    { title: 'Blog Header Templates - Travel', description: '30 beautiful blog header templates for travel bloggers. Capture the adventure spirit in your posts.', price: '6.99', category: 'Blog & Article', featured: false },
    { title: 'Newsletter Templates - 12 Pack', description: '12 monthly newsletter templates for email marketing. Keep your subscribers engaged all year round.', price: '8.99', category: 'Blog & Article', featured: true },
    { title: 'E-book Layout Templates', description: '5 professional e-book layout templates. Create beautiful digital books with chapters, TOC, and more.', price: '12.99', category: 'Blog & Article', featured: false },
    { title: 'Lesson Plan Templates', description: '20 lesson plan templates for teachers and educators. Organize your curriculum with style.', price: '5.99', category: 'Education', featured: false },
    { title: 'Certificate Templates Bundle', description: '30 certificate templates for awards, achievements, and completions. Professional and elegant designs.', price: '7.99', category: 'Education', featured: true },
    { title: 'Flashcard Templates - Kids', description: '15 colorful flashcard templates for early childhood education. Make learning fun and engaging!', price: '3.99', category: 'Education', featured: false },
    { title: 'Wedding Invitation Suite', description: 'Complete wedding invitation suite: invitation, RSVP, menu, and thank you card. Elegant and timeless.', price: '15.99', category: 'Lifestyle', featured: true },
    { title: 'Birthday Invitation Templates', description: '25 birthday invitation templates for all ages and themes. From kids to adults, we have it all!', price: '6.99', category: 'Lifestyle', featured: false },
    { title: 'Travel Planner Templates', description: '10 travel planner templates: itinerary, packing list, budget tracker, and journal pages.', price: '5.99', category: 'Lifestyle', featured: true },
    { title: 'Professional Invoice Templates', description: '10 clean invoice templates for freelancers and small businesses. Get paid faster with professional docs.', price: '4.99', category: 'Business', featured: false },
    { title: 'Business Card Templates', description: '20 modern business card templates. Make a lasting impression with professional card designs.', price: '6.99', category: 'Business', featured: true },
    { title: 'Meeting Agenda Templates', description: '15 meeting agenda and notes templates. Run productive meetings with clear structure.', price: '3.99', category: 'Business', featured: false },
    { title: 'Proposal Template Kit', description: '5 comprehensive business proposal templates. Win more clients with professional proposals.', price: '9.99', category: 'Business', featured: true },
  ]

  console.log('Creating products...')
  for (let i = 0; i < products.length; i++) {
    const p = products[i]
    const id = `prod_${String(i + 1).padStart(3, '0')}`
    const imageNum = (i % 12) + 1
    await client.execute({
      sql: `INSERT INTO Product (id, title, description, price, category, imageUrl, viewUrl, featured, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      args: [id, p.title, p.description, p.price, p.category, `https://picsum.photos/seed/canva${imageNum}/600/750`, '', p.featured ? 1 : 0],
    })
  }
  console.log(`✓ ${products.length} products created`)

  console.log('\n✅ Reseed complete! Canva template store is ready.')
}

reseed().catch((err) => {
  console.error('Reseed failed:', err)
  process.exit(1)
})
