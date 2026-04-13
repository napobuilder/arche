'use client'

import React, { createContext, useContext, useState, useEffect, useRef } from 'react'

interface SoundscapeContextType {
  audioEnabled: boolean
  toggleAudio: () => void
}

const SoundscapeContext = createContext<SoundscapeContextType | undefined>(undefined)

export function SoundscapeProvider({ children }: { children: React.ReactNode }) {
  const [audioEnabled, setAudioEnabled] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Aquí puedes poner la ruta a tu archivo local en public/, por ejemplo '/ambient.mp3'
    // Mientras tanto usamos un dron ambiental de dominio público como placeholder.
    audioRef.current = new Audio('/soundscape.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.25 // 25% de volumen para que sea ambiental y no ensordecedor

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      if (audioEnabled) {
        audioRef.current.play().catch(err => {
          console.error("No se pudo reproducir el soundscape:", err)
          setAudioEnabled(false) // Si el navegador bloquea, apagamos el estado
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [audioEnabled])

  const toggleAudio = () => {
    setAudioEnabled(prev => !prev)
  }

  return (
    <SoundscapeContext.Provider value={{ audioEnabled, toggleAudio }}>
      {children}
    </SoundscapeContext.Provider>
  )
}

export function useSoundscape() {
  const context = useContext(SoundscapeContext)
  if (context === undefined) {
    throw new Error('useSoundscape debe ser usado dentro de un SoundscapeProvider')
  }
  return context
}
