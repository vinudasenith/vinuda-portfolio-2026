/**
 * AboutSection.jsx — Blue & White Theme
 * VS portfolio design system · Blue (#3b82f6) + White palette only
 */
import { ArrowUpRight, Code2, BrainCircuit, Rocket, Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const CARDS = [
  {
    Icon: Code2,
    accent: "#3b82f6",
    label: "Full-Stack Dev",
    title: "Full-Stack Development",
    desc: "Building scalable web and mobile applications with React, Node.js, Next.js, and Angular  from pixel-perfect UIs to resilient, production-ready APIs.",
    tags: ["React", "Node.js", "Next.js", "Angular"],
  },
  {
    Icon: BrainCircuit,
    accent: "#93c5fd",
    label: "AI / ML",
    title: "AI & Machine Learning",
    desc: "Implementing AI workflows, multi-agent systems, NLP pipelines, and ML models that automate real-world tasks with measurable business impact.",
    tags: ["CrewAI", "NLP", "Python"],
  },
  {
    Icon: Rocket,
    accent: "#bfdbfe",
    label: "Innovation",
    title: "Research & Prototyping",
    desc: "Leading projects at the intersection of AI, embedded systems, and modern web/mobile tech combining engineering rigour with creative problem-solving.",
    tags: ["IoT", "Research", "Prototyping"],
  },
];

const HIGHLIGHTS = [

  { val: "6+", label: "Projects" },
  { val: "12+", label: "Technologies" },

];

const ABOUT_STYLES = `
  .about-card {
    position: relative;
    border: 1px solid var(--border);
    border-radius: 3px;
    background: var(--bg-card);
    padding: 1.5rem;
    overflow: hidden;
    transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
    cursor: default;
  }
  .about-card:hover { transform: translateY(-4px); }

  .stat-cell {
    padding: 1.2rem 1rem;
    border-right: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    text-align: center;
  }
  .stat-cell:nth-child(2n) { border-right: none; }
  .stat-cell:nth-child(3), .stat-cell:nth-child(4) { border-bottom: none; }

  .bio-link {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
    display: inline-flex; align-items: center; gap: 6px;
    padding: 0.5rem 1.2rem; border-radius: 2px;
    text-decoration: none;
    transition: color 0.2s, border-color 0.2s, background 0.2s, transform 0.2s;
  }
  .bio-link:hover { transform: translateY(-2px); }
  .bio-link-primary { background: var(--accent); color: #fff; border: 1px solid var(--accent); }
  .bio-link-primary:hover { background: var(--accent-dim); border-color: var(--accent-dim); box-shadow: 0 8px 30px var(--accent-glow); }
  .bio-link-ghost { background: transparent; color: var(--text-secondary); border: 1px solid var(--border); }
  .bio-link-ghost:hover { border-color: var(--accent); color: var(--accent-light); background: var(--accent-glow2); }

  .card-icon { width:42px; height:42px; border-radius:2px; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition: background 0.3s, border-color 0.3s; }
  .card-tag  { font-family:'JetBrains Mono',monospace; font-size:0.6rem; letter-spacing:0.08em; padding:2px 8px; border-radius:2px; border:1px solid; }
`;

function AbilityCard({ card, delay, visible }) {
  const { Icon, accent, label, title, desc, tags } = card;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="about-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor: hovered ? `${accent}55` : "var(--border)",
        boxShadow: hovered ? `0 16px 50px rgba(0,0,0,0.4), 0 0 0 1px ${accent}18` : "none",
        opacity: visible ? 1 : 0,
        transform: visible ? hovered ? "translateY(-4px)" : "translateY(0)" : "translateX(24px)",
        transition: `opacity .75s ${delay}s ease, transform .75s ${delay}s ease, border-color .3s, box-shadow .3s`,
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${accent},transparent)`, opacity: hovered ? 1 : 0, transition: "opacity .3s" }} />
      <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
        <div className="card-icon" style={{ background: hovered ? `${accent}18` : "rgba(255,255,255,0.04)", border: `1px solid ${hovered ? `${accent}40` : "var(--border)"}` }}>
          <Icon size={18} style={{ color: accent }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: accent, display: "block", marginBottom: "0.3rem" }}>{label}</span>
          <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.2rem", letterSpacing: "0.05em", color: "var(--text-primary)", marginBottom: "0.5rem", lineHeight: 1.1 }}>{title}</h3>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.83rem", lineHeight: 1.65, color: "var(--text-muted)", marginBottom: "0.9rem" }}>{desc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {tags.map(t => (
              <span key={t} className="card-tag" style={{ background: `${accent}10`, borderColor: `${accent}28`, color: accent, opacity: 0.9 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const AboutSection = () => {
  const [secRef, secVisible] = useReveal(0.08);
  const reveal = (delay = 0, axis = "Y") => ({
    opacity: secVisible ? 1 : 0,
    transform: secVisible ? "translate(0,0)" : axis === "X" ? "translateX(-24px)" : "translateY(24px)",
    transition: `opacity .75s ${delay}s ease, transform .75s ${delay}s ease`,
  });

  return (
    <>
      <style>{ABOUT_STYLES}</style>
      <section id="about" ref={secRef} style={{ position: "relative", padding: "8rem 1.5rem", background: "var(--bg)", overflow: "hidden", fontFamily: "'Outfit',sans-serif" }}>

        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(59,130,246,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.03) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", top: "10%", left: "-100px", background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", bottom: "0", right: "5%", background: "radial-gradient(circle, rgba(147,197,253,0.06) 0%, transparent 70%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 10, maxWidth: "1200px", margin: "0 auto" }}>

          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(3rem,7vw,6rem)", lineHeight: 0.95, letterSpacing: "0.03em", color: "var(--text-primary)", marginBottom: "3.5rem", ...reveal(0.2) }}>
            The Engineer<br />
            <span style={{ color: "var(--accent)" }}>Behind</span> the Code
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem" }} className="lg:grid-cols-[1.05fr_1fr]">

            {/* LEFT */}
            <div style={reveal(0.25, "X")}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.35rem 0.9rem", borderRadius: "2px", border: "1px solid var(--border)", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", animation: "pulseRing 2s ease infinite" }} />
                AI &amp; Full-Stack Developer
              </div>
              <p style={{ fontSize: "1rem", lineHeight: 1.75, textAlign: "justify", color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
                I'm a <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>software engineering undergraduate</strong> passionate about building intelligent full-stack applications at the intersection of AI, web, and mobile technologies.
              </p>
              <p style={{ fontSize: "1rem", textAlign: "justify", lineHeight: 1.75, color: "var(--text-secondary)", marginBottom: "2.5rem" }}>
                I design solutions that <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>automate complex workflows</strong>, elevate user experiences, and deliver measurable value constantly pushing boundaries with AI/ML and modern frameworks.
              </p>

            </div>

            {/* RIGHT */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {CARDS.map((card, i) => (
                <AbilityCard key={card.title} card={card} delay={0.3 + i * 0.1} visible={secVisible} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;