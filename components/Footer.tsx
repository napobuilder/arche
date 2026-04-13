import Link from 'next/link'
import { Hexagon } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative z-20 w-full px-8 md:px-24 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 bg-[#020202]">
      <div className="flex items-center gap-2 text-[#8A8881]">
        <Hexagon className="w-5 h-5" strokeWidth={1} />
        <span className="font-serif tracking-widest uppercase text-[#8A8881]">Archē</span>
      </div>

      <div className="font-mono text-[10px] text-[#8A8881] tracking-widest text-center">
        © 2026 INSTITUTO DE INVESTIGACIÓN DE LA CONSCIENCIA.
      </div>

      <div className="flex gap-6 font-mono text-[10px] text-[#8A8881]">
        <Link href="/contacto" className="hover:text-white transition-colors">CONTACTO</Link>
        <Link href="/manifiesto" className="hover:text-white transition-colors">MANIFIESTO</Link>
      </div>
    </footer>
  )
}
