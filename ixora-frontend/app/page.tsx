import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import BrandDivider from "@/components/ui/BrandDivider";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Services from "@/components/home/Services";
import Pricing from "@/components/home/Pricing";
import Brochures from "@/components/home/BrochuresPreview"
import Gallery from "@/components/home/Gallery"
import ContactCTA from "@/components/home/ContactCTA"

export default function Home() {
  return (
    <div>
      <Hero />
      <BrandDivider text="IXORA TECH" />
      <AboutSection />
      <WhyChooseUs />
      <BrandDivider text="PROTECH AUTOMATION" />
      <Services />
      <Pricing />
      <Brochures/>
       <BrandDivider text="IXORA TECH" />
      <Gallery/>
      <ContactCTA/>
    </div>
  );
}
