'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Hexagon, Volume2, VolumeX, Menu } from 'lucide-react'
import { useSoundscape } from '@/components/SoundscapeProvider'

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0)
  const { audioEnabled, toggleAudio } = useSoundscape()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrolled = scrollY > 50

  return (
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

      {/* Nav Links */}
      <div className="hidden md:flex gap-8 font-mono text-xs tracking-widest text-[#8A8881]">
        <Link href="/investigaciones" className="hover:text-[#E8E6E1] transition-colors">ARCHIVO</Link>
        <Link href="/manifiesto" className="hover:text-[#E8E6E1] transition-colors">MANIFIESTO</Link>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <button
          onClick={toggleAudio}
          className="flex items-center gap-2 font-mono text-[10px] text-[#8A8881] hover:text-[#E8E6E1] transition-colors"
        >
          {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          <span className="hidden sm:block">SOUNDSCAPE {audioEnabled ? 'ON' : 'OFF'}</span>
        </button>
        <button className="p-2 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
          <Menu className="w-4 h-4 text-[#E8E6E1]" />
        </button>
      </div>
    </nav>
  )
}
