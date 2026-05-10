import Navbar from "@/components/Navbar";
import ContactHero from "@/components/ContactHero";
import ContactInfo from "@/components/ContactInfo";
import ContactForm from "@/components/ContactForm";
import ContactMapSection from "@/components/ContactMapSection";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main>
        <ContactHero />
        <ContactInfo />
        <ContactForm />
        <ContactMapSection />
      </main>

      <Footer />
    </>
  );
}
