"use client";

import type { ComponentProps } from "react";
import { track } from "@/lib/analytics";
import { buyHref, messageFor, type Placement, type Topic } from "@/lib/contact";
import { useIsMobileDevice } from "@/lib/useIsMobileDevice";

type Props = Omit<ComponentProps<"a">, "href" | "target"> & {
  topic: Topic;
  placement: Placement;
};

/** Instagram can't pre-fill a DM, so the message goes to the clipboard on tap. */
function copy(text: string) {
  try {
    if (navigator.clipboard?.writeText) return void navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  } catch {}
  fallbackCopy(text);
}

// Older in-app browsers (incl. some Instagram webviews) lack the async clipboard API.
function fallbackCopy(text: string) {
  try {
    const t = document.createElement("textarea");
    t.value = text;
    t.setAttribute("readonly", "");
    t.style.cssText = "position:fixed;top:0;left:0;opacity:0";
    document.body.appendChild(t);
    t.select();
    document.execCommand("copy");
    t.remove();
  } catch {}
}

/**
 * A buy / chat button. Opens a DM with @hisaab.house and copies the topic's
 * message so the buyer can paste and send. Desktop: new tab. Phones and
 * Instagram's in-app browser: same tab, so ig.me hands off to the Instagram app.
 */
export function DmLink({ topic, placement, onClick, children, ...rest }: Props) {
  const mobile = useIsMobileDevice();
  return (
    <a
      href={buyHref(topic)}
      target={mobile ? undefined : "_blank"}
      rel="noopener"
      data-dm={topic}
      data-placement={placement}
      onClick={(e) => {
        copy(messageFor(topic));
        track("instagram_dm_click", { product: topic, placement });
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
