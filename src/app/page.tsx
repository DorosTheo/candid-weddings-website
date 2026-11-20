import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { HomeIntro } from "@/components/sections/home/HomeIntro";
import { SelectedWork } from "@/components/sections/home/SelectedWork";
import { FoundersIntro } from "@/components/sections/home/FoundersIntro";
import { ContactPrompt } from "@/components/sections/shared/ContactPrompt";

export const metadata = pageMetadata({ description: site.description, path: "/" });

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeIntro />
      <SelectedWork />
      <FoundersIntro />
      <ContactPrompt />
    </>
  );
}
