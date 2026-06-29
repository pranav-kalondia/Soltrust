import {
  BrainCircuit,
  Blocks,
  LineChart,
  Users,
  AlertTriangle,
  Scale,
  FileCode2,
  Search,
} from "lucide-react";
import { Reveal, SectionHeading } from "./ui-kit";

const team = [
  { icon: BrainCircuit, name: "Dr. Ada Mercer", role: "AI Experts", image: "/ada.png" },
  { icon: Blocks, name: "Kai Nakamura", role: "Blockchain Engineers", image: "/kai.png" },
  { icon: LineChart, name: "Sofia Reyes", role: "Forex Experts", image: "/sofia.png" },
  { icon: Users, name: "Marco Devlin", role: "DAO Contributors", image: "/marco.png" },
];

const risks = [
  { icon: AlertTriangle, title: "Market Volatility", desc: "Digital asset prices can move sharply. Never invest more than you can afford to lose." },
  { icon: Scale, title: "Regulatory Risks", desc: "Evolving global regulation may affect availability and functionality in some jurisdictions." },
  { icon: FileCode2, title: "Smart Contract Risks", desc: "Contracts are audited, but no on-chain system is entirely risk-free." },
  { icon: Search, title: "DYOR Notice", desc: "This is not financial advice. Always do your own research before participating." },
];

export function TeamRisks() {
  return (
    <>
      {/* ── Team Section ── */}
      <section id="team" className="relative py-28">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="The Team"
              title="Builders behind"
              highlight="SolTrust"
              align="center"
              subtitle="A multidisciplinary core spanning AI, blockchain, global markets and decentralized governance."
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 80}>
                <div className="group sol-glass flex h-full items-center gap-4 rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1 hover:border-white/20">
                  <div className="relative h-14 w-14 flex-shrink-0">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#9945FF] to-[#14F1D9] opacity-60 blur-md transition-opacity group-hover:opacity-100" />
                    <img
                      src={m.image}
                      alt={m.name}
                      className="relative h-14 w-14 rounded-2xl object-cover border border-white/10"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{m.name}</h3>
                    <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <m.icon className="h-3.5 w-3.5 text-[#14F1D9]" />
                      {m.role}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Risk Disclaimer Section ── */}
      <section id="risks" className="relative py-28">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal delay={120}>
            <div className="sol-glass rounded-3xl p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10 ring-1 ring-amber-400/20">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                </span>
                <h3 className="text-xl font-bold tracking-tight">Risk Disclaimer</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-2xl">
                Participation in digital asset projects carries inherent risk.
                Please review the following before joining the SolTrust treasury.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {risks.map((r) => (
                  <div
                    key={r.title}
                    className="flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
                  >
                    <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.04]">
                      <r.icon className="h-4 w-4 text-amber-400" />
                    </span>
                    <div>
                      <h4 className="font-semibold">{r.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {r.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
