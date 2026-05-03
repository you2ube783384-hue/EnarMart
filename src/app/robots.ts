import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/control', '/api/'],
      },
    ],
    sitemap: 'https://enarmart.com/sitemap.xml',
  }
}
