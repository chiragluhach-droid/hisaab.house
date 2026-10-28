import config, { type Product } from "@config";
import { formatPrice } from "@/lib/contact";
import { CheckIcon, DashIcon, WhatsAppIcon } from "./icons";
import { Section, SectionHeading } from "./SectionHeading";
import { BuyLink } from "./BuyLink";
import { WasPrice } from "./WasPrice";

export function Pricing() {
  const { products, features, pricingNote } = config;
  return (
    <Section id="passes" className="border-t border-line">
      <div>
        <SectionHeading
          id="passes-title"
          index="05"
          label="Pricing"
          title="Pick your file."
          intro="One-time payment. No subscription."
        />

        <div className="mx-auto mt-8 grid gap-6 md:mt-10 md:grid-cols-2 md:gap-5 md:items-stretch lg:grid-cols-3">
          {products.map((p) => (
            <PriceCard key={p.id} p={p} />
          ))}
        </div>

        <p className="mx-auto mt-6 flex max-w-xl items-start gap-3 rounded-xl border border-line bg-ink-2 p-4 text-[0.9375rem] leading-relaxed text-cream/80 md:text-center">
          <WhatsAppIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#25d366] md:hidden" />
          {pricingNote}
        </p>

        {/* Comparison table — wider screens only. On phones each card carries its own checklist. */}
        <div className="mx-auto mt-14 hidden md:block">
          <h3 className="text-xl font-semibold">Compare</h3>
          <table className="mt-5 w-full table-fixed border-separate border-spacing-0 overflow-hidden rounded-2xl border border-line text-left">
            <thead>
              <tr className="bg-ink-2">
                <th scope="col" className="label w-[40%] p-4 font-normal">
                  What's included
                </th>
                {products.map((p) => (
                  <th key={p.id} scope="col" className={`p-4 text-center ${p.badge ? "bg-red/10" : ""}`}>
                    <span className="block font-semibold">{p.name}</span>
                    <span className="font-mono text-sm text-muted">
                      {p.compareAt && <span className="mr-1.5 text-cream/35 line-through">₹{p.compareAt}</span>}
                      {formatPrice(p)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((f) => (
                <tr key={f.id}>
                  <th scope="row" className="border-t border-line p-4 font-normal text-cream/85">
                    {f.label}
                  </th>
                  {products.map((p) => {
                    const has = p.includes.includes(f.id);
                    return (
                      <td key={p.id} className={`border-t border-line p-4 text-center ${p.badge ? "bg-red/[0.06]" : ""}`}>
                        {has ? (
                          <CheckIcon className="mx-auto h-5 w-5 text-mustard" aria-label="Included" role="img" aria-hidden={false} />
                        ) : (
                          <DashIcon className="mx-auto h-5 w-5 text-cream/25" aria-label="Not included" role="img" aria-hidden={false} />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}

function PriceCard({ p }: { p: Product }) {
  const featured = Boolean(p.badge);
  const lines = p.cardLines ?? config.features.filter((f) => p.includes.includes(f.id)).map((f) => f.label);
  // Only the Founder's Pass leads with a highlighted line (its @ in the story).
  const highlightFirst = Boolean(p.cardLines);

  return (
    <article
      aria-labelledby={`price-${p.id}`}
      className={`card card-interactive relative flex flex-col p-5 md:p-7 ${p.badge ? "pt-8 md:pt-9" : ""} ${
        featured ? "!border-red/70 bg-[linear-gradient(180deg,rgb(232_52_43/0.12),transparent_55%)] shadow-[0_0_0_1px_rgb(232_52_43/0.35),0_24px_60px_-30px_rgb(232_52_43/0.55)]" : ""
      }`}
    >
      {p.badge && <span className="stamp absolute -top-3.5 right-5 bg-ink text-red-text">{p.badge}</span>}
      <div className="flex items-end justify-between gap-3">
        <h3 id={`price-${p.id}`} className="text-lg font-semibold leading-tight md:text-xl">
          {p.name}
        </h3>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <WasPrice p={p} />
          <p className="flex items-baseline gap-1.5">
            <span className="font-mono text-[2rem] font-semibold leading-none tracking-tight md:text-[2.75rem]">{formatPrice(p)}</span>
            <span className="label !text-[0.625rem]">One-time</span>
          </p>
        </div>
      </div>
      <p className="mt-2.5 text-[0.875rem] leading-snug text-cream/70 md:mt-3 md:text-[0.9375rem] md:leading-relaxed">{p.tagline}</p>

      <ul className="mt-4 flex flex-1 flex-col gap-2 border-t border-line pt-4 text-[0.9375rem] leading-snug md:mt-5 md:gap-2.5 md:pt-5">
        {lines.map((label, i) => {
          const hi = highlightFirst && i === 0;
          // A bracketed line, e.g. "(Guide included & 1:1 call)", reads as a footnote to the line above.
          if (label.startsWith("("))
            return (
              <li key={label} className="pl-[1.875rem] text-[0.875rem] text-cream/60">
                {label}
              </li>
            );
          return (
            <li key={label} className={`flex gap-2.5 ${hi ? "font-semibold text-mustard" : ""}`}>
              {hi ? (
                <span aria-hidden className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mustard font-mono text-[0.6875rem] font-bold text-ink">
                  @
                </span>
              ) : (
                <CheckIcon className="h-5 w-5 shrink-0 text-mustard" />
              )}
              <span>{label}</span>
            </li>
          );
        })}
      </ul>

      <BuyLink topic={p.id} placement="card" className={`btn mt-5 w-full md:mt-7 ${featured ? "btn-primary" : "btn-secondary"}`}>
        <WhatsAppIcon className="h-5 w-5" />
        {p.cta}
      </BuyLink>
    </article>
  );
}
