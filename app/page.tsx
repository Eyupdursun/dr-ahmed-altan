import Hero from "@/components/sections/Hero";
import AboutDrAltan from "@/components/sections/AboutDrAltan";
import TeamSection from "@/components/sections/TeamSection";
import ProjectGallery from "@/components/sections/ProjectGallery";
import CustomerReviews from "@/components/sections/CustomerReviews";
import FaqStory from "@/components/sections/FaqStory";
import Accreditations from "@/components/sections/Accreditations";
import ClinicFooter from "@/components/sections/ClinicFooter";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutDrAltan />
      <TeamSection />
      <ProjectGallery />
      <CustomerReviews />
      <FaqStory />
      <Accreditations />
      <ClinicFooter />
    </main>
  );
}
