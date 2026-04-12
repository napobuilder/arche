'use client'

import { useEffect, useRef } from 'react'

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    resize()

    const mouse = { x: null as number | null, y: null as number | null, radius: 150 }
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.x
      mouse.y = e.y
    }
    window.addEventListener('mousemove', handleMouseMove)

    class Particle {
      x: number; y: number; dx: number; dy: number
      size: number; baseX: number; baseY: number; density: number

      constructor(x: number, y: number, dx: number, dy: number, size: number) {
        this.x = x; this.y = y; this.dx = dx; this.dy = dy
        this.size = size; this.baseX = x; this.baseY = y
        this.density = (Math.random() * 30) + 1
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fillStyle = 'rgba(232, 230, 225, 0.3)'
        ctx.fill()
      }

      update() {
        this.x += this.dx
        this.y += this.dy
        if (this.x > canvas!.width || this.x < 0) this.dx = -this.dx
        if (this.y > canvas!.height || this.y < 0) this.dy = -this.dy

        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const forceDirectionX = dx / distance
          const forceDirectionY = dy / distance
          const force = (mouse.radius - distance) / mouse.radius
          const directionX = forceDirectionX * force * this.density
          const directionY = forceDirectionY * force * this.density

          if (distance < mouse.radius) {
            this.x -= directionX
            this.y -= directionY
          } else {
            if (this.x !== this.baseX) this.x -= (this.x - this.baseX) / 50
            if (this.y !== this.baseY) this.y -= (this.y - this.baseY) / 50
          }
        }
        this.draw()
      }
    }

    const init = () => {
      particles = []
      const count = (canvas.width * canvas.height) / 12000
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 1.5 + 0.5
        const x = Math.random() * (window.innerWidth - size * 4) + size * 2
        const y = Math.random() * (window.innerHeight - size * 4) + size * 2
        const dx = (Math.random() - 0.5) * 0.5
        const dy = (Math.random() - 0.5) * 0.5
        particles.push(new Particle(x, y, dx, dy, size))
      }
    }

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dist =
            (particles[a].x - particles[b].x) ** 2 +
            (particles[a].y - particles[b].y) ** 2
          if (dist < (canvas.width / 10) * (canvas.height / 10)) {
            const opacity = (1 - dist / 20000) * 0.15
            ctx.strokeStyle = `rgba(232, 230, 225, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => p.update())
      connect()
    }

    init()
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-screen z-[2] opacity-80 pointer-events-none mix-blend-screen"
    />
  )
}
