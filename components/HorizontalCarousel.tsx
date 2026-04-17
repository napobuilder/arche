'use client'

import { useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Lock, Hexagon, ArrowRight } from 'lucide-react'
import { Investigation } from '@/data/investigations'

interface Props {
  papers: Investigation[]
}

export default function HorizontalCarousel({ papers }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [hasScrolled, setHasScrolled] = useState(false)

  const updateScrollState = useCallback(() => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    if (scrollLeft > 20) setHasScrolled(true)
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = scrollRef.current.clientWidth * 0.65
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  const featured = papers[0]
  const rest = papers.slice(1)

  return (
    <div className="relative">
      {/* ── SCROLL TRACK ── */}
      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="flex gap-6 overflow-x-auto pb-8"
        style={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >

        {/* ── FEATURED CARD (artículo más nuevo) ── */}
        <Link
          href={`/investigaciones/${featured.slug}`}
          className="shrink-0 w-[85vw] sm:w-[420px] md:w-[520px] flex flex-col group cursor-pointer"
          style={{ scrollSnapAlign: 'start' }}
        >
          {/* Imagen siempre nítida y a color */}
          <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#0f0f0f]">
            {/* Badge NUEVA */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="flex items-center gap-1.5 bg-purple-500/20 backdrop-blur-md px-3 py-1.5 text-[9px] font-mono tracking-widest text-purple-300 border border-purple-500/40">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                NUEVA INVESTIGACIÓN
              </span>
              {featured.access === 'locked' && (
                <span className="bg-white/10 backdrop-blur-md px-2 py-1.5 border border-white/10 flex items-center justify-center">
                  <Lock className="w-3 h-3 text-[#E8E6E1]" />
                </span>
              )}
            </div>
            <span className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-md px-2 py-1 text-[10px] font-mono border border-white/10">
              {featured.id}
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featured.heroImage}
              alt={featured.title}
              className="w-full h-full object-cover opacity-90 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/50 via-transparent to-transparent" />
            
            {/* Indicador sutil de scroll lateral (solo mobile) */}
            <div 
              className={`md:hidden absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 transition-opacity duration-700 ${
                hasScrolled ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center animate-[swipe_1.5s_ease-in-out_infinite]">
                <ChevronRight className="w-5 h-5 text-purple-300" />
              </div>
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-col gap-2 pt-5">
            <div className="flex justify-between font-mono text-[10px] text-[#8A8881] tracking-wider border-b border-white/10 pb-2">
              <span>{featured.date}</span>
              <span>{featured.type}</span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl mt-2 text-[#E8E6E1] group-hover:text-white transition-colors duration-300 leading-tight">
              {featured.title}
            </h3>
            <p className="font-serif text-[#8A8881] leading-relaxed text-sm line-clamp-2 mt-1">
              {featured.shortDesc}
            </p>
            {featured.tags && (
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
                {featured.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] tracking-wide text-purple-300/60 border border-purple-500/20 px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Link>

        {/* ── DIVIDER ── */}
        <div className="shrink-0 w-px self-stretch bg-white/5 my-2" style={{ scrollSnapAlign: 'none' }} />

        {/* ── RESTO DE ARTÍCULOS ── */}
        {rest.map((paper) => (
          <Link
            key={paper.id}
            href={`/investigaciones/${paper.slug}`}
            className="shrink-0 w-[72vw] sm:w-[260px] md:w-[300px] flex flex-col group cursor-pointer"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#0f0f0f]">
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                <span className="bg-white/10 backdrop-blur-md px-2 py-1 text-[10px] font-mono border border-white/10">
                  {paper.id}
                </span>
                {paper.access === 'locked' && (
                  <span className="bg-white/10 backdrop-blur-md px-2 py-1 border border-white/10 flex items-center justify-center">
                    <Lock className="w-3 h-3 text-[#E8E6E1]" />
                  </span>
                )}
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={paper.heroImage}
                alt={paper.title}
                className="w-full h-full object-cover opacity-90 transition-all duration-700 ease-out group-hover:scale-105 carousel-img"
              />
            </div>
            <div className="flex flex-col gap-2 pt-5">
              <div className="flex justify-between font-mono text-[10px] text-[#8A8881] tracking-wider border-b border-white/10 pb-2">
                <span>{paper.date}</span>
                <span className={paper.access === 'locked' ? 'text-red-400/50' : ''}>{paper.type}</span>
              </div>
              <h3 className="font-serif text-xl mt-2 text-[#E8E6E1] group-hover:text-white transition-colors duration-300 leading-tight line-clamp-2">
                {paper.title}
              </h3>
              {paper.tags && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {paper.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] tracking-wide text-[#8A8881]/50 border border-white/5 group-hover:border-purple-500/20 group-hover:text-purple-300/60 px-2 py-0.5 transition-all duration-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}

        {/* ── CTA: Ver archivo completo ── */}
        <Link
          href="/investigaciones"
          className="shrink-0 w-48 self-stretch flex flex-col items-center justify-center gap-5 border border-white/5 hover:border-purple-500/30 transition-all duration-500 cursor-pointer group/end px-6"
          style={{ scrollSnapAlign: 'start' }}
        >
          <div className="w-10 h-10 rounded-full border border-white/10 group-hover/end:border-purple-500/30 flex items-center justify-center transition-colors duration-500">
            <ArrowRight className="w-4 h-4 text-[#8A8881] group-hover/end:text-purple-400 transition-colors duration-500" />
          </div>
          <p className="font-mono text-[9px] tracking-[0.2em] text-[#8A8881]/50 group-hover/end:text-[#8A8881] transition-colors text-center leading-loose uppercase">
            Ver Archivo<br />Completo
          </p>
        </Link>
      </div>

      {/* ── SWIPE HINT (solo mobile, desaparece al hacer scroll) ── */}
      <div
        className={`md:hidden flex items-center justify-center gap-2 mt-1 transition-all duration-500 ${
          hasScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <span className="font-mono text-[9px] tracking-widest text-[#8A8881]/40 uppercase">Desliza para explorar</span>
        <div className="flex items-center gap-0.5">
          <ChevronRight className="w-3 h-3 text-[#8A8881]/30 animate-[swipe_1.2s_ease-in-out_infinite]" />
          <ChevronRight className="w-3 h-3 text-[#8A8881]/20 animate-[swipe_1.2s_ease-in-out_infinite_0.15s]" />
        </div>
      </div>

      {/* ── ARROW BUTTONS (desktop) ── */}
      <button
        onClick={() => scroll('left')}
        aria-label="Anterior"
        className={`hidden md:flex absolute left-0 top-[38%] -translate-y-1/2 -translate-x-5 z-20 w-10 h-10 items-center justify-center border border-white/10 bg-[#050505]/90 backdrop-blur-sm hover:bg-[#050505] hover:border-purple-500/40 transition-all duration-300 ${
          canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ChevronLeft className="w-4 h-4 text-[#E8E6E1]" />
      </button>
      <button
        onClick={() => scroll('right')}
        aria-label="Siguiente"
        className={`hidden md:flex absolute right-0 top-[38%] -translate-y-1/2 translate-x-5 z-20 w-10 h-10 items-center justify-center border border-white/10 bg-[#050505]/90 backdrop-blur-sm hover:bg-[#050505] hover:border-purple-500/40 transition-all duration-300 ${
          canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ChevronRight className="w-4 h-4 text-[#E8E6E1]" />
      </button>

      {/* ── FADE RIGHT EDGE (visual cue) ── */}
      <div className="hidden md:block absolute right-0 top-0 bottom-8 w-24 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none z-10" />
    </div>
  )
}
