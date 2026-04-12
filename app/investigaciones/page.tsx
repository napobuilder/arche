import type { Metadata } from 'next'
import PaperCard from '@/components/PaperCard'
import { investigations } from '@/data/investigations'

export const metadata: Metadata = {
  title: 'Archivo de Investigaciones',
  description:
    'Exploración profunda de consciencia, esoterismo, neurociencias y fenómenos atípicos. Ensayos, papers y registros de laboratorio de la Fundación Arché.',
  keywords: [
    'investigaciones consciencia', 'archivo esoterismo', 'papers neurociencias meditación',
    'ensayos ocultismo ciencia', 'fundación arché investigaciones',
  ],
}

export default function InvestigacionesPage() {
  return (
    <main className="relative min-h-screen bg-[#050505] pt-40 pb-32 px-8 md:px-24">
      {/* Header de sección */}
      <div className="mb-24">
        <div className="font-mono text-xs text-[#8A8881] mb-6 flex items-center gap-4">
          <span className="w-8 h-[1px] bg-[#8A8881]" />
          <span>FUNDACIÓN ARCHÉ</span>
        </div>
        <h1 className="font-serif text-5xl md:text-7xl font-light leading-tight text-[#E8E6E1]">
          Archivo <br />
          <span className="text-[#8A8881] italic">Completo</span>
        </h1>
        <p className="font-mono text-xs text-[#8A8881] max-w-md mt-6 leading-relaxed">
          PUBLICACIONES, ENSAYOS Y REGISTROS DE LABORATORIO SOBRE LA INTERSECCIÓN ENTRE LA NEUROCIENCIA, EL ESOTERISMO Y LOS FENÓMENOS ATÍPICOS.
        </p>
      </div>

      {/* Grid de investigaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {investigations.map((paper) => (
          <PaperCard key={paper.id} paper={paper} />
        ))}
      </div>
    </main>
  )
}
