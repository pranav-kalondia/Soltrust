import {
  Users,
  Landmark,
  Bot,
  Globe2,
  Vote,
} from "lucide-react";
import { Reveal, Eyebrow } from "./ui-kit";

const cards = [
  {
    icon: Users,
    title: "Community Owned",
    desc: "Every holder is an owner. Governance, treasury and upside belong to the community — not insiders.",
  },
  {
    icon: Landmark,
    title: "Digital Asset Treasury",
    desc: "A transparent on-chain treasury holding tokenized real-world and digital assets.",
  },
  {
    icon: Bot,
    title: "AI Automation",
    desc: "Autonomous agents handle onboarding, verification, rebalancing and compliance 24/7.",
  },
  {
    icon: Vote,
    title: "DAO Governance",
    desc: "Proposals, votes and milestone burns executed transparently on Solana.",
  },
];

import { motion } from "framer-motion";

function TreasuryIllustration() {
  return (
    <div className="relative aspect-square w-full max-w-md lg:max-w-[520px] xl:max-w-[560px]">
      {/* Background radial glow */}
      <motion.div
        className="absolute inset-4 rounded-full bg-[#9945FF]/20 blur-[90px]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <svg viewBox="0 0 400 400" className="relative h-full w-full select-none">
        <defs>
          <linearGradient id="vg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#9945FF" />
            <stop offset="1" stopColor="#14F1D9" />
          </linearGradient>
          <radialGradient id="vcore" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#14F1D9" />
            <stop offset="0.6" stopColor="#9945FF" />
            <stop offset="1" stopColor="#0B1020" />
          </radialGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── Inner orbit (Radar dashed line) ── */}
        <motion.circle
          cx="200"
          cy="200"
          r="70"
          fill="none"
          stroke="url(#vg)"
          strokeOpacity="0.3"
          strokeWidth="1.5"
          strokeDasharray="8 6"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        />

        {/* ── Middle orbit (Counter-clockwise flow) ── */}
        <motion.circle
          cx="200"
          cy="200"
          r="110"
          fill="none"
          stroke="url(#vg)"
          strokeOpacity="0.2"
          strokeWidth="1"
        />
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        >
          {Array.from({ length: 6 }).map((_, i) => {
            const ang = (i / 6) * Math.PI * 2;
            const x = 200 + Math.cos(ang) * 110;
            const y = 200 + Math.sin(ang) * 110;
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="4.5"
                fill="#2BFF88"
                filter="url(#glow)"
                animate={{ scale: [0.8, 1.3, 0.8] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </motion.g>

        {/* ── Outer orbit (Clockwise flow with asset nodes) ── */}
        <motion.circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="url(#vg)"
          strokeOpacity="0.15"
          strokeWidth="1"
        />
        
        {/* Animated connection lines radiating from center */}
        {Array.from({ length: 8 }).map((_, i) => {
          const ang = (i / 8) * Math.PI * 2;
          const x2 = 200 + Math.cos(ang) * 150;
          const y2 = 200 + Math.sin(ang) * 150;
          return (
            <g key={i}>
              <line
                x1="200"
                y1="200"
                x2={x2}
                y2={y2}
                stroke="url(#vg)"
                strokeOpacity="0.15"
                strokeWidth="1"
              />
              {/* Pulse trail lines representing data flow */}
              <motion.line
                x1="200"
                y1="200"
                x2={x2}
                y2={y2}
                stroke="url(#vg)"
                strokeOpacity="0.7"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0], pathOffset: [0, 0, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut",
                }}
              />
            </g>
          );
        })}

        {/* Orbiting nodes group */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        >
          {Array.from({ length: 8 }).map((_, i) => {
            const ang = (i / 8) * Math.PI * 2;
            const x = 200 + Math.cos(ang) * 150;
            const y = 200 + Math.sin(ang) * 150;
            return (
              <motion.g 
                key={i} 
                whileHover={{ scale: 1.35 }}
                className="cursor-pointer"
              >
                {/* Node outer pulse ring */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r="15"
                  fill="none"
                  stroke="url(#vg)"
                  strokeOpacity="0.4"
                  animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
                <circle cx={x} cy={y} r="8" fill="url(#vg)" />
                <circle cx={x} cy={y} r="3" fill="#ffffff" />
              </motion.g>
            );
          })}
        </motion.g>

        {/* ── Glowing AI Core ── */}
        <motion.g
          whileHover={{ scale: 1.12 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="cursor-pointer"
        >
          {/* Core expanding wave effect */}
          <motion.circle
            cx="200"
            cy="200"
            r="44"
            fill="none"
            stroke="#14F1D9"
            strokeWidth="1.5"
            animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.6, 0, 0.6] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />

          {/* Core main sphere */}
          <circle 
            cx="200" 
            cy="200" 
            r="36" 
            fill="url(#vcore)" 
            filter="url(#glow)"
          />
          <circle cx="200" cy="200" r="36" fill="none" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1" />
          
          <text
            x="200"
            y="207"
            textAnchor="middle"
            fontSize="18"
            fontWeight="800"
            fill="#ffffff"
            letterSpacing="0.05em"
            fontFamily="var(--font-display)"
            style={{ pointerEvents: "none" }}
          >
            AI
          </text>
        </motion.g>
      </svg>
    </div>
  );
}

export function Vision() {
  return (
    <section id="vision" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-stretch gap-16 lg:grid-cols-2">
          <Reveal className="flex items-center justify-center order-2 lg:order-1 h-full">
            <TreasuryIllustration />
          </Reveal>

          <div className="order-1 lg:order-2 flex flex-col justify-center">
            <Reveal>
              <Eyebrow>The Vision</Eyebrow>
              <h2 className="mt-5 text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-tight">
                The Future of{" "}
                <span className="sol-gradient-text">Community-Owned</span>{" "}
                Digital Wealth
              </h2>
              <p className="mt-5 text-[17px] leading-relaxed text-muted-foreground">
                SolTrust replaces gatekeepers with intelligent, autonomous
                infrastructure. We turn slow, paperwork-heavy asset digitization
                into a transparent, AI-orchestrated treasury — owned and governed
                by its community, growing through real yield and deflationary
                burns.
              </p>
            </Reveal>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {cards.map((c, i) => (
                <Reveal key={c.title} delay={i * 80}>
                  <div className="group sol-glass h-full rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1 hover:border-white/20">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#9945FF]/30 to-[#14F1D9]/20 ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110">
                      <c.icon className="h-5 w-5 text-[#14F1D9]" />
                    </div>
                    <h3 className="mt-4 font-semibold">{c.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {c.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
