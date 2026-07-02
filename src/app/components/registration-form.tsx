import { useState, useRef, useEffect, type ReactNode } from "react";
import { Check, Loader2, ChevronDown, Search } from "lucide-react";
import { GlowButton } from "./ui-kit";
import { countries } from "./countries";
import { supabase } from "../lib/supabase";

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
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredCountries = countries.filter((c) =>
    c.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (isDropdownOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setSearchQuery("");
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("loading");
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const full_name = formData.get("full_name") as string;
    const email = formData.get("email") as string;
    const wallet_address = formData.get("wallet_address") as string;
    const telegram = formData.get("telegram") as string;
    const country = formData.get("country") as string;

    try {
      if (supabase) {
        const { error } = await supabase.from("registrations").insert([
          {
            full_name,
            email,
            wallet_address: wallet_address || null,
            telegram: telegram || null,
            country: country || null,
          },
        ]);

        if (error) {
          throw new Error(error.message);
        }
      } else {
        // Fallback for demonstration when environment variables are not set
        console.log("No Supabase configuration detected. Simulating submission:", {
          full_name,
          email,
          wallet_address,
          telegram,
          country,
        });
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setStatus("done");
    } catch (error: any) {
      console.error("Failed to submit registration:", error);
      setErrorMsg(error.message || "Something went wrong. Please try again.");
      setStatus("idle");
    }
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
          <input required name="full_name" placeholder="Satoshi Vega" className={inputCls} />
        </Field>
        <Field label="Email">
          <input
            required
            name="email"
            type="email"
            placeholder="you@protonmail.com"
            className={inputCls}
          />
        </Field>
        {!compact && (
          <Field label="Wallet Address (Optional)">
            <input name="wallet_address" placeholder="7xK… Solana address" className={inputCls} />
          </Field>
        )}
        <Field label="Telegram">
          <input name="telegram" placeholder="@username" className={inputCls} />
        </Field>
        {compact ? (
          <Field label="Wallet Address">
            <input name="wallet_address" placeholder="7xK… Solana address" className={inputCls} />
          </Field>
        ) : (
          <Field label="Country">
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className={`${inputCls} flex items-center justify-between text-left transition-all duration-300 ${
                  isDropdownOpen
                    ? "border-[#9945FF]/60 bg-white/[0.06] shadow-[0_0_0_3px_rgba(153,69,255,0.18)]"
                    : ""
                }`}
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
              >
                <span
                  className={
                    selectedCountry ? "text-foreground" : "text-muted-foreground/70"
                  }
                >
                  {selectedCountry || "Select country"}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground/70 transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180 text-[#14F1D9]" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 right-0 z-50 mt-2 max-h-72 overflow-hidden rounded-xl border border-white/10 bg-[#0B1020]/95 shadow-[0_12px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 flex flex-col">
                  {/* Search box */}
                  <div className="relative p-2 border-b border-white/10 flex items-center">
                    <Search className="absolute left-4 h-4 w-4 text-muted-foreground/50" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search country..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (filteredCountries.length > 0) {
                            setSelectedCountry(filteredCountries[0]);
                            setIsDropdownOpen(false);
                            setSearchQuery("");
                          }
                        }
                      }}
                      className="w-full rounded-lg border border-white/5 bg-white/[0.03] py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:border-[#9945FF]/40 focus:bg-white/[0.05]"
                    />
                  </div>

                  {/* Scrollable List */}
                  <div className="max-h-52 overflow-y-auto p-1.5">
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country) => {
                        const isSelected = selectedCountry === country;
                        return (
                          <button
                            key={country}
                            type="button"
                            onClick={() => {
                              setSelectedCountry(country);
                              setIsDropdownOpen(false);
                              setSearchQuery("");
                            }}
                            className={`w-full rounded-lg px-4 py-2.5 text-left text-sm transition-all duration-200 ${
                              isSelected
                                ? "bg-gradient-to-r from-[#9945FF]/30 to-[#14F1D9]/20 text-white font-medium ring-1 ring-[#14F1D9]/30"
                                : "text-muted-foreground hover:bg-white/[0.06] hover:text-white"
                            }`}
                          >
                            {country}
                          </button>
                        );
                      })
                    ) : (
                      <div className="px-4 py-3 text-center text-sm text-muted-foreground/60">
                        No countries found
                      </div>
                    )}
                  </div>
                </div>
              )}
              <input type="hidden" name="country" value={selectedCountry} />
            </div>
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

      {errorMsg && (
        <p className="text-xs text-red-400 font-medium text-center bg-red-500/10 border border-red-500/20 py-2.5 px-3 rounded-xl">
          {errorMsg}
        </p>
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
