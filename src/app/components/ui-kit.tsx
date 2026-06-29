import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ButtonHTMLAttributes,
} from "react";

/* ------------------------------------------------------------------ */
/* Reveal-on-scroll wrapper                                            */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error generic ref across tags is fine here
      ref={ref}
      className={`sol-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Count-up number animation                                          */
/* ------------------------------------------------------------------ */
export function CountUp({
  end,
  duration = 1800,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(end * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Glow / magnetic CTA button                                         */
/* ------------------------------------------------------------------ */
interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
  children: ReactNode;
}

export function GlowButton({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...rest
}: GlowButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const sizes = size === "lg" ? "px-9 py-4 text-[15px]" : "px-6 py-3 text-sm";

  if (variant === "ghost") {
    return (
      <button
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`group relative inline-flex items-center justify-center gap-2 rounded-full sol-glass ${sizes} font-semibold tracking-wide text-foreground transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08] ${className}`}
        {...rest}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative inline-flex items-center justify-center gap-2 rounded-full ${sizes} font-semibold uppercase tracking-wider text-white transition-transform duration-200 ease-out ${className}`}
      {...rest}
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#9945FF] via-[#7C3AED] to-[#14F1D9] opacity-100" />
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#9945FF] via-[#7C3AED] to-[#14F1D9] blur-xl opacity-50 transition-opacity duration-300 group-hover:opacity-90" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Glass card                                                          */
/* ------------------------------------------------------------------ */
export function GlassCard({
  children,
  className = "",
  glow = false,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
}) {
  return (
    <div
      className={`sol-glass rounded-2xl ${glow ? "sol-glow-border" : ""} ${
        hover
          ? "transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_24px_70px_-20px_rgba(153,69,255,0.45)]"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Eyebrow pill                                                        */
/* ------------------------------------------------------------------ */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-[#14F1D9] shadow-[0_0_10px_2px_rgba(20,241,217,0.7)]" />
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Section heading                                                     */
/* ------------------------------------------------------------------ */
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`flex flex-col gap-5 ${
        align === "center" ? "items-center text-center mx-auto max-w-3xl" : "items-start text-left max-w-2xl"
      }`}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-tight">
        {title} {highlight && <span className="sol-gradient-text">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="text-[17px] leading-relaxed text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SolTrust Premium Logo Mark                                        */
/* ------------------------------------------------------------------ */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-all duration-300 hover:scale-110`}
    >
      <defs>
        <linearGradient id="soltrust-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9945FF" />
          <stop offset="100%" stopColor="#14F1D9" />
        </linearGradient>
        <linearGradient id="soltrust-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2BFF88" />
          <stop offset="100%" stopColor="#9945FF" />
        </linearGradient>
        <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Outer tech ring */}
      <circle cx="16" cy="16" r="14" stroke="url(#soltrust-grad-1)" strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
      
      {/* Interlocking modern S-ribbon elements with glowing effect */}
      <path
        d="M16 6c5.52 0 10 4.48 10 10h-4c0-3.31-2.69-6-6-6s-6 2.69-6 6H6c0-5.52 4.48-10 10-10z"
        fill="url(#soltrust-grad-1)"
        filter="url(#logo-glow)"
      />
      <path
        d="M16 26c-5.52 0-10-4.48-10-10h4c0 3.31 2.69 6 6 6s6-2.69 6-6h4c0 5.52-4.48 10-10 10z"
        fill="url(#soltrust-grad-2)"
        filter="url(#logo-glow)"
      />
      
      {/* Central core node */}
      <circle cx="16" cy="16" r="4.5" fill="#070B14" />
      <circle cx="16" cy="16" r="2.2" fill="#14F1D9" />
    </svg>
  );
}

