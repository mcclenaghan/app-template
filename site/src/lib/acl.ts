import { clerkClient } from "@clerk/nextjs/server";

/**
 * Estate-wide ACL (mcclenaghan-app ADR-0015): access requires membership
 * of the McClenaghan Clerk organization, identified by CLERK_ESTATE_ORG_ID
 * (arrives via the team-shared Vercel env — dev org id in development,
 * prod org id in production/preview).
 *
 * Designed for the middleware in src/proxy.ts, which already holds the
 * request's userId/orgId from clerkMiddleware's auth handle.
 *
 * Fast path: the session's active org matches — free (the instance runs
 * force_organization_selection, so sessions normally carry one).
 * Fallback: one Backend API membership lookup.
 *
 * When CLERK_ESTATE_ORG_ID is unset the gate degrades to the legacy
 * behaviour ("any signed-in user"), so rollout/rollback is one env var.
 */
export async function checkEstateMembership(
  userId: string,
  orgId: string | null | undefined,
): Promise<boolean> {
  const estateOrgId = process.env.CLERK_ESTATE_ORG_ID;
  if (!estateOrgId) return true;
  if (orgId === estateOrgId) return true;

  const client = await clerkClient();
  const { data } = await client.users.getOrganizationMembershipList({
    userId,
    limit: 100,
  });
  return data.some((m) => m.organization.id === estateOrgId);
}
