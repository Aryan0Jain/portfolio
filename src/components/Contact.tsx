'use client'

import { useState, useEffect, useRef } from 'react'
import { ROLES, type RoleKey } from '@/lib/data'
import { SectionLabel, TerminalCard, TerminalLine } from './shared'
import { ArrowIcon, MailIcon } from './icons'

interface ContactProps {
  activeRole: RoleKey
}

export default function Contact({ activeRole }: ContactProps) {
  const accent = ROLES[activeRole].accent
  const [typed, setTyped] = useState('')
  const fullCmd = 'send_message --to aryan --subject hire'

  const ref = useRef<HTMLElement>(null)
  const playedRef = useRef(false)

  useEffect(() => {
    playedRef.current = false
    setTyped('')
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !playedRef.current) {
            playedRef.current = true
            let i = 0
            const id = setInterval(() => {
              i++
              setTyped(fullCmd.slice(0, i))
              if (i >= fullCmd.length) clearInterval(id)
            }, 40)
          }
        })
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="contact" ref={ref} className="relative py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel num="06" title="Contact" accent={accent} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <TerminalCard accent={accent} className="lg:col-span-7" path="~/contact">
            <TerminalLine prompt accent={accent}>
              <span className="text-white/80">{typed}</span>
              <span
                className="ml-0.5 inline-block h-4 w-2 align-middle"
                style={{ backgroundColor: accent, animation: 'blink 1s steps(2) infinite' }}
              ></span>
            </TerminalLine>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[13px]">
              <ContactRow
                accent={accent}
                k="email"
                v="aryan.jain@example.com"
                href="mailto:aryan.jain@example.com"
              />
              <ContactRow accent={accent} k="github" v="github.com/aryanjain" href="https://github.com/" />
              <ContactRow
                accent={accent}
                k="linkedin"
                v="linkedin.com/in/aryanjain"
                href="https://linkedin.com/"
              />
              <ContactRow accent={accent} k="resume" v="resume.pdf" href="#" />
            </div>

            <div className="mt-7">
              <a
                href="mailto:aryan.jain@example.com"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium text-black transition-all hover:-translate-y-0.5"
                style={{
                  backgroundColor: accent,
                  boxShadow: `0 16px 50px -14px ${accent}aa, 0 0 0 1px ${accent}`,
                }}
              >
                <MailIcon /> Say hello
              </a>
            </div>
          </TerminalCard>

          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-xl p-6 flex flex-col">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
              looking for
            </div>
            <ul className="mt-3 space-y-2.5">
              {[
                'Senior Backend / AI Backend roles',
                'Product companies that take latency seriously',
                'Remote-first or Bangalore',
                'Teams that ship and measure',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-white/75">
                  <span
                    className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: accent, boxShadow: `0 0 6px ${accent}` }}
                  ></span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-6 font-mono text-[11px] text-white/35">
              ── EOF · thanks for reading
            </div>
          </div>
        </div>

        <footer className="mt-16 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-white/35 border-t border-white/8 pt-6">
          <div>© 2026 aryan.jain — built in Next.js + Tailwind</div>
          <div>
            uptime: <span className="text-white/60">99.9%</span> · last_deploy:{' '}
            <span className="text-white/60">just now</span>
          </div>
        </footer>
      </div>
    </section>
  )
}

function ContactRow({
  k,
  v,
  href,
  accent,
}: {
  k: string
  v: string
  href: string
  accent: string
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className="group flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5 hover:bg-white/[0.05] hover:border-white/20 transition-all"
    >
      <span className="text-white/40">{k}</span>
      <span className="text-white/85 group-hover:text-white truncate flex items-center gap-1.5">
        {v}
        <ArrowIcon style={{ color: accent }} />
      </span>
    </a>
  )
}
