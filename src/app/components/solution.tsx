import {
  Banknote,
  ScanSearch,
  ShieldCheck,
  Boxes,
  Vault,
  TrendingUp,
  Gift,
  Bot,
  GitBranch,
  Vote,
  Coins,
  RefreshCw,
  Flame,
  ArrowRight,
  ChevronRight,
  Check,
  Minus,
} from "lucide-react";
import { Reveal, SectionHeading, GlassCard } from "./ui-kit";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const flow = [
  { icon: Banknote, label: "Traditional Asset" },
  { icon: ScanSearch, label: "AI Verification" },
  { icon: ShieldCheck, label: "Compliance Automation" },
  { icon: Boxes, label: "Solana Tokenization" },
  { icon: Vault, label: "DAO Treasury" },
  { icon: TrendingUp, label: "Yield Generation" },
  { icon: Gift, label: "Community Rewards" },
];

const features = [
  { icon: Bot, title: "AI Guided Onboarding", desc: "Conversational agents collect, validate and structure your asset data in minutes." },
  { icon: ShieldCheck, title: "Automated Compliance", desc: "Real-time KYC/AML and jurisdiction checks executed by policy-aware AI." },
  { icon: GitBranch, title: "Blockchain Bridging", desc: "Seamless bridging of assets onto Solana with sub-second finality." },
  { icon: Vault, title: "Treasury Growth", desc: "Diversified on-chain treasury actively managed for long-term value." },
  { icon: Vote, title: "DAO Governance", desc: "Token-weighted proposals and transparent on-chain execution." },
  { icon: Coins, title: "Real Yield", desc: "Sustainable yield from treasury revenue — not inflationary emissions." },
  { icon: RefreshCw, title: "Revenue Buybacks", desc: "Protocol revenue continuously buys back SOLTRUST from the market." },
  { icon: Flame, title: "Deflationary Burns", desc: "Every buyback and milestone permanently reduces circulating supply." },
];

const burnLoop = [
  { icon: Flame, label: "Transaction Burns" },
  { icon: RefreshCw, label: "Treasury Buybacks" },
  { icon: Vote, label: "DAO Milestone Burns" },
  { icon: Minus, label: "Reduced Supply" },
  { icon: TrendingUp, label: "Higher Scarcity" },
  { icon: Vault, label: "Treasury Growth" },
];

type Cell = boolean | "partial";
const compareRows: { label: string; values: Cell[] }[] = [
  { label: "Community Ownership", values: [true, false, false, "partial", "partial"] },
  { label: "AI Automation", values: [true, false, "partial", false, false] },
  { label: "Real On-Chain Yield", values: [true, "partial", "partial", true, false] },
  { label: "Deflationary Supply", values: [true, false, false, false, "partial"] },
  { label: "Transparent Treasury", values: [true, false, "partial", "partial", false] },
  { label: "Instant Settlement", values: [true, false, true, true, true] },
];

const compareCols = [
  "SolTrust",
  "Traditional Finance",
  "Tokenization Platforms",
  "Corporate DAT",
  "Meme Coins",
];

function CellMark({ v }: { v: Cell }) {
  if (v === true)
    return (
      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-[#2BFF88]/15">
        <Check className="h-4 w-4 text-[#2BFF88]" strokeWidth={3} />
      </span>
    );
  if (v === "partial")
    return (
      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-amber-400/10">
        <Minus className="h-4 w-4 text-amber-400" strokeWidth={3} />
      </span>
    );
  return (
    <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.04]">
      <Minus className="h-3.5 w-3.5 text-muted-foreground/50" />
    </span>
  );
}

