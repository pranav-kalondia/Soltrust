import {
  Cpu,
  ShieldCheck,
  Vote,
  Lock,
  Flame,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { ParticleField } from "./particle-field";
import { RegistrationForm } from "./registration-form";
import { CountUp } from "./ui-kit";

const trustBadges = [
  { icon: Sparkles, label: "Built on Solana" },
  { icon: Cpu, label: "AI Powered" },
  { icon: Vote, label: "DAO Governed" },
  { icon: Lock, label: "Fixed Supply" },
  { icon: Flame, label: "Deflationary" },
];

const stats = [
  { value: 1, suffix: "B", label: "Fixed Supply", decimals: 0 },
  { value: 100, suffix: "%", label: "AI Treasury", decimals: 0 },
  { value: 100, suffix: "%", label: "Community DAO", decimals: 0 },
  { value: 24, suffix: "/7", label: "Revenue Burns", decimals: 0 },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-24 pt-36 sm:pt-40"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0">
        <ParticleField className="absolute inset-0 h-full w-full opacity-70" />
        <div className="absolute -left-32 top-10 h-[34rem] w-[34rem] rounded-full bg-[#9945FF]/25 blur-[140px] sol-pulse-glow" />
        <div className="absolute -right-24 top-40 h-[30rem] w-[30rem] rounded-full bg-[#14F1D9]/20 blur-[140px] sol-pulse-glow" />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, #000 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, #000 40%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-12">
        {/* Left */}
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2BFF88] shadow-[0_0_10px_2px_rgba(43,255,136,0.7)]" />
            Presale live — early member rewards active
          </span>

          <h1 className="mt-6 text-[clamp(2.5rem,5.4vw,4.5rem)] font-semibold leading-[1.04] tracking-tight">
            The{" "}
            <span className="sol-gradient-text">AI-Powered</span> Treasury
            on Solana
          </h1>

          <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-muted-foreground">
            Transform traditional assets into digital value in minutes — not
            weeks. AI-powered onboarding, decentralized treasury management,
            deflationary tokenomics, and true community ownership.
          </p>

          {/* Trust badges */}
          <div className="mt-9 flex flex-wrap gap-2.5">
            {trustBadges.map((b) => (
              <span
                key={b.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-muted-foreground"
              >
                <b.icon className="h-3.5 w-3.5 text-[#14F1D9]" />
                {b.label}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="sol-glass rounded-2xl p-4 transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
              >
                <div
                  className="text-2xl font-bold tracking-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <CountUp
                    end={s.value}
                    suffix={s.suffix}
                    decimals={s.decimals}
                  />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — registration card */}
        <div id="register" className="lg:col-span-5">
          <div className="relative sol-float-slow">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#9945FF]/30 via-transparent to-[#14F1D9]/30 blur-2xl" />
            <div className="sol-glass sol-glow-border relative rounded-[1.75rem] p-7 shadow-[0_40px_120px_-30px_rgba(153,69,255,0.5)]">
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-[#14F1D9]" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Secure Registration
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight">
                  Reserve your allocation
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Join thousands of early members securing their place in the
                  treasury.
                </p>
              </div>
              <RegistrationForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
