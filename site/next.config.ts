import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Digital Asset Links must be served as JSON on every origin that
        // the Android TWA hub (uk.mcclenaghan.app) trusts. Keeping the
        // content-type correct here means verification works the moment
        // this subdomain lights up, even before icons exist.
        source: "/.well-known/assetlinks.json",
        headers: [
          { key: "Content-Type", value: "application/json" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
    ];
  },
};

export default config;
