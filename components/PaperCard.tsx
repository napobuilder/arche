'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { Lock } from 'lucide-react'
import { Investigation } from '@/data/investigations'

interface PaperCardProps {
  paper: Investigation
  featured?: boolean
}

export default function PaperCard({ paper, featured = false }: PaperCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [inView, setInView] = useState(featured) // featured starts revealed
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  // Detectar dispositivos táctiles (sin hover nativo)
  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(hover: none)').matches)
  }, [])

  // IntersectionObserver: revela la tarjeta al entrar al viewport
  useEffect(() => {
    if (featured) return // featured siempre visible

    const el = cardRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [featured])

  // Lógica de clases de imagen:
  // - featured: siempre nítida/color, ligero scale en hover
  // - mobile (no hover): blur/grayscale → se revela parcialmente al entrar al viewport
  // - desktop: blur/grayscale → se revela completamente en hover
  // - prefers-reduced-motion: sin blur ni grayscale
  const imgClass = (() => {
    const base = 'w-full h-full object-cover transition-all ease-out group-hover:scale-105 motion-reduce:opacity-100 motion-reduce:blur-none motion-reduce:grayscale-0'

    if (featured) {
      return `${base} opacity-90 duration-700 group-hover:opacity-100`
    }

    if (isTouchDevice) {
      // Mobile: siempre a color, sin blur ni grayscale
      return `${base} opacity-90 duration-700`
    }

    // Desktop: efecto completo en hover
    return `${base} opacity-40 blur-md grayscale duration-700 group-hover:opacity-100 group-hover:blur-none group-hover:grayscale-0`
  })()

  return (
    <Link ref={cardRef} href={`/investigaciones/${paper.slug}`} className="group cursor-pointer flex flex-col gap-6">
      {/* Imagen */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#0f0f0f] rounded-sm">
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          {featured && (
            <span className="flex items-center gap-1.5 bg-purple-500/20 backdrop-blur-md px-3 py-1.5 text-[9px] font-mono tracking-widest text-purple-300 border border-purple-500/40">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              NUEVA
            </span>
          )}
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
          className={imgClass}
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
        <h3 className="font-serif text-2xl mt-2 text-[#E8E6E1] group-hover:text-white transition-colors duration-300">
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
