"use client";

import { useSyncExternalStore } from "react";

const MOBILE_UA = /Android|iPhone|iPad|iPod|Mobile|Instagram|FBAN|FBAV|Opera Mini|IEMobile/i;

function isMobile() {
  const ua = navigator.userAgent;
  // iPadOS reports itself as a Mac.
  return MOBILE_UA.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

/** `true` on phones/tablets (incl. Instagram's in-app browser), `false` on desktop and during SSR. */
export function useIsMobileDevice() {
  return useSyncExternalStore(
    () => () => {},
    isMobile,
    () => false,
  );
}
