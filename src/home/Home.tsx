import { Hero } from "@/home/Hero";
import { ProblemSection } from "@/home/ProblemSection";
import { FeaturesSection } from "@/home/FeaturesSection";
import FamilyCircleSection from "@/home/FamilyCircleSection";
import HowItWorksSection from "@/home/HowItWorksSection";
import PricingSection from "@/home/PricingSection";
import FAQSection from "@/home/FAQSection";
import CTASection from "@/home/CTASection";

export default function Home() {
  return (
    <main className="min-h-[60vh] bg-white">
      <Hero />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FamilyCircleSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
