import CTASection from './CTASection';
import FAQSection from './FAQSection';
import FeaturesSection from './FeaturesSection';
import HeroSection from './HeroSection';
import HowItWorksSection from './HowItWorksSection';
import PricingSection from './PricingSection';
import TestimonialSection from './TestimonialSection';
import ValuePropositionSection from './ValuePropositionSection';

export default function LandingPageComponent() {
  return (
    <div className="z-0 text-start md:text-center">
      <HeroSection />
      <ValuePropositionSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <div className="h-16"></div>
    </div>
  );
}
