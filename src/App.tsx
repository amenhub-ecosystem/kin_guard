import { Routes, Route } from "react-router-dom";
import { AnnouncementBanner } from "@/components/common/ui/AnnouncementBanner";
import { Nav } from "@/components/common/ui/Nav";
import { Footer } from "@/components/common/ui/Footer";
import HomePage from "@/features/marketing/pages/Homepage";
import FeaturesPage from "@/features/marketing/pages/FeaturesPage";
import HowItWorksPage from "@/features/marketing/pages/HowItWorksPage";
import PricingPage from "@/features/marketing/pages/PricingPage";
import SolutionsPage from "@/features/marketing/pages/SolutionsPage";

export default function App() {
  return (
    <>
      <AnnouncementBanner />
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
      </Routes>
      <Footer />
    </>
  );
}
