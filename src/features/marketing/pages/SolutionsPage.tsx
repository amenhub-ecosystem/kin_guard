import { SolutionsHero } from "@/features/marketing/components/solutions/SolutionsHero";
import { SolutionsAudience } from "@/features/marketing/components/solutions/SolutionsAudience";
import SolutionsCTASection from "@/features/marketing/components/solutions/SolutionsSection";

export default function SolutionsPage() {
  return (
    <main className="min-h-[60vh] bg-white">
      <SolutionsHero />
      <SolutionsAudience />
      <SolutionsCTASection />
    </main>
  );
}
