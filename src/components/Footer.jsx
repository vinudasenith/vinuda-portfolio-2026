/**
 * Footer.jsx — Blue & White Theme
 * VS portfolio design system · Blue (#3b82f6) + White palette only
 */
import { Github, Linkedin, Instagram, Mail, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const SOCIALS = [
  { Icon: Github, label: "GitHub", href: "https://github.com/vinudasenith", accent: "#bfdbfe" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/vinudasenith/", accent: "#60a5fa" },
  { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/vinuda_senith/", accent: "#93c5fd" },
  { Icon: Mail, label: "Email", href: "mailto:ha.vinudas@gmail.com", accent: "#3b82f6" },
];

const NAV_LINKS = [
  { label: "About", href: "#about" }, { label: "Skills", href: "#skills" }, { label: "Projects", href: "#projects" }, { label: "Experience", href: "#experience" }, { label: "Contact", href: "#contact" },
];



const FOOTER_STYLES = `
  .footer-nav-link{font-family:'JetBrains Mono',monospace;font-size:0.68rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-muted);text-decoration:none;position:relative;transition:color .2s;}
  .footer-nav-link::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:1px;background:var(--accent);transform:scaleX(0);transform-origin:left;transition:transform .25s ease;}
  .footer-nav-link:hover{color:var(--text-primary);}
  .footer-nav-link:hover::after{transform:scaleX(1);}
  .footer-social{width:38px;height:38px;border-radius:2px;border:1px solid var(--border);background:transparent;display:flex;align-items:center;justify-content:center;color:var(--text-muted);text-decoration:none;transition:border-color .2s,color .2s,background .2s,transform .2s,box-shadow .2s;}
  .footer-social:hover{transform:translateY(-4px);}
  .fab-top{position:fixed;bottom:2rem;right:2rem;z-index:50;width:42px;height:42px;border-radius:2px;border:1px solid var(--border);background:rgba(4,8,15,0.92);backdrop-filter:blur(16px);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:border-color .25s,color .25s,opacity .35s,transform .35s,box-shadow .25s;}
  .fab-top:hover{border-color:var(--accent);color:var(--accent);box-shadow:0 0 24px var(--accent-glow);}
  .built-tag{font-family:'JetBrains Mono',monospace;font-size:0.58rem;letter-spacing:0.1em;text-transform:uppercase;padding:2px 8px;border-radius:2px;border:1px solid var(--border);color:var(--text-muted);background:rgba(255,255,255,0.02);transition:border-color .2s,color .2s;}
  .built-tag:hover{border-color:var(--accent);color:var(--accent-light);}
`;

export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  const year = new Date().getFullYear();
  useEffect(() => { const onScroll = () => setShowTop(window.scrollY > 400); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <style>{FOOTER_STYLES}</style>

      {/* Scroll-to-top FAB */}
      <button onClick={scrollTop} aria-label="Scroll to top" className="fab-top"
        style={{ opacity: showTop ? 1 : 0, transform: showTop ? "translateY(0) scale(1)" : "translateY(16px) scale(0.88)", pointerEvents: showTop ? "auto" : "none", color: "var(--text-muted)" }}>
        <ArrowUp size={15} />
      </button>

      <footer style={{ position: "relative", overflow: "hidden", background: "var(--bg)", fontFamily: "'Outfit',sans-serif" }}>
        {/* Top accent border */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent 0%,var(--accent) 35%,rgba(147,197,253,0.5) 65%,transparent 100%)" }} />

        {/* Bottom glow */}
        <div aria-hidden style={{ position: "absolute", bottom: -60, left: "50%", transform: "translateX(-50%)", width: 600, height: 200, borderRadius: "50%", background: "radial-gradient(ellipse at center,rgba(59,130,246,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />

        {/* Grid overlay */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(59,130,246,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.02) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: "1200px", margin: "0 auto", padding: "3.5rem 1.5rem 2rem" }}>

          {/* Main grid */}
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "3rem", alignItems: "start", paddingBottom: "2.5rem", borderBottom: "1px solid var(--border)" }} className="md:grid-cols-[auto_1fr_auto] grid-cols-1">

            {/* Brand */}
            <div>
              <a href="#hero" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.2rem", letterSpacing: "0.08em", color: "var(--text-primary)", textDecoration: "none", display: "block", marginBottom: "0.6rem", lineHeight: 1 }}>
                VS<span style={{ color: "var(--accent)" }}>.</span>
              </a>
            </div>

            {/* Socials */}
            <div>
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1.1rem", textAlign: "right", marginRight: "3rem" }}>Find Me On</p>
              <div style={{
                display: "flex", gap: "0.45rem", justifyContent: "flex-end"
              }}>
                {SOCIALS.map(({ Icon, label, href, accent }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="footer-social"
                    onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; e.currentTarget.style.background = `${accent}14`; e.currentTarget.style.boxShadow = `0 4px 18px ${accent}22`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = "none"; }}>
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", paddingTop: "1.75rem" }}>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.62rem", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
              © {year}{" "}<span style={{ color: "var(--accent)" }}>Vinuda Senith</span> — All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}