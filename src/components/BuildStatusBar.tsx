'use client'

import { useState, useEffect } from 'react'
import { ROLES, type RoleKey } from '@/lib/data'

interface BuildStatusBarProps {
  activeRole: RoleKey
}

export default function BuildStatusBar({ activeRole }: BuildStatusBarProps) {
  const role = ROLES[activeRole]
  const building = role.status === 'building'

  const [logIdx, setLogIdx] = useState(0)
  const [typed, setTyped] = useState('')
  const [progressShown, setProgressShown] = useState(0)

  useEffect(() => {
    if (!building) return
    setLogIdx(0)
    setTyped('')
    setProgressShown(0)
    const id = setTimeout(() => setProgressShown(role.progress ?? 0), 80)
    return () => clearTimeout(id)
  }, [activeRole, building, role.progress])

  useEffect(() => {
    if (!building) return
    const log = role.buildLog ?? []
    if (!log.length) return
    const cur = log[logIdx % log.length]
    if (typed.length < cur.length) {
      const t = setTimeout(() => setTyped(cur.slice(0, typed.length + 1)), 22)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setLogIdx((i) => (i + 1) % log.length)
        setTyped('')
      }, 1400)
      return () => clearTimeout(t)
    }
  }, [typed, logIdx, building, activeRole, role.buildLog])

  if (!building) return null

  const accent = role.accent
  const log = role.buildLog ?? []
  const prev1 = log[(logIdx - 2 + log.length) % log.length]
  const prev2 = log[(logIdx - 1 + log.length) % log.length]
  const cur = log[logIdx % log.length]

  return (
    <div className="fixed top-[88px] md:top-[78px] inset-x-0 z-30 pointer-events-none">
      <div className="mx-auto max-w-7xl px-6">
        <div
          className="pointer-events-auto rounded-2xl border bg-black/55 backdrop-blur-xl overflow-hidden"
          style={{
            borderColor: accent + '55',
            boxShadow: `0 18px 60px -28px ${accent}, 0 0 0 1px ${accent}22`,
          }}
        >
          {/* Top strip */}
          <div className="flex items-center gap-3 px-4 py-2 border-b border-white/8">
            <span className="relative inline-flex h-2.5 w-2.5">
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundColor: accent,
                  animation: 'pulseRing 1.4s ease-in-out infinite',
                  boxShadow: `0 0 10px ${accent}`,
                }}
              ></span>
            </span>
            <span
              className="font-mono text-[11px] uppercase tracking-[0.18em]"
              style={{ color: accent }}
            >
              compiling
            </span>
            <span className="font-mono text-[11px] text-white/55 truncate">
              role: <span className="text-white/85">{role.label.toLowerCase()}</span>
              <span className="text-white/30 mx-1.5">·</span>
              {role.version}
              <span className="text-white/30 mx-1.5">·</span>
              eta: <span className="text-white/85">{role.eta}</span>
            </span>

            <div className="ml-auto flex items-center gap-2 min-w-[140px]">
              <div className="hidden sm:block h-1 flex-1 rounded-full overflow-hidden bg-white/8">
                <div
                  className="h-full transition-all duration-1000 ease-out relative"
                  style={{
                    width: `${progressShown}%`,
                    backgroundColor: accent,
                    boxShadow: `0 0 10px ${accent}`,
                  }}
                >
                  <span
                    className="absolute inset-0 opacity-50"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)',
                      backgroundSize: '60px 100%',
                      animation: 'shineMove 1.6s linear infinite',
                    }}
                  ></span>
                </div>
              </div>
              <span className="font-mono text-[11px]" style={{ color: accent }}>
                {progressShown}%
              </span>
            </div>
          </div>

          {/* Log lines */}
          <div className="px-4 py-2 font-mono text-[11px] leading-relaxed">
            <div className="text-white/25 truncate">$ {prev1}</div>
            <div className="text-white/50 truncate">$ {prev2}</div>
            <div className="text-white/85 truncate flex items-center gap-1">
              <span style={{ color: accent }}>$</span>
              <span>{typed}</span>
              <span
                className="inline-block h-3 w-1.5 align-middle"
                style={{ backgroundColor: accent, animation: 'blink 1s steps(2) infinite' }}
              ></span>
              <span className="opacity-0">{cur}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
