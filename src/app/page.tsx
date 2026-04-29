import HeroSection from "@/components/HeroSection";
import BioSection from "@/components/BioSection";
import AboutSection from "@/components/AboutSection";
import FullBleedPhoto from "@/components/FullBleedPhoto";
import ServicesSection from "@/components/ServicesSection";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsSection from "@/components/NewsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BioSection />
      <AboutSection />
      <FullBleedPhoto />
      <ServicesSection />
      <SelectedWorkSection />
      <TestimonialsSection />
      <NewsSection />
    </main>
  );
}
