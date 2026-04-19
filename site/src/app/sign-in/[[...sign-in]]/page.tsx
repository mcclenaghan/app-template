import { SignIn } from "@clerk/nextjs";
import { AuthShell } from "../../../components/auth-shell";

export default function Page() {
  return (
    <AuthShell title="Sign in" subtitle="Use your Google account to continue.">
      <SignIn />
    </AuthShell>
  );
}
