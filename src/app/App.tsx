import { Navbar } from "./components/navbar";
import { Hero } from "./components/hero";
import { Vision } from "./components/vision";
import { Problem } from "./components/problem";
import { Solution } from "./components/solution";
import { Tokenomics } from "./components/tokenomics";
import { Roadmap } from "./components/roadmap";
import { TeamRisks } from "./components/team-risks";
import { FinalCta } from "./components/final-cta";
import { Footer } from "./components/footer";

export default function App() {
  return (
    <div className="relative min-h-screen scroll-smooth bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <Hero />
        <Vision />
        <Problem />
        <Solution />
        <Tokenomics />
        <Roadmap />
        <TeamRisks />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
