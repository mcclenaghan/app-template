import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

// Placed as a server component so it renders immediately during SSR.
// The <SignIn />/<SignUp /> child is a Clerk client island that can
// take a few seconds to render while Clerk JS boots (env fetch,
// handshake, UI chunks). Without a visible shell the page looks
// completely blank while Clerk is loading — this gives users an
// immediate affordance that something is happening.
export function AuthShell({ title, subtitle, children }: Props) {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.25rem",
        background:
          "radial-gradient(1200px 600px at 50% -10%, rgba(88,101,242,0.18), transparent 60%), #0a0a0b",
        color: "#e5e7eb",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.25rem",
        }}
      >
        <header style={{ textAlign: "center" }}>
          <h1 style={{ margin: 0, fontSize: "1.5rem", letterSpacing: "-0.02em" }}>
            {title}
          </h1>
          {subtitle ? (
            <p style={{ margin: "0.5rem 0 0", opacity: 0.7, fontSize: "0.95rem" }}>
              {subtitle}
            </p>
          ) : null}
        </header>

        {/* SSR fallback: visible immediately. Clerk's client component
            renders on top of this once it hydrates. */}
        <div
          style={{
            width: "100%",
            minHeight: 420,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <Spinner />
          </div>
          {children}
        </div>

        <footer style={{ opacity: 0.55, fontSize: "0.8rem", textAlign: "center" }}>
          Having trouble? Try an incognito window or clear cookies for{" "}
          <code>.mcclenaghan.uk</code>.
        </footer>
      </div>
    </main>
  );
}

function Spinner() {
  return (
    <div
      role="status"
      aria-label="Loading"
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        border: "3px solid rgba(255,255,255,0.14)",
        borderTopColor: "rgba(255,255,255,0.75)",
        animation: "authspinner 0.9s linear infinite",
      }}
    >
      <style>{`@keyframes authspinner { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
