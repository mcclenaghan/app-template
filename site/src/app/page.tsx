import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = await auth();

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
      {userId ? (
        <UserButton />
      ) : (
        <p style={{ opacity: 0.6, fontSize: "0.875rem" }}>
          Sign in at <code>clerk.mcclenaghan.uk</code> (SSO across
          *.mcclenaghan.uk).
        </p>
      )}
    </main>
  );
}
