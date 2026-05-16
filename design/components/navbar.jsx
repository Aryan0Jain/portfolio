// Navbar with role switcher
function Navbar({ activeRole, setActiveRole }) {
  const { ROLES, ROLE_ORDER } = window.PORTFOLIO_DATA;
  const accent = ROLES[activeRole].accent;

  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="mx-auto max-w-7xl px-6 pt-5">
        <div
          className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl"
          style={{
            boxShadow: `0 1px 0 rgba(255,255,255,0.04) inset, 0 10px 40px ${accent}11`,
          }}
        >
          {/* Logo */}
          <a href="#top" className="font-mono text-sm tracking-tight text-white/90 hover:text-white transition-colors">
            <span className="text-white/40">~/</span>aryan.jain
            <span
              className="ml-0.5 inline-block h-3 w-1.5 align-middle"
              style={{ backgroundColor: accent, animation: "blink 1.2s steps(2) infinite" }}
            ></span>
          </a>

          {/* Role switcher */}
          <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
            {ROLE_ORDER.map((key) => {
              const r = ROLES[key];
              const active = key === activeRole;
              const building = r.status === "building";
              return (
                <button
                  key={key}
                  onClick={() => setActiveRole(key)}
                  className={
                    "relative font-mono text-[12px] tracking-tight px-3 py-1.5 rounded-full transition-all duration-300 " +
                    (active ? "text-white" : "text-white/50 hover:text-white/80")
                  }
                  style={{
                    backgroundColor: active ? r.accentSoft : "transparent",
                    boxShadow: active ? `0 0 0 1px ${r.accentRing}, 0 0 18px ${r.accent}55` : "none",
                  }}
                >
                  {building ? (
                    <span
                      className="mr-1.5 inline-flex align-middle relative h-2.5 w-2.5"
                      aria-label="building"
                    >
                      <span
                        className="absolute inset-0 rounded-full border-[1.5px] border-transparent"
                        style={{
                          borderTopColor: r.accent,
                          borderRightColor: r.accent,
                          animation: "spin 1.1s linear infinite",
                          opacity: active ? 1 : 0.7,
                        }}
                      ></span>
                    </span>
                  ) : (
                    <span
                      className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle"
                      style={{
                        backgroundColor: r.accent,
                        boxShadow: active ? `0 0 8px ${r.accent}` : "none",
                        opacity: active ? 1 : 0.5,
                      }}
                    ></span>
                  )}
                  {r.label}
                  {building ? (
                    <span
                      className="ml-1.5 align-middle text-[9px] font-medium uppercase tracking-wider rounded px-1 py-px"
                      style={{
                        color: r.accent,
                        backgroundColor: r.accent + "22",
                        border: `1px solid ${r.accent}44`,
                      }}
                    >
                      wip
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[12px] text-white/80 hover:text-white hover:bg-white/[0.08] transition"
            >
              <window.Icon.Download />
              resume.pdf
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="grid place-items-center h-8 w-8 rounded-full border border-white/10 bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08] transition"
              aria-label="GitHub"
            >
              <window.Icon.Github />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="grid place-items-center h-8 w-8 rounded-full border border-white/10 bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08] transition"
              aria-label="LinkedIn"
            >
              <window.Icon.Linkedin />
            </a>
          </div>
        </div>

        {/* Mobile role switcher */}
        <nav className="md:hidden mt-2 flex items-center gap-1 rounded-full border border-white/10 bg-black/40 backdrop-blur p-1 overflow-x-auto">
          {ROLE_ORDER.map((key) => {
            const r = ROLES[key];
            const active = key === activeRole;
            const building = r.status === "building";
            return (
              <button
                key={key}
                onClick={() => setActiveRole(key)}
                className={
                  "shrink-0 inline-flex items-center gap-1.5 font-mono text-[11px] px-3 py-1.5 rounded-full transition-all " +
                  (active ? "text-white" : "text-white/50")
                }
                style={{
                  backgroundColor: active ? r.accentSoft : "transparent",
                  boxShadow: active ? `0 0 0 1px ${r.accentRing}` : "none",
                }}
              >
                {building ? (
                  <span className="relative h-2 w-2 inline-block">
                    <span
                      className="absolute inset-0 rounded-full border border-transparent"
                      style={{
                        borderTopColor: r.accent,
                        borderRightColor: r.accent,
                        animation: "spin 1.1s linear infinite",
                      }}
                    ></span>
                  </span>
                ) : null}
                {r.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

window.Navbar = Navbar;
