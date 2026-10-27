import type { ReactNode } from "react";
import manifest from "@/generated/art-manifest.json";

type Entry = { width: number; height: number; widths: number[]; base: string; blur: string };
const art = manifest as Record<string, Entry>;

type Props = {
  /** Path inside /public/art without extension, e.g. "covers/ep-1". */
  name: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Rendered when the image hasn't been added yet. */
  fallback: ReactNode;
};

/** Responsive AVIF/WebP image from /public/art, or a placeholder if it's missing. */
export function Art({ name, alt, sizes, className = "", priority, fallback }: Props) {
  const a = art[name];
  if (!a) return <>{fallback}</>;
  const set = (fmt: string) => a.widths.map((w) => `${a.base}-${w}.${fmt} ${w}w`).join(", ");
  const largest = a.widths[a.widths.length - 1];
  return (
    <picture>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        src={`${a.base}-${largest}.webp`}
        alt={alt}
        width={a.width}
        height={a.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={`h-full w-full object-cover ${className}`}
        style={{ backgroundImage: `url(${a.blur})`, backgroundSize: "cover" }}
      />
    </picture>
  );
}
