// Projects — reorders so role-matching cards come first
function Projects({ activeRole }) {
  const { ROLES, PROJECTS } = window.PORTFOLIO_DATA;
  const accent = ROLES[activeRole].accent;

  // sort: projects matching active role first, then by tag-match count
  const sorted = React.useMemo(() => {
    const score = (p) => {
      let s = p.roles.includes(activeRole) ? 100 : 0;
      s += p.tags.filter((t) => t.roles.includes(activeRole)).length;
      return s;
    };
    return [...PROJECTS]
      .map((p, i) => ({ p, i, s: score(p) }))
      .sort((a, b) => b.s - a.s || a.i - b.i)
      .map((x) => x.p);
  }, [activeRole]);

  return (
    <section id="projects" className="relative py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <window.SectionLabel num="03" title="Selected work" accent={accent} />
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-white">
              Sorted for a <span style={{ color: accent, transition: "color 300ms" }}>{ROLES[activeRole].label}</span> hire.
            </h2>
          </div>
          <div className="hidden md:block font-mono text-[11px] text-white/40">
            $ ls projects/ --sort=relevance
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {sorted.map((p, idx) => (
            <ProjectCard key={p.id} p={p} activeRole={activeRole} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, activeRole, idx }) {
  const { ROLES } = window.PORTFOLIO_DATA;
  const accent = ROLES[activeRole].accent;
  const ring = ROLES[activeRole].accentRing;
  const matches = p.roles.includes(activeRole);
  const [hover, setHover] = React.useState(false);

  return (
    <article
      className="group relative rounded-2xl border bg-white/[0.025] backdrop-blur-xl overflow-hidden transition-all duration-300"
      style={{
        borderColor: matches ? ring : "rgba(255,255,255,0.08)",
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hover
          ? `0 22px 60px -22px ${accent}aa, 0 0 0 1px ${matches ? ring : "rgba(255,255,255,0.12)"}`
          : matches
          ? `0 0 0 0 transparent, 0 0 30px -10px ${accent}55`
          : "none",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Role badges (corner) */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10">
        {p.roles.map((r) => {
          const ra = ROLES[r];
          const isActive = r === activeRole;
          return (
            <span
              key={r}
              className="font-mono text-[10px] px-1.5 py-0.5 rounded-md transition-all"
              style={{
                color: isActive ? "#000" : ra.accent,
                backgroundColor: isActive ? ra.accent : "transparent",
                border: `1px solid ${isActive ? ra.accent : ra.accent + "55"}`,
                boxShadow: isActive ? `0 0 14px ${ra.accent}88` : "none",
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {ra.short}
            </span>
          );
        })}
      </div>

      <div className="p-6">
        {/* Impact badge */}
        <div
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px]"
          style={{
            backgroundColor: accent + "1a",
            color: accent,
            border: `1px solid ${accent}55`,
            transition: "all 300ms",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 6px ${accent}` }}></span>
          {p.impact}
        </div>

        <h3 className="mt-4 text-xl md:text-[22px] font-semibold tracking-tight text-white pr-16">
          {p.name}
        </h3>
        <p className="mt-2 text-sm text-white/55 leading-relaxed">{p.desc}</p>

        {/* Tags */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.tags.map((t) => {
            const tagActive = t.roles.includes(activeRole);
            return (
              <span
                key={t.name}
                className="font-mono text-[11px] px-2 py-0.5 rounded-md border transition-all duration-300"
                style={{
                  borderColor: tagActive ? ROLES[activeRole].accentRing : "rgba(255,255,255,0.1)",
                  backgroundColor: tagActive ? ROLES[activeRole].accentSoft : "rgba(255,255,255,0.02)",
                  color: tagActive ? "#fff" : "rgba(255,255,255,0.4)",
                  boxShadow: tagActive ? `0 0 10px ${accent}33` : "none",
                }}
              >
                {t.name}
              </span>
            );
          })}
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center gap-2">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 font-mono text-[12px] text-white/85 hover:bg-white/[0.08] hover:text-white transition"
          >
            Live <window.Icon.Arrow />
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 font-mono text-[12px] text-white/85 hover:bg-white/[0.08] hover:text-white transition"
          >
            <window.Icon.Github /> GitHub
          </a>
          <span className="ml-auto font-mono text-[10px] text-white/30">
            #{String(idx + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Top accent shimmer */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          opacity: matches ? 0.7 : 0,
        }}
      ></div>
    </article>
  );
}

window.Projects = Projects;
