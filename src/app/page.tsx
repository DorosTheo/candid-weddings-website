import { media } from "@/data/media";
import { homeCopy } from "@/data/copy";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { HomeIntro } from "@/components/sections/home/HomeIntro";
import { FeaturedWeddings } from "@/components/sections/home/FeaturedWeddings";
import { FoundersIntro } from "@/components/sections/home/FoundersIntro";
import { Services } from "@/components/sections/home/Services";
import { ExperiencePreview } from "@/components/sections/home/ExperiencePreview";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";

export const metadata = pageMetadata({
  description: `${site.description}`,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeIntro />
      <FeaturedWeddings />
      <FoundersIntro />
      <Services />
      <ExperiencePreview />
      <CtaBanner image={media.homeCta} lines={homeCopy.finalCta.statement} body={homeCopy.finalCta.body} />
    </>
  );
}
