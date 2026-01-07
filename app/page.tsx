import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
