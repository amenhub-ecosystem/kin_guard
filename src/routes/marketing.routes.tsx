import { Outlet, Route } from "react-router-dom";
import { AnnouncementBanner } from "@/features/marketing/layouts/AnnouncementBanner";
import { Nav } from "@/features/marketing/layouts/Nav";
import { Footer } from "@/features/marketing/layouts/Footer";
import HomePage from "@/features/marketing/pages/Homepage";
import FeaturesPage from "@/features/marketing/pages/FeaturesPage";
import HowItWorksPage from "@/features/marketing/pages/HowItWorksPage";
import PricingPage from "@/features/marketing/pages/PricingPage";
import SolutionsPage from "@/features/marketing/pages/SolutionsPage";

function MarketingLayout() {
  return (
    <>
      <AnnouncementBanner />
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}

export function MarketingRoutes() {
  return (
    <>
      <Route element={<MarketingLayout />}>
        <Route index element={<HomePage />} />
        <Route path="features" element={<FeaturesPage />} />
        <Route path="how-it-works" element={<HowItWorksPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="solutions" element={<SolutionsPage />} />
      </Route>
    </>
  );
}
