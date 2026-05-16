// Hero with typewriter cycling through role taglines
function useTypewriter(strings, speed = 45, pause = 1700) {
  const [text, setText] = React.useState("");
  const [idx, setIdx] = React.useState(0);
  const [phase, setPhase] = React.useState("typing"); // typing | holding | deleting

  React.useEffect(() => {
    let t;
    const cur = strings[idx % strings.length];
    if (phase === "typing") {
      if (text.length < cur.length) {
        t = setTimeout(() => setText(cur.slice(0, text.length + 1)), speed);
      } else {
        t = setTimeout(() => setPhase("holding"), pause);
      }
    } else if (phase === "holding") {
      t = setTimeout(() => setPhase("deleting"), pause);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        t = setTimeout(() => setText(cur.slice(0, text.length - 1)), speed / 2);
      } else {
        setIdx((i) => (i + 1) % strings.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(t);
  }, [text, phase, idx, strings, speed, pause]);

  // expose a way to jump
  return { text, jumpTo: (i) => { setText(""); setIdx(i); setPhase("typing"); }, currentIdx: idx };
}

function Hero({ activeRole, setActiveRole }) {
  const { ROLES, ROLE_ORDER, METRICS } = window.PORTFOLIO_DATA;
  const accent = ROLES[activeRole].accent;
  const building = ROLES[activeRole].status === "building";
  const taglines = ROLE_ORDER.map((k) => ROLES[k].tagline);

  const tw = useTypewriter(taglines);

  // when user clicks a role, jump typewriter to it (independent cycling otherwise)
  const activeIdx = ROLE_ORDER.indexOf(activeRole);
  const lastSetRef = React.useRef(activeIdx);
  React.useEffect(() => {
    if (lastSetRef.current !== activeIdx) {
      tw.jumpTo(activeIdx);
      lastSetRef.current = activeIdx;
    }
  }, [activeIdx]);

  return (
    <section
      className="relative pb-20"
      style={{
        paddingTop: building ? "240px" : "128px",
        transition: "padding-top 350ms ease",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Top status row */}
        <div className="flex items-center gap-3 font-mono text-[11px] text-white/50 flex-wrap">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            available_for_hire = true
          </span>
          <span className="text-white/20">·</span>
          <span>IIT_Roorkee · 2+ yrs · Bangalore</span>
          {building ? (
            <React.Fragment>
              <span className="text-white/20">·</span>
              <span className="inline-flex items-center gap-1.5" style={{ color: accent }}>
                <span className="relative h-2 w-2 inline-block">
                  <span
                    className="absolute inset-0 rounded-full border border-transparent"
                    style={{
                      borderTopColor: accent,
                      borderRightColor: accent,
                      animation: "spin 1.1s linear infinite",
                    }}
                  ></span>
                </span>
                viewing preview · {ROLES[activeRole].version}
              </span>
            </React.Fragment>
          ) : null}
        </div>

        {/* Headline */}
        <h1 className="mt-6 font-semibold tracking-tight text-[clamp(56px,8.5vw,128px)] leading-[0.95]">
          <span className="block text-white/90">Hi, I'm</span>
          <span
            className="block bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(110deg, #ffffff 0%, ${accent} 45%, #ffffff 90%)`,
              backgroundSize: "200% 100%",
              animation: "shineMove 6s linear infinite",
              transition: "background-image 400ms ease",
            }}
          >
            Aryan Jain<span style={{ color: accent }}>.</span>
          </span>
        </h1>

        {/* Typewriter line */}
        <div className="mt-7 flex items-center gap-2 font-mono text-xl md:text-2xl">
          <span style={{ color: accent }}>$</span>
          <span className="text-white/85">{tw.text}</span>
          <span
            className="inline-block h-6 md:h-7 w-2.5 align-middle"
            style={{ backgroundColor: accent, animation: "blink 1s steps(2) infinite" }}
          ></span>
        </div>

        {/* Subline */}
        <p className="mt-4 max-w-2xl text-white/55 text-base md:text-lg" style={{ transition: "color 300ms" }}>
          {ROLES[activeRole].heroSub}
        </p>

        {/* Metric chips */}
        <div className="mt-10 flex flex-wrap gap-3">
          {METRICS.map((m, i) => (
            <MetricChip key={m.label} m={m} accent={accent} idx={i} />
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium text-black transition-all"
            style={{
              backgroundColor: accent,
              boxShadow: `0 12px 40px -10px ${accent}aa, 0 0 0 1px ${accent}`,
            }}
          >
            View Projects
            <window.Icon.Arrow />
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-white/85 hover:bg-white/[0.08] hover:text-white transition"
          >
            <window.Icon.Download />
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}

function MetricChip({ m, accent, idx }) {
  return (
    <div
      className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur px-4 py-3 transition-all hover:-translate-y-0.5"
      style={{
        animation: `floaty ${5 + idx * 0.7}s ease-in-out ${idx * 0.4}s infinite alternate`,
      }}
    >
      <div
        className="font-mono text-2xl font-medium"
        style={{ color: accent, transition: "color 300ms" }}
      >
        {m.value}
      </div>
      <div className="font-mono text-[11px] uppercase tracking-wider text-white/45 mt-0.5">
        {m.label}
      </div>
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ boxShadow: `0 0 0 1px ${accent}66, 0 14px 40px -16px ${accent}99` }}
      ></div>
    </div>
  );
}

window.Hero = Hero;
