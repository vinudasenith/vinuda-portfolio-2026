/**
 * SkillsSection.jsx — Blue & White Theme
 * VS portfolio design system · Blue (#3b82f6) + White palette only
 */
import { useEffect, useRef, useState } from "react";

function useReveal(threshold = 0.1) {
  const ref = useRef(null); const [visible, setVisible] = useState(false);
  useEffect(() => { const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold }); if (ref.current) io.observe(ref.current); return () => io.disconnect(); }, [threshold]);
  return [ref, visible];
}

const SKILLS = [
  { name: "HTML / CSS", level: 95, category: "frontend" }, { name: "JavaScript", level: 90, category: "frontend" }, { name: "React.js", level: 90, category: "frontend" },
  { name: "React Native", level: 85, category: "frontend" }, { name: "Angular", level: 80, category: "frontend" }, { name: "Next.js", level: 80, category: "frontend" }, { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "Node.js", level: 85, category: "backend" }, { name: "Express.js", level: 80, category: "backend" }, { name: "Python", level: 85, category: "backend" },
  { name: "FastAPI", level: 75, category: "backend" }, { name: "Spring Boot", level: 80, category: "backend" }, { name: "MongoDB", level: 90, category: "backend" },
  { name: "PostgreSQL", level: 70, category: "backend" }, { name: "MySQL", level: 65, category: "backend" }, { name: "SQL", level: 80, category: "backend" },
  { name: "AI / ML", level: 85, category: "ai" }, { name: "NLP", level: 75, category: "ai" }, { name: "CrewAI", level: 70, category: "ai" }, { name: "Prompt Engineering", level: 70, category: "ai" },
  { name: "Git / GitHub", level: 90, category: "tools" }, { name: "Figma", level: 80, category: "tools" }, { name: "VS Code", level: 95, category: "tools" },
];

const CATEGORIES = [
  { id: "all", label: "All Skills" }, { id: "frontend", label: "Frontend" }, { id: "backend", label: "Backend" }, { id: "ai", label: "AI / ML" }, { id: "tools", label: "Tools" },
];

/* Blue accent scale for different categories */
const CAT_ACCENT = { frontend: "#3b82f6", backend: "#60a5fa", ai: "#93c5fd", tools: "#bfdbfe" };

const LEVEL_BANDS = [
  { min: 90, label: "Expert", color: "#3b82f6" },
  { min: 80, label: "Advanced", color: "#60a5fa" },
  { min: 70, label: "Proficient", color: "#93c5fd" },
  { min: 0, label: "Intermediate", color: "#475569" },
];

function levelLabel(n) { return LEVEL_BANDS.find(b => n >= b.min)?.label ?? "Intermediate"; }
function levelColor(n) { return LEVEL_BANDS.find(b => n >= b.min)?.color ?? "#475569"; }

const SKILLS_STYLES = `
  .skill-tab{font-family:'JetBrains Mono',monospace;font-size:0.68rem;letter-spacing:0.1em;text-transform:uppercase;padding:0.4rem 1.1rem;border-radius:2px;border:1px solid var(--border);background:transparent;color:var(--text-muted);cursor:pointer;transition:color .2s,border-color .2s,background .2s,box-shadow .2s;white-space:nowrap;}
  .skill-tab:hover{color:var(--text-secondary);border-color:rgba(255,255,255,0.15);}
  .skill-tab.active{background:var(--accent);border-color:var(--accent);color:#fff;box-shadow:0 0 20px var(--accent-glow);}
  .skill-card{position:relative;border:1px solid var(--border);border-radius:3px;background:var(--bg-card);padding:1rem 1.1rem;overflow:hidden;transition:border-color .25s,background .25s,box-shadow .25s,transform .25s;}
  .skill-card:hover{transform:translateY(-3px);}
  .prog-track{width:100%;height:2px;border-radius:1px;background:rgba(255,255,255,0.05);overflow:hidden;margin-top:0.6rem;}
  .prog-fill{height:100%;border-radius:1px;transition:width 1s cubic-bezier(0.16,1,0.3,1);}
  .summary-band{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--border);border-radius:3px;overflow:hidden;margin-top:3.5rem;}
  .summary-cell{padding:1.4rem 1rem;text-align:center;border-right:1px solid var(--border);}
  .summary-cell:last-child{border-right:none;}
  @media(max-width:640px){.summary-band{grid-template-columns:repeat(2,1fr);}.summary-cell:nth-child(2){border-right:none;}.summary-cell:nth-child(3){border-right:1px solid var(--border);}.summary-cell:nth-child(3),.summary-cell:nth-child(4){border-top:1px solid var(--border);}}
`;

