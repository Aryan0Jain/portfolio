'use client'

interface SectionLabelProps {
  num: string
  title: string
  accent: string
}

export function SectionLabel({ num, title, accent }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 font-mono text-[12px]">
      <span style={{ color: accent }}>{num}</span>
      <span className="text-white/40">{'/'+'/'}</span>
      <span className="text-white/70 uppercase tracking-[0.18em]">{title}</span>
      <span className="ml-2 h-px flex-1 max-w-[160px] bg-gradient-to-r from-white/15 to-transparent"></span>
    </div>
  )
}

interface TerminalCardProps {
  accent?: string
  className?: string
  children: React.ReactNode
  path?: string
}

export function TerminalCard({ className, children, path = '~/about' }: TerminalCardProps) {
  return (
    <div
      className={
        'relative rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-xl overflow-hidden ' +
        (className || '')
      }
      style={{ boxShadow: '0 1px 0 rgba(255,255,255,0.04) inset' }}
    >
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/8 bg-white/[0.02]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"></span>
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]"></span>
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]"></span>
        <span className="ml-3 font-mono text-[11px] text-white/40">aryan@portfolio: {path}</span>
      </div>
      <div className="p-6 md:p-7">{children}</div>
    </div>
  )
}

interface TerminalLineProps {
  prompt?: boolean
  accent?: string
  children: React.ReactNode
}

export function TerminalLine({ prompt, accent, children }: TerminalLineProps) {
  return (
    <div className="font-mono text-sm text-white/80 flex items-start gap-2">
      {prompt ? <span style={{ color: accent }}>{'>'}</span> : null}
      <span>{children}</span>
    </div>
  )
}
