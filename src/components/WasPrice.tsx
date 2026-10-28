import { discount } from "@/lib/contact";

/** "₹999 · Save ₹200" — the struck-through old price and the saving. Renders nothing without `compareAt`. */
export function WasPrice({ p, className = "" }: { p: { price: number | null; compareAt?: number }; className?: string }) {
  const d = discount(p);
  if (!d) return null;
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="font-mono text-[0.9375rem] text-cream/45 line-through decoration-red decoration-2">
        <span className="sr-only">Was </span>
        {d.was}
      </span>
      <span className="rounded-full bg-mustard px-2 py-0.5 font-mono text-[0.6875rem] font-bold uppercase tracking-wide text-ink">
        Save {d.save}
      </span>
    </span>
  );
}
