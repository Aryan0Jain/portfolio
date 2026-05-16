'use client'

import { useRef, useState, useEffect } from 'react'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
}

export default function FadeIn({ children, delay = 0 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setShown(true), delay)
            obs.disconnect()
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 700ms ease, transform 700ms cubic-bezier(0.2, 0.7, 0.3, 1)',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
