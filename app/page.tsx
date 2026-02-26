import Hero from "@/components/sections/Hero";
import AboutDrAltan from "@/components/sections/AboutDrAltan";
import ProjectGallery from "@/components/sections/ProjectGallery";
import CustomerReviews from "@/components/sections/CustomerReviews";
import FaqStory from "@/components/sections/FaqStory";
import ClinicFooter from "@/components/sections/ClinicFooter";
import EdgeIconRail from "@/components/ui/EdgeIconRail";

export default function Home() {
  return (
    <main className="mobile-stack-root">
      <EdgeIconRail />

      <Hero />
      <div className="mobile-stack-panel">
        <AboutDrAltan />
      </div>
      <ProjectGallery />
      <CustomerReviews />
      <FaqStory />
      <ClinicFooter />
    </main>
  );
}
