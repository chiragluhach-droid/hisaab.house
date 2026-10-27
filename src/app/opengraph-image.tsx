import { ImageResponse } from "next/og";
import config from "@config";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { ogFonts } from "@/lib/og-fonts";

export const dynamic = "force-static";
export const alt = "Hisaab House — the system behind 25K+ followers in 7 days";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const { stats } = config;
  const logoFile = await readFile(path.join(process.cwd(), "public/art/logo.png")).catch(() => null);
  const logo = logoFile && `data:image/png;base64,${(await sharp(logoFile).resize(132).png().toBuffer()).toString("base64")}`;
  const statRow = [
    [`${stats.views7d.value}${stats.views7d.suffix}`, "Views & interactions · 7 days"],
    [`${stats.followers.value}${stats.followers.suffix}`, "Followers"],
    [`${stats.topEpisode.value}${stats.topEpisode.suffix}`, "Top episode"],
  ];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#141110",
          backgroundImage:
            "radial-gradient(ellipse at 85% 0%, rgba(242,181,23,0.22), transparent 55%)",
          color: "#F1EBDD",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: "Mono", fontSize: 26, letterSpacing: 5 }}>
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} width={66} height={66} style={{ borderRadius: 14 }} alt="" />
            ) : (
              <div style={{ display: "flex", width: 44, height: 44, borderRadius: 9, background: "#E8342B", color: "#FFF8EC", fontSize: 18, alignItems: "center", justifyContent: "center", letterSpacing: 0 }}>
                HH
              </div>
            )}
            HISAAB HOUSE
          </div>
          <div style={{ display: "flex", fontFamily: "Mono", fontSize: 20, letterSpacing: 4, color: "#F2B517", border: "3px solid #F2B517", borderRadius: 6, padding: "8px 14px", transform: "rotate(-4deg)" }}>
            @{config.contact.instagramHandle.toUpperCase()}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.04, letterSpacing: -3, maxWidth: 1000 }}>
          {config.hero.headline}
        </div>
        <div style={{ display: "flex", gap: 0, borderTop: "2px solid rgba(241,235,221,0.16)", paddingTop: 28 }}>
          {statRow.map(([v, l], i) => (
            <div key={l} style={{ display: "flex", flexDirection: "column", flex: 1, paddingLeft: i ? 32 : 0, borderLeft: i ? "2px solid rgba(241,235,221,0.16)" : "none" }}>
              <div style={{ fontFamily: "Mono", fontSize: 48, color: i === 0 ? "#F2B517" : "#F1EBDD" }}>{v}</div>
              <div style={{ fontFamily: "Mono", fontSize: 18, letterSpacing: 2, color: "#A8A296", textTransform: "uppercase" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
