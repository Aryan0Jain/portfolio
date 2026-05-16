'use client'

import { useState, useEffect } from 'react'
import { ROLES, type RoleKey } from '@/lib/data'
import Background from './Background'
import Navbar from './Navbar'
import BuildStatusBar from './BuildStatusBar'
import Hero from './Hero'
import About from './About'
import Skills from './Skills'
import Projects from './Projects'
import Experience from './Experience'
import Learning from './Learning'
import Contact from './Contact'
import FadeIn from './FadeIn'

export default function App() {
  const [activeRole, setActiveRole] = useState<RoleKey>('backend')
  const accent = ROLES[activeRole].accent

  useEffect(() => {
    const styleId = '__role-selection-style'
    let s = document.getElementById(styleId) as HTMLStyleElement | null
    if (!s) {
      s = document.createElement('style')
      s.id = styleId
      document.head.appendChild(s)
    }
    s.textContent = `::selection { background: ${accent}55; color: #fff; }`
  }, [accent])

  return (
    <div id="top" className="min-h-screen relative">
      <Background accent={accent} />
      <Navbar activeRole={activeRole} setActiveRole={setActiveRole} />
      <BuildStatusBar activeRole={activeRole} />

      <main>
        <Hero activeRole={activeRole} setActiveRole={setActiveRole} />
        <FadeIn>
          <About activeRole={activeRole} />
        </FadeIn>
        <FadeIn>
          <Skills activeRole={activeRole} />
        </FadeIn>
        <FadeIn>
          <Projects activeRole={activeRole} />
        </FadeIn>
        <FadeIn>
          <Experience activeRole={activeRole} />
        </FadeIn>
        <FadeIn>
          <Learning activeRole={activeRole} />
        </FadeIn>
        <FadeIn>
          <Contact activeRole={activeRole} />
        </FadeIn>
      </main>

      {/* Floating role indicator */}
      <div
        className="fixed bottom-5 right-5 z-30 hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-black/60 backdrop-blur px-3 py-1.5 font-mono text-[11px] text-white/55"
        style={{ boxShadow: `0 0 22px ${accent}33` }}
      >
        {ROLES[activeRole].status === 'building' ? (
          <span className="relative h-2 w-2 inline-block">
            <span
              className="absolute inset-0 rounded-full border border-transparent"
              style={{
                borderTopColor: accent,
                borderRightColor: accent,
                animation: 'spin 1.1s linear infinite',
              }}
            ></span>
          </span>
        ) : (
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}` }}
          ></span>
        )}
        Role.Switch() →{' '}
        <span className="text-white/90">{ROLES[activeRole].label}</span>
        <span className="text-white/30">·</span>
        <span style={{ color: accent }}>
          {ROLES[activeRole].status === 'shipped' ? 'stable' : 'building'}
        </span>
      </div>
    </div>
  )
}

