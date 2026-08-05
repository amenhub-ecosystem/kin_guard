import { HowItWorksHero } from "@/features/marketing/components/how-it-works/HowItWorksHero";
import { CareJourney } from "@/features/marketing/components/how-it-works/CareJourney";
import { DayWithKinGuard } from "@/features/marketing/components/how-it-works/DayWithKinGuard";
import CTASection from "@/features/marketing/layouts/CTASection";

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
