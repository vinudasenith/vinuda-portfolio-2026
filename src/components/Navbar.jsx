import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled
          ? "py-3 bg-white/90 backdrop-blur-md shadow-sm"
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center px-4 relative">
        {/* Desktop nav */}
        <div className="hidden md:flex space-x-4">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="relative px-4 py-2 rounded transition-all duration-300 font-medium text-black hover:text-white hover:bg-blue-600"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile nav button */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-black z-50 absolute right-4"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile menu */}
        <div
          className={cn(
            "fixed inset-0 bg-white/95 backdrop-blur-md z-40 flex flex-col items-center justify-center transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-4 text-xl">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="relative px-6 py-3 rounded transition-all duration-300 text-black hover:text-white hover:bg-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
