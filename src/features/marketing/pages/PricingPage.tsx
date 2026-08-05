import { PricingHero } from "@/features/marketing/components/pricing/PricingHero";
import PricingSection from "@/features/marketing/components/pricing/PricingSection";
import FAQSection from "@/features/marketing/components/home/FAQSection";

export default function PricingPage() {
  return (
    <main className="min-h-[60vh] bg-white">
      <PricingHero />
      <PricingSection />
      <FAQSection />
    </main>
  );
}
