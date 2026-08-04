import { HowItWorksHero } from "@/components/HowItWorks/HowItWorksHero";
import { CareJourney } from "@/components/HowItWorks/CareJourney";
import { DayWithKinGuard } from "@/components/HowItWorks/DayWithKinGuard";
import CTASection from "@/components/common/layout/CTASection";

export default function HowItWorksPage() {
  return (
    <main className="min-h-[60vh] bg-white">
      <HowItWorksHero />
      <CareJourney />
      <DayWithKinGuard />
      <CTASection />
    </main>
  );
}
