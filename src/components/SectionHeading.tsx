import type { ReactNode } from "react";

type Props = { index: string; label: string; title: ReactNode; intro?: ReactNode; id?: string };

export function SectionHeading({ index, label, title, intro, id }: Props) {
  return (
    <header className="max-w-2xl">
      <p className="label flex items-center gap-3">
        <span className="text-mustard">File {index}</span>
        <span aria-hidden className="h-px w-8 bg-line-strong" />
        {label}
      </p>
      <h2 id={id} className="mt-3 text-[clamp(1.75rem,1.2rem+2.4vw,2.75rem)] font-bold leading-[1.12]">
        {title}
      </h2>
      {intro && <p className="mt-3 text-cream/75 md:text-lg">{intro}</p>}
    </header>
  );
}

export function Section({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-16 py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-5 md:px-8">{children}</div>
    </section>
  );
}
