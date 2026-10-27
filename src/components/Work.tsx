import config from "@config";
import { Art } from "./Art";
import { InstagramIcon } from "./icons";
import { Section, SectionHeading } from "./SectionHeading";

type Episode = (typeof config.series.episodes)[number];

export function Work() {
  const { series } = config;
  return (
    <Section id="work">
      <SectionHeading
        id="work-title"
        index="01"
        label="The work"
        title={<>“{series.title}”</>}
        intro={series.premise}
      />

      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Format">
        {series.format.map((f) => (
          <li key={f} className="rounded-lg border border-line px-3 py-1.5 text-[0.8125rem] leading-tight text-cream/80">
            {f}
          </li>
        ))}
      </ul>

      {/* Swipe carousel on phones, grid from tablet up. The x-clip stops mobile
          browsers from widening the whole page to fit the scrolling row. */}
      <div className="relative -mx-5 mt-10 overflow-x-clip md:mx-0 md:overflow-x-visible">
        <ol
          className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-2 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 lg:grid-cols-6 lg:gap-4"
          aria-label="Episodes"
        >
          {series.episodes.map((ep, i) => (
            <li key={ep.no} className="w-[62%] shrink-0 snap-start min-[430px]:w-[56%] sm:w-[40%] md:w-auto">
              <EpisodeCard ep={ep} index={i} />
            </li>
          ))}
        </ol>
      </div>
      <p className="label mt-3 md:hidden" aria-hidden>
        Swipe → all {series.episodes.length} episodes
      </p>

      <div className="mt-14">
        <h3 className="text-xl font-semibold">Same characters, every episode.</h3>
        <p className="mt-1.5 text-cream/70">Consistent AI characters are what make a series feel like a show.</p>
        <ul className="mt-6 grid grid-cols-3 gap-3 md:max-w-2xl md:gap-5">
          {series.cast.map((c, i) => (
            <li key={c.name}>
              <figure className="card overflow-hidden">
                <div className="aspect-[941/1672] bg-[#f1ebdd]">
                  <Art
                    name={c.image}
                    alt={`${c.name} — character sheet`}
                    sizes="(min-width: 768px) 220px, 33vw"
                    fallback={<CastPlaceholder variant={i} />}
                  />
                </div>
                <figcaption className="p-2.5 md:p-3.5">
                  <span className="block text-[0.875rem] font-semibold leading-tight md:text-base">{c.name}</span>
                  <span className="mt-0.5 block font-mono text-[0.625rem] uppercase leading-snug tracking-wide text-muted md:text-[0.6875rem]">
                    {c.note}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function EpisodeCard({ ep, index }: { ep: Episode; index: number }) {
  const label = ep.no === "FINALE" ? "Finale" : `Episode ${Number(ep.no)}`;
  return (
    <a
      href={ep.url}
      rel="noopener"
      className="card card-interactive group block h-full overflow-hidden"
    >
      <div className="relative aspect-[9/16] bg-ink-3">
        <Art
          name={ep.cover}
          alt={`${label} cover: ${ep.title}`}
          sizes="(min-width: 1024px) 160px, (min-width: 768px) 25vw, 62vw"
          fallback={<CoverPlaceholder no={ep.no} title={ep.title} index={index} />}
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 to-transparent" />
        <span aria-hidden className="absolute bottom-2.5 right-2.5 grid h-7 w-7 place-items-center rounded-full bg-black/60 text-cream/90">
          <InstagramIcon className="h-4 w-4" />
        </span>
      </div>
      <div className="px-3 py-2.5">
        <span className="block font-mono text-[0.6875rem] uppercase tracking-wider text-muted">{label}</span>
        <span className="block font-semibold leading-snug">{ep.title}</span>
        <span className="sr-only"> — watch on Instagram</span>
      </div>
    </a>
  );
}

const coverTints = ["#2a1a17", "#1d1f1a", "#2b2214", "#1a1c22", "#271718", "#1f1a24", "#2c1512"];

function CoverPlaceholder({ no, title, index }: { no: string; title: string; index: number }) {
  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-3"
      style={{ background: `linear-gradient(160deg, ${coverTints[index % coverTints.length]}, #141110 75%)` }}
    >
      <span aria-hidden className="relative font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-cream/45">
        Har Note Ka Hisaab Hota Hai
      </span>
      <span aria-hidden className="relative mb-12 flex flex-col">
        <span className="flex items-baseline gap-1.5 font-extrabold uppercase leading-none tracking-tight">
          <span className="text-[1.375rem] text-cream lg:text-base">{no === "FINALE" ? "Finale" : "Part"}</span>
          {no !== "FINALE" && <span className="text-[2.5rem] text-mustard lg:text-[1.75rem]">{Number(no)}</span>}
        </span>
        <span className="mt-1.5 text-[1.5rem] font-extrabold uppercase leading-[0.95] tracking-tight text-mustard [overflow-wrap:anywhere] lg:text-[1.0625rem]">{title}</span>
      </span>
    </div>
  );
}

const castColors = [
  { hat: "#7a1f2b", body: "#f2b517" },
  { hat: "#3b3530", body: "#6b5d50" },
  { hat: "#4a3a2c", body: "#8c7a5b" },
];

function CastPlaceholder({ variant }: { variant: number }) {
  const c = castColors[variant % castColors.length];
  return (
    <svg viewBox="0 0 100 125" className="h-full w-full" aria-hidden>
      <rect width="100" height="125" fill="#1f1b18" />
      <path d="M14 125c2-26 16-38 36-38s34 12 36 38z" fill={c.body} opacity="0.9" />
      <circle cx="50" cy="58" r="20" fill="#3a332e" />
      {variant === 0 ? (
        <path d="M29 55c0-15 9-24 21-24s21 9 21 24c-6-3-14-4-21-4s-15 1-21 4z" fill={c.hat} />
      ) : variant === 2 ? (
        <path d="M30 48c2-10 10-15 20-15s18 5 20 15z M26 49h48v4H26z" fill={c.hat} />
      ) : (
        <path d="M31 52c1-12 9-19 19-19s18 7 19 19c-5-4-12-6-19-6s-14 2-19 6z" fill={c.hat} />
      )}
    </svg>
  );
}
