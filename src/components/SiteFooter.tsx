import config from "@config";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { BuyLink } from "./BuyLink";

export function SiteFooter() {
  return (
    <footer className="border-t border-line pb-[calc(2.5rem+env(safe-area-inset-bottom))] pt-10 md:pb-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 md:flex-row md:items-start md:justify-between md:px-8">
        <div>
          <p className="font-mono text-[0.8125rem] font-bold tracking-[0.18em]">{config.site.wordmark}</p>
          <p className="mt-2 max-w-xs text-[0.9375rem] text-cream/65">{config.footer.note}</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 md:flex md:gap-2">
          <a href={config.contact.instagramUrl} rel="noopener" className="flex min-h-12 items-center gap-2.5 text-cream/85 hover:text-cream md:px-3">
            <InstagramIcon className="h-5 w-5" />@{config.contact.instagramHandle}
          </a>
          <BuyLink topic="general" placement="footer" className="flex min-h-12 items-center gap-2.5 text-cream/85 hover:text-cream md:px-3">
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp
          </BuyLink>
          <a href="/privacy" className="flex min-h-12 items-center text-cream/65 hover:text-cream md:px-3">
            Privacy Policy
          </a>
          <a href="/terms" className="flex min-h-12 items-center text-cream/65 hover:text-cream md:px-3">
            Terms
          </a>
        </nav>
      </div>
      <p className="label mx-auto mt-8 max-w-6xl px-5 md:px-8">
        © {new Date().getFullYear()} {config.legal.businessName}
      </p>
    </footer>
  );
}