function SkillCard({ skill, index, barsVisible }) {
  const [hovered, setHovered] = useState(false);
  const accent = CAT_ACCENT[skill.category];
  const delay = Math.min(index * 0.04, 0.6);
  return (
    <div className="skill-card" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ borderColor: hovered ? `${accent}50` : "var(--border)", background: hovered ? "rgba(59,130,246,0.04)" : "var(--bg-card)", boxShadow: hovered ? `0 8px 30px rgba(0,0,0,0.4),0 0 0 1px ${accent}18` : "none", opacity: barsVisible ? 1 : 0, transform: barsVisible ? hovered ? "translateY(-3px)" : "translateY(0)" : "translateY(16px)", transition: `opacity .6s ${delay}s ease,transform .6s ${delay}s ease,border-color .25s,background .25s,box-shadow .25s` }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${accent},transparent)`, opacity: hovered ? 1 : 0, transition: "opacity .25s" }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", minWidth: 0 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: accent, flexShrink: 0 }} />
          <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 500, fontSize: "0.88rem", color: hovered ? "#fff" : "var(--text-primary)", transition: "color .2s", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{skill.name}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.56rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "2px 6px", borderRadius: "2px", border: `1px solid ${levelColor(skill.level)}30`, background: `${levelColor(skill.level)}10`, color: levelColor(skill.level) }}>{levelLabel(skill.level)}</span>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem", fontWeight: 500, color: hovered ? accent : "var(--text-muted)", transition: "color .2s", minWidth: "2.5rem", textAlign: "right" }}>{skill.level}%</span>
        </div>
      </div>
      <div className="prog-track">
        <div className="prog-fill" style={{ width: barsVisible ? `${skill.level}%` : "0%", background: hovered ? accent : `linear-gradient(90deg,${accent}88,${accent}cc)`, transitionDelay: `${delay + 0.1}s`, boxShadow: hovered ? `0 0 8px ${accent}70` : "none" }} />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [secRef, secVisible] = useReveal(0.06);
  const [barsRef, barsVisible] = useReveal(0.08);
  const filtered = SKILLS.filter(s => activeCategory === "all" || s.category === activeCategory);
  const reveal = (d = 0) => ({ opacity: secVisible ? 1 : 0, transform: secVisible ? "translateY(0)" : "translateY(24px)", transition: `opacity .75s ${d}s ease,transform .75s ${d}s ease` });

  return (
    <>
      <style>{SKILLS_STYLES}</style>
      <section id="skills" ref={secRef} style={{ position: "relative", padding: "8rem 1.5rem", background: "var(--bg)", overflow: "hidden", fontFamily: "'Outfit',sans-serif" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(59,130,246,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.03) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", width: 520, height: 520, borderRadius: "50%", top: -80, right: -80, background: "radial-gradient(circle,rgba(59,130,246,0.1) 0%,transparent 70%)" }} />
          <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", bottom: "5%", left: "30%", background: "radial-gradient(circle,rgba(147,197,253,0.05) 0%,transparent 70%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 10, maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(3rem,7vw,6rem)", lineHeight: 0.95, letterSpacing: "0.03em", color: "var(--text-primary)", ...reveal(0.2) }}>
                Technical<br /><span style={{ color: "var(--accent)" }}>Stack</span> &amp; Skills
              </h2>
              <p style={{ fontFamily: "'Outfit',sans-serif", textAlign: "left", fontSize: "0.9rem", lineHeight: 1.7, color: "var(--text-muted)", maxWidth: 360, ...reveal(0.3) }}>My technical arsenal across all domains  from pixels to production pipelines and AI agents.</p>
            </div>
          </div>

          <div ref={barsRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "0.6rem" }}>
            {filtered.map((skill, i) => <SkillCard key={skill.name} skill={skill} index={i} barsVisible={barsVisible} />)}
          </div>


        </div>
      </section>
    </>
  );
}