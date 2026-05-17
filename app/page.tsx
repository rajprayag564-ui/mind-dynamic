import { FeaturesSection } from "@/components/landing/features-section";
import { HeroSection } from "@/components/landing/hero-section";
import { LearningModes } from "@/components/landing/learning-modes";
import { Navbar } from "@/components/landing/navbar";
import { PricingCtaSection } from "@/components/landing/pricing-cta-section";
import { SiteFooter } from "@/components/landing/site-footer";
import { flagshipCourse } from "@/lib/course-data";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0F2C] text-white">
      <Navbar />
      <main>
        <HeroSection course={flagshipCourse} />
        <FeaturesSection />
        <LearningModes />
        <PricingCtaSection course={flagshipCourse} />
      </main>
      <SiteFooter />
    </div>
  );
}
