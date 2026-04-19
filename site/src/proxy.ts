import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * Require Clerk sign-in for every route except the sign-in / sign-up
 * pages themselves, the health check, and `.well-known` resources.
 *
 * `.well-known/*` MUST stay public even on a brand-new app so the
 * Android TWA hub (uk.mcclenaghan.app) can verify Digital Asset Links
 * on this subdomain. Without this exemption Chrome 307-redirects the
 * verifier to /sign-in and the app loses its trusted-origin status.
 * See mcclenaghan-app/docs/adr/0008-well-known-clerk-exemption.md.
 *
 * `signInUrl` / `signUpUrl` are explicit so `redirectToSignIn()` lands
 * on the in-app /sign-in route (which renders Clerk's <SignIn/>), not
 * on the Cloudflare-bot-challenged Account Portal at
 * accounts.<primary-domain>. The Account Portal is only reachable by
 * real browsers (the challenge is JS-based), which breaks curl smoke
 * tests and sometimes extensions/embedded webviews. Keeping the sign-in
 * UI same-origin side-steps the whole class of issue and mirrors how
 * `career.mcclenaghan.uk` already works.
 *
 * New apps usually start private; drop the redirect (keep clerkMiddleware
 * for auth context) to make the app public. See mcclenaghan-app's own
 * proxy.ts for a public example.
 */
const isPublic = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/health",
  "/.well-known/(.*)",
]);

export default clerkMiddleware(
  async (auth, req) => {
    if (isPublic(req)) return;
    const { userId, redirectToSignIn } = await auth();
    if (!userId) return redirectToSignIn({ returnBackUrl: req.url });
  },
  { signInUrl: "/sign-in", signUpUrl: "/sign-up" },
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|json)).*)",
    "/(api|trpc)(.*)",
  ],
};
