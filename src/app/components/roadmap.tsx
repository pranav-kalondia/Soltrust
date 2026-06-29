import { Rocket, Cpu, Building2, CheckCircle2 } from "lucide-react";
import { Reveal, SectionHeading } from "./ui-kit";

const phases = [
  {
    icon: Rocket,
    phase: "Phase 1",
    title: "Launch",
    status: "In Progress",
    items: ["Public launch & presale", "Community & referral program", "Initial transaction burns", "Liquidity bootstrap"],
  },
  {
    icon: Cpu,
    phase: "Phase 2",
    title: "Decentralize",
    status: "Q3 2026",
    items: ["DAO governance live", "AI treasury automation", "Revenue-driven burns", "Tier-1 CEX listing"],
  },
  {
    icon: Building2,
    phase: "Phase 3",
    title: "Expand",
    status: "2027",
    items: ["Institutional partnerships", "Treasury expansion", "Multi-asset support", "Continuous innovation"],
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="relative py-28">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Roadmap"
            title="The path to a"
            highlight="self-governing treasury"
            subtitle="Three deliberate phases — from launch to a fully decentralized, institution-grade ecosystem."
          />
        </Reveal>

        <div className="relative mt-20">
          {/* connector line */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {phases.map((p, i) => (
              <Reveal key={p.phase} delay={i * 120}>
                <div className="relative">
                  {/* node */}
                  <div className="mb-7 hidden justify-center lg:flex">
                    <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#9945FF] to-[#14F1D9] shadow-[0_0_30px_-4px_rgba(153,69,255,0.8)]">
                      <p.icon className="h-6 w-6 text-white" />
                    </span>
                  </div>

                  <div className="group sol-glass h-full rounded-3xl p-7 transition-all duration-500 hover:-translate-y-2 hover:border-white/20">
                    <div className="flex items-center justify-between">
                      <span className="lg:hidden flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#9945FF] to-[#14F1D9]">
                        <p.icon className="h-5 w-5 text-white" />
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#14F1D9]">
                        {p.phase}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-muted-foreground">
                        {p.status}
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-bold tracking-tight">
                      {p.title}
                    </h3>

                    <ul className="mt-5 space-y-3">
                      {p.items.map((it) => (
                        <li key={it} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#2BFF88]" />
                          <span className="text-sm text-muted-foreground">{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
