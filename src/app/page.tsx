import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CompanyFactsSection from "@/components/CompanyFactsSection";
import GallerySection from "@/components/GallerySection";
import CertificationsSection from "@/components/CertificationsSection";
import Footer from "@/components/Footer";
import AdminGalleryForm from "@/components/AdminGalleryForm";
import AdminGalleryImages from "@/components/AdminGalleryImages";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <CompanyFactsSection />
        <GallerySection />
        <CertificationsSection />
      </main>

      <Footer />
    </>
  );
}
