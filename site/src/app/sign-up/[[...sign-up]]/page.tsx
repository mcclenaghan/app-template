import { SignUp } from "@clerk/nextjs";
import { AuthShell } from "../../../components/auth-shell";

export default function Page() {
  return (
    <AuthShell title="Create an account" subtitle="Use your Google account to get started.">
      <SignUp />
    </AuthShell>
  );
}
