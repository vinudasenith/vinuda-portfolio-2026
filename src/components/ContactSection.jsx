import { Instagram, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "ha.vinudas@gmail.com",
    href: "mailto:ha.vinudas@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+94 717 443 956",
    href: "tel:+94717443956",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Colombo, Sri Lanka",
    href: null,
  },
];

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-indigo-500 mb-3">
            Contact
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Get In Touch
          </h2>
          <p className="mt-3 text-gray-400 text-sm">
            Have a project in mind or want to collaborate? I'm always open to new opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* ── Left: Info + Socials ── */}
          <div className="flex flex-col justify-between gap-8">

            {/* Contact info cards */}
            <div className="space-y-3">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-indigo-100 hover:shadow-sm transition-all duration-200"
                >
                  <div className="shrink-0 w-9 h-9 flex items-center justify-center rounded-md bg-indigo-50">
                    <Icon className="w-4 h-4 text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-semibold text-gray-800 hover:text-indigo-500 transition-colors duration-200 no-underline"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-gray-800">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="bg-gray-50 rounded-xl border border-gray-100 p-7">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-3 py-10">
                <div className="w-11 h-11 rounded-full bg-indigo-50 flex items-center justify-center mb-1">
                  <Send className="w-5 h-5 text-indigo-500" />
                </div>
                <h3 className="text-gray-900 font-bold text-lg">Message Sent!</h3>
                <p className="text-gray-400 text-sm max-w-xs">
                  Thanks for reaching out. I'll get back to you soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-xs font-semibold text-indigo-500 hover:text-indigo-700 transition-colors duration-200 bg-transparent border-0 cursor-pointer"
                >
                  ← Send another message
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-gray-900 font-bold text-base mb-6">Send a Message</h3>

                <form onSubmit={handleSubmit} className="space-y-4">

                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-gray-500 mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="w-full bg-white border border-gray-200 rounded-md px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-indigo-400 transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-gray-500 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      className="w-full bg-white border border-gray-200 rounded-md px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-indigo-400 transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-gray-500 mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Hello, I'd like to talk about..."
                      className="w-full bg-white border border-gray-200 rounded-md px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-indigo-400 transition-colors duration-200 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-2.5 rounded-md transition-colors duration-200 border-0 cursor-pointer"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send size={14} />
                  </button>

                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}