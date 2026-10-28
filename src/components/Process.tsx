import config from "@config";
import { stepIcons } from "./icons";
import { Section, SectionHeading } from "./SectionHeading";

export function Process() {
  return (
    <Section id="process" className="border-t border-line">
      <SectionHeading
        id="process-title"
        index="02"
        label="Process"
        title="From idea to vote, in six steps."
        intro="The same workflow behind every episode. The Hisaab Guide breaks each step down in detail."
      />
      <ol className="relative mt-10 grid gap-3 md:grid-cols-3 md:gap-5">
        {/* Timeline spine on phones */}
        <span aria-hidden className="absolute bottom-6 left-[1.6875rem] top-6 w-px bg-line-strong md:hidden" />
        {config.process.map((s, i) => {
          const Icon = stepIcons[s.icon];
          return (
            <li key={s.title} className="relative flex gap-4 md:flex-col md:rounded-2xl md:border md:border-line md:bg-ink-2 md:p-6">
              <span className="relative z-10 grid h-[3.375rem] w-[3.375rem] shrink-0 place-items-center rounded-2xl border border-line-strong bg-ink-2 text-mustard md:h-12 md:w-12 md:rounded-xl">
                <Icon />
              </span>
              <div className="card flex-1 p-4 md:border-0 md:bg-transparent md:p-0">
                <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted">Step {String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-0.5 text-lg font-semibold leading-snug">{s.title}</h3>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-cream/70 md:text-base">{s.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
