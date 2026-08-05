import Hero from "@/components/home/Hero";
import FeaturedGear from "@/components/home/FeaturedGear";
import Categories from "@/components/home/Categories";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedGear />
      <Categories />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </>
  );
}
