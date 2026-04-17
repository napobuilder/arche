import Link from 'next/link'
import { Lock } from 'lucide-react'
import { Investigation } from '@/data/investigations'

interface PaperCardProps {
  paper: Investigation
}

export default function PaperCard({ paper }: PaperCardProps) {
  return (
    <Link href={`/investigaciones/${paper.slug}`} className="group cursor-pointer flex flex-col gap-6">
      {/* Imagen */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#0f0f0f] rounded-sm">
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <span className="bg-white/10 backdrop-blur-md px-2 py-1 text-[10px] font-mono rounded-sm border border-white/10">
            {paper.id}
          </span>
          {paper.access === 'locked' && (
            <span className="bg-white/10 backdrop-blur-md px-2 py-1 text-[10px] rounded-sm border border-white/10 flex items-center justify-center">
              <Lock className="w-3 h-3 text-[#E8E6E1]" />
            </span>
          )}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={paper.heroImage}
          alt={paper.title}
          className="w-full h-full object-cover opacity-40 blur-md grayscale transition-all duration-700 ease-out
                     group-hover:opacity-100 group-hover:blur-none group-hover:scale-105 group-hover:grayscale-0"
        />
      </div>

      {/* Metadata */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between font-mono text-[10px] text-[#8A8881] tracking-wider border-b border-white/10 pb-2">
          <span>{paper.date}</span>
          <span className={paper.access === 'locked' ? 'text-red-400/50' : ''}>
            {paper.type}
          </span>
        </div>
        <h3 className="font-serif text-2xl mt-2 text-[#E8E6E1] group-hover:text-[#2C4A3B] transition-colors duration-300">
          {paper.title}
        </h3>
        <p className="font-serif text-[#8A8881] leading-relaxed text-sm line-clamp-3">
          {paper.shortDesc}
        </p>
        {paper.tags && paper.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
            {paper.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] tracking-wide text-[#8A8881]/60 border border-white/5 group-hover:border-purple-500/20 group-hover:text-purple-300/60 px-2 py-0.5 rounded-sm transition-all duration-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
