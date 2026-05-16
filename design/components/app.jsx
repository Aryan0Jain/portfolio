// Main App
function FadeIn({ children, delay = 0 }) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => setShown(true), delay);
          obs.disconnect();
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -60px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 700ms ease, transform 700ms cubic-bezier(0.2, 0.7, 0.3, 1)",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

function App() {
  const [activeRole, setActiveRole] = React.useState("backend");
  const { ROLES } = window.PORTFOLIO_DATA;
  const accent = ROLES[activeRole].accent;

  // selection color
  React.useEffect(() => {
    const styleId = "__role-selection-style";
    let s = document.getElementById(styleId);
    if (!s) {
      s = document.createElement("style");
      s.id = styleId;
      document.head.appendChild(s);
    }
    s.textContent = `::selection { background: ${accent}55; color: #fff; }`;
  }, [accent]);

  return (
    <div id="top" className="min-h-screen relative">
      <window.PortfolioBackground accent={accent} />
      <window.Navbar activeRole={activeRole} setActiveRole={setActiveRole} />
      <window.BuildStatusBar activeRole={activeRole} />

      <main>
        <window.Hero activeRole={activeRole} setActiveRole={setActiveRole} />
        <FadeIn><window.About activeRole={activeRole} /></FadeIn>
        <FadeIn><window.Skills activeRole={activeRole} /></FadeIn>
        <FadeIn><window.Projects activeRole={activeRole} /></FadeIn>
        <FadeIn><window.Experience activeRole={activeRole} /></FadeIn>
        <FadeIn><window.Learning activeRole={activeRole} /></FadeIn>
        <FadeIn><window.Contact activeRole={activeRole} /></FadeIn>
      </main>

      {/* floating role indicator (bottom right, small) */}
      <div
        className="fixed bottom-5 right-5 z-30 hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-black/60 backdrop-blur px-3 py-1.5 font-mono text-[11px] text-white/55"
        style={{ boxShadow: `0 0 22px ${accent}33` }}
      >
        {ROLES[activeRole].status === "building" ? (
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
        ) : (
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}` }}></span>
        )}
        Role.Switch() → <span className="text-white/90">{ROLES[activeRole].label}</span>
        <span className="text-white/30">·</span>
        <span style={{ color: accent }}>
          {ROLES[activeRole].status === "shipped" ? "stable" : "building"}
        </span>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
