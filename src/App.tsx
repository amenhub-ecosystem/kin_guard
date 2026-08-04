import { AnnouncementBanner } from "@/components/layout/AnnouncementBanner";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import Home from "@/home/Home";

export default function App() {
  return (
    <>
      <AnnouncementBanner />
      <Nav />
      <Home />
      <Footer />
    </>
  );
}
