import type { ReactNode } from "react";
import config from "@config";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-2xl px-5 pb-16 pt-24 md:pt-32">
        <p className="label">Last updated {config.legal.lastUpdated}</p>
        <h1 className="mt-3 text-[clamp(2rem,1.5rem+2vw,3rem)] font-bold leading-tight">{title}</h1>
        <div className="mt-8 flex flex-col gap-4 text-cream/85 [&_a]:text-mustard [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-cream [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2">
          {children}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

export function Contact() {
  const { legal, contact } = config;
  return (
    <ul>
      <li>
        Phone: <a href={`tel:${legal.contactPhone.replace(/\s/g, "")}`}>{legal.contactPhone}</a>
      </li>
      <li>
        Instagram: <a href={contact.instagramUrl}>@{contact.instagramHandle}</a>
      </li>
      {legal.contactEmail && (
        <li>
          Email: <a href={`mailto:${legal.contactEmail}`}>{legal.contactEmail}</a>
        </li>
      )}
    </ul>
  );
}
