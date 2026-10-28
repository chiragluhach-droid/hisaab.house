"use client";

import type { ComponentProps } from "react";
import { track } from "@/lib/analytics";
import { buyHref, type Placement, type Topic } from "@/lib/contact";
import { useIsMobileDevice } from "@/lib/useIsMobileDevice";

type Props = Omit<ComponentProps<"a">, "href" | "target"> & {
  topic: Topic;
  placement: Placement;
};

/**
 * A buy / chat button. Opens WhatsApp with the topic's pre-filled message.
 * Desktop: new tab (WhatsApp Web). Phones and Instagram's in-app browser:
 * same tab, so wa.me can hand off to the WhatsApp app.
 */
export function BuyLink({ topic, placement, onClick, children, ...rest }: Props) {
  const mobile = useIsMobileDevice();
  return (
    <a
      href={buyHref(topic)}
      target={mobile ? undefined : "_blank"}
      rel="noopener"
      data-wa={topic}
      data-placement={placement}
      onClick={(e) => {
        track("whatsapp_click", { product: topic, placement });
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
