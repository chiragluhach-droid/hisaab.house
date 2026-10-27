"use client";

import { useEffect, useState } from "react";

const units = [
  ["Days", 86400],
  ["Hrs", 3600],
  ["Min", 60],
  ["Sec", 1],
] as const;

/** Counts down to `to`. Renders nothing before hydration or once the date has passed. */
export function Countdown({ to, label }: { to: string; label: string }) {
  const target = new Date(to).getTime();
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setLeft(Math.max(0, Math.floor((target - Date.now()) / 1000)));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (Number.isNaN(target)) return null;
  return (
    // Fixed height so nothing shifts when the numbers appear.
    <div className="mt-8 min-h-[5.5rem]" aria-live="off">
      {left !== null && left > 0 && (
        <>
          <p className="label">{label}</p>
          <dl className="mt-3 flex justify-center gap-2">
            {units.map(([name, size], i) => {
              const v = i === 0 ? Math.floor(left / size) : Math.floor((left % units[i - 1][1]) / size);
              return (
                <div key={name} className="w-16 rounded-xl border border-line bg-ink/70 py-2">
                  <dd className="font-mono text-2xl font-semibold tabular-nums">{String(v).padStart(2, "0")}</dd>
                  <dt className="font-mono text-[0.625rem] uppercase tracking-wider text-muted">{name}</dt>
                </div>
              );
            })}
          </dl>
        </>
      )}
    </div>
  );
}
