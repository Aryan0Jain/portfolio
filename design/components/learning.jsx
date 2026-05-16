// Currently learning + Contact
function Learning({ activeRole }) {
  const { ROLES, LEARNING } = window.PORTFOLIO_DATA;
  const accent = ROLES[activeRole].accent;
  const aiAccent = ROLES.ai.accent;

  return (
    <section id="learning" className="relative py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <window.SectionLabel num="05" title="Currently learning" accent={accent} />
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-white">
              Sharpening for the next role.
            </h2>
          </div>
          <span
            className="font-mono text-[11px] rounded-full border px-3 py-1.5"
            style={{
              borderColor: aiAccent + "55",
              backgroundColor: aiAccent + "15",
              color: aiAccent,
            }}
          >
            transitioning → AI Backend Engineer
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {LEARNING.map((l, i) => (
            <LearningCard key={l.name} l={l} accent={accent} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LearningCard({ l, accent, idx }) {
  const [shown, setShown] = React.useState(0);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setShown(l.value), 200 + idx * 120);
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [l.value, idx]);

  // chunked progress bar like ████████░░
  const filled = Math.round(l.value / 10);
  const empty = 10 - filled;

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-xl p-5"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-white font-medium">{l.name}</h3>
        <span className="font-mono text-[12px]" style={{ color: accent, transition: "color 300ms" }}>
          {shown}%
        </span>
      </div>

      <div className="mt-3 font-mono text-base tracking-tight" style={{ letterSpacing: "0.05em" }}>
        <span style={{ color: accent, transition: "color 300ms" }}>
          {"█".repeat(Math.round(shown / 10))}
        </span>
        <span className="text-white/15">{"░".repeat(10 - Math.round(shown / 10))}</span>
      </div>

      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full transition-all duration-[1200ms] ease-out"
          style={{
            width: `${shown}%`,
            backgroundColor: accent,
            boxShadow: `0 0 12px ${accent}`,
          }}
        ></div>
      </div>
    </div>
  );
}

window.Learning = Learning;
