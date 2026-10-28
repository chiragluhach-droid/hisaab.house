import { Audience } from "@/components/Audience";
import { Closing } from "@/components/Closing";
import { Faq } from "@/components/Faq";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Hero } from "@/components/Hero";
import { Inside } from "@/components/Inside";
import { Pricing } from "@/components/Pricing";
import { Process } from "@/components/Process";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Ticker } from "@/components/Ticker";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Ticker />
        <Work />
        <Process />
        <Inside />
        <Pricing />
        <Audience />
        <Faq />
        <Closing />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
