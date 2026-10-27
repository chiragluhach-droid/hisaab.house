import config from "@config";
import { Collapsible } from "./Collapsible";
import { Section, SectionHeading } from "./SectionHeading";

export function Inside() {
  const { playbook, recording } = config.inside;
  return (
    <Section id="inside" className="border-t border-line">
      <SectionHeading
        id="inside-title"
        index="03"
        label="What's inside"
        title="Everything I do, written down."
        intro="Both passes include the playbook. The Over-the-Shoulder Pass adds a full recording of one reel being made, start to finish, plus a 45-minute 1:1 call."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-6">
        {[playbook, recording].map((part) => (
          <Collapsible key={part.title} title={part.title} meta={`${part.meta} · ${part.chapters.length} chapters`}>
            <ol className="divide-y divide-line">
              {part.chapters.map((c, i) => (
                <li key={c.title} className="flex gap-4 px-5 py-4 md:px-6">
                  <span className="w-6 shrink-0 pt-0.5 font-mono text-[0.8125rem] text-mustard">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-semibold leading-snug">{c.title}</span>
                    <span className="mt-0.5 block text-[0.9375rem] leading-relaxed text-cream/70">{c.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Collapsible>
        ))}
      </div>
    </Section>
  );
}
