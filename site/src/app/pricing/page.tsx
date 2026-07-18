import { PricingTable } from "@clerk/nextjs";

/**
 * Billing is OFF by default. To turn this app into a paid product:
 *
 *   1. In mcclenaghan-app: set `stripe.billing = true` on this app's
 *      [[app]] block in config/apps.toml.
 *   2. In mcclenaghan-app: add plans/features to config/billing.json —
 *      slugs MUST be prefixed with this app's slug, e.g.
 *      "{{APP_SLUG}}_pro" / "{{APP_SLUG}}_export" (ADR-0013) — then run
 *      `make billing-apply`.
 *   3. Flip BILLING_ENABLED to true below.
 *   4. Gate content with `has({ plan: "{{APP_SLUG}}_pro" })` or
 *      `has({ feature: "{{APP_SLUG}}_<capability>" })` from
 *      `auth()` (server) / `useAuth()` (client). Never gate on
 *      unprefixed slugs — the Clerk billing catalog is shared by every
 *      *.mcclenaghan.uk app.
 *
 * The <PricingTable /> renders every USER-scoped plan in the shared
 * instance catalog whose payer type matches; checkout happens in
 * Clerk's in-app drawer (Stripe is the connected gateway — ADR-0014).
 * Note: right after checkout the session token is briefly stale and
 * `has()` returns false until the session refreshes; see
 * mcclenaghan-app/docs/stripe-operations.md §7.
 */
const BILLING_ENABLED = false;

export const metadata = { title: "Pricing — {{APP_NAME}}" };

export default function PricingPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "3rem 1.25rem",
        background: "#0a0a0b",
        color: "#e5e7eb",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div style={{ width: "100%", maxWidth: 900 }}>
        <h1 style={{ fontSize: "1.5rem", letterSpacing: "-0.02em" }}>Pricing</h1>
        {BILLING_ENABLED ? (
          <PricingTable />
        ) : (
          <p style={{ opacity: 0.7 }}>
            Billing is not enabled for {"{{APP_NAME}}"}. See the checklist in{" "}
            <code>src/app/pricing/page.tsx</code>.
          </p>
        )}
      </div>
    </main>
  );
}
