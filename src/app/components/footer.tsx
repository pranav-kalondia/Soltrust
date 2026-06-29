import { useState } from "react";
import {
  Send,
  MessageCircle,
  Twitter,
  Github,
  BookOpen,
  ArrowRight,
} from "lucide-react";

const columns = [
  {
    title: "Company",
    links: ["Vision", "Roadmap", "Tokenomics", "Community"],
  },
  {
    title: "Resources",
    links: ["Whitepaper", "Documentation", "Audits", "Brand Kit"],
  },
  {
    title: "Legal",
    links: ["Terms of Service", "Privacy Policy", "Risk Disclosure", "Cookies"],
  },
];

const socials = [
  { icon: Send, label: "Telegram" },
  { icon: MessageCircle, label: "Discord" },
  { icon: Twitter, label: "Twitter / X" },
  { icon: Github, label: "GitHub" },
  { icon: BookOpen, label: "Medium" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#9945FF]/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-6">
          {/* Brand + newsletter */}
          <div className="col-span-2 lg:col-span-2">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#9945FF] to-[#14F1D9]">
                <span className="h-3.5 w-3.5 rounded-sm bg-[#070B14]" />
              </span>
              <span className="text-lg font-bold tracking-tight">
                Sol<span className="sol-gradient-text">Trust</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The community-owned, AI-powered Digital Asset Treasury built on
              Solana.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSent(true);
              }}
              className="mt-6 flex max-w-sm items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={sent ? "Subscribed!" : "Your email"}
                  disabled={sent}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition-all focus:border-[#9945FF]/60 focus:bg-white/[0.06]"
                />
              </div>
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#9945FF] to-[#14F1D9] text-white transition-transform hover:scale-105"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold">Community</h4>
            <ul className="mt-4 space-y-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href="#"
                    className="group inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <s.icon className="h-4 w-4 text-[#14F1D9] transition-transform group-hover:scale-110" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] py-7 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 SolTrust — Community-Owned Digital Asset Treasury
          </p>
          <p className="text-xs text-muted-foreground/70">
            Not financial advice. Always DYOR.
          </p>
        </div>
      </div>
    </footer>
  );
}
