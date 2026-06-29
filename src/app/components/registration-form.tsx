import { useState, type ReactNode } from "react";
import { Check, Loader2 } from "lucide-react";
import { GlowButton } from "./ui-kit";

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="group block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all duration-300 focus:border-[#9945FF]/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(153,69,255,0.18)]";

export function RegistrationForm({
  compact = false,
  cta = "Register Now",
}: {
  compact?: boolean;
  cta?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [agree, setAgree] = useState(true);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("loading");
    // Front-end demo — wire to a backend / Supabase to persist registrations.
    setTimeout(() => setStatus("done"), 1300);
  };

  if (status === "done") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#2BFF88] to-[#14F1D9] shadow-[0_0_40px_-4px_rgba(43,255,136,0.6)]">
          <Check className="h-8 w-8 text-[#04121A]" strokeWidth={3} />
        </div>
        <h3 className="text-xl font-semibold">You're on the list</h3>
        <p className="max-w-xs text-sm text-muted-foreground">
          Welcome to the SolTrust treasury. We'll reach out with presale details
          and early-member rewards.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className={compact ? "grid gap-4 sm:grid-cols-2" : "grid gap-4"}>
        <Field label="Full Name">
          <input required placeholder="Satoshi Vega" className={inputCls} />
        </Field>
        <Field label="Email">
          <input
            required
            type="email"
            placeholder="you@protonmail.com"
            className={inputCls}
          />
        </Field>
        {!compact && (
          <Field label="Wallet Address (Optional)">
            <input placeholder="7xK… Solana address" className={inputCls} />
          </Field>
        )}
        <Field label="Telegram">
          <input placeholder="@username" className={inputCls} />
        </Field>
        {compact ? (
          <Field label="Wallet Address">
            <input placeholder="7xK… Solana address" className={inputCls} />
          </Field>
        ) : (
          <Field label="Country">
            <select className={inputCls} defaultValue="">
              <option value="" disabled>
                Select country
              </option>
              <option>United Arab Emirates</option>
              <option>Singapore</option>
              <option>Switzerland</option>
              <option>United Kingdom</option>
              <option>Germany</option>
              <option>Other</option>
            </select>
          </Field>
        )}
      </div>

      {!compact && (
        <button
          type="button"
          onClick={() => setAgree((a) => !a)}
          className="flex items-start gap-3 text-left"
        >
          <span
            className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border transition-all ${
              agree
                ? "border-transparent bg-gradient-to-br from-[#9945FF] to-[#14F1D9]"
                : "border-white/20 bg-white/[0.03]"
            }`}
          >
            {agree && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
          </span>
          <span className="text-sm leading-snug text-muted-foreground">
            I agree to receive project updates and understand this is not
            financial advice.
          </span>
        </button>
      )}

      <GlowButton type="submit" size="lg" className="mt-1 w-full">
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Securing your spot…
          </>
        ) : (
          cta
        )}
      </GlowButton>
    </form>
  );
}
