import HeroSection from "./_components/hero-section";
import TrustBar from "./_components/trust-bar";
import AboutSection from "./_components/about-section";
import ActivitiesSection from "./_components/activities-section";
import ScheduleSection from "./_components/schedule-section";
import TicketsSection from "./_components/tickets-section";
import VenueSection from "./_components/venue-section";
import SponsorsSection from "./_components/sponsors-section";
import TestimonialsSection from "./_components/testimonials-section";
import FAQSection from "./_components/faq-section";
import CTASection from "./_components/cta-section";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-(--bg) text-(--on-bg-high)">
      <HeroSection />
      <TrustBar />
      <AboutSection />
      <ActivitiesSection />
      <ScheduleSection />
      <TicketsSection />
      <VenueSection />
      <SponsorsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
