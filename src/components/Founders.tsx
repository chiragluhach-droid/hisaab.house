import type { ReactNode } from "react";
import config from "@config";
import { formatPrice, product } from "@/lib/contact";
import { BuyLink } from "./BuyLink";
import { WasPrice } from "./WasPrice";
import { WhatsAppIcon } from "./icons";

const founder = product("founder");
const character = product("character");

/** Headline with `highlight` on its own line in mustard, and the "@" set in mono. */
function Highlight({ text, highlight }: { text: string; highlight: string }) {
  const i = text.indexOf(highlight);
  const lead = i < 0 ? text : text.slice(0, i).trimEnd();
  const withAt = lead.split("@").flatMap((part, j) =>
    j === 0 ? [part] : [<span key={j} className="font-mono font-semibold text-mustard">@</span>, part],
  );
  return (
    <>
      <span className="block">{withAt}</span>
      {i >= 0 && <span className="block text-mustard">{highlight}</span>}
    </>
  );
}

export function Founders() {
  const { founders } = config;
  return (
    <section id="founders" aria-labelledby="founders-title" className="scroll-mt-16 border-t border-line py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
          <div>
            <p className="label flex items-center gap-3">
              <span className="text-mustard">File 04</span>
              <span aria-hidden className="h-px w-8 bg-line-strong" />
              {founders.eyebrow}
            </p>
            <h2
              id="founders-title"
              className="mt-3 text-[clamp(2.75rem,1.8rem+4.6vw,4.5rem)] font-[750] leading-[1.02] tracking-[-0.04em]"
            >
              <Highlight text={founders.headline} highlight={founders.highlight} />
            </h2>
            <p className="mt-4 max-w-md text-cream/80 md:text-lg">{founders.text}</p>
          </div>

          <Ticket note={founders.ticketNote} />
        </div>

        <h3 className="label mt-16 !text-mustard md:mt-20">How it works</h3>
        <p className="mt-2 text-[clamp(1.75rem,1.3rem+2vw,2.5rem)] font-extrabold uppercase leading-none tracking-tight">
          {founders.steps.length} easy steps
        </p>
        <ol className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-5">
          {founders.steps.map((s, i) => (
            <li key={s.title} className="flex flex-col">
              <div className="relative grid h-32 place-items-center rounded-2xl border border-line bg-[linear-gradient(160deg,#211c19,#171311)] px-3 md:h-40">
                <span className="absolute -left-1.5 -top-2.5 grid h-8 w-8 place-items-center rounded-full bg-mustard font-mono text-sm font-bold text-ink shadow-[0_4px_12px_-4px_rgb(242_181_23/0.6)]">
                  {i + 1}
                </span>
                <StepArt index={i} />
              </div>
              <span className="mt-3 text-center text-[1rem] font-extrabold uppercase leading-tight tracking-tight">{s.title}</span>
              <span className="mt-1 text-center text-[0.875rem] leading-snug text-cream/65">{s.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Ticket({ note }: { note: string }) {
  return (
    <div className="relative rounded-3xl border border-mustard/40 bg-[radial-gradient(120%_80%_at_0%_0%,rgb(122_31_43/0.65),transparent_60%),linear-gradient(180deg,#1f1a17,#171311)] shadow-[0_30px_70px_-35px_rgb(242_181_23/0.45)]">
      <span aria-hidden className="stamp absolute -top-3.5 right-5 bg-ink text-mustard">
        Founder
      </span>
      <ProfilePic className="absolute right-5 top-7 md:right-7 md:top-9" />
      <div className="px-6 pb-6 pt-7 md:px-8 md:pt-9">
        <p className="label !text-mustard">{founder.name}</p>
        <p className="mt-3 font-mono text-[clamp(3.25rem,2.4rem+4vw,4.75rem)] font-bold leading-none tracking-tight text-cream">@you</p>
        <p className="label mt-3">
          {config.series.title} · {note}
        </p>
      </div>

      {/* Ticket perforation */}
      <div aria-hidden className="relative h-0 border-t-2 border-dashed border-mustard/30">
        <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full border border-mustard/40 bg-ink [clip-path:inset(0_0_0_50%)]" />
        <span className="absolute -right-3 -top-3 h-6 w-6 rounded-full border border-mustard/40 bg-ink [clip-path:inset(0_50%_0_0)]" />
      </div>

      <div className="px-6 pb-6 pt-6 md:px-8 md:pb-8">
        <ul className="flex flex-col gap-2 text-[0.9375rem] text-cream/80">
          {founder.cardLines?.map((line, i) =>
            line.startsWith("(") ? (
              <li key={line} className="text-[0.875rem] text-cream/60">
                {line}
              </li>
            ) : (
              <li key={line} className={i === 0 ? "font-semibold text-cream" : ""}>
                <span className="text-mustard">+</span> {line}
              </li>
            ),
          )}
        </ul>
        <BuyLink topic="founder" placement="founders" className="btn btn-primary mt-5 w-full">
          <WhatsAppIcon className="h-5 w-5" />
          {founder.cta}
        </BuyLink>
        <p className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5">
          <WasPrice p={founder} />
          <span className="label !text-[0.6875rem]">One-time · pay on WhatsApp</span>
        </p>
        <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-line bg-ink/50 px-4 py-3">
          <span className="min-w-0 text-[0.875rem] leading-snug text-cream/75">
            Just want the @? <span className="whitespace-nowrap font-semibold text-cream">{character.name}</span>
          </span>
          <BuyLink
            topic="character"
            placement="founders"
            className="inline-flex min-h-11 shrink-0 items-center rounded-lg border border-mustard/50 px-3.5 font-mono text-[0.875rem] font-semibold text-mustard transition-colors active:bg-mustard/10"
          >
            {formatPrice(character)}
          </BuyLink>
        </div>
      </div>
    </div>
  );
}

/** Placeholder avatar in an Instagram-style story ring — stands in for the buyer. */
function ProfilePic({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`block h-16 w-16 rounded-full bg-[conic-gradient(from_200deg,#f2b517,#e8342b,#c13584,#f2b517)] p-[2.5px] md:h-20 md:w-20 ${className}`}>
      <span className="block h-full w-full overflow-hidden rounded-full border-2 border-ink bg-[#2a2420]">
        <svg viewBox="0 0 64 64" className="h-full w-full">
          <circle cx="32" cy="25" r="11" fill="#8a7f72" />
          <path d="M10 60c2-13 11-20 22-20s20 7 22 20z" fill="#8a7f72" />
        </svg>
      </span>
    </span>
  );
}

/** Small illustrations for each "How it works" step. */
function StepArt({ index }: { index: number }) {
  const art: ReactNode[] = [
    <span key="buy" className="rounded-lg bg-red-deep px-4 py-2.5 text-[0.875rem] font-semibold text-cream-hi shadow-[0_8px_20px_-10px_rgb(232_52_43/0.8)]">
      Get the pass
    </span>,
    <span key="handle" className="w-full max-w-[9rem] rounded-lg border border-mustard/60 bg-ink px-3 py-2.5 text-center font-mono text-[0.9375rem] text-cream/80">
      @you
      <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-blink bg-mustard" />
    </span>,
    <span key="script" className="w-full max-w-[9.5rem] rounded-md bg-cream px-3 py-2.5 text-left shadow-[0_10px_24px_-12px_rgb(0_0_0/0.8)]">
      <span className="block font-mono text-[0.5625rem] uppercase tracking-wider text-ink/55">Case file · script</span>
      <span className="mt-1.5 block h-1.5 w-full rounded bg-ink/15" />
      <span className="mt-1 block font-mono text-[0.75rem] font-bold text-red-deep">@you</span>
      <span className="mt-1 block h-1.5 w-3/4 rounded bg-ink/15" />
    </span>,
    <span key="board" className="relative w-full max-w-[9.5rem] rotate-[-3deg] rounded-sm bg-cream px-3 pb-3 pt-4 text-left shadow-[0_10px_24px_-12px_rgb(0_0_0/0.8)]">
      <span className="absolute left-1/2 top-1 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-red shadow" />
      <span className="block font-mono text-[0.5625rem] uppercase tracking-wider text-ink/55">Persons of interest</span>
      <span className="mt-1 block font-mono text-[0.8125rem] font-bold text-red-deep">@you</span>
      <span className="mt-1.5 block h-1.5 w-full rounded bg-ink/15" />
      <span className="mt-1 block h-1.5 w-2/3 rounded bg-ink/15" />
    </span>,
  ];
  return <>{art[index] ?? null}</>;
}
