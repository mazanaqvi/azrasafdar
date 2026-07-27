import { GetInvolved } from "@/components/home/get-involved";
import { Hero } from "@/components/home/hero";
import { HowWeWork } from "@/components/home/how-we-work";
import { Impact } from "@/components/home/impact";
import { NewsPreview } from "@/components/home/news-preview";
import { ProjectsPreview } from "@/components/home/projects-preview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Impact />
      <ProjectsPreview />
      <HowWeWork />
      <NewsPreview />
      <GetInvolved />
    </>
  );
}
