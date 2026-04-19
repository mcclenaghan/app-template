import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://{{APP_SLUG}}.mcclenaghan.uk"),
  title: "{{APP_NAME}}",
  description: "{{APP_DESC}}",
  applicationName: "{{APP_NAME}}",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// No `isSatellite`. Every *.mcclenaghan.uk app shares the parent-domain
// Clerk cookie (ADR-0001 in mcclenaghan-app). Preconnect to clerk.mcclenaghan.uk
// so the TLS handshake starts in parallel with Next.js chunk downloads.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
    >
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://clerk.mcclenaghan.uk" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://clerk.mcclenaghan.uk" />
        </head>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
