import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

// Metadata for the dynamically generated Open Graph / Twitter image.
export const alt = `${SITE_NAME} — ${SITE_DESCRIPTION}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Branded social-share banner (1200x630) generated at build time. Next.js
 * exposes it as `/opengraph-image` and wires it into `og:image` and
 * `twitter:image`, so no static binary asset is required.
 *
 * Uses only flexbox + a subset of CSS supported by `next/og` (satori).
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#101a26",
          backgroundImage:
            "linear-gradient(135deg, #162027 0%, #101a26 55%, #0c3a46 100%)",
          fontFamily: "sans-serif",
          padding: "64px",
        }}
      >
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: 1,
            textAlign: "center",
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            fontSize: 34,
            color: "#c8d3e0",
            marginTop: 28,
            maxWidth: 880,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          {SITE_DESCRIPTION}
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#4fb7cd",
            marginTop: 56,
            letterSpacing: 0.5,
          }}
        >
          {SITE_URL}
        </div>
      </div>
    ),
    { ...size }
  );
}