'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Unlock, ExternalLink, Loader2, Key } from 'lucide-react'

interface PaywallProps {
  checkoutUrl: string
  slug: string
}

export default function Paywall({ checkoutUrl, slug }: PaywallProps) {
  const router = useRouter()
  const [licenseKey, setLicenseKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!licenseKey.trim()) return

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/validate-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseKey: licenseKey.trim(), slug }),
      })

      const data = await res.json()

      if (data.success) {
        // La validación fue exitosa y la cookie segura ya está plantada.
        // Solo necesitamos recargar la ruta para que Next.js detecte la cookie y envíe el artículo entero.
        router.refresh()
      } else {
        setError(data.error || 'La clave ingresada es incorrecta o está vencida.')
      }
    } catch (err) {
      setError('Error de conexión al validar la clave.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative mt-12 pt-16 clear-both">
      {/* Gradiente desvanecido para ocultar el texto falso o la transición */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-[#050505]/90 to-[#050505] pointer-events-none -translate-y-full" />
      
      <div className="relative z-10 border border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md p-8 md:p-12 flex flex-col items-center text-center shadow-[0_0_50px_rgba(139,92,246,0.03)] rounded-sm">
        <Unlock className="w-8 h-8 text-purple-400/50 mb-6" />
        <h3 className="font-serif text-3xl mb-4 text-[#E8E6E1] mt-0">Archivo Premium</h3>
        <p className="font-mono text-[10px] text-[#8A8881] tracking-widest leading-loose mb-8 max-w-sm">
          EL ESTUDIO COMPLETO ESTÁ OCULTO PARA INVESTIGADORES NO VERIFICADOS.
        </p>

        {/* Botón de compra (Abre LemonSqueezy) */}
        <div className="flex flex-col gap-4 w-full sm:w-auto mb-12">
          <a 
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-[#E8E6E1] text-[#050505] font-mono text-[10px] tracking-widest px-12 py-4 hover:bg-white transition-all duration-300"
          >
            DESBLOQUEAR — $4.99 <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Formulario para meter la License Key */}
        <div className="w-full max-w-md pt-8 border-t border-white/5">
          <p className="font-serif text-[#8A8881] italic mb-4">¿Ya tienes tu Clave de Acceso?</p>
          <form onSubmit={handleValidate} className="flex flex-col gap-3">
            <div className="relative">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8881]" />
              <input
                type="text"
                placeholder="Pega tu License Key aquí"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 text-[#E8E6E1] font-mono text-xs p-4 pl-12 rounded-sm focus:outline-none focus:border-purple-500/50"
              />
            </div>
            {error && <p className="text-red-400/80 font-mono text-[10px] text-left">{error}</p>}
            <button
              type="submit"
              disabled={loading || !licenseKey.trim()}
              className="text-[#8A8881] hover:text-white disabled:opacity-50 disabled:hover:text-[#8A8881] font-mono text-[10px] tracking-widest px-12 py-4 transition-colors border border-white/5 hover:border-white/20 flex items-center justify-center"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'VALIDAR CLAVE'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
