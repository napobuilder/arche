export type AccessLevel = 'public' | 'partial' | 'locked'

export interface Investigation {
  id: string
  slug: string
  date: string
  type: string
  access: AccessLevel
  title: string
  shortDesc: string
  heroImage: string
  tags: string[]
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

export const investigations: Investigation[] = [
  {
    id: '04',
    slug: 'grinberg-teoria-sinteargica',
    date: '17.04.2026',
    type: 'ANÁLISIS INTERDISCIPLINARIO',
    access: 'public',
    title: 'Más Allá de Jacobo Grinberg: La Teoría Sintérgica bajo la Lupa',
    shortDesc: 'Una evaluación rigurosa de si la Teoría Sintérgica sobrevive al escrutinio de la física cuántica, la neurociencia y la philosophía de la conciencia modernas.',
    heroImage: '/grinberg-hero.png',
    tags: ['Conciencia', 'Física Cuántica', 'Neurociencia', 'Panpsiquismo', 'Filosofía'],
    seo: {
      title: 'Jacobo Grinberg y la Teoría Sintérgica: Física Cuántica y Neurociencia | Arché',
      description: 'Evaluamos la Teoría Sintérgica de Grinberg frente a Bohm, Penrose, Stapp y Wheeler. ¿Es la conciencia un campo cuántico? Un análisis sin concesiones.',
      keywords: ['Jacobo Grinberg', 'Teoría Sintérgica', 'Látice', 'Campo Neuronal', 'Potencial Transferido', 'Bohm Orden Implicado', 'Orch-OR', 'Panpsiquismo', 'Individualismo Abierto', 'Conciencia Cuántica', 'Física Cuántica Consciencia']
    }
  },
  {
    id: '03',
    slug: 'neurociencia-de-la-trascendencia',
    date: '12.04.2026',
    type: 'PAPER CURADO',
    access: 'public',
    title: 'La Neurociencia de la Trascendencia',
    shortDesc: 'Una revisión cualitativa sobre cómo las prácticas espirituales y religiosas impactan biológicamente la arquitectura del cerebro humano.',
    heroImage: '/trascendencia.webp',
    tags: ['Neurociencia', 'Espiritualidad', 'Meditación', 'Trascendencia', 'Biología'],
    seo: {
      title: 'La Neurociencia de la Trascendencia: Bases Biológicas | Arché',
      description: 'Una profunda exploración de las bases biológicas de las experiencias religiosas y la activación de la mente mística innata en el cerebro.',
      keywords: ['Neurociencia', 'Espiritualidad', 'Materia Gris Periacueductal', 'Trascendencia', 'Núcleo Accumbens', 'Éxtasis Místico']
    }
  },
  {
    id: '02',
    slug: 'tdah-y-telepatia-medicacion',
    date: '12.04.2026',
    type: 'NEUROBIOLOGÍA',
    access: 'public',
    title: 'TDAH y "Telepatía": La Arquitectura Oculta de la Intuición y el Efecto de la Farmacología',
    shortDesc: '¿Es el TDAH un motor predictivo anómalo? Un análisis sobre la neurodivergencia, la clarividencia y cómo la atomoxetina afecta las simulaciones mentales compartidas.',
    heroImage: '/tdah.webp',
    tags: ['TDAH', 'Neurociencia', 'Parapsicología', 'Intuición', 'Neurodivergencia'],
    seo: {
      title: 'TDAH y "Telepatía": La Arquitectura Oculta de la Intuición | Arché',
      description: 'Una investigación rigurosa que conecta el TDAH, el procesamiento predictivo bayesiano y los fenómenos de telepatía, evaluando el impacto de la atomoxetina en la red neuronal por defecto.',
      keywords: ['TDAH', 'Telepatía', 'Neurociencia', 'Intuición', 'Atomoxetina', 'Neurodivergencia', 'Parapsicología', 'Rupert Sheldrake', 'Red Neuronal por Defecto']
    }
  },
  {
    id: '01',
    slug: 'gatos-magia-neurociencia',
    date: '12.04.2026',
    type: 'INVESTIGACIÓN PROFUNDA',
    access: 'public',
    title: 'Gatos, Magia y Neurociencia',
    shortDesc: 'Un Análisis Histórico, Filosófico y Científico de la Simbiosis Felino-Iniciática.',
    heroImage: '/gatonegro.webp',
    tags: ['Esoterismo', 'Historia', 'Bioacústica', 'Ocultismo', 'Filosofía'],
    seo: {
      title: 'Gatos, Magia y Neurociencia: La Simbiosis Felino-Iniciática | Arché',
      description: 'Un análisis histórico, filosófico y científico de la relación entre los felinos y las tradiciones esotéricas. Desde el antiguo Egipto hasta la bioacústica moderna del ronroneo.',
      keywords: [
        'gatos magia ocultismo', 'felinos esoterica', 'bastet egipto', 'ronroneo frecuencia sanación',
        'gatos brujería historia', 'esoterismo felino', 'Eliphas Levi luz astral', 'gatos hermetismo',
        'bioacústica felina', 'frecuencia ronroneo Hz medicina', 'ocultismo científico'
      ]
    }
  }
]

export function getInvestigationBySlug(slug: string): Investigation | undefined {
  return investigations.find((i) => i.slug === slug)
}

export function getAllSlugs(): string[] {
  return investigations.map((i) => i.slug)
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>()
  investigations.forEach((i) => i.tags.forEach((t) => tagSet.add(t)))
  return Array.from(tagSet).sort()
}
