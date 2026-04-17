import { MetadataRoute } from 'next'
import { investigations } from '@/data/investigations'

// Convierte '17.04.2026' → Date ISO
function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('.')
  return new Date(`${year}-${month}-${day}`)
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://proyectoarche.com'

  const investigationUrls = investigations.map((paper) => ({
    url: `${baseUrl}/investigaciones/${paper.slug}`,
    lastModified: parseDate(paper.date),
    changeFrequency: 'monthly' as const,
    priority: paper.access === 'public' ? 0.9 : 0.6,
  }))

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/investigaciones`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/manifiesto`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    ...investigationUrls,
  ]
}
