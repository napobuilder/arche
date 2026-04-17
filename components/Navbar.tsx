'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Hexagon, Volume2, VolumeX, Menu, X, ArrowUpRight, Lock } from 'lucide-react'
import { useSoundscape } from '@/components/SoundscapeProvider'
import { investigations } from '@/data/investigations'

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { audioEnabled, toggleAudio } = useSoundscape()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cerrar drawer con Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // Bloquear scroll del body cuando el drawer está abierto
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  // Cerrar drawer al cambiar de ruta
  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  const scrolled = scrollY > 50

  const navLinks = [
    { href: '/', label: 'INICIO' },
    { href: '/investigaciones', label: 'ARCHIVO' },
    { href: '/manifiesto', label: 'MANIFIESTO' },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full px-8 py-6 flex justify-between items-center z-50 transition-all duration-700 
          ${scrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent'}`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 flex items-center justify-center border border-[#E8E6E1]/30 rounded-sm group-hover:border-[#E8E6E1] transition-colors">
            <Hexagon className="w-4 h-4 text-[#E8E6E1]" strokeWidth={1.5} />
          </div>
          <span className="font-serif tracking-widest text-xl uppercase text-[#E8E6E1]">Archē</span>
        </Link>

        {/* Nav Links (desktop) */}
        <div className="hidden md:flex gap-8 font-mono text-xs tracking-widest text-[#8A8881]">
          <Link href="/investigaciones" className="hover:text-[#E8E6E1] transition-colors">ARCHIVO</Link>
          <Link href="/manifiesto" className="hover:text-[#E8E6E1] transition-colors">MANIFIESTO</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleAudio}
            className="flex items-center gap-2 font-mono text-[10px] text-[#8A8881] hover:text-[#E8E6E1] transition-colors"
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:block">SOUNDSCAPE {audioEnabled ? 'ON' : 'OFF'}</span>
          </button>
          <button
            id="nav-menu-btn"
            onClick={() => setDrawerOpen(true)}
            className="p-2 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            aria-label="Abrir menú"
          >
            <Menu className="w-4 h-4 text-[#E8E6E1]" />
          </button>
        </div>
      </nav>

      {/* ── OVERLAY ── */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-all duration-500 ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* ── DRAWER ── */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] z-[70] flex flex-col bg-[#080808]/95 backdrop-blur-xl border-l border-white/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Menú de navegación"
      >
        {/* Header del drawer */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Hexagon className="w-4 h-4 text-purple-400/60" strokeWidth={1.5} />
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#8A8881] uppercase">Instituto Arché</span>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            aria-label="Cerrar menú"
          >
            <X className="w-4 h-4 text-[#E8E6E1]" />
          </button>
        </div>

        {/* Contenido scrollable */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-10">

          {/* Navegación principal */}
          <nav>
            <p className="font-mono text-[9px] tracking-[0.3em] text-[#8A8881]/50 uppercase mb-4">Navegación</p>
            <ul className="space-y-1">
              {navLinks.map(({ href, label }) => {
                const active = pathname === href
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`flex items-center justify-between group py-3 border-b border-white/5 transition-all duration-300 ${
                        active ? 'text-[#E8E6E1]' : 'text-[#8A8881] hover:text-[#E8E6E1]'
                      }`}
                    >
                      <span className="font-mono text-xs tracking-widest">{label}</span>
                      <ArrowUpRight
                        className={`w-3 h-3 transition-all duration-300 ${
                          active ? 'opacity-100 text-purple-400' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                        }`}
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Separador */}
          <div className="w-full h-[1px] bg-white/5" />

          {/* Investigaciones */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.3em] text-[#8A8881]/50 uppercase mb-4">Investigaciones Recientes</p>
            <ul className="space-y-4">
              {investigations.map((paper) => (
                <li key={paper.id}>
                  <Link
                    href={`/investigaciones/${paper.slug}`}
                    className="flex items-start justify-between gap-4 group py-3 border-b border-white/5 hover:border-purple-500/20 transition-all duration-300"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-mono text-[9px] tracking-widest text-purple-400/60 uppercase">{paper.type}</span>
                        {paper.access === 'locked' && (
                          <Lock className="w-2.5 h-2.5 text-[#8A8881]/50" />
                        )}
                      </div>
                      <p className="font-serif text-sm text-[#8A8881] group-hover:text-[#E8E6E1] transition-colors duration-300 leading-snug line-clamp-2">
                        {paper.title}
                      </p>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {paper.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[8px] tracking-wide text-[#8A8881]/50 border border-white/5 px-1.5 py-0.5 rounded-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#8A8881]/30 group-hover:text-purple-400 shrink-0 mt-1 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Soundscape control */}
          <div className="w-full h-[1px] bg-white/5" />
          <div>
            <p className="font-mono text-[9px] tracking-[0.3em] text-[#8A8881]/50 uppercase mb-4">Ambiente Sonoro</p>
            <button
              onClick={toggleAudio}
              className="w-full flex items-center justify-between py-3 px-4 border border-white/10 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300 group rounded-sm"
            >
              <div className="flex items-center gap-3">
                {audioEnabled
                  ? <Volume2 className="w-4 h-4 text-purple-400" />
                  : <VolumeX className="w-4 h-4 text-[#8A8881]" />
                }
                <span className="font-mono text-[10px] tracking-widest text-[#8A8881] group-hover:text-[#E8E6E1] transition-colors">
                  SOUNDSCAPE
                </span>
              </div>
              <span className={`font-mono text-[9px] tracking-widest px-2 py-0.5 border rounded-sm transition-all duration-300 ${
                audioEnabled
                  ? 'border-purple-500/40 text-purple-400 bg-purple-500/10'
                  : 'border-white/10 text-[#8A8881]'
              }`}>
                {audioEnabled ? 'ACTIVO' : 'INACTIVO'}
              </span>
            </button>
          </div>
        </div>

        {/* Footer del drawer */}
        <div className="px-8 py-6 border-t border-white/5">
          <p className="font-mono text-[9px] text-[#8A8881]/40 tracking-widest leading-relaxed">
            INSTITUTO ARCHÉ — EXPLORANDO LA ARQUITECTURA OCULTA DE LA CONSCIENCIA
          </p>
        </div>
      </aside>
    </>
  )
}
