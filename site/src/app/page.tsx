import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        fontFamily: "system-ui, sans-serif",
        background: "#0a0a0b",
        color: "#e7e7ea",
      }}
    >
      <h1 style={{ margin: 0 }}>{{APP_NAME}}</h1>
      <p style={{ margin: 0, opacity: 0.7 }}>{{APP_DESC}}</p>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <p style={{ opacity: 0.6, fontSize: "0.875rem" }}>
          You are signed in via Clerk at <code>clerk.mcclenaghan.uk</code>.
        </p>
      </SignedOut>
    </main>
  );
}
