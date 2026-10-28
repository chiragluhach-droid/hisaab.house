import { BuyLink } from "./BuyLink";
import { WhatsAppIcon } from "./icons";

/** Desktop only: a floating WhatsApp button, bottom-right. */
export function FloatingWhatsApp() {
  return (
    <BuyLink
      topic="general"
      placement="floating"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-30 hidden h-14 w-14 place-items-center rounded-full bg-[#25d366] text-[#0b2e17] shadow-[0_12px_30px_-8px_rgb(0_0_0/0.7)] transition-transform hover:scale-105 md:grid"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </BuyLink>
  );
}
