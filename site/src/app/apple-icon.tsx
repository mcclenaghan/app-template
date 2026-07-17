import { renderAppIcon } from "@/lib/app-icon";

// Apple touch icon (home-screen bookmark), generated at build time.
// Served at /apple-icon — kept public in src/proxy.ts like /icon.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return renderAppIcon(size);
}
