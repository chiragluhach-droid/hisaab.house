import { preload } from "react-dom";
import config from "@config";
import manifest from "@/generated/art-manifest.json";

// Runs inline, straight after the <video> is parsed — before React loads.
// - Reduced motion or Data Saver → no video at all; the poster stays.
// - Otherwise the video source is attached once the page has loaded, so the
//   1 MB+ video doesn't compete with the poster, fonts and CSS on mobile data.
// It also re-asserts `muted`, which iOS needs for inline autoplay.
const boot = `(function(){var v=document.getElementById('hero-video');if(!v)return;v.muted=true;v.defaultMuted=true;
var c=navigator.connection,s=(c&&c.saveData)||window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(s){v.removeAttribute('autoplay');v.autoplay=false;v.dataset.still='1';return;}
function go(){v.src=v.dataset.src;var p=v.play&&v.play();if(p&&p.catch)p.catch(function(){});}
if(document.readyState==='complete')go();else window.addEventListener('load',go,{once:true});})();`;

export function HeroVideo() {
  const { src, aspect, label } = config.video;
  // Self-hosted copy made by scripts/optimize-images.mjs; Cloudinary if that failed.
  const local = (manifest as Record<string, { base: string }>)._poster;
  const poster = local ? { mobile: `${local.base}-600.avif`, desktop: `${local.base}-900.avif`, type: "image/avif" } : { mobile: config.video.posterMobile, desktop: config.video.poster, type: undefined };
  preload(poster.mobile, { as: "image", fetchPriority: "high", media: "(max-width: 767px)", type: poster.type });
  preload(poster.desktop, { as: "image", fetchPriority: "high", media: "(min-width: 768px)", type: poster.type });

  return (
    <figure className="relative mx-auto w-full max-w-[calc(58svh*0.75)] md:max-w-none">
      {/* Case-file frame */}
      <div className="rounded-[20px] border border-line bg-ink-2 p-2 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.9)]">
        {/* Fixed height + no wrapping, so the font swap can't shift the layout. */}
        <div className="flex h-8 items-center justify-between gap-3 whitespace-nowrap px-2 pb-1">
          <span className="label min-w-0 truncate !text-[0.6875rem]">Exhibit 00 · {label}</span>
          <span className="label flex items-center gap-1.5 !text-[0.6875rem] !text-red-text">
            <span aria-hidden className="h-1.5 w-1.5 animate-blink rounded-full bg-red" />
            Rec
          </span>
        </div>
        <div className="relative overflow-hidden rounded-[14px] bg-ink-3" style={{ aspectRatio: aspect }}>
          {/* Poster as a real image so it paints instantly and counts as the LCP image. */}
          <picture>
            {local && <source media="(min-width: 768px)" type="image/avif" srcSet={poster.desktop} />}
            {local && <source type="image/avif" srcSet={poster.mobile} />}
            {local && <source media="(min-width: 768px)" srcSet={`${local.base}-900.webp`} />}
            {!local && <source media="(min-width: 768px)" srcSet={poster.desktop} />}
            <img
              src={local ? `${local.base}-600.webp` : poster.mobile}
              alt=""
              aria-hidden
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>
          {/* suppressHydrationWarning: the inline script below sets `src` (and drops
              `autoplay` for reduced motion) before React loads — that's intended. */}
          <video
            suppressHydrationWarning
            id="hero-video"
            className="absolute inset-0 h-full w-full object-cover"
            data-src={src}
            poster={poster.mobile}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            disableRemotePlayback
            aria-label="Promo: how a Hisaab House reel comes together"
          />
          <script dangerouslySetInnerHTML={{ __html: boot }} />
          {/* Corner brackets */}
          <span aria-hidden className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-cream/70" />
          <span aria-hidden className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-cream/70" />
          <span aria-hidden className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-cream/70" />
          <span aria-hidden className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-cream/70" />
        </div>
      </div>
      <span aria-hidden className="stamp absolute -bottom-3 -left-1 bg-ink text-mustard md:-left-4">
        File HH-01
      </span>
    </figure>
  );
}
