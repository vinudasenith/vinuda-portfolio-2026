import { Github, Linkedin, Instagram } from "lucide-react";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/vinudasenith" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/vinudasenith/" },
  { icon: Instagram, label: "Instagram", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 px-4 py-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Copyright */}
        <p className="text-xs text-gray-400">
          &copy; 2026 - All rights reserved by Vinuda Senith
        </p>

        {/* Social icons */}
        <div className="flex gap-3">
          {socials.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:border-indigo-300 hover:text-indigo-500 transition-all duration-200"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
