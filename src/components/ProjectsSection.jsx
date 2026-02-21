/**
 * ProjectsSection.jsx — Blue & White Theme
 * VS portfolio design system · Blue (#3b82f6) + White palette only
 */
import { ExternalLink, Github, ArrowUpRight, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function useReveal(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const PROJECTS = [
  { id: 1, emoji: "🦺", accent: "#3b82f6", featured: true, title: "VisionAssist Care (University Group Project) ", category: "Embedded · AI", description: "Helps visually impaired people move safely using sensors and a mobile app to detect obstacles, give directions, and send fall alerts.", image: "/projects/vision-assist.jpeg", tags: ["React Native", "Node.js", "Express.js", "MongoDB"], demoUrl: "https://www.visionassistcare.com/", githubUrl: "https://github.com/methirabinath/Vision-Assist-group-repository.git" },

  { id: 2, emoji: "🤖", accent: "#60a5fa", featured: true, title: "AI Autonomous Workflow Assistant", category: "AI · Automation", description: "Multi-agent web app that plans, researches, and reviews work. Users describe tasks in plain language  agents handle the rest.", image: "/projects/ai-workflow.png", tags: ["Python", "CrewAI", "Streamlit", "AI", "Automation"], demoUrl: "https://ai-autonomous-workflow-assistant-apecr9zfau4s5lpgtdz8od.streamlit.app/", githubUrl: "https://github.com/vinudasenith/AI-Autonomous-Workflow-Assistant.git" },

  { id: 3, emoji: "📄", accent: "#93c5fd", featured: false, title: "AI Research Report Generator", category: "AI · Productivity", description: "Automatically researches, summarises, and writes full reports from a topic. Download as Markdown or PDF in seconds.", image: "/projects/ai-report.png", tags: ["Python", "CrewAI", "Streamlit", "AI"], demoUrl: "https://ai-research-report-generator-xvscoazp7pm8qcadtks6df.streamlit.app/", githubUrl: "https://github.com/vinudasenith/ai-research-report-generator.git" },

  { id: 4, emoji: "📋", accent: "#93c5fd", featured: false, title: "Resume Matcher Pro", category: "AI · Career Tools", description: "ATS-friendly resume builder with scoring, PDF downloads, AI career chatbot, and admin tools.", image: "/projects/resume-matcher.png", tags: ["Java", "Spring Boot", "Angular", "AI", "PostgreSQL"], demoUrl: "#", githubUrl: "https://github.com/vinudasenith/resume-app-backend.git" },

  { id: 5, emoji: "🏰", accent: "#60a5fa", featured: false, title: "Fortress Haven Resort", category: "Full-Stack · Booking", description: "Hotel booking system where guests browse rooms, make reservations, and explore activities. Full admin management.", image: "/projects/hotel-booking.png", tags: ["Java", "Spring Boot", "Angular", "MongoDB", "Tailwind"], demoUrl: "#", githubUrl: "https://github.com/vinudasenith/hotel-booking-backend.git" },

  { id: 6, emoji: "🚗", accent: "#3b82f6", featured: false, title: "Drive Now", category: "Full-Stack · Platform", description: "Full-stack cab booking platform with car browsing, ride booking, user reviews, and a complete admin dashboard.", image: "/projects/drive-now.png", tags: ["Javascript", "React", "Node.js", "Express.js", "MongoDB"], demoUrl: "https://drive-now-frontend-seven.vercel.app/", githubUrl: "https://github.com/vinudasenith/drive-now-frontend.git" },




];

const PROJ_STYLES = `
  .proj-card { position:relative; display:flex; flex-direction:column; border:1px solid var(--border); border-radius:3px; background:var(--bg-card); overflow:hidden; transition:border-color .3s,box-shadow .3s,transform .35s; cursor:default; }
  .proj-card:hover { transform:translateY(-6px); }
  .proj-img  { width:100%; height:100%; object-fit:cover; transition:transform .55s ease; }
  .proj-card:hover .proj-img { transform:scale(1.06); }
  .proj-badge { font-family:'JetBrains Mono',monospace; font-size:0.58rem; letter-spacing:0.1em; text-transform:uppercase; display:inline-flex; align-items:center; gap:4px; padding:3px 8px; border-radius:2px; position:absolute; top:12px; left:12px; z-index:3; }
  .proj-action { width:32px; height:32px; border-radius:2px; border:1px solid rgba(255,255,255,0.12); background:rgba(4,8,15,0.85); backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center; color:var(--text-secondary); text-decoration:none; transition:border-color .2s,color .2s,background .2s,transform .2s; }
  .proj-action:hover { transform:scale(1.1); }
  .proj-footer-link { font-family:'JetBrains Mono',monospace; font-size:0.68rem; letter-spacing:0.08em; display:inline-flex; align-items:center; gap:5px; text-decoration:none; transition:color .2s; }
  .proj-tag  { font-family:'JetBrains Mono',monospace; font-size:0.58rem; letter-spacing:0.08em; padding:2px 8px; border-radius:2px; border:1px solid; }
  .github-cta { font-family:'JetBrains Mono',monospace; font-size:0.72rem; letter-spacing:0.1em; text-transform:uppercase; display:inline-flex; align-items:center; gap:0.6rem; padding:0.85rem 2rem; border-radius:2px; border:1px solid var(--border); color:var(--text-secondary); text-decoration:none; background:transparent; transition:border-color .25s,color .25s,background .25s,box-shadow .25s,transform .25s; }
  .github-cta:hover { border-color:var(--accent); color:var(--accent-light); background:var(--accent-glow2); box-shadow:0 8px 30px var(--accent-glow); transform:translateY(-3px); }
`;

function ProjectCard({ project, index, sectionVisible }) {
  const [hovered, setHovered] = useState(false);
  const { emoji, accent, featured, title, category, description, image, tags, demoUrl, githubUrl } = project;
  const delay = Math.min(index * 0.07, 0.5);

  return (
    <div className="proj-card" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ borderColor: hovered ? `${accent}50` : "var(--border)", boxShadow: hovered ? `0 20px 60px rgba(0,0,0,.5),0 0 0 1px ${accent}20` : "none", opacity: sectionVisible ? 1 : 0, transform: sectionVisible ? hovered ? "translateY(-6px)" : "translateY(0)" : "translateY(28px)", transition: `opacity .65s ${delay}s ease,transform .65s ${delay}s ease,border-color .3s,box-shadow .3s` }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${accent},transparent)`, opacity: hovered ? 1 : 0, transition: "opacity .3s", zIndex: 2 }} />

      <div style={{ position: "relative", height: "200px", overflow: "hidden", background: "rgba(255,255,255,0.02)", flexShrink: 0 }}>
        {image && <img src={image} alt={title} className="proj-img" onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />}
        <div style={{ display: image ? "none" : "flex", position: "absolute", inset: 0, alignItems: "center", justifyContent: "center", fontSize: "4rem" }}>{emoji}</div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(10,15,26,1) 0%,rgba(10,15,26,.4) 55%,transparent 100%)" }} />
        {featured && <span className="proj-badge" style={{ background: accent, color: "#fff" }}><Star size={8} fill="currentColor" />Featured</span>}
        <span style={{ position: "absolute", bottom: 10, left: 12, zIndex: 3, fontFamily: "'JetBrains Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)" }}>{category}</span>
        <div style={{ position: "absolute", top: 10, right: 10, zIndex: 3, display: "flex", gap: "0.4rem", opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(-8px)", transition: "opacity .25s,transform .25s" }}>
          {demoUrl && demoUrl !== "#" && <a href={demoUrl} target="_blank" rel="noreferrer" className="proj-action" onMouseEnter={e => { e.currentTarget.style.background = accent; e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = "#fff"; }} onMouseLeave={e => { e.currentTarget.style.background = "rgba(4,8,15,0.85)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "var(--text-secondary)"; }}><ExternalLink size={13} /></a>}
          {githubUrl && githubUrl !== "#" && <a href={githubUrl} target="_blank" rel="noreferrer" className="proj-action" onMouseEnter={e => { e.currentTarget.style.background = accent; e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = "#fff"; }} onMouseLeave={e => { e.currentTarget.style.background = "rgba(4,8,15,0.85)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "var(--text-secondary)"; }}><Github size={13} /></a>}
        </div>
      </div>

      <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.75rem" }}>
          {tags.map(tag => <span key={tag} className="proj-tag" style={{ background: `${accent}10`, borderColor: `${accent}25`, color: accent }}>{tag}</span>)}
        </div>
        <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.3rem", letterSpacing: "0.04em", color: hovered ? "#fff" : "var(--text-primary)", marginBottom: "0.5rem", lineHeight: 1.1, transition: "color .25s" }}>{title}</h3>
        <p style={{ fontFamily: "'Outfit',sans-serif", textAlign: "justify", fontSize: "0.83rem", lineHeight: 1.65, color: "var(--text-muted)", flex: 1 }}>{description}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginTop: "1.1rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
          {demoUrl && demoUrl !== "#" && <a href={demoUrl} target="_blank" rel="noreferrer" className="proj-footer-link" style={{ color: accent }} onMouseEnter={e => { e.currentTarget.style.opacity = ".7"; }} onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}><ExternalLink size={11} />Live Demo</a>}
          {githubUrl && githubUrl !== "#" && <a href={githubUrl} target="_blank" rel="noreferrer" className="proj-footer-link" style={{ color: "var(--text-muted)" }} onMouseEnter={e => { e.currentTarget.style.color = "var(--text-primary)"; }} onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; }}><Github size={11} />Source Code</a>}
          <div style={{ marginLeft: "auto", height: 1, background: accent, borderRadius: 1, width: hovered ? 32 : 0, transition: "width 0.4s ease" }} />
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [secRef, secVisible] = useReveal(0.05);
  const reveal = (d = 0) => ({ opacity: secVisible ? 1 : 0, transform: secVisible ? "translateY(0)" : "translateY(24px)", transition: `opacity .75s ${d}s ease,transform .75s ${d}s ease` });

  return (
    <>
      <style>{PROJ_STYLES}</style>
      <section id="projects" ref={secRef} style={{ position: "relative", padding: "8rem 1.5rem", background: "var(--bg)", overflow: "hidden", fontFamily: "'Outfit',sans-serif" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(59,130,246,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.03) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", top: -100, right: -100, background: "radial-gradient(circle,rgba(59,130,246,0.1) 0%,transparent 70%)" }} />
          <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", bottom: 0, left: "15%", background: "radial-gradient(circle,rgba(147,197,253,0.06) 0%,transparent 70%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 10, maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3.5rem" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(3rem,7vw,6rem)", lineHeight: 0.95, letterSpacing: "0.03em", color: "var(--text-primary)", ...reveal(0.2) }}>
                Featured<br /><span style={{ color: "var(--accent)" }}>Work</span> &amp; Projects
              </h2>
              <p style={{ fontFamily: "'Outfit',sans-serif", textAlign: "left", fontSize: "0.9rem", lineHeight: 1.7, color: "var(--text-muted)", maxWidth: 380, ...reveal(0.3) }}>
                Things I've built from AI systems to full-stack platforms. Clean architecture, performance, and real-world impact.
              </p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: "1rem" }}>
            {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} sectionVisible={secVisible} />)}
          </div>

          <div style={{ textAlign: "center", marginTop: "4rem", ...reveal(0.5) }}>
            <a href="https://github.com/vinudasenith" target="_blank" rel="noreferrer" className="github-cta">
              <Github size={15} />View All Projects on GitHub<ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}