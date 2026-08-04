import { Routes, Route } from "react-router-dom";
import { AnnouncementBanner } from "@/components/common/layout/AnnouncementBanner";
import { Nav } from "@/components/common/layout/Nav";
import { Footer } from "@/components/common/layout/Footer";
import HomePage from "@/pages/Homepage";
import FeaturesPage from "@/pages/FeaturesPage";

export default function App() {
  return (
    <>
      <AnnouncementBanner />
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
      </Routes>
      <Footer />
    </>
  );
}
