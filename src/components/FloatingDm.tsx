import { InstagramIcon } from "./icons";
import { DmLink } from "./DmLink";

/** Desktop only: a floating "DM us" button, bottom-right. */
export function FloatingDm() {
  return (
    <DmLink
      topic="general"
      placement="floating"
      aria-label="DM us on Instagram"
      className="fixed bottom-6 right-6 z-30 hidden h-14 w-14 place-items-center rounded-full bg-[linear-gradient(135deg,#f9a825,#e1306c_55%,#833ab4)] text-white shadow-[0_12px_30px_-8px_rgb(0_0_0/0.7)] transition-transform hover:scale-105 md:grid"
    >
      <InstagramIcon className="h-7 w-7" />
    </DmLink>
  );
}
