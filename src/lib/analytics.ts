"use client";

type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, opts?: { props?: Params }) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const STORE = "hh_utm";

/** Keep the UTM parameters from the landing URL (e.g. the Instagram bio link) for this session. */
export function captureUtm() {
  try {
    const q = new URLSearchParams(window.location.search);
    const found: Params = {};
    for (const k of UTM_KEYS) if (q.get(k)) found[k] = q.get(k)!;
    if (Object.keys(found).length) sessionStorage.setItem(STORE, JSON.stringify(found));
  } catch {}
}

function utm(): Params {
  try {
    return JSON.parse(sessionStorage.getItem(STORE) ?? "{}");
  } catch {
    return {};
  }
}

/** Sends one event to whichever analytics tools are enabled. */
export function track(event: string, params: Params = {}) {
  const data = { ...utm(), ...params };
  try {
    window.gtag?.("event", event, { ...data, transport_type: "beacon" });
    window.plausible?.(event, { props: data });
    window.fbq?.("trackCustom", event, data);
    if (event === "instagram_dm_click") window.fbq?.("track", "Contact", data);
  } catch {}
  if (process.env.NODE_ENV !== "production") console.info("[track]", event, data);
}
