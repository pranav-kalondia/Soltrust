import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Lock, Infinity as InfinityIcon, Flame, Gem } from "lucide-react";
import { Reveal, SectionHeading, CountUp } from "./ui-kit";

const allocation = [
  { name: "Treasury & Liquidity", value: 40, color: "#9945FF" },
  { name: "Team & Contributors", value: 30, color: "#3B82F6" },
  { name: "Community DAO", value: 20, color: "#14F1D9" },
  { name: "Marketing", value: 10, color: "#C084FC" },
];

const traits = [
  { icon: Lock, label: "Fixed Forever" },
  { icon: InfinityIcon, label: "No Inflation" },
  { icon: Flame, label: "Deflationary" },
  { icon: Gem, label: "Scarcity Driven" },
];

export function Tokenomics() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="tokenomics" className="relative py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/3 h-[26rem] w-[26rem] rounded-full bg-[#9945FF]/15 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Tokenomics"
            title="A supply engineered for"
            highlight="scarcity"
            subtitle="One billion tokens. Fixed forever. Continuously deflationary."
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Donut */}
          <Reveal>
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocation}
                    dataKey="value"
                    innerRadius="62%"
                    outerRadius="92%"
                    paddingAngle={3}
                    stroke="none"
                    onMouseEnter={(_, i) => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                  >
                    {allocation.map((a, i) => (
                      <Cell
                        key={a.name}
                        fill={a.color}
                        opacity={active === null || active === i ? 1 : 0.35}
                        style={{
                          transition: "opacity 0.3s, filter 0.3s",
                          filter:
                            active === i
                              ? `drop-shadow(0 0 12px ${a.color})`
                              : "none",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* center label */}
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                {active === null ? (
                  <>
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Total Supply
                    </span>
                    <span
                      className="mt-1 text-3xl font-bold sol-gradient-text"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      1B
                    </span>
                    <span className="text-xs text-muted-foreground">SOLTRUST</span>
                  </>
                ) : (
                  <>
                    <span
                      className="text-4xl font-bold"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: allocation[active].color,
                      }}
                    >
                      {allocation[active].value}%
                    </span>
                    <span className="mt-1 max-w-[8rem] text-xs text-muted-foreground">
                      {allocation[active].name}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* legend */}
            <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {allocation.map((a, i) => (
                <button
                  key={a.name}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  className={`flex items-center justify-between rounded-xl border px-4 py-2.5 text-left transition-all ${
                    active === i
                      ? "border-white/20 bg-white/[0.06]"
                      : "border-white/[0.06] bg-white/[0.02]"
                  }`}
                >
                  <span className="flex items-center gap-2.5 text-sm">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: a.color }}
                    />
                    {a.name}
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {a.value}%
                  </span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* Glass supply card */}
          <Reveal delay={120}>
            <div className="sol-glass sol-glow-border rounded-3xl p-8">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Total Supply
              </span>
              <div
                className="mt-3 text-[clamp(2rem,5vw,3.25rem)] font-bold leading-none tracking-tight"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <CountUp end={1000000000} />
              </div>
              <span className="mt-2 block text-sm text-muted-foreground">
                SOLTRUST — minted once, never again.
              </span>

              <div className="mt-7 grid grid-cols-2 gap-3">
                {traits.map((t) => (
                  <div
                    key={t.label}
                    className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#9945FF]/30 to-[#14F1D9]/20 ring-1 ring-white/10">
                      <t.icon className="h-4 w-4 text-[#14F1D9]" />
                    </span>
                    <span className="text-sm font-medium">{t.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 grid grid-cols-3 gap-4 border-t border-white/[0.06] pt-6">
                {[
                  { v: 12.4, suffix: "M", label: "Burned to date", d: 1 },
                  { v: 38, suffix: "%", label: "In treasury", d: 0 },
                  { v: 0, suffix: "%", label: "Inflation", d: 0 },
                ].map((s) => (
                  <div key={s.label}>
                    <div
                      className="text-xl font-bold sol-gradient-text"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      <CountUp end={s.v} suffix={s.suffix} decimals={s.d} />
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
