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
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

export const investigations: Investigation[] = [
  {
    id: '05',
    slug: 'neurociencia-de-la-trascendencia',
    date: '12.04.2026',
    type: 'PAPER CURADO',
    access: 'public',
    title: 'La Neurociencia de la Trascendencia',
    shortDesc: 'Una revisión cualitativa sobre cómo las prácticas espirituales y religiosas impactan biológicamente la arquitectura del cerebro humano.',
    heroImage: '/neuroarte.jpg',
    seo: {
      title: 'La Neurociencia de la Trascendencia: Bases Biológicas | Arché',
      description: 'Una profunda exploración de las bases biológicas de las experiencias religiosas y la activación de la mente mística innata en el cerebro.',
      keywords: ['Neurociencia', 'Espiritualidad', 'Materia Gris Periacueductal', 'Trascendencia', 'Núcleo Accumbens', 'Éxtasis Místico']
    }
  },
  {
    id: '04',
    slug: 'tdah-y-telepatia-medicacion',
    date: '12.04.2026',
    type: 'NEUROBIOLOGÍA',
    access: 'public',
    title: 'TDAH y Telepatía: La Arquitectura Oculta de la Intuición y el Efecto de la Medicación',
    shortDesc: '¿Es el TDAH un motor predictivo anómalo? Un análisis sobre la neurodivergencia, la clarividencia y cómo la atomoxetina afecta las simulaciones mentales compartidas.',
    heroImage: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    seo: {
      title: 'TDAH y Telepatía: La Arquitectura Oculta de la Intuición | Arché',
      description: 'Una investigación rigurosa que conecta el TDAH, el procesamiento predictivo bayesiano y los fenómenos de telepatía, evaluando el impacto de la atomoxetina en la red neuronal por defecto.',
      keywords: ['TDAH', 'Telepatía', 'Neurociencia', 'Intuición', 'Atomoxetina', 'Neurodivergencia', 'Parapsicología', 'Rupert Sheldrake', 'Red Neuronal por Defecto']
    }
  },
  {
    id: '01',
    slug: 'gatos-magia-neurociencia',
    date: '12.04.2026',
    type: 'INVESTIGACIÓN PROFUNDA',
    access: 'partial',
    title: 'Gatos, Magia y Neurociencia',
    shortDesc: 'Un Análisis Histórico, Filosófico y Científico de la Simbiosis Felino-Iniciática.',
    heroImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1200&auto=format&fit=crop',
    seo: {
      title: 'Gatos, Magia y Neurociencia: La Simbiosis Felino-Iniciática | Arché',
      description: 'Un análisis histórico, filosófico y científico de la relación entre los felinos y las tradiciones esotéricas. Desde el antiguo Egipto hasta la bioacústica moderna del ronroneo.',
      keywords: [
        'gatos magia ocultismo', 'felinos esoterica', 'bastet egipto', 'ronroneo frecuencia sanación',
        'gatos brujería historia', 'esoterismo felino', 'Eliphas Levi luz astral', 'gatos hermetismo',
        'bioacústica felina', 'frecuencia ronroneo Hz medicina', 'ocultismo científico'
      ]
    }
  },
  {
    id: '02',
    slug: 'geometria-de-la-intuicion',
    date: '02.04.2026',
    type: 'ENSAYO ABIERTO',
    access: 'public',
    title: 'La Geometría de la Intuición',
    shortDesc: 'Correlaciones entre patrones geométricos sagrados y la arquitectura de las redes neuronales biológicas.',
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    seo: {
      title: 'La Geometría de la Intuición: Geometría Sagrada y Neurociencias | Arché',
      description: 'Exploramos las sorprendentes correlaciones entre los patrones de la geometría sagrada y la arquitectura fractal de las redes neuronales biológicas. ¿Coincidencia o diseño?',
      keywords: [
        'geometría sagrada neurociencias', 'intuición geometría', 'redes neuronales geometría',
        'flor de la vida cerebro', 'patrones fractales neurología', 'geometría sagrada ciencia',
        'proporción áurea neuronas', 'esoterismo y neurociencia', 'misticismo y ciencia'
      ]
    }
  },
  {
    id: '03',
    slug: 'el-vacio-perceptible',
    date: 'En curso',
    type: 'LABORATORIO RESTRINGIDO',
    access: 'locked',
    title: 'El Vacío Perceptible',
    shortDesc: 'Midiendo las fluctuaciones biométricas durante la meditación de disolución del ego.',
    heroImage: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=800&auto=format&fit=crop',
    seo: {
      title: 'El Vacío Perceptible: Biometría en la Meditación de Disolución del Ego | Arché',
      description: 'Investigación en curso: medición de fluctuaciones biométricas durante estados de meditación profunda y disolución del ego. Metodología, datos y hallazgos preliminares.',
      keywords: [
        'meditación disolución ego biométrica', 'ondas cerebrales meditación profunda',
        'EEG meditación avanzada', 'estados no ordinarios consciencia', 'meditación vacío',
        'experiencias místicas neurociencia', 'meditación theta ondas', 'conciencia cuántica'
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
