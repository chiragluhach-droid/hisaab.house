import config from "@config";
import { Counter } from "./Counter";
import { HeroVideo } from "./HeroVideo";

/** Keeps the last two words together so the headline never ends on a lone word. */
const noWidow = (s: string) => s.replace(/ (\S+)$/, " $1");

/** Shows `hero.highlight` (e.g. "25K+") in mustard inside the headline. */
function Headline({ text, highlight }: { text: string; highlight?: string }) {
  const t = noWidow(text);
  const i = highlight ? t.indexOf(highlight) : -1;
  if (!highlight || i < 0) return <>{t}</>;
  return (
    <>
      {t.slice(0, i)}
      <span className="text-mustard">{highlight}</span>
      {t.slice(i + highlight.length)}
    </>
  );
}

export function Hero() {
  const { hero, stats } = config;
  const statList = [stats.views7d, stats.followers, stats.topEpisode];

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(60%_60%_at_80%_0%,rgb(242_181_23/0.10),transparent_70%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-8 px-5 pb-10 pt-[4.75rem] md:grid-cols-[1.25fr_0.75fr] md:items-center md:gap-14 md:px-8 md:pb-16 md:pt-28 lg:gap-20">
        <div className="order-2 md:order-none">
          <p className="label flex items-center gap-2 whitespace-nowrap">
            <span aria-hidden className="h-px w-6 bg-mustard" />
            {hero.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="mt-4 text-[clamp(2.125rem,1.15rem+4.3vw,4rem)] font-[750] leading-[1.06] tracking-[-0.03em]"
          >
            <Headline text={hero.headline} highlight={hero.highlight} />
          </h1>
          <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.55] text-cream/80 md:mt-6 md:text-xl">{hero.subheadline}</p>

          <div id="hero-cta" className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-9">
            <a href="#passes" className="btn btn-primary w-full sm:w-auto">
              {hero.primaryCta}
            </a>
            <a href="#inside" className="btn btn-secondary w-full sm:w-auto">
              {hero.secondaryCta}
            </a>
          </div>

          <dl className="mt-10 hidden grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-ink-2/60 md:grid">
            {statList.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </dl>
        </div>

        {/* Phones: the video comes first, above the headline. */}
        <div className="order-1 md:order-none md:pl-4">
          <HeroVideo />
        </div>

        {/* Stats panel on phones, under the buttons. */}
        <dl className="order-3 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-ink-2/60 md:hidden">
          {statList.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </dl>
      </div>
    </section>
  );
}

function Stat({ value, decimals, suffix, label }: { value: number; decimals: number; suffix: string; label: string }) {
  return (
    <div className="flex min-w-0 flex-col-reverse gap-1.5 px-3 py-4 md:px-5 md:py-5">
      <dt className="font-mono text-[0.625rem] uppercase leading-[1.35] tracking-[0.06em] text-muted md:text-[0.6875rem]">{label}</dt>
      <dd className="font-mono text-[1.625rem] font-semibold leading-none tracking-tight text-cream md:text-[2rem]">
        <Counter value={value} decimals={decimals} suffix={suffix} />
      </dd>
    </div>
  );
}
