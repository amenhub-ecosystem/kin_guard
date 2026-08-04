import { AnnouncementBanner } from "@/components/layout/AnnouncementBanner";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { ProblemSection } from "@/components/problem/ProblemSection";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import FamilyCircleSection from "@/components/features/FamilyCircleSection";
import HowItWorksSection from "@/components/how-it-works/HowItWorksSection";
import PricingSection from "./components/pricing/PricingSection";

export default function App() {
  return (
    <>

      <AnnouncementBanner />
      <Nav />
      <main className="min-h-[60vh] bg-white">
        <Hero />
        <ProblemSection />
        <FeaturesSection />        
        <HowItWorksSection />
        <FamilyCircleSection />
        <PricingSection />
      </main>

      <Footer />
    </>
  );
}
