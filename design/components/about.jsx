// About section — terminal card
function About({ activeRole }) {
  const { ROLES } = window.PORTFOLIO_DATA;
  const accent = ROLES[activeRole].accent;

  return (
    <section id="about" className="relative py-16">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel num="01" title="About" accent={accent} />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <TerminalCard accent={accent} className="lg:col-span-8">
            <TerminalLine prompt accent={accent}>whoami</TerminalLine>
            <div className="mt-3 text-white/85 text-lg md:text-xl leading-relaxed font-mono">
              <span style={{ color: accent }}>Aryan Jain</span> — backend-first engineer
              who doesn't stop at the backend.
            </div>
            <div className="mt-3 text-white/60 text-base leading-relaxed">
              Comfortable owning the full slice:
              <span className="text-white/90"> API design → data layer → infra → deployment.</span>
              {" "}Currently targeting Senior Backend / AI Backend roles at product companies
              that take latency, correctness, and developer ergonomics seriously.
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
              {[
                ["location", "Bangalore, IN"],
                ["timezone", "IST · UTC+5:30"],
                ["status", "Open to work"],
                ["since", "2024 → now"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
                  <div className="text-white/40">{k}</div>
                  <div className="text-white/80 mt-0.5">{v}</div>
                </div>
              ))}
            </div>
          </TerminalCard>

          <div className="lg:col-span-4 grid grid-rows-2 gap-6">
            <GlassStat
              accent={accent}
              kicker="Currently"
              big="Senior Backend"
              sub="@ Xarterian, building a high-traffic gateway, auctions, and a player-similarity engine."
            />
            <GlassStat
              accent={accent}
              kicker="Transitioning to"
              big="AI Backend"
              sub="Embeddings, vector search, function calling — the unglamorous wiring around models."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ num, title, accent }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[12px]">
      <span style={{ color: accent }}>{num}</span>
      <span className="text-white/40">//</span>
      <span className="text-white/70 uppercase tracking-[0.18em]">{title}</span>
      <span className="ml-2 h-px flex-1 max-w-[160px] bg-gradient-to-r from-white/15 to-transparent"></span>
    </div>
  );
}

function TerminalCard({ accent, className, children }) {
  return (
    <div
      className={"relative rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-xl overflow-hidden " + (className || "")}
      style={{ boxShadow: `0 1px 0 rgba(255,255,255,0.04) inset` }}
    >
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/8 bg-white/[0.02]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"></span>
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]"></span>
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]"></span>
        <span className="ml-3 font-mono text-[11px] text-white/40">
          aryan@portfolio: ~/about
        </span>
      </div>
      <div className="p-6 md:p-7">{children}</div>
    </div>
  );
}

function TerminalLine({ prompt, accent, children }) {
  return (
    <div className="font-mono text-sm text-white/80 flex items-start gap-2">
      {prompt ? <span style={{ color: accent }}>{">"}</span> : null}
      <span>{children}</span>
    </div>
  );
}

function GlassStat({ accent, kicker, big, sub }) {
  return (
    <div
      className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 transition-all hover:-translate-y-0.5"
    >
      <div className="font-mono text-[11px] uppercase tracking-wider text-white/45">{kicker}</div>
      <div className="mt-1 text-2xl font-medium text-white" style={{ color: accent, transition: "color 300ms" }}>{big}</div>
      <div className="mt-2 text-sm text-white/60 leading-relaxed">{sub}</div>
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ boxShadow: `0 0 0 1px ${accent}55, 0 14px 50px -20px ${accent}` }}
      ></div>
    </div>
  );
}

window.About = About;
window.SectionLabel = SectionLabel;
window.TerminalCard = TerminalCard;
window.TerminalLine = TerminalLine;
