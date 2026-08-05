import { Routes, Route } from "react-router-dom";
import { AnnouncementBanner } from "@/components/common/layout/AnnouncementBanner";
import { Nav } from "@/components/common/layout/Nav";
import { Footer } from "@/components/common/layout/Footer";
import HomePage from "@/pages/Homepage";
import FeaturesPage from "@/pages/FeaturesPage";
import HowItWorksPage from "@/pages/HowItWorksPage";
import SolutionsPage from "@/pages/SolutionsPage";

export default function App() {
  return (
    <>
      <AnnouncementBanner />
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
      </Routes>
      <Footer />
    </>
  );
}
