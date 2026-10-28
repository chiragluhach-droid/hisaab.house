import config from "@config";
import { Countdown } from "./Countdown";
import { WhatsAppIcon } from "./icons";
import { BuyLink } from "./BuyLink";

export function Closing() {
  const { closing } = config;
  return (
    <section id="closing" aria-labelledby="closing-title" className="px-5 pb-16 md:px-8 md:pb-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-mustard/35 bg-[radial-gradient(120%_90%_at_50%_0%,rgb(242_181_23/0.16),transparent_60%)] px-6 py-12 text-center md:py-20">
        <div className="relative">
          <span className="stamp text-mustard">{closing.eyebrow}</span>
          <h2 id="closing-title" className="mx-auto mt-5 max-w-xl text-[clamp(2rem,1.3rem+3vw,3.5rem)] font-bold leading-[1.08]">
            {closing.headline}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-cream/75 md:text-lg">{closing.text}</p>
          {closing.nextLaunch && <Countdown to={closing.nextLaunch} label={closing.nextLaunchLabel} />}
          <div className="mx-auto mt-8 flex max-w-sm flex-col gap-3">
            <BuyLink topic="general" placement="closing" className="btn btn-primary w-full">
              <WhatsAppIcon className="h-5 w-5" />
              {closing.cta}
            </BuyLink>
            <p className="label">{config.contact.replyTime}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
