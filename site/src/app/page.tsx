import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();
  const deployedAt = new Date().toISOString();
  const commit = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "local";
  const env = process.env.VERCEL_ENV ?? "development";

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "3rem 1.5rem",
        gap: "2rem",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        background: "#0a0a0b",
        color: "#e7e7ea",
      }}
    >
      <header
        style={{
          width: "100%",
          maxWidth: 720,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: "1.75rem", letterSpacing: "-0.02em" }}>
            {"{{APP_NAME}}"}
          </h1>
          <p style={{ margin: "0.25rem 0 0", opacity: 0.7, fontSize: "0.95rem" }}>
            {"{{APP_DESC}}"}
          </p>
        </div>
        {user ? <UserButton /> : null}
      </header>

      <section
        style={{
          width: "100%",
          maxWidth: 720,
          background:
            "linear-gradient(180deg, rgba(34,197,94,0.12), rgba(34,197,94,0.04))",
          border: "1px solid rgba(34,197,94,0.35)",
          borderRadius: 12,
          padding: "1.25rem 1.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span
            aria-hidden
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#22c55e",
              boxShadow: "0 0 12px rgba(34,197,94,0.6)",
            }}
          />
          <strong style={{ fontSize: "1.05rem" }}>
            {user ? "You're signed in" : "App is live — please sign in"}
          </strong>
        </div>
        <p style={{ margin: "0.5rem 0 0", opacity: 0.8, fontSize: "0.9rem" }}>
          {user
            ? `Welcome back, ${user.firstName ?? user.username ?? user.primaryEmailAddress?.emailAddress ?? "friend"}. Clerk session is active and the .mcclenaghan.uk cookie is shared across every sub-app.`
            : "Click the Clerk sign-in widget to authenticate. Your session will carry to every other *.mcclenaghan.uk app via the shared subdomain cookie."}
        </p>
      </section>

      <section
        style={{
          width: "100%",
          maxWidth: 720,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "0.75rem",
        }}
      >
        <InfoTile label="App" value={"{{APP_SLUG}}"} />
        <InfoTile label="Environment" value={env} />
        <InfoTile label="Commit" value={commit} mono />
        <InfoTile label="Rendered at" value={deployedAt} mono />
        {user ? (
          <>
            <InfoTile label="User ID" value={user.id} mono />
            <InfoTile
              label="Email"
              value={user.primaryEmailAddress?.emailAddress ?? "—"}
            />
          </>
        ) : null}
      </section>

      <section
        style={{
          width: "100%",
          maxWidth: 720,
          fontSize: "0.85rem",
          opacity: 0.55,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: "1rem",
          lineHeight: 1.6,
        }}
      >
        <p style={{ margin: 0 }}>
          This page is the default template for sub-apps under{" "}
          <code>*.mcclenaghan.uk</code>. Replace{" "}
          <code>site/src/app/page.tsx</code> with the real app. Auth, DNS,
          and deployment are wired up — see the repo&apos;s{" "}
          <code>AGENTS.md</code> for next steps.
        </p>
      </section>
    </main>
  );
}

function InfoTile({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 8,
        padding: "0.75rem 0.9rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.2rem",
      }}
    >
      <span
        style={{
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          opacity: 0.55,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: mono
            ? "ui-monospace, SFMono-Regular, Menlo, monospace"
            : "inherit",
          fontSize: mono ? "0.85rem" : "0.95rem",
          wordBreak: "break-all",
        }}
      >
        {value}
      </span>
    </div>
  );
}
