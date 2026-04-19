import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * Require Clerk sign-in for every route except the sign-in page itself,
 * the health check, and `.well-known` resources.
 *
 * `.well-known/*` MUST stay public even on a brand-new app so the
 * Android TWA hub (uk.mcclenaghan.app) can verify Digital Asset Links
 * on this subdomain. Without this exemption Chrome 307-redirects the
 * verifier to /sign-in and the app loses its trusted-origin status.
 * See mcclenaghan-app/docs/adr/0008-well-known-clerk-exemption.md.
 *
 * New apps usually start private; drop the redirect (keep clerkMiddleware
 * for auth context) to make the app public. See mcclenaghan-app's own
 * proxy.ts for a public example.
 */
const isPublic = createRouteMatcher(["/sign-in(.*)", "/api/health", "/.well-known/(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublic(req)) return;
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn({ returnBackUrl: req.url });
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|json)).*)",
    "/(api|trpc)(.*)",
  ],
};
