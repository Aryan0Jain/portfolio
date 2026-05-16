// Skills grid — items belonging to active role glow, others dim
function Skills({ activeRole }) {
  const { ROLES, SKILL_CATEGORIES } = window.PORTFOLIO_DATA;
  const accent = ROLES[activeRole].accent;
  const ring = ROLES[activeRole].accentRing;

  return (
    <section id="skills" className="relative py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <window.SectionLabel num="02" title="Skills" accent={accent} />
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-white">
              The tools, sorted by which hat I'm wearing.
            </h2>
          </div>
          <div className="hidden md:block font-mono text-[11px] text-white/40 text-right">
            <div>active_role = <span style={{ color: accent }}>"{ROLES[activeRole].label}"</span></div>
            <div>filter = highlight_matching</div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              className="rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-xl p-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-[12px] uppercase tracking-[0.18em] text-white/55">
                  {cat.name}
                </h3>
                <span className="font-mono text-[10px] text-white/30">
                  {cat.items.filter((i) => i.roles.includes(activeRole)).length}/{cat.items.length}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.items.map((s) => {
                  const isActive = s.roles.includes(activeRole);
                  return (
                    <span
                      key={s.name}
                      className="group relative inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[12px] transition-all duration-300 cursor-default"
                      style={{
                        borderColor: isActive ? ring : "rgba(255,255,255,0.08)",
                        backgroundColor: isActive ? ROLES[activeRole].accentSoft : "rgba(255,255,255,0.02)",
                        color: isActive ? "#ffffff" : "rgba(255,255,255,0.32)",
                        boxShadow: isActive ? `0 0 14px ${accent}55` : "none",
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{
                          backgroundColor: isActive ? accent : "rgba(255,255,255,0.2)",
                          boxShadow: isActive ? `0 0 6px ${accent}` : "none",
                        }}
                      ></span>
                      {s.name}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Skills = Skills;
