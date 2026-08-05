import { PricingHero } from "@/components/pricing/PricingHero";
import PricingSection from "@/components/pricing/PricingSection";
import FAQSection from "@/components/home/FAQSection";

export default function PricingPage() {
  return (
    <main className="min-h-[60vh] bg-white">
      <PricingHero />
      <PricingSection />
      <FAQSection />
    </main>
  );
}
