import { SolutionsHero } from "@/components/solutions/SolutionsHero";
import { SolutionsAudience } from "@/components/solutions/SolutionsAudience";
import SolutionsCTASection from "@/components/solutions/SolutionsSection";

export default function SolutionsPage() {
  return (
    <main className="min-h-[60vh] bg-white">
      <SolutionsHero />
      <SolutionsAudience />
      <SolutionsCTASection />
    </main>
  );
}
