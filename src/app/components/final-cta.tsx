import { ParticleField } from "./particle-field";
import { RegistrationForm } from "./registration-form";
import { Eyebrow } from "./ui-kit";

export function FinalCta() {
  return (
    <section id="join" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10">
          {/* background */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#9945FF]/30 via-[#0B1020] to-[#14F1D9]/20" />
            <ParticleField className="absolute inset-0 h-full w-full opacity-60" />
            <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#9945FF]/40 blur-[120px] sol-pulse-glow" />
          </div>

          <div className="relative grid grid-cols-1 items-center gap-12 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
            <div>
              <Eyebrow>Join the Treasury</Eyebrow>
              <h2 className="mt-5 text-[clamp(2rem,4.4vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight">
                Become an Early Member of the{" "}
                <span className="sol-gradient-text">SolTrust Treasury</span>
              </h2>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted-foreground">
                Join the community shaping the future of AI-powered decentralized
                finance. Early members receive priority allocation and treasury
                rewards.
              </p>

              <div className="mt-8 flex flex-wrap gap-8">
                {[
                  { v: "14,200+", l: "Members" },
                  { v: "$8.4M", l: "Committed" },
                  { v: "62", l: "Countries" },
                ].map((s) => (
                  <div key={s.l}>
                    <div
                      className="text-2xl font-bold sol-gradient-text"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {s.v}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sol-glass sol-glow-border rounded-3xl p-7 shadow-[0_40px_120px_-30px_rgba(153,69,255,0.5)]">
              <h3 className="mb-5 text-xl font-bold tracking-tight">
                Reserve your spot
              </h3>
              <RegistrationForm compact cta="Reserve" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
