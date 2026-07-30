import { GetInvolved } from "@/components/home/get-involved";
import { Hero } from "@/components/home/hero";
import { HowWeWork } from "@/components/home/how-we-work";
import { Memorial } from "@/components/home/memorial";
import { NewsPreview } from "@/components/home/news-preview";
import { ProjectsPreview } from "@/components/home/projects-preview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Memorial />
      <ProjectsPreview />
      <HowWeWork />
      <NewsPreview />
      <GetInvolved />
    </>
  );
}
