import config from "@config";
import { PlusIcon, WhatsAppIcon } from "./icons";
import { Section, SectionHeading } from "./SectionHeading";
import { BuyLink } from "./BuyLink";

export function Faq() {
  return (
    <Section id="faq" className="border-t border-line">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
        <div>
          <SectionHeading id="faq-title" index="06" label="FAQ" title="Questions, answered." />
          <div className="mt-6 hidden md:block">
            <FaqContact />
          </div>
        </div>
        <div>
          <div className="divide-y divide-line border-y border-line">
            {config.faq.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex min-h-16 cursor-pointer items-center gap-4 py-4 text-[1.0625rem] font-semibold leading-snug">
                  <span className="flex-1">{f.q}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line-strong text-mustard transition-transform duration-200 group-open:rotate-45">
                    <PlusIcon className="h-4 w-4" />
                  </span>
                </summary>
                <p className="pb-5 pr-12 text-cream/75">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-8 md:hidden">
            <FaqContact />
          </div>
        </div>
      </div>
    </Section>
  );
}

function FaqContact() {
  return (
    <div className="card p-5">
      <p className="font-semibold">Still have a question?</p>
      <p className="mt-1 text-[0.9375rem] text-cream/70">{config.contact.replyTime}</p>
      <BuyLink topic="general" placement="faq" className="btn btn-secondary mt-4 w-full">
        <WhatsAppIcon className="h-5 w-5 text-[#25d366]" />
        Ask on WhatsApp
      </BuyLink>
    </div>
  );
}
