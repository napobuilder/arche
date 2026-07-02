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
      keywords: [
        'jacobo grinberg', 'teoria sintergica', 'jacobo grinberg libros y biografia', 'que es la latice grinberg',
        'campo neuronal y sinergia', 'potencial transferido experimento', 'fisica cuantica y conciencia',
        'roger penrose orch or', 'david bohm orden implicado', 'panpsiquismo moderno', 'chamanismo mexicano pachita',
        'meditacion autoalusiva', 'neurofisiologia de la conciencia', 'conciencia no local cientifica'
      ]
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
      title: 'La Neurociencia de la Trascendencia: Bases Biológicas y Místicas | Arché',
      description: 'Una profunda exploración de las bases biológicas de las experiencias religiosas, la meditación y la activación de la circuitería mística en el cerebro.',
      keywords: [
        'neurociencia y espiritualidad', 'que pasa en el cerebro al meditar', 'neurobiologia de la meditacion',
        'materia gris periacueductal', 'experiencias misticas cerebro', 'extasis mistico neurociencia',
        'dopamina y oxitocina en meditacion', 'oracion y cerebro humano', 'neuroplasticidad contemplativa',
        'estados alterados de consciencia', 'bases biologicas de la religion'
      ]
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
      title: 'TDAH e Intuición "Telepática": Neurobiología, Medicación y Percepción | Arché',
      description: 'Una investigación rigurosa sobre TDAH, codificación predictiva bayesiana, filtrado sensorial poroso y telepatía, analizando el efecto de la atomoxetina y meditación.',
      keywords: [
        'tdah e intuicion', 'tdah telepatia', 'terminar frases de los demas tdah', 'filtrado sensorial sensory gating',
        'atomoxetina e intuicion', 'neurodivergencia y espiritualidad', 'red neuronal por defecto dmn tdah',
        'codificacion predictiva cerebro', 'centro rhine telepatia estadistica', 'instituto ions ciencias noeticas',
        'diane hennacy powell autismo telepatia', 'meditacion para tdah neuroplasticidad', 'superpoder tdah neurobiologia'
      ]
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
      description: 'Un análisis histórico, filosófico y científico del felino esotérico. Desde Egipto y la Luz Astral de Lévi hasta la bioacústica curativa del ronroneo y visión ultravioleta.',
      keywords: [
        'gatos magia ocultismo', 'frecuencia ronroneo gato sanacion 25 hz', 'porque los gatos ven espiritus vision ultravioleta',
        'gatos esoterismo hermetismo', 'eliphas levi luz astral gatos', 'gatos en la brujeria historia',
        'gatos aurora dorada dion fortune', 'bioacustica felina osteogenesis', 'magnetorrecepcion en gatos',
        'rupert sheldrake telepatia en animales', 'gato como protector espiritual chamanico'
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
