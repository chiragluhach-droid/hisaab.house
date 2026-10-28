import config, { type Product } from "@config";
import { formatPrice } from "@/lib/contact";
import { CheckIcon, DashIcon, WhatsAppIcon } from "./icons";
import { Section, SectionHeading } from "./SectionHeading";
import { BuyLink } from "./BuyLink";

export function Pricing() {
  const { products, features, pricingNote } = config;
  return (
    <Section id="passes" className="border-t border-line">
      <div>
        <SectionHeading
          id="passes-title"
          index="04"
          label="Passes"
          title="Choose your pass."
          intro="One-time payment. No subscription."
        />

        <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2 md:items-stretch">
          {products.map((p) => (
            <PriceCard key={p.id} p={p} />
          ))}
        </div>

        <p className="mx-auto mt-6 flex max-w-xl items-start gap-3 rounded-xl border border-line bg-ink-2 p-4 text-[0.9375rem] leading-relaxed text-cream/80 md:text-center">
          <WhatsAppIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#25d366] md:hidden" />
          {pricingNote}
        </p>

        {/* Comparison table — wider screens only. On phones each card carries its own checklist. */}
        <div className="mx-auto mt-14 hidden max-w-4xl md:block">
          <h3 className="text-xl font-semibold">Compare the passes</h3>
          <table className="mt-5 w-full table-fixed border-separate border-spacing-0 overflow-hidden rounded-2xl border border-line text-left">
            <thead>
              <tr className="bg-ink-2">
                <th scope="col" className="label w-1/2 p-4 font-normal">
                  What's included
                </th>
                {products.map((p) => (
                  <th key={p.id} scope="col" className={`p-4 text-center ${p.badge ? "bg-red/10" : ""}`}>
                    <span className="block font-semibold">{p.name}</span>
                    <span className="font-mono text-sm text-muted">{formatPrice(p)}</span>
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
  const included = config.features.filter((f) => p.includes.includes(f.id));
  // On phones, cards also list what they don't include, so they double as the comparison.
  const missing = config.features.filter((f) => !p.includes.includes(f.id));

  return (
    <article
      aria-labelledby={`price-${p.id}`}
      className={`card card-interactive relative flex flex-col p-6 md:p-7 ${
        featured ? "!border-red/70 bg-[linear-gradient(180deg,rgb(232_52_43/0.12),transparent_55%)] shadow-[0_0_0_1px_rgb(232_52_43/0.35),0_24px_60px_-30px_rgb(232_52_43/0.55)]" : ""
      }`}
    >
      {p.badge && <span className="stamp absolute -top-3.5 right-5 bg-ink text-red-text">{p.badge}</span>}
      <h3 id={`price-${p.id}`} className="text-xl font-semibold">
        {p.name}
      </h3>
      <p className="mt-4 flex items-baseline gap-2">
        <span className="font-mono text-[2.75rem] font-semibold leading-none tracking-tight">{formatPrice(p)}</span>
        <span className="label">One-time</span>
      </p>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-cream/75">{p.tagline}</p>

      <ul className="mt-5 flex flex-1 flex-col gap-2.5 border-t border-line pt-5 text-[0.9375rem]">
        {included.map((f) => (
          <li key={f.id} className="flex gap-3">
            <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-mustard" />
            <span>{f.label}</span>
          </li>
        ))}
        {missing.map((f) => (
          <li key={f.id} className="flex gap-3 text-cream/55 md:hidden">
            <DashIcon className="mt-0.5 h-5 w-5 shrink-0" />
            <span>
              <span className="sr-only">Not included: </span>
              {f.label}
            </span>
          </li>
        ))}
      </ul>

      <BuyLink topic={p.id} placement="card" className={`btn mt-7 w-full ${featured ? "btn-primary" : "btn-secondary"}`}>
        <WhatsAppIcon className="h-5 w-5" />
        {p.cta}
      </BuyLink>
    </article>
  );
}
