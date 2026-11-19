import { experienceSteps } from "@/data/experience";
import { Reveal } from "@/components/ui/Reveal";

/** The four-step process — numbered, underlined headings, generous rhythm (Reference 2). */
export function ExperienceSteps({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={compact ? "space-y-10 md:space-y-12" : "space-y-14 md:space-y-20"}>
      {experienceSteps.map((step, i) => (
        <Reveal as="li" key={step.number} delay={i * 0.06} className="grid grid-cols-[3rem_1fr] gap-x-4 md:grid-cols-[4.5rem_1fr]">
          <span className="font-serif text-[1.65rem] leading-none italic text-muted md:text-[2rem]">{step.number}</span>
          <div>
            <h3 className="text-[1.15rem] font-medium tracking-[-0.005em] underline decoration-1 underline-offset-[0.35em] md:text-[1.3rem]">
              {step.title}
            </h3>
            <p className="caps mt-4 max-w-[34rem] text-ink-soft">{step.body}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
