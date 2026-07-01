import { useEffect, useState, type MouseEvent } from "react";
import { Menu, X } from "lucide-react";
import { LogoMark } from "./ui-kit";

const links = [
  { label: "Vision", href: "#vision" },
  { label: "Solution", href: "#solution" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap", href: "#roadmap" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links.map((l) => document.querySelector(l.href));

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Trigger when section is in the viewport center
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) {
            setActiveSection(`#${id}`);
          }
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - 80;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setOpen(false);
  };

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <div
          className={`flex w-full items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 ${
            scrolled ? "sol-glass shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]" : ""
          }`}
          style={scrolled ? { background: "rgba(7, 11, 20, 0.8)" } : undefined}
        >
          {/* Logo */}
          <a
            href="#top"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5"
          >
            <LogoMark />
            <span className="text-lg font-bold tracking-tight">
              Sol<span className="sol-gradient-text">Trust</span>
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleLinkClick(e, l.href)}
                className={`text-sm font-medium transition-colors duration-300 ${
                  activeSection === l.href
                    ? "text-[#14F1D9]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="mx-auto mt-3 max-w-7xl px-5 lg:hidden sm:px-8">
          <div
            className="sol-glass flex flex-col gap-1 rounded-2xl p-4"
            style={{ background: "rgba(7, 11, 20, 0.8)" }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleLinkClick(e, l.href)}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                  activeSection === l.href
                    ? "bg-gradient-to-r from-[#9945FF]/10 to-[#14F1D9]/5 text-[#14F1D9] font-semibold"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
