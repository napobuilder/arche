'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { investigations } from '@/data/investigations'

// Componentes solo-cliente
const ParticleCanvas = dynamic(() => import('@/components/ParticleCanvas'), { ssr: false })
const HorizontalCarousel = dynamic(() => import('@/components/HorizontalCarousel'), { ssr: false })

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative w-full min-h-screen">

      {/* ── HERO ── */}
      <header
        className="fixed top-0 left-0 z-0 w-full h-[100svh] flex flex-col overflow-hidden group"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
          e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
        }}
      >
        {/* Spotlight amatista */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-700 group-hover:opacity-100 mix-blend-screen"
          style={{
            background:
              'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139, 92, 246, 0.12), rgba(76, 29, 149, 0.05) 25%, transparent 45%)',
          }}
        />

        <ParticleCanvas />

        <div className="relative z-10 flex flex-col h-full w-full px-8 md:px-24 pt-28 pb-8">

          {/* Bloque central */}
          <div
            className="flex-1 flex flex-col justify-center pointer-events-none max-w-4xl"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              opacity: 1 - scrollY / 600,
            }}
          >
            <div className="font-mono text-xs text-[#8A8881] mb-4 md:mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#8A8881]" />
              <span>INSTITUTO DE INVESTIGACIÓN</span>
            </div>

            <h1 className="font-serif text-5xl md:text-7xl xl:text-8xl leading-[1.05] mb-6 font-light shrink-0">
              <div className="reveal-wrapper">
                <span className="reveal-text delay-1">Explorando la</span>
              </div>
              <br />
              <div className="reveal-wrapper">
                <span className="reveal-text delay-2 text-[#8A8881] italic pr-4">
                  arquitectura{' '}
                  <span
                    className={`transition-colors duration-500 pointer-events-auto cursor-crosshair ${
                      isRevealed ? 'text-[#E8E6E1]' : 'text-[#8A8881]'
                    }`}
                    onMouseEnter={() => setIsRevealed(true)}
                    onMouseLeave={() => setIsRevealed(false)}
                  >
                    oculta
                  </span>
                </span>
              </div>
              <br />
              <div className="reveal-wrapper">
                <span className="reveal-text delay-3">de la consciencia.</span>
              </div>
            </h1>

            {/* Párrafo interactivo */}
            <div
              className="mt-2 md:mt-4 reveal-wrapper pointer-events-auto shrink-0"
              onMouseEnter={() => setIsRevealed(true)}
              onMouseLeave={() => setIsRevealed(false)}
            >
              <div className="relative cursor-default w-fit">
                <p
                  className={`relative font-serif text-base md:text-lg text-[#8A8881] max-w-md leading-relaxed transition-all duration-500 reveal-text delay-3 ${
                    isRevealed ? 'opacity-0 blur-sm' : 'opacity-100 blur-0'
                  }`}
                >
                  Un puente riguroso entre la investigación de vanguardia y el misterio humano.
                </p>
                <div
                  className={`absolute inset-0 flex items-center justify-start transition-all duration-500 pointer-events-none ${
                    isRevealed ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
                  }`}
                >
                  <p className="font-mono text-[10px] md:text-xs text-[#E8E6E1] tracking-widest uppercase border-l border-purple-500/50 pl-4 py-1 leading-relaxed max-w-sm">
                    Un refugio diseñado para mantener viva tu curiosidad.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Flecha scroll */}
          <div className="w-full flex justify-center shrink-0 pointer-events-auto z-20">
            <button
              onClick={() => document.getElementById('archivo')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex flex-col items-center gap-2 opacity-50 cursor-pointer hover:opacity-100 transition-all duration-500 hover:-translate-y-2 bg-transparent border-0"
            >
              <span className="font-mono text-[10px] tracking-widest text-[#E8E6E1]">DESCUBRIR</span>
              <div className="w-[1px] h-10 md:h-12 bg-gradient-to-b from-white/50 to-transparent" />
            </button>
          </div>
        </div>
      </header>

      {/* ── ARCHIVO ── */}
      <section
        id="archivo"
        className="relative z-20 w-full mt-[100svh] bg-[#050505] px-8 md:px-24 py-32 border-t border-white/10 shadow-[0_-30px_80px_rgba(0,0,0,1)]"
      >
        {/* Header de sección */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="font-mono text-xs text-[#8A8881] mb-4 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#8A8881]" />
              <span>ARCHIVO ABIERTO</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-[#E8E6E1]">
              Investigaciones <br />
              <span className="text-[#8A8881] italic">Recientes</span>
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="font-mono text-xs max-w-xs text-[#8A8881] md:text-right">
              PUBLICACIONES, ENSAYOS Y REGISTROS DE LABORATORIO SOBRE LA INTERSECCIÓN ENTRE LA NEUROCIENCIA Y EL MISTICISMO.
            </p>
            <Link
              href="/investigaciones"
              className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#8A8881] hover:text-[#E8E6E1] border border-white/10 hover:border-purple-500/40 px-5 py-2.5 transition-all duration-300 group/link"
            >
              VER TODO EL ARCHIVO
              <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* Carrusel horizontal */}
        <HorizontalCarousel papers={investigations} />
      </section>
    </div>
  )
}
