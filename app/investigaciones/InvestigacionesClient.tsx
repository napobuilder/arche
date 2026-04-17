'use client'

import { useState, useMemo } from 'react'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import PaperCard from '@/components/PaperCard'
import { investigations, getAllTags } from '@/data/investigations'

const ALL_TAGS = getAllTags()

export default function InvestigacionesClient() {
  const [query, setQuery] = useState('')
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set())

  const toggleTag = (tag: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev)
      if (next.has(tag)) next.delete(tag)
      else next.add(tag)
      return next
    })
  }

  const clearAll = () => {
    setQuery('')
    setActiveTags(new Set())
  }

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return investigations.filter((paper) => {
      const matchesQuery =
        !q ||
        paper.title.toLowerCase().includes(q) ||
        paper.shortDesc.toLowerCase().includes(q) ||
        paper.tags.some((t) => t.toLowerCase().includes(q)) ||
        paper.type.toLowerCase().includes(q)

      const matchesTags =
        activeTags.size === 0 ||
        paper.tags.some((t) => activeTags.has(t))

      return matchesQuery && matchesTags
    })
  }, [query, activeTags])

  const hasFilters = query.length > 0 || activeTags.size > 0

  return (
    <main className="relative min-h-screen bg-[#050505] pt-40 pb-32 px-8 md:px-24">

      {/* ── HEADER ── */}
      <div className="mb-16">
        <div className="font-mono text-xs text-[#8A8881] mb-6 flex items-center gap-4">
          <span className="w-8 h-[1px] bg-[#8A8881]" />
          <span>INSTITUTO ARCHÉ</span>
        </div>
        <h1 className="font-serif text-5xl md:text-7xl font-light leading-tight text-[#E8E6E1]">
          Archivo <br />
          <span className="text-[#8A8881] italic">Completo</span>
        </h1>
        <p className="font-mono text-xs text-[#8A8881] max-w-md mt-6 leading-relaxed">
          PUBLICACIONES, ENSAYOS Y REGISTROS DE LABORATORIO SOBRE LA INTERSECCIÓN ENTRE LA NEUROCIENCIA, EL ESOTERISMO Y LOS FENÓMENOS ATÍPICOS.
        </p>
      </div>

      {/* ── BARRA DE BÚSQUEDA ── */}
      <div className="mb-6">
        <div className="relative group">
          {/* Glow de fondo */}
          <div className="absolute -inset-px bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur-sm" />
          <div className="relative flex items-center gap-3 bg-[#0a0a0a] border border-white/10 group-focus-within:border-purple-500/40 transition-all duration-300 px-5 py-4">
            <Search className="w-4 h-4 text-[#8A8881] shrink-0" />
            <input
              id="search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por tema, título o etiqueta…"
              className="flex-1 bg-transparent font-mono text-xs tracking-wide text-[#E8E6E1] placeholder-[#8A8881]/50 outline-none"
              autoComplete="off"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-[#8A8881] hover:text-[#E8E6E1] transition-colors"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <div className="w-px h-4 bg-white/10" />
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#8A8881]/50" />
            <span className="font-mono text-[9px] tracking-widest text-[#8A8881]/50 hidden sm:block">
              {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* ── ETIQUETAS / FILTROS ── */}
      <div className="mb-12 flex flex-wrap items-center gap-2">
        {ALL_TAGS.map((tag) => {
          const active = activeTags.has(tag)
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`font-mono text-[10px] tracking-widest px-3 py-1.5 border transition-all duration-300 ${
                active
                  ? 'border-purple-500/60 text-purple-300 bg-purple-500/10 shadow-[0_0_12px_rgba(139,92,246,0.15)]'
                  : 'border-white/10 text-[#8A8881] hover:border-white/30 hover:text-[#E8E6E1]'
              }`}
            >
              {tag}
            </button>
          )
        })}

        {hasFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-[#8A8881]/60 hover:text-red-400/70 border border-white/5 hover:border-red-500/20 px-3 py-1.5 transition-all duration-300 ml-2"
          >
            <X className="w-3 h-3" />
            Limpiar
          </button>
        )}
      </div>

      {/* ── RESULTADOS ── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <Search className="w-8 h-8 text-[#8A8881]/20 mb-6" />
          <p className="font-serif text-2xl text-[#8A8881]/50 italic mb-3">Sin resultados</p>
          <p className="font-mono text-[10px] tracking-widest text-[#8A8881]/30 max-w-xs">
            NINGUNA INVESTIGACIÓN COINCIDE CON &ldquo;{query.toUpperCase()}&rdquo;
          </p>
          <button
            onClick={clearAll}
            className="mt-8 font-mono text-[10px] tracking-widest text-[#8A8881] hover:text-[#E8E6E1] border border-white/10 hover:border-white/30 px-6 py-3 transition-all duration-300"
          >
            VER TODO
          </button>
        </div>
      )}
    </main>
  )
}
