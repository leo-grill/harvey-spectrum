import HeroSection from "@/components/HeroSection";
import BioSection from "@/components/BioSection";
import AboutSection from "@/components/AboutSection";
import FullBleedPhoto from "@/components/FullBleedPhoto";
import ServicesSection from "@/components/ServicesSection";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { client } from "@/sanity/lib/client";
import { portfolioQuery } from "@/sanity/queries";
import type { PortfolioItem } from "@/components/SelectedWorkSection";

export const revalidate = 30;

export default async function Home() {
  const portfolioItems: PortfolioItem[] = await client.fetch(portfolioQuery);

  return (
    <>
    <Navbar />
    <main>
      <HeroSection />
      <BioSection />
      <AboutSection />
      <FullBleedPhoto />
      <ServicesSection />
      <SelectedWorkSection items={portfolioItems} />
      <TestimonialsSection />
      <NewsSection />
      <Footer />
    </main>
    </>
  );
}
