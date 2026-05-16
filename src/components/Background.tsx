'use client'

import { useRef, useEffect } from 'react'

interface BackgroundProps {
  accent: string
}

export default function Background({ accent }: BackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      r: number
      a: number
    }
    let particles: Particle[] = []
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      if (!canvas || !ctx) return
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.scale(dpr, dpr)
      const count = Math.floor((window.innerWidth * window.innerHeight) / 28000)
      particles = new Array(count).fill(0).map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.2 + 0.3,
        a: Math.random() * 0.5 + 0.1,
      }))
    }
    resize()
    window.addEventListener('resize', resize)

    function tick() {
      if (!ctx) return
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      const grad = ctx.createRadialGradient(
        window.innerWidth * 0.85,
        window.innerHeight * 0.15,
        0,
        window.innerWidth * 0.85,
        window.innerHeight * 0.15,
        500
      )
      grad.addColorStop(0, accent + '22')
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      const grad2 = ctx.createRadialGradient(
        window.innerWidth * 0.1,
        window.innerHeight * 0.9,
        0,
        window.innerWidth * 0.1,
        window.innerHeight * 0.9,
        600
      )
      grad2.addColorStop(0, accent + '18')
      grad2.addColorStop(1, 'transparent')
      ctx.fillStyle = grad2
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = window.innerWidth
        if (p.x > window.innerWidth) p.x = 0
        if (p.y < 0) p.y = window.innerHeight
        if (p.y > window.innerHeight) p.y = 0
        ctx.beginPath()
        ctx.fillStyle = `rgba(220,220,235,${p.a})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [accent])

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-20"
        style={{
          backgroundColor: '#0a0a0a',
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />
      <canvas ref={canvasRef} className="fixed inset-0 -z-10" aria-hidden="true" />
    </>
  )
}
