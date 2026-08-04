import { AnnouncementBanner } from "@/components/layout/AnnouncementBanner";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { ProblemSection } from "@/components/problem/ProblemSection";

export default function App() {
  return (
    <>

      <AnnouncementBanner />
      <Nav />
      <main className="min-h-[60vh] bg-white">
        <Hero />
        <ProblemSection />
      </main>

      <Footer />
    </>
  );
}