function BurnEngine() {
  const R = 130;
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm lg:max-w-md flex items-center justify-center">
      {/* Background glow mapping */}
      <motion.div
        className="absolute inset-10 rounded-full bg-[#FF7D2D]/12 blur-[75px]"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Central SVG lines & dash loop */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full select-none -rotate-90">
        <circle cx="50" cy="50" r="39" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        
        {/* Animated dashed burn flow ring */}
        <motion.circle
          cx="50"
          cy="50"
          r="39"
          fill="none"
          stroke="url(#burnGrad)"
          strokeWidth="1.2"
          strokeDasharray="6 4"
          strokeOpacity="0.5"
          animate={{ strokeDashoffset: [-100, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <defs>
          <linearGradient id="burnGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FF7D2D" />
            <stop offset="0.5" stopColor="#9945FF" />
            <stop offset="1" stopColor="#14F1D9" />
          </linearGradient>
          <radialGradient id="centerCore" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#FF7D2D" />
            <stop offset="0.6" stopColor="#9945FF" />
            <stop offset="1" stopColor="#070B14" />
          </radialGradient>
        </defs>
      </svg>

      {/* Main rotation wrapper for nodes */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "center" }}
      >
        {burnLoop.map((s, i) => {
          const ang = (i / burnLoop.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + (Math.cos(ang) * R) / 3.2;
          const y = 50 + (Math.sin(ang) * R) / 3.2;
          return (
            <motion.div
              key={s.label}
              className="absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-2xl sol-glass"
              style={{ left: `${x}%`, top: `${y}%` }}
              whileHover={{
                scale: 1.25,
                borderColor: "rgba(255, 125, 45, 0.4)",
                boxShadow: "0 0 20px rgba(255, 125, 45, 0.35)",
              }}
              onHoverStart={() => setActiveLabel(s.label)}
              onHoverEnd={() => setActiveLabel(null)}
            >
              {/* Counter-rotation to keep icons upright */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "center" }}
              >
                <s.icon className="h-5 w-5 text-[#FF7D2D] drop-shadow-[0_0_8px_rgba(255,125,45,0.5)]" />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Interactive central core button */}
      <motion.div
        className="absolute z-10 flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#FF7D2D] to-[#9945FF] text-center shadow-[0_0_40px_-5px_rgba(255,125,45,0.65)]"
        whileHover={{
          scale: 1.1,
          shadow: "0 0 50px rgba(255, 125, 45, 0.8)",
        }}
        transition={{ type: "spring", stiffness: 450, damping: 15 }}
      >
        {/* Core expanding heat wave */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#FF7D2D] opacity-40"
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
        />
        <Flame className="h-6 w-6 text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]" />
        <span className="mt-1 text-[10px] font-extrabold uppercase tracking-widest text-white">
          Burn Loop
        </span>
      </motion.div>

      {/* Floating Interactive Active Label (Tooltip) */}
      <AnimatePresence>
        {activeLabel && (
          <motion.div
            className="absolute bottom-6 z-20 rounded-full border border-white/10 bg-black/85 px-4 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur shadow-xl"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {activeLabel}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Solution() {
  return (
    <section id="solution" className="relative py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-20 h-[30rem] w-[30rem] rounded-full bg-[#9945FF]/15 blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[26rem] w-[26rem] rounded-full bg-[#14F1D9]/12 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="The Solution"
            title="One Ecosystem. Complete"
            highlight="Digital Asset Transformation."
            subtitle="From a real-world asset to community rewards — every step is automated, transparent and on-chain."
          />
        </Reveal>

        {/* Horizontal flow */}
        <Reveal delay={100}>
          <div className="mt-16 flex flex-wrap items-stretch justify-center gap-3">
            {flow.map((f, i) => (
              <div key={f.label} className="flex items-center gap-3">
                <div className="group flex w-32 flex-col items-center gap-3 rounded-2xl sol-glass px-3 py-5 text-center transition-all duration-500 hover:-translate-y-1 hover:border-white/20">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#9945FF]/30 to-[#14F1D9]/20 ring-1 ring-white/10">
                    <f.icon className="h-5 w-5 text-[#14F1D9]" />
                  </div>
                  <span className="text-xs font-medium leading-tight">{f.label}</span>
                </div>
                {i < flow.length - 1 && (
                  <ChevronRight className="hidden h-5 w-5 flex-shrink-0 text-[#9945FF] sm:block" />
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Feature cards */}
        <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 4) * 80}>
              <GlassCard className="group h-full p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#9945FF]/30 to-[#14F1D9]/20 ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110">
                  <f.icon className="h-5 w-5 text-[#14F1D9]" />
                </div>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        {/* Comparison table */}
        <Reveal>
          <div className="mt-24">
            <SectionHeading
              eyebrow="The Comparison"
              title="How SolTrust"
              highlight="Stacks Up"
            />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 overflow-x-auto">
            <div className="min-w-[760px] overflow-hidden rounded-3xl border border-white/10">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-white/[0.03]">
                    <th className="p-5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Capability
                    </th>
                    {compareCols.map((c) => {
                      const win = c === "SolTrust";
                      return (
                        <th
                          key={c}
                          className={`relative p-5 text-center text-sm font-semibold ${
                            win ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {win && (
                            <span className="absolute inset-x-2 inset-y-2 -z-0 rounded-2xl bg-gradient-to-b from-[#9945FF]/25 to-[#14F1D9]/10 ring-1 ring-[#14F1D9]/40" />
                          )}
                          <span className="relative z-10 inline-flex items-center gap-1.5">
                            {win && (
                              <span className="h-1.5 w-1.5 rounded-full bg-[#2BFF88] shadow-[0_0_8px_2px_rgba(43,255,136,0.7)]" />
                            )}
                            {c}
                          </span>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.label} className="border-t border-white/[0.06]">
                      <td className="p-5 text-sm font-medium">{row.label}</td>
                      {row.values.map((v, ci) => {
                        const win = compareCols[ci] === "SolTrust";
                        return (
                          <td
                            key={ci}
                            className={`relative p-5 ${win ? "bg-gradient-to-b from-[#9945FF]/[0.08] to-[#14F1D9]/[0.04]" : ""}`}
                          >
                            <CellMark v={v} />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        {/* Token burn engine */}
        <div className="mt-24 grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <BurnEngine />
          </Reveal>
          <Reveal className="order-1 lg:order-2" delay={100}>
            <SectionHeading
              eyebrow="Token Burn Engine"
              title="A self-reinforcing"
              highlight="scarcity loop"
              align="left"
              subtitle="Revenue and activity continuously remove tokens from supply — compounding scarcity as the treasury grows."
            />
            <div className="mt-7 space-y-3">
              {[
                { text: "Transaction burns on every protocol interaction", icon: Flame },
                { text: "Treasury revenue buybacks fund market purchases", icon: RefreshCw },
                { text: "DAO milestone burns reward ecosystem growth", icon: Vote },
                { text: "Reduced supply → higher scarcity → treasury growth → repeat", icon: TrendingUp },
              ].map((pt) => (
                <div key={pt.text} className="flex items-start gap-3">
                  <pt.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#FF7D2D]" />
                  <span className="text-sm text-muted-foreground">{pt.text}</span>
                </div>
              ))}
            </div>
            <a
              href="#tokenomics"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#14F1D9] transition-colors hover:text-[#2BFF88]"
            >
              Explore tokenomics <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
