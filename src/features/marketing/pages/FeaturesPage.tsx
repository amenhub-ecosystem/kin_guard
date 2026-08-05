import { FeaturesHero } from "@/features/marketing/components/features/FeaturesHero";
import { FeaturesDashboardPreview } from "@/features/marketing/components/features/FeaturesDashboardPreview";
import { FeaturesGrid } from "@/features/marketing/components/features/FeaturesGrid";
import CTASection from "@/components/common/ui/CTASection";

export default function FeaturesPage() {
  return (
    <main className="min-h-[60vh] bg-white">
      <FeaturesHero />
      <FeaturesDashboardPreview />
      <FeaturesGrid />
      <CTASection />
    </main>
  );
}
