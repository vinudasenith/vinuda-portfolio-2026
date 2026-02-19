/**
 * Navbar.jsx — Blue & White Theme · With Dark/Light Toggle
 * Import ThemeProvider at App root, then useTheme() here for toggle.
 *
 * Dependencies: lucide-react, ThemeProvider.jsx
 */
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";


const NAV_ITEMS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
];

const DRAWER_SOCIALS = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/in/" },
  { label: "Email", href: "mailto:you@example.com" },
];

const NAV_STYLES = `
  .nav-link {
    position: relative;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--text-muted);
    padding: 0.4rem 0.9rem; border-radius: 2px;
    border: 1px solid transparent;
    transition: color 0.2s, border-color 0.2s, background 0.2s;
    text-decoration: none;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: -1px; left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 60%; height: 1px; background: var(--accent);
    transition: transform 0.25s ease;
  }
  .nav-link:hover, .nav-link.active { color: var(--text-primary); border-color: var(--border); background: var(--accent-glow2); }
  .nav-link.active::after, .nav-link:hover::after { transform: translateX(-50%) scaleX(1); }

  .nav-cta {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--accent); border: 1px solid var(--accent); border-radius: 2px;
    padding: 0.45rem 1.1rem; display: inline-flex; align-items: center; gap: 6px;
    position: relative; overflow: hidden; text-decoration: none; transition: color 0.25s;
  }
  .nav-cta::before { content: ''; position: absolute; inset: 0; background: var(--accent); transform: translateY(100%); transition: transform 0.28s ease; }
  .nav-cta:hover { color: #fff; }
  .nav-cta:hover::before { transform: translateY(0); }
  .nav-cta span, .nav-cta svg { position: relative; z-index: 1; }

  .nav-scrolled {
    background: var(--nav-bg-scrolled) !important;
    backdrop-filter: var(--nav-backdrop) !important;
    border-bottom: 1px solid var(--border) !important;
    box-shadow: 0 4px 30px rgba(0,0,0,0.1) !important;
  }

  .mobile-drawer {
    position: fixed; inset: 0; z-index: 40;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    background: var(--drawer-bg); backdrop-filter: blur(28px);
    transition: opacity 0.4s ease, visibility 0.4s ease;
  }
  .mobile-drawer.closed { opacity:0; visibility:hidden; pointer-events:none; }
  .mobile-drawer.open   { opacity:1; visibility:visible; pointer-events:all; }

  .drawer-item {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2.8rem,8vw,4.5rem); letter-spacing: 0.05em;
    color: var(--text-muted); opacity: 0.3;
    transition: color 0.2s, transform 0.2s, opacity 0.2s;
    text-decoration: none; display: block;
  }
  .drawer-item:hover { color: var(--accent); transform: translateX(6px); opacity: 1; }

  .ham-bar { display: block; height: 1.5px; background: currentColor; border-radius: 1px; transition: transform 0.3s ease, opacity 0.3s ease; }
`;

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const targets = [...NAV_ITEMS.map(i => i.href.slice(1)), "hero"]
      .map(id => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.35, rootMargin: "-20% 0px -60% 0px" }
    );
    targets.forEach(t => io.observe(t));
    return () => io.disconnect();
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <style>{NAV_STYLES}</style>

      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-400${scrolled ? " nav-scrolled" : ""}`}
        style={{ padding: scrolled ? "0.75rem 0" : "1.4rem 0", background: "transparent" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between" style={{ padding: "0 1.5rem" }}>

          {/* Logo */}
          <a href="#hero" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.5rem", letterSpacing: "0.08em", color: "var(--text-primary)", textDecoration: "none" }}>
            VS<span style={{ color: "var(--accent)" }}>.</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center" style={{ gap: "0.25rem" }}>
            {NAV_ITEMS.map(item => (
              <a key={item.name} href={item.href} className={`nav-link${activeSection === item.href.slice(1) ? " active" : ""}`}>
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop right: theme toggle + divider + CTA */}
          <div className="hidden md:flex items-center" style={{ gap: "0.75rem" }}>
            <span style={{ width: 1, height: 20, background: "var(--border)", display: "block" }} />
            <a href="#contact" className="nav-cta">
              <span>Let's Talk</span>
              <ArrowUpRight size={12} />
            </a>
          </div>

          {/* Mobile: toggle + hamburger */}
          <div className="md:hidden flex items-center" style={{ gap: "0.75rem" }}>
            <button
              style={{ width: 36, height: 36, gap: "5px", background: "transparent", border: "none", cursor: "pointer", color: "var(--text-secondary)", padding: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end" }}
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span className="ham-bar" style={{ width: "22px", transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }} />
              <span className="ham-bar" style={{ width: "16px", opacity: menuOpen ? 0 : 1 }} />
              <span className="ham-bar" style={{ width: "22px", transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${menuOpen ? "open" : "closed"}`}>
        <span style={{ position: "absolute", top: "1.4rem", left: "1.5rem", fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.5rem", letterSpacing: "0.08em", color: "var(--text-primary)" }}>
          VS<span style={{ color: "var(--accent)" }}>.</span>
        </span>

        <nav style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.25rem" }}>
          {NAV_ITEMS.map((item, idx) => (
            <a key={item.name} href={item.href} className="drawer-item" onClick={closeMenu}
              style={{ transitionDelay: menuOpen ? `${idx * 55}ms` : "0ms", opacity: menuOpen ? 0.3 : 0, transform: menuOpen ? "translateX(0)" : "translateX(-20px)", transition: `opacity 0.38s ease ${idx * 55}ms, transform 0.38s ease ${idx * 55}ms, color 0.2s` }}>
              {item.name}
            </a>
          ))}
        </nav>

        <div style={{ position: "absolute", bottom: "2.5rem", left: "1.5rem", right: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {DRAWER_SOCIALS.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => { e.target.style.color = "var(--accent)"; }}
                onMouseLeave={e => { e.target.style.color = "var(--text-muted)"; }}>
                {label}
              </a>
            ))}
          </div>
          <a href="#contact" className="nav-cta" onClick={closeMenu} style={{ fontSize: "0.68rem" }}>
            <span>Hire Me</span><ArrowUpRight size={11} />
          </a>
        </div>

        <span aria-hidden style={{ position: "absolute", bottom: "-2rem", right: "-1rem", fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(10rem,30vw,18rem)", lineHeight: 1, color: "var(--text-muted)", opacity: 0.05, pointerEvents: "none", userSelect: "none" }}>V</span>
      </div>
    </>
  );
};

