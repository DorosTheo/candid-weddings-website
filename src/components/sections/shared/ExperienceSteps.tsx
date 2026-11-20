import { experienceSteps } from "@/data/experience";
import { Reveal } from "@/components/ui/Reveal";

/** The four-step process — numbered, underlined headings, generous rhythm. */
export function ExperienceSteps() {
  return (
    <ol className="space-y-12 md:space-y-14">
      {experienceSteps.map((step, i) => (
        <Reveal as="li" key={step.number} delay={i * 0.05} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-line pt-6">
          <span className="eyebrow pt-1.5 text-muted">{step.number}</span>
          <div>
            <h3 className="text-[1.05rem] font-medium underline decoration-1 underline-offset-[0.35em]">{step.title}</h3>
            <p className="body-sm mt-3 max-w-md text-ink-soft">{step.body}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
