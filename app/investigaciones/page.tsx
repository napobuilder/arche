import type { Metadata } from 'next'
import InvestigacionesClient from './InvestigacionesClient'
import { getAllTags } from '@/data/investigations'

const BASE_URL = 'https://proyectoarche.com'

export const metadata: Metadata = {
  title: 'Archivo de Investigaciones | Arché',
  description:
    'Exploración profunda de consciencia, esoterismo, neurociencias y fenómenos atípicos. Ensayos, papers y registros de laboratorio del Instituto Arché.',
  keywords: [
    // Topics generales del archivo
    'investigaciones consciencia', 'archive esoterismo', 'papers neurociencias meditación',
    'ensayos ocultismo ciencia', 'instituto arché investigaciones',
    // Tags del sistema — todos los temas cubiertos
    ...getAllTags(),
    // Long-tail keywords editoriales
    'física cuántica conciencia', 'neurociencia espiritualidad', 'tdah intuición',
    'gatos ocultismo historia', 'panpsiquismo artículos', 'jacobo grinberg análisis',
  ],
  alternates: {
    canonical: `${BASE_URL}/investigaciones`,
  },
  openGraph: {
    title: 'Archivo de Investigaciones | Arché',
    description: 'Ensayos, papers y registros de laboratorio sobre la intersección entre neurociencia, esoterismo y fenómenos atípicos.',
    url: `${BASE_URL}/investigaciones`,
    siteName: 'Arché — Instituto de Investigación de la Consciencia',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Archivo de Investigaciones | Arché',
    description: 'Ensayos, papers y registros sobre neurociencia, esoterismo y fenómenos atípicos.',
  },
}

export default function InvestigacionesPage() {
  return <InvestigacionesClient />
}
