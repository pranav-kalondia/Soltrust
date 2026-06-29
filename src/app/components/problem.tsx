import {
  FileStack,
  Coins,
  Clock,
  Ban,
} from "lucide-react";
import { Reveal, SectionHeading } from "./ui-kit";

const problems = [
  {
    icon: FileStack,
    title: "Manual Friction",
    desc: "Manual paperwork and multiple intermediaries increase transaction friction and costs.",
  },
  {
    icon: Coins,
    title: "High Fees",
    desc: "Layered fees and commissions quietly erode value during every transfer.",
  },
  {
    icon: Clock,
    title: "Settlement Delays",
    desc: "Settlement delays freeze capital while inefficient back offices reconcile transactions.",
  },
  {
    icon: Ban,
    title: "Poor Accessibility",
    desc: "Geographic limits and high minimums lock most people out entirely.",
  },
];

export function Problem() {
  return (
    <section className="relative py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF4D6D]/10 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="The Problem"
            title="Why Traditional Asset"
            highlight="Digitization Fails"
            subtitle="The legacy stack was designed for a paper world. Every step adds delay, cost and exclusion."
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#FF4D6D]/40">
                <div className="absolute right-4 top-4 text-5xl font-bold text-white/[0.04]">
                  0{i + 1}
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF4D6D]/10 ring-1 ring-[#FF4D6D]/20">
                  <p.icon className="h-5 w-5 text-[#FF7D93]" />
                </div>
                <h3 className="mt-5 font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="relative mt-14 overflow-hidden rounded-3xl">
            <div className="sol-glass sol-glow-border rounded-3xl px-8 py-12 text-center">
              <p className="mx-auto max-w-3xl text-[clamp(1.4rem,3vw,2.25rem)] font-bold leading-snug tracking-tight">
                “Traditional finance was{" "}
                <span className="sol-gradient-text">never built</span> for global
                digital ownership.”
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
