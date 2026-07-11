import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

// WOFF (not woff2 — satori can't parse it), fetched from a public CDN:
// Workers block loopback fetches, so the font must not come from our origin.
const FONT_URL =
  "https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5/files/geist-sans-latin-700-normal.woff";

async function loadGeistBold(): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(FONT_URL);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

interface OgCardProps {
  title: string;
  subtitle: string;
  badges?: string[];
  accent?: string;
}

/**
 * Shared OG image template. Falls back to the built-in font when the
 * CDN fetch fails — an OG image must never 500.
 */
export async function ogImage({
  title,
  subtitle,
  badges = [],
  accent = "#8b5cf6",
}: OgCardProps): Promise<ImageResponse> {
  const geistBold = await loadGeistBold();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#0a0a0a",
          backgroundImage: `radial-gradient(circle at 12% 0%, ${accent}40 0%, transparent 55%)`,
          color: "#fafafa",
          fontFamily: geistBold ? "Geist" : "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa" }}>
          thiagoc.dev
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#a1a1aa",
              lineHeight: 1.35,
              maxWidth: 950,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {badges.slice(0, 5).map((badge) => (
            <div
              key={badge}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid #3f3f46",
                backgroundColor: "#18181b",
                fontSize: 24,
                color: "#d4d4d8",
              }}
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: geistBold
        ? [{ name: "Geist", data: geistBold, weight: 700 as const }]
        : undefined,
    },
  );
}
