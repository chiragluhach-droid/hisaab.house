import config from "@config";

export function Ticker() {
  const { stats, series, ticker } = config;
  const items = [
    `${stats.views7d.value}${stats.views7d.suffix} views & interactions · 7 days`,
    `${stats.followers.value}${stats.followers.suffix} followers`,
    `Top episode ${stats.topEpisode.value}${stats.topEpisode.suffix}`,
    ...ticker,
    ...series.episodes.map((e) => `${e.no === "FINALE" ? "Finale" : `Ep ${Number(e.no)}`} · ${e.title}`),
  ];
  const run = (hidden?: boolean) => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <li key={i} className="flex items-center whitespace-nowrap">
          <span className="px-5">{t}</span>
          <span aria-hidden className={i % 3 === 0 ? "text-red" : "text-mustard"}>
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden border-y border-line bg-ink-2 py-3.5 font-mono text-[0.75rem] uppercase tracking-[0.08em] text-cream/75">
      <div className="flex w-max animate-ticker motion-reduce:animate-none">
        {run()}
        {run(true)}
      </div>
    </div>
  );
}
