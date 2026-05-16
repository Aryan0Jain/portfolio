// Experience timeline
function Experience({ activeRole }) {
  const { ROLES, EXPERIENCE } = window.PORTFOLIO_DATA;
  const accent = ROLES[activeRole].accent;

  return (
    <section id="experience" className="relative py-20">
      <div className="mx-auto max-w-7xl px-6">
        <window.SectionLabel num="04" title="Experience" accent={accent} />
        <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-white">
          The receipts.
        </h2>

        <div className="mt-10 relative">
          {/* Vertical line */}
          <div
            className="absolute left-[15px] md:left-[19px] top-2 bottom-2 w-px"
            style={{
              background: `linear-gradient(to bottom, ${accent}88, ${accent}22 60%, transparent)`,
              transition: "background 300ms",
            }}
          ></div>

          <div className="space-y-10">
            {EXPERIENCE.map((e, i) => (
              <TimelineItem key={e.org} e={e} accent={accent} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ e, accent }) {
  return (
    <div className="relative pl-12 md:pl-16">
      {/* Node */}
      <div
        className="absolute left-0 top-1 grid place-items-center h-8 w-8 rounded-full border border-white/15 bg-black/60 backdrop-blur"
        style={{ boxShadow: `0 0 18px ${accent}55, inset 0 0 0 1px ${accent}33` }}
      >
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}` }}></span>
      </div>

      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-xl md:text-2xl font-semibold text-white">{e.org}</h3>
        <span className="font-mono text-[12px] text-white/45">{e.when}</span>
      </div>
      <div className="mt-0.5 text-white/65">{e.role}</div>

      <ul className="mt-4 space-y-2.5">
        {e.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2.5 text-white/70 leading-relaxed">
            <span
              className="mt-2 h-1 w-1 rounded-full shrink-0"
              style={{ backgroundColor: accent }}
            ></span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

window.Experience = Experience;
