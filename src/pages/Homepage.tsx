import { Hero } from "@/components/home/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import FamilyCircleSection from "@/components/home/FamilyCircleSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import PricingSection from "@/components/home/PricingSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
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
