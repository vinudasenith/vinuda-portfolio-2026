/**
 * HeroSection.jsx — Ultra-premium hero section — BLUE & WHITE THEME
 * VS portfolio design system · Blue (#3b82f6) + White/light palette only
 *
 * Dependencies: lucide-react, tailwindcss (core utilities only)
 * Google Fonts: Bebas Neue + Outfit + JetBrains Mono
 */

import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import yourPhoto from "../assets/your-photo.jpg";
// import yourPhoto from "../assets/your-photo.jpg";

/* ─────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────── */
function useCountUp(target, duration = 1600) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        setVal(Math.floor(ease * target));
        if (t < 1) requestAnimationFrame(tick);
        else setVal(target);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);
  return [val, ref];
}

function useTypewriter(words, speed = 80, pause = 2200) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx];
    const delay = deleting ? speed / 2 : charIdx === current.length ? pause : speed;
    const t = setTimeout(() => {
      if (!deleting && charIdx < current.length) { setDisplay(current.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }
      else if (!deleting && charIdx === current.length) { setDeleting(true); }
      else if (deleting && charIdx > 0) { setDisplay(current.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }
      else { setDeleting(false); setWordIdx(i => (i + 1) % words.length); }
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return display;
}

/* ─────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────── */
const ROLES = ["Full-Stack Developer", "AI / ML Enthusiast", "Software Engineer"];

const STATS = [
  { count: 6, suffix: "+", label: "Projects Shipped" },
  { count: 12, suffix: "+", label: "Technologies" },
];

const CHIPS = ["Next.js", "React", "JavaScript", "Node.js", "PostgreSQL", "Python", "Java"];

const SOCIALS = [
  { Icon: Github, href: "https://github.com/", label: "GitHub" },
  { Icon: Linkedin, href: "https://linkedin.com/in/", label: "LinkedIn" },
  { Icon: Mail, href: "mailto:you@example.com", label: "Email" },
];

/* ─────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────── */
export const HeroSection = () => {
  const role = useTypewriter(ROLES);
  const [c0, r0] = useCountUp(STATS[0].count);
  const [c1, r1] = useCountUp(STATS[1].count);
  const counts = [[c0, r0], [c1, r1]];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          --bg:           #04080f;
          --bg-card:      #0a0f1a;
          --bg-card-alt:  #0d1320;
          --border:       rgba(255,255,255,0.07);
          --border-accent:rgba(59,130,246,0.35);

          /* Blue accent scale */
          --accent:       #3b82f6;   /* blue-500   */
          --accent-dim:   #2563eb;   /* blue-600   */
          --accent-light: #93c5fd;   /* blue-300   */
          --accent-glow:  rgba(59,130,246,0.2);
          --accent-glow2: rgba(59,130,246,0.08);

          /* White/grey text scale */
          --text-primary:   #f8faff;
          --text-secondary: #94a3b8;
          --text-muted:     #475569;
        }

        .font-display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; }
        .font-body    { font-family: 'Outfit', sans-serif; }
        .font-mono    { font-family: 'JetBrains Mono', monospace; }

        @keyframes blobDrift   { to { transform: translate(60px,40px) scale(1.08); } }
        @keyframes fadeUp      { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn      { from { opacity:0; } to { opacity:1; } }
        @keyframes blinkCursor { 50% { opacity:0; } }
        @keyframes rotateBdr   { to { transform:rotate(360deg); } }
        @keyframes pulseBlue   {
          0%,100% { box-shadow:0 0 0 0 rgba(59,130,246,0.5); }
          50%     { box-shadow:0 0 0 10px rgba(59,130,246,0); }
        }
        @keyframes scrollDrop {
          0%   { opacity:0; transform:translateY(-6px); }
          50%  { opacity:1; }
          100% { opacity:0; transform:translateY(6px); }
        }

        /* --- Chip --- */
        .vs-chip {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.67rem;
          letter-spacing: 0.08em;
          padding: 4px 12px;
          border-radius: 2px;
          border: 1px solid var(--border);
          color: var(--text-muted);
          background: transparent;
          cursor: default;
          transition: border-color .2s, color .2s, background .2s;
        }
        .vs-chip:hover {
          border-color: var(--accent);
          color: var(--accent-light);
          background: var(--accent-glow2);
        }

        /* --- CTA primary --- */
        .vs-cta-primary {
          position: relative; overflow: hidden;
          background: var(--accent); color: #fff;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 0.875rem 2rem;
          border-radius: 2px;
          display: inline-flex; align-items: center; gap: 0.5rem;
          text-decoration: none;
          transition: transform .25s, box-shadow .25s;
        }
        .vs-cta-primary::after {
          content: ''; position: absolute; inset: 0;
          background: rgba(255,255,255,0.14);
          transform: translateX(-110%) skewX(-12deg);
          transition: transform .4s;
        }
        .vs-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 40px var(--accent-glow); }
        .vs-cta-primary:hover::after { transform: translateX(110%) skewX(-12deg); }

        /* --- CTA ghost --- */
        .vs-cta-ghost {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 0.875rem 2rem;
          border-radius: 2px;
          border: 1px solid var(--border);
          color: var(--text-secondary);
          display: inline-flex; align-items: center; gap: 0.5rem;
          text-decoration: none;
          transition: border-color .25s, color .25s, background .25s;
        }
        .vs-cta-ghost:hover { border-color: var(--accent); color: var(--accent-light); background: var(--accent-glow2); }

        /* --- Social btn --- */
        .vs-social {
          width: 40px; height: 40px;
          border-radius: 2px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text-muted);
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
          transition: border-color .2s, color .2s, background .2s, transform .2s;
        }
        .vs-social:hover {
          border-color: var(--accent);
          color: var(--accent-light);
          background: var(--accent-glow2);
          transform: translateY(-3px);
        }

        /* --- Avail pill --- */
        .vs-avail-pill {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase;
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.35rem 0.9rem;
          border-radius: 2px;
          border: 1px solid var(--border-accent);
          color: var(--accent-light);
          background: var(--accent-glow2);
        }

        /* --- Status dot --- */
        .vs-status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #60a5fa;
          flex-shrink: 0;
          animation: pulseBlue 2s ease infinite;
        }

        /* --- Stat value --- */
        .vs-stat-val {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2rem,4vw,2.75rem);
          line-height: 1;
          color: var(--accent);
        }
        .vs-stat-val span { color: var(--accent-dim); font-size: 0.6em; }

        /* --- Badge number watermark --- */
        .vs-watermark {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 7rem; line-height: 1;
          color: rgba(255,255,255,0.025);
          pointer-events: none; user-select: none;
          position: absolute; top: -1rem; right: 1.5rem;
        }
      `}</style>

      {/* ══════════════════════════════════════════
          SECTION
      ══════════════════════════════════════════ */}
      <section
        id="hero"
        className="font-body relative min-h-screen flex flex-col justify-start overflow-hidden"
        style={{ background: "var(--bg)" }}
      >

        {/* Grid overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px)," +
              "linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        {/* Ambient blobs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute rounded-full" style={{ width: 720, height: 720, top: "-200px", right: "-160px", background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)", animation: "blobDrift 18s ease-in-out infinite alternate" }} />
          <div className="absolute rounded-full" style={{ width: 560, height: 560, bottom: "-120px", left: "-100px", background: "radial-gradient(circle, rgba(147,197,253,0.08) 0%, transparent 70%)", animation: "blobDrift 22s ease-in-out infinite alternate-reverse" }} />
        </div>

        {/* ── Main grid ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 pt-28 pb-20">
          <div className="grid lg:grid-cols-[1fr_340px] gap-12 xl:gap-20 items-start">

            {/* ══ LEFT ══ */}
            <div>

              {/* Eyebrow */}
              <div
                className="flex items-center gap-3 mb-6"
                style={{ animation: "fadeUp .7s .3s both" }}
              >
                <span style={{ width: "1.5px", height: 12, background: "var(--border)", display: "block" }} />
              </div>

              {/* Name */}
              <h1
                className="font-display text-left leading-none mb-4"
                style={{ fontSize: "clamp(4.5rem,10vw,9rem)", color: "var(--text-primary)", animation: "fadeUp .8s .45s both" }}
              >
                Vinuda
                <br />
                <span style={{ color: "var(--accent)" }}>Senith</span>
                <span style={{ color: "var(--accent)" }}>.</span>
              </h1>

              {/* Description */}
              <p
                className="font-body leading-relaxed max-w-[540px] mb-10 text-justify"
                style={{
                  fontSize: "1rem",
                  color: "var(--text-secondary)",
                  animation: "fadeUp .8s .68s both"
                }}
              >
                I design and build{" "}
                <strong
                  style={{
                    color: "var(--text-primary)",
                    fontWeight: 600
                  }}
                >
                  intelligent full-stack applications and AI-powered solutions
                </strong>{" "}
                that solve real-world problems. Focused on{" "}
                <strong
                  style={{
                    color: "var(--text-primary)",
                    fontWeight: 600
                  }}
                >
                  clean architecture, scalable systems, and measurable impact
                </strong>
                , I create products that are both technically robust and user-centered.
              </p>


              {/* Tech chips */}
              <div className="flex flex-wrap gap-2 mb-10" style={{ animation: "fadeUp .8s .78s both" }}>
                {CHIPS.map(c => (
                  <span key={c} className="vs-chip">{c}</span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-3 flex-wrap mb-16" style={{ animation: "fadeUp .8s .88s both" }}>
                <a href="#projects" className="vs-cta-primary">
                  View Projects <ArrowUpRight size={14} />
                </a>
                <a href="/resume.pdf" download className="vs-cta-ghost">Résumé ↓</a>
              </div>

              {/* Stats */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-6"
                style={{ borderTop: "1px solid var(--border)", paddingTop: "2.5rem", animation: "fadeUp .8s 1s both" }}
              >
                {STATS.map((s, i) => (
                  <div key={s.label} ref={counts[i][1]} className="flex flex-col gap-1">
                    <div className="vs-stat-val">
                      {counts[i][0]}<span>{s.suffix}</span>
                    </div>
                    <div className="font-mono uppercase tracking-widest" style={{ fontSize: "0.62rem", color: "var(--text-muted)" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ══ RIGHT — Avatar ══ */}
            <div className="flex flex-col items-center gap-6 lg:pt-12" style={{ animation: "fadeIn .9s .5s both" }}>

              {/* Rotating border frame */}
              <div className="relative">
                <div
                  className="absolute -inset-[3px]"
                  style={{
                    background: "conic-gradient(#3b82f6 0deg, rgba(59,130,246,0.06) 90deg, transparent 180deg, #3b82f6 360deg)",
                    animation: "rotateBdr 6s linear infinite",
                    borderRadius: "4px",
                  }}
                />
                <div
                  className="relative w-[280px] md:w-[300px] aspect-square overflow-hidden flex items-center justify-center"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "3px" }}
                >

                  {/*Swap with your photo*/}
                  <img src={yourPhoto} alt="Vinuda Senith" className="w-full h-full object-cover object-top" />

                  {/* Online dot */}
                  <span
                    className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full"
                    style={{ background: "#3b82f6", border: "2px solid var(--bg)", animation: "pulseBlue 2.5s ease infinite" }}
                  />
                </div>

                {/* Online dot */}
                <span
                  className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full"
                  style={{ background: "#3b82f6", border: "2px solid var(--bg)", animation: "pulseBlue 2.5s ease infinite" }}
                />
              </div>

              {/* Social icons */}
              <div className="flex gap-2 mt-2">
                {SOCIALS.map(({ Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="vs-social">
                    <Icon size={15} />
                  </a>
                ))}
              </div>

              {/* Availability card */}
              <div
                className="w-full px-5 py-4"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "3px" }}
              >
                <p className="font-mono text-[0.62rem] tracking-[0.12em] uppercase mb-2" style={{ color: "var(--text-muted)" }}>
                  Current Status
                </p>
                <p className="font-body text-[0.9rem]" style={{ color: "var(--text-primary)" }}>
                  Available for full-time roles &amp; select freelance projects.
                </p>
                <a
                  href="mailto:you@example.com"
                  className="font-mono text-[0.72rem] tracking-[0.08em] mt-3 inline-flex items-center gap-1"
                  style={{ color: "var(--accent)", textDecoration: "none", opacity: 1, transition: "opacity .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.7"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                >
                  Let's talk <ArrowUpRight size={12} />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ animation: "fadeIn 1s 1.6s both" }}
        >
          <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase" style={{ color: "var(--text-muted)" }}>Scroll</span>
          <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, var(--accent), transparent)", animation: "scrollDrop 1.8s ease infinite" }} />
        </div>

      </section>
    </>
  );
};

export default HeroSection;