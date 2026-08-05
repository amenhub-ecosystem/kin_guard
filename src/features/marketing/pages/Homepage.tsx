import { Hero } from "@/features/marketing/components/home/Hero";
import { ProblemSection } from "@/features/marketing/components/home/ProblemSection";
import { FeaturesSection } from "@/features/marketing/components/home/FeaturesSection";
import FamilyCircleSection from "@/features/marketing/components/home/FamilyCircleSection";
import HowItWorksSection from "@/features/marketing/components/home/HowItWorksSection";
import PricingSection from "@/features/marketing/components/home/PricingSection";
import FAQSection from "@/features/marketing/components/home/FAQSection";
import CTASection from "@/components/common/ui/CTASection";

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
