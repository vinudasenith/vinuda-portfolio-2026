/**
 * ContactSection.jsx — Blue & White Theme
 * VS portfolio design system · Blue (#3b82f6) + White palette only
 * EmailJS integrated — replace placeholder IDs with your real ones from emailjs.com
 */
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, CheckCircle2, AlertCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

// ─── EmailJS Configuration ────────────────────────────────────────────────────
// Replace these with your real credentials from https://emailjs.com
// Store in .env as VITE_EJS_SERVICE_ID etc. for production
const EJS = {
  serviceId: import.meta.env.VITE_EJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EJS_PUBLIC_KEY,
};
// ─────────────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.08) {
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

const CONTACT_INFO = [
  { Icon: Mail, label: "Email", value: "ha.vinudas@gmail.com", href: "mailto:ha.vinudas@gmail.com", accent: "#3b82f6" },
  { Icon: Phone, label: "Phone", value: "+94 717 443 956", href: "tel:+94717443956", accent: "#60a5fa" },
  { Icon: MapPin, label: "Location", value: "Colombo, Sri Lanka", href: null, accent: "#93c5fd" },
];

const SOCIALS = [
  { Icon: Github, label: "GitHub", href: "https://github.com/vinudasenith", accent: "#bfdbfe" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/", accent: "#60a5fa" },
  { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/vinuda_senith/", accent: "#93c5fd" },
  { Icon: Mail, label: "Email", href: "mailto:ha.vinudas@gmail.com", accent: "#3b82f6" },
];

const VALIDATORS = {
  name: v => v.trim().length >= 2,
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  subject: v => v.trim().length >= 3,
  message: v => v.trim().length >= 10,
};
const ERRORS = {
  name: "Please enter your name (min 2 chars).",
  email: "Please enter a valid email address.",
  subject: "Please enter a subject.",
  message: "Message must be at least 10 characters.",
};
const INIT_FORM = { name: "", email: "", subject: "", message: "" };
const INIT_ERRORS = { name: "", email: "", subject: "", message: "" };
const INIT_TOUCHED = { name: false, email: false, subject: false, message: false };

const CONTACT_STYLES = `
  .c-info-card{display:flex;align-items:center;gap:1rem;padding:1rem 1.1rem;border:1px solid var(--border);border-radius:3px;background:var(--bg-card);text-decoration:none;transition:border-color .25s,background .25s,transform .25s;cursor:default;}
  a.c-info-card{cursor:pointer;}
  .c-info-card:hover{background:rgba(59,130,246,0.04);transform:translateX(5px);}
  .c-info-icon{width:40px;height:40px;border-radius:2px;display:flex;align-items:center;justify-content:center;flex-shrink:0;border:1px solid var(--border);background:rgba(255,255,255,0.04);transition:background .25s,border-color .25s;}
  .c-social{width:40px;height:40px;border-radius:2px;border:1px solid var(--border);background:transparent;display:flex;align-items:center;justify-content:center;color:var(--text-muted);text-decoration:none;transition:border-color .2s,color .2s,background .2s,transform .2s;}
  .c-social:hover{transform:translateY(-4px);}
  .form-card{position:relative;border:1px solid var(--border);border-radius:3px;background:var(--bg-card);padding:2rem;overflow:hidden;}
  .form-input{width:100%;border-radius:2px;padding:0.7rem 0.9rem;font-family:'Outfit',sans-serif;font-size:0.88rem;color:var(--text-primary);background:rgba(255,255,255,0.03);border:1px solid var(--border);outline:none;resize:none;transition:border-color .2s,box-shadow .2s,background .2s;box-sizing:border-box;}
  .form-input::placeholder{color:var(--text-muted);}
  .form-input:focus{border-color:rgba(59,130,246,0.6);background:rgba(59,130,246,0.04);box-shadow:0 0 0 3px rgba(59,130,246,0.1);}
  .form-input.valid{border-color:rgba(34,197,94,0.5);}
  .form-input.error{border-color:rgba(239,68,68,0.6);}
  .submit-btn{position:relative;width:100%;display:flex;align-items:center;justify-content:center;gap:0.5rem;font-family:'JetBrains Mono',monospace;font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;padding:0.9rem;border-radius:2px;border:none;background:var(--accent);color:#fff;cursor:pointer;overflow:hidden;transition:background .2s,box-shadow .2s,transform .2s;}
  .submit-btn:not(:disabled):hover{background:var(--accent-dim);box-shadow:0 8px 30px var(--accent-glow);transform:translateY(-2px);}
  .submit-btn:disabled{opacity:.65;cursor:not-allowed;}
  .submit-btn::after{content:'';position:absolute;inset:0;background:rgba(255,255,255,0.15);transform:translateX(-110%) skewX(-12deg);transition:transform .45s;}
  .submit-btn:not(:disabled):hover::after{transform:translateX(110%) skewX(-12deg);}
  .avail-pill{display:flex;align-items:center;gap:0.75rem;padding:0.9rem 1.1rem;border:1px solid rgba(59,130,246,0.25);border-radius:3px;background:rgba(59,130,246,0.06);}
  .error-banner{display:flex;align-items:center;gap:0.6rem;padding:0.75rem 1rem;border:1px solid rgba(239,68,68,0.35);border-radius:2px;background:rgba(239,68,68,0.06);margin-bottom:1rem;}
  @keyframes spinLoader{to{transform:rotate(360deg);}}
`;

function InfoCard({ Icon, label, value, href, accent }) {
  const Tag = href ? "a" : "div";
  return (
    <Tag
      href={href || undefined}
      className="c-info-card"
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${accent}50`;
        e.currentTarget.querySelector(".c-info-icon").style.background = `${accent}15`;
        e.currentTarget.querySelector(".c-info-icon").style.borderColor = `${accent}40`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.querySelector(".c-info-icon").style.background = "rgba(255,255,255,0.04)";
        e.currentTarget.querySelector(".c-info-icon").style.borderColor = "var(--border)";
      }}
    >
      <div className="c-info-icon"><Icon size={16} style={{ color: accent }} /></div>
      <div>
        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: accent, marginBottom: "0.2rem" }}>{label}</p>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.88rem", color: "var(--text-secondary)", fontWeight: 500 }}>{value}</p>
      </div>
    </Tag>
  );
}

function SocialRow() {
  return (
    <div style={{ display: "flex", gap: "0.6rem", marginTop: "1rem" }}>
      {SOCIALS.map(({ Icon, label, href, accent }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="c-social"
          onMouseEnter={e => { e.currentTarget.style.borderColor = `${accent}60`; e.currentTarget.style.color = accent; e.currentTarget.style.background = `${accent}10`; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.background = "transparent"; }}
        >
          <Icon size={15} />
        </a>
      ))}
    </div>
  );
}

function FormField({ label, id, name, type, placeholder, value, onChange, onBlur, error, touched, rows }) {
  const [focused, setFocused] = useState(false);
  const hasError = touched && error;
  const isValid = touched && !error && value.length > 0;
  const cls = `form-input${hasError ? " error" : isValid ? " valid" : ""}`;
  return (
    <div>
      <label htmlFor={id} style={{ display: "block", fontFamily: "'JetBrains Mono',monospace", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: hasError ? "#ef4444" : "var(--text-muted)", marginBottom: "0.4rem" }}>
        {label}
      </label>
      {type === "textarea"
        ? <textarea id={id} name={name} placeholder={placeholder} value={value} rows={rows || 4} onChange={onChange} onFocus={() => setFocused(true)} onBlur={e => { setFocused(false); onBlur(e); }} className={cls} />
        : <input id={id} name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={e => { setFocused(false); onBlur(e); }} className={cls} />}
      {hasError && (
        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.06em", color: "#ef4444", marginTop: "0.4rem" }}>{error}</p>
      )}
    </div>
  );
}

function SuccessState({ onReset }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "3rem 1rem", gap: "1rem" }}>
      <div style={{ width: 60, height: 60, borderRadius: "3px", border: "1px solid rgba(59,130,246,0.3)", background: "rgba(59,130,246,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CheckCircle2 size={26} style={{ color: "#3b82f6" }} />
      </div>
      <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2rem", letterSpacing: "0.05em", color: "var(--text-primary)" }}>Message Sent!</h3>
      <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.88rem", color: "var(--text-muted)", maxWidth: 280, lineHeight: 1.65 }}>
        Thanks for reaching out. I'll get back to you within 24 hours.
      </p>
      <button
        onClick={onReset}
        style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", background: "none", border: "none", cursor: "pointer", marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "0.4rem", transition: "opacity 0.2s" }}
        onMouseEnter={e => { e.currentTarget.style.opacity = "0.65"; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
      >
        ← Send another
      </button>
    </div>
  );
}

function ErrorBanner({ message }) {
  return (
    <div className="error-banner">
      <AlertCircle size={15} style={{ color: "#ef4444", flexShrink: 0 }} />
      <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.65rem", letterSpacing: "0.06em", color: "#ef4444", margin: 0 }}>{message}</p>
    </div>
  );
}

export default function ContactSection() {
  const [secRef, secVisible] = useReveal(0.05);
  const [form, setForm] = useState(INIT_FORM);
  const [errors, setErrors] = useState(INIT_ERRORS);
  const [touched, setTouched] = useState(INIT_TOUCHED);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");

  const validateField = (name, value) => VALIDATORS[name](value) ? "" : ERRORS[name];

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (touched[name]) setErrors(er => ({ ...er, [name]: validateField(name, value) }));
  };

  const handleBlur = e => {
    const { name, value } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    setErrors(er => ({ ...er, [name]: validateField(name, value) }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSendError("");

    // Validate all fields
    const newErrors = Object.fromEntries(Object.keys(form).map(k => [k, validateField(k, form[k])]));
    setTouched({ name: true, email: true, subject: true, message: true });
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    setSending(true);

    // ── EmailJS send ──────────────────────────────────────────────────────────
    // Template variables sent to EmailJS:
    //   {{name}}    → sender's name
    //   {{email}}   → sender's email (set as reply-to in your template)
    //   {{subject}} → email subject
    //   {{message}} → message body
    // These must match the variable names inside your EmailJS template exactly.
    emailjs
      .send(
        EJS.serviceId,
        EJS.templateId,
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        },
        EJS.publicKey
      )
      .then(() => {
        setSending(false);
        setSent(true);
      })
      .catch(err => {
        console.error("EmailJS error:", err);
        setSending(false);
        setSendError("Something went wrong. Please try again or email me directly.");
      });
    // ─────────────────────────────────────────────────────────────────────────
  };

  const handleReset = () => {
    setForm(INIT_FORM);
    setErrors(INIT_ERRORS);
    setTouched(INIT_TOUCHED);
    setSent(false);
    setSendError("");
  };

  const reveal = (d = 0, axis = "Y") => ({
    opacity: secVisible ? 1 : 0,
    transform: secVisible ? "translate(0,0)" : axis === "X-" ? "translateX(-24px)" : axis === "X+" ? "translateX(24px)" : "translateY(24px)",
    transition: `opacity .75s ${d}s ease,transform .75s ${d}s ease`,
  });

  return (
    <>
      <style>{CONTACT_STYLES}</style>
      <section
        id="contact"
        ref={secRef}
        style={{ position: "relative", padding: "8rem 1.5rem", background: "var(--bg)", overflow: "hidden", fontFamily: "'Outfit',sans-serif" }}
      >
        {/* Grid background */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(59,130,246,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.03) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />

        {/* Glow blobs */}
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", width: 550, height: 550, borderRadius: "50%", bottom: -100, left: -80, background: "radial-gradient(circle,rgba(59,130,246,0.1) 0%,transparent 70%)" }} />
          <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", top: 0, right: -60, background: "radial-gradient(circle,rgba(147,197,253,0.06) 0%,transparent 70%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 10, maxWidth: "1200px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: "3.5rem" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(3rem,7vw,6rem)", lineHeight: 0.95, letterSpacing: "0.03em", color: "var(--text-primary)", ...reveal(0.2) }}>
                Let's Build<br />Something <span style={{ color: "var(--accent)" }}>Great</span>
              </h2>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.9rem", textAlign: "justify", lineHeight: 1.7, color: "var(--text-muted)", maxWidth: 380, ...reveal(0.3) }}>
                I'm actively looking for new opportunities. Whether you have a project, want to collaborate, or just want to say hi — my inbox is always open.
              </p>
            </div>
          </div>

          {/* Two-column grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }} className="lg:grid-cols-[1fr_1.15fr]">

            {/* ── LEFT: Contact Info + Socials ── */}
            <div style={reveal(0.25, "X-")}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem" }}>
                {CONTACT_INFO.map(item => <InfoCard key={item.label} {...item} />)}
              </div>
            </div>

            {/* ── RIGHT: Contact Form ── */}
            <div className="form-card" style={reveal(0.32, "X+")}>
              {/* Top accent line */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,var(--accent),transparent)" }} />

              {sent ? (
                <SuccessState onReset={handleReset} />
              ) : (
                <>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.6rem", letterSpacing: "0.05em", color: "var(--text-primary)", marginBottom: "0.25rem" }}>Send a Message</h3>
                    <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>I typically reply within 24 hours</p>
                  </div>
                  <div style={{ height: 1, background: "var(--border)", marginBottom: "1.5rem" }} />

                  {/* Error banner (shown when EmailJS send fails) */}
                  {sendError && <ErrorBanner message={sendError} />}

                  <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <FormField label="Name" id="name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} onBlur={handleBlur} error={errors.name} touched={touched.name} />
                      <FormField label="Email" id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} onBlur={handleBlur} error={errors.email} touched={touched.email} />
                    </div>
                    <FormField label="Subject" id="subject" name="subject" type="text" placeholder="What's this about?" value={form.subject} onChange={handleChange} onBlur={handleBlur} error={errors.subject} touched={touched.subject} />
                    <FormField label="Message" id="message" name="message" type="textarea" placeholder="Tell me about your project, idea, or just say hello..." value={form.message} onChange={handleChange} onBlur={handleBlur} error={errors.message} touched={touched.message} rows={5} />

                    <button type="submit" disabled={sending} className="submit-btn" style={{ marginTop: "0.5rem" }}>
                      {sending ? (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spinLoader 0.8s linear infinite" }}>
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>Send Message <Send size={13} /></>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Ping animation for availability dot */}
        <style>{`@keyframes ping{0%{transform:scale(1);opacity:.75}75%,100%{transform:scale(2.2);opacity:0}}`}</style>
      </section>
    </>
  );
}