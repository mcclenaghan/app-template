import { UserButton } from "@clerk/nextjs";

/**
 * Landing spot for signed-in users who are NOT members of the
 * McClenaghan organization (the estate ACL — mcclenaghan-app
 * ADR-0015). The middleware in src/proxy.ts redirects them here.
 *
 * Access is granted by an org invitation from the hub repo:
 *   make clerk-org-invite EMAIL=<their-email>
 * After accepting, they can revisit any private app directly.
 */
export const metadata = { title: "Request access — {{APP_NAME}}" };

export default function RequestAccessPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.25rem",
        padding: "3rem 1.25rem",
        textAlign: "center",
        background:
          "radial-gradient(1200px 600px at 50% -10%, rgba(88,101,242,0.18), transparent 60%), #0a0a0b",
        color: "#e5e7eb",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <h1 style={{ margin: 0, fontSize: "1.5rem", letterSpacing: "-0.02em" }}>Access required</h1>
      <p style={{ margin: 0, opacity: 0.75, fontSize: "0.95rem", maxWidth: 400 }}>
        You're signed in, but your account isn't authorised for {"{{APP_NAME}}"} yet. Ask Jamie to
        send your account an organisation invitation — once accepted, this page will let you
        straight through.
      </p>
      <UserButton />
      <p style={{ margin: 0, opacity: 0.5, fontSize: "0.8rem" }}>
        Signed in with the wrong account? Use the avatar menu to switch.
      </p>
    </main>
  );
}
