import { renderAppIcon } from "@/lib/app-icon";

// Favicon, generated at build time (Next.js metadata file convention).
// Served at /icon — kept public in src/proxy.ts so browsers can fetch
// it without a Clerk session (a 307 to /sign-in means no tab icon).
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return renderAppIcon(size);
}
