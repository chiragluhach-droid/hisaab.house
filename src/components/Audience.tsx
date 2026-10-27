import config from "@config";
import { CheckIcon, CloseIcon } from "./icons";
import { Section, SectionHeading } from "./SectionHeading";

export function Audience() {
  const { audience } = config;
  return (
    <Section id="fit" className="border-t border-line">
      <SectionHeading id="fit-title" index="05" label="Fit" title="Is this for you?" intro="An honest answer before you spend anything." />
      <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-6">
        <div className="card p-6">
          <h3 className="label !text-mustard">Who it’s for</h3>
          <ul className="mt-4 flex flex-col gap-3.5">
            {audience.for.map((t) => (
              <li key={t} className="flex gap-3">
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-mustard" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6">
          <h3 className="label !text-red-text">Who it’s not for</h3>
          <ul className="mt-4 flex flex-col gap-3.5">
            {audience.notFor.map((t) => (
              <li key={t} className="flex gap-3 text-cream/80">
                <CloseIcon className="mt-0.5 h-5 w-5 shrink-0 text-red-text" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
