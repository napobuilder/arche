import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Manifiesto',
  description: 'La visión, los principios y el propósito de la Fundación Arché. Por qué investigamos lo que la ciencia convencional suele ignorar.',
}

export default function ManifiestoPage() {
  return (
    <main className="relative min-h-screen bg-[#050505] pt-40 pb-32 px-8 md:px-24">
      <div className="max-w-2xl mx-auto">
        <div className="font-mono text-xs text-[#8A8881] mb-6 flex items-center gap-4">
          <span className="w-8 h-[1px] bg-[#8A8881]" />
          <span>FUNDACIÓN ARCHÉ</span>
        </div>
        <h1 className="font-serif text-5xl md:text-6xl font-light leading-tight text-[#E8E6E1] mb-16">
          Manifiesto
        </h1>

        <div className="font-serif text-xl text-[#c4c2bc] leading-relaxed space-y-8">
          <p className="text-2xl text-[#E8E6E1] italic font-light border-l-2 border-purple-500/30 pl-8">
            Existen preguntas que la ciencia convencional aún no sabe —o no quiere— responder.
          </p>
          <p>
            Arché nació de la convicción de que la curiosidad intelectual no debe tener límites institucionales. 
            Investigamos en el espacio fronterizo entre la neurociencia, la filosofía, el esoterismo y los fenómenos atípicos 
            porque creemos que es allí donde viven las preguntas más importantes sobre la naturaleza humana.
          </p>
          <p>
            No somos ni completamente científicos ni completamente místicos. Somos exploradores rigurosos del misterio.
          </p>
          <div className="py-8 border-y border-white/10 text-center">
            <p className="font-mono text-[10px] tracking-widest text-[#8A8881]">
              — MANIFIESTO EN CONSTRUCCIÓN —
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
