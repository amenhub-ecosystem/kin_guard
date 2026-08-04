import { FeaturesHero } from "@/components/features/FeaturesHero";
import { FeaturesDashboardPreview } from "@/components/features/FeaturesDashboardPreview";
import { FeaturesGrid } from "@/components/features/FeaturesGrid";
import CTASection from "@/components/common/layout/CTASection";

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
