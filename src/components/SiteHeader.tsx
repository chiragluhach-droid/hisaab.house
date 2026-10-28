"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import config from "@config";
import { formatPrice } from "@/lib/contact";
import { Art } from "./Art";
import { BuyLink } from "./BuyLink";
import { ArrowIcon, CloseIcon, InstagramIcon, MenuIcon, WhatsAppIcon } from "./icons";

const { nav } = config;
const desktopLinks = nav.filter((l) => !("desktop" in l) || l.desktop !== false);
const passes = config.products;
const fromPrice = formatPrice(passes.reduce((a, b) => ((b.price ?? Infinity) < (a.price ?? Infinity) ? b : a)));

function Logo({ size }: { size: "sm" | "lg" }) {
  return (
    <span aria-hidden className={`block shrink-0 overflow-hidden bg-mustard ${size === "sm" ? "h-8 w-8 rounded-lg" : "h-11 w-11 rounded-xl"}`}>
      <Art
        name="logo"
        alt=""
        sizes={size === "sm" ? "32px" : "44px"}
        priority={size === "sm"}
        fallback={<span className="grid h-full place-items-center text-[0.625rem] font-bold text-ink">HH</span>}
      />
    </span>
  );
}

/** The section filling the top third of the screen, so the menu can mark "you are here". */
function currentSection() {
  let current: string | null = null;
  const line = window.innerHeight / 3;
  for (const { id } of nav) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= line) current = id;
  }
  return current;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 120);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu: lock page scroll, close on Escape, keep focus inside.
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("nav a")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab" || !panel.current) return;
      const items = panel.current.querySelectorAll<HTMLElement>("a, button");
      const first = items[0];
      const lastItem = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        lastItem.focus();
      } else if (!e.shiftKey && document.activeElement === lastItem) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      menuBtn.current?.focus({ preventScroll: true });
    };
  }, [open]);

  const openMenu = () => {
    setActive(currentSection());
    setOpen(true);
  };
  const close = () => setOpen(false);
  const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[transform,background-color,border-color] duration-300 ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${scrolled ? "border-b border-line bg-ink/85 backdrop-blur-md" : "border-b border-transparent"}`}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:h-16 md:px-8">
          <a href="/" className="-mx-2 flex min-h-12 items-center gap-2.5 px-2 font-mono text-[0.8125rem] font-bold tracking-[0.18em]">
            <Logo size="sm" />
            {config.site.wordmark}
          </a>

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {desktopLinks.map((l) => (
              <a key={l.id} href={`/#${l.id}`} className="rounded-lg px-3 py-2 text-[0.9375rem] text-muted transition-colors hover:text-cream">
                {l.label}
              </a>
            ))}
            <a href="/#passes" className="btn btn-primary ml-3 !min-h-10 !px-4 text-[0.9375rem]">
              {config.hero.primaryCta}
            </a>
          </nav>

          <button
            ref={menuBtn}
            type="button"
            className="-mr-3 grid h-12 w-12 place-items-center rounded-xl md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={openMenu}
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="menu-panel fixed inset-0 z-50 flex flex-col overflow-y-auto overscroll-contain bg-ink bg-[radial-gradient(90%_45%_at_100%_0%,rgb(242_181_23/0.12),transparent_70%)] px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:hidden"
        >
          <div className="flex h-14 shrink-0 items-center justify-between">
            <a href="/" onClick={close} className="-mx-2 flex min-h-12 items-center gap-2.5 px-2 font-mono text-[0.8125rem] font-bold tracking-[0.18em]">
              <Logo size="sm" />
              {config.site.wordmark}
            </a>
            <button
              type="button"
              className="-mr-1 grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-ink-2 text-cream transition-colors active:bg-ink-3"
              aria-label="Close menu"
              onClick={close}
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <p className="menu-item label mt-5 flex items-center gap-3" style={stagger(0)}>
            <span aria-hidden className="h-px w-6 bg-mustard" />
            Index
            <span className="text-muted/70">· {nav.length} sections</span>
          </p>

          <nav aria-label="Mobile" className="mt-3 flex flex-col">
            {nav.map((l, i) => {
              const here = active === l.id;
              return (
                <a
                  key={l.id}
                  href={`/#${l.id}`}
                  onClick={close}
                  aria-current={here ? "location" : undefined}
                  style={stagger(i + 1)}
                  className={`menu-item group flex min-h-[4.5rem] items-center gap-4 border-b border-line py-3 transition-colors active:bg-ink-2 ${
                    here ? "text-mustard" : ""
                  }`}
                >
                  <span className={`w-6 shrink-0 font-mono text-xs ${here ? "text-mustard" : "text-mustard/70"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 text-[1.625rem] font-semibold leading-tight tracking-tight">
                      {l.label}
                      {here && (
                        <span className="rounded-full bg-mustard/15 px-2 py-0.5 font-mono text-[0.625rem] font-medium uppercase tracking-wider text-mustard">
                          You’re here
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block text-[0.875rem] leading-snug text-muted">{l.hint}</span>
                  </span>
                  <span
                    aria-hidden
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-transform group-active:translate-x-0.5 ${
                      here ? "border-mustard/50 text-mustard" : "border-line-strong text-cream/70"
                    }`}
                  >
                    <ArrowIcon className="h-4 w-4" />
                  </span>
                </a>
              );
            })}
          </nav>

          <div className="menu-item mt-auto pt-8" style={stagger(nav.length + 1)}>
            <div className="card p-4">
              <div className="flex items-center gap-3">
                <Logo size="lg" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold leading-tight">
                    {passes.length} passes, from <span className="text-mustard">{fromPrice}</span>
                  </p>
                  <p className="label mt-1">{passes.map((p) => p.name.replace(/ Pass$/, "")).join(" · ")} · one-time</p>
                </div>
              </div>
              <a href="/#passes" className="btn btn-primary mt-4 w-full" onClick={close}>
                {config.hero.primaryCta}
              </a>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <a href={config.contact.instagramUrl} rel="noopener" className="btn btn-secondary !min-h-12 !px-3 text-[0.9375rem]">
                <InstagramIcon className="h-5 w-5" />
                Instagram
              </a>
              <BuyLink topic="general" placement="menu" className="btn btn-secondary !min-h-12 !px-3 text-[0.9375rem]" onClick={close}>
                <WhatsAppIcon className="h-5 w-5 text-[#25d366]" />
                WhatsApp
              </BuyLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
