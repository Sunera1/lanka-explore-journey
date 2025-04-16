
import { CategorySection } from "@/components/home/CategorySection";
import { PopularDestinations } from "@/components/home/PopularDestinations";
import { HeroSection } from "@/components/home/HeroSection";
import { TransportSection } from "@/components/home/TransportSection";
import { AccommodationSection } from "@/components/home/AccommodationSection";
import { EmergencyCallout } from "@/components/home/EmergencyCallout";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <CategorySection />
        <PopularDestinations />
        <TransportSection />
        <AccommodationSection />
        <EmergencyCallout />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
