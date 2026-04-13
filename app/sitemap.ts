import { MetadataRoute } from 'next'
import { investigations } from '@/data/investigations'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://proyectoarche.com'
  
  const investigationUrls = investigations.map((paper) => ({
    url: `${baseUrl}/investigaciones/${paper.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/investigaciones`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/manifiesto`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    ...investigationUrls,
  ]
}
