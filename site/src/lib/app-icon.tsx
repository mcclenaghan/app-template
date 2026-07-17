import { ImageResponse } from "next/og";

/**
 * Shared renderer for the app's favicon (`src/app/icon.tsx`) and Apple
 * touch icon (`src/app/apple-icon.tsx`). Generated at build time by
 * Next.js metadata file conventions — no binary assets to commit, and
 * the {{APP_SLUG}} placeholder rewrite gives every sub-app a distinct,
 * deterministic colour without any per-app design work.
 *
 * Style matches the hub's icon (rounded square, diagonal gradient,
 * single bold glyph — see mcclenaghan-app/site/public/icons/source.svg).
 */

const APP_NAME = "{{APP_NAME}}";
const APP_SLUG = "{{APP_SLUG}}";

/** Stable 0–359 hue derived from the slug so each app gets its own colour. */
function hueFromSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return h % 360;
}

export function renderAppIcon(size: { width: number; height: number }) {
  const hue = hueFromSlug(APP_SLUG);
  const letter = (APP_NAME.trim().charAt(0) || "?").toUpperCase();
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // 22% radius ≈ the hub icon's 112/512 rounding.
        borderRadius: Math.round(size.width * 0.22),
        background: `linear-gradient(135deg, hsl(${hue}, 70%, 55%), hsl(${(hue + 40) % 360}, 75%, 40%))`,
        color: "#ffffff",
        fontSize: Math.round(size.width * 0.62),
        fontWeight: 700,
      }}
    >
      {letter}
    </div>,
    size,
  );
}
